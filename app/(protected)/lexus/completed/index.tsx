import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import GlassCard from "../../../../components/lexus/GlassCard";
import PillButton from "../../../../components/lexus/PillButton";
import SectionHeader from "../../../../components/lexus/SectionHeader";
import StatusPill from "../../../../components/lexus/StatusPill";
import { C } from "../../../../components/lexus/theme";
import { useCalls } from "../../../../hooks/useCalls";
import { useCapabilities } from "../../../../hooks/useCapabilities";
import { formatTime, groupCallsByRoom } from "../../../../lib/adapters/calls";

const FILTERS = ["All", "Recent", "High Conversion", "Needs Follow-up"];

// ── SCREEN COMPONENT ──────────────────────────────────────────────────────
export default function LexusCompletedBatches() {
  const { calls, isLoading, isBootstrapping, refreshCalls, error } = useCalls();
  const { can, vocabulary } = useCapabilities();
  const [activeFilter, setActiveFilter] = useState("All");

  const completedCalls = calls.filter((item) => item.state === "completed");
  const grouped = groupCallsByRoom(completedCalls);

  const completedBatches = grouped.map((group) => {
    const total = group.total;
    const qualified = group.completed;
    const hot = Math.min(qualified, Math.max(1, Math.floor(qualified * 0.5)));
    const warm = Math.max(0, qualified - hot);
    const cold = Math.max(0, total - qualified);
    const conversionRate = total ? (qualified / total) * 100 : 0;

    return {
      id: group.roomId,
      label: `Room ${group.roomId}`,
      completedAt: formatTime(group.latestAt),
      totalLeads: total,
      hot,
      warm,
      cold,
      qualified,
      conversionRate,
    };
  });

  const filteredBatches = useMemo(() => {
    let result = [...completedBatches];
    if (activeFilter === "All") return result;

    if (activeFilter === "Recent") {
      // Just taking the first 2 as 'Recent' for mock purposes
      return result.slice(0, 2);
    }
    if (activeFilter === "High Conversion") {
      return result.filter((b) => b.conversionRate >= 20);
    }
    if (activeFilter === "Needs Follow-up") {
      return result.filter((b) => b.conversionRate < 10 || b.hot < 5);
    }
    return result;
  }, [activeFilter, completedBatches]);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <SectionHeader
          title={`Completed ${vocabulary.batchesLabel}`}
          subtitle={`Review finished AI ${vocabulary.campaignsLabel.toLowerCase()}`}
          style={{ paddingHorizontal: 16, marginTop: 16, marginBottom: 8 }}
          actionLabel="Refresh"
          onAction={() => void refreshCalls()}
        />

        {!can("calls.history") && (
          <View style={styles.listWrap}>
            <GlassCard style={styles.emptyCard} padded={true}>
              <Text style={styles.emptyIcon}>🔒</Text>
              <Text style={styles.emptyTitle}>Call history is unavailable on your plan.</Text>
              <Text style={styles.emptySubtitle}>{`Upgrade your plan to view completed ${vocabulary.campaignsLabel.toLowerCase()} results.`}</Text>
            </GlassCard>
          </View>
        )}

        {(isLoading || isBootstrapping) && can("calls.history") && (
          <View style={styles.listWrap}>
            <GlassCard style={styles.emptyCard} padded={true}>
              <Text style={styles.emptyTitle}>Loading completed calls...</Text>
            </GlassCard>
          </View>
        )}

        {!isLoading && !isBootstrapping && can("calls.history") && error && (
          <View style={styles.listWrap}>
            <GlassCard style={styles.emptyCard} padded={true}>
              <Text style={styles.emptyTitle}>Failed to load completed calls.</Text>
              <Text style={styles.emptySubtitle}>{error}</Text>
            </GlassCard>
          </View>
        )}

        {/* ── FILTERS ── */}
        {can("calls.history") && !isLoading && !isBootstrapping && !error && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
          style={{ paddingVertical: 10, marginBottom: 8 }}
        >
          {FILTERS.map((f) => {
            const isActive = activeFilter === f;
            return (
              <TouchableOpacity
                key={f}
                style={[
                  styles.filterPill,
                  isActive ? styles.filterPillActive : styles.filterPillInactive,
                ]}
                onPress={() => setActiveFilter(f)}
                activeOpacity={0.8}
              >
                <Text
                  style={
                    isActive
                      ? styles.filterPillTextActive
                      : styles.filterPillTextInactive
                  }
                >
                  {f}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        )}

        {/* ── BATCH LIST ── */}
        {can("calls.history") && !isLoading && !isBootstrapping && !error && (
        <View style={styles.listWrap}>
          {filteredBatches.length === 0 ? (
            <GlassCard style={styles.emptyCard} padded={true}>
              <Text style={styles.emptyIcon}>📭</Text>
              <Text style={styles.emptyTitle}>{`No completed ${vocabulary.callsLabel.toLowerCase()} found.`}</Text>
              <Text style={styles.emptySubtitle}>
                Try selecting a different filter above.
              </Text>
            </GlassCard>
          ) : (
            filteredBatches.map((batch) => (
              <GlassCard key={batch.id} style={styles.card} padded={true}>
                {/* Header Row */}
                <View style={styles.cardHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.batchLabel}>{batch.label}</Text>
                    <Text style={styles.batchId}>ID: {batch.id}</Text>
                  </View>
                  <StatusPill label="COMPLETED" tone="success" style={{ marginLeft: 8 }} />
                </View>

                {/* Date */}
                <Text style={styles.dateText}>📅 {batch.completedAt}</Text>

                {/* KPI Line */}
                <View style={styles.kpiRow}>
                  <View style={styles.kpiCol}>
                    <Text style={styles.kpiVal}>{batch.totalLeads}</Text>
                    <Text style={styles.kpiLab}>{`Total ${vocabulary.leadsLabel}`}</Text>
                  </View>
                  <View style={styles.kpiDivider} />
                  <View style={styles.kpiCol}>
                    <Text style={[styles.kpiVal, { color: C.green }]}>{batch.hot}</Text>
                    <Text style={styles.kpiLab}>Hot</Text>
                  </View>
                  <View style={styles.kpiDivider} />
                  <View style={styles.kpiCol}>
                    <Text style={[styles.kpiVal, { color: C.amber }]}>{batch.warm}</Text>
                    <Text style={styles.kpiLab}>Warm</Text>
                  </View>
                  <View style={styles.kpiDivider} />
                  <View style={styles.kpiCol}>
                    <Text style={[styles.kpiVal, { color: C.textFaint }]}>{batch.cold}</Text>
                    <Text style={styles.kpiLab}>Cold</Text>
                  </View>
                </View>

                {/* Conversion Summary Strip */}
                <View style={styles.summaryBar}>
                  <Text style={styles.summaryText}>
                    Qualified {batch.qualified} / {batch.totalLeads} •{" "}
                    <Text style={{ color: C.blue, fontWeight: "700" }}>
                      {batch.conversionRate.toFixed(1)}% conversion
                    </Text>
                  </Text>
                </View>

                {/* Primary Action */}
                <PillButton
                  title="View Results"
                  variant="primary"
                  style={{ marginTop: 16 }}
                  onPress={() =>
                      router.push(`/(protected)/lexus/completed/${encodeURIComponent(batch.id)}` as any)
                  }
                />
              </GlassCard>
            ))
          )}
        </View>
        )}

        <View style={{ height: 60 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ── STYLES ─────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: C.bg,
  },
  scroll: {
    paddingBottom: 32,
  },
  filterScroll: {
    paddingHorizontal: 16,
    paddingRight: 32,
    gap: 10,
  },
  filterPill: {
    height: 38,
    paddingHorizontal: 18,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  filterPillActive: {
    backgroundColor: C.blue,
    borderColor: C.blue,
  },
  filterPillInactive: {
    backgroundColor: "rgba(13,31,56,0.92)",
    borderColor: C.border,
  },
  filterPillTextActive: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  filterPillTextInactive: {
    color: C.textMuted,
    fontSize: 14,
    fontWeight: "600",
  },
  listWrap: {
    paddingHorizontal: 16,
  },
  emptyCard: {
    alignItems: "center",
    paddingVertical: 50,
  },
  emptyIcon: {
    fontSize: 36,
    marginBottom: 12,
  },
  emptyTitle: {
    color: C.text,
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6,
  },
  emptySubtitle: {
    color: C.textMuted,
    fontSize: 14,
    textAlign: "center",
  },
  card: {
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  batchLabel: {
    fontSize: 18,
    fontWeight: "700",
    color: C.text,
    marginBottom: 2,
  },
  batchId: {
    fontSize: 12,
    color: C.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  dateText: {
    fontSize: 13,
    color: C.textFaint,
    marginBottom: 16,
  },
  kpiRow: {
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0.15)",
    borderRadius: 8,
    paddingVertical: 14,
    marginBottom: 14,
  },
  kpiCol: {
    flex: 1,
    alignItems: "center",
  },
  kpiDivider: {
    width: 1,
    backgroundColor: "rgba(255,255,255,0.06)",
  },
  kpiVal: {
    fontSize: 18,
    fontWeight: "800",
    color: C.text,
    marginBottom: 2,
  },
  kpiLab: {
    fontSize: 11,
    color: C.textMuted,
    textTransform: "uppercase",
  },
  summaryBar: {
    backgroundColor: "rgba(79,140,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(79,140,255,0.15)",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: "center",
  },
  summaryText: {
    fontSize: 13,
    color: C.text,
  },
});
