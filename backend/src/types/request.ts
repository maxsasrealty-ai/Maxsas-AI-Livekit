export interface RequestContext {
  requestId: string;
  tenantId?: string;
  source: "api" | "webhook";
}

export interface WebhookHeaderContext {
  eventId?: string;
  callId?: string;
  occurredAt?: string;
}

export interface VoiceWebhookContext {
  requestContext: RequestContext;
  webhookHeaders: WebhookHeaderContext;
  rawBody?: string;
}
