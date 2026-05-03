import React, { useMemo, useState } from "react";
import { ActivityIndicator, Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import GlassCard from "../../../components/lexus/GlassCard";
import PillButton from "../../../components/lexus/PillButton";
import SectionHeader from "../../../components/lexus/SectionHeader";
import StatusPill from "../../../components/lexus/StatusPill";
import { LexusThemeColors } from "../../../components/lexus/theme";
import { useLexusTheme } from "../../../context/LexusThemeContext";
import { useCapabilities } from "../../../hooks/useCapabilities";
import { useResponsive } from "../../../hooks/useResponsive";
import { useWallet } from "../../../hooks/useWallet";

const FILTERS = ["all", "credit", "debit"] as const;
const QUICK_TOPUPS = [30000, 50000, 100000] as const;
const MIN_TOPUP_RUPEES = 300;

type FilterKey = (typeof FILTERS)[number];

export default function LexusWallet() {
  const { colors, isDark } = useLexusTheme();
  const { isDesktop } = useResponsive();
  const s = useMemo(() => createStyles(colors, isDark, isDesktop), [colors, isDark, isDesktop]);
  const bottomSpacer = isDesktop ? 112 : 72;

  const { planLabel } = useCapabilities();
  const {
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
  } = useWallet();

  const [filter, setFilter] = useState<FilterKey>("all");
  const [manualTopUpRupees, setManualTopUpRupees] = useState("");

  const filteredTxns = useMemo(() => {
    if (filter === "all") {
      return transactions;
    }
    return transactions.filter((txn) => txn.type === filter);
  }, [filter, transactions]);

  const hasMore = transactions.length < totalTransactions;

  const summary = {
    spent: transactions.filter((item) => item.type === "debit").reduce((sum, item) => sum + item.amountPaise, 0),
    recharged: transactions.filter((item) => item.type === "credit").reduce((sum, item) => sum + item.amountPaise, 0),
    lastDeduction:
      transactions.find((item) => item.type === "debit")?.amountPaise ?? 0,
  };

  async function handleQuickTopUp(amountPaise: number) {
    const ok = await topUp(amountPaise);
    if (!ok) {
      Alert.alert("Top-Up Failed", "Please try again or contact support.");
    }
  }

  async function handleManualTopUp() {
    const rupees = Number(manualTopUpRupees.trim());

    if (!Number.isFinite(rupees) || !Number.isInteger(rupees)) {
      Alert.alert("Invalid Amount", "Please enter a valid whole number amount.");
      return;
    }

    if (rupees < MIN_TOPUP_RUPEES) {
      Alert.alert("Minimum Amount", `Minimum top-up amount is ₹${MIN_TOPUP_RUPEES}.`);
      return;
    }

    const ok = await topUp(rupees * 100);
    if (!ok) {
      Alert.alert("Top-Up Failed", "Please try again or contact support.");
      return;
    }

    setManualTopUpRupees("");
  }

  async function handleSimulateSuccess() {
    const rupees = Number(manualTopUpRupees.trim() || String(MIN_TOPUP_RUPEES));

    if (!Number.isFinite(rupees) || !Number.isInteger(rupees)) {
      Alert.alert("Invalid Amount", "Please enter a valid whole number amount.");
      return;
    }

    if (rupees < MIN_TOPUP_RUPEES) {
      Alert.alert("Minimum Amount", `Minimum top-up amount is ₹${MIN_TOPUP_RUPEES}.`);
      return;
    }

    const ok = await simulateTopUpSuccess(rupees * 100);
    if (!ok) {
      Alert.alert("Simulation Failed", "Unable to simulate successful payment.");
      return;
    }

    setManualTopUpRupees("");
  }

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        <View style={s.headerRow}>
          <Text style={s.headerTitle}>Payment History</Text>
        </View>

        <SectionHeader title="Transaction History" subtitle="View all wallet activity" />

        <View style={s.kpiRow}>
          <GlassCard style={s.kpiCard} padded={false}>
            <Text style={s.kpiLabel}>Transactions</Text>
            <Text style={s.kpiValue}>{totalTransactions}</Text>
          </GlassCard>
          <GlassCard style={s.kpiCard} padded={false}>
            <Text style={s.kpiLabel}>Total Debited</Text>
            <Text style={s.kpiValue}>₹{(summary.spent / 100).toLocaleString("en-IN")}</Text>
          </GlassCard>
        </View>

        {error && (
          <GlassCard style={s.errorCard}>
            <Text style={s.errorText}>{error}</Text>
          </GlassCard>
        )}

        <SectionHeader title="Current Balance" />
        <GlassCard style={s.balanceHero}>
          <View style={s.balanceTop}>
            <Text style={s.balanceIcon}>👛</Text>
            <StatusPill label="Live" tone="success" />
          </View>
          <Text style={s.balanceHeading}>Available Balance</Text>
          <PillButton title="Pricing Info" variant="ghost" style={s.pricingButton} onPress={() => Alert.alert("Pricing", `${planLabel} plan billing details will be configurable soon.`)} />
          <Text style={s.balanceValue}>{balance ? balance.balanceFormatted : "₹--"}</Text>

          <View style={s.balanceDivider} />

          <View style={s.balanceGrid}>
            <View style={s.balanceStatCell}>
              <Text style={s.balanceStatLabel}>Total Balance</Text>
              <Text style={s.balanceStatValue}>{balance ? balance.balanceFormatted : "₹--"}</Text>
            </View>
            <View style={s.balanceStatCell}>
              <Text style={s.balanceStatLabel}>Locked Balance</Text>
              <Text style={s.balanceStatValue}>₹0</Text>
            </View>
            <View style={s.balanceStatCellWide}>
              <Text style={s.balanceStatLabel}>Available Balance</Text>
              <Text style={s.balanceStatValue}>{balance ? balance.balanceFormatted : "₹--"}</Text>
            </View>
          </View>
        </GlassCard>

        <SectionHeader title="Wallet Statistics" actionLabel="Refresh" onAction={() => void refreshBalance()} />
        <View style={s.kpiRow}>
          <StatCard styles={s} icon="↓" label="Total Spent" value={`₹${(summary.spent / 100).toLocaleString("en-IN")}`} />
          <StatCard styles={s} icon="↑" label="Total Recharged" value={`₹${(summary.recharged / 100).toLocaleString("en-IN")}`} />
          <StatCard styles={s} icon="💳" label="Last Deduction" value={`₹${(summary.lastDeduction / 100).toLocaleString("en-IN")}`} />
        </View>

        <SectionHeader title="Pending Batches (Low Balance)" />
        <GlassCard style={s.pendingCard}>
          <Text style={s.pendingText}>No pending batches.</Text>
        </GlassCard>

        <GlassCard style={s.infoCard}>
          <Text style={s.infoText}>ℹ️ Each call costs ₹14. Locked balance is held for running batches.</Text>
        </GlassCard>

        <SectionHeader title="Test Mode Actions" />
        <View style={s.quickActionsRow}>
          {QUICK_TOPUPS.map((amount) => (
            <PillButton
              key={amount}
              title={`+ Add ₹${(amount / 100).toLocaleString("en-IN")}`}
              variant="ghost"
              style={s.quickActionButton}
              onPress={() => void handleQuickTopUp(amount)}
            />
          ))}
        </View>

        <GlassCard style={s.manualTopUpCard}>
          <Text style={s.manualTopUpLabel}>Manual Top-Up (Minimum ₹{MIN_TOPUP_RUPEES})</Text>
          <View style={s.manualTopUpRow}>
            <TextInput
              style={s.manualTopUpInput}
              placeholder="Enter amount in ₹"
              placeholderTextColor={colors.textMuted}
              keyboardType="number-pad"
              value={manualTopUpRupees}
              onChangeText={setManualTopUpRupees}
            />
            <PillButton
              title="Add Amount"
              onPress={() => void handleManualTopUp()}
              style={s.manualTopUpButton}
            />
          </View>
          <View style={s.devSimulationRow}>
            <PillButton
              title="Simulate Success (Dev)"
              variant="ghost"
              onPress={() => void handleSimulateSuccess()}
              style={s.devSimulationButton}
            />
          </View>
        </GlassCard>

        {isTopUpLoading && <Text style={s.pendingText}>Processing top-up...</Text>}
        {topUpResult?.success && (
          <GlassCard style={s.successCard}>
            <Text style={s.successText}>
              {topUpResult.mock
                ? `✅ ${topUpResult.amountFormatted} credited (demo)`
                : `Order ${topUpResult.orderId} created for ${topUpResult.amountFormatted}.`}
            </Text>
          </GlassCard>
        )}

        <SectionHeader title="Payment Log" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.filterRow}>
          {FILTERS.map((item) => {
            const active = item === filter;
            return (
              <TouchableOpacity key={item} style={[s.filterPill, active && s.filterPillActive]} onPress={() => setFilter(item)}>
                <Text style={[s.filterText, active && s.filterTextActive]}>{item.toUpperCase()}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {isLoading && transactions.length === 0 ? (
          <ActivityIndicator color={colors.blue} style={{ marginVertical: 20 }} />
        ) : filteredTxns.length === 0 ? (
          <GlassCard>
            <Text style={s.pendingText}>No transactions found for selected filter.</Text>
          </GlassCard>
        ) : (
          filteredTxns.map((txn) => (
            <GlassCard key={txn.id} style={s.txnCard} padded={false}>
              <View style={s.txnTop}>
                <Text style={s.txnDescription}>{txn.description}</Text>
                <Text style={txn.type === "credit" ? s.txnAmountCredit : s.txnAmountDebit}>
                  {txn.type === "credit" ? "+" : "-"}
                  {txn.amountFormatted}
                </Text>
              </View>
              <Text style={s.txnMeta}>{new Date(txn.createdAt).toLocaleString("en-IN")}</Text>
              <Text style={s.txnMeta}>{txn.providerOrderId || "wallet-entry"}</Text>
            </GlassCard>
          ))
        )}

        {hasMore && (
          <TouchableOpacity style={s.loadMoreButton} onPress={() => void loadMoreTransactions()}>
            <Text style={s.loadMoreText}>Load more</Text>
          </TouchableOpacity>
        )}

        <View style={{ height: bottomSpacer }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function StatCard({
  styles,
  icon,
  label,
  value,
}: {
  styles: ReturnType<typeof createStyles>;
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <GlassCard style={styles.statCard} padded={false}>
      <Text style={styles.statIcon}>{icon}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </GlassCard>
  );
}

function createStyles(colors: LexusThemeColors, isDark: boolean, isDesktop: boolean) {
  const scale = isDesktop ? 0.82 : 1;
  const px = (value: number) => Math.round(value * scale);

  return StyleSheet.create({
    safe: { flex: 1, backgroundColor: colors.bg },
    scroll: { paddingHorizontal: px(16), paddingTop: px(12), paddingBottom: px(32) },
    headerRow: { alignItems: "center", marginBottom: px(8) },
    headerTitle: { color: colors.text, fontSize: px(26), fontWeight: "800" },
    kpiRow: { flexDirection: "row", gap: px(10), marginBottom: px(12) },
    kpiCard: { flex: 1, minHeight: px(84), borderRadius: px(14), justifyContent: "center", paddingHorizontal: px(14) },
    kpiLabel: { color: colors.textMuted, fontSize: px(13), marginBottom: px(6) },
    kpiValue: { color: colors.text, fontSize: px(31), fontWeight: "800" },
    errorCard: {
      marginBottom: px(14),
      borderColor: "rgba(224,85,85,0.35)",
      backgroundColor: isDark ? "rgba(224,85,85,0.16)" : "rgba(224,85,85,0.10)",
    },
    errorText: { color: colors.red, fontSize: px(13), lineHeight: px(19) },
    balanceHero: {
      marginBottom: px(14),
      backgroundColor: "#0d1f53",
      borderColor: "rgba(255,255,255,0.12)",
    },
    balanceTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: px(8) },
    balanceIcon: { fontSize: px(28) },
    balanceHeading: { color: "rgba(255,255,255,0.72)", fontSize: px(14), marginBottom: px(8) },
    pricingButton: { alignSelf: "flex-start", height: px(34), marginBottom: px(8), borderColor: "rgba(255,255,255,0.24)" },
    balanceValue: { color: "#ffffff", fontSize: px(50), fontWeight: "800", marginBottom: px(10) },
    balanceDivider: { height: 1, backgroundColor: "rgba(255,255,255,0.18)", marginBottom: px(12) },
    balanceGrid: { flexDirection: "row", flexWrap: "wrap", rowGap: px(10) },
    balanceStatCell: { width: "50%" },
    balanceStatCellWide: { width: "100%" },
    balanceStatLabel: { color: "rgba(255,255,255,0.65)", fontSize: px(12), marginBottom: px(2) },
    balanceStatValue: { color: "#ffffff", fontSize: px(31), fontWeight: "700" },
    statCard: { flex: 1, minHeight: px(110), alignItems: "center", justifyContent: "center" },
    statIcon: { fontSize: px(28), marginBottom: px(6) },
    statValue: { color: colors.text, fontSize: px(34), fontWeight: "800", marginBottom: px(2) },
    statLabel: { color: colors.textMuted, fontSize: px(12), textAlign: "center" },
    pendingCard: { marginBottom: px(10) },
    pendingText: { color: colors.textMuted, fontSize: px(14) },
    infoCard: {
      marginBottom: px(12),
      backgroundColor: isDark ? "rgba(79,140,255,0.09)" : "rgba(79,140,255,0.08)",
      borderColor: colors.border,
    },
    infoText: { color: colors.textMuted, fontSize: px(13), lineHeight: px(19) },
    quickActionsRow: { flexDirection: "row", gap: px(8), marginBottom: px(10) },
    quickActionButton: { flex: 1, minWidth: px(96) },
    manualTopUpCard: { marginBottom: px(12) },
    manualTopUpLabel: { color: colors.text, fontSize: px(13), fontWeight: "700", marginBottom: px(8) },
    manualTopUpRow: { flexDirection: "row", gap: px(8), alignItems: "center" },
    manualTopUpInput: {
      flex: 1,
      height: px(42),
      borderRadius: px(10),
      borderWidth: 1,
      borderColor: colors.border,
      color: colors.text,
      paddingHorizontal: px(12),
      backgroundColor: isDark ? "rgba(13,31,56,0.9)" : "rgba(79,140,255,0.06)",
    },
    manualTopUpButton: { minWidth: px(110) },
    devSimulationRow: { marginTop: px(10), alignItems: "flex-start" },
    devSimulationButton: { minWidth: px(190) },
    successCard: {
      marginBottom: px(12),
      borderColor: "rgba(0,168,107,0.35)",
      backgroundColor: isDark ? "rgba(0,168,107,0.16)" : "rgba(0,168,107,0.10)",
    },
    successText: { color: colors.green, fontSize: px(13), fontWeight: "700" },
    filterRow: { gap: px(8), marginBottom: px(12) },
    filterPill: {
      paddingHorizontal: px(14),
      height: px(34),
      borderRadius: px(17),
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: colors.border,
      marginRight: px(8),
      backgroundColor: isDark ? "rgba(13,31,56,0.9)" : "rgba(79,140,255,0.08)",
    },
    filterPillActive: {
      backgroundColor: isDark ? "rgba(79,140,255,0.22)" : "rgba(79,140,255,0.18)",
      borderColor: colors.blue,
    },
    filterText: { color: colors.textMuted, fontWeight: "600", fontSize: px(12) },
    filterTextActive: { color: colors.text, fontWeight: "800" },
    txnCard: { marginBottom: px(10), paddingHorizontal: px(12), paddingVertical: px(10) },
    txnTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: px(6) },
    txnDescription: { color: colors.text, fontSize: px(14), fontWeight: "700", flex: 1, marginRight: px(8) },
    txnAmountCredit: { color: colors.green, fontSize: px(14), fontWeight: "700" },
    txnAmountDebit: { color: colors.red, fontSize: px(14), fontWeight: "700" },
    txnMeta: { color: colors.textMuted, fontSize: px(12), marginBottom: 1 },
    loadMoreButton: {
      alignSelf: "center",
      paddingHorizontal: px(22),
      paddingVertical: px(10),
      borderRadius: px(20),
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: isDark ? "rgba(79,140,255,0.14)" : "rgba(79,140,255,0.1)",
      marginTop: px(4),
    },
    loadMoreText: { color: colors.blue, fontSize: px(14), fontWeight: "700" },
  });
}
