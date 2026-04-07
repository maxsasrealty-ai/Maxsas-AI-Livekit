import { Prisma } from "../generated/prisma";
import { prisma } from "../lib/prisma";
import { assertUuid } from "../lib/uuid";

type DbClient = Prisma.TransactionClient | typeof prisma;

// ─── Formatting helpers ────────────────────────────────────────────────

export function formatPaise(paise: number): string {
  const rupees = paise / 100;
  return `₹${rupees.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// ─── Balance ────────────────────────────────────────────────────────────

export async function getWalletBalance(tenantId: string): Promise<number> {
  assertUuid(tenantId, "tenantId");
  const tenant = await prisma.tenant.findUnique({
    where: { id: tenantId },
    select: { walletBalancePaise: true },
  });
  return tenant?.walletBalancePaise ?? 0;
}

// ─── Transactions ────────────────────────────────────────────────────────

export async function insertTransaction(args: {
  tenantId: string;
  type: "credit" | "debit";
  amountPaise: number;
  description: string;
  provider?: string | null;
  providerOrderId?: string | null;
  providerPaymentId?: string | null;
  status?: "pending" | "completed" | "failed";
}) {
  assertUuid(args.tenantId, "tenantId");
  return prisma.walletTransaction.create({
    data: {
      tenantId: args.tenantId,
      type: args.type,
      amountPaise: args.amountPaise,
      description: args.description,
      provider: args.provider ?? null,
      providerOrderId: args.providerOrderId ?? null,
      providerPaymentId: args.providerPaymentId ?? null,
      status: args.status ?? "pending",
    },
  });
}

export async function markTransactionCompleted(tenantId: string, providerOrderId: string, providerPaymentId?: string) {
  assertUuid(tenantId, "tenantId");
  return prisma.walletTransaction.updateMany({
    where: { tenantId, providerOrderId, status: "pending" },
    data: { 
      status: "completed", 
      ...(providerPaymentId ? { providerPaymentId } : {}) 
    },
  });
}

export async function markTransactionFailed(tenantId: string, providerOrderId: string) {
  assertUuid(tenantId, "tenantId");
  return prisma.walletTransaction.updateMany({
    where: { tenantId, providerOrderId, status: "pending" },
    data: { status: "failed" },
  });
}

export async function creditWalletBalance(
  tenantId: string,
  amountPaise: number
) {
  assertUuid(tenantId, "tenantId");
  return prisma.tenant.update({
    where: { id: tenantId },
    data: { walletBalancePaise: { increment: amountPaise } },
  });
}

export async function debitWalletBalance(
  tenantId: string,
  amountPaise: number
) {
  assertUuid(tenantId, "tenantId");
  return prisma.tenant.update({
    where: { id: tenantId },
    data: { walletBalancePaise: { decrement: amountPaise } },
  });
}

export async function processIdempotentDebit(args: {
  tenantId: string;
  amountPaise: number;
  description: string;
  referenceId: string;
  db?: DbClient;
}) {
  assertUuid(args.tenantId, "tenantId");
  const run = async (tx: DbClient) => {
    // 1. Check idempotency (does transaction already exist?)
    const existing = await tx.walletTransaction.findFirst({
      where: { 
        tenantId: args.tenantId, 
        providerOrderId: args.referenceId,
        type: "debit"
      }
    });

    if (existing) {
      if (existing.status === "completed") {
        return { success: true, reason: "ALREADY_DEBITED", transaction: existing };
      }
      if (existing.status === "failed") {
        return { success: false, reason: "PREVIOUS_FAILED", transaction: existing };
      }
      return { success: false, reason: "PENDING_DEBIT", transaction: existing };
    }

    // 2. Fetch tenant and guard balance
    const tenant = await tx.tenant.findUnique({
      where: { id: args.tenantId },
      select: { walletBalancePaise: true }
    });

    if (!tenant) {
      return { success: false, reason: "TENANT_NOT_FOUND", transaction: null };
    }

    if (tenant.walletBalancePaise < args.amountPaise) {
      // Record failed transaction for observability
      const failedTxn = await tx.walletTransaction.create({
        data: {
          tenantId: args.tenantId,
          type: "debit",
          amountPaise: args.amountPaise,
          description: args.description,
          provider: "system",
          providerOrderId: args.referenceId,
          status: "failed",
        }
      });
      return { success: false, reason: "INSUFFICIENT_BALANCE", transaction: failedTxn };
    }

    // 3. Atomically debit and create successful transaction
    await tx.tenant.update({
      where: { id: args.tenantId },
      data: { walletBalancePaise: { decrement: args.amountPaise } }
    });

    const txn = await tx.walletTransaction.create({
      data: {
        tenantId: args.tenantId,
        type: "debit",
        amountPaise: args.amountPaise,
        description: args.description,
        provider: "system",
        providerOrderId: args.referenceId,
        status: "completed",
      }
    });

    return { success: true, reason: "SUCCESS", transaction: txn };
  };

  if (args.db) {
    return run(args.db);
  }

  return prisma.$transaction(async (tx) => run(tx));
}

export async function listWalletTransactions(
  tenantId: string,
  page: number,
  pageSize: number
) {
  assertUuid(tenantId, "tenantId");
  const skip = (page - 1) * pageSize;
  const [items, totalItems] = await Promise.all([
    prisma.walletTransaction.findMany({
      where: { tenantId },
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
    }),
    prisma.walletTransaction.count({ where: { tenantId } }),
  ]);
  return { items, totalItems };
}

export async function findTransactionByProviderOrderId(tenantId: string, providerOrderId: string) {
  assertUuid(tenantId, "tenantId");
  return prisma.walletTransaction.findFirst({
    where: { tenantId, providerOrderId },
  });
}
