import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import GlassCard from "../../../components/lexus/GlassCard";
import PillButton from "../../../components/lexus/PillButton";
import SectionHeader from "../../../components/lexus/SectionHeader";
import StatusPill from "../../../components/lexus/StatusPill";
import { C } from "../../../components/lexus/theme";
import { useCapabilities } from "../../../hooks/useCapabilities";
import { useWallet } from "../../../hooks/useWallet";

// ─── Constants ────────────────────────────────────────────────────────────

const PRESETS = [
  { label: "₹500", paise: 50_000 },
  { label: "₹1,000", paise: 1_00_000 },
  { label: "₹2,000", paise: 2_00_000 },
];

const FILTERS = [
  { key: "all", label: "All" },
  { key: "credit", label: "Credits" },
  { key: "debit", label: "Debits" },
] as const;

type FilterKey = "all" | "credit" | "debit";

// ─── Balance Warning ──────────────────────────────────────────────────────

function BalanceWarning({ balancePaise }: { balancePaise: number }) {
  if (balancePaise >= 20_000) return null; // ≥₹200 — no warning
  const critical = balancePaise < 5_000; // <₹50
  return (
    <View style={[S.warningBanner, critical ? S.warningCritical : S.warningAmber]}>
      <Text style={S.warningIcon}>{critical ? "🔴" : "⚠️"}</Text>
      <Text style={S.warningText}>
        {critical
          ? "Critical: Balance below ₹50. Top up now to continue AI calling."
          : "Low balance. Top up to avoid service interruption."}
      </Text>
    </View>
  );
}

// ─── Top-Up Modal ─────────────────────────────────────────────────────────

interface TopUpModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (amountPaise: number) => Promise<void>;
  isLoading: boolean;
}

