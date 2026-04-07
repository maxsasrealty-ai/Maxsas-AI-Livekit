import { Prisma } from "../../generated/prisma";
import { prisma } from "../../lib/db";
import { logger } from "../../lib/logger";
import { normalizeTenantId } from "../../lib/tenant-id";
import { publishRealtimeVoiceEvent } from "../../services/realtimeService";
import { DEFAULT_OUTBOUND_CALL_CHARGE_PAISE, enforceWalletGuardOrBypass } from "../billing/billing.service";
import { extractLeadSignals } from "../leads/lead-extraction";
import { ensureTenant } from "../tenants/tenant.service";
import { VoiceEventEnvelopeInput } from "./voice-events.schema";

function serializeUnknown(input: unknown): string {
  return JSON.stringify(input ?? null);
}

function parseTranscriptPayload(payload: Record<string, unknown>) {
  return {
    speaker: String(payload.speaker || "agent") === "user" ? "user" : "agent",
    text: String(payload.text || ""),
    final: Boolean(payload.final),
    sequenceNo: Number(payload.sequence_no || 0),
    providerMessageId: payload.provider_message_id ? String(payload.provider_message_id) : null,
  } as const;
}

function parseOptionalDateTime(input: unknown): Date | null {
  if (!input) {
    return null;
  }
  const parsed = new Date(String(input));
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

async function upsertLeadFromTranscript(tenantId: string, callId: string) {
  const transcriptRows = await prisma.transcriptSegment.findMany({
    where: {
      tenantId,
      callId,
      isFinal: true,
    },
    orderBy: {
      sequenceNo: "asc",
    },
  });

  const fullTranscript = transcriptRows.map((row: { text: string }) => row.text).join(" ").trim();
  if (!fullTranscript) {
    return null;
  }

  const lead = extractLeadSignals(fullTranscript);

  return prisma.leadExtraction.upsert({
    where: {
      callId,
    },
    create: {
      callId,
      tenantId,
      extractedAt: new Date(),
      summary: lead.summary,
      intent: lead.intent,
      propertyType: lead.propertyType,
      location: lead.location,
      budget: lead.budget,
      timeline: lead.timeline,
      phoneNumber: lead.phoneNumber,
      rawJson: serializeUnknown({
        strategy: "heuristic",
        transcriptLength: fullTranscript.length,
      }),
    },
    update: {
      extractedAt: new Date(),
      summary: lead.summary,
      intent: lead.intent,
      propertyType: lead.propertyType,
      location: lead.location,
      budget: lead.budget,
      timeline: lead.timeline,
      phoneNumber: lead.phoneNumber,
      rawJson: serializeUnknown({
        strategy: "heuristic",
        transcriptLength: fullTranscript.length,
      }),
    },
  });
}

export async function ingestVoiceEvent(args: {
  eventId: string;
  headers: Record<string, string | string[] | undefined>;
  rawBody: unknown;
  envelope: VoiceEventEnvelopeInput;
}) {
  const tenantId = normalizeTenantId(args.envelope.tenant_id);
  await ensureTenant(tenantId);

  const occurredAt = new Date(args.envelope.occurred_at);

  await prisma.callSession.upsert({
    where: { id: args.envelope.call_id },
    update: {
      tenantId,
      roomId: args.envelope.room_id,
    },
    create: {
      id: args.envelope.call_id,
      tenantId,
      roomId: args.envelope.room_id,
      direction: "outbound",
      status: "initiated",
      initiatedAt: occurredAt,
    },
  });

  try {
    await prisma.callEvent.create({
      data: {
        eventId: args.eventId,
        tenantId,
        callId: args.envelope.call_id,
        eventType: args.envelope.event_type,
        occurredAt,
        payloadJson: serializeUnknown(args.envelope.payload),
        rawEnvelope: serializeUnknown(args.rawBody),
        rawHeaders: serializeUnknown(args.headers),
        normalizedJson: serializeUnknown({
          callId: args.envelope.call_id,
          tenantId,
          roomId: args.envelope.room_id,
          eventType: args.envelope.event_type,
        }),
      },
    });
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return {
        accepted: false,
        reason: "DUPLICATE_EVENT_ID",
      };
    }

    throw error;
  }

  if (args.envelope.event_type === "publisher_test") {
    logger.info("Accepted publisher_test event", {
      eventId: args.eventId,
      callId: args.envelope.call_id,
      tenantId,
    });

    return {
      accepted: true,
      reason: "TEST_EVENT_ACCEPTED",
    };
  }

  if (args.envelope.event_type === "call_started") {
    const payload = args.envelope.payload;
    await prisma.callSession.update({
      where: { id: args.envelope.call_id },
      data: {
        status: "active",
        connectedAt: occurredAt,
        phoneNumber: payload.phone_number ? String(payload.phone_number) : undefined,
        agentName: payload.agent_name ? String(payload.agent_name) : undefined,
        direction: payload.direction ? String(payload.direction) : undefined,
      },
    });
  }

  if (args.envelope.event_type === "call_ringing") {
    await prisma.callSession.update({
      where: { id: args.envelope.call_id },
      data: {
        status: "ringing",
      },
    });
  }

  if (args.envelope.event_type === "call_connected") {
    await prisma.callSession.update({
      where: { id: args.envelope.call_id },
      data: {
        status: "connected",
        connectedAt: occurredAt,
      },
    });
  }

  if (args.envelope.event_type === "transcript_partial" || args.envelope.event_type === "transcript_final") {
    const parsed = parseTranscriptPayload(args.envelope.payload);
    await prisma.transcriptSegment.upsert({
      where: {
        callId_sequenceNo: {
          callId: args.envelope.call_id,
          sequenceNo: parsed.sequenceNo,
        },
      },
      create: {
        callId: args.envelope.call_id,
        tenantId,
        speaker: parsed.speaker,
        text: parsed.text,
        isFinal: parsed.final,
        sequenceNo: parsed.sequenceNo,
        providerMessageId: parsed.providerMessageId,
        rawJson: serializeUnknown(args.envelope.payload),
        occurredAt,
      },
      update: {
        speaker: parsed.speaker,
        text: parsed.text,
        isFinal: parsed.final,
        providerMessageId: parsed.providerMessageId,
        rawJson: serializeUnknown(args.envelope.payload),
        occurredAt,
      },
    });

    if (args.envelope.event_type === "transcript_final") {
      await upsertLeadFromTranscript(tenantId, args.envelope.call_id);
    }
  }

  if (args.envelope.event_type === "call_completed") {
    const payload = args.envelope.payload;
    await prisma.callSession.update({
      where: { id: args.envelope.call_id },
      data: {
        status: "completed",
        completedAt: occurredAt,
        durationSec: payload.duration_sec ? Number(payload.duration_sec) : undefined,
        transcriptTurns: payload.transcript_turns ? Number(payload.transcript_turns) : undefined,
        recordingUrl: payload.recording_url ? String(payload.recording_url) : undefined,
      },
    });

    await upsertLeadFromTranscript(tenantId, args.envelope.call_id);

    await enforceWalletGuardOrBypass({
      tenantId,
      amountPaise: DEFAULT_OUTBOUND_CALL_CHARGE_PAISE,
      callId: args.envelope.call_id,
      sourceEventId: args.eventId,
    });
  }

  if (args.envelope.event_type === "call_failed") {
    await prisma.callSession.update({
      where: { id: args.envelope.call_id },
      data: {
        status: "failed",
        failedAt: occurredAt,
        lastError: String(args.envelope.payload.error || "unknown call failure"),
      },
    });
  }

  publishRealtimeVoiceEvent({
    eventId: args.eventId,
    tenantId,
    callId: args.envelope.call_id,
    roomId: args.envelope.room_id,
    eventType: args.envelope.event_type,
    occurredAt: args.envelope.occurred_at,
    payload: args.envelope.payload,
    rawEnvelope: args.rawBody,
    rawHeaders: args.headers,
  });
  logger.info(`[REALTIME] published call_event for callId=${args.envelope.call_id}`, {
    eventId: args.eventId,
    tenantId,
    eventType: args.envelope.event_type,
  });

  return {
    accepted: true,
  };
}

