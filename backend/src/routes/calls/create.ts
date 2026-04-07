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
    const tenantId = req.requestContext?.tenantId as string;
    const body = req.body as Partial<InitiateCallRequest>;

    if (!body.roomId || !body.agentName || !body.direction || !body.phoneNumber) {
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

    const created = await initiateCallSession({
      tenantId,
      roomId: body.roomId,
      phoneNumber: normalizedPhoneNumber,
      agentName: body.agentName,
      direction: body.direction,
    });

    res.status(201).json({
      success: true,
      data: created,
      meta: {
        requestId: req.requestContext?.requestId,
        timestamp: new Date().toISOString(),
      },
    });
  }
);

export default createCallRouter;
