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
import {
    createCallSession,
    getCallSessionById,
    updateCallSessionState,
} from "../repositories/callRepository";
import { createCallEvent, findEventByDedupKey } from "../repositories/eventRepository";
import { upsertLeadExtraction } from "../repositories/leadRepository";
import { upsertTenant } from "../repositories/tenantRepository";
import { upsertTranscriptSegment } from "../repositories/transcriptRepository";
import { deriveStateFromEvent, transitionOrStay } from "./calls/callStateMachine";
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
  eventId: string;
  callId: string;
  eventType: VoiceEventType;
  occurredAt: string;
}): Promise<{ accepted: boolean; reason?: string }> {
  const { eventId, callId, eventType, occurredAt } = args;

  if (processedEventIds.has(eventId)) {
    return {
      accepted: false,
      reason: "DUPLICATE_EVENT",
    };
  }

  const existing = await findEventByDedupKey({
    callId,
    eventType,
    occurredAt: new Date(occurredAt),
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

function serializeUnknown(input: unknown): string {
  return JSON.stringify(input ?? null);
}

async function ensureCallSessionExists(event: NormalizedVoiceEvent): Promise<void> {
  const existingCall = await getCallSessionById(event.callId, event.tenantId);
  if (existingCall) {
    return;
  }

  await createCallSession({
    callId: event.callId,
    tenantId: event.tenantId,
    roomId: event.roomId,
    state: "dispatching",
  });
}

async function applyEventPayloadEffects(event: NormalizedVoiceEvent): Promise<void> {
  if (event.eventType === "transcript_partial" || event.eventType === "transcript_final") {
    const payload = event.payload as TranscriptEventPayload;
    await upsertTranscriptSegment({
      callId: event.callId,
      tenantId: event.tenantId,
      speaker: payload.speaker,
      text: payload.text,
      isFinal: payload.final,
      sequenceNo: payload.sequence_no,
      providerMessageId: payload.provider_message_id,
      rawJson: serializeUnknown(payload.raw),
      occurredAt: new Date(event.occurredAt),
    });
    return;
  }

  if (event.eventType === "lead_extracted") {
    const payload = event.payload as LeadExtractedPayload;
    await upsertLeadExtraction({
      callId: event.callId,
      tenantId: event.tenantId,
      extractedAt: new Date(payload.extracted_at),
      name: payload.fields.name,
      phone: payload.fields.phone,
      summary: payload.fields.summary,
      confidence: payload.confidence,
      rawJson: serializeUnknown(payload.raw),
    });
  }
}

async function applyStateTransition(event: NormalizedVoiceEvent): Promise<void> {
  const call = await getCallSessionById(event.callId, event.tenantId);
  if (!call) {
    return;
  }

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
  }

  if (event.eventType === "call_failed") {
    const payload = event.payload as CallFailedPayload;
    transitionPayload.failedAt = new Date(event.occurredAt);
    transitionPayload.lastError = `${payload.stage}: ${payload.error}`;
  }

  await updateCallSessionState({
    callId: event.callId,
    tenantId: event.tenantId,
    state: nextState,
    ...transitionPayload,
  });
}

export async function processNormalizedVoiceEvent(event: NormalizedVoiceEvent): Promise<void> {
  await upsertTenant({ tenantId: event.tenantId });
  await ensureCallSessionExists(event);

  await createCallEvent({
    callId: event.callId,
    tenantId: event.tenantId,
    eventType: event.eventType,
    occurredAt: new Date(event.occurredAt),
    eventId: event.eventId,
    payloadJson: serializeUnknown(event.payload as VoiceEventPayload),
    rawEnvelope: serializeUnknown(event.rawEnvelope),
    rawHeaders: serializeUnknown(event.rawHeaders),
  });

  await applyEventPayloadEffects(event);
  await applyStateTransition(event);
  publishRealtimeVoiceEvent(event);
}
