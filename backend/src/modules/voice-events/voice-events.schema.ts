import { z } from "zod";

export const voiceEventTypeValues = [
  "transcript_partial",
  "transcript_final",
  "call_ringing",
  "call_connected",
  "call_started",
  "lead_extracted",
  "call_completed",
  "call_failed",
  "publisher_test",
] as const;

export const voiceEventTypeSchema = z.enum(voiceEventTypeValues);

export const voiceEventEnvelopeSchema = z.object({
  event_type: voiceEventTypeSchema,
  tenant_id: z.string().min(1),
  call_id: z.string().min(1),
  room_id: z.string().min(1),
  occurred_at: z.string().datetime().or(z.string().min(1)),
  payload: z.record(z.string(), z.unknown()).default({}),
});

export type VoiceEventEnvelopeInput = z.infer<typeof voiceEventEnvelopeSchema>;
