import { prisma } from "../lib/prisma";

export async function findEventByDedupKey(args: {
  callId: string;
  eventType: string;
  occurredAt: Date;
}) {
  return prisma.callEvent.findFirst({
    where: {
      callId: args.callId,
      eventType: args.eventType,
      occurredAt: args.occurredAt,
    },
  });
}

export async function createCallEvent(args: {
  callId: string;
  tenantId: string;
  eventType: string;
  occurredAt: Date;
  eventId: string;
  payloadJson: string;
  rawEnvelope: string;
  rawHeaders: string;
}) {
  return prisma.callEvent.create({
    data: {
      callId: args.callId,
      tenantId: args.tenantId,
      eventType: args.eventType,
      occurredAt: args.occurredAt,
      eventId: args.eventId,
      payloadJson: args.payloadJson,
      rawEnvelope: args.rawEnvelope,
      rawHeaders: args.rawHeaders,
    },
  });
}