function TopUpModal({ visible, onClose, onConfirm, isLoading }: TopUpModalProps) {
  const [selectedPaise, setSelectedPaise] = useState<number | null>(null);
  const [customRupees, setCustomRupees] = useState("");

  function getAmountPaise(): number | null {
    if (selectedPaise !== null) return selectedPaise;
    const parsed = parseFloat(customRupees.replace(/,/g, ""));
    if (!isNaN(parsed) && parsed >= 50) return Math.round(parsed * 100);
    return null;
  }

  const amountPaise = getAmountPaise();
  const canConfirm = amountPaise !== null && !isLoading;

  function handleCustomChange(val: string) {
    setSelectedPaise(null);
    setCustomRupees(val.replace(/[^0-9.]/g, ""));
  }

  async function handleConfirm() {
    if (!amountPaise) return;
    await onConfirm(amountPaise);
    setSelectedPaise(null);
    setCustomRupees("");
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={S.modalOverlay}
      >
        <View style={S.modalSheet}>
          <View style={S.modalHandle} />
          <Text style={S.modalTitle}>Top-Up Wallet</Text>
          <Text style={S.modalSubtitle}>Select or enter an amount (min ₹50)</Text>

          {/* Preset chips */}
          <View style={S.presetRow}>
            {PRESETS.map((p) => (
              <TouchableOpacity
                key={p.paise}
                style={[
                  S.presetChip,
                  selectedPaise === p.paise && S.presetChipActive,
                ]}
                onPress={() => {
                  setSelectedPaise(p.paise);
                  setCustomRupees("");
                }}
              >
                <Text
                  style={[
                    S.presetChipText,
                    selectedPaise === p.paise && S.presetChipTextActive,
                  ]}
                >
                  {p.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Custom amount */}
          <View style={S.customInputRow}>
            <Text style={S.currencyPrefix}>₹</Text>
            <TextInput
              style={S.customInput}
              value={customRupees}
              onChangeText={handleCustomChange}
              placeholder="Custom amount"
              placeholderTextColor={C.textFaint}
              keyboardType="numeric"
              returnKeyType="done"
            />
          </View>

          {amountPaise !== null && (
            <Text style={S.selectedAmount}>
              You will add{" "}
              <Text style={{ color: C.green, fontWeight: "700" }}>
                ₹{(amountPaise / 100).toLocaleString("en-IN")}
              </Text>{" "}
              to your wallet.
            </Text>
          )}

          <View style={S.infoBox}>
            <Text style={S.infoText}>
              {process.env.EXPO_PUBLIC_RAZORPAY_KEY_ID
                ? "Payment processed via Razorpay. (NOTE: Native checkout wrapper integration is pending)."
                : "🧪 Demo mode — no real payment. Balance is credited instantly for testing."}
            </Text>
          </View>

          <View style={S.modalActions}>
            <TouchableOpacity style={S.cancelBtn} onPress={onClose} disabled={isLoading}>
              <Text style={S.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[S.confirmBtn, !canConfirm && S.confirmBtnDisabled]}
              onPress={handleConfirm}
              disabled={!canConfirm}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={S.confirmBtnText}>Confirm Top-Up</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

// ─── Transaction Row ──────────────────────────────────────────────────────

function TxnRow({ item }: { item: import("../../../shared/contracts").WalletTransactionItem }) {
  const isCredit = item.type === "credit";
  return (
    <GlassCard style={S.txnCard} padded={false} radius={12}>
      <View
        style={[
          S.txnIconCircle,
          { backgroundColor: isCredit ? "rgba(0,208,132,0.13)" : "rgba(79,140,255,0.13)" },
        ]}
      >
        <Text style={S.txnIcon}>{isCredit ? "💳" : "📞"}</Text>
      </View>
      <View style={S.txnCenterCol}>
        <Text style={S.txnLabel} numberOfLines={1}>
          {item.description}
        </Text>
        {item.providerOrderId && (
          <Text style={S.txnMethod} numberOfLines={1}>
            {item.providerOrderId.startsWith("mock") ? "Demo payment" : item.providerOrderId}
          </Text>
        )}
        <Text style={S.txnDate}>{new Date(item.createdAt).toLocaleString("en-IN")}</Text>
      </View>
      <View style={S.txnRightCol}>
        <Text style={isCredit ? S.txnAmountCredit : S.txnAmountDebit}>
          {isCredit ? "+" : "-"}
          {item.amountFormatted}
        </Text>
        <StatusPill
          label={item.status}
          tone={
            item.status === "completed"
              ? "success"
              : item.status === "failed"
              ? "danger"
              : "info"
          }
          style={{ alignSelf: "flex-end", paddingHorizontal: 8, paddingVertical: 2 }}
        />
      </View>
    </GlassCard>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────

export default function LexusWallet() {
  const { planLabel, limits, vocabulary } = useCapabilities();
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
    loadMoreTransactions,
  } = useWallet();

  const [filter, setFilter] = useState<FilterKey>("all");
  const [topUpVisible, setTopUpVisible] = useState(false);

  const filteredTxns =
    filter === "all"
      ? transactions
      : transactions.filter((t) => t.type === filter);

  const hasMore = transactions.length < totalTransactions;

  async function handleTopUp(amountPaise: number) {
    const ok = await topUp(amountPaise);
    if (ok) {
      setTopUpVisible(false);
    } else {
      Alert.alert("Top-Up Failed", "Please try again or contact support.");
    }
  }

  return (
    <SafeAreaView style={S.safe}>
      <ScrollView
        contentContainerStyle={S.scroll}
        showsVerticalScrollIndicator={false}
      >
        <SectionHeader
          title="Wallet"
          subtitle="Balance & transaction history"
          style={{ paddingHorizontal: 20, marginTop: 18, marginBottom: 8 }}
        />

        {/* Balance Card */}
        <GlassCard style={S.balanceCard} padded>
          <Text style={S.balanceLabel}>Current Balance</Text>
          {isLoading && !balance ? (
            <ActivityIndicator color={C.blue} style={{ marginVertical: 12 }} />
          ) : (
            <Text style={S.balanceValue}>
              {balance ? balance.balanceFormatted : "₹--"}
            </Text>
          )}
          <Text style={S.balanceSubtext}>
            {planLabel} Plan · {vocabulary.callsLabel} tracked:{" "}
            {limits?.monthlyCallMinutes ?? 0} min/mo
          </Text>

          {balance && <BalanceWarning balancePaise={balance.balancePaise} />}

          <View style={S.cardActions}>
            <PillButton
              title="Top-Up Wallet"
              variant="primary"
              style={{ flex: 1, marginRight: 8 }}
              onPress={() => setTopUpVisible(true)}
            />
            <TouchableOpacity
              style={S.refreshBtn}
              onPress={() => void refreshBalance()}
              disabled={isLoading}
            >
              <Text style={S.refreshIcon}>{isLoading ? "⏳" : "↻"}</Text>
            </TouchableOpacity>
          </View>
        </GlassCard>

        {/* Top-Up Success/Pending Banner */}
        {topUpResult?.success && (
          <View style={[S.successBanner, !topUpResult.mock && { backgroundColor: "rgba(245,166,35,0.13)", borderColor: "rgba(245,166,35,0.30)" }]}>
            <Text style={[S.successText, !topUpResult.mock && { color: "#F5A623" }]}>
              {topUpResult.mock 
                ? `✅ ${topUpResult.amountFormatted} top-up credited (demo)`
                : `🚧 Native SDK pending for Order ${topUpResult.orderId}. API integration required to complete ${topUpResult.amountFormatted} payment.`
              }
            </Text>
          </View>
        )}

        {/* Error Banner */}
        {error && (
          <View style={S.errorBanner}>
            <Text style={S.errorText}>⚠ {error}</Text>
          </View>
        )}

        {/* Transactions Header */}
        <SectionHeader
          title="Transactions"
          style={{ paddingHorizontal: 20, marginTop: 12, marginBottom: 4 }}
        />

        {/* Filter Tabs */}
        <View style={S.filterRow}>
          {FILTERS.map((f) => (
            <TouchableOpacity
              key={f.key}
              style={[
                S.filterTab,
                filter === f.key ? S.filterTabActive : S.filterTabInactive,
              ]}
              onPress={() => setFilter(f.key)}
            >
              <Text
                style={
                  filter === f.key ? S.filterTabTextActive : S.filterTabTextInactive
                }
              >
                {f.label}
              </Text>
            </TouchableOpacity>
          ))}
          <Text style={S.txnCount}>
            {totalTransactions} total
          </Text>
        </View>

        {/* Transaction List */}
        <View style={S.txnList}>
          {isLoading && transactions.length === 0 ? (
            <ActivityIndicator color={C.blue} style={{ marginVertical: 24 }} />
          ) : filteredTxns.length === 0 ? (
            <Text style={S.emptyText}>No {filter !== "all" ? filter : ""} transactions yet.</Text>
          ) : (
            filteredTxns.map((txn) => <TxnRow key={txn.id} item={txn} />)
          )}
        </View>

        {/* Load More */}
        {hasMore && filter === "all" && (
          <TouchableOpacity style={S.loadMoreBtn} onPress={() => void loadMoreTransactions()}>
            <Text style={S.loadMoreText}>Load more</Text>
          </TouchableOpacity>
        )}

        <View style={{ height: 60 }} />
      </ScrollView>

      <TopUpModal
        visible={topUpVisible}
        onClose={() => setTopUpVisible(false)}
        onConfirm={handleTopUp}
        isLoading={isTopUpLoading}
      />
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────

const S = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  scroll: { paddingBottom: 32 },

  // Balance card
  balanceCard: { marginHorizontal: 20, marginBottom: 16 },
  balanceLabel: { color: C.textFaint, fontSize: 13, fontWeight: "600", marginBottom: 4, textAlign: "center" },
  balanceValue: { color: C.text, fontWeight: "700", fontSize: 36, marginBottom: 4, textAlign: "center" },
  balanceSubtext: { color: C.textMuted, fontSize: 13, marginBottom: 12, textAlign: "center" },
  cardActions: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  refreshBtn: {
    width: 42, height: 42, borderRadius: 21, backgroundColor: "rgba(79,140,255,0.10)",
    alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: C.border,
  },
  refreshIcon: { fontSize: 20, color: C.blue },

  // Warning
  warningBanner: {
    flexDirection: "row", alignItems: "center", borderRadius: 10,
    padding: 10, marginBottom: 12,
  },
  warningCritical: { backgroundColor: "rgba(255,107,107,0.15)", borderWidth: 1, borderColor: "rgba(255,107,107,0.35)" },
  warningAmber: { backgroundColor: "rgba(245,166,35,0.13)", borderWidth: 1, borderColor: "rgba(245,166,35,0.30)" },
  warningIcon: { fontSize: 16, marginRight: 8 },
  warningText: { color: C.text, fontSize: 13, flex: 1, lineHeight: 18 },

  // Banners
  successBanner: {
    marginHorizontal: 20, marginBottom: 12, backgroundColor: "rgba(0,208,132,0.12)",
    borderRadius: 10, padding: 12, borderWidth: 1, borderColor: "rgba(0,208,132,0.30)",
  },
  successText: { color: C.green, fontSize: 14, fontWeight: "600" },
  errorBanner: {
    marginHorizontal: 20, marginBottom: 12, backgroundColor: "rgba(255,107,107,0.12)",
    borderRadius: 10, padding: 12, borderWidth: 1, borderColor: "rgba(255,107,107,0.30)",
  },
  errorText: { color: C.red, fontSize: 14, fontWeight: "600" },

  // Filter tabs
  filterRow: {
    flexDirection: "row", paddingHorizontal: 20, marginBottom: 10,
    alignItems: "center", gap: 8,
  },
  filterTab: {
    paddingHorizontal: 16, height: 34, borderRadius: 17,
    alignItems: "center", justifyContent: "center", borderWidth: 1,
  },
  filterTabActive: { backgroundColor: C.blue, borderColor: C.blue },
  filterTabInactive: { backgroundColor: "rgba(13,31,56,0.92)", borderColor: C.border },
  filterTabTextActive: { color: "#fff", fontWeight: "700", fontSize: 14 },
  filterTabTextInactive: { color: C.textMuted, fontWeight: "600", fontSize: 14 },
  txnCount: { color: C.textFaint, fontSize: 13, marginLeft: "auto" },

  // Transactions
  txnList: { marginHorizontal: 20, marginBottom: 8 },
  emptyText: { color: C.textFaint, fontSize: 15, textAlign: "center", marginVertical: 28 },
  txnCard: {
    flexDirection: "row", alignItems: "center",
    paddingVertical: 14, paddingHorizontal: 14, marginBottom: 10,
  },
  txnIconCircle: {
    width: 40, height: 40, borderRadius: 20,
    alignItems: "center", justifyContent: "center", marginRight: 12,
  },
  txnIcon: { fontSize: 20 },
  txnCenterCol: { flex: 1, justifyContent: "center" },
  txnLabel: { color: C.text, fontWeight: "700", fontSize: 14, marginBottom: 2 },
  txnMethod: { color: C.textMuted, fontSize: 12, marginBottom: 1 },
  txnDate: { color: C.textFaint, fontSize: 11 },
  txnRightCol: { alignItems: "flex-end", justifyContent: "center", minWidth: 90, marginLeft: 8 },
  txnAmountCredit: { color: C.green, fontWeight: "700", fontSize: 15, marginBottom: 4 },
  txnAmountDebit: { color: C.red, fontWeight: "700", fontSize: 15, marginBottom: 4 },

  // Load more
  loadMoreBtn: {
    alignSelf: "center", marginTop: 4, marginBottom: 8,
    paddingHorizontal: 24, paddingVertical: 10,
    backgroundColor: "rgba(79,140,255,0.10)", borderRadius: 20,
    borderWidth: 1, borderColor: C.border,
  },
  loadMoreText: { color: C.blue, fontWeight: "600", fontSize: 14 },

  // Modal
  modalOverlay: {
    flex: 1, backgroundColor: "rgba(0,0,0,0.65)",
    justifyContent: "flex-end",
  },
  modalSheet: {
    backgroundColor: "#0a1628", borderTopLeftRadius: 24, borderTopRightRadius: 24,
    paddingHorizontal: 24, paddingBottom: Platform.OS === "ios" ? 40 : 28,
    paddingTop: 16, borderTopWidth: 1, borderColor: C.border,
  },
  modalHandle: {
    width: 40, height: 4, borderRadius: 2,
    backgroundColor: "rgba(255,255,255,0.15)", alignSelf: "center", marginBottom: 20,
  },
  modalTitle: { color: C.text, fontSize: 20, fontWeight: "700", marginBottom: 4 },
  modalSubtitle: { color: C.textMuted, fontSize: 14, marginBottom: 20 },
  presetRow: { flexDirection: "row", gap: 10, marginBottom: 20 },
  presetChip: {
    flex: 1, paddingVertical: 12, borderRadius: 12,
    backgroundColor: "rgba(79,140,255,0.08)", borderWidth: 1, borderColor: C.border,
    alignItems: "center",
  },
  presetChipActive: { backgroundColor: "rgba(79,140,255,0.25)", borderColor: C.blue },
  presetChipText: { color: C.textMuted, fontWeight: "700", fontSize: 15 },
  presetChipTextActive: { color: C.blue },
  customInputRow: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: "rgba(13,31,56,0.98)", borderRadius: 12,
    borderWidth: 1, borderColor: C.border, paddingHorizontal: 14,
    marginBottom: 16,
  },
  currencyPrefix: { color: C.textMuted, fontSize: 18, fontWeight: "700", marginRight: 6 },
  customInput: {
    flex: 1, color: C.text, fontSize: 18, fontWeight: "600",
    paddingVertical: 14,
  },
  selectedAmount: { color: C.textMuted, fontSize: 14, marginBottom: 16, textAlign: "center" },
  infoBox: {
    backgroundColor: "rgba(79,140,255,0.07)", borderRadius: 10,
    padding: 12, marginBottom: 20, borderWidth: 1, borderColor: C.border,
  },
  infoText: { color: C.textMuted, fontSize: 13, lineHeight: 18 },
  modalActions: { flexDirection: "row", gap: 12 },
  cancelBtn: {
    flex: 1, paddingVertical: 14, borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.05)", borderWidth: 1, borderColor: C.border,
    alignItems: "center",
  },
  cancelBtnText: { color: C.textMuted, fontWeight: "600", fontSize: 15 },
  confirmBtn: {
    flex: 2, paddingVertical: 14, borderRadius: 12,
    backgroundColor: C.blue, alignItems: "center",
  },
  confirmBtnDisabled: { backgroundColor: "rgba(79,140,255,0.30)" },
  confirmBtnText: { color: "#fff", fontWeight: "700", fontSize: 15 },
});
