import {
    CreateTenantAdminInput,
    TenantAdminRecord,
    TenantUsageSummary,
    TenantWalletSummary,
    UpdateTenantAdminInput,
    WorkspaceConfigOverrides,
} from "../../../shared/contracts";
import { PlanKey, Tenant } from "../generated/prisma";
import {
    getTenantById,
    getTenantUsageSummary,
    listTenants,
    upsertTenant,
} from "../repositories/tenantRepository";
import {
    formatPaise,
    getWalletBalance,
    listWalletTransactions,
} from "../repositories/walletRepository";
import {
    getWorkspaceConfigForPlan,
    invalidateTenantCapabilityCache,
} from "./accessService";

type FallbackTenant = {
  id: string;
  name: string | null;
  plan: PlanKey;
  workspaceConfigJson: string | null;
  createdAt: Date;
  updatedAt: Date;
};

const fallbackTenants = new Map<string, FallbackTenant>([
  [
    "lexus-demo",
    {
      id: "lexus-demo",
      name: "Lexus Demo",
      plan: "basic",
      workspaceConfigJson: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
]);

function isDbUnavailableError(error: unknown): boolean {
  if (!(error instanceof Error)) {
    return false;
  }

  const message = error.message.toLowerCase();
  return (
    message.includes("can't reach database server") ||
    message.includes("p1001") ||
    message.includes("econnrefused") ||
    message.includes("timed out")
  );
}

function shouldUseFallbackForError(error: unknown): boolean {
  return process.env.APP_ENV !== "production" && isDbUnavailableError(error);
}

function toTenantAdminRecordFromFallback(item: FallbackTenant, walletBalancePaise = 0): TenantAdminRecord {
  const workspaceConfig = getWorkspaceConfigForPlan(item.plan, {
    tenantDisplayName: item.name || undefined,
    overrides: parseWorkspaceOverrides(item.workspaceConfigJson),
  });

  return {
    id: item.id,
    name: item.name,
    planName: workspaceConfig.planName,
    workspaceConfig,
    walletBalancePaise,
    walletBalanceFormatted: formatPaise(walletBalancePaise),
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  };
}

function upsertFallbackTenant(args: {
  tenantId: string;
  name?: string;
  plan?: PlanKey;
  workspaceConfigJson?: string | null;
}): FallbackTenant {
  const existing = fallbackTenants.get(args.tenantId);
  const now = new Date();
  const next: FallbackTenant = {
    id: args.tenantId,
    name: typeof args.name === "undefined" ? existing?.name || null : args.name || null,
    plan: args.plan || existing?.plan || "basic",
    workspaceConfigJson:
      typeof args.workspaceConfigJson === "undefined"
        ? (existing?.workspaceConfigJson ?? null)
        : args.workspaceConfigJson,
    createdAt: existing?.createdAt || now,
    updatedAt: now,
  };
  fallbackTenants.set(args.tenantId, next);
  return next;
}

function toPlanKey(planName?: string): PlanKey {
  switch ((planName || "Lexus").toLowerCase()) {
    case "prestige":
      return "pro";
    case "enterprise":
      return "enterprise";
    case "lexus":
    default:
      return "basic";
  }
}

function parseWorkspaceOverrides(raw?: unknown): WorkspaceConfigOverrides | undefined {
  if (!raw) {
    return undefined;
  }

  if (typeof raw === "object" && !Array.isArray(raw)) {
    return raw as WorkspaceConfigOverrides;
  }

  if (typeof raw !== "string") {
    return undefined;
  }

  try {
    return JSON.parse(raw) as WorkspaceConfigOverrides;
  } catch {
    return undefined;
  }
}

function toTenantAdminRecord(item: Tenant, walletBalancePaise = 0): TenantAdminRecord {
  const plan = item.plan as PlanKey;
  const overrides = parseWorkspaceOverrides(item.workspaceConfigJson);
  const workspaceConfig = getWorkspaceConfigForPlan(plan, {
    tenantDisplayName: item.name || undefined,
    overrides,
  });

  return {
    id: item.id,
    name: item.name,
    planName: workspaceConfig.planName,
    workspaceConfig,
    walletBalancePaise: walletBalancePaise,
    walletBalanceFormatted: formatPaise(walletBalancePaise),
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  };
}

export async function listAdminTenants(): Promise<TenantAdminRecord[]> {
  try {
    const tenants = await listTenants();
    // Include real wallet balance for each tenant in the list
    const records = await Promise.all(
      tenants.map(async (t) => {
        const balance = await getWalletBalance(t.id);
        return toTenantAdminRecord(t, balance);
      })
    );
    return records;
  } catch (error) {
    if (!shouldUseFallbackForError(error)) {
      throw error;
    }

    return Array.from(fallbackTenants.values()).map((tenant) =>
      toTenantAdminRecordFromFallback(tenant, 0)
    );
  }
}

export async function getAdminTenantById(tenantId: string): Promise<TenantAdminRecord | null> {
  try {
    const tenant = await getTenantById(tenantId);
    if (!tenant) {
      return null;
    }
    const balance = await getWalletBalance(tenantId);
    return toTenantAdminRecord(tenant, balance);
  } catch (error) {
    if (!shouldUseFallbackForError(error)) {
      throw error;
    }

    const fallback = fallbackTenants.get(tenantId);
    return fallback ? toTenantAdminRecordFromFallback(fallback, 0) : null;
  }
}

export async function createAdminTenant(input: CreateTenantAdminInput): Promise<TenantAdminRecord> {
  try {
    const created = await upsertTenant({
      tenantId: input.id,
      name: input.name,
      plan: toPlanKey(input.planName),
      workspaceConfigJson: input.workspaceConfigOverrides
        ? JSON.stringify(input.workspaceConfigOverrides)
        : undefined,
    });

    invalidateTenantCapabilityCache(created.id);
    return toTenantAdminRecord(created, 0);
  } catch (error) {
    if (!shouldUseFallbackForError(error)) {
      throw error;
    }

    const created = upsertFallbackTenant({
      tenantId: input.id,
      name: input.name,
      plan: toPlanKey(input.planName),
      workspaceConfigJson: input.workspaceConfigOverrides
        ? JSON.stringify(input.workspaceConfigOverrides)
        : undefined,
    });
    return toTenantAdminRecordFromFallback(created, 0);
  }
}

export async function updateAdminTenant(
  tenantId: string,
  input: UpdateTenantAdminInput
): Promise<TenantAdminRecord | null> {
  try {
    const existing = await getTenantById(tenantId);
    if (!existing) {
      return null;
    }

    const currentOverrides = parseWorkspaceOverrides(existing.workspaceConfigJson) || {};
    const mergedOverrides: WorkspaceConfigOverrides = {
      branding: {
        ...(currentOverrides.branding || {}),
        ...(input.workspaceConfigOverrides?.branding || {}),
      },
      vocabulary: {
        ...(currentOverrides.vocabulary || {}),
        ...(input.workspaceConfigOverrides?.vocabulary || {}),
      },
      voiceAgentDisplay: {
        ...(currentOverrides.voiceAgentDisplay || {}),
        ...(input.workspaceConfigOverrides?.voiceAgentDisplay || {}),
      },
    };

    const updated = await upsertTenant({
      tenantId,
      name: input.name,
      plan: input.planName ? toPlanKey(input.planName) : undefined,
      workspaceConfigJson: input.workspaceConfigOverrides
        ? JSON.stringify(mergedOverrides)
        : undefined,
    });

    invalidateTenantCapabilityCache(tenantId);
    const balance = await getWalletBalance(tenantId);
    return toTenantAdminRecord(updated, balance);
  } catch (error) {
    if (!shouldUseFallbackForError(error)) {
      throw error;
    }

    const existing = fallbackTenants.get(tenantId);
    if (!existing) {
      return null;
    }

    const currentOverrides = parseWorkspaceOverrides(existing.workspaceConfigJson) || {};
    const mergedOverrides: WorkspaceConfigOverrides = {
      branding: {
        ...(currentOverrides.branding || {}),
        ...(input.workspaceConfigOverrides?.branding || {}),
      },
      vocabulary: {
        ...(currentOverrides.vocabulary || {}),
        ...(input.workspaceConfigOverrides?.vocabulary || {}),
      },
      voiceAgentDisplay: {
        ...(currentOverrides.voiceAgentDisplay || {}),
        ...(input.workspaceConfigOverrides?.voiceAgentDisplay || {}),
      },
    };

    const updated = upsertFallbackTenant({
      tenantId,
      name: input.name,
      plan: input.planName ? toPlanKey(input.planName) : undefined,
      workspaceConfigJson: input.workspaceConfigOverrides
        ? JSON.stringify(mergedOverrides)
        : undefined,
    });
    return toTenantAdminRecordFromFallback(updated, 0);
  }
}

export async function getAdminTenantUsage(tenantId: string): Promise<TenantUsageSummary | null> {
  try {
    const existing = await getTenantById(tenantId);
    if (!existing) {
      return null;
    }

    return getTenantUsageSummary(tenantId);
  } catch (error) {
    if (!shouldUseFallbackForError(error)) {
      throw error;
    }

    const fallback = fallbackTenants.get(tenantId);
    if (!fallback) {
      return null;
    }

    return {
      tenantId,
      callStats: {
        totalCalls: 0,
        activeCalls: 0,
        completedCalls: 0,
        failedCalls: 0,
        totalDurationMinutes: 0,
      },
      campaignStats: {
        totalCampaigns: 0,
        draft: 0,
        queued: 0,
        active: 0,
        completed: 0,
        archived: 0,
      },
    };
  }
}

export async function getAdminTenantWallet(tenantId: string): Promise<TenantWalletSummary | null> {
  try {
    const existing = await getTenantById(tenantId);
    if (!existing) {
      return null;
    }

    const balance = await getWalletBalance(tenantId);

    // Fetch recent transactions for summary aggregation (last 100 for totals)
    const { items } = await listWalletTransactions(tenantId, 1, 100);

    let totalCreditPaise = 0;
    let totalDebitPaise = 0;
    let lastProvider: string | null = null;

    for (const item of items) {
      if (item.type === "credit" && item.status === "completed") {
        totalCreditPaise += item.amountPaise;
        if (!lastProvider && item.provider) {
          lastProvider = item.provider;
        }
      } else if (item.type === "debit" && item.status === "completed") {
        totalDebitPaise += item.amountPaise;
      }
    }

    const recentTransactions = items.slice(0, 5).map(item => ({
      id: item.id,
      tenantId: item.tenantId,
      type: item.type as "credit" | "debit",
      amountPaise: item.amountPaise,
      amountFormatted: `₹${(item.amountPaise / 100).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`,
      description: item.description,
      provider: item.provider,
      providerOrderId: item.providerOrderId,
      providerPaymentId: item.providerPaymentId,
      status: item.status as "pending" | "completed" | "failed",
      createdAt: item.createdAt.toISOString(),
    }));

    return {
      tenantId,
      balancePaise: balance,
      balanceFormatted: formatPaise(balance),
      recentTransactionCount: items.length,
      totalCreditPaise,
      totalDebitPaise,
      lastProvider,
      recentTransactions,
    };
  } catch (error) {
    if (!shouldUseFallbackForError(error)) {
      throw error;
    }

    const fallback = fallbackTenants.get(tenantId);
    if (!fallback) {
      return null;
    }

    return {
      tenantId,
      balancePaise: 0,
      balanceFormatted: formatPaise(0),
      recentTransactionCount: 0,
      totalCreditPaise: 0,
      totalDebitPaise: 0,
      lastProvider: null,
      recentTransactions: [],
    };
  }
}
