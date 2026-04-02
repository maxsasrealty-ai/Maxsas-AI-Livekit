import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";

// ── PALETTE ───────────────────────────────────────────────────────────────
const C = {
  bg: "#040c18",
  bgCard: "#0d1f38",
  bgSoft: "#0a1628",
  blue: "#4F8CFF",
  green: "#00D084",
  amber: "#F5A623",
  red: "#FF6B6B",
  purple: "#A78BFA",
  cyan: "#5AC8FA",
  text: "#e8edf5",
  textMuted: "rgba(232,237,245,0.65)",
  textFaint: "rgba(232,237,245,0.40)",
  border: "rgba(79,140,255,0.20)",
};

// ── MOCK DATA ─────────────────────────────────────────────────────────────
const MOCK_SUMMARY = {
  completedAt: "10 Mar 2026, 04:30 pm",
  totalLeads: 45,
  qualifiedLeads: 8,
  conversionRate: 17.7,
  kpis: {
    hot: 8,
    warm: 12,
    cold: 25,
    followUp: 4,
  },
  distribution: [
    { label: "Site Visit Booked", count: 4, color: C.green },
    { label: "Follow-Up Required", count: 6, color: C.amber },
    { label: "No Response", count: 8, color: C.textMuted },
    { label: "Not Interested", count: 5, color: C.blue },
  ],
};

const MOCK_LEADS = [
  {
    id: "1",
    name: "Rahul Sharma",
    phone: "9876543211",
    outcome: "Site Visit Booked",
    status: "qualified",
    temperature: "hot",
    note: "Budget matched and visit confirmed for Saturday.",
    time: "2h ago",
  },
  {
    id: "2",
    name: "Priya Desai",
    phone: "9123456789",
    outcome: "Interested Later",
    status: "follow_up",
    temperature: "warm",
    note: "Wants a call back after 3 months. Not ready right now.",
    time: "2h ago",
  },
  {
    id: "3",
    name: "Rohan Khanna",
    phone: "9988776655",
    outcome: "Not Interested",
    status: "failed",
    temperature: "cold",
    note: "Property is out of budget. Hung up immediately.",
    time: "3h ago",
  },
  {
    id: "4",
    name: "Sneha Patel",
    phone: "8765432109",
    outcome: "High Intent Buyer",
    status: "qualified",
    temperature: "hot",
    note: "Requested direct connect with sales head. Ready funds.",
    time: "3h ago",
  },
  {
    id: "5",
    name: "Vikram Singh",
    phone: "8899001122",
    outcome: "No Response",
    status: "failed",
    temperature: "cold",
    note: "Call was unanswered after 3 attempts.",
    time: "4h ago",
  },
  {
    id: "6",
    name: "Meera Reddy",
    phone: "7766554433",
    outcome: "Follow-Up Required",
    status: "follow_up",
    temperature: "warm",
    note: "Discussing with family, check back tomorrow morning.",
    time: "4h ago",
  },
  {
    id: "7",
    name: "Arjun Das",
    phone: "9988112233",
    outcome: "Requested Immediate Callback",
    status: "follow_up",
    temperature: "hot",
    note: "Wants a human agent to explain the floor plan immediately.",
    time: "5h ago",
  },
  {
    id: "8",
    name: "Neha Gupta",
    phone: "8877665544",
    outcome: "Invalid Number",
    status: "failed",
    temperature: "cold",
    note: "Number does not exist.",
    time: "5h ago",
  },
  {
    id: "9",
    name: "Sanjay Kumar",
    phone: "7788990011",
    outcome: "Budget Discussion Pending",
    status: "follow_up",
    temperature: "warm",
    note: "Likes property but negotiating price. Assigned to manager.",
    time: "6h ago",
  },
];

const FILTERS = ["All", "Hot", "Warm", "Cold", "Qualified", "Failed"];

