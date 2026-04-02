import { Request, Response, Router } from "express";

import { getCachedTenantCapabilities } from "../services/accessService";
import { subscribeCampaignRealtimeEvents, subscribeRealtimeEvents } from "../services/realtimeService";

const realtimeRouter = Router();

realtimeRouter.get("/calls/stream", async (req: Request, res: Response) => {
  const tenantIdFromQuery = typeof req.query.tenantId === "string" ? req.query.tenantId : null;
  const tenantIdFromHeader = typeof req.headers["x-tenant-id"] === "string" ? req.headers["x-tenant-id"] : null;
  const tenantId = tenantIdFromHeader || tenantIdFromQuery;

  if (!tenantId) {
    res.status(400).json({
      success: false,
      error: {
        code: "TENANT_REQUIRED",
        message: "tenantId query or x-tenant-id header is required",
      },
    });
    return;
  }

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

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");

  req.socket.setTimeout(0);
  res.flushHeaders();

  res.write(`event: connected\ndata: ${JSON.stringify({ tenantId, connectedAt: new Date().toISOString() })}\n\n`);

  const heartbeat = setInterval(() => {
    res.write(`event: heartbeat\ndata: ${JSON.stringify({ ts: new Date().toISOString() })}\n\n`);
  }, 20_000);

  const unsubscribe = subscribeRealtimeEvents(tenantId, (event) => {
    res.write(`id: ${event.streamEventId}\n`);
    res.write("event: call_event\n");
    res.write(`data: ${JSON.stringify(event)}\n\n`);
  });

  req.on("close", () => {
    clearInterval(heartbeat);
    unsubscribe();
    res.end();
  });
});

realtimeRouter.get("/campaigns/stream", async (req: Request, res: Response) => {
  const tenantIdFromQuery = typeof req.query.tenantId === "string" ? req.query.tenantId : null;
  const tenantIdFromHeader = typeof req.headers["x-tenant-id"] === "string" ? req.headers["x-tenant-id"] : null;
  const tenantId = tenantIdFromHeader || tenantIdFromQuery;

  if (!tenantId) {
    res.status(400).json({
      success: false,
      error: {
        code: "TENANT_REQUIRED",
        message: "tenantId query or x-tenant-id header is required",
      },
    });
    return;
  }

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

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");

  req.socket.setTimeout(0);
  res.flushHeaders();

  res.write(`event: connected\ndata: ${JSON.stringify({ tenantId, connectedAt: new Date().toISOString() })}\n\n`);

  const heartbeat = setInterval(() => {
    res.write(`event: heartbeat\ndata: ${JSON.stringify({ ts: new Date().toISOString() })}\n\n`);
  }, 20_000);

  const unsubscribe = subscribeCampaignRealtimeEvents(tenantId, (event) => {
    res.write(`id: ${event.streamEventId}\n`);
    res.write("event: campaign_event\n");
    res.write(`data: ${JSON.stringify(event)}\n\n`);
  });

  req.on("close", () => {
    clearInterval(heartbeat);
    unsubscribe();
    res.end();
  });
});

export default realtimeRouter;
