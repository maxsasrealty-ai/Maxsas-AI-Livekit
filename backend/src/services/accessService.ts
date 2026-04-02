import { WorkspaceConfigOverrides } from "../../../shared/contracts/admin";
import {
    CapabilityKey,
    PlanCapabilities,
    PlanKey,
} from "../../../shared/contracts/plans";
import { PlanName, WorkspaceTenantConfig } from "../../../shared/contracts/workspace";
import { getTenantById, upsertTenant } from "../repositories/tenantRepository";

const PLAN_CAPABILITIES: Record<PlanKey, PlanCapabilities> = {
  basic: {
    plan: "basic",
    features: {
      "calls.live": true,
      "calls.history": true,
      "transcripts.partial": true,
      "transcripts.full": false,
      "recordings.playback": false,
      "analytics.basic": true,
      "analytics.advanced": false,
      "crm.sync": false,
      "whiteLabel.branding": false,
    },
    limits: {
      maxConcurrentCalls: 2,
      monthlyCallMinutes: 1200,
      retentionDays: 7,
    },
  },
  pro: {
    plan: "pro",
    features: {
      "calls.live": true,
      "calls.history": true,
      "transcripts.partial": true,
      "transcripts.full": true,
      "recordings.playback": true,
      "analytics.basic": true,
      "analytics.advanced": true,
      "crm.sync": true,
      "whiteLabel.branding": false,
    },
    limits: {
      maxConcurrentCalls: 10,
      monthlyCallMinutes: 10000,
      retentionDays: 30,
    },
  },
  enterprise: {
    plan: "enterprise",
    features: {
      "calls.live": true,
      "calls.history": true,
      "transcripts.partial": true,
      "transcripts.full": true,
      "recordings.playback": true,
      "analytics.basic": true,
      "analytics.advanced": true,
      "crm.sync": true,
      "whiteLabel.branding": true,
    },
    limits: {
      maxConcurrentCalls: 100,
      monthlyCallMinutes: 120000,
      retentionDays: 180,
    },
  },
};

const capabilityCache = new Map<
  string,
  { expiresAt: number; capabilities: PlanCapabilities; workspaceConfig: WorkspaceTenantConfig }
>();
const CAPABILITY_CACHE_TTL_MS = 30_000;

const LEXUS_VOCABULARY = {
  leadsLabel: "Leads",
  batchesLabel: "Batches",
  callsLabel: "Calls",
  campaignsLabel: "Campaigns",
} as const;

const ENTERPRISE_VOCABULARY = {
  leadsLabel: "Campaigns",
  batchesLabel: "Campaigns",
  callsLabel: "Calls",
  campaignsLabel: "Campaigns",
} as const;

function getPlanName(plan: PlanKey): PlanName {
  switch (plan) {
    case "pro":
      return "Prestige";
    case "enterprise":
      return "Enterprise";
    case "basic":
    default:
      return "Lexus";
  }
}

export function getWorkspaceConfigForPlan(
  plan: PlanKey,
  options?: { tenantDisplayName?: string; overrides?: WorkspaceConfigOverrides }
): WorkspaceTenantConfig {
  const planCapabilities = getPlanCapabilities(plan);
  const workspaceType = plan === "enterprise" ? "enterprise" : "lexus";

  const baseConfig: WorkspaceTenantConfig = {
    planName: getPlanName(plan),
    workspaceType,
    vocabulary: workspaceType === "enterprise" ? ENTERPRISE_VOCABULARY : LEXUS_VOCABULARY,
    branding: {
      productLabel: "MAXSAS AI",
      workspaceLabel: workspaceType === "enterprise" ? "Enterprise Workspace" : "Lexus Workspace",
      tenantDisplayName: options?.tenantDisplayName,
    },
    voiceAgentDisplay: {
      assistantLabel: "Voice AI",
      defaultAgentLabel: workspaceType === "enterprise" ? "Enterprise AI Agent" : "Lexus AI Agent",
    },
    inventoryAwareAi: {
      inventoryAwareQualification: plan !== "basic",
      inventoryAwarePrompting: plan !== "basic",
    },
    capabilityFlags: planCapabilities.features,
  };

  if (!options?.overrides) {
    return baseConfig;
  }

  return {
    ...baseConfig,
    branding: {
      ...baseConfig.branding,
      ...(options.overrides.branding || {}),
    },
    vocabulary: {
      ...baseConfig.vocabulary,
      ...(options.overrides.vocabulary || {}),
    },
    voiceAgentDisplay: {
      ...baseConfig.voiceAgentDisplay,
      ...(options.overrides.voiceAgentDisplay || {}),
    },
  };
}

function parseWorkspaceConfigOverrides(raw?: string | null): WorkspaceConfigOverrides | undefined {
  if (!raw) {
    return undefined;
  }

  try {
    return JSON.parse(raw) as WorkspaceConfigOverrides;
  } catch {
    return undefined;
  }
}

export function getPlanCapabilities(plan: PlanKey): PlanCapabilities {
  return PLAN_CAPABILITIES[plan];
}

export async function getTenantCapabilities(tenantId: string): Promise<PlanCapabilities> {
  const tenant = await getTenantById(tenantId);
  if (!tenant) {
    const created = await upsertTenant({ tenantId, plan: "basic" });
    return getPlanCapabilities(created.plan as PlanKey);
  }

  return getPlanCapabilities(tenant.plan as PlanKey);
}

export async function getCachedTenantCapabilities(tenantId: string): Promise<{
  tenantId: string;
  capabilities: PlanCapabilities;
  workspaceConfig: WorkspaceTenantConfig;
  cacheHit: boolean;
}> {
  const now = Date.now();
  const cached = capabilityCache.get(tenantId);

  if (cached && cached.expiresAt > now) {
    return {
      tenantId,
      capabilities: cached.capabilities,
      workspaceConfig: cached.workspaceConfig,
      cacheHit: true,
    };
  }

  const tenant = await getTenantById(tenantId);
  const resolvedPlan = (tenant?.plan as PlanKey | undefined) || "basic";
  if (!tenant) {
    await upsertTenant({ tenantId, plan: "basic" });
  }

  const capabilities = getPlanCapabilities(resolvedPlan);
  const workspaceConfig = getWorkspaceConfigForPlan(resolvedPlan, {
    tenantDisplayName: tenant?.name || undefined,
    overrides: parseWorkspaceConfigOverrides(tenant?.workspaceConfigJson),
  });

  capabilityCache.set(tenantId, {
    capabilities,
    workspaceConfig,
    expiresAt: now + CAPABILITY_CACHE_TTL_MS,
  });

  return {
    tenantId,
    capabilities,
    workspaceConfig,
    cacheHit: false,
  };
}

export function hasCapability(plan: PlanKey, capability: CapabilityKey): boolean {
  return PLAN_CAPABILITIES[plan].features[capability] === true;
}

export function invalidateTenantCapabilityCache(tenantId?: string): void {
  if (!tenantId) {
    capabilityCache.clear();
    return;
  }

  capabilityCache.delete(tenantId);
}

export function assertCapability(plan: PlanKey, capability: CapabilityKey): void {
  if (!hasCapability(plan, capability)) {
    throw new Error(`Plan ${plan} does not include capability ${capability}`);
  }
}
