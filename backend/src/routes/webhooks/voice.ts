import { Request, Response, Router } from "express";

import { VoiceEventEnvelope } from "../../../../shared/contracts/voice-events";
import { attachRequestContext } from "../../middleware/requestContext";
import { verifyWebhookAuth } from "../../middleware/verifyWebhookAuth";
import {
    markEventAsProcessing,
    normalizeVoiceEvent,
    processNormalizedVoiceEvent,
    validateVoiceEventEnvelope,
} from "../../services/voiceEventService";

const voiceWebhookRouter = Router();

voiceWebhookRouter.post(
  "/events",
  verifyWebhookAuth,
  attachRequestContext("webhook"),
  async (req: Request, res: Response) => {
    const eventId = String(req.headers["x-event-id"] || "");
    const callIdFromHeader = String(req.headers["x-call-id"] || "");
    const occurredAtHeader = String(req.headers["x-occurred-at"] || "");

    if (!eventId || !callIdFromHeader || !occurredAtHeader) {
      res.status(400).json({
        success: false,
        error: {
          code: "MISSING_REQUIRED_HEADERS",
          message: "x-event-id, x-call-id, and x-occurred-at headers are required",
        },
      });
      return;
    }

    const validation = validateVoiceEventEnvelope(req.body);

    if (!validation.isValid) {
      res.status(400).json({
        success: false,
        error: {
          code: "INVALID_EVENT_ENVELOPE",
          message: "Voice event payload is invalid",
          details: validation.errors,
        },
      });
      return;
    }

    const envelope = req.body as VoiceEventEnvelope;

    const idempotency = await markEventAsProcessing({
      eventId,
      callId: envelope.call_id,
      eventType: envelope.event_type,
      occurredAt: envelope.occurred_at,
    });
    if (!idempotency.accepted) {
      res.status(202).json({
        success: true,
        data: {
          accepted: false,
          reason: idempotency.reason,
        },
      });
      return;
    }

    const normalized = normalizeVoiceEvent({
      envelope,
      headers: {
        eventId,
        callId: callIdFromHeader,
        occurredAt: occurredAtHeader,
      },
      rawEnvelope: req.body,
      rawHeaders: req.headers,
    });

    await processNormalizedVoiceEvent(normalized);

    res.status(202).json({
      success: true,
      data: {
        accepted: true,
        eventId,
        tenantId: envelope.tenant_id,
        callId: envelope.call_id,
      },
    });
  }
);

export default voiceWebhookRouter;
