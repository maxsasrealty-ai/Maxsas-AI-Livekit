import { router } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { C } from "../../../../components/lexus/theme";
import GlassCard from "../../../../components/lexus/GlassCard";
import PillButton from "../../../../components/lexus/PillButton";
import SectionHeader from "../../../../components/lexus/SectionHeader";
import StatusPill from "../../../../components/lexus/StatusPill";

const FILTERS = [
  { key: "all", label: "All Batches" },
  { key: "draft", label: "Draft" },
  { key: "scheduled", label: "Scheduled" },
  { key: "running", label: "Running" },
  { key: "completed", label: "Completed" },
];

type BatchStatus = "draft" | "scheduled" | "running" | "completed";

const MOCK_BATCHES = [
  { id: "d2d6357b", label: "Batch #d2d6357b", status: "running" as BatchStatus, contacts: 1, createdAt: "2/3/2026 09:14 am", info: "Calling in progress...", stats: { running: 0, completed: 1, pending: 0, failed: 0 } },
  { id: "a1b2c3d4", label: "Batch #a1b2c3d4", status: "draft" as BatchStatus, contacts: 12, createdAt: "2/2/2026 11:00 am", info: "Ready to start calling.", stats: { running: 0, completed: 0, pending: 12, failed: 0 } },
  { id: "e5f6g7h8", label: "Batch #e5f6g7h8", status: "completed" as BatchStatus, contacts: 8, createdAt: "1/30/2026 04:45 pm", info: "All calls completed.", stats: { running: 0, completed: 8, pending: 0, failed: 0 } },
  { id: "i9j0k1l2", label: "Batch #i9j0k1l2", status: "scheduled" as BatchStatus, contacts: 5, createdAt: "2/4/2026 10:00 am", info: "Scheduled for tomorrow.", stats: { running: 0, completed: 0, pending: 5, failed: 0 } },
];

