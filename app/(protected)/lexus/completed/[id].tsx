import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
import {
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import GlassCard from "../../../../components/lexus/GlassCard";
import LiveStageStrip from "../../../../components/lexus/live/LiveStageStrip";
import LockedModuleCard from "../../../../components/lexus/locks/LockedModuleCard";
import PillButton from "../../../../components/lexus/PillButton";
import StatusPill from "../../../../components/lexus/StatusPill";
import { C } from "../../../../components/lexus/theme";
import { useCallDetail } from "../../../../hooks/useCallDetail";
import { useCapabilities } from "../../../../hooks/useCapabilities";
import { formatDuration, formatTime, statusTone } from "../../../../lib/adapters/calls";

const FILTERS = ["All", "User", "Agent"] as const;

export default function LexusCompletedBatchDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const callId = typeof id === "string" ? decodeURIComponent(id) : "";
  const [activeFilter, setActiveFilter] = useState<(typeof FILTERS)[number]>("All");

  const { isLoading, error, detail, lead, transcript, live } = useCallDetail(callId);
  const { can, upgradeLabel, premiumPlanLabel } = useCapabilities();

  const canViewHistory = can("calls.history");
  const canViewTranscript = can("transcripts.full");
  const canRetry = can("calls.live");
  const canPlayback = can("recordings.playback");

  const filteredTranscript = useMemo(() => {
    if (activeFilter === "All") {
      return transcript;
    }

    const speaker = activeFilter.toLowerCase() === "user" ? "user" : "agent";
    return transcript.filter((item) => item.speaker === speaker);
  }, [activeFilter, transcript]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Call Results</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {!canViewHistory && (
          <GlassCard style={styles.card} padded={true}>
            <Text style={styles.emptyTitle}>Call history is unavailable on your plan.</Text>
          </GlassCard>
        )}

        {canViewHistory && isLoading && (
          <GlassCard style={styles.card} padded={true}>
            <Text style={styles.emptyTitle}>Loading call details...</Text>
          </GlassCard>
        )}

        {canViewHistory && !isLoading && error && (
          <GlassCard style={styles.card} padded={true}>
            <Text style={styles.emptyTitle}>Failed to load call details.</Text>
            <Text style={styles.emptySubtitle}>{error}</Text>
          </GlassCard>
        )}

        {canViewHistory && !isLoading && !error && !detail && (
          <GlassCard style={styles.card} padded={true}>
            <Text style={styles.emptyTitle}>Call not found.</Text>
          </GlassCard>
        )}

        {canViewHistory && !isLoading && !error && detail && (
          <>
            <GlassCard style={styles.cardMain} padded={true}>
              <View style={styles.cardTop}>
                <View>
                  <Text style={styles.cardLabel}>Call ID</Text>
                  <Text style={styles.cardValue}>{detail.callId}</Text>
                </View>
                <StatusPill label={detail.state} tone={statusTone(detail.state)} />
              </View>

              <Text style={styles.metaText}>Room: {detail.roomId}</Text>
              <Text style={styles.metaText}>Started: {formatTime(detail.initiatedAt)}</Text>
              <Text style={styles.metaText}>Duration: {formatDuration(detail.durationSec)}</Text>
              <Text style={styles.metaText}>Turns: {detail.transcriptTurns || 0}</Text>

              <View style={styles.summaryStrip}>
                <Text style={styles.summaryText}>
                  Events captured: {detail.eventSummary.reduce((sum, item) => sum + item.count, 0)}
                </Text>
              </View>

              {live && <LiveStageStrip snapshot={live} />}

              {detail.state === "failed" && (
                <View style={{ marginTop: 12 }}>
                  <PillButton
                    title="Retry Call"
                    variant={canRetry ? "primary" : "ghost"}
                    onPress={() =>
                      canRetry
                        ? router.push("/(protected)/lexus/leads-upload" as any)
                        : router.push("/(protected)/lexus/profile" as any)
                    }
                  />
                </View>
              )}
            </GlassCard>

            <Text style={styles.sectionTitle}>Lead Insight</Text>
            <GlassCard style={styles.card} padded={true}>
              {lead ? (
                <>
                  <Text style={styles.leadName}>{lead.fields.name || "Unnamed lead"}</Text>
                  <Text style={styles.metaText}>Phone: {lead.fields.phone || "-"}</Text>
                  <Text style={styles.metaText}>Extracted: {formatTime(lead.extractedAt)}</Text>
                  <Text style={styles.leadSummary}>{lead.fields.summary}</Text>
                  <TouchableOpacity
                    style={styles.linkButton}
                    onPress={() =>
                      router.push(`/(protected)/lexus/completed/leads/${encodeURIComponent(detail.callId)}` as any)
                    }
                  >
                    <Text style={styles.linkText}>Open detailed lead view</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <Text style={styles.emptySubtitle}>No lead extraction was generated for this call.</Text>
              )}
            </GlassCard>

            <Text style={styles.sectionTitle}>Transcript</Text>
            {!canViewTranscript && (
              <LockedModuleCard
                title="Full Transcript"
                description={`Full transcript is locked on your current plan. Upgrade to ${premiumPlanLabel} to unlock complete transcript history.`}
                ctaLabel={upgradeLabel}
                onPress={() => router.push("/(protected)/lexus/profile" as any)}
              />
            )}

            {canViewTranscript && (
              <>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.filterRow}
                >
                  {FILTERS.map((filter) => {
                    const isActive = filter === activeFilter;
                    return (
                      <TouchableOpacity
                        key={filter}
                        style={[styles.filterPill, isActive ? styles.filterPillActive : styles.filterPillInactive]}
                        onPress={() => setActiveFilter(filter)}
                      >
                        <Text style={isActive ? styles.filterTextActive : styles.filterTextInactive}>{filter}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>

                <View style={styles.transcriptList}>
                  {filteredTranscript.length === 0 ? (
                    <GlassCard style={styles.card} padded={true}>
                      <Text style={styles.emptySubtitle}>No transcript segments for this filter.</Text>
                    </GlassCard>
                  ) : (
                    filteredTranscript.map((segment) => (
                      <GlassCard key={segment.id} style={styles.transcriptCard} padded={true} radius={12}>
                        <View style={styles.segmentTop}>
                          <StatusPill
                            label={segment.speaker.toUpperCase()}
                            tone={segment.speaker === "agent" ? "info" : "success"}
                          />
                          <Text style={styles.segmentMeta}>#{segment.sequenceNo}</Text>
                        </View>
                        <Text style={styles.segmentText}>{segment.text}</Text>
                        <Text style={styles.segmentMeta}>{formatTime(segment.occurredAt)}</Text>
                      </GlassCard>
                    ))
                  )}
                </View>
              </>
            )}

            <Text style={styles.sectionTitle}>Recording</Text>
            {!canPlayback && (
              <LockedModuleCard
                title="Call Recording"
                description={`Recording playback is available on ${premiumPlanLabel}.`}
                ctaLabel={upgradeLabel}
                onPress={() => router.push("/(protected)/lexus/profile" as any)}
              />
            )}

            {canPlayback && (
              <GlassCard style={styles.card} padded={true}>
                <Text style={styles.emptySubtitle}>
                  {live?.recordingState === "available"
                    ? "Recording is now available and synced."
                    : "Recording is still processing. This card updates automatically when ready."}
                </Text>
              </GlassCard>
            )}

            <Text style={styles.sectionTitle}>Analysis</Text>
            <GlassCard style={styles.card} padded={true}>
              <Text style={styles.emptySubtitle}>
                {live?.analysisState === "ready"
                  ? "Lead extraction and analysis are ready."
                  : "Analysis is pending. This module refreshes as delayed assets arrive."}
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
  scroll: { paddingHorizontal: 16, paddingBottom: 32 },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? 18 : 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    height: 56,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(13,31,56,0.85)",
    borderWidth: 1,
    borderColor: C.border,
    marginRight: 2,
  },
  backIcon: { color: C.blue, fontSize: 26, fontWeight: "600", marginTop: -2 },
  headerTitle: { flex: 1, textAlign: "center", color: C.text, fontWeight: "700", fontSize: 18 },
  cardMain: { marginBottom: 14 },
  card: { marginBottom: 14 },
  cardTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 8 },
  cardLabel: { color: C.textFaint, fontSize: 12 },
  cardValue: { color: C.text, fontSize: 14, fontWeight: "700" },
  metaText: { color: C.textMuted, fontSize: 13, marginBottom: 4 },
  summaryStrip: {
    marginTop: 8,
    backgroundColor: "rgba(79,140,255,0.10)",
    borderWidth: 1,
    borderColor: "rgba(79,140,255,0.18)",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  summaryText: { color: C.text, fontSize: 13 },
  sectionTitle: { color: C.text, fontSize: 16, fontWeight: "700", marginBottom: 8, marginTop: 6 },
  leadName: { color: C.text, fontWeight: "700", fontSize: 16, marginBottom: 6 },
  leadSummary: { color: C.text, fontSize: 14, marginTop: 8, lineHeight: 21 },
  linkButton: { marginTop: 12 },
  linkText: { color: C.blue, fontSize: 14, fontWeight: "700" },
  filterRow: { gap: 8, paddingVertical: 8, marginBottom: 8 },
  filterPill: {
    paddingHorizontal: 14,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    marginRight: 8,
  },
  filterPillActive: { backgroundColor: C.blue, borderColor: C.blue },
  filterPillInactive: { backgroundColor: "rgba(13,31,56,0.92)", borderColor: C.border },
  filterTextActive: { color: "#fff", fontWeight: "700", fontSize: 13 },
  filterTextInactive: { color: C.textMuted, fontWeight: "600", fontSize: 13 },
  transcriptList: { marginBottom: 12 },
  transcriptCard: { marginBottom: 10 },
  segmentTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 8 },
  segmentMeta: { color: C.textFaint, fontSize: 12 },
  segmentText: { color: C.text, fontSize: 14, lineHeight: 20, marginBottom: 8 },
  emptyTitle: { color: C.text, fontSize: 15, fontWeight: "700", marginBottom: 4 },
  emptySubtitle: { color: C.textMuted, fontSize: 14 },
});
