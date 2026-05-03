import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
import { Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import GlassCard from "../../../../components/lexus/GlassCard";
import PillButton from "../../../../components/lexus/PillButton";
import SectionHeader from "../../../../components/lexus/SectionHeader";
import StatusPill from "../../../../components/lexus/StatusPill";
import { LexusThemeColors } from "../../../../components/lexus/theme";
import { useLexusTheme } from "../../../../context/LexusThemeContext";
import { useCallDetail } from "../../../../hooks/useCallDetail";
import { useCalls } from "../../../../hooks/useCalls";
import { useCapabilities } from "../../../../hooks/useCapabilities";
import { useResponsive } from "../../../../hooks/useResponsive";
import { formatBatchName, formatTime, statusTone } from "../../../../lib/adapters/calls";

const CONTACT_TABS = [
  { key: "pending", label: "Show Pending" },
  { key: "completed", label: "Show Completed" },
  { key: "failed", label: "Show Failed" },
] as const;

export default function LexusBatchDetail() {
  const { colors, isDark } = useLexusTheme();
  const { isDesktop } = useResponsive();
  const s = useMemo(() => createStyles(colors, isDark, isDesktop), [colors, isDark, isDesktop]);
  const bottomSpacer = isDesktop ? 112 : 72;

  const { id } = useLocalSearchParams<{ id: string }>();
  const roomId = typeof id === "string" ? decodeURIComponent(id) : "";
  const batchLabel = formatBatchName(roomId);

  const { calls, isLoading, isBootstrapping, error } = useCalls();
  const { can } = useCapabilities();
  const [tab, setTab] = useState<(typeof CONTACT_TABS)[number]["key"]>("pending");

  const batchCalls = useMemo(() => calls.filter((item) => item.roomId === roomId), [calls, roomId]);

  const batch = useMemo(() => {
    const completed = batchCalls.filter((item) => item.state === "completed").length;
    const failed = batchCalls.filter((item) => item.state === "failed").length;
    const pending = Math.max(batchCalls.length - completed - failed, 0);
    const progress = batchCalls.length ? Math.round((completed / batchCalls.length) * 100) : 0;

    const finished = completed + failed;

    return {
      id: roomId,
      // consider the batch finished when all contacts have reached a terminal state (completed or failed)
      status: batchCalls.length > 0 && finished === batchCalls.length ? "completed" : "running",
      createdAt: formatTime(batchCalls[0]?.initiatedAt),
      totalContacts: batchCalls.length,
      completed,
      pending,
      failed,
      progress,
      contacts: batchCalls,
    };
  }, [batchCalls, roomId]);

  const contacts = useMemo(() => {
    if (tab === "completed") {
      return batch.contacts.filter((item) => item.state === "completed");
    }
    if (tab === "failed") {
      return batch.contacts.filter((item) => item.state === "failed");
    }
    return batch.contacts.filter((item) => item.state !== "completed" && item.state !== "failed");
  }, [batch.contacts, tab]);

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        <View style={s.headerRow}>
          <TouchableOpacity style={s.backBtn} onPress={() => router.push("/(protected)/lexus" as any)}>
            <Text style={s.backLabel}>Back to Home</Text>
          </TouchableOpacity>
          <View style={s.headerCenter}>
            <Text style={s.headerKicker}>LIVE MONITOR</Text>
            <Text style={s.headerTitle}>Live Call Monitor</Text>
          </View>
          <View style={s.headerSpacer} />
        </View>

        {!can("calls.history") && (
          <GlassCard style={s.card}>
            <Text style={s.emptyText}>Batch insights are unavailable on your current plan.</Text>
          </GlassCard>
        )}

        {can("calls.history") && (isLoading || isBootstrapping) && (
          <GlassCard style={s.card}>
            <Text style={s.emptyText}>Loading batch details...</Text>
          </GlassCard>
        )}

        {can("calls.history") && !isLoading && !isBootstrapping && error && (
          <GlassCard style={s.card}>
            <Text style={s.emptyText}>Failed to load batch details: {error}</Text>
          </GlassCard>
        )}

        {can("calls.history") && !isLoading && !isBootstrapping && !error && (
          <>
            <GlassCard style={s.bannerCard}>
              <View style={s.bannerTopRow}>
                <View style={{ flex: 1 }}>
                  <Text style={s.bannerTitle}>{batchLabel}</Text>
                  <Text style={s.bannerSub}>Live calling status • {batch.status.toUpperCase()} • MANUAL</Text>
                </View>
                <StatusPill label="LIVE" tone={batch.status === "completed" ? "success" : "info"} />
              </View>
            </GlassCard>

            <GlassCard style={s.card}>
              <InfoRow styles={s} label="Batch ID" value={batch.id || "-"} />
              <Divider styles={s} />
              <InfoRow styles={s} label="Total Contacts" value={String(batch.totalContacts)} />
              <Divider styles={s} />
              <InfoRow styles={s} label="Created" value={batch.createdAt} />
            </GlassCard>

            <GlassCard style={s.statusCard}>
              <Text style={s.statusText}>{batch.status === "completed" ? "✅ Batch completed" : "📞 Calls in progress"}</Text>
            </GlassCard>

            <View style={s.actionsRow}>
              <View style={{ flex: 1 }} />
              <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={() => router.push(`/(protected)/lexus/completed/${encodeURIComponent(roomId)}` as any)}>
                  <Text style={s.resultsLink}>View Results</Text>
                </TouchableOpacity>
              </View>
            </View>

            <GlassCard style={s.card}>
              <View style={s.progressTopRow}>
                <Text style={s.progressLabel}>Progress</Text>
                <Text style={s.progressValue}>{batch.progress}%</Text>
              </View>
              <View style={s.progressTrack}>
                <View style={[s.progressFill, { width: `${batch.progress}%` }]} />
              </View>
              <Text style={s.progressMeta}>{batch.completed} completed</Text>
              <Text style={s.progressMeta}>{batch.pending} pending</Text>
            </GlassCard>

            {batch.status === "completed" && (
              <GlassCard style={s.resultsCard}>
                <View style={s.resultsWrap}>
                  <PillButton
                    title="View Results"
                    variant="primary"
                    style={s.resultsButton}
                    onPress={() => router.push(`/(protected)/lexus/completed/${encodeURIComponent(roomId)}` as any)}
                  />
                </View>
              </GlassCard>
            )}

            <Text style={s.sectionTitle}>Live Snapshot</Text>
            <View style={s.kpiRow}>
              <KpiCard styles={s} icon="📞" label="Contacts" value={batch.totalContacts} />
              <KpiCard styles={s} icon="✅" label="Completed" value={batch.completed} />
              <KpiCard styles={s} icon="⏳" label="Pending" value={batch.pending} />
            </View>

            <SectionHeader title={`${batch.totalContacts} Live Contact(s)`} subtitle="Track each contact inside this call batch" />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.filterRow}>
              {CONTACT_TABS.map((item) => (
                <TouchableOpacity
                  key={item.key}
                  style={[s.filterPill, tab === item.key && s.filterPillActive]}
                  onPress={() => setTab(item.key)}
                >
                  <Text style={[s.filterPillText, tab === item.key && s.filterPillTextActive]}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {contacts.length === 0 ? (
              <GlassCard style={s.card}>
                <Text style={s.emptyText}>No live contacts in this state.</Text>
              </GlassCard>
            ) : (
              contacts.map((call, index) => <LiveContactCard key={call.callId} call={call} index={index} styles={s} />)
            )}
          </>
        )}

        <View style={{ height: bottomSpacer }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoRow({
  styles,
  label,
  value,
}: {
  styles: ReturnType<typeof createStyles>;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

function LiveContactCard({ call, index, styles }: { call: any; index: number; styles: ReturnType<typeof createStyles> }) {
  const { detail, lead } = useCallDetail(call.callId);
  const mobile = lead?.fields?.phone || detail?.phoneNumber || "-";

  return (
    <GlassCard style={styles.contactCard} padded={false}>
      <View style={styles.contactTopRow}>
        <View style={styles.contactBadge}>
          <Text style={styles.contactBadgeText}>{index + 1}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.contactTitle}>{call.callId.slice(0, 10)}</Text>
          <Text style={styles.contactMeta}>{mobile}</Text>
        </View>
        <StatusPill label={call.state} tone={statusTone(call.state)} />
      </View>
      <Text style={styles.contactMeta}>Updated: {formatTime(call.initiatedAt)} · Status: {call.state}</Text>
      <Text style={styles.contactMeta}>Retry cycle: {index + 1}/3</Text>
    </GlassCard>
  );
}

function Divider({ styles }: { styles: ReturnType<typeof createStyles> }) {
  return <View style={styles.divider} />;
}

function KpiCard({
  styles,
  icon,
  label,
  value,
}: {
  styles: ReturnType<typeof createStyles>;
  icon: string;
  label: string;
  value: number;
}) {
  return (
    <GlassCard style={styles.kpiCard} padded={false}>
      <Text style={styles.kpiIcon}>{icon}</Text>
      <Text style={styles.kpiValue}>{value}</Text>
      <Text style={styles.kpiLabel}>{label}</Text>
    </GlassCard>
  );
}

function createStyles(colors: LexusThemeColors, isDark: boolean, isDesktop: boolean) {
  const scale = isDesktop ? 0.84 : 1;
  const px = (value: number) => Math.round(value * scale);

  return StyleSheet.create({
    safe: { flex: 1, backgroundColor: colors.bg },
    scroll: { paddingHorizontal: px(16), paddingBottom: px(32), paddingTop: px(10) },
    headerRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: px(12),
      paddingTop: Platform.OS === "android" ? 12 : 0,
    },
    backBtn: {
      width: px(36),
      height: px(36),
      borderRadius: px(18),
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: isDark ? "rgba(13,31,56,0.9)" : "rgba(79,140,255,0.12)",
      borderWidth: 1,
      borderColor: colors.border,
      marginRight: px(8),
    },
    backLabel: { color: colors.text, fontSize: px(12), fontWeight: "700" },
    headerCenter: { flex: 1, alignItems: "center", justifyContent: "center" },
    headerKicker: { color: colors.blue, fontSize: px(10), fontWeight: "800", letterSpacing: 1.2, marginBottom: px(2) },
    headerTitle: { color: colors.text, fontSize: px(24), fontWeight: "800", textAlign: "center" },
    headerSpacer: { width: px(36), height: px(36) },
    card: { marginBottom: px(12) },
    emptyText: { color: colors.textMuted, fontSize: px(14), textAlign: "center" },
    sectionTitle: { color: colors.text, fontSize: px(18), fontWeight: "800", marginBottom: px(10) },
    bannerCard: {
      backgroundColor: isDark ? "rgba(15, 88, 124, 0.95)" : "rgba(24, 131, 169, 0.95)",
      borderColor: isDark ? "rgba(79,140,255,0.25)" : "rgba(255,255,255,0.12)",
      marginBottom: px(12),
    },
    bannerTopRow: { flexDirection: "row", alignItems: "center" },
    bannerTitle: { color: "#ffffff", fontSize: px(20), fontWeight: "800" },
    bannerSub: { color: "rgba(255,255,255,0.86)", fontSize: px(12), marginTop: px(3), fontWeight: "700" },
    infoRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: px(8) },
    infoLabel: { color: colors.textMuted, fontSize: px(14) },
    infoValue: { color: colors.text, fontSize: px(14), fontWeight: "700", maxWidth: "55%", textAlign: "right" },
    divider: { height: 1, backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(16,33,61,0.08)", marginVertical: 2 },
    statusCard: {
      marginBottom: px(12),
      backgroundColor: isDark ? "rgba(0,208,132,0.14)" : "rgba(0,208,132,0.18)",
      borderColor: isDark ? "rgba(0,208,132,0.22)" : "rgba(0,208,132,0.28)",
    },
    statusText: { color: colors.text, fontWeight: "700", fontSize: px(14) },
    actionsRow: { flexDirection: "row", marginBottom: px(12) },
    resultsLink: {
      color: colors.blue,
      fontSize: px(13),
      fontWeight: "700",
      textAlign: "right",
      paddingVertical: px(10),
    },
    progressTopRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: px(8) },
    progressLabel: { color: colors.text, fontSize: px(13), fontWeight: "700" },
    progressValue: { color: colors.green, fontSize: px(13), fontWeight: "700" },
    progressTrack: { height: px(12), borderRadius: 999, backgroundColor: isDark ? "rgba(255,255,255,0.12)" : "rgba(16,33,61,0.12)", overflow: "hidden", marginBottom: px(8) },
    progressFill: { height: px(12), borderRadius: 999, backgroundColor: "#4CAF50" },
    progressMeta: { color: colors.textMuted, fontSize: px(12), marginBottom: px(2) },
    kpiRow: { flexDirection: "row", gap: px(8), marginBottom: px(12) },
    kpiCard: { flex: 1, minHeight: px(96), alignItems: "center", justifyContent: "center" },
    kpiIcon: { fontSize: px(20), marginBottom: px(2) },
    kpiValue: { color: colors.text, fontSize: px(30), fontWeight: "800" },
    kpiLabel: { color: colors.textMuted, fontSize: px(12), textAlign: "center" },
    filterRow: { gap: px(8), marginBottom: px(12) },
    filterPill: {
      paddingHorizontal: px(14),
      height: px(38),
      borderRadius: px(19),
      justifyContent: "center",
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: isDark ? "rgba(13,31,56,0.85)" : "rgba(79,140,255,0.08)",
      marginRight: px(8),
    },
    filterPillActive: {
      backgroundColor: colors.blue,
      borderColor: colors.blue,
    },
    filterPillText: { color: colors.textMuted, fontWeight: "600", fontSize: px(13) },
    filterPillTextActive: { color: "#ffffff", fontWeight: "700" },
    contactCard: { marginBottom: px(10), paddingHorizontal: px(12), paddingVertical: px(11) },
    contactTopRow: { flexDirection: "row", alignItems: "center", marginBottom: px(6) },
    contactBadge: {
      width: px(24),
      height: px(24),
      borderRadius: px(12),
      backgroundColor: colors.blue,
      alignItems: "center",
      justifyContent: "center",
      marginRight: px(8),
    },
    contactBadgeText: { color: "#fff", fontSize: px(12), fontWeight: "800" },
    contactTitle: { color: colors.text, fontWeight: "700", fontSize: px(14), flex: 1 },
    contactMeta: { color: colors.textMuted, fontSize: px(12), marginBottom: px(2) },
    resultsCard: { marginBottom: px(12), paddingHorizontal: px(12), paddingVertical: px(12) },
    resultsWrap: { width: "100%", alignItems: "center" },
    resultsButton: { width: "100%" },
  });
}
