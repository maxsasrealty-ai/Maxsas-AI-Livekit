import { NextFunction, Request, Response } from "express";

const DEFAULT_HEADER_PREFIX = "Bearer ";

export function verifyWebhookAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  const expectedToken = process.env.VOICE_WEBHOOK_BEARER_TOKEN;

  if (!expectedToken) {
    res.status(500).json({
      success: false,
      error: {
        code: "WEBHOOK_TOKEN_NOT_CONFIGURED",
        message: "Voice webhook token is not configured",
      },
    });
    return;
  }

  if (!authHeader || !authHeader.startsWith(DEFAULT_HEADER_PREFIX)) {
    res.status(401).json({
      success: false,
      error: {
        code: "UNAUTHORIZED",
        message: "Missing bearer token",
      },
    });
    return;
  }

  const token = authHeader.slice(DEFAULT_HEADER_PREFIX.length).trim();

  if (token !== expectedToken) {
    res.status(401).json({
      success: false,
      error: {
        code: "UNAUTHORIZED",
        message: "Invalid bearer token",
      },
    });
    return;
  }

  next();
}
