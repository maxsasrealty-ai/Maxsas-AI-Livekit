import { Router } from "express";
import { z } from "zod";

import { verifyWebhookAuth } from "../../middleware/verifyWebhookAuth";
import { voiceEventEnvelopeSchema } from "./voice-events.schema";
import { ingestAgentLog, ingestVoiceEvent } from "./voice-events.service";

const voiceEventsRouter = Router();

const agentLogSchema = z.object({
  tenant_id: z.string().min(1),
  call_id: z.string().min(1),
  room_id: z.string().min(1),
  level: z.string().min(1).optional(),
  message: z.string().min(1),
  occurred_at: z.string().optional(),
  meta: z.unknown().optional(),
});

voiceEventsRouter.post("/voice/events", verifyWebhookAuth, async (req, res) => {
  const rawBody = typeof req.rawBody === "string"
    ? req.rawBody
    : Buffer.isBuffer(req.body)
      ? req.body.toString("utf-8")
      : "";

  let parsedBody: unknown = req.body;
  if (Buffer.isBuffer(req.body)) {
    try {
      parsedBody = JSON.parse(rawBody || "{}");
    } catch {
      res.status(400).json({
        success: false,
        error: {
          code: "INVALID_JSON_BODY",
          message: "Webhook body is not valid JSON",
        },
      });
      return;
    }
  }

  const eventId = String(req.headers["x-event-id"] || (parsedBody as Record<string, unknown>)?.event_id || `evt_${Date.now()}`);
  const validation = voiceEventEnvelopeSchema.safeParse(parsedBody);

  if (!validation.success) {
    res.status(400).json({
      success: false,
      error: {
        code: "INVALID_VOICE_EVENT",
        message: validation.error.issues.map((issue: { path: (string | number)[]; message: string }) => `${issue.path.join(".")}: ${issue.message}`).join(", "),
      },
    });
    return;
  }

  const result = await ingestVoiceEvent({
    eventId,
    headers: req.headers,
    rawBody: parsedBody,
    envelope: validation.data,
  });

  res.status(result.accepted ? 202 : 200).json({
    success: true,
    data: {
      eventId,
      ...result,
    },
  });
});

voiceEventsRouter.post("/voice/agent-logs", verifyWebhookAuth, async (req, res) => {
  const rawBody = typeof req.rawBody === "string"
    ? req.rawBody
    : Buffer.isBuffer(req.body)
      ? req.body.toString("utf-8")
      : "";

  let parsedBody: unknown = req.body;
  if (Buffer.isBuffer(req.body)) {
    try {
      parsedBody = JSON.parse(rawBody || "{}");
    } catch {
      res.status(400).json({
        success: false,
        error: {
          code: "INVALID_JSON_BODY",
          message: "Agent log payload is not valid JSON",
        },
      });
      return;
    }
  }

  const validation = agentLogSchema.safeParse(parsedBody);
  if (!validation.success) {
    res.status(400).json({
      success: false,
      error: {
        code: "INVALID_AGENT_LOG_PAYLOAD",
        message: validation.error.issues.map((issue: { path: (string | number)[]; message: string }) => `${issue.path.join(".")}: ${issue.message}`).join(", "),
      },
    });
    return;
  }

  const eventId = String(req.headers["x-event-id"] || `agent_evt_${Date.now()}`);
  const result = await ingestAgentLog({
    eventId,
    tenantId: validation.data.tenant_id,
    callId: validation.data.call_id,
    roomId: validation.data.room_id,
    level: validation.data.level,
    message: validation.data.message,
    meta: validation.data.meta,
    occurredAt: validation.data.occurred_at,
    headers: req.headers,
    rawBody: parsedBody,
  });

  res.status(result.accepted ? 202 : 200).json({
    success: true,
    data: {
      eventId,
      ...result,
    },
  });
});

export default voiceEventsRouter;
