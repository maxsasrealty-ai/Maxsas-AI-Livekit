import { NextFunction, Request, Response } from "express";

export function requireTenant(req: Request, res: Response, next: NextFunction): void {
  if (!req.requestContext?.tenantId) {
    res.status(400).json({
      success: false,
      error: {
        code: "TENANT_REQUIRED",
        message: "Tenant context is required. Provide x-tenant-id header.",
      },
    });
    return;
  }

  next();
}
