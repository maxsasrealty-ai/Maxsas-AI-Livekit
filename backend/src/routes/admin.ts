import { Request, Response, Router } from "express";

import { AdminUserRecord, CreateTenantAdminInput, UpdateTenantAdminInput } from "../../../shared/contracts";
import { prisma } from "../lib/prisma";
import { requireAdminAccess } from "../middleware/requireAdminAccess";
import { listCampaigns } from "../repositories/campaignRepository";
import { getTenantById } from "../repositories/tenantRepository";
import {
    getRecentAdminLiveEvents,
    subscribeAdminLiveEvents,
} from "../services/adminLiveEventsService";
import {
    createAdminTenant,
    getAdminTenantById,
    getAdminTenantUsage,
    getAdminTenantWallet,
    listAdminTenants,
    updateAdminTenant,
} from "../services/adminService";

const adminRouter = Router();

adminRouter.use(requireAdminAccess);

function parseJsonString(value: unknown): unknown {
  if (value === null || value === undefined) {
    return null;
  }

  if (typeof value !== "string") {
    return value;
  }

  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

adminRouter.get("/live-events/stream", async (req: Request, res: Response) => {
  try {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("X-Accel-Buffering", "no");

    req.socket.setTimeout(0);
    res.flushHeaders();

    const seed = getRecentAdminLiveEvents(20);
    res.write(
      `event: connected\ndata: ${JSON.stringify({
        connectedAt: new Date().toISOString(),
        seedCount: seed.length,
      })}\n\n`
    );

    for (const item of seed.reverse()) {
      try {
        res.write(`id: ${item.streamEventId}\n`);
        res.write("event: admin_live_event\n");
        res.write(`data: ${JSON.stringify(item)}\n\n`);
      } catch {
        // Connection already closed
        break;
      }
    }

    const heartbeat = setInterval(() => {
      try {
        res.write(`event: heartbeat\ndata: ${JSON.stringify({ ts: new Date().toISOString() })}\n\n`);
      } catch {
        clearInterval(heartbeat);
        unsubscribe();
      }
    }, 20_000);

    const unsubscribe = subscribeAdminLiveEvents((event) => {
      try {
        res.write(`id: ${event.streamEventId}\n`);
        res.write("event: admin_live_event\n");
        res.write(`data: ${JSON.stringify(event)}\n\n`);
      } catch {
        // Connection closed, cleanup will happen in req.on("close")
      }
    });

    req.on("close", () => {
      clearInterval(heartbeat);
      unsubscribe();
      res.end();
    });
  } catch {
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

adminRouter.get("/live-events/recent", async (req: Request, res: Response) => {
  const limit = Math.max(1, Math.min(Number(req.query.limit || 50), 200));

  const events = await prisma.callEvent.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
    select: {
      eventId: true,
      tenantId: true,
      callId: true,
      eventType: true,
      occurredAt: true,
      createdAt: true,
      payloadJson: true,
      rawEnvelope: true,
    },
  });

  res.status(200).json({
    success: true,
    data: events.map((event) => ({
      eventId: event.eventId,
      tenantId: event.tenantId,
      callId: event.callId,
      eventType: event.eventType,
      occurredAt: event.occurredAt.toISOString(),
      createdAt: event.createdAt.toISOString(),
      dbUpdated: true,
      payload: parseJsonString(event.payloadJson),
      rawEnvelope: parseJsonString(event.rawEnvelope),
    })),
    meta: {
      requestId: req.requestContext?.requestId,
      timestamp: new Date().toISOString(),
      totalCount: events.length,
    },
  });
});

adminRouter.get("/users", async (req: Request, res: Response) => {
  const limit = Math.max(1, Math.min(Number(req.query.limit || 50), 200));
  const query = typeof req.query.query === "string" ? req.query.query.trim().toLowerCase() : "";

  const users = await prisma.user.findMany({
    where: query
      ? {
          OR: [
            { email: { contains: query, mode: "insensitive" } },
            { fullName: { contains: query, mode: "insensitive" } },
          ],
        }
      : undefined,
    orderBy: { createdAt: "desc" },
    take: limit,
    select: {
      id: true,
      email: true,
      fullName: true,
      tenantId: true,
      createdAt: true,
      tenant: {
        select: {
          name: true,
        },
      },
    },
  });

  const data: AdminUserRecord[] = users.map((user) => ({
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    tenantId: user.tenantId,
    tenantName: user.tenant?.name ?? null,
    createdAt: user.createdAt.toISOString(),
  }));

  res.status(200).json({
    success: true,
    data,
    meta: {
      requestId: req.requestContext?.requestId,
      timestamp: new Date().toISOString(),
      totalCount: data.length,
    },
  });
});

// ─── GET /api/admin/tenants ────────────────────────────────────────────────

adminRouter.get("/tenants", async (req: Request, res: Response) => {
  const tenants = await listAdminTenants();

  res.status(200).json({
    success: true,
    data: tenants,
    meta: {
      requestId: req.requestContext?.requestId,
      timestamp: new Date().toISOString(),
      totalCount: tenants.length,
    },
  });
});

// ─── POST /api/admin/tenants ───────────────────────────────────────────────

adminRouter.post("/tenants", async (req: Request, res: Response) => {
  const body = req.body as Partial<CreateTenantAdminInput>;

  if (!body.id || !body.id.trim()) {
    res.status(400).json({
      success: false,
      error: {
        code: "INVALID_REQUEST",
        message: "Tenant id is required",
      },
    });
    return;
  }

  const tenant = await createAdminTenant({
    id: body.id.trim(),
    name: body.name,
    planName: body.planName,
    workspaceConfigOverrides: body.workspaceConfigOverrides,
  });

  res.status(201).json({
    success: true,
    data: tenant,
    meta: {
      requestId: req.requestContext?.requestId,
      timestamp: new Date().toISOString(),
    },
  });
});

// ─── GET /api/admin/tenants/:id ───────────────────────────────────────────

adminRouter.get("/tenants/:id", async (req: Request, res: Response) => {
  const tenantId = String(req.params.id || "").trim();

  if (!tenantId) {
    res.status(400).json({
      success: false,
      error: { code: "INVALID_REQUEST", message: "Tenant id is required" },
    });
    return;
  }

  const tenant = await getAdminTenantById(tenantId);
  if (!tenant) {
    res.status(404).json({
      success: false,
      error: { code: "TENANT_NOT_FOUND", message: `Tenant ${tenantId} not found` },
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: tenant,
    meta: {
      requestId: req.requestContext?.requestId,
      timestamp: new Date().toISOString(),
    },
  });
});

// ─── PATCH /api/admin/tenants/:id ─────────────────────────────────────────

adminRouter.patch("/tenants/:id", async (req: Request, res: Response) => {
  const tenantId = String(req.params.id || "").trim();
  const body = req.body as UpdateTenantAdminInput;

  if (!tenantId) {
    res.status(400).json({
      success: false,
      error: { code: "INVALID_REQUEST", message: "Tenant id is required" },
    });
    return;
  }

  const updated = await updateAdminTenant(tenantId, body);
  if (!updated) {
    res.status(404).json({
      success: false,
      error: { code: "TENANT_NOT_FOUND", message: `Tenant ${tenantId} not found` },
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: updated,
    meta: {
      requestId: req.requestContext?.requestId,
      timestamp: new Date().toISOString(),
    },
  });
});

// ─── GET /api/admin/tenants/:id/usage ────────────────────────────────────

adminRouter.get("/tenants/:id/usage", async (req: Request, res: Response) => {
  const tenantId = String(req.params.id || "").trim();

  if (!tenantId) {
    res.status(400).json({
      success: false,
      error: { code: "INVALID_REQUEST", message: "Tenant id is required" },
    });
    return;
  }

  const usage = await getAdminTenantUsage(tenantId);
  if (!usage) {
    res.status(404).json({
      success: false,
      error: { code: "TENANT_NOT_FOUND", message: `Tenant ${tenantId} not found` },
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: usage,
    meta: {
      requestId: req.requestContext?.requestId,
      timestamp: new Date().toISOString(),
    },
  });
});

// ─── GET /api/admin/tenants/:id/wallet ───────────────────────────────────

adminRouter.get("/tenants/:id/wallet", async (req: Request, res: Response) => {
  const tenantId = String(req.params.id || "").trim();

  if (!tenantId) {
    res.status(400).json({
      success: false,
      error: { code: "INVALID_REQUEST", message: "Tenant id is required" },
    });
    return;
  }

  const wallet = await getAdminTenantWallet(tenantId);
  if (!wallet) {
    res.status(404).json({
      success: false,
      error: { code: "TENANT_NOT_FOUND", message: `Tenant ${tenantId} not found` },
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: wallet,
    meta: {
      requestId: req.requestContext?.requestId,
      timestamp: new Date().toISOString(),
    },
  });
});

// ─── GET /api/admin/tenants/:id/campaigns ────────────────────────────────

adminRouter.get("/tenants/:id/campaigns", async (req: Request, res: Response) => {
  const tenantId = String(req.params.id || "").trim();

  if (!tenantId) {
    res.status(400).json({
      success: false,
      error: { code: "INVALID_REQUEST", message: "Tenant id is required" },
    });
    return;
  }

  const existing = await getTenantById(tenantId);
  if (!existing) {
    res.status(404).json({
      success: false,
      error: { code: "TENANT_NOT_FOUND", message: `Tenant ${tenantId} not found` },
    });
    return;
  }

  const page = Math.max(1, parseInt(String(req.query.page || "1"), 10));
  const pageSize = Math.min(50, Math.max(1, parseInt(String(req.query.pageSize || "20"), 10)));

  const { items, totalItems } = await listCampaigns({ tenantId, page, pageSize });

  res.status(200).json({
    success: true,
    data: items,
    meta: {
      requestId: req.requestContext?.requestId,
      timestamp: new Date().toISOString(),
      pagination: {
        page,
        pageSize,
        totalItems,
        totalPages: Math.ceil(totalItems / pageSize),
      },
    },
  });
});

export default adminRouter;
