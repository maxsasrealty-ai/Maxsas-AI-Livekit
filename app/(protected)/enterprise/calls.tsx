import { router } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import EnterpriseSurface from "../../../components/enterprise/EnterpriseSurface";
import LiveStageStrip from "../../../components/lexus/live/LiveStageStrip";
import SectionHeader from "../../../components/lexus/SectionHeader";
import StatusPill from "../../../components/lexus/StatusPill";
import { C } from "../../../components/lexus/theme";
import { useCalls } from "../../../hooks/useCalls";
import { useCapabilities } from "../../../hooks/useCapabilities";
import { useWorkspaceProfile } from "../../../hooks/useWorkspaceProfile";
import { formatTime } from "../../../lib/adapters/calls";
import {
    fetchCallDetail,
    fetchCallLead,
    fetchCallTranscript,
    fetchCampaignCalls,
    fetchCampaigns,
} from "../../../lib/api/calls";
import { CallDetail, CampaignRecord, LeadResponse, TranscriptSegmentItem } from "../../../shared/contracts";

const STATUS_FILTERS = ["all", "active", "completed", "failed"] as const;

export default function EnterpriseCallsLog() {
  const { calls, liveByCallId, liveConnectionState } = useCalls();
  const { can, workspaceType } = useCapabilities();
  const { vocabulary } = useWorkspaceProfile();
  const [filter, setFilter] = useState<(typeof STATUS_FILTERS)[number]>("all");
  const [selectedCallId, setSelectedCallId] = useState<string | null>(null);
  const [detailByCallId, setDetailByCallId] = useState<Record<string, CallDetail>>({});
  const [transcriptByCallId, setTranscriptByCallId] = useState<Record<string, TranscriptSegmentItem[]>>({});
  const [leadByCallId, setLeadByCallId] = useState<Record<string, LeadResponse>>({});
  const [campaignsByCallId, setCampaignsByCallId] = useState<Record<string, CampaignRecord[]>>({});
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (filter === "all") return calls;
    if (filter === "active") {
      return calls.filter((call) => ["initiated", "dispatching", "ringing", "connected", "active"].includes(call.state));
    }
    return calls.filter((call) => call.state === filter);
  }, [calls, filter]);

  const selectedCall = useMemo(() => {
    return filtered.find((call) => call.callId === selectedCallId) || filtered[0] || null;
  }, [filtered, selectedCallId]);

  useEffect(() => {
    if (!selectedCall && filtered.length > 0) {
      setSelectedCallId(filtered[0].callId);
    }
  }, [filtered, selectedCall]);

  useEffect(() => {
    if (!selectedCall) {
      return;
    }

    const callId = selectedCall.callId;
    if (detailByCallId[callId] && transcriptByCallId[callId] && leadByCallId[callId] && campaignsByCallId[callId]) {
      return;
    }

    setIsLoadingDetail(true);
    setLoadError(null);

    void Promise.all([
      fetchCallDetail(callId),
      fetchCallTranscript(callId, { page: 1, pageSize: 50 }),
      fetchCallLead(callId),
      fetchCampaigns({ page: 1, pageSize: 50 }),
    ])
      .then(async ([detailRes, transcriptRes, leadRes, campaignsRes]) => {
        if (detailRes.success) {
          setDetailByCallId((current) => ({ ...current, [callId]: detailRes.data }));
        }

        if (transcriptRes.success) {
          setTranscriptByCallId((current) => ({ ...current, [callId]: transcriptRes.data }));
        }

        if (leadRes.success) {
          setLeadByCallId((current) => ({ ...current, [callId]: leadRes.data }));
        }

        if (campaignsRes.success) {
          const linked: CampaignRecord[] = [];
          await Promise.all(
            campaignsRes.data.map(async (campaign) => {
              const linkedCalls = await fetchCampaignCalls(campaign.id);
              if (!linkedCalls.success) {
                return;
              }
              if (linkedCalls.data.some((item) => item.callId === callId)) {
                linked.push(campaign);
              }
            })
          );
          setCampaignsByCallId((current) => ({ ...current, [callId]: linked }));
        }

        if (!detailRes.success || !transcriptRes.success || !leadRes.success) {
          const firstError =
            (!detailRes.success && detailRes.error.message) ||
            (!transcriptRes.success && transcriptRes.error.message) ||
            (!leadRes.success && leadRes.error.message) ||
            "Failed to load lifecycle details";
          setLoadError(firstError);
        }
      })
      .catch((error: unknown) => {
        setLoadError(error instanceof Error ? error.message : "Failed to load lifecycle details");
      })
      .finally(() => {
        setIsLoadingDetail(false);
      });
  }, [campaignsByCallId, detailByCallId, leadByCallId, selectedCall, transcriptByCallId]);

  if (workspaceType !== "enterprise" && !can("analytics.advanced")) {
    return (
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <SectionHeader title={`${vocabulary.callsLabel} Log`} subtitle="Lexus lifecycle view" />
          {filtered.map((call) => (
            <EnterpriseSurface key={call.callId} padded={true} style={styles.card}>
              <View style={styles.rowBetween}>
                <Text style={styles.primary}>{call.roomId}</Text>
                <StatusPill
                  label={call.state}
                  tone={call.state === "failed" ? "danger" : call.state === "completed" ? "success" : "info"}
                />
              </View>
              <Text style={styles.meta}>{`Call ${call.callId.slice(0, 10)} • ${formatTime(call.initiatedAt)}`}</Text>
            </EnterpriseSurface>
          ))}
          <View style={{ height: 70 }} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  const selectedDetail = selectedCall ? detailByCallId[selectedCall.callId] : null;
  const selectedTranscript = selectedCall ? transcriptByCallId[selectedCall.callId] || [] : [];
  const selectedLead = selectedCall ? leadByCallId[selectedCall.callId] : null;
  const selectedCampaigns = selectedCall ? campaignsByCallId[selectedCall.callId] || [] : [];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <SectionHeader title={`${vocabulary.callsLabel} Log`} subtitle="Shared lifecycle stream with enterprise density" />
        <EnterpriseSurface padded={true} style={styles.card}>
          <Text style={styles.meta}>Realtime: {liveConnectionState} (SSE /api/realtime/calls/stream)</Text>
        </EnterpriseSurface>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
          {STATUS_FILTERS.map((item) => {
            const active = item === filter;
            return (
              <TouchableOpacity key={item} style={[styles.filter, active && styles.filterActive]} onPress={() => setFilter(item)}>
                <Text style={[styles.filterText, active && styles.filterTextActive]}>{item.toUpperCase()}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {filtered.length === 0 ? (
          <EnterpriseSurface padded={true}>
            <Text style={styles.empty}>{`No ${vocabulary.callsLabel.toLowerCase()} in this filter.`}</Text>
          </EnterpriseSurface>
        ) : (
          filtered.map((call) => {
            const isSelected = selectedCall?.callId === call.callId;
            return (
            <EnterpriseSurface key={call.callId} padded={true} style={[styles.card, isSelected && styles.selectedCard]}>
              <View style={styles.rowBetween}>
                <Text style={styles.primary}>{call.roomId}</Text>
                <StatusPill
                  label={call.state}
                  tone={call.state === "failed" ? "danger" : call.state === "completed" ? "success" : "info"}
                />
              </View>
              <Text style={styles.meta}>{`Call ${call.callId.slice(0, 10)} • ${formatTime(call.initiatedAt)}`}</Text>
              {liveByCallId[call.callId] && <LiveStageStrip snapshot={liveByCallId[call.callId]} />}
              <View style={styles.rowActions}>
                <TouchableOpacity onPress={() => setSelectedCallId(call.callId)}>
                  <Text style={styles.link}>Open lifecycle</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push(`/(protected)/enterprise/contacts/${encodeURIComponent(call.callId)}` as any)}>
                  <Text style={styles.link}>Open contact detail</Text>
                </TouchableOpacity>
              </View>
            </EnterpriseSurface>
            );
          })
        )}

        {selectedCall && (
          <>
            <SectionHeader title="Call Timeline" subtitle={selectedCall.callId} />
            <EnterpriseSurface padded={true} style={styles.card}>
              {isLoadingDetail && <Text style={styles.meta}>Loading timeline...</Text>}
              {loadError && <Text style={styles.error}>{loadError}</Text>}
              {!isLoadingDetail && selectedDetail && selectedDetail.eventSummary.length === 0 && (
                <Text style={styles.meta}>No events yet.</Text>
              )}
              {!isLoadingDetail && selectedDetail?.eventSummary.map((event, idx) => (
                <View key={`${event.eventType}-${idx}`} style={styles.timelineRow}>
                  <Text style={styles.timelineEvent}>{event.eventType}</Text>
                  <Text style={styles.timelineCount}>{event.count}</Text>
                </View>
              ))}
            </EnterpriseSurface>

            <SectionHeader title="Transcript Viewer" subtitle="transcript_segment" />
            <EnterpriseSurface padded={true} style={styles.card}>
              {isLoadingDetail && <Text style={styles.meta}>Loading transcript...</Text>}
              {!isLoadingDetail && selectedTranscript.length === 0 && <Text style={styles.meta}>No transcript segments.</Text>}
              {!isLoadingDetail && selectedTranscript.map((segment) => (
                <View key={segment.id} style={styles.transcriptRow}>
                  <Text style={styles.transcriptSpeaker}>{segment.speaker.toUpperCase()}</Text>
                  <Text style={styles.transcriptText}>{segment.text}</Text>
                </View>
              ))}
            </EnterpriseSurface>

            <SectionHeader title="Lead Extraction" subtitle="lead_extraction" />
            <EnterpriseSurface padded={true} style={styles.card}>
              {isLoadingDetail && <Text style={styles.meta}>Loading lead extraction...</Text>}
              {!isLoadingDetail && !selectedLead && <Text style={styles.meta}>No lead extraction yet.</Text>}
              {selectedLead && (
                <View>
                  <Text style={styles.meta}>Name: {selectedLead.fields.name || "-"}</Text>
                  <Text style={styles.meta}>Phone: {selectedLead.fields.phone || "-"}</Text>
                  <Text style={styles.meta}>Summary: {selectedLead.fields.summary || "-"}</Text>
                </View>
              )}
            </EnterpriseSurface>

            <SectionHeader title="Campaign Linkage" subtitle="campaign_call" />
            <EnterpriseSurface padded={true} style={styles.card}>
              {isLoadingDetail && <Text style={styles.meta}>Loading campaign linkage...</Text>}
              {!isLoadingDetail && selectedCampaigns.length === 0 && <Text style={styles.meta}>Not linked to any campaign.</Text>}
              {!isLoadingDetail && selectedCampaigns.map((campaign) => (
                <Text key={campaign.id} style={styles.meta}>{`${campaign.name} • ${campaign.status}`}</Text>
              ))}
            </EnterpriseSurface>
          </>
        )}

        <View style={{ height: 70 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  scroll: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 30 },
  filters: { gap: 8, marginBottom: 12 },
  filter: {
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
    backgroundColor: "rgba(13,31,56,0.9)",
  },
  filterActive: { backgroundColor: C.blue, borderColor: C.blue },
  filterText: { color: C.textMuted, fontSize: 12, fontWeight: "700" },
  filterTextActive: { color: "#fff" },
  card: { marginBottom: 10 },
  selectedCard: { borderWidth: 1, borderColor: C.blue },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  rowActions: { marginTop: 8, flexDirection: "row", gap: 12 },
  primary: { color: C.text, fontSize: 14, fontWeight: "700" },
  meta: { color: C.textMuted, fontSize: 12, marginTop: 4 },
  error: { color: "#ff8f8f", fontSize: 12 },
  link: { color: C.blue, fontSize: 12, fontWeight: "600" },
  timelineRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(79,140,255,0.12)",
    paddingVertical: 8,
  },
  timelineEvent: { color: C.text, fontSize: 12 },
  timelineCount: { color: C.textMuted, fontSize: 12 },
  transcriptRow: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(79,140,255,0.1)",
    paddingVertical: 8,
  },
  transcriptSpeaker: { color: C.blue, fontSize: 11, fontWeight: "700", marginBottom: 4 },
  transcriptText: { color: C.text, fontSize: 12 },
  empty: { color: C.textFaint, fontSize: 13 },
});
