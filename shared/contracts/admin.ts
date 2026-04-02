import { PlanName, WorkspaceTenantConfig } from "./workspace";

export interface TenantAdminRecord {
  id: string;
  name?: string | null;
  planName: PlanName;
  workspaceConfig: WorkspaceTenantConfig;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTenantAdminInput {
  id: string;
  name?: string;
  planName?: PlanName;
  workspaceConfigOverrides?: WorkspaceConfigOverrides;
}

export interface UpdateTenantAdminInput {
  name?: string;
  planName?: PlanName;
  workspaceConfigOverrides?: WorkspaceConfigOverrides;
}

export interface WorkspaceConfigOverrides {
  branding?: Partial<WorkspaceTenantConfig["branding"]>;
  vocabulary?: Partial<WorkspaceTenantConfig["vocabulary"]>;
  voiceAgentDisplay?: Partial<WorkspaceTenantConfig["voiceAgentDisplay"]>;
}

export interface TenantUsageSummary {
  tenantId: string;
  callStats: {
    totalCalls: number;
    activeCalls: number;
    completedCalls: number;
    failedCalls: number;
    totalDurationMinutes: number;
  };
  campaignStats: {
    totalCampaigns: number;
    draft: number;
    queued: number;
    active: number;
    completed: number;
    archived: number;
  };
}
