import { Request, Response, Router } from "express";

import { InitiateCallRequest } from "../../../../shared/contracts";
import { normalizePhoneNumber } from "../../lib/config";
import { requireCapability } from "../../middleware/requireCapability";
import { requireTenant } from "../../middleware/requireTenant";
import { initiateCallSession } from "../../services/callService";

const createCallRouter = Router();


createCallRouter.post(
  "/",
  requireTenant,
  requireCapability("calls.live"),
  async (req: Request, res: Response) => {
    // Log incoming trigger request
    console.log("[CALLS] Incoming POST /api/calls", {
      requestId: req.requestContext?.requestId,
      tenantId: req.requestContext?.tenantId,
      body: req.body,
    });

    const tenantId = req.requestContext?.tenantId as string;
    const body = req.body as Partial<InitiateCallRequest>;

    // Log validated payload
    if (!body.roomId || !body.agentName || !body.direction || !body.phoneNumber) {
      console.log("[CALLS] Validation failed", { body });
      res.status(400).json({
        success: false,
        error: {
          code: "INVALID_REQUEST",
          message: "roomId, phoneNumber, agentName and direction are required",
        },
      });
      return;
    }

    const normalizedPhoneNumber = normalizePhoneNumber(body.phoneNumber);

    try {
      const created = await initiateCallSession({
        tenantId,
        roomId: body.roomId,
        phoneNumber: normalizedPhoneNumber,
        agentName: body.agentName,
        direction: body.direction,
      });

      // Log response returned to frontend
      console.log("[CALLS] Call accepted, responding to frontend", {
        callId: created.callId,
        tenantId: created.tenantId,
        roomId: created.roomId,
      });

      res.status(201).json({
        success: true,
        data: created,
        meta: {
          requestId: req.requestContext?.requestId,
          timestamp: new Date().toISOString(),
        },
      });
    } catch (err) {
      console.log("[CALLS] Call initiation failed", { error: err instanceof Error ? err.message : err });
      res.status(500).json({
        success: false,
        error: {
          code: "CALL_INITIATION_FAILED",
          message: err instanceof Error ? err.message : "Unknown error",
        },
      });
    }
  }
);

export default createCallRouter;
