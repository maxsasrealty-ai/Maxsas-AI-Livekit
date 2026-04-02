import { router } from "expo-router";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

import EnterpriseStatCard from "../../../components/enterprise/EnterpriseStatCard";
import EnterpriseSurface from "../../../components/enterprise/EnterpriseSurface";
import EnterpriseWorkspaceBanner from "../../../components/enterprise/EnterpriseWorkspaceBanner";
import PillButton from "../../../components/lexus/PillButton";
import SectionHeader from "../../../components/lexus/SectionHeader";
import StatusPill from "../../../components/lexus/StatusPill";
import { C } from "../../../components/lexus/theme";
import { useCalls } from "../../../hooks/useCalls";
import { useWorkspaceProfile } from "../../../hooks/useWorkspaceProfile";
import { formatTime, getQuickStats, groupCallsByRoom } from "../../../lib/adapters/calls";

export default function EnterpriseDashboard() {
  const { calls, liveConnectionState } = useCalls();
  const { vocabulary } = useWorkspaceProfile();

  const stats = getQuickStats(calls);
  const campaigns = groupCallsByRoom(calls);
  const topCampaign = campaigns[0];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <EnterpriseWorkspaceBanner />

        <SectionHeader
          title="Brokerage Overview"
          subtitle={`Operational view across ${vocabulary.campaignsLabel.toLowerCase()} and ${vocabulary.callsLabel.toLowerCase()}`}
        />

        <View style={styles.grid}>
          <EnterpriseStatCard label={`Active ${vocabulary.callsLabel}`} value={stats.inProgress} hint="Realtime in progress" />
          <EnterpriseStatCard label={`Total ${vocabulary.callsLabel}`} value={stats.total} hint="Persisted calls" />
          <EnterpriseStatCard label={`Live ${vocabulary.campaignsLabel}`} value={campaigns.length} hint="Grouped by room" />
        </View>

        <EnterpriseSurface style={{ marginTop: 12 }} padded={true}>
          <View style={styles.rowBetween}>
            <Text style={styles.blockTitle}>Call Activity Feed</Text>
            <StatusPill label={liveConnectionState} tone="info" />
          </View>
          {calls.slice(0, 4).map((call) => (
            <View key={call.callId} style={styles.feedRow}>
              <Text style={styles.feedPrimary}>{call.roomId}</Text>
              <Text style={styles.feedMeta}>{formatTime(call.initiatedAt)}</Text>
              <Text style={styles.feedState}>{call.state}</Text>
            </View>
          ))}
          {calls.length === 0 && <Text style={styles.empty}>No call activity yet.</Text>}
        </EnterpriseSurface>

        <EnterpriseSurface style={{ marginTop: 12 }} padded={true}>
          <Text style={styles.blockTitle}>Team Performance Preview</Text>
          <Text style={styles.muted}>Lead agent scorecards will connect here when team assignment data is enabled.</Text>
          <View style={styles.teamList}>
            <View style={styles.teamRow}><Text style={styles.teamName}>North Brokerage Desk</Text><Text style={styles.teamMetric}>32 qualified</Text></View>
            <View style={styles.teamRow}><Text style={styles.teamName}>Central Broker Desk</Text><Text style={styles.teamMetric}>18 qualified</Text></View>
            <View style={styles.teamRow}><Text style={styles.teamName}>Prime Rentals Desk</Text><Text style={styles.teamMetric}>11 qualified</Text></View>
          </View>
        </EnterpriseSurface>

        <EnterpriseSurface style={{ marginTop: 12 }} padded={true}>
          <Text style={styles.blockTitle}>Top Campaign Snapshot</Text>
          {topCampaign ? (
            <>
              <Text style={styles.muted}>{`Campaign ${topCampaign.roomId} • ${topCampaign.total} ${vocabulary.callsLabel.toLowerCase()}`}</Text>
              <Text style={styles.muted}>{`Completed: ${topCampaign.completed} • Failed: ${topCampaign.failed}`}</Text>
              <View style={styles.actionRow}>
                <PillButton title="Open Campaign" onPress={() => router.push(`/(protected)/enterprise/campaigns/${encodeURIComponent(topCampaign.roomId)}` as any)} />
              </View>
            </>
          ) : (
            <Text style={styles.empty}>No campaigns have started yet.</Text>
          )}
        </EnterpriseSurface>

        <View style={{ height: 70 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  scroll: { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 30 },
  grid: { flexDirection: "row", gap: 10 },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  blockTitle: { color: C.text, fontSize: 16, fontWeight: "700", marginBottom: 8 },
  muted: { color: C.textMuted, fontSize: 13, marginBottom: 4 },
  feedRow: {
    paddingVertical: 9,
    borderTopWidth: 1,
    borderTopColor: "rgba(79,140,255,0.1)",
  },
  feedPrimary: { color: C.text, fontWeight: "600" },
  feedMeta: { color: C.textFaint, fontSize: 12, marginTop: 2 },
  feedState: { color: C.blue, fontSize: 12, marginTop: 2, textTransform: "capitalize" },
  empty: { color: C.textFaint, fontSize: 13, marginTop: 2 },
  teamList: { marginTop: 8, gap: 8 },
  teamRow: { flexDirection: "row", justifyContent: "space-between" },
  teamName: { color: C.text, fontSize: 13, fontWeight: "600" },
  teamMetric: { color: C.green, fontSize: 13, fontWeight: "700" },
  actionRow: { marginTop: 10 },
});
