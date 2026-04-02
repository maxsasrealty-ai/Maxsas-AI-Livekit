import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import EnterpriseSurface from "../../../components/enterprise/EnterpriseSurface";
import LiveStageStrip from "../../../components/lexus/live/LiveStageStrip";
import SectionHeader from "../../../components/lexus/SectionHeader";
import StatusPill from "../../../components/lexus/StatusPill";
import { C } from "../../../components/lexus/theme";
import { useCalls } from "../../../hooks/useCalls";
import { useWorkspaceProfile } from "../../../hooks/useWorkspaceProfile";
import { formatTime } from "../../../lib/adapters/calls";

const STATUS_FILTERS = ["all", "active", "completed", "failed"] as const;

export default function EnterpriseCallsLog() {
  const { calls, liveByCallId } = useCalls();
  const { vocabulary } = useWorkspaceProfile();
  const [filter, setFilter] = useState<(typeof STATUS_FILTERS)[number]>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return calls;
    if (filter === "active") {
      return calls.filter((call) => ["initiated", "dispatching", "ringing", "connected", "active"].includes(call.state));
    }
    return calls.filter((call) => call.state === filter);
  }, [calls, filter]);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <SectionHeader title={`${vocabulary.callsLabel} Log`} subtitle="Shared lifecycle stream with enterprise density" />

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
          filtered.map((call) => (
            <EnterpriseSurface key={call.callId} padded={true} style={styles.card}>
              <View style={styles.rowBetween}>
                <Text style={styles.primary}>{call.roomId}</Text>
                <StatusPill
                  label={call.state}
                  tone={call.state === "failed" ? "danger" : call.state === "completed" ? "success" : "info"}
                />
              </View>
              <Text style={styles.meta}>{`Call ${call.callId.slice(0, 10)} • ${formatTime(call.initiatedAt)}`}</Text>
              {liveByCallId[call.callId] && <LiveStageStrip snapshot={liveByCallId[call.callId]} />}
              <View style={{ marginTop: 8 }}>
                <TouchableOpacity onPress={() => router.push(`/(protected)/enterprise/contacts/${encodeURIComponent(call.callId)}` as any)}>
                  <Text style={styles.link}>Open contact detail</Text>
                </TouchableOpacity>
              </View>
            </EnterpriseSurface>
          ))
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
  rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  primary: { color: C.text, fontSize: 14, fontWeight: "700" },
  meta: { color: C.textMuted, fontSize: 12, marginTop: 4 },
  link: { color: C.blue, fontSize: 12, fontWeight: "600" },
  empty: { color: C.textFaint, fontSize: 13 },
});
