import React, { useMemo, useState } from "react";
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import GlassCard from "../../../components/lexus/GlassCard";
import PillButton from "../../../components/lexus/PillButton";
import SectionHeader from "../../../components/lexus/SectionHeader";
import StatusPill from "../../../components/lexus/StatusPill";
import { C } from "../../../components/lexus/theme";
import { useCalls } from "../../../hooks/useCalls";
import { useCapabilities } from "../../../hooks/useCapabilities";
import { formatTime } from "../../../lib/adapters/calls";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "credit", label: "Credits" },
  { key: "debit", label: "Debits" },
];

const PRESETS = [500, 1000, 2000];

export default function LexusWallet() {
  const { calls, error, isLoading, isBootstrapping } = useCalls();
  const { planLabel, limits, vocabulary } = useCapabilities();
  const [filter, setFilter] = useState<"all" | "credit" | "debit">("all");
  
  const usageRows = useMemo(
    () =>
      calls.map((call) => ({
        id: call.callId,
        type: "debit" as const,
        amount: 1,
        label: "AI calling usage",
        date: formatTime(call.initiatedAt),
        method: `Room #${call.roomId}`,
        status: call.state,
      })),
    [calls]
  );

  const filteredTxns = useMemo(() => {
    if (filter === "credit") {
      return [];
    }
    return usageRows;
  }, [filter, usageRows]);

  return (
    <SafeAreaView style={S.safe}>
      <ScrollView contentContainerStyle={S.scroll} showsVerticalScrollIndicator={false}>
        <SectionHeader 
          title="Wallet" 
          subtitle="Manage balance and payments" 
          style={{ paddingHorizontal: 20, marginTop: 18, marginBottom: 8 }} 
        />

        {/* Balance Card */}
        <GlassCard style={S.balanceCard} padded={true}>
          <Text style={S.balanceLabel}>Current Balance</Text>
          <Text style={S.balanceValue}>₹--</Text>
          <Text style={S.balanceSubtext}>{planLabel} Plan · Billing backend pending</Text>
          <View style={S.balanceChipsRow}>
            <View style={S.balanceChip}><Text style={S.balanceChipText}>{`${vocabulary.callsLabel} tracked: ${calls.length}`}</Text></View>
            <View style={S.balanceChip}><Text style={S.balanceChipText}>Monthly minutes: {limits?.monthlyCallMinutes ?? 0}</Text></View>
          </View>
          <PillButton 
            title="Recharge Wallet" 
            variant="primary" 
            style={{ width: '100%', marginTop: 6 }} 
            onPress={() => Alert.alert("Recharge requires billing backend support (not available in this phase)")} 
          />
        </GlassCard>

        {/* Quick Recharge Presets */}
        <View style={S.presetsRow}>
          {PRESETS.map((amt) => (
            <TouchableOpacity
              key={amt}
              style={S.presetPill}
              onPress={() => Alert.alert(`Selected preset ₹${amt}`)}
            >
              <Text style={S.presetPillText}>₹{amt}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <SectionHeader title="Transactions" style={{ paddingHorizontal: 20, marginTop: 10 }} />

        {(isLoading || isBootstrapping) && (
          <Text style={[S.emptyText, { marginVertical: 8 }]}>Loading wallet usage...</Text>
        )}

        {!isLoading && !isBootstrapping && error && (
          <Text style={[S.emptyText, { marginVertical: 8 }]}>Failed to load usage: {error}</Text>
        )}

        {/* Filter Tabs */}
        <View style={S.filterTabsRow}>
          {FILTERS.map((f) => (
            <TouchableOpacity
              key={f.key}
              style={[S.filterTab, filter === f.key ? S.filterTabActive : S.filterTabInactive]}
              onPress={() => setFilter(f.key as any)}
            >
              <Text style={filter === f.key ? S.filterTabTextActive : S.filterTabTextInactive}>{f.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Transaction List */}
        <View style={S.txnList}>
          {filteredTxns.length === 0 ? (
            <Text style={S.emptyText}>No transactions in this view yet.</Text>
          ) : (
            filteredTxns.map((txn) => (
              <GlassCard key={txn.id} style={S.txnCard} padded={false} radius={12}>
                <View style={[S.txnIconCircle, { backgroundColor: 'rgba(79,140,255,0.13)' }]}>
                  <Text style={S.txnIcon}>📞</Text>
                </View>
                <View style={S.txnCenterCol}>
                  <Text style={S.txnLabel}>{txn.label}</Text>
                  <Text style={S.txnMethod}>{txn.method}</Text>
                  <Text style={S.txnDate}>{txn.date}</Text>
                </View>
                <View style={S.txnRightCol}>
                  <Text style={S.txnAmountDebit}>-₹{txn.amount}</Text>
                  <StatusPill 
                    label={txn.status}
                    tone={txn.status === "failed" ? "danger" : "info"}
                    style={{ alignSelf: 'flex-end', paddingHorizontal: 8, paddingVertical: 2 }} 
                  />
                </View>
              </GlassCard>
            ))
          )}
        </View>
        <View style={{ height: 60 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const S = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  scroll: { paddingBottom: 32 },
  balanceCard: { marginHorizontal: 20, marginBottom: 16, alignItems: 'center' },
  balanceLabel: { color: C.textFaint, fontSize: 13, fontWeight: '600', marginBottom: 2 },
  balanceValue: { color: C.text, fontWeight: '700', fontSize: 32, marginBottom: 4 },
  balanceSubtext: { color: C.textMuted, fontSize: 14, marginBottom: 10 },
  balanceChipsRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 14, gap: 8 },
  balanceChip: { backgroundColor: 'rgba(79,140,255,0.13)', borderRadius: 999, paddingHorizontal: 14, paddingVertical: 5, marginHorizontal: 4 },
  balanceChipText: { color: C.blue, fontWeight: '600', fontSize: 13 },
  presetsRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 18, gap: 10 },
  presetPill: { backgroundColor: 'rgba(13,31,56,0.92)', borderRadius: 999, paddingHorizontal: 22, paddingVertical: 10, marginHorizontal: 6, borderWidth: 1, borderColor: C.border },
  presetPillText: { color: C.text, fontWeight: '700', fontSize: 15 },
  filterTabsRow: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 10, gap: 8 },
  filterTab: { paddingHorizontal: 18, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginRight: 8, borderWidth: 1 },
  filterTabActive: { backgroundColor: C.blue, borderColor: C.blue },
  filterTabInactive: { backgroundColor: 'rgba(13,31,56,0.92)', borderColor: C.border },
  filterTabTextActive: { color: '#fff', fontWeight: '700', fontSize: 15 },
  filterTabTextInactive: { color: C.textMuted, fontWeight: '600', fontSize: 15 },
  txnList: { marginHorizontal: 20, marginBottom: 24 },
  emptyText: { color: C.textFaint, fontSize: 15, fontWeight: '600', textAlign: 'center', marginVertical: 24 },
  txnCard: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 14, marginBottom: 10 },
  txnIconCircle: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  txnIcon: { fontSize: 20 },
  txnCenterCol: { flex: 1, justifyContent: 'center' },
  txnLabel: { color: C.text, fontWeight: '700', fontSize: 15, marginBottom: 2 },
  txnMethod: { color: C.textMuted, fontSize: 13, marginBottom: 1 },
  txnDate: { color: C.textFaint, fontSize: 12 },
  txnRightCol: { alignItems: 'flex-end', justifyContent: 'center', minWidth: 80, marginLeft: 8 },
  txnAmountCredit: { color: C.green, fontWeight: '700', fontSize: 16, marginBottom: 4 },
  txnAmountDebit: { color: C.red, fontWeight: '700', fontSize: 16, marginBottom: 4 },
});
