import { useCallback, useEffect, useRef, useState } from "react";
import { WalletBalanceResponse, WalletTransactionItem } from "../shared/contracts";
import {
  createOrder,
  fetchWalletBalance,
  fetchWalletTransactions,
} from "../lib/api/payment";

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
      const res = await createOrder(amountPaise);
      if (!res.success) {
        setError(res.error?.message ?? "Failed to create Razorpay order");
        return false;
      }
      // In mock mode, balance is already credited by backend
      // In real mode, payment must be completed via Razorpay frontend checkout
      setTopUpResult({
        success: true,
        mock: res.data.mock,
        orderId: res.data.orderId,
        amountFormatted: `₹${(amountPaise / 100).toLocaleString("en-IN")}`,
      });

      // Refresh balance after a short delay to allow webhook processing (mock: instant)
      setTimeout(() => void refreshBalance(), res.data.mock ? 100 : 3000);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment failed");
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
    loadMoreTransactions,
  };
}
