import React, { useMemo, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import GlassCard from "../../../components/lexus/GlassCard";
import SectionHeader from "../../../components/lexus/SectionHeader";
import StatusPill from "../../../components/lexus/StatusPill";
import { C } from "../../../components/lexus/theme";
import { useCalls } from "../../../hooks/useCalls";
import { useCapabilities } from "../../../hooks/useCapabilities";
import { formatTime, statusTone } from "../../../lib/adapters/calls";
import { connectionLabel } from "../../../lib/adapters/liveEvents";
import { fetchCallLead } from "../../../lib/api/calls";
import { LeadResponse } from "../../../shared/contracts";

const LEXUS_VISIBLE_STATES = ["queued", "ringing", "completed", "failed"] as const;

export default function LexusCallsLifecycle() {
  const {
    calls,
    refreshCalls,
    isLoading,
    error,
    liveConnectionState,
  } = useCalls();
  const { can } = useCapabilities();
  const [leadByCallId, setLeadByCallId] = useState<Record<string, LeadResponse>>({});
  const [leadLoadingByCallId, setLeadLoadingByCallId] = useState<Record<string, boolean>>({});

  const visibleCalls = useMemo(() => {
    return calls.filter((call) => LEXUS_VISIBLE_STATES.includes(call.state as (typeof LEXUS_VISIBLE_STATES)[number]));
  }, [calls]);

  const onLoadLead = async (callId: string) => {
    if (!can("calls.history")) {
      return;
    }

    setLeadLoadingByCallId((current) => ({ ...current, [callId]: true }));
    try {
      const response = await fetchCallLead(callId);
      if (!response.success) {
        return;
      }

      setLeadByCallId((current) => ({
        ...current,
        [callId]: response.data,
      }));
    } finally {
      setLeadLoadingByCallId((current) => ({ ...current, [callId]: false }));
    }
  };

  return (
    <SafeAreaView style={S.safe}>
      <ScrollView contentContainerStyle={S.scroll} showsVerticalScrollIndicator={false}>
        <SectionHeader title="Calls" subtitle="Lexus lifecycle view" style={{ marginTop: 18 }} />

        <GlassCard style={S.callCard} padded={true} radius={12}>
          <Text style={S.callNote}>{connectionLabel(liveConnectionState)} via /api/realtime/calls/stream</Text>
        </GlassCard>
        <SectionHeader title="Recent Calls Log" actionLabel="Refresh" onAction={() => void refreshCalls()} />

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

        {!isLoading && !error && visibleCalls.length === 0 && (
          <GlassCard style={S.callCard} padded={true} radius={12}>
            <Text style={S.callNote}>No queued/ringing/completed/failed calls found yet.</Text>
          </GlassCard>
        )}

        <View style={S.list}>
          {visibleCalls.map((call) => (
            <GlassCard key={call.callId} style={S.callCard} padded={false} radius={12}>
              <View style={S.callTopRow}>
                <Text style={S.callPhone}>{call.roomId}</Text>
                <StatusPill label={call.state} tone={statusTone(call.state)} />
              </View>
              <View style={S.callMidRow}>
                <Text style={S.callMeta}>ID {call.callId.slice(0, 8)}</Text>
                <Text style={S.callMeta}>At {formatTime(call.initiatedAt)}</Text>
              </View>
              {call.state === "completed" && (
                <View>
                  <TouchableOpacity onPress={() => void onLoadLead(call.callId)} disabled={leadLoadingByCallId[call.callId]}>
                    <Text style={S.link}>{leadLoadingByCallId[call.callId] ? "Loading lead..." : "Load lead output"}</Text>
                  </TouchableOpacity>

                  {leadByCallId[call.callId] && (
                    <View style={S.leadPanel}>
                      <Text style={S.leadTitle}>Basic Lead Output</Text>
                      <Text style={S.leadLine}>Name: {leadByCallId[call.callId].fields.name || "-"}</Text>
                      <Text style={S.leadLine}>Phone: {leadByCallId[call.callId].fields.phone || "-"}</Text>
                      <Text style={S.leadLine}>Summary: {leadByCallId[call.callId].fields.summary || "-"}</Text>
                    </View>
                  )}
                </View>
              )}
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
  list: { marginBottom: 24 },
  callCard: { padding: 14, marginBottom: 12 },
  callTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  callPhone: { color: C.text, fontWeight: '700', fontSize: 16 },
  callMidRow: { flexDirection: 'row', marginBottom: 6, gap: 12 },
  callMeta: { color: C.textMuted, fontSize: 12 },
  callNote: { color: C.textFaint, fontSize: 13, fontStyle: 'italic' },
  link: { color: C.blue, fontSize: 13, fontWeight: '600', marginTop: 8 },
  leadPanel: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: 'rgba(79,140,255,0.2)',
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'rgba(4,12,24,0.55)',
  },
  leadTitle: { color: C.text, fontSize: 13, fontWeight: '700', marginBottom: 6 },
  leadLine: { color: C.textMuted, fontSize: 12, marginBottom: 2 },
});
