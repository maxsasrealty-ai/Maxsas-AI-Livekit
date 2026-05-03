import { ApiEnvelope } from "../../shared/contracts";

import { setCurrentAuthUser } from "../auth/session";
import { apiClient } from "./client";

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  tenantId: string;
  tenantName?: string;
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
  const response = await apiClient.post<SignupRequest, AuthUser>("/auth/signup", payload);
  if (response.success) {
    await setCurrentAuthUser(response.data);
  }

  return response;
}

export async function loginWithEmailPassword(
  payload: LoginRequest
): Promise<ApiEnvelope<AuthUser>> {
  const response = await apiClient.post<LoginRequest, AuthUser>("/auth/login", payload);
  if (response.success) {
    await setCurrentAuthUser(response.data);
  }

  return response;
}
