import {
    ApiEnvelope,
    CreateTenantAdminInput,
    TenantAdminRecord,
    TenantUsageSummary,
    UpdateTenantAdminInput,
} from "../../shared/contracts";

import { apiClient } from "./client";

const ADMIN_KEY = process.env.EXPO_PUBLIC_ADMIN_API_KEY || "dev-admin-key";

function adminHeaders(): HeadersInit {
  return {
    "x-admin-key": ADMIN_KEY,
  };
}

export async function fetchAdminTenants(): Promise<ApiEnvelope<TenantAdminRecord[]>> {
  return apiClient.get<TenantAdminRecord[]>("/admin/tenants", adminHeaders());
}

export async function createAdminTenant(
  payload: CreateTenantAdminInput
): Promise<ApiEnvelope<TenantAdminRecord>> {
  return apiClient.post<CreateTenantAdminInput, TenantAdminRecord>(
    "/admin/tenants",
    payload,
    adminHeaders()
  );
}

export async function updateAdminTenant(
  tenantId: string,
  payload: UpdateTenantAdminInput
): Promise<ApiEnvelope<TenantAdminRecord>> {
  return apiClient.patch<UpdateTenantAdminInput, TenantAdminRecord>(
    `/admin/tenants/${encodeURIComponent(tenantId)}`,
    payload,
    adminHeaders()
  );
}

export async function fetchAdminTenantUsage(
  tenantId: string
): Promise<ApiEnvelope<TenantUsageSummary>> {
  return apiClient.get<TenantUsageSummary>(
    `/admin/tenants/${encodeURIComponent(tenantId)}/usage`,
    adminHeaders()
  );
}
