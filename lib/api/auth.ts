import { ApiEnvelope } from "../../shared/contracts";

import { apiClient } from "./client";

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  tenantId: string;
  createdAt: string;
}

export interface SignupRequest {
  fullName: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export async function signupWithEmailPassword(
  payload: SignupRequest
): Promise<ApiEnvelope<AuthUser>> {
  return apiClient.post<SignupRequest, AuthUser>("/auth/signup", payload);
}

export async function loginWithEmailPassword(
  payload: LoginRequest
): Promise<ApiEnvelope<AuthUser>> {
  return apiClient.post<LoginRequest, AuthUser>("/auth/login", payload);
}
