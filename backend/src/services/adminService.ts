import {
    CreateTenantAdminInput,
    TenantAdminRecord,
    TenantUsageSummary,
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
    getWorkspaceConfigForPlan,
    invalidateTenantCapabilityCache,
} from "./accessService";

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

function parseWorkspaceOverrides(raw?: string | null): WorkspaceConfigOverrides | undefined {
  if (!raw) {
    return undefined;
  }

  try {
    return JSON.parse(raw) as WorkspaceConfigOverrides;
  } catch {
    return undefined;
  }
}

function toTenantAdminRecord(item: Tenant): TenantAdminRecord {
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
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  };
}

export async function listAdminTenants(): Promise<TenantAdminRecord[]> {
  const tenants = await listTenants();
  return tenants.map(toTenantAdminRecord);
}

export async function createAdminTenant(input: CreateTenantAdminInput): Promise<TenantAdminRecord> {
  const created = await upsertTenant({
    tenantId: input.id,
    name: input.name,
    plan: toPlanKey(input.planName),
    workspaceConfigJson: input.workspaceConfigOverrides
      ? JSON.stringify(input.workspaceConfigOverrides)
      : undefined,
  });

  invalidateTenantCapabilityCache(created.id);
  return toTenantAdminRecord(created);
}

export async function updateAdminTenant(
  tenantId: string,
  input: UpdateTenantAdminInput
): Promise<TenantAdminRecord | null> {
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
  return toTenantAdminRecord(updated);
}

export async function getAdminTenantUsage(tenantId: string): Promise<TenantUsageSummary | null> {
  const existing = await getTenantById(tenantId);
  if (!existing) {
    return null;
  }

  return getTenantUsageSummary(tenantId);
}
