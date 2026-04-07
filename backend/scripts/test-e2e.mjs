const baseUrl = process.env.API_BASE_URL || "http://localhost:4000";
const tenantId = process.env.TEST_TENANT_ID || "lexus-demo";
const webhookToken = process.env.VOICE_WEBHOOK_BEARER_TOKEN || "dev_secret_token_livekit_99";
const phoneNumber = process.env.TEST_PHONE_NUMBER || "+918588837040";
const agentName = process.env.TEST_AGENT_NAME || "maxsas-voice-agent-prod";

function headers(extra = {}) {
  return {
    "content-type": "application/json",
    "x-tenant-id": tenantId,
    ...extra,
  };
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);
  const text = await response.text();
  const body = text ? JSON.parse(text) : {};
  if (!response.ok || body.success === false) {
    throw new Error(`${response.status}: ${body?.error?.message || text || "request failed"}`);
  }
  return body;
}

async function fetchJsonAllowStatus(url, options = {}, allowedStatuses = []) {
  const response = await fetch(url, options);
  const text = await response.text();
  const body = text ? JSON.parse(text) : {};

  if (!response.ok && !allowedStatuses.includes(response.status)) {
    throw new Error(`${response.status}: ${body?.error?.message || text || "request failed"}`);
  }

  return { status: response.status, body };
}

async function postWebhook(eventType, callId, roomId, payload = {}) {
  const eventId = `evt_e2e_${eventType}_${Date.now()}`;
  return fetchJson(`${baseUrl}/api/webhooks/voice/events`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${webhookToken}`,
      "x-event-id": eventId,
    },
    body: JSON.stringify({
      event_type: eventType,
      tenant_id: tenantId,
      call_id: callId,
      room_id: roomId,
      occurred_at: new Date().toISOString(),
      payload,
    }),
  });
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  console.log("[E2E] Creating outbound call...");
  const outbound = await fetchJson(`${baseUrl}/api/calls`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      roomId: `room_${Date.now()}`,
      phoneNumber,
      agentName,
      direction: "outbound",
    }),
  });

  const call = outbound.data;
  if (!call?.id && !call?.callId) {
    throw new Error("Outbound call response missing call id");
  }

  const resolvedCallId = call?.id || call?.callId;

  console.log(`[E2E] Call created: ${resolvedCallId}`);

  const stateHistory = [];
  for (let i = 0; i < 6; i += 1) {
    const status = await fetchJson(`${baseUrl}/api/calls/${resolvedCallId}`, {
      method: "GET",
      headers: headers(),
    });
    const state = status?.data?.state || status?.data?.status || "unknown";
    stateHistory.push(state);
    console.log(`[E2E] Poll ${i + 1}: ${state}`);
    await sleep(2000);
  }

  const roomId = call.roomId || `room-${resolvedCallId}`;

  console.log("[E2E] Sending synthetic lifecycle webhooks for persistence verification...");
  await postWebhook("call_connected", resolvedCallId, roomId, { status: "connected" });
  await postWebhook("transcript_final", resolvedCallId, roomId, {
    speaker: "user",
    text: "Hi I am interested in a 3 BHK in Gurgaon with budget around 2 crore",
    final: true,
    sequence_no: 1,
    provider_message_id: `pm_${Date.now()}`,
  });
  await postWebhook("call_started", resolvedCallId, roomId, {
    phone_number: phoneNumber,
    agent_name: agentName,
    direction: "outbound",
    status: "started",
  });
  await postWebhook("call_completed", resolvedCallId, roomId, {
    status: "completed",
    ended_by: "participant_disconnected",
    duration_sec: 42,
    transcript_turns: 5,
    recording_url: null,
  });

  const callDetail = await fetchJson(`${baseUrl}/api/calls/${resolvedCallId}`, {
    method: "GET",
    headers: headers(),
  });
  const transcriptResponse = await fetchJsonAllowStatus(
    `${baseUrl}/api/calls/${resolvedCallId}/transcript`,
    {
      method: "GET",
      headers: headers(),
    },
    [403]
  );
  const leads = await fetchJson(`${baseUrl}/api/leads`, {
    method: "GET",
    headers: headers(),
  });

  const linkedLead = (leads.data || []).find((item) => item.callId === resolvedCallId);
  const transcriptItems = transcriptResponse.status === 200 ? (transcriptResponse.body.data || []) : [];
  const transcriptBlockedByPlan = transcriptResponse.status === 403;

  console.log("[E2E] Final call state:", callDetail?.data?.state || callDetail?.data?.status);
  console.log("[E2E] Transcript segments:", transcriptItems.length);
  if (transcriptBlockedByPlan) {
    console.log("[E2E] Transcript endpoint blocked by tenant capabilities (expected for non-full plans)");
  }
  console.log("[E2E] Lead linked:", Boolean(linkedLead));

  if (!callDetail?.data?.callId) {
    throw new Error("Call detail not found after lifecycle events");
  }

  if (!transcriptBlockedByPlan && transcriptItems.length === 0) {
    throw new Error("Transcript persistence failed");
  }

  if (!linkedLead) {
    throw new Error("Lead extraction persistence failed");
  }

  console.log("[E2E] PASS");
  console.log(JSON.stringify({ callId: call.id, stateHistory }, null, 2));
}

main().catch((error) => {
  console.error("[E2E] FAIL", error.message);
  process.exit(1);
});
