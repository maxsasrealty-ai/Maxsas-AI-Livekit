import {
  CallDetail,
  CallSummary,
  InitiateCallRequest,
  InitiateCallResponse,
  RecordingResponse,
} from "../../../shared/contracts";
import { CallLifecycleStatus } from "../generated/prisma";
import { config, normalizePhoneNumber } from "../lib/config";
import { logger } from "../lib/logger";
import { assertUuid } from "../lib/uuid";
import { enqueueOutboundCallRequestJob } from "../queue/producer";
import {
  getCallDetail,
  getCallSessionById,
  listCallSessions,
} from "../repositories/callRepository";
import { getLeadExtractionByCallId } from "../repositories/leadRepository";
import { createOutboundCallRequest } from "../repositories/outboundRequestRepository";
import { upsertTenant } from "../repositories/tenantRepository";

const DEFAULT_WEBHOOK_PATH = "/api/webhooks/voice/events";

export async function initiateCallSession(input: InitiateCallRequest): Promise<InitiateCallResponse> {
  assertUuid(input.tenantId, "tenantId");
  let request;
  try {
    await upsertTenant({ tenantId: input.tenantId });

    const normalizedPhoneNumber = input.phoneNumber ? normalizePhoneNumber(input.phoneNumber) : null;
    const resolvedAgentName = input.agentName?.trim() || config.LIVEKIT_AGENT_NAME;

    request = await createOutboundCallRequest({
      tenantId: input.tenantId,
      phoneNumber: normalizedPhoneNumber || "",
      roomId: input.roomId,
      agentName: resolvedAgentName,
      payloadJson: {
        direction: input.direction,
        requestedAt: new Date().toISOString(),
      },
    });

    await enqueueOutboundCallRequestJob({
      requestId: request.id,
      tenantId: request.tenantId,
    });
  } catch (error) {
    logger.error("Call initiation DB write failed", {
      tenantId: input.tenantId,
      roomId: input.roomId,
      message: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }

  return {
    callId: request.id,
    tenantId: request.tenantId,
    roomId: request.roomId,
    state: "queued",
    dispatch: {
      webhookUrl: `${process.env.API_BASE_URL || "http://localhost:4000"}${DEFAULT_WEBHOOK_PATH}`,
      eventAuthMode: "bearer",
      expectedHeaders: ["X-Event-Id", "X-Call-Id", "X-Occurred-At"],
    },
  };
}

export async function listCalls(args: {
  tenantId: string;
  page: number;
  pageSize: number;
  status?: CallLifecycleStatus;
  from?: Date;
  to?: Date;
}): Promise<{ items: CallSummary[]; totalItems: number }> {
  assertUuid(args.tenantId, "tenantId");
  const result = await listCallSessions(args);

  return {
    totalItems: result.totalItems,
    items: result.items.map((item) => ({
      callId: item.id,
      tenantId: item.tenantId,
      roomId: item.roomId,
      state: item.status,
      initiatedAt: item.initiatedAt.toISOString(),
      connectedAt: item.connectedAt?.toISOString(),
      completedAt: item.completedAt?.toISOString(),
      failedAt: item.failedAt?.toISOString(),
    })),
  };
}

export async function getCallById(callId: string, tenantId: string): Promise<CallDetail | null> {
  assertUuid(callId, "callId");
  assertUuid(tenantId, "tenantId");
  const detail = await getCallDetail(callId, tenantId);
  if (!detail) {
    return null;
  }

  const eventSummaryMap = detail.events.reduce<Record<string, number>>((acc, event) => {
    acc[event.eventType] = (acc[event.eventType] || 0) + 1;
    return acc;
  }, {});

  return {
    callId: detail.id,
    tenantId: detail.tenantId,
    roomId: detail.roomId,
    state: detail.status,
    initiatedAt: detail.initiatedAt.toISOString(),
    connectedAt: detail.connectedAt?.toISOString(),
    completedAt: detail.completedAt?.toISOString(),
    failedAt: detail.failedAt?.toISOString(),
    phoneNumber: detail.phoneNumber,
    agentName: detail.agentName,
    direction: detail.direction,
    durationSec: detail.durationSec,
    transcriptTurns: detail.transcriptTurns,
    recordingUrl: detail.recordingUrl,
    estimatedCost: detail.estimatedCost ? Number(detail.estimatedCost) : null,
    lastError: detail.lastError,
    eventSummary: Object.entries(eventSummaryMap).map(([eventType, count]) => ({
      eventType,
      count,
    })),
  };
}

export async function getRecordingMetadata(
  callId: string,
  tenantId: string
): Promise<RecordingResponse | null> {
  assertUuid(callId, "callId");
  assertUuid(tenantId, "tenantId");
  const call = await getCallSessionById(callId, tenantId);
  if (!call) {
    return null;
  }

  const signedUrl = call.recordingUrl ? call.recordingUrl : null;

  return {
    callId,
    tenantId,
    available: Boolean(call.recordingUrl),
    recordingUrl: call.recordingUrl,
    signedUrl,
  };
}

export async function getLeadByCallId(callId: string, tenantId: string) {
  assertUuid(callId, "callId");
  assertUuid(tenantId, "tenantId");
  const lead = await getLeadExtractionByCallId(callId, tenantId);
  if (!lead) {
    return null;
  }

  return {
    callId,
    tenantId,
    extractedAt: lead.extractedAt.toISOString(),
    fields: {
      name: lead.name,
      phone: lead.phone,
      summary: lead.summary,
    },
    confidence: lead.confidence,
  };
}
