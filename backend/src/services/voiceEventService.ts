import {
    CallCompletedPayload,
    CallFailedPayload,
    CallStartedPayload,
    LeadExtractedPayload,
    NormalizedVoiceEvent,
    TranscriptEventPayload,
    VoiceEventEnvelope,
    VoiceEventHeaders,
    VoiceEventPayload,
    VoiceEventType,
} from "../../../shared/contracts/voice-events";
import { Prisma } from "../generated/prisma";
import { logger } from "../lib/logger";
import { prisma } from "../lib/prisma";
import { assertUuid, isUuid } from "../lib/uuid";
import {
    bindExternalCallId,
    createCallSession,
    getCallSessionByExternalId,
    getCallSessionById,
    updateCallSessionState,
} from "../repositories/callRepository";
import { createCallEvent, findEventByDedupKey } from "../repositories/eventRepository";
import { upsertLeadExtraction } from "../repositories/leadRepository";
import { upsertTenant } from "../repositories/tenantRepository";
import { upsertTranscriptSegment } from "../repositories/transcriptRepository";
import { processIdempotentDebit } from "../repositories/walletRepository";
import { deriveStateFromEvent, transitionOrStay } from "./calls/callStateMachine";
import { DEFAULT_CALL_DEBIT_PAISE } from "./paymentService";
import { publishRealtimeVoiceEvent } from "./realtimeService";

const SUPPORTED_EVENT_TYPES: Set<VoiceEventType> = new Set([
  "transcript_partial",
  "transcript_final",
  "call_started",
  "lead_extracted",
  "call_completed",
  "call_failed",
]);

const processedEventIds = new Set<string>();

export interface VoiceEventValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateVoiceEventEnvelope(envelope: unknown): VoiceEventValidationResult {
  const errors: string[] = [];

  if (!envelope || typeof envelope !== "object") {
    return { isValid: false, errors: ["Envelope must be an object"] };
  }

  const candidate = envelope as Partial<VoiceEventEnvelope>;

  if (!candidate.event_type || !SUPPORTED_EVENT_TYPES.has(candidate.event_type as VoiceEventType)) {
    errors.push("Unsupported or missing event_type");
  }

  if (!candidate.tenant_id || typeof candidate.tenant_id !== "string") {
    errors.push("Missing tenant_id");
  }

  if (!candidate.call_id || typeof candidate.call_id !== "string") {
    errors.push("Missing call_id");
  }

  if (!candidate.room_id || typeof candidate.room_id !== "string") {
    errors.push("Missing room_id");
  }

  if (!candidate.occurred_at || typeof candidate.occurred_at !== "string") {
    errors.push("Missing occurred_at");
  }

