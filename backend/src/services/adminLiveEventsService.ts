export type AdminLiveEventStage =
  | "received"
  | "invalid_json"
  | "validation_failed"
  | "persisted"
  | "duplicate"
  | "error";

export interface AdminLiveEvent {
  streamEventId: string;
  occurredAt: string;
  stage: AdminLiveEventStage;
  dbUpdated: boolean;
  eventId?: string;
  tenantId?: string;
  callId?: string;
  roomId?: string;
  eventType?: string;
  message?: string;
  rawBody?: unknown;
  normalizedBody?: unknown;
}

const listeners = new Set<(event: AdminLiveEvent) => void>();
const recentEvents: AdminLiveEvent[] = [];
const MAX_RECENT_EVENTS = 250;

export function subscribeAdminLiveEvents(onEvent: (event: AdminLiveEvent) => void): () => void {
  listeners.add(onEvent);
  return () => {
    listeners.delete(onEvent);
  };
}

export function publishAdminLiveEvent(event: Omit<AdminLiveEvent, "streamEventId" | "occurredAt">): void {
  const mapped: AdminLiveEvent = {
    streamEventId: `admin-live-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
    occurredAt: new Date().toISOString(),
    ...event,
  };

  recentEvents.unshift(mapped);
  if (recentEvents.length > MAX_RECENT_EVENTS) {
    recentEvents.length = MAX_RECENT_EVENTS;
  }

  listeners.forEach((listener) => listener(mapped));
}

export function getRecentAdminLiveEvents(limit = 50): AdminLiveEvent[] {
  const safeLimit = Math.max(1, Math.min(200, limit));
  return recentEvents.slice(0, safeLimit);
}
