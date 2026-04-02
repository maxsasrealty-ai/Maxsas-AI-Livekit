import { prisma } from "../lib/prisma";

export async function upsertLeadExtraction(args: {
  callId: string;
  tenantId: string;
  extractedAt: Date;
  name?: string | null;
  phone?: string | null;
  summary: string;
  confidence?: number | null;
  rawJson?: string | null;
}) {
  return prisma.leadExtraction.upsert({
    where: {
      callId: args.callId,
    },
    create: {
      callId: args.callId,
      tenantId: args.tenantId,
      extractedAt: args.extractedAt,
      name: args.name,
      phone: args.phone,
      summary: args.summary,
      confidence: args.confidence,
      rawJson: args.rawJson,
    },
    update: {
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
  return prisma.leadExtraction.findFirst({
    where: {
      callId,
      tenantId,
    },
  });
}
