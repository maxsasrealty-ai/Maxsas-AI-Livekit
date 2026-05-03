import {
    ApiEnvelope,
    CreateOrderRequest,
    CreateOrderResponse,
    VerifyPaymentRequest,
    VerifyPaymentResponse,
    WalletBalanceResponse,
    WalletTransactionsResponse,
} from "../../shared/contracts";
import { apiClient } from "./client";

export interface PayUInitiateRequest {
  amount: number;
  description: string;
  email: string;
  phoneNumber: string;
  userId: string;
  successUrl: string;
  failureUrl: string;
}

export interface PayUInitiateResponse {
  paymentOrderId: string;
  merchantTransactionId: string;
  payuKey: string;
  hash: string;
  amount: number;
  email: string;
  phoneNumber: string;
  description: string;
  payuMode: string;
  payuUrl: string;
  successUrl: string;
  failureUrl: string;
}

export interface DevMockTopUpRequest {
  amount: number;
  userId?: string;
}

export interface DevMockTopUpResponse {
  tenantId: string;
  walletAccountId: string;
  amountPaise: number;
  amountFormatted: string;
  newBalancePaise: number;
  newBalanceFormatted: string;
  ledgerEntryId: string;
}

export async function createOrder(
  amountPaise: number
): Promise<ApiEnvelope<CreateOrderResponse>> {
  const body: CreateOrderRequest = { amountPaise };
  return apiClient.post<CreateOrderRequest, CreateOrderResponse>(
    "/payment/create-order",
    body
  );
}

export async function verifyPayment(
  razorpay_order_id: string,
  razorpay_payment_id: string,
  razorpay_signature: string
): Promise<ApiEnvelope<VerifyPaymentResponse>> {
  const body: VerifyPaymentRequest = {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  };
  return apiClient.post<VerifyPaymentRequest, VerifyPaymentResponse>("/payment/verify", body);
}

export async function fetchWalletBalance(): Promise<ApiEnvelope<WalletBalanceResponse>> {
  return apiClient.get<WalletBalanceResponse>("/payment/balance");
}

export async function fetchWalletTransactions(
  page = 1,
  pageSize = 20
): Promise<ApiEnvelope<WalletTransactionsResponse>> {
  return apiClient.get<WalletTransactionsResponse>(
    `/payment/transactions?page=${page}&pageSize=${pageSize}`
  );
}

export async function initiatePayUCheckout(
  payload: PayUInitiateRequest
): Promise<ApiEnvelope<PayUInitiateResponse>> {
  return apiClient.post<PayUInitiateRequest, PayUInitiateResponse>(
    "/payments/payu/initiate",
    payload
  );
}

export async function simulatePayUSuccessTopUp(
  payload: DevMockTopUpRequest
): Promise<ApiEnvelope<DevMockTopUpResponse>> {
  return apiClient.post<DevMockTopUpRequest, DevMockTopUpResponse>(
    "/payments/payu/mock-success",
    payload
  );
}
