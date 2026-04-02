import { PlanCapabilities } from "./plans";
import { WorkspaceTenantConfig } from "./workspace";

export type CallState =
  | "initiated"
  | "dispatching"
  | "ringing"
  | "connected"
  | "active"
  | "completed"
  | "failed";

export interface InitiateCallRequest {
  tenantId: string;
  roomId: string;
  phoneNumber?: string | null;
  agentName: string;
  direction: "inbound" | "outbound";
}

export interface InitiateCallResponse {
  callId: string;
  tenantId: string;
  roomId: string;
  state: CallState;
  dispatch: {
    webhookUrl: string;
    eventAuthMode: "bearer";
    expectedHeaders: string[];
  };
}

export interface CallSummary {
  callId: string;
  tenantId: string;
  roomId: string;
  state: CallState;
  initiatedAt: string;
  connectedAt?: string;
  completedAt?: string;
  failedAt?: string;
}

export interface CallEventSummary {
  eventType: string;
  count: number;
}

export interface CallDetail extends CallSummary {
  phoneNumber?: string | null;
  agentName?: string | null;
  direction?: string | null;
  durationSec?: number | null;
  transcriptTurns?: number | null;
  recordingUrl?: string | null;
  estimatedCost?: number | null;
  lastError?: string | null;
  eventSummary: CallEventSummary[];
}

export interface TranscriptSegmentItem {
  id: string;
  callId: string;
  speaker: "user" | "agent";
  text: string;
  isFinal: boolean;
  sequenceNo: number;
  occurredAt: string;
  providerMessageId?: string | null;
}

export interface RecordingResponse {
  callId: string;
  tenantId: string;
  available: boolean;
  recordingUrl: string | null;
  signedUrl: string | null;
}

export interface LeadResponse {
  callId: string;
  tenantId: string;
  extractedAt: string;
  fields: {
    name: string | null;
    phone: string | null;
    summary: string;
  };
  confidence: number | null;
}

export interface CallsQuery {
  page?: number;
  pageSize?: number;
  status?: CallState;
  from?: string;
  to?: string;
}

export interface TranscriptQuery {
  page?: number;
  pageSize?: number;
}

export interface CapabilitiesResponse {
  tenantId: string;
  capabilities: PlanCapabilities;
  workspaceConfig: WorkspaceTenantConfig;
}
