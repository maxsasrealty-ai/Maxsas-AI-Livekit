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
  return apiClient.get<WalletBalanceResponse>("/wallet/balance");
}

export async function fetchWalletTransactions(
  page = 1,
  pageSize = 20
): Promise<ApiEnvelope<WalletTransactionsResponse>> {
  return apiClient.get<WalletTransactionsResponse>(
    `/wallet/transactions?page=${page}&pageSize=${pageSize}`
  );
}
