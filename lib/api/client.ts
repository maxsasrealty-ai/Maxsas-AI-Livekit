import { ApiEnvelope } from "../../shared/contracts";

export interface ApiClientConfig {
  baseUrl: string;
  getAuthToken?: () => Promise<string | null> | string | null;
  getTenantId?: () => Promise<string | null> | string | null;
}

export class ApiClient {
  private readonly baseUrl: string;
  private readonly getAuthToken?: ApiClientConfig["getAuthToken"];
  private readonly getTenantId?: ApiClientConfig["getTenantId"];

  constructor(config: ApiClientConfig) {
    this.baseUrl = config.baseUrl.replace(/\/$/, "");
    this.getAuthToken = config.getAuthToken;
    this.getTenantId = config.getTenantId;
  }

  async get<TResponse>(path: string, headers?: HeadersInit): Promise<ApiEnvelope<TResponse>> {
    return this.request<TResponse>(path, { method: "GET", headers });
  }

  async post<TRequest, TResponse>(
    path: string,
    body: TRequest,
    headers?: HeadersInit
  ): Promise<ApiEnvelope<TResponse>> {
    return this.request<TResponse>(path, {
      method: "POST",
      body: JSON.stringify(body),
      headers,
    });
  }

  async patch<TRequest, TResponse>(
    path: string,
    body: TRequest,
    headers?: HeadersInit
  ): Promise<ApiEnvelope<TResponse>> {
    return this.request<TResponse>(path, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers,
    });
  }

  private async request<TResponse>(
    path: string,
    init: RequestInit
  ): Promise<ApiEnvelope<TResponse>> {
    const token = await this.resolveToken();
    const tenantId = await this.resolveTenantId();

    const response = await fetch(`${this.baseUrl}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(tenantId ? { "x-tenant-id": tenantId } : {}),
        ...(init.headers || {}),
      },
    });

    const json = (await response.json()) as ApiEnvelope<TResponse>;
    return json;
  }

  private async resolveToken(): Promise<string | null> {
    if (!this.getAuthToken) {
      return null;
    }

    const token = this.getAuthToken();
    return token instanceof Promise ? token : token;
  }

  private async resolveTenantId(): Promise<string | null> {
    if (!this.getTenantId) {
      return null;
    }

    const tenantId = this.getTenantId();
    return tenantId instanceof Promise ? tenantId : tenantId;
  }
}

const defaultApiBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL || "http://localhost:4000/api";
const defaultTenantId = process.env.EXPO_PUBLIC_TENANT_ID || "lexus-demo";

export const apiClient = new ApiClient({
  baseUrl: defaultApiBaseUrl,
  getTenantId: () => defaultTenantId,
});
