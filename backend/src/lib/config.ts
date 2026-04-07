import { z, type ZodIssue } from "zod";

const envSchema = z.object({
  APP_ENV: z.enum(["development", "staging", "production"]).default("development"),
  NODE_ENV: z.string().optional(),
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.string().min(1),
  REDIS_URL: z.string().default("redis://127.0.0.1:6379"),
  OUTBOUND_QUEUE_CONCURRENCY: z.coerce.number().int().positive().default(5),
  API_BASE_URL: z.string().default("http://localhost:4000"),
  VOICE_WEBHOOK_PUBLIC_URL: z.string().optional(),
  LIVEKIT_AGENT_NAME: z.string().min(1).default("maxsas-voice-agent-prod"),
  LIVEKIT_URL: z.string().min(1).optional(),
  LIVEKIT_API_KEY: z.string().min(1).optional(),
  LIVEKIT_API_SECRET: z.string().min(1).optional(),
  SIP_OUTBOUND_TRUNK_ID: z.string().min(1).optional(),
  LIVEKIT_OUTBOUND_TRUNK_ID: z.string().min(1).optional(),
  VOICE_WEBHOOK_BEARER_TOKEN: z.string().min(1).optional(),
  VOICE_TEST_MODE: z
    .string()
    .optional()
    .transform((value: string | undefined) => value === "true"),
  BILLING_BYPASS: z
    .string()
    .optional()
    .transform((value: string | undefined) => value === "true"),
});

const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
  const issues = parsed.error.issues.map((issue: ZodIssue) => `${issue.path.join(".")}: ${issue.message}`).join("; ");
  throw new Error(`Invalid environment configuration: ${issues}`);
}

export const config = {
  ...parsed.data,
  isProduction: parsed.data.APP_ENV === "production",
  isTestMode: Boolean(parsed.data.VOICE_TEST_MODE),
  isBillingBypass: Boolean(parsed.data.BILLING_BYPASS),
  sipTrunkId: parsed.data.SIP_OUTBOUND_TRUNK_ID || parsed.data.LIVEKIT_OUTBOUND_TRUNK_ID || "",
  voiceWebhookUrl: `${(parsed.data.VOICE_WEBHOOK_PUBLIC_URL || parsed.data.API_BASE_URL).replace(/\/$/, "")}/api/webhooks/voice/events`,
  agentLogsWebhookUrl: `${(parsed.data.VOICE_WEBHOOK_PUBLIC_URL || parsed.data.API_BASE_URL).replace(/\/$/, "")}/api/webhooks/voice/agent-logs`,
};

export function normalizePhoneNumber(phoneNumber: string): string {
  const digitsOnly = phoneNumber.trim().replace(/\D/g, "");

  if (!digitsOnly) {
    throw new Error("A valid phone number is required.");
  }

  return `+${digitsOnly}`;
}

export function buildLivekitMetadata(input: {
  callId: string;
  tenantId: string;
  roomId: string;
  phoneNumber: string;
  agentName?: string | null;
  direction?: string | null;
  extras?: Record<string, unknown>;
}): Record<string, unknown> {
  const phoneNumber = normalizePhoneNumber(input.phoneNumber);
  const agentName = input.agentName?.trim() || config.LIVEKIT_AGENT_NAME;

  return {
    callId: input.callId,
    call_id: input.callId,
    tenantId: input.tenantId,
    tenant_id: input.tenantId,
    roomId: input.roomId,
    room_id: input.roomId,
    agentName,
    agent_name: agentName,
    direction: input.direction || "outbound",
    phone_number: phoneNumber,
    ...(input.extras || {}),
  };
}

export function serializeLivekitMetadata(input: Parameters<typeof buildLivekitMetadata>[0]): string {
  return JSON.stringify(buildLivekitMetadata(input));
}
