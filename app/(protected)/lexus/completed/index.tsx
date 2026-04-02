import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";

import { C } from "../../../../components/lexus/theme";
import GlassCard from "../../../../components/lexus/GlassCard";
import PillButton from "../../../../components/lexus/PillButton";
import SectionHeader from "../../../../components/lexus/SectionHeader";
import StatusPill from "../../../../components/lexus/StatusPill";

// ── MOCK DATA ─────────────────────────────────────────────────────────────
const MOCK_COMPLETED_BATCHES = [
  {
    id: "B-8839",
    label: "March 2026 Buyers",
    completedAt: "10 Mar 2026, 04:30 pm",
    totalLeads: 45,
    hot: 8,
    warm: 12,
    cold: 25,
    qualified: 8,
    conversionRate: 17.7,
  },
  {
    id: "B-8840",
    label: "NRI Investors - Q1",
    completedAt: "08 Mar 2026, 11:15 am",
    totalLeads: 30,
    hot: 15,
    warm: 10,
    cold: 5,
    qualified: 15,
    conversionRate: 50.0, // High Conversion
  },
  {
    id: "B-8841",
    label: "Old Leads Revival",
    completedAt: "05 Mar 2026, 02:45 pm",
    totalLeads: 120,
    hot: 4,
    warm: 16,
    cold: 100,
    qualified: 4,
    conversionRate: 3.3, // Needs Follow-up
  },
  {
    id: "B-8842",
    label: "Villa Launch Submissions",
    completedAt: "02 Mar 2026, 09:00 am",
    totalLeads: 55,
    hot: 14,
    warm: 20,
    cold: 21,
    qualified: 14,
    conversionRate: 25.4,
  },
];

const FILTERS = ["All", "Recent", "High Conversion", "Needs Follow-up"];

// ── SCREEN COMPONENT ──────────────────────────────────────────────────────
export default function LexusCompletedBatches() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredBatches = useMemo(() => {
    let result = [...MOCK_COMPLETED_BATCHES];
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
  }, [activeFilter]);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <SectionHeader
          title="Completed Batches"
          subtitle="Review finished AI calling campaigns"
          style={{ paddingHorizontal: 16, marginTop: 16, marginBottom: 8 }}
        />

        {/* ── FILTERS ── */}
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

        {/* ── BATCH LIST ── */}
        <View style={styles.listWrap}>
          {filteredBatches.length === 0 ? (
            <GlassCard style={styles.emptyCard} padded={true}>
              <Text style={styles.emptyIcon}>📭</Text>
              <Text style={styles.emptyTitle}>No completed batches found.</Text>
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
                    <Text style={styles.kpiLab}>Total</Text>
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
                    router.push(`/(protected)/lexus/completed/${batch.id}` as any)
                  }
                />
              </GlassCard>
            ))
          )}
        </View>

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
