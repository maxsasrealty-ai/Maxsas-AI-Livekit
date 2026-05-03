import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import GlassCard from "../../../../components/lexus/GlassCard";
import PillButton from "../../../../components/lexus/PillButton";
import StatusPill from "../../../../components/lexus/StatusPill";
import { LexusThemeColors } from "../../../../components/lexus/theme";
import { useLexusTheme } from "../../../../context/LexusThemeContext";
import { useCallDetail } from "../../../../hooks/useCallDetail";
import { useCalls } from "../../../../hooks/useCalls";
import { useCapabilities } from "../../../../hooks/useCapabilities";
import { useResponsive } from "../../../../hooks/useResponsive";
import { formatBatchName, formatTime, statusTone } from "../../../../lib/adapters/calls";
import type { CallSummary } from "../../../../shared/contracts";

const RESULT_FILTERS = ["All", "Qualified", "Neutral", "Retry", "Failed"] as const;

export default function LexusCompletedBatchDetail() {
  const { colors, isDark } = useLexusTheme();
  const { isDesktop } = useResponsive();
  const s = useMemo(() => createStyles(colors, isDark, isDesktop), [colors, isDark, isDesktop]);
  const bottomSpacer = isDesktop ? 112 : 72;

  const { id } = useLocalSearchParams<{ id: string }>();
  const roomId = typeof id === "string" ? decodeURIComponent(id) : "";
  const [activeFilter, setActiveFilter] = useState<(typeof RESULT_FILTERS)[number]>("All");

  const { calls, isLoading, isBootstrapping, error } = useCalls();
  const { can } = useCapabilities();

  const batchCalls = useMemo(() => calls.filter((item) => item.roomId === roomId), [calls, roomId]);

  const summary = useMemo(() => {
    const total = batchCalls.length;
    const qualified = batchCalls.filter((call) => call.state === "completed").length;
    const failed = batchCalls.filter((call) => call.state === "failed").length;
    const neutral = Math.max(total - qualified - failed, 0);

    return {
      total,
      qualified,
      neutral,
      failed,
      completedAt: formatTime(batchCalls[0]?.initiatedAt),
      status: qualified + failed === total && total > 0 ? "COMPLETED" : "IN PROGRESS",
    };
  }, [batchCalls]);

  const outcomeRows = useMemo(() => {
    const bucket = new Map<string, number>();

    batchCalls.forEach((call) => {
      const label =
        call.state === "failed"
          ? "Failed"
          : call.state === "completed"
          ? "Qualified Lead"
          : "Attempt Limit Reached";
      bucket.set(label, (bucket.get(label) || 0) + 1);
    });

    return [...bucket.entries()].map(([label, count]) => ({
      label,
      count,
      ratio: summary.total ? Math.round((count / summary.total) * 100) : 0,
    }));
  }, [batchCalls, summary.total]);

  const filteredLeads = useMemo(() => {
    if (activeFilter === "All") {
      return batchCalls;
    }
    if (activeFilter === "Qualified") {
      return batchCalls.filter((call) => call.state === "completed");
    }
    if (activeFilter === "Neutral") {
      return batchCalls.filter((call) => call.state !== "completed" && call.state !== "failed");
    }
    if (activeFilter === "Retry") {
      const retryOutcomes = new Set([
        "busy_line",
        "user_no_response",
        "not_available_callback_requested",
        "voicemail_detected",
      ]);

      return batchCalls.filter((call) => {
        if (call.lead_bucket === "Retry") return true;
        const outcome = (call.raw_call_outcome || "").toLowerCase();
        return retryOutcomes.has(outcome);
      });
    }

    return batchCalls.filter((call) => call.state === "failed");
  }, [activeFilter, batchCalls]);

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        <View style={s.headerRow}>
          <TouchableOpacity style={s.backBtn} onPress={() => router.push("/(protected)/lexus" as any)}>
            <Text style={s.backLabel}>Back to Summary</Text>
          </TouchableOpacity>
          <Text style={s.headerTitle}>Batch Results</Text>
        </View>

        {!can("calls.history") && (
          <GlassCard style={s.card}>
            <Text style={s.infoText}>Call history is unavailable on your plan.</Text>
          </GlassCard>
        )}

        {can("calls.history") && (isLoading || isBootstrapping) && (
          <GlassCard style={s.card}>
            <Text style={s.infoText}>Loading batch results...</Text>
          </GlassCard>
        )}

        {can("calls.history") && !isLoading && !isBootstrapping && error && (
          <GlassCard style={s.card}>
            <Text style={s.errorText}>Failed to load batch results: {error}</Text>
          </GlassCard>
        )}

        {can("calls.history") && !isLoading && !isBootstrapping && !error && (
          <>
            <View style={s.batchHeadRow}>
              <View>
                <Text style={s.batchName}>{formatBatchName(roomId)}</Text>
                <Text style={s.batchSub}>Live batch {roomId.slice(0, 8)} · contact-wise calling outcome</Text>
              </View>
            </View>

            <GlassCard style={s.card}>
              <Text style={s.highlightTitle}>Live Calling Overview</Text>
              <View style={s.metaRow}>
                <Text style={s.metaLabel}>Batch ID</Text>
                <Text style={s.metaValue}>{roomId || "-"}</Text>
              </View>
              <View style={s.metaRow}>
                <Text style={s.metaLabel}>Completed At</Text>
                <Text style={s.metaValue}>{summary.completedAt}</Text>
              </View>
              <View style={s.metaRow}>
                <Text style={s.metaLabel}>Status</Text>
                <StatusPill label={summary.status} tone="success" />
              </View>
            </GlassCard>

            <View style={s.actionsRow}>
              <PillButton
                title="View Billing Detail"
                variant="secondary"
                style={{ flex: 1 }}
                onPress={() => router.push("/(protected)/lexus/wallet" as any)}
              />
            </View>

            <Text style={s.sectionTitle}>Calling Snapshot</Text>
            <View style={s.kpiRow}>
              <KpiCard styles={s} label="Total Leads" value={summary.total} />
              <KpiCard styles={s} label="Qualified Leads" value={summary.qualified} accent />
              <KpiCard styles={s} label="Neutral" value={summary.neutral} />
            </View>

            <Text style={s.sectionTitle}>Qualified Outcomes</Text>
            <GlassCard style={s.card}>
              <Text style={s.infoText}>
                {summary.qualified > 0
                  ? `${summary.qualified} qualified lead(s) are available in this batch.`
                  : "No qualified leads in this batch."}
              </Text>
            </GlassCard>

            <Text style={s.sectionTitle}>Outcome Breakdown</Text>
            <GlassCard style={s.card}>
              {outcomeRows.length === 0 ? (
                <Text style={s.infoText}>No outcomes captured yet.</Text>
              ) : (
                outcomeRows.map((item) => (
                  <View key={item.label} style={s.outcomeRow}>
                    <View style={s.outcomeTop}>
                      <Text style={s.outcomeLabel}>{item.label}</Text>
                      <Text style={s.outcomeRatio}>{item.count} ({item.ratio}%)</Text>
                    </View>
                    <View style={s.outcomeTrack}>
                      <View style={[s.outcomeFill, { width: `${item.ratio}%` }]} />
                    </View>
                  </View>
                ))
              )}
            </GlassCard>

            <Text style={s.sectionTitle}>Contact Results</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.filterRow}>
              {RESULT_FILTERS.map((filter) => {
                const active = filter === activeFilter;
                return (
                  <TouchableOpacity
                    key={filter}
                    style={[s.filterPill, active && s.filterPillActive]}
                    onPress={() => setActiveFilter(filter)}
                  >
                    <Text style={[s.filterText, active && s.filterTextActive]}>{filter}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {filteredLeads.length === 0 ? (
              <GlassCard style={s.card}>
                <Text style={s.infoText}>No contact results for this filter.</Text>
              </GlassCard>
            ) : (
              filteredLeads.map((call) => <LeadResultCard key={call.callId} callId={call.callId} call={call} styles={s} />)
            )}
          </>
        )}

        <View style={{ height: bottomSpacer }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function KpiCard({
  styles,
  label,
  value,
  accent = false,
}: {
  styles: ReturnType<typeof createStyles>;
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <GlassCard style={[styles.kpiCard, accent && styles.kpiAccent]} padded={false}>
      <Text style={[styles.kpiValue, accent && styles.kpiValueAccent]}>{value}</Text>
      <Text style={styles.kpiLabel}>{label}</Text>
    </GlassCard>
  );
}

function LeadResultCard({
  callId,
  call,
  styles,
}: {
  callId: string;
  call: CallSummary;
  styles: ReturnType<typeof createStyles>;
}) {
  const { detail, lead } = useCallDetail(callId);
  const mobileNumber = lead?.fields.phone || detail?.phoneNumber || "-";

  const handlePress = () => {
    router.push(`/(protected)/lexus/call/${encodeURIComponent(call.callId)}` as any);
  };

  return (
    <TouchableOpacity activeOpacity={0.85} onPress={handlePress}>
      <GlassCard style={styles.resultCard} padded={false}>
        <View style={styles.resultTop}>
          <Text style={styles.resultId}>{call.callId.slice(0, 10)}</Text>
          <StatusPill label={call.state} tone={statusTone(call.state)} />
        </View>
        <Text style={styles.resultMeta}>Room: {call.roomId}</Text>
        <Text style={styles.resultMeta}>Mobile No: {mobileNumber}</Text>
        <Text style={styles.resultMeta}>Started: {formatTime(call.initiatedAt)}</Text>
      </GlassCard>
    </TouchableOpacity>
  );
}

function createStyles(colors: LexusThemeColors, isDark: boolean, isDesktop: boolean) {
  const scale = isDesktop ? 0.82 : 1;
  const px = (value: number) => Math.round(value * scale);

  return StyleSheet.create({
    safe: { flex: 1, backgroundColor: colors.bg },
    scroll: { paddingHorizontal: px(16), paddingTop: px(10), paddingBottom: px(32) },
    headerRow: { flexDirection: "row", alignItems: "center", marginBottom: px(14) },
    backBtn: {
      minWidth: px(92),
      height: px(36),
      borderRadius: px(18),
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: isDark ? "rgba(13,31,56,0.9)" : "rgba(79,140,255,0.12)",
      borderWidth: 1,
      borderColor: colors.border,
      marginRight: px(8),
      paddingHorizontal: px(14),
    },
    backLabel: { color: colors.text, fontSize: px(12), fontWeight: "700" },
    headerTitle: { color: colors.text, fontSize: px(24), fontWeight: "800", flex: 1, textAlign: "center", marginRight: px(44) },
    card: { marginBottom: px(12) },
    infoText: { color: colors.textMuted, fontSize: px(14) },
    errorText: { color: colors.red, fontSize: px(14) },
    batchHeadRow: { flexDirection: "row", alignItems: "center", marginBottom: px(10) },
    batchName: { color: colors.text, fontSize: px(19), fontWeight: "800" },
    batchSub: { color: colors.textMuted, fontSize: px(13), marginTop: px(2) },
    highlightTitle: { color: colors.green, fontSize: px(15), fontWeight: "800", marginBottom: px(8) },
    metaRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: px(6) },
    metaLabel: { color: colors.textMuted, fontSize: px(13) },
    metaValue: { color: colors.text, fontSize: px(14), fontWeight: "700", flex: 1, textAlign: "right", marginLeft: px(8) },
    actionsRow: { flexDirection: "row", marginBottom: px(12) },
    sectionTitle: { color: colors.text, fontSize: px(18), fontWeight: "800", marginBottom: px(8), marginTop: px(4) },
    kpiRow: { flexDirection: "row", gap: px(10), marginBottom: px(12) },
    kpiCard: {
      flex: 1,
      minHeight: px(88),
      alignItems: "center",
      justifyContent: "center",
      borderRadius: px(14),
    },
    kpiAccent: {
      borderColor: "rgba(0,168,107,0.45)",
      backgroundColor: isDark ? "rgba(0,168,107,0.16)" : "rgba(0,168,107,0.12)",
    },
    kpiValue: { color: colors.text, fontSize: px(36), fontWeight: "800" },
    kpiValueAccent: { color: colors.green },
    kpiLabel: { color: colors.textMuted, fontSize: px(12), textAlign: "center", marginTop: px(2) },
    outcomeRow: { marginBottom: px(10) },
    outcomeTop: { flexDirection: "row", justifyContent: "space-between", marginBottom: px(4) },
    outcomeLabel: { color: colors.text, fontWeight: "700", fontSize: px(14) },
    outcomeRatio: { color: colors.textMuted, fontSize: px(13) },
    outcomeTrack: {
      height: px(10),
      borderRadius: 999,
      backgroundColor: isDark ? "rgba(255,255,255,0.10)" : "rgba(16,33,61,0.12)",
      overflow: "hidden",
    },
    outcomeFill: { height: px(10), borderRadius: 999, backgroundColor: "#6f7a8f" },
    filterRow: { gap: px(8), marginBottom: px(12) },
    filterPill: {
      height: px(38),
      borderRadius: px(19),
      paddingHorizontal: px(14),
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
    filterText: { color: colors.textMuted, fontWeight: "600", fontSize: px(13) },
    filterTextActive: { color: colors.text, fontWeight: "700" },
    resultCard: { marginBottom: px(10), paddingHorizontal: px(12), paddingVertical: px(10) },
    resultTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: px(6) },
    resultId: { color: colors.text, fontSize: px(14), fontWeight: "700" },
    resultMeta: { color: colors.textMuted, fontSize: px(12), marginBottom: px(2) },
  });
}
