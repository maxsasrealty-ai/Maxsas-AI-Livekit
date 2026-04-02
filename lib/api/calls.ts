import {
    ApiEnvelope,
    CallDetail,
    CallsQuery,
    CallSummary,
    CapabilitiesResponse,
    InitiateCallRequest,
    InitiateCallResponse,
    LeadResponse,
    RecordingResponse,
    TranscriptQuery,
    TranscriptSegmentItem,
} from "../../shared/contracts";

import { apiClient } from "./client";

function toQueryString(query?: Record<string, string | number | undefined>): string {
  if (!query) {
    return "";
  }

  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, String(value));
    }
  });

  const encoded = params.toString();
  return encoded ? `?${encoded}` : "";
}

export async function createCall(
  payload: Omit<InitiateCallRequest, "tenantId">
): Promise<ApiEnvelope<InitiateCallResponse>> {
  return apiClient.post<Omit<InitiateCallRequest, "tenantId">, InitiateCallResponse>(
    "/calls",
    payload
  );
}

export async function fetchCalls(query?: CallsQuery): Promise<ApiEnvelope<CallSummary[]>> {
  const path = `/calls${toQueryString({
    page: query?.page,
    pageSize: query?.pageSize,
    status: query?.status,
    from: query?.from,
    to: query?.to,
  })}`;

  return apiClient.get<CallSummary[]>(path);
}

export async function fetchCallDetail(callId: string): Promise<ApiEnvelope<CallDetail>> {
  return apiClient.get<CallDetail>(`/calls/${encodeURIComponent(callId)}`);
}

export async function fetchCallTranscript(
  callId: string,
  query?: TranscriptQuery
): Promise<ApiEnvelope<TranscriptSegmentItem[]>> {
  const path = `/calls/${encodeURIComponent(callId)}/transcript${toQueryString({
    page: query?.page,
    pageSize: query?.pageSize,
  })}`;

  return apiClient.get<TranscriptSegmentItem[]>(path);
}

export async function fetchCallRecording(callId: string): Promise<ApiEnvelope<RecordingResponse>> {
  return apiClient.get<RecordingResponse>(`/calls/${encodeURIComponent(callId)}/recording`);
}

export async function fetchCallLead(callId: string): Promise<ApiEnvelope<LeadResponse>> {
  return apiClient.get<LeadResponse>(`/calls/${encodeURIComponent(callId)}/lead`);
}

export async function fetchCapabilities(): Promise<ApiEnvelope<CapabilitiesResponse>> {
  return apiClient.get<CapabilitiesResponse>("/capabilities");
}
