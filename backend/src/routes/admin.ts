import { Request, Response, Router } from "express";

import { CreateTenantAdminInput, UpdateTenantAdminInput } from "../../../shared/contracts";
import { requireAdminAccess } from "../middleware/requireAdminAccess";
import {
    createAdminTenant,
    getAdminTenantUsage,
    listAdminTenants,
    updateAdminTenant,
} from "../services/adminService";

const adminRouter = Router();

adminRouter.use(requireAdminAccess);

adminRouter.get("/tenants", async (req: Request, res: Response) => {
  const tenants = await listAdminTenants();

  res.status(200).json({
    success: true,
    data: tenants,
    meta: {
      requestId: req.requestContext?.requestId,
      timestamp: new Date().toISOString(),
    },
  });
});

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

adminRouter.patch("/tenants/:id", async (req: Request, res: Response) => {
  const tenantId = String(req.params.id || "").trim();
  const body = req.body as UpdateTenantAdminInput;

  if (!tenantId) {
    res.status(400).json({
      success: false,
      error: {
        code: "INVALID_REQUEST",
        message: "Tenant id is required",
      },
    });
    return;
  }

  const updated = await updateAdminTenant(tenantId, body);
  if (!updated) {
    res.status(404).json({
      success: false,
      error: {
        code: "TENANT_NOT_FOUND",
        message: `Tenant ${tenantId} not found`,
      },
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

adminRouter.get("/tenants/:id/usage", async (req: Request, res: Response) => {
  const tenantId = String(req.params.id || "").trim();

  if (!tenantId) {
    res.status(400).json({
      success: false,
      error: {
        code: "INVALID_REQUEST",
        message: "Tenant id is required",
      },
    });
    return;
  }

  const usage = await getAdminTenantUsage(tenantId);
  if (!usage) {
    res.status(404).json({
      success: false,
      error: {
        code: "TENANT_NOT_FOUND",
        message: `Tenant ${tenantId} not found`,
      },
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

export default adminRouter;
