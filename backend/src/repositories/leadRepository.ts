import { Prisma } from "../generated/prisma";
import { prisma } from "../lib/prisma";
import { assertUuid } from "../lib/uuid";

type DbClient = Prisma.TransactionClient | typeof prisma;

export async function upsertLeadExtraction(args: {
  callId: string;
  tenantId: string;
  extractedAt: Date;
  name?: string | null;
  phone?: string | null;
  summary: string;
  confidence?: number | null;
  rawJson?: Prisma.InputJsonValue;
  db?: DbClient;
}) {
  assertUuid(args.callId, "callId");
  assertUuid(args.tenantId, "tenantId");
  const db = args.db ?? prisma;

  const existing = await db.leadExtraction.findFirst({
    where: {
      callId: args.callId,
      tenantId: args.tenantId,
    },
    select: {
      id: true,
    },
  });

  if (existing) {
    await db.leadExtraction.updateMany({
      where: {
        id: existing.id,
        tenantId: args.tenantId,
      },
      data: {
        extractedAt: args.extractedAt,
        name: args.name,
        phone: args.phone,
        summary: args.summary,
        confidence: args.confidence,
        rawJson: args.rawJson,
      },
    });

    return db.leadExtraction.findFirst({
      where: {
        id: existing.id,
        tenantId: args.tenantId,
      },
    });
  }

  return db.leadExtraction.create({
    data: {
      callId: args.callId,
      tenantId: args.tenantId,
      extractedAt: args.extractedAt,
      name: args.name,
      phone: args.phone,
      summary: args.summary,
      confidence: args.confidence,
      rawJson: args.rawJson,
    },
  });
}

export async function getLeadExtractionByCallId(callId: string, tenantId: string) {
  assertUuid(callId, "callId");
  assertUuid(tenantId, "tenantId");

  return prisma.leadExtraction.findFirst({
    where: {
      callId,
      tenantId,
    },
  });
}
