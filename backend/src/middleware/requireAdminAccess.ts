import { NextFunction, Request, Response } from "express";

const DEFAULT_ADMIN_KEY = "dev-admin-key";

export function requireAdminAccess(req: Request, res: Response, next: NextFunction): void {
  const configuredKey = process.env.ADMIN_API_KEY || DEFAULT_ADMIN_KEY;
  const headerKey = typeof req.headers["x-admin-key"] === "string" ? req.headers["x-admin-key"] : null;
  const bearerToken = typeof req.headers.authorization === "string" && req.headers.authorization.startsWith("Bearer ")
    ? req.headers.authorization.slice(7).trim()
    : null;

  const suppliedKey = headerKey || bearerToken;

  if (!suppliedKey || suppliedKey !== configuredKey) {
    res.status(403).json({
      success: false,
      error: {
        code: "ADMIN_FORBIDDEN",
        message: "Admin access is required for this endpoint",
      },
    });
    return;
  }

  next();
}
