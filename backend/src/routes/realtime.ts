import { Request, Response, Router } from "express";

import { normalizeTenantId } from "../lib/tenant-id";
import { getCachedTenantCapabilities } from "../services/accessService";
import { subscribeCampaignRealtimeEvents, subscribeRealtimeEvents } from "../services/realtimeService";

const realtimeRouter = Router();

realtimeRouter.get("/calls/stream", async (req: Request, res: Response) => {
  try {
    const tenantIdFromQuery = typeof req.query.tenantId === "string" ? req.query.tenantId : null;
    const tenantIdFromHeader = typeof req.headers["x-tenant-id"] === "string" ? req.headers["x-tenant-id"] : null;
    const rawTenantId = tenantIdFromHeader || tenantIdFromQuery;

    if (!rawTenantId) {
      res.status(400).json({
        success: false,
        error: {
          code: "TENANT_REQUIRED",
          message: "tenantId query or x-tenant-id header is required",
        },
      });
      return;
    }

    const tenantId = normalizeTenantId(rawTenantId);

    try {
      const { capabilities } = await getCachedTenantCapabilities(tenantId);
      if (!capabilities.features["calls.history"]) {
        res.status(403).json({
          success: false,
          error: {
            code: "CAPABILITY_REQUIRED",
            message: "calls.history capability is required for realtime stream",
          },
        });
        return;
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        error: {
          code: "CAPABILITY_CHECK_FAILED",
          message: "Failed to verify capabilities",
        },
      });
      return;
    }

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("X-Accel-Buffering", "no");

    req.socket.setTimeout(0);
    res.flushHeaders();

    res.write(
      `event: connected\ndata: ${JSON.stringify({ tenantId: rawTenantId, connectedAt: new Date().toISOString() })}\n\n`
    );

    const heartbeat = setInterval(() => {
      try {
        res.write(`event: heartbeat\ndata: ${JSON.stringify({ ts: new Date().toISOString() })}\n\n`);
      } catch (err) {
        clearInterval(heartbeat);
        unsubscribe();
      }
    }, 20_000);

    const unsubscribe = subscribeRealtimeEvents(tenantId, (event) => {
      try {
        res.write(`id: ${event.streamEventId}\n`);
        res.write("event: call_event\n");
        res.write(`data: ${JSON.stringify(event)}\n\n`);
      } catch (err) {
        // Connection closed, cleanup will happen in req.on("close")
      }
    });

    req.on("close", () => {
      clearInterval(heartbeat);
      unsubscribe();
      res.end();
    });
  } catch (err) {
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to establish realtime connection",
        },
      });
    }
  }
});

realtimeRouter.get("/campaigns/stream", async (req: Request, res: Response) => {
  try {
    const tenantIdFromQuery = typeof req.query.tenantId === "string" ? req.query.tenantId : null;
    const tenantIdFromHeader = typeof req.headers["x-tenant-id"] === "string" ? req.headers["x-tenant-id"] : null;
    const rawTenantId = tenantIdFromHeader || tenantIdFromQuery;

    if (!rawTenantId) {
      res.status(400).json({
        success: false,
        error: {
          code: "TENANT_REQUIRED",
          message: "tenantId query or x-tenant-id header is required",
        },
      });
      return;
    }

    const tenantId = normalizeTenantId(rawTenantId);

    try {
      const { capabilities } = await getCachedTenantCapabilities(tenantId);
      if (!capabilities.features["calls.history"]) {
        res.status(403).json({
          success: false,
          error: {
            code: "CAPABILITY_REQUIRED",
            message: "calls.history capability is required for campaign realtime stream",
          },
        });
        return;
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        error: {
          code: "CAPABILITY_CHECK_FAILED",
          message: "Failed to verify capabilities",
        },
      });
      return;
    }

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("X-Accel-Buffering", "no");

    req.socket.setTimeout(0);
    res.flushHeaders();

    res.write(
      `event: connected\ndata: ${JSON.stringify({ tenantId: rawTenantId, connectedAt: new Date().toISOString() })}\n\n`
    );

    const heartbeat = setInterval(() => {
      try {
        res.write(`event: heartbeat\ndata: ${JSON.stringify({ ts: new Date().toISOString() })}\n\n`);
      } catch (err) {
        clearInterval(heartbeat);
        unsubscribe();
      }
    }, 20_000);

    const unsubscribe = subscribeCampaignRealtimeEvents(tenantId, (event) => {
      try {
        res.write(`id: ${event.streamEventId}\n`);
        res.write("event: campaign_event\n");
        res.write(`data: ${JSON.stringify(event)}\n\n`);
      } catch (err) {
        // Connection closed, cleanup will happen in req.on("close")
      }
    });

    req.on("close", () => {
      clearInterval(heartbeat);
      unsubscribe();
      res.end();
    });
  } catch (err) {
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to establish realtime connection",
        },
      });
    }
  }
});

export default realtimeRouter;
