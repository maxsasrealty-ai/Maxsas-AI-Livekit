import { router } from "expo-router";
import React from "react";
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native";
import GlassCard from "../../../components/lexus/GlassCard";
import LiveStageStrip from "../../../components/lexus/live/LiveStageStrip";
import LockedModuleCard from "../../../components/lexus/locks/LockedModuleCard";
import PillButton from "../../../components/lexus/PillButton";
import SectionHeader from "../../../components/lexus/SectionHeader";
import StatusPill from "../../../components/lexus/StatusPill";
import { C } from "../../../components/lexus/theme";
import { useCalls } from "../../../hooks/useCalls";
import { useCapabilities } from "../../../hooks/useCapabilities";
import { formatTime, getQuickStats, statusTone } from "../../../lib/adapters/calls";
import { connectionLabel } from "../../../lib/adapters/liveEvents";

export default function LexusCallsStats() {
  const {
    calls,
    refreshCalls,
    isLoading,
    isBootstrapping,
    capabilities,
    error,
    liveByCallId,
    liveConnectionState,
  } = useCalls();
  const { can, planLabel, upgradeLabel, vocabulary } = useCapabilities();

  const stats = getQuickStats(calls);
  const canViewHistory = can("calls.history");
  const canViewTranscript = can("transcripts.full");
  const canRetry = can("calls.live");

  const activeCalls = calls.filter((call) => ["initiated", "dispatching", "ringing", "connected", "active"].includes(call.state));
  const failedCalls = calls.filter((call) => call.state === "failed");

  const kpiStats = [
    { label: "Total Calls", value: stats.total },
    { label: "In Progress", value: stats.inProgress },
    { label: "Completed", value: stats.completed },
  ];

  return (
    <SafeAreaView style={S.safe}>
      <ScrollView contentContainerStyle={S.scroll} showsVerticalScrollIndicator={false}>
        <SectionHeader title="Call Analytics" subtitle="Your AI campaign performance" style={{ marginTop: 18 }} />

        <GlassCard style={S.callCard} padded={true} radius={12}>
          <Text style={S.callNote}>{connectionLabel(liveConnectionState)} • Plan {planLabel}</Text>
        </GlassCard>

        {/* Top KPIs */}
        <View style={S.kpiRow}>
          {kpiStats.map((stat, i) => (
            <GlassCard key={i} style={S.kpiCard} padded={false}>
              <Text style={S.kpiValue}>{stat.value}</Text>
              <Text style={S.kpiLabel}>{stat.label}</Text>
            </GlassCard>
          ))}
        </View>

        {/* Main Chart / Summary Placeholder */}
        <GlassCard style={S.trendCard} padded={true}>
          <Text style={S.trendTitle}>Conversion Trend</Text>
          <Text style={S.trendSubtitle}>Last 30 days performance</Text>
          <View style={S.trendChartArea}>
            <Text style={S.trendPlaceholderText}>Using persisted calls data</Text>
            <View style={S.trendStatsRow}>
              <View style={S.trendStatCol}>
                <Text style={S.trendStatVal}>{calls.length ? `${Math.round((stats.completed / calls.length) * 100)}%` : "0%"}</Text>
                <Text style={S.trendStatLab}>Completion Rate</Text>
              </View>
              <View style={S.trendStatCol}>
                <Text style={S.trendStatVal}>{capabilities?.limits.monthlyCallMinutes ?? 0}</Text>
                <Text style={S.trendStatLab}>Monthly Minutes</Text>
              </View>
            </View>
          </View>
        </GlassCard>

        {/* Recent Calls Log */}
        <SectionHeader title="Recent Calls Log" actionLabel="Refresh" onAction={() => void refreshCalls()} />

        <SectionHeader title="Live Dispatch" subtitle="Queue and in-progress operations" />
        {activeCalls.length === 0 ? (
          <GlassCard style={S.callCard} padded={true} radius={12}>
            <Text style={S.callNote}>No active operations right now. New calls will stream here in realtime.</Text>
          </GlassCard>
        ) : (
          activeCalls.map((call) => (
            <GlassCard key={`active-${call.callId}`} style={S.callCard} padded={true} radius={12}>
              <View style={S.callTopRow}>
                <Text style={S.callPhone}>{call.roomId}</Text>
                <StatusPill label={call.state} tone={statusTone(call.state)} />
              </View>
              <Text style={S.callMeta}>Started {formatTime(call.initiatedAt)}</Text>
              {liveByCallId[call.callId] && <LiveStageStrip snapshot={liveByCallId[call.callId]} />}
            </GlassCard>
          ))
        )}

        {!canRetry && failedCalls.length > 0 && (
          <LockedModuleCard
            title="Retry Failed Calls"
            description="Retry actions are available on Prestige plans. Failed calls remain visible for triage."
            ctaLabel={upgradeLabel}
            onPress={() => Alert.alert("Upgrade", `Enable retries with ${upgradeLabel}.`)}
          />
        )}

        {!canViewHistory && (
          <GlassCard style={S.callCard} padded={true} radius={12}>
            <Text style={S.callNote}>Your current plan does not include call history access.</Text>
          </GlassCard>
        )}

        {(isLoading || isBootstrapping) && canViewHistory && (
          <GlassCard style={S.callCard} padded={true} radius={12}>
            <Text style={S.callNote}>Loading calls...</Text>
          </GlassCard>
        )}

        {!isLoading && !isBootstrapping && canViewHistory && error && (
          <GlassCard style={S.callCard} padded={true} radius={12}>
            <Text style={S.callNote}>Failed to load calls: {error}</Text>
          </GlassCard>
        )}

        {!isLoading && !isBootstrapping && canViewHistory && !error && calls.length === 0 && (
          <GlassCard style={S.callCard} padded={true} radius={12}>
            <Text style={S.callNote}>{`No ${vocabulary.callsLabel.toLowerCase()} found yet. Start a call from ${vocabulary.leadsLabel} Upload to populate this log.`}</Text>
          </GlassCard>
        )}

        <View style={S.list}>
          {canViewHistory && calls.map((call) => (
            <GlassCard key={call.callId} style={S.callCard} padded={false} radius={12}>
              <View style={S.callTopRow}>
                <Text style={S.callPhone}>{call.roomId}</Text>
                <StatusPill label={call.state} tone={statusTone(call.state)} />
              </View>
              <View style={S.callMidRow}>
                <Text style={S.callMeta}>🆔 {call.callId.slice(0, 8)}...</Text>
                <Text style={S.callMeta}>📅 {formatTime(call.initiatedAt)}</Text>
                <Text style={S.callMeta}>🏷 {call.tenantId}</Text>
              </View>
              <Text style={S.callNote}>State changed to {call.state}. Tap below for detail screen.</Text>
              
              {/* Footer Actions */}
              <View style={S.callActionsRow}>
                {call.state === "failed" && (
                  <PillButton 
                    title="Retry Now" 
                    variant={canRetry ? "primary" : "ghost"}
                    style={{ height: 32, paddingHorizontal: 16, marginRight: 8 }} 
                    onPress={() =>
                      canRetry
                        ? Alert.alert("Retry orchestration endpoint is not available yet.")
                        : Alert.alert("Locked", `Retry is available on ${planLabel === "Lexus" ? "Prestige" : planLabel} plans.`)
                    }
                  />
                )}
                {call.state === "completed" && (
                  <PillButton 
                    title={canViewTranscript ? "View Transcript" : "View Result"}
                    variant="ghost" 
                    style={{ height: 32, paddingHorizontal: 16 }} 
                    onPress={() => router.push(`/(protected)/lexus/completed/${call.callId}` as any)}
                  />
                )}
              </View>
            </GlassCard>
          ))}
        </View>
        <View style={{ height: 60 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const S = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  scroll: { paddingHorizontal: 16, paddingBottom: 32 },
  kpiRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16, gap: 10 },
  kpiCard: { flex: 1, alignItems: 'center', paddingVertical: 16 },
  kpiValue: { color: C.text, fontWeight: '700', fontSize: 24, marginBottom: 4 },
  kpiLabel: { color: C.textMuted, fontSize: 12, fontWeight: '600' },
  trendCard: { marginBottom: 20 },
  trendTitle: { color: C.text, fontWeight: '700', fontSize: 17, marginBottom: 2 },
  trendSubtitle: { color: C.textMuted, fontSize: 13, marginBottom: 16 },
  trendChartArea: { width: '100%', alignItems: 'center' },
  trendPlaceholderText: { color: 'rgba(79,140,255,0.4)', fontSize: 14, marginVertical: 30, fontStyle: 'italic', fontWeight: '600' },
  trendStatsRow: { flexDirection: 'row', width: '100%', borderTopWidth: 1, borderTopColor: 'rgba(79,140,255,0.1)', paddingTop: 16, marginTop: 10 },
  trendStatCol: { flex: 1, alignItems: 'center' },
  trendStatVal: { color: C.blue, fontWeight: '700', fontSize: 18, marginBottom: 2 },
  trendStatLab: { color: C.textMuted, fontSize: 12 },
  list: { marginBottom: 24 },
  callCard: { padding: 14, marginBottom: 12 },
  callTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  callPhone: { color: C.text, fontWeight: '700', fontSize: 16 },
  callMidRow: { flexDirection: 'row', marginBottom: 6, gap: 12 },
  callMeta: { color: C.textMuted, fontSize: 12 },
  callNote: { color: C.textFaint, fontSize: 13, fontStyle: 'italic', marginBottom: 10 },
  callActionsRow: { flexDirection: 'row', justifyContent: 'flex-start' },
});