// ── SCREEN COMPONENT ──────────────────────────────────────────────────────
export default function LexusCompletedBatchDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [activeFilter, setActiveFilter] = useState("All");

  const displayId = id || "B-8839";

  const filteredLeads = useMemo(() => {
    let result = [...MOCK_LEADS];
    if (activeFilter === "All") return result;

    if (activeFilter === "Hot") return result.filter((l) => l.temperature === "hot");
    if (activeFilter === "Warm") return result.filter((l) => l.temperature === "warm");
    if (activeFilter === "Cold") return result.filter((l) => l.temperature === "cold");
    if (activeFilter === "Qualified") return result.filter((l) => l.status === "qualified");
    if (activeFilter === "Failed") return result.filter((l) => l.status === "failed");

    return result;
  }, [activeFilter]);

  // Pill visual helpers
  const getTempColor = (temp: string) => {
    switch (temp) {
      case "hot":
        return C.red;
      case "warm":
        return C.amber;
      case "cold":
      default:
        return C.blue;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "qualified":
        return C.green;
      case "follow_up":
        return C.amber;
      case "failed":
        return C.red;
      default:
        return C.blue;
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* ── 1) HEADER ── */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTitle}>Batch Results</Text>
          <Text style={styles.headerSub}>Completed campaign insights</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.contentPad}>
          {/* ── 2) HERO SUMMARY CARD ── */}
          <View style={styles.heroCard}>
            <View style={styles.heroStrip}>
              <Text style={styles.heroStripText}>✓ AI Calling Campaign Completed</Text>
            </View>
            <View style={styles.heroBody}>
              <View style={styles.heroTopRow}>
                <View>
                  <Text style={styles.heroLabel}>Batch ID</Text>
                  <Text style={styles.heroValue}>{displayId}</Text>
                </View>
                <View style={styles.statusPill}>
                  <Text style={styles.statusPillText}>COMPLETED</Text>
                </View>
              </View>
              
              <Text style={styles.heroTime}>Completed: {MOCK_SUMMARY.completedAt}</Text>

              <View style={styles.heroStatsRow}>
                <View style={styles.heroStatCol}>
                  <Text style={styles.heroStatVal}>{MOCK_SUMMARY.totalLeads}</Text>
                  <Text style={styles.heroStatLab}>Total Leads</Text>
                </View>
                <View style={styles.heroStatCol}>
                  <Text style={[styles.heroStatVal, { color: C.green }]}>
                    {MOCK_SUMMARY.qualifiedLeads}
                  </Text>
                  <Text style={styles.heroStatLab}>Qualified</Text>
                </View>
                <View style={styles.heroStatCol}>
                  <Text style={[styles.heroStatVal, { color: C.blue }]}>
                    {MOCK_SUMMARY.conversionRate}%
                  </Text>
                  <Text style={styles.heroStatLab}>Conversion</Text>
                </View>
              </View>

              <View style={styles.heroInsightLine}>
                <Text style={styles.heroInsightText}>
                  💡 Top result: 5 hot leads generated from this batch.
                </Text>
              </View>
            </View>
          </View>

          {/* ── 3) KPI SUMMARY ROW ── */}
          <View style={styles.kpiGrid}>
            {[
              { label: "Hot Leads", value: MOCK_SUMMARY.kpis.hot, color: C.red, icon: "🔥" },
              { label: "Warm Leads", value: MOCK_SUMMARY.kpis.warm, color: C.amber, icon: "⚡" },
              { label: "Cold Leads", value: MOCK_SUMMARY.kpis.cold, color: C.blue, icon: "❄️" },
              { label: "Follow-up required", value: MOCK_SUMMARY.kpis.followUp, color: C.purple, icon: "📞" },
            ].map((kpi, idx) => (
              <View key={idx} style={styles.kpiCard}>
                <View style={styles.kpiHeaderRow}>
                  <Text style={styles.kpiIcon}>{kpi.icon}</Text>
                  <Text style={[styles.kpiNumber, { color: kpi.color }]}>{kpi.value}</Text>
                </View>
                <Text style={styles.kpiLabel}>{kpi.label}</Text>
              </View>
            ))}
          </View>

          {/* ── 4) OUTCOME DISTRIBUTION CARD ── */}
          <View style={styles.distCard}>
            <Text style={styles.distTitle}>Outcome Distribution</Text>
            <View style={styles.distList}>
              {MOCK_SUMMARY.distribution.map((item, idx) => {
                const max = Math.max(...MOCK_SUMMARY.distribution.map((d) => d.count));
                const pct = (item.count / max) * 100;
                return (
                  <View key={idx} style={styles.distRowWrap}>
                    <View style={styles.distRowTop}>
                      <Text style={styles.distLabel}>{item.label}</Text>
                      <Text style={styles.distCount}>{item.count}</Text>
                    </View>
                    <View style={styles.progressBg}>
                      <View
                        style={[
                          styles.progressFill,
                          { width: `${pct}%`, backgroundColor: item.color },
                        ]}
                      />
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </View>

        {/* ── 5) LEAD FILTER TABS ── */}
        <View style={styles.listHeaderWrap}>
          <Text style={styles.listSectionTitle}>Lead Results</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
          style={styles.filterScrollView}
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
                      ? styles.filterTextActive
                      : styles.filterTextInactive
                  }
                >
                  {f}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* ── 6 & 7) LEAD LIST UI ── */}
        <View style={styles.listWrap}>
          {filteredLeads.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyIcon}>📭</Text>
              <Text style={styles.emptyText}>No leads in this segment.</Text>
            </View>
          ) : (
            filteredLeads.map((lead, idx) => (
              <TouchableOpacity
                key={lead.id}
                style={styles.leadCard}
                onPress={() => router.push(`/(protected)/lexus/completed/leads/${lead.id}` as any)}
                activeOpacity={0.7}
              >
                <View style={styles.leadRow}>
                  {/* Avatar */}
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{idx + 1}</Text>
                  </View>

                  {/* Center Details */}
                  <View style={styles.leadCenter}>
                    <Text style={styles.leadName}>{lead.name}</Text>
                    <Text style={styles.leadPhone}>{lead.phone}</Text>
                    <Text style={styles.leadOutcome}>↳ {lead.outcome}</Text>
                    <Text style={styles.leadNote} numberOfLines={2}>
                      "{lead.note}"
                    </Text>
                  </View>

                  {/* Right Tags */}
                  <View style={styles.leadRight}>
                    <View
                      style={[
                        styles.chip,
                        { backgroundColor: `${getStatusColor(lead.status)}20` },
                      ]}
                    >
                      <Text
                        style={[
                          styles.chipText,
                          { color: getStatusColor(lead.status) },
                        ]}
                      >
                        {lead.status.toUpperCase()}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.chip,
                        { backgroundColor: `${getTempColor(lead.temperature)}20` },
                      ]}
                    >
                      <Text
                        style={[
                          styles.chipText,
                          { color: getTempColor(lead.temperature) },
                        ]}
                      >
                        {lead.temperature.toUpperCase()}
                      </Text>
                    </View>
                    <Text style={styles.leadTime}>{lead.time}</Text>
                  </View>

                  {/* Chevron Affordance */}
                  <View style={{ justifyContent: 'center', marginLeft: 10, paddingTop: 10 }}>
                    <Text style={{ fontSize: 24, color: C.border }}>›</Text>
                  </View>
                </View>
              </TouchableOpacity>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.03)",
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  backIcon: {
    fontSize: 26,
    color: C.text,
    lineHeight: 30,
    marginLeft: -2,
  },
  headerTitleWrap: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: C.text,
  },
  headerSub: {
    fontSize: 12,
    color: C.textMuted,
  },
  scroll: {
    paddingBottom: 32,
  },
  contentPad: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  
  // Hero Card
  heroCard: {
    backgroundColor: C.bgCard,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: C.border,
    marginBottom: 20,
    overflow: "hidden",
  },
  heroStrip: {
    backgroundColor: "rgba(0,208,132,0.15)",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,208,132,0.1)",
  },
  heroStripText: {
    color: C.green,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  heroBody: {
    padding: 16,
  },
  heroTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  heroLabel: {
    fontSize: 12,
    color: C.textMuted,
    marginBottom: 2,
  },
  heroValue: {
    fontSize: 20,
    fontWeight: "800",
    color: C.text,
  },
  statusPill: {
    backgroundColor: "rgba(79,140,255,0.1)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(79,140,255,0.2)",
  },
  statusPillText: {
    fontSize: 10,
    fontWeight: "700",
    color: C.blue,
    letterSpacing: 0.5,
  },
  heroTime: {
    fontSize: 13,
    color: C.textFaint,
    marginBottom: 16,
  },
  heroStatsRow: {
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0.15)",
    borderRadius: 12,
    paddingVertical: 14,
    marginBottom: 16,
  },
  heroStatCol: {
    flex: 1,
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: "rgba(255,255,255,0.05)",
  },
  heroStatVal: {
    fontSize: 18,
    fontWeight: "800",
    color: C.text,
    marginBottom: 4,
  },
  heroStatLab: {
    fontSize: 11,
    color: C.textMuted,
    textTransform: "uppercase",
  },
  heroInsightLine: {
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.05)",
    paddingTop: 12,
  },
  heroInsightText: {
    fontSize: 13,
    color: C.text,
    lineHeight: 18,
  },

  // KPI Row
  kpiGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  kpiCard: {
    width: "48%",
    backgroundColor: C.bgCard,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: C.border,
    padding: 14,
    marginBottom: 12,
  },
  kpiHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  kpiIcon: {
    fontSize: 18,
  },
  kpiNumber: {
    fontSize: 22,
    fontWeight: "800",
  },
  kpiLabel: {
    fontSize: 12,
    color: C.textMuted,
    fontWeight: "500",
  },

  // Outcome Dist
  distCard: {
    backgroundColor: C.bgCard,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: C.border,
    padding: 16,
    marginBottom: 24,
  },
  distTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: C.text,
    marginBottom: 14,
  },
  distList: {
    gap: 12,
  },
  distRowWrap: {
    width: "100%",
  },
  distRowTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  distLabel: {
    fontSize: 13,
    color: C.text,
  },
  distCount: {
    fontSize: 13,
    fontWeight: "700",
    color: C.text,
  },
  progressBg: {
    width: "100%",
    height: 6,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },

  // Filter Tabs
  listHeaderWrap: {
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  listSectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: C.text,
  },
  filterScrollView: {
    marginBottom: 16,
  },
  filterScroll: {
    paddingHorizontal: 16,
    paddingRight: 32,
    gap: 8,
  },
  filterPill: {
    paddingHorizontal: 16,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    borderWidth: 1,
  },
  filterPillActive: {
    backgroundColor: C.blue,
    borderColor: C.blue,
  },
  filterPillInactive: {
    backgroundColor: C.bgCard,
    borderColor: C.border,
  },
  filterTextActive: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
  },
  filterTextInactive: {
    color: C.textMuted,
    fontSize: 13,
    fontWeight: "600",
  },

  // Leads List
  listWrap: {
    paddingHorizontal: 16,
  },
  emptyCard: {
    backgroundColor: C.bgCard,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: C.border,
    paddingVertical: 40,
    alignItems: "center",
  },
  emptyIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 15,
    color: C.textMuted,
    fontWeight: "500",
  },
  leadCard: {
    backgroundColor: C.bgCard,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: C.border,
    padding: 14,
    marginBottom: 12,
  },
  leadRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(79,140,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    marginTop: 2,
  },
  avatarText: {
    fontSize: 14,
    fontWeight: "700",
    color: C.blue,
  },
  leadCenter: {
    flex: 1,
    paddingRight: 8,
  },
  leadName: {
    fontSize: 15,
    fontWeight: "700",
    color: C.text,
    marginBottom: 2,
  },
  leadPhone: {
    fontSize: 12,
    color: C.textMuted,
    marginBottom: 6,
  },
  leadOutcome: {
    fontSize: 13,
    fontWeight: "600",
    color: C.text,
    marginBottom: 4,
  },
  leadNote: {
    fontSize: 12,
    color: C.textFaint,
    fontStyle: "italic",
    lineHeight: 16,
  },
  leadRight: {
    alignItems: "flex-end",
    minWidth: 70,
  },
  chip: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  chipText: {
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  leadTime: {
    fontSize: 10,
    color: C.textFaint,
    marginTop: 4,
  },
});
