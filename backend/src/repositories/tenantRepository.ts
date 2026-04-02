import { PlanKey, Tenant } from "../generated/prisma";
import { prisma } from "../lib/prisma";

export async function upsertTenant(args: {
  tenantId: string;
  name?: string;
  plan?: PlanKey;
  workspaceConfigJson?: string | null;
}): Promise<Tenant> {
  const { tenantId, name, plan, workspaceConfigJson } = args;

  return prisma.tenant.upsert({
    where: { id: tenantId },
    create: {
      id: tenantId,
      name,
      plan: plan || "basic",
      workspaceConfigJson: workspaceConfigJson || null,
    },
    update: {
      ...(name ? { name } : {}),
      ...(plan ? { plan } : {}),
      ...(typeof workspaceConfigJson !== "undefined" ? { workspaceConfigJson } : {}),
    },
  });
}

export async function getTenantById(tenantId: string): Promise<Tenant | null> {
  return prisma.tenant.findUnique({ where: { id: tenantId } });
}

export async function listTenants(): Promise<Tenant[]> {
  return prisma.tenant.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getTenantUsageSummary(tenantId: string) {
  const [
    totalCalls,
    activeCalls,
    completedCalls,
    failedCalls,
    duration,
    campaignCounts,
  ] = await Promise.all([
    prisma.callSession.count({ where: { tenantId } }),
    prisma.callSession.count({
      where: {
        tenantId,
        status: {
          in: ["initiated", "dispatching", "ringing", "connected", "active"],
        },
      },
    }),
    prisma.callSession.count({ where: { tenantId, status: "completed" } }),
    prisma.callSession.count({ where: { tenantId, status: "failed" } }),
    prisma.callSession.aggregate({
      where: { tenantId },
      _sum: {
        durationSec: true,
      },
    }),
    prisma.campaign.groupBy({
      by: ["status"],
      where: { tenantId },
      _count: {
        status: true,
      },
    }),
  ]);

  const campaignSummary = {
    draft: 0,
    queued: 0,
    active: 0,
    completed: 0,
    archived: 0,
  };

  campaignCounts.forEach((item) => {
    campaignSummary[item.status] = item._count.status;
  });

  return {
    tenantId,
    callStats: {
      totalCalls,
      activeCalls,
      completedCalls,
      failedCalls,
      totalDurationMinutes: Number(((duration._sum.durationSec || 0) / 60).toFixed(1)),
    },
    campaignStats: {
      totalCampaigns: campaignSummary.draft + campaignSummary.queued + campaignSummary.active + campaignSummary.completed + campaignSummary.archived,
      ...campaignSummary,
    },
  };
}
