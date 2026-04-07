import { Worker } from "bullmq";
import { Prisma } from "../generated/prisma";
import { config } from "../lib/config";
import { logger } from "../lib/logger";
import { prisma } from "../lib/prisma";
import { createCallSession } from "../repositories/callRepository";
import {
    claimOutboundCallRequestForDispatch,
    getOutboundCallRequestById,
    markOutboundCallRequestDispatched,
    markOutboundCallRequestFailed,
} from "../repositories/outboundRequestRepository";
import { dispatchToTelephonyEngine } from "../services/telephonyService";
import { OUTBOUND_CALL_QUEUE_NAME, redisConnection } from "./producer";


export interface OutboundCallJobData {
  requestId: string;
  tenantId: string;
}

export async function processOutboundCallJob(job: { data: OutboundCallJobData }) {
  const { requestId, tenantId } = job.data;

  const request = await getOutboundCallRequestById({ requestId, tenantId });
  if (!request) {
    return;
  }

  if (request.status === "dispatched") {
    return;
  }

  const claimed = await claimOutboundCallRequestForDispatch({ requestId, tenantId });
  if (!claimed) {
    const current = await getOutboundCallRequestById({ requestId, tenantId });
    if (!current || current.status === "dispatched") {
      return;
    }
  }

  try {
    await dispatchToTelephonyEngine({
      callId: requestId,
      tenantId,
      phoneNumber: request.phoneNumber,
      roomId: request.roomId,
      agentName: request.agentName,
      direction: "outbound",
    });

    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const callSession = await createCallSession({
        callId: requestId,
        tenantId,
        externalCallId: `livekit:${requestId}`,
        roomId: request.roomId,
        phoneNumber: request.phoneNumber,
        agentName: request.agentName,
        direction: "outbound",
        state: "dispatching",
        db: tx,
      });

      await markOutboundCallRequestDispatched({
        requestId,
        tenantId,
        callSessionId: callSession.id,
        db: tx,
      });
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Outbound dispatch failed";
    await markOutboundCallRequestFailed({
      requestId,
      tenantId,
      errorMessage,
    });

    throw error;
  }
}

let outboundCallWorker: Worker<OutboundCallJobData> | null = null;

export function startOutboundCallWorker() {
  if (outboundCallWorker) {
    return outboundCallWorker;
  }

  if (process.env.REDIS_DISABLED === "true" || !redisConnection) {
    logger.warn("Outbound call worker disabled; using direct dispatch mode", {
      redisDisabled: process.env.REDIS_DISABLED === "true",
    });
    return null;
  }

  outboundCallWorker = new Worker<OutboundCallJobData>(OUTBOUND_CALL_QUEUE_NAME, processOutboundCallJob, {
    connection: redisConnection,
    concurrency: config.OUTBOUND_QUEUE_CONCURRENCY,
    lockDuration: 30_000,
  });

  outboundCallWorker.on("completed", (job) => {
    logger.info("Outbound call job completed", { jobId: job.id });
  });

  outboundCallWorker.on("failed", (job, error) => {
    logger.error("Outbound call job failed", {
      jobId: job?.id,
      requestId: job?.data?.requestId,
      tenantId: job?.data?.tenantId,
      message: error.message,
    });
  });

  outboundCallWorker.on("error", (error) => {
    logger.warn("Outbound call worker Redis error", {
      message: error.message,
    });
  });

  return outboundCallWorker;
}
