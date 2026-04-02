import { CallLifecycleStatus } from "../generated/prisma";
import { prisma } from "../lib/prisma";

export async function createCallSession(args: {
  callId: string;
  tenantId: string;
  roomId: string;
  phoneNumber?: string | null;
  agentName?: string | null;
  direction?: string | null;
  state: CallLifecycleStatus;
}) {
  return prisma.callSession.create({
    data: {
      id: args.callId,
      tenantId: args.tenantId,
      roomId: args.roomId,
      phoneNumber: args.phoneNumber,
      agentName: args.agentName,
      direction: args.direction,
      status: args.state,
    },
  });
}

export async function getCallSessionById(callId: string, tenantId: string) {
  return prisma.callSession.findFirst({
    where: {
      id: callId,
      tenantId,
    },
  });
}

export async function updateCallSessionState(args: {
  callId: string;
  tenantId: string;
  state: CallLifecycleStatus;
  connectedAt?: Date;
  completedAt?: Date;
  failedAt?: Date;
  durationSec?: number;
  transcriptTurns?: number;
  recordingUrl?: string | null;
  lastError?: string | null;
}) {
  return prisma.callSession.update({
    where: { id: args.callId },
    data: {
      status: args.state,
      ...(args.connectedAt ? { connectedAt: args.connectedAt } : {}),
      ...(args.completedAt ? { completedAt: args.completedAt } : {}),
      ...(args.failedAt ? { failedAt: args.failedAt } : {}),
      ...(typeof args.durationSec === "number" ? { durationSec: args.durationSec } : {}),
      ...(typeof args.transcriptTurns === "number" ? { transcriptTurns: args.transcriptTurns } : {}),
      ...(typeof args.recordingUrl !== "undefined" ? { recordingUrl: args.recordingUrl } : {}),
      ...(typeof args.lastError !== "undefined" ? { lastError: args.lastError } : {}),
      estimatedCost:
        typeof args.durationSec === "number"
          ? (args.durationSec / 60) * 0.35
          : undefined,
    },
  });
}

export async function listCallSessions(args: {
  tenantId: string;
  page: number;
  pageSize: number;
  status?: CallLifecycleStatus;
  from?: Date;
  to?: Date;
}) {
  const where = {
    tenantId: args.tenantId,
    ...(args.status ? { status: args.status } : {}),
    ...(args.from || args.to
      ? {
          initiatedAt: {
            ...(args.from ? { gte: args.from } : {}),
            ...(args.to ? { lte: args.to } : {}),
          },
        }
      : {}),
  };

  const [items, totalItems] = await Promise.all([
    prisma.callSession.findMany({
      where,
      skip: (args.page - 1) * args.pageSize,
      take: args.pageSize,
      orderBy: {
        initiatedAt: "desc",
      },
    }),
    prisma.callSession.count({ where }),
  ]);

  return { items, totalItems };
}

export async function getCallDetail(callId: string, tenantId: string) {
  return prisma.callSession.findFirst({
    where: {
      id: callId,
      tenantId,
    },
    include: {
      events: true,
      leadExtraction: true,
    },
  });
}
