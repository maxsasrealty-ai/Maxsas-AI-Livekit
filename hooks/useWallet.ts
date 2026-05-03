import { useCallback, useEffect, useRef, useState } from "react";
import { Platform } from "react-native";
import {
    fetchWalletBalance,
    fetchWalletTransactions,
    initiatePayUCheckout,
    simulatePayUSuccessTopUp,
} from "../lib/api/payment";
import { getCurrentAuthUser } from "../lib/auth/session";
import { WalletBalanceResponse, WalletTransactionItem } from "../shared/contracts";

export interface UseWalletReturn {
  balance: WalletBalanceResponse | null;
  transactions: WalletTransactionItem[];
  totalTransactions: number;
  isLoading: boolean;
  isTopUpLoading: boolean;
  error: string | null;
  topUpResult: { success: boolean; mock: boolean; amountFormatted: string; orderId?: string } | null;
  refreshBalance: () => Promise<void>;
  topUp: (amountPaise: number) => Promise<boolean>;
  simulateTopUpSuccess: (amountPaise: number) => Promise<boolean>;
  loadMoreTransactions: () => Promise<void>;
}

export function useWallet(): UseWalletReturn {
  const [balance, setBalance] = useState<WalletBalanceResponse | null>(null);
  const [transactions, setTransactions] = useState<WalletTransactionItem[]>([]);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isTopUpLoading, setIsTopUpLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [topUpResult, setTopUpResult] = useState<UseWalletReturn["topUpResult"]>(null);
  const pageRef = useRef(1);
  const PAGE_SIZE = 20;

  const submitPayUHostedForm = useCallback((data: {
    payuUrl: string;
    payuKey: string;
    merchantTransactionId: string;
    amount: number;
    hash: string;
    email: string;
    phoneNumber: string;
    successUrl: string;
    failureUrl: string;
  }) => {
    if (Platform.OS !== "web" || typeof document === "undefined") {
      throw new Error("PayU hosted checkout is currently supported on web only.");
    }

    const amountInRupees = (data.amount / 100).toFixed(2);
    const firstName = (data.email.split("@")[0] || "user").slice(0, 60);

    const fields: Record<string, string> = {
      key: data.payuKey,
      txnid: data.merchantTransactionId,
      amount: amountInRupees,
      productinfo: "wallet_topup",
      firstname: firstName,
      email: data.email,
      phone: data.phoneNumber,
      hash: data.hash,
      surl: data.successUrl,
      furl: data.failureUrl,
      service_provider: "payu_paisa",
    };

    const form = document.createElement("form");
    form.method = "POST";
    form.action = data.payuUrl;
    form.style.display = "none";

    Object.entries(fields).forEach(([name, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  }, []);

  const refreshBalance = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [balRes, txRes] = await Promise.all([
        fetchWalletBalance(),
        fetchWalletTransactions(1, PAGE_SIZE),
      ]);
      if (balRes.success) setBalance(balRes.data);
      else setError(balRes.error?.message ?? "Failed to load balance");

      if (txRes.success) {
        setTransactions(txRes.data.items);
        setTotalTransactions(txRes.data.pagination.totalItems);
        pageRef.current = 1;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadMoreTransactions = useCallback(async () => {
    const nextPage = pageRef.current + 1;
    try {
      const res = await fetchWalletTransactions(nextPage, PAGE_SIZE);
      if (res.success) {
        setTransactions((prev) => [...prev, ...res.data.items]);
        setTotalTransactions(res.data.pagination.totalItems);
        pageRef.current = nextPage;
      }
    } catch {
      // Silent fail — user can retry
    }
  }, []);

  const topUp = useCallback(async (amountPaise: number): Promise<boolean> => {
    setIsTopUpLoading(true);
    setTopUpResult(null);
    setError(null);
    try {
      const authUser = await getCurrentAuthUser();
      const fallbackUserId = `web-user-${Date.now()}`;
      const email = authUser?.email || "demo.user@example.com";
      const phoneNumber = "9876543210";
      const userId = authUser?.id || fallbackUserId;

      const redirectBase =
        Platform.OS === "web" && typeof window !== "undefined"
          ? window.location.href.split("?")[0]
          : "http://localhost:8081/wallet";

      const res = await initiatePayUCheckout({
        amount: amountPaise,
        description: "Wallet top-up",
        email,
        phoneNumber,
        userId,
        successUrl: `${redirectBase}?payment=success`,
        failureUrl: `${redirectBase}?payment=failure`,
      });

      if (!res.success) {
        setError(res.error?.message ?? "Failed to initiate PayU checkout");
        return false;
      }

      setTopUpResult({
        success: true,
        mock: false,
        orderId: res.data.paymentOrderId,
        amountFormatted: `₹${(amountPaise / 100).toLocaleString("en-IN")}`,
      });

      submitPayUHostedForm(res.data);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment failed");
      return false;
    } finally {
      setIsTopUpLoading(false);
    }
  }, [submitPayUHostedForm]);

  const simulateTopUpSuccess = useCallback(async (amountPaise: number): Promise<boolean> => {
    setIsTopUpLoading(true);
    setTopUpResult(null);
    setError(null);

    try {
      const authUser = await getCurrentAuthUser();
      const res = await simulatePayUSuccessTopUp({
        amount: amountPaise,
        userId: authUser?.id,
      });

      if (!res.success) {
        setError(res.error?.message ?? "Failed to simulate payment success");
        return false;
      }

      setTopUpResult({
        success: true,
        mock: true,
        amountFormatted: `₹${(amountPaise / 100).toLocaleString("en-IN")}`,
        orderId: res.data.ledgerEntryId,
      });

      await refreshBalance();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Simulation failed");
      return false;
    } finally {
      setIsTopUpLoading(false);
    }
  }, [refreshBalance]);

  useEffect(() => {
    void refreshBalance();
  }, [refreshBalance]);

  return {
    balance,
    transactions,
    totalTransactions,
    isLoading,
    isTopUpLoading,
    error,
    topUpResult,
    refreshBalance,
    topUp,
    simulateTopUpSuccess,
    loadMoreTransactions,
  };
}
