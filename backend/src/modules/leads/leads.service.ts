import { prisma } from "../../lib/db";

export async function listLeads(tenantId: string) {
  return prisma.leadExtraction.findMany({
    where: { tenantId },
    orderBy: { extractedAt: "desc" },
  });
}

export async function getLeadById(tenantId: string, leadId: string) {
  return prisma.leadExtraction.findFirst({
    where: {
      id: leadId,
      tenantId,
    },
  });
}
