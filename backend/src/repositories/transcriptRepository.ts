import { Speaker } from "../generated/prisma";
import { prisma } from "../lib/prisma";

export async function upsertTranscriptSegment(args: {
  callId: string;
  tenantId: string;
  speaker: Speaker;
  text: string;
  isFinal: boolean;
  sequenceNo: number;
  providerMessageId?: string | null;
  rawJson?: string | null;
  occurredAt: Date;
}) {
  return prisma.transcriptSegment.upsert({
    where: {
      callId_sequenceNo: {
        callId: args.callId,
        sequenceNo: args.sequenceNo,
      },
    },
    create: {
      callId: args.callId,
      tenantId: args.tenantId,
      speaker: args.speaker,
      text: args.text,
      isFinal: args.isFinal,
      sequenceNo: args.sequenceNo,
      providerMessageId: args.providerMessageId,
      rawJson: args.rawJson,
      occurredAt: args.occurredAt,
    },
    update: {
      text: args.text,
      isFinal: args.isFinal,
      providerMessageId: args.providerMessageId,
      rawJson: args.rawJson,
      occurredAt: args.occurredAt,
    },
  });
}

export async function listTranscriptSegments(args: {
  callId: string;
  tenantId: string;
  page: number;
  pageSize: number;
}) {
  const where = {
    callId: args.callId,
    tenantId: args.tenantId,
  };

  const [items, totalItems] = await Promise.all([
    prisma.transcriptSegment.findMany({
      where,
      orderBy: [{ sequenceNo: "asc" }, { createdAt: "asc" }],
      skip: (args.page - 1) * args.pageSize,
      take: args.pageSize,
    }),
    prisma.transcriptSegment.count({ where }),
  ]);

  return { items, totalItems };
}