export async function ingestAgentLog(args: {
  eventId: string;
  tenantId: string;
  callId: string;
  roomId: string;
  level?: string;
  message: string;
  meta?: unknown;
  occurredAt?: string;
  headers: Record<string, string | string[] | undefined>;
  rawBody: unknown;
}) {
  const tenantId = normalizeTenantId(args.tenantId);
  await ensureTenant(tenantId);

  const occurredAt = parseOptionalDateTime(args.occurredAt) || new Date();

  await prisma.callSession.upsert({
    where: { id: args.callId },
    update: {
      tenantId,
      roomId: args.roomId,
    },
    create: {
      id: args.callId,
      tenantId,
      roomId: args.roomId,
      direction: "outbound",
      status: "initiated",
      initiatedAt: occurredAt,
    },
  });

  try {
    await prisma.callEvent.create({
      data: {
        eventId: args.eventId,
        tenantId,
        callId: args.callId,
        eventType: "agent_log",
        occurredAt,
        payloadJson: serializeUnknown({
          level: args.level || "info",
          message: args.message,
          meta: args.meta ?? null,
        }),
        rawEnvelope: serializeUnknown(args.rawBody),
        rawHeaders: serializeUnknown(args.headers),
        normalizedJson: serializeUnknown({
          tenantId,
          callId: args.callId,
          roomId: args.roomId,
          level: args.level || "info",
          message: args.message,
        }),
      },
    });
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return { accepted: false, reason: "DUPLICATE_EVENT_ID" };
    }
    throw error;
  }

  logger.info("Agent log event accepted", {
    eventId: args.eventId,
    tenantId,
    callId: args.callId,
  });

  return { accepted: true };
}
