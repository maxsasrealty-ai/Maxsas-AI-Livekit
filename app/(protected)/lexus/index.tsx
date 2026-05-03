import { router } from "expo-router";
import React, { useMemo } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import GlassCard from "../../../components/lexus/GlassCard";
import PillButton from "../../../components/lexus/PillButton";
import SectionHeader from "../../../components/lexus/SectionHeader";
import StatusPill from "../../../components/lexus/StatusPill";
import { LexusThemeColors } from "../../../components/lexus/theme";
import { useLexusTheme } from "../../../context/LexusThemeContext";
import { useCalls } from "../../../hooks/useCalls";
// useCapabilities removed because batches list is hidden on the home screen
import { useResponsive } from "../../../hooks/useResponsive";
import { formatBatchName, groupCallsByRoom } from "../../../lib/adapters/calls";
import { connectionLabel } from "../../../lib/adapters/liveEvents";

export default function LexusHome() {
  const { colors, isDark, plan } = useLexusTheme();
  const { isDesktop } = useResponsive();
  const s = useMemo(() => createStyles(colors, isDark, isDesktop, plan), [colors, isDark, isDesktop, plan]);

  const { calls, liveConnectionState } = useCalls();

  const grouped = useMemo(() => {
    return groupCallsByRoom(calls)
      .map((room) => {
        const status =
          room.inProgress > 0
            ? "running"
            : room.completed > 0 && room.failed === 0
            ? "completed"
            : room.total === 0
            ? "draft"
            : "awaiting";

        return {
          id: room.roomId,
          label: formatBatchName(room.roomId),
          status,
          contacts: room.total,
          updatedAt: room.latestAt,
          running: room.inProgress,
          completed: room.completed,
          failed: room.failed,
          pending: Math.max(room.total - room.completed - room.failed, 0),
        };
      })
      .sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt));
  }, [calls]);

  const totalBatches = grouped.length;
  const runningBatches = grouped.filter((batch) => batch.status === "running").length;
  const completedBatches = grouped.filter((batch) => batch.status === "completed").length;
  const awaitingBatches = grouped.filter((batch) => batch.status === "awaiting" || batch.status === "draft").length;
  // batch list removed from home screen

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        <View style={s.heroWrap}>
          <View style={s.avatarRing}>
            <View style={s.avatarInner}>
              <Text style={s.avatarText}>M</Text>
            </View>
          </View>
          <StatusPill label="MAXSAS AI" tone="success" />
          <Text style={s.heroTitle}>MAXSAS AI</Text>
          <Text style={s.heroSubtitle}>Your AI lead strategist is ready.</Text>
        </View>

        <GlassCard style={s.liveCard} padded={false}>
          <Text style={s.liveText}>{connectionLabel(liveConnectionState)}</Text>
        </GlassCard>

        <SectionHeader title="Command Center" subtitle="Today's lead performance snapshot" />

        <GlassCard style={s.ctaCard} padded={false}>
          <View style={s.ctaIcon}><Text style={s.ctaIconText}>🎙️</Text></View>
          <View style={{ flex: 1 }}>
            <Text style={s.ctaTitle}>Try AI Demo Call</Text>
            <Text style={s.ctaSubtitle}>Experience how it works in seconds</Text>
          </View>
          <PillButton title="Start Demo" style={s.ctaButton} onPress={() => router.push("/(protected)/lexus/leads-upload" as any)} />
        </GlassCard>

        <SectionHeader title="Today Activity" />
        <View style={s.gridRow}>
          <StatTile styles={s} label="In Progress" icon="📞" value={runningBatches} />
          <StatTile styles={s} label="Pending" icon="⏳" value={awaitingBatches} />
        </View>
        <View style={s.gridRow}>
          <StatTile styles={s} label="Completed" icon="✅" value={completedBatches} />
          <StatTile styles={s} label="Failed" icon="❌" value={grouped.reduce((sum, item) => sum + item.failed, 0)} />
        </View>

        <SectionHeader title="Batch Overview" />

        <View style={s.gridRow}>
          <StatTile styles={s} label="Total Batches" icon="📊" value={totalBatches} compact />
          <StatTile styles={s} label="Running" icon="🏃" value={runningBatches} compact />
        </View>

        <GlassCard style={s.walletCard}>
          <View style={s.walletTop}>
            <Text style={s.walletTitle}>AI Wallet Balance</Text>
            <StatusPill label="Live" tone="success" />
          </View>
          <Text style={s.walletValue}>₹{(calls.length * 1060.27).toLocaleString("en-IN", { maximumFractionDigits: 1 })}</Text>
          <Text style={s.walletMeta}>Total: ₹{(calls.length * 1060.27).toLocaleString("en-IN", { maximumFractionDigits: 1 })}    Locked: ₹0</Text>
          <View style={s.walletActions}>
            <PillButton title="Recharge" variant="secondary" style={s.rechargeButton} onPress={() => router.push("/(protected)/lexus/wallet" as any)} />
            <TouchableOpacity onPress={() => router.push("/(protected)/lexus/wallet" as any)}>
              <Text style={s.walletLink}>View Details →</Text>
            </TouchableOpacity>
          </View>
        </GlassCard>

        {/* Batch list intentionally removed from home screen */}

        <View style={{ height: 60 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// MiniMetric removed — batch cards no longer show on home screen

function StatTile({
  styles,
  label,
  icon,
  value,
  compact = false,
}: {
  styles: ReturnType<typeof createStyles>;
  label: string;
  icon: string;
  value: number;
  compact?: boolean;
}) {
  return (
    <GlassCard style={[styles.statTile, compact && styles.statTileCompact]} padded={false}>
      <Text style={styles.statIcon}>{icon}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </GlassCard>
  );
}

function createStyles(colors: LexusThemeColors, isDark: boolean, isDesktop: boolean, plan: string) {
  const isPrestige = plan === "prestige";
  const scale = isDesktop ? 0.84 : 1;
  const px = (value: number) => Math.round(value * scale);

  return StyleSheet.create({
    safe: { flex: 1, backgroundColor: colors.bg },
    scroll: { paddingHorizontal: px(16), paddingTop: px(18), paddingBottom: px(32) },
    heroWrap: { alignItems: "center", marginBottom: px(12) },
    avatarRing: {
      width: px(126),
      height: px(126),
      borderRadius: px(63),
      backgroundColor: isPrestige ? (isDark ? "rgba(216, 180, 254, 0.15)" : "rgba(216, 180, 254, 0.5)") : (isDark ? "rgba(245,236,210,0.12)" : "rgba(245,236,210,0.7)"),
      alignItems: "center",
      justifyContent: "center",
      marginBottom: px(10),
    },
    avatarInner: {
      width: px(86),
      height: px(86),
      borderRadius: px(43),
      backgroundColor: isPrestige ? colors.purple : "#0b2457",
      alignItems: "center",
      justifyContent: "center",
    },
    avatarText: { color: "#ffffff", fontSize: px(46), fontWeight: "800" },
    heroTitle: { color: colors.text, fontSize: px(34), fontWeight: "800", letterSpacing: 0.4, marginTop: px(8) },
    heroSubtitle: { color: colors.textMuted, fontSize: px(15), marginTop: px(2), marginBottom: px(4) },
    liveCard: {
      marginBottom: px(14),
      minHeight: px(40),
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: isDark ? "rgba(0,208,132,0.1)" : "rgba(0,208,132,0.12)",
      borderColor: isDark ? "rgba(0,208,132,0.24)" : "rgba(0,168,107,0.2)",
    },
    liveText: { color: colors.green, fontSize: px(13), fontWeight: "700" },
    ctaCard: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: px(14),
      paddingHorizontal: px(12),
      marginBottom: px(16),
      borderColor: colors.border,
      backgroundColor: isDark ? (isPrestige ? "rgba(107, 91, 255, 0.15)" : "rgba(79,140,255,0.1)") : "rgba(79,140,255,0.08)",
    },
    ctaIcon: {
      width: px(34),
      height: px(34),
      borderRadius: px(17),
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: isDark ? "rgba(16,33,61,0.65)" : "rgba(79,140,255,0.18)",
      marginRight: px(10),
    },
    ctaIconText: { fontSize: px(16) },
    ctaTitle: { color: colors.text, fontSize: px(16), fontWeight: "700" },
    ctaSubtitle: { color: colors.textMuted, fontSize: px(12), marginTop: px(2) },
    ctaButton: { height: px(38), paddingHorizontal: px(16) },
    gridRow: { flexDirection: "row", gap: px(12), marginBottom: px(12) },
    statTile: {
      flex: 1,
      minHeight: px(118),
      borderRadius: px(14),
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: px(8),
    },
    statTileCompact: {
      minHeight: px(96),
    },
    statIcon: { fontSize: px(22), marginBottom: px(4) },
    statValue: { color: colors.text, fontSize: px(33), fontWeight: "800", marginBottom: px(2) },
    statLabel: { color: colors.textMuted, fontSize: px(13), fontWeight: "600" },
    walletCard: {
      marginBottom: px(16),
      backgroundColor: isPrestige ? (isDark ? "#060f22" : colors.blue) : "#0d1f53",
      borderColor: isPrestige ? (isDark ? colors.purple : "transparent") : "rgba(255,255,255,0.12)",
    },
    walletTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: px(10) },
    walletTitle: { color: "#ffffff", fontSize: px(20), fontWeight: "700" },
    walletValue: { color: "#ffffff", fontSize: px(46), fontWeight: "800", marginBottom: px(4) },
    walletMeta: { color: "rgba(255,255,255,0.72)", fontSize: px(13), marginBottom: px(14) },
    walletActions: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    rechargeButton: {
      minWidth: px(126),
      backgroundColor: "rgba(255,255,255,0.92)",
      borderColor: "rgba(255,255,255,0.92)",
    },
    walletLink: { color: "#ffffff", fontSize: px(16), fontWeight: "700" },
    mutedText: { color: colors.textMuted, fontSize: px(14) },
    errorText: { color: colors.red, fontSize: px(14) },
    batchCard: { marginBottom: px(12) },
    batchTop: { flexDirection: "row", justifyContent: "space-between", marginBottom: px(10) },
    batchName: { color: colors.text, fontSize: px(18), fontWeight: "700" },
    batchMeta: { color: colors.textMuted, fontSize: px(12), marginTop: px(2) },
    batchStatsRow: { flexDirection: "row", gap: px(8), marginBottom: px(10) },
    miniMetric: {
      flex: 1,
      alignItems: "center",
      borderRadius: px(10),
      paddingVertical: px(8),
      backgroundColor: isDark ? "rgba(10,22,40,0.85)" : "rgba(79,140,255,0.08)",
      borderWidth: 1,
      borderColor: colors.border,
    },
    miniMetricValue: { color: colors.text, fontSize: px(17), fontWeight: "700" },
    miniMetricLabel: { color: colors.textMuted, fontSize: px(11), marginTop: px(2) },
    batchActions: { flexDirection: "row", alignItems: "center" },
  });
}
