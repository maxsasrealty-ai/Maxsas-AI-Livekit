import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import GlassCard from "../../../components/lexus/GlassCard";
import SectionHeader from "../../../components/lexus/SectionHeader";
import StatusPill from "../../../components/lexus/StatusPill";
import { C } from "../../../components/lexus/theme";
import { useCalls } from "../../../hooks/useCalls";
import { useCapabilities } from "../../../hooks/useCapabilities";
import { useResponsive } from "../../../hooks/useResponsive";
import { formatTime, statusTone } from "../../../lib/adapters/calls";
import { connectionLabel } from "../../../lib/adapters/liveEvents";

const LEXUS_VISIBLE_STATES = ["queued", "ringing", "completed", "failed"] as const;

export default function LexusCallsLifecycle() {
  const { isDesktop } = useResponsive();
  const S = useMemo(() => createStyles(isDesktop), [isDesktop]);
  const bottomSpacer = isDesktop ? 112 : 72;

  const {
    calls,
    refreshCalls,
    isLoading,
    error,
    liveConnectionState,
  } = useCalls();
  const { can } = useCapabilities();
  const [leadBucketFilter, setLeadBucketFilter] = useState<"All" | "Qualified" | "Neutral" | "Retry" | "Failed" | "Unknown">("All");

  const visibleCalls = useMemo(() => {
    return calls.filter((call) => LEXUS_VISIBLE_STATES.includes(call.state as (typeof LEXUS_VISIBLE_STATES)[number]));
  }, [calls]);

  const filteredCalls = useMemo(() => {
    const bucketRank: Record<string, number> = {
      Qualified: 1,
      Neutral: 2,
      Retry: 3,
      Failed: 4,
      Unknown: 5,
      "—": 6,
    };

    const matchesFilter = (bucket: string | null | undefined) => {
      if (leadBucketFilter === "All") {
        return true;
      }

      return bucket === leadBucketFilter;
    };

    return [...visibleCalls]
      .filter((call) => matchesFilter(call.lead_bucket))
      .sort((a, b) => {
        const aRank = bucketRank[a.lead_bucket || "—"] ?? 99;
        const bRank = bucketRank[b.lead_bucket || "—"] ?? 99;
        if (aRank !== bRank) {
          return aRank - bRank;
        }

        return new Date(b.initiatedAt).getTime() - new Date(a.initiatedAt).getTime();
      });
  }, [leadBucketFilter, visibleCalls]);



  return (
    <SafeAreaView style={S.safe}>
      <ScrollView contentContainerStyle={S.scroll} showsVerticalScrollIndicator={false}>
        <SectionHeader title="Calls" subtitle="Lexus lifecycle view" style={{ marginTop: 18 }} />

        <GlassCard style={S.callCard} padded={true} radius={12}>
          <Text style={S.callNote}>{connectionLabel(liveConnectionState)} via /api/realtime/calls/stream</Text>
        </GlassCard>
        <SectionHeader title="Recent Calls Log" actionLabel="Refresh" onAction={() => void refreshCalls()} />

        <View style={S.filterRow}>
          {(["All", "Qualified", "Neutral", "Retry", "Failed", "Unknown"] as const).map((bucket) => (
            <TouchableOpacity
              key={bucket}
              onPress={() => setLeadBucketFilter(bucket)}
              style={[S.filterChip, leadBucketFilter === bucket ? S.filterChipActive : null]}
            >
              <Text style={leadBucketFilter === bucket ? S.filterChipTextActive : S.filterChipText}>{bucket}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {isLoading && (
          <GlassCard style={S.callCard} padded={true} radius={12}>
            <Text style={S.callNote}>Loading calls...</Text>
          </GlassCard>
        )}

        {!isLoading && error && (
          <GlassCard style={S.callCard} padded={true} radius={12}>
            <Text style={S.callNote}>Failed to load calls: {error}</Text>
          </GlassCard>
        )}

        {!isLoading && !error && filteredCalls.length === 0 && (
          <GlassCard style={S.callCard} padded={true} radius={12}>
            <Text style={S.callNote}>No queued/ringing/completed/failed calls found for this bucket.</Text>
          </GlassCard>
        )}

        <View style={S.list}>
          {filteredCalls.map((call) => (
            <GlassCard key={call.callId} style={S.callCard} padded={false} radius={12}>
              <View style={S.callTopRow}>
                <Text style={S.callPhone}>{call.roomId}</Text>
                <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
                  <StatusPill label={call.state} tone={statusTone(call.state)} />
                  {/* lead_bucket chip */}
                  {call.lead_bucket ? (
                    <StatusPill
                      label={call.lead_bucket}
                      tone={
                        call.lead_bucket === "Qualified"
                          ? "success"
                          : call.lead_bucket === "Retry"
                          ? "warning"
                          : call.lead_bucket === "Failed"
                          ? "danger"
                          : "neutral"
                      }
                      style={{ paddingHorizontal: 8 }}
                    />
                  ) : (
                    <StatusPill label="—" tone="neutral" style={{ paddingHorizontal: 8 }} />
                  )}
                </View>
              </View>
              <View style={S.callMidRow}>
                <Text style={S.callMeta}>ID {call.callId.slice(0, 8)}</Text>
                <Text style={S.callMeta}>At {formatTime(call.initiatedAt)}</Text>
              </View>
              {call.state === "completed" && (
                <View style={{ marginTop: 12 }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "rgba(79, 140, 255, 0.15)",
                      paddingVertical: 10,
                      borderRadius: 8,
                      alignItems: "center",
                      borderWidth: 1,
                      borderColor: "rgba(79, 140, 255, 0.3)",
                    }}
                    onPress={() => router.push(`/(protected)/lexus/call/${encodeURIComponent(call.callId)}` as any)}
                  >
                    <Text style={{ color: C.blue, fontWeight: "600", fontSize: 13 }}>View Lead Details & Transcript</Text>
                  </TouchableOpacity>
                </View>
              )}
            </GlassCard>
          ))}
        </View>

        <View style={{ height: bottomSpacer }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function createStyles(isDesktop: boolean) {
  const scale = isDesktop ? 0.82 : 1;
  const px = (value: number) => Math.round(value * scale);

  return StyleSheet.create({
    safe: { flex: 1, backgroundColor: C.bg },
    scroll: { paddingHorizontal: px(16), paddingBottom: px(32) },
    list: { marginBottom: px(24) },
    callCard: { padding: px(14), marginBottom: px(12) },
    filterRow: { flexDirection: "row", flexWrap: "wrap", gap: px(8), marginBottom: px(12) },
    filterChip: {
      borderWidth: 1,
      borderColor: "rgba(79,140,255,0.15)",
      borderRadius: px(999),
      paddingHorizontal: px(12),
      paddingVertical: px(7),
      backgroundColor: "rgba(4,12,24,0.35)",
    },
    filterChipActive: {
      borderColor: "rgba(79,140,255,0.42)",
      backgroundColor: "rgba(79,140,255,0.12)",
    },
    filterChipText: { color: C.textMuted, fontSize: px(12), fontWeight: "700" },
    filterChipTextActive: { color: C.blue, fontSize: px(12), fontWeight: "700" },
    callTopRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: px(8) },
    callPhone: { color: C.text, fontWeight: "700", fontSize: px(16) },
    callMidRow: { flexDirection: "row", marginBottom: px(6), gap: px(12) },
    callMeta: { color: C.textMuted, fontSize: px(12) },
    callNote: { color: C.textFaint, fontSize: px(13), fontStyle: "italic" },
    link: { color: C.blue, fontSize: px(13), fontWeight: "600", marginTop: px(8) },
    leadPanel: {
      marginTop: px(8),
      borderWidth: 1,
      borderColor: "rgba(79,140,255,0.2)",
      borderRadius: px(10),
      padding: px(10),
      backgroundColor: "rgba(4,12,24,0.55)",
    },
    leadTitle: { color: C.text, fontSize: px(13), fontWeight: "700", marginBottom: px(6) },
    leadLine: { color: C.textMuted, fontSize: px(12), marginBottom: px(2) },
  });
}