export default function LexusBatchList() {
  const [filter, setFilter] = useState<"all" | BatchStatus>("all");
  const filtered = filter === "all" ? MOCK_BATCHES : MOCK_BATCHES.filter(b => b.status === filter);

  const getTone = (status: string) => {
    switch (status) {
      case "draft": return "warning";
      case "running": return "success";
      case "completed": return "info";
      default: return "neutral";
    }
  };

  return (
    <SafeAreaView style={S.safe}>
      <ScrollView contentContainerStyle={S.scroll} showsVerticalScrollIndicator={false}>
        <SectionHeader 
          title="Batch Dashboard" 
          subtitle="Manage your calling batches"
          style={{ marginTop: 18, marginBottom: 10 }}
          actionLabel="Open Results"
          onAction={() => router.push("/(protected)/lexus/completed" as any)}
        />

        {/* Filter Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={S.filterRow}>
          {FILTERS.map(tab => (
            <TouchableOpacity
              key={tab.key}
              style={[S.filterPill, filter === tab.key ? S.filterPillActive : S.filterPillInactive]}
              onPress={() => setFilter(tab.key as any)}
              activeOpacity={0.85}
            >
              <Text style={filter === tab.key ? S.filterPillTextActive : S.filterPillTextInactive}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={{ marginTop: 10 }}>
          {filtered.length === 0 ? (
            <View style={S.emptyWrap}><Text style={S.emptyText}>No batches in this state yet.</Text></View>
          ) : (
            filtered.map(batch => (
              <GlassCard key={batch.id} style={S.card} padded={true}>
                {/* Top Row */}
                <View style={S.cardTopRow}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={S.cardIcon}>✏️</Text>
                    <Text style={S.cardLabel}>{batch.label}</Text>
                  </View>
                  <StatusPill label={batch.status} tone={getTone(batch.status)} />
                </View>
                {/* Middle Rows */}
                <View style={S.cardInfoRow}>
                  <Text style={S.cardInfoIcon}>📞</Text>
                  <Text style={S.cardInfoText}>{batch.contacts} contact{batch.contacts !== 1 ? 's' : ''}</Text>
                  <Text style={S.cardInfoIcon}>📅</Text>
                  <Text style={S.cardInfoText}>{batch.createdAt}</Text>
                </View>
                <Text style={S.cardStatusLine}>{batch.info}</Text>
                {/* Stats Row */}
                <View style={S.cardStatsRow}>
                  <View style={S.statBox}><Text style={S.statLabel}>Running</Text><Text style={S.statValue}>{batch.stats.running}</Text></View>
                  <View style={S.statBox}><Text style={S.statLabel}>Completed</Text><Text style={S.statValue}>{batch.stats.completed}</Text></View>
                  <View style={S.statBox}><Text style={S.statLabel}>Pending</Text><Text style={S.statValue}>{batch.stats.pending}</Text></View>
                  <View style={S.statBox}><Text style={S.statLabel}>Failed</Text><Text style={S.statValue}>{batch.stats.failed}</Text></View>
                </View>
                {/* Footer Buttons */}
                <View style={S.cardFooterRow}>
                  <View style={{ flex: 1, marginRight: 8 }}>
                    <PillButton 
                      title="Call Now" 
                      variant={batch.status === "draft" ? "primary" : "secondary"}
                      onPress={() => batch.status === "draft" && Alert.alert(`Call Now tapped for batch ${batch.label}`)}
                    />
                  </View>
                  <View style={{ flex: 1, marginLeft: 8 }}>
                    <PillButton 
                      title={batch.status === "completed" ? "Results" : "View"} 
                      variant="ghost" 
                      onPress={() => {
                        if (batch.status === "completed") {
                          router.push(`/(protected)/lexus/completed/${batch.id}` as any);
                        } else {
                          router.push(`/(protected)/lexus/batches/${batch.id}` as any);
                        }
                      }}
                    />
                  </View>
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
  scroll: { paddingHorizontal: 16, paddingBottom: 32 },
  filterRow: { flexDirection: 'row', gap: 8, paddingVertical: 8, paddingHorizontal: 2, marginBottom: 6 },
  filterPill: { paddingHorizontal: 18, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginRight: 8, borderWidth: 1 },
  filterPillActive: { backgroundColor: C.blue, borderColor: C.blue },
  filterPillInactive: { backgroundColor: 'rgba(13,31,56,0.92)', borderColor: C.border },
  filterPillTextActive: { color: '#fff', fontWeight: '700', fontSize: 15 },
  filterPillTextInactive: { color: C.textMuted, fontWeight: '600', fontSize: 15 },
  card: { marginBottom: 14 },
  cardTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  cardIcon: { fontSize: 18, marginRight: 8 },
  cardLabel: { color: C.text, fontWeight: '700', fontSize: 16 },
  cardInfoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 2, marginTop: 2 },
  cardInfoIcon: { fontSize: 15, marginRight: 3, marginLeft: 8 },
  cardInfoText: { color: C.textMuted, fontSize: 13, marginRight: 8 },
  cardStatusLine: { color: C.textFaint, fontSize: 13, marginBottom: 6, marginTop: 2 },
  cardStatsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12, marginTop: 2 },
  statBox: { flex: 1, alignItems: 'center', backgroundColor: 'rgba(10,22,40,0.85)', borderRadius: 8, marginHorizontal: 2, paddingVertical: 6, borderWidth: 1, borderColor: 'rgba(79,140,255,0.10)' },
  statLabel: { color: C.textFaint, fontSize: 11, fontWeight: '600', marginBottom: 1 },
  statValue: { color: C.text, fontWeight: '700', fontSize: 14 },
  cardFooterRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 },
  emptyWrap: { alignItems: 'center', justifyContent: 'center', paddingVertical: 40 },
  emptyText: { color: C.textFaint, fontSize: 15, fontWeight: '600' },
});
