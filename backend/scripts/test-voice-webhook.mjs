const baseUrl = process.env.API_BASE_URL || "http://localhost:4000";
const webhookToken = process.env.VOICE_WEBHOOK_BEARER_TOKEN || "dev_secret_token_livekit_99";

const payload = {
  event_type: "publisher_test",
  tenant_id: "lexus-demo",
  call_id: `call_test_${Date.now()}`,
  room_id: `room_test_${Date.now()}`,
  occurred_at: new Date().toISOString(),
  payload: {
    message: "publisher_test from script"
  }
};

const response = await fetch(`${baseUrl}/api/webhooks/voice/events`, {
  method: "POST",
  headers: {
    "content-type": "application/json",
    "authorization": `Bearer ${webhookToken}`,
    "x-event-id": `evt_test_${Date.now()}`
  },
  body: JSON.stringify(payload)
});

const text = await response.text();
console.log("Status:", response.status);
console.log(text);
