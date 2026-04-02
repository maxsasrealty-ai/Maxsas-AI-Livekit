import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import GlassCard from "../../../../../components/lexus/GlassCard";
import LiveStageStrip from "../../../../../components/lexus/live/LiveStageStrip";
import LockedModuleCard from "../../../../../components/lexus/locks/LockedModuleCard";
import StatusPill from "../../../../../components/lexus/StatusPill";
import { C } from "../../../../../components/lexus/theme";
import { useCallDetail } from "../../../../../hooks/useCallDetail";
import { useCapabilities } from "../../../../../hooks/useCapabilities";
import { formatTime } from "../../../../../lib/adapters/calls";

export default function LexusCompletedLeadDetail() {
  const { leadId } = useLocalSearchParams<{ leadId: string }>();
  const callId = typeof leadId === "string" ? decodeURIComponent(leadId) : "";

  const { detail, lead, transcript, isLoading, error, live } = useCallDetail(callId);
  const { can, premiumPlanLabel, upgradeLabel } = useCapabilities();

  const canViewHistory = can("calls.history");
  const canViewTranscript = can("transcripts.full");
  const canPlayback = can("recordings.playback");

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTitle}>Lead Details</Text>
          <Text style={styles.headerSub}>Completed call insight</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {!canViewHistory && (
          <GlassCard style={styles.card} padded={true}>
            <Text style={styles.emptyTitle}>Call history is unavailable on your current plan.</Text>
          </GlassCard>
        )}

        {canViewHistory && isLoading && (
          <GlassCard style={styles.card} padded={true}>
            <Text style={styles.emptyTitle}>Loading lead insights...</Text>
          </GlassCard>
        )}

        {canViewHistory && !isLoading && error && (
          <GlassCard style={styles.card} padded={true}>
            <Text style={styles.emptyTitle}>Unable to load lead details.</Text>
            <Text style={styles.emptySubtitle}>{error}</Text>
          </GlassCard>
        )}

        {canViewHistory && !isLoading && !error && detail && (
          <>
            <GlassCard style={styles.card} padded={true}>
              <Text style={styles.profileName}>{lead?.fields.name || "Lead from call"}</Text>
              <Text style={styles.profilePhone}>{lead?.fields.phone || "-"}</Text>
              <View style={styles.pillRow}>
                <StatusPill label={detail.state} tone={detail.state === "completed" ? "success" : "info"} />
                <StatusPill label={lead ? "extracted" : "not extracted"} tone={lead ? "success" : "warning"} />
              </View>
              <Text style={styles.metaText}>Call ID: {detail.callId}</Text>
              <Text style={styles.metaText}>Started: {formatTime(detail.initiatedAt)}</Text>
              {live && <LiveStageStrip snapshot={live} />}
            </GlassCard>

            <Text style={styles.sectionHeader}>AI Summary</Text>
            <GlassCard style={styles.card} padded={true}>
              <Text style={styles.summaryText}>
                {lead?.fields.summary || "Lead extraction summary is not available for this call."}
              </Text>
            </GlassCard>

            <Text style={styles.sectionHeader}>Qualification</Text>
            <GlassCard style={styles.card} padded={true}>
              <View style={styles.qualRow}>
                <Text style={styles.qualLabel}>Name</Text>
                <Text style={styles.qualVal}>{lead?.fields.name || "-"}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.qualRow}>
                <Text style={styles.qualLabel}>Phone</Text>
                <Text style={styles.qualVal}>{lead?.fields.phone || "-"}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.qualRow}>
                <Text style={styles.qualLabel}>Confidence</Text>
                <Text style={styles.qualVal}>{lead?.confidence != null ? `${Math.round(lead.confidence * 100)}%` : "-"}</Text>
              </View>
            </GlassCard>

            <Text style={styles.sectionHeader}>Transcript Preview</Text>
            {!canViewTranscript ? (
              <LockedModuleCard
                title="Full Transcript"
                description={`Unlock full transcript with ${premiumPlanLabel}.`}
                ctaLabel={upgradeLabel}
                onPress={() => router.push("/(protected)/lexus/profile" as any)}
              />
            ) : (
              <GlassCard style={styles.card} padded={true}>
                {transcript.length === 0 && (
                  <Text style={styles.emptySubtitle}>No transcript segments were captured for this call.</Text>
                )}
                {transcript.slice(0, 4).map((item) => (
                  <View key={item.id} style={styles.transcriptBlock}>
                    <Text style={styles.transcriptSpeaker}>{item.speaker.toUpperCase()}</Text>
                    <Text style={styles.transcriptText}>{item.text}</Text>
                  </View>
                ))}
              </GlassCard>
            )}

            <Text style={styles.sectionHeader}>Call Recording</Text>
            {!canPlayback ? (
              <LockedModuleCard
                title="Call Recording"
                description={`Recording playback is available in ${premiumPlanLabel}.`}
                ctaLabel={upgradeLabel}
                onPress={() => router.push("/(protected)/lexus/profile" as any)}
              />
            ) : (
              <GlassCard style={styles.card} padded={true}>
                <Text style={styles.emptySubtitle}>
                  {live?.recordingState === "available"
                    ? "Recording is ready for playback."
                    : "Recording processing in progress. This card updates automatically."}
                </Text>
              </GlassCard>
            )}

            <Text style={styles.sectionHeader}>Analysis Status</Text>
            <GlassCard style={styles.card} padded={true}>
              <Text style={styles.emptySubtitle}>
                {live?.analysisState === "ready"
                  ? "Lead extraction finalized."
                  : "Analysis pending. Keep this screen open for live updates."}
              </Text>
            </GlassCard>
          </>
        )}

        <View style={{ height: 60 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
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
  backIcon: { fontSize: 26, color: C.text, lineHeight: 30, marginLeft: -2 },
  headerTitleWrap: { flex: 1 },
  headerTitle: { fontSize: 18, fontWeight: "700", color: C.text },
  headerSub: { fontSize: 12, color: C.textMuted },
  scroll: { paddingBottom: 32 },
  card: { marginHorizontal: 16, marginTop: 10 },
  profileName: { color: C.text, fontWeight: "700", fontSize: 18, marginBottom: 2 },
  profilePhone: { color: C.textMuted, fontSize: 14, marginBottom: 10 },
  pillRow: { flexDirection: "row", gap: 8, marginBottom: 10 },
  metaText: { color: C.textFaint, fontSize: 12, marginBottom: 3 },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "700",
    color: C.text,
    marginTop: 14,
    marginBottom: 2,
    paddingHorizontal: 20,
  },
  summaryText: { fontSize: 14, color: C.text, lineHeight: 22 },
  qualRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 8 },
  qualLabel: { fontSize: 13, color: C.textMuted },
  qualVal: { fontSize: 14, fontWeight: "600", color: C.text },
  divider: { height: 1, backgroundColor: "rgba(255,255,255,0.05)", marginVertical: 4 },
  transcriptBlock: { marginBottom: 10 },
  transcriptSpeaker: { color: C.blue, fontWeight: "700", fontSize: 11, marginBottom: 2 },
  transcriptText: { color: C.text, fontSize: 14, lineHeight: 20 },
  emptyTitle: { color: C.text, fontSize: 15, fontWeight: "700", marginBottom: 4 },
  emptySubtitle: { color: C.textMuted, fontSize: 14 },
});
