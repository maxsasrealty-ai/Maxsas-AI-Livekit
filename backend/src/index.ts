import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { config } from "./lib/config";
import { logger } from "./lib/logger";
import { startOutboundCallWorker } from "./queue/worker";
import apiRouter from "./routes";

// Load .env if it exists (for native node 20.6+ & local dev)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, "../.env");
if (fs.existsSync(envPath) && typeof process.loadEnvFile === "function") {
  process.loadEnvFile(envPath);
}

const app = express();
const publicDir = path.resolve(__dirname, "../public");

const explicitDevOrigins = new Set([
  "http://localhost:8081",
  "http://localhost:19006",
  "http://localhost:3000",
]);

function isAllowedOrigin(origin?: string): boolean {
  if (!origin) {
    return true;
  }

  if (explicitDevOrigins.has(origin)) {
    return true;
  }

  // Expo web can auto-pick different localhost ports when defaults are occupied.
  if (config.APP_ENV !== "production" && /^http:\/\/localhost:\d+$/.test(origin)) {
    return true;
  }

  return false;
}

const corsOptions = {
  origin: (origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void) => {
    if (isAllowedOrigin(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error(`Origin not allowed by CORS: ${origin || "unknown"}`));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "x-tenant-id"],
  credentials: true,
};

// Mount CORS before everything else — handles preflight
app.use(cors(corsOptions));

// Webhook endpoint must capture raw JSON before generic JSON parser.
app.use(
  "/api/webhooks/voice/events",
  express.raw({
    type: "application/json",
    limit: "2mb",
  })
);

// Add this after cors middleware
app.use('/api/webhooks', (req, res, next) => {
  const now = new Date().toISOString();
  const headers = Object.fromEntries(Object.entries(req.headers).map(([k, v]) => [k, String(v)]));
  const rawBody = typeof req.rawBody === "string"
    ? req.rawBody
    : Buffer.isBuffer(req.body)
      ? req.body.toString("utf-8")
      : '';
  let parsedBody: unknown = req.body;
  if (Buffer.isBuffer(req.body)) {
    try {
      parsedBody = JSON.parse(rawBody || "{}");
    } catch {
      parsedBody = "invalid_json";
    }
  }
  console.log('[' + now + '] [WEBHOOK] ' + req.method + ' ' + req.path);
  console.log('Headers:', headers);
  console.log('Raw Body:', rawBody);
  console.log('Parsed Body:', JSON.stringify(parsedBody, null, 2));
  console.log('---');
  next();
});
// Express v5 requires named wildcard, not bare *
app.options("/{*path}", cors(corsOptions));

app.use(
  express.json({
    limit: "2mb",
    verify: (req: Request, _res: Response, buffer: Buffer) => {
      req.rawBody = buffer.toString("utf-8");
    },
  })
);

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    data: {
      message: "Maxsas backend is running",
    },
  });
});

if (fs.existsSync(publicDir)) {
  app.use("/admin-ui", express.static(publicDir));
  app.get("/admin", (_req, res) => {
    res.sendFile(path.join(publicDir, "admin.html"));
  });
}

app.use("/api", apiRouter);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: "NOT_FOUND",
      message: `Route not found: ${req.method} ${req.originalUrl}`,
    },
  });
});

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({
    success: false,
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: error.message || "Unexpected server error",
    },
  });
});

const port = Number(config.PORT || 4000);

// Telephony Environment Verification Logging
const tkUrl = process.env.LIVEKIT_URL ? "Set" : "Missing";
const tkKey = process.env.LIVEKIT_API_KEY ? "Set" : "Missing";
const tkSecret = process.env.LIVEKIT_API_SECRET ? "Set" : "Missing";
const tkTrunk = (process.env.SIP_OUTBOUND_TRUNK_ID || process.env.LIVEKIT_OUTBOUND_TRUNK_ID) ? "Set" : "Missing";

logger.info("Telephony environment check", {
  livekitUrl: tkUrl,
  livekitApiKey: tkKey,
  livekitApiSecret: tkSecret,
  trunkId: tkTrunk,
  agentName: config.LIVEKIT_AGENT_NAME,
  appEnv: config.APP_ENV,
  voiceTestMode: config.isTestMode,
  billingBypass: config.isBillingBypass,
});

if (process.env.NODE_ENV !== "test") {
  startOutboundCallWorker();
  app.listen(port, () => {
    logger.info("Backend listening", { port });
  });
}

export default app;
