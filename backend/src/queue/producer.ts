
import { Queue } from "bullmq";
import IORedis from "ioredis";
import { config } from "../lib/config";
import { logger } from "../lib/logger";
import { assertUuid } from "../lib/uuid";
import { processOutboundCallJob } from "./worker";

export const OUTBOUND_CALL_QUEUE_NAME = "outbound-call-queue";
const redisDisabled =
  process.env.REDIS_DISABLED === "true" ||
  (process.env.APP_ENV !== "production" && process.env.REDIS_DISABLED !== "false");

const redisConnection = redisDisabled
  ? null
  : new IORedis(config.REDIS_URL, {
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
    });

if (redisConnection) {
  redisConnection.on("error", (error) => {
    logger.warn("Redis connection error", {
      message: error.message,
      code: (error as { code?: string }).code,
    });
  });
}

const outboundCallQueue = redisConnection
  ? new Queue(OUTBOUND_CALL_QUEUE_NAME, {
      connection: redisConnection,
      defaultJobOptions: {
        attempts: 3,
        backoff: {
          type: "exponential",
          delay: 1000,
        },
        removeOnComplete: true,
        removeOnFail: false,
      },
    })
  : null;

async function runWithoutQueue(args: { requestId: string; tenantId: string }) {
  await processOutboundCallJob({
    data: {
      requestId: args.requestId,
      tenantId: args.tenantId,
    },
  });
}


export async function enqueueOutboundCallRequestJob(args: {
  requestId: string;
  tenantId: string;
}) {
  assertUuid(args.requestId, "requestId");
  assertUuid(args.tenantId, "tenantId");

  if (redisDisabled || !outboundCallQueue) {
    await runWithoutQueue(args);
    return { bypassed: true };
  }

  try {
    return await outboundCallQueue.add(
      "process-outbound-call",
      {
        requestId: args.requestId,
        tenantId: args.tenantId,
      },
      {
        jobId: `outbound-call:${args.requestId}`,
        attempts: 3,
        backoff: {
          type: "exponential",
          delay: 1000,
        },
      }
    );
  } catch (error) {
    logger.warn("Queue unavailable, falling back to direct outbound processing", {
      requestId: args.requestId,
      tenantId: args.tenantId,
      message: error instanceof Error ? error.message : String(error),
    });
    await runWithoutQueue(args);
    return { bypassed: true };
  }
}

export { outboundCallQueue, redisConnection };