  if (typeof candidate.payload !== "object" || candidate.payload === null) {
    errors.push("Missing payload");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function normalizeVoiceEvent(args: {
  envelope: VoiceEventEnvelope;
  headers: VoiceEventHeaders;
  rawEnvelope: unknown;
  rawHeaders: Record<string, string | string[] | undefined>;
}): NormalizedVoiceEvent {
  const { envelope, headers, rawEnvelope, rawHeaders } = args;

  return {
    eventId: headers.eventId,
    eventType: envelope.event_type,
    tenantId: envelope.tenant_id,
    callId: envelope.call_id,
    roomId: envelope.room_id,
    occurredAt: envelope.occurred_at,
    payload: envelope.payload,
    rawEnvelope,
    rawHeaders,
  };
}

export async function markEventAsProcessing(args: {
  tenantId: string;
  eventId: string;
  callId: string;
  eventType: VoiceEventType;
  occurredAt: string;
}): Promise<{ accepted: boolean; reason?: string }> {
  const { eventId, tenantId } = args;
  assertUuid(tenantId, "tenantId");

  if (processedEventIds.has(eventId)) {
    return {
      accepted: false,
      reason: "DUPLICATE_EVENT",
    };
  }

  const existing = await findEventByDedupKey({
    tenantId,
    eventId,
  });

  if (existing) {
    return {
      accepted: false,
      reason: "DUPLICATE_EVENT",
    };
  }

  processedEventIds.add(eventId);
  return { accepted: true };
}

function toJsonValue(input: unknown): Prisma.InputJsonValue {
  return (input ?? Prisma.JsonNull) as Prisma.InputJsonValue;
}

async function ensureCallSessionExists(
  event: NormalizedVoiceEvent,
  db: Prisma.TransactionClient
) {
  assertUuid(event.tenantId, "tenantId");

  const existingByExternal = await getCallSessionByExternalId(event.callId, event.tenantId, db);
  if (existingByExternal) {
    return existingByExternal;
  }

  if (isUuid(event.callId)) {
    const existingByInternal = await getCallSessionById(event.callId, event.tenantId, db);
    if (existingByInternal) {
      if (!existingByInternal.externalCallId) {
        const rebound = await bindExternalCallId({
          callId: existingByInternal.id,
          tenantId: event.tenantId,
          externalCallId: event.callId,
          db,
        });
        if (rebound) {
          return rebound;
        }
      }
      return existingByInternal;
    }
  }

  return createCallSession({
    tenantId: event.tenantId,
    externalCallId: event.callId,
    roomId: event.roomId,
    state: "dispatching",
    db,
  });
}

async function applyEventPayloadEffects(args: {
  event: NormalizedVoiceEvent;
  callSessionId: string;
  db: Prisma.TransactionClient;
}): Promise<void> {
  const { event, callSessionId, db } = args;
  if (event.eventType === "transcript_partial" || event.eventType === "transcript_final") {
    const payload = event.payload as TranscriptEventPayload;
    await upsertTranscriptSegment({
      callId: callSessionId,
      tenantId: event.tenantId,
      speaker: payload.speaker,
      text: payload.text,
      isFinal: payload.final,
      sequenceNo: payload.sequence_no,
      providerMessageId: payload.provider_message_id,
      rawJson: toJsonValue(payload.raw),
      occurredAt: new Date(event.occurredAt),
      db,
    });

    logger.info("Transcript segment saved", {
      eventId: event.eventId,
      eventType: event.eventType,
      callId: event.callId,
      tenantId: event.tenantId,
      sequenceNo: payload.sequence_no,
      isFinal: payload.final,
    });
    return;
  }

  if (event.eventType === "lead_extracted") {
    const payload = event.payload as LeadExtractedPayload;
    await upsertLeadExtraction({
      callId: callSessionId,
      tenantId: event.tenantId,
      extractedAt: new Date(payload.extracted_at),
      name: payload.fields.name,
      phone: payload.fields.phone,
      summary: payload.fields.summary,
      confidence: payload.confidence,
      rawJson: toJsonValue(payload.raw),
      db,
    });

    logger.info("Lead saved", {
      eventId: event.eventId,
      eventType: event.eventType,
      callId: event.callId,
      tenantId: event.tenantId,
    });
  }
}

async function applyStateTransition(args: {
  event: NormalizedVoiceEvent;
  callId: string;
  db: Prisma.TransactionClient;
}): Promise<void> {
  const { event, callId, db } = args;
  const call = await getCallSessionById(callId, event.tenantId, db);
  if (!call) return;

  const target = deriveStateFromEvent(event.eventType);
  if (!target) {
    return;
  }

  const nextState = transitionOrStay(call.status, target);

  const transitionPayload: {
    connectedAt?: Date;
    completedAt?: Date;
    failedAt?: Date;
    durationSec?: number;
    transcriptTurns?: number;
    recordingUrl?: string | null;
    lastError?: string | null;
  } = {};

  if (event.eventType === "call_started") {
    const payload = event.payload as CallStartedPayload;
    if (payload.status === "started") {
      transitionPayload.connectedAt = new Date(event.occurredAt);
    }
  }

  if (event.eventType === "call_completed") {
    const payload = event.payload as CallCompletedPayload;
    transitionPayload.completedAt = new Date(event.occurredAt);
    transitionPayload.durationSec = payload.duration_sec;
    transitionPayload.transcriptTurns = payload.transcript_turns;
    transitionPayload.recordingUrl = payload.recording_url;

    await processIdempotentDebit({
      tenantId: event.tenantId,
      amountPaise: DEFAULT_CALL_DEBIT_PAISE,
      description: `AI call usage — ${call.id}`,
      referenceId: `call_debit_${call.id}`,
      db,
    });
  }

  if (event.eventType === "call_failed") {
    const payload = event.payload as CallFailedPayload;
    transitionPayload.failedAt = new Date(event.occurredAt);
    transitionPayload.lastError = `${payload.stage}: ${payload.error}`;
  }

  await updateCallSessionState({
    callId,
    tenantId: event.tenantId,
    state: nextState,
    ...transitionPayload,
    db,
  });
}

export async function processNormalizedVoiceEvent(event: NormalizedVoiceEvent): Promise<void> {
  assertUuid(event.tenantId, "tenantId");
  await upsertTenant({ tenantId: event.tenantId });

  logger.info("Voice webhook processing event", {
    eventId: event.eventId,
    eventType: event.eventType,
    callId: event.callId,
    tenantId: event.tenantId,
  });

  try {
    await prisma.$transaction(async (tx) => {
      const callSession = await ensureCallSessionExists(event, tx);

      await createCallEvent({
        callId: callSession.id,
        tenantId: event.tenantId,
        eventType: event.eventType,
        occurredAt: new Date(event.occurredAt),
        eventId: event.eventId,
        payloadJson: toJsonValue(event.payload as VoiceEventPayload),
        rawEnvelope: toJsonValue(event.rawEnvelope),
        rawHeaders: toJsonValue(event.rawHeaders),
        db: tx,
      });

      await applyEventPayloadEffects({
        event,
        callSessionId: callSession.id,
        db: tx,
      });

      await applyStateTransition({
        event,
        callId: callSession.id,
        db: tx,
      });
    });
  } catch (error) {
    logger.error("Voice webhook DB transaction failed", {
      eventId: event.eventId,
      eventType: event.eventType,
      callId: event.callId,
      tenantId: event.tenantId,
      message: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }

  logger.info("Voice event persisted", {
    eventId: event.eventId,
    eventType: event.eventType,
    callId: event.callId,
    tenantId: event.tenantId,
  });

  publishRealtimeVoiceEvent(event);

  logger.info("Voice SSE event published", {
    eventId: event.eventId,
    eventType: event.eventType,
    callId: event.callId,
    tenantId: event.tenantId,
  });
}
