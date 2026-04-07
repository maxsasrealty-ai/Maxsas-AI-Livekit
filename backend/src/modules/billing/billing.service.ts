import { config } from "../../lib/config";
import { prisma } from "../../lib/db";

export const DEFAULT_OUTBOUND_CALL_CHARGE_PAISE = 1000;

export async function enforceWalletGuardOrBypass(args: {
  tenantId: string;
  amountPaise: number;
  callId: string;
  sourceEventId?: string;
}) {
  const tenant = await prisma.tenant.findUnique({
    where: { id: args.tenantId },
    select: { walletBalancePaise: true },
  });

  if (!tenant) {
    return { accepted: false, bypassed: false, reason: "TENANT_NOT_FOUND" };
  }

  const bypass = config.isTestMode || config.isBillingBypass;
  if (bypass) {
    await prisma.usageRecord.create({
      data: {
        tenantId: args.tenantId,
        callId: args.callId,
        usageType: "call_charge",
        amountPaise: args.amountPaise,
        status: "bypassed",
        sourceEventId: args.sourceEventId,
        notes: "Billing bypass enabled",
      },
    });

    return { accepted: true, bypassed: true };
  }

  if (tenant.walletBalancePaise < args.amountPaise) {
    await prisma.usageRecord.create({
      data: {
        tenantId: args.tenantId,
        callId: args.callId,
        usageType: "call_charge",
        amountPaise: args.amountPaise,
        status: "rejected",
        sourceEventId: args.sourceEventId,
        notes: "INSUFFICIENT_BALANCE",
      },
    });

    return { accepted: false, bypassed: false, reason: "INSUFFICIENT_BALANCE" };
  }

  await prisma.$transaction(async (tx) => {
    await tx.tenant.update({
      where: { id: args.tenantId },
      data: {
        walletBalancePaise: {
          decrement: args.amountPaise,
        },
      },
    });

    await tx.walletTransaction.create({
      data: {
        tenantId: args.tenantId,
        type: "debit",
        amountPaise: args.amountPaise,
        description: `Call charge for ${args.callId}`,
        provider: "system",
        referenceId: `usage:${args.callId}`,
        status: "completed",
      },
    });

    await tx.usageRecord.create({
      data: {
        tenantId: args.tenantId,
        callId: args.callId,
        usageType: "call_charge",
        amountPaise: args.amountPaise,
        status: "charged",
        sourceEventId: args.sourceEventId,
      },
    });
  });

  return { accepted: true, bypassed: false };
}
