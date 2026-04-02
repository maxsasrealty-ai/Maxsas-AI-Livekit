import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import EnterpriseSurface from "../../../../components/enterprise/EnterpriseSurface";
import PillButton from "../../../../components/lexus/PillButton";
import SectionHeader from "../../../../components/lexus/SectionHeader";
import StatusPill from "../../../../components/lexus/StatusPill";
import { C } from "../../../../components/lexus/theme";
import { useCalls } from "../../../../hooks/useCalls";
import { useWorkspaceProfile } from "../../../../hooks/useWorkspaceProfile";
import { formatTime, groupCallsByRoom } from "../../../../lib/adapters/calls";

const FILTERS = ["All", "Active", "Completed", "Needs Attention"] as const;

export default function EnterpriseCampaignsList() {
  const { calls } = useCalls();
  const { vocabulary } = useWorkspaceProfile();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const campaigns = groupCallsByRoom(calls).map((group) => {
    const status = group.inProgress > 0 ? "active" : group.failed > 0 ? "needs_attention" : "completed";
    return {
      id: group.roomId,
      status,
      totalCalls: group.total,
      completed: group.completed,
      failed: group.failed,
      inProgress: group.inProgress,
      updatedAt: group.latestAt,
    };
  });

  const filtered = useMemo(() => {
    if (filter === "All") return campaigns;
    if (filter === "Active") return campaigns.filter((c) => c.status === "active");
    if (filter === "Completed") return campaigns.filter((c) => c.status === "completed");
    return campaigns.filter((c) => c.status === "needs_attention");
  }, [campaigns, filter]);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <SectionHeader
          title={vocabulary.campaignsLabel}
          subtitle={`Manage enterprise ${vocabulary.campaignsLabel.toLowerCase()} with shared AI call engine`}
        />

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
          {FILTERS.map((item) => {
            const active = item === filter;
            return (
              <TouchableOpacity key={item} style={[styles.filter, active && styles.filterActive]} onPress={() => setFilter(item)}>
                <Text style={[styles.filterText, active && styles.filterTextActive]}>{item}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {filtered.length === 0 ? (
          <EnterpriseSurface padded={true}>
            <Text style={styles.empty}>{`No ${vocabulary.campaignsLabel.toLowerCase()} in this view.`}</Text>
          </EnterpriseSurface>
        ) : (
          filtered.map((campaign) => (
            <EnterpriseSurface key={campaign.id} padded={true} style={styles.card}>
              <View style={styles.rowBetween}>
                <Text style={styles.cardTitle}>{`Campaign ${campaign.id}`}</Text>
                <StatusPill
                  label={campaign.status.replace("_", " ")}
                  tone={campaign.status === "completed" ? "success" : campaign.status === "needs_attention" ? "danger" : "info"}
                />
              </View>
              <Text style={styles.meta}>{`Updated ${formatTime(campaign.updatedAt)}`}</Text>
              <Text style={styles.meta}>{`${campaign.totalCalls} ${vocabulary.callsLabel.toLowerCase()} • ${campaign.completed} completed • ${campaign.failed} failed`}</Text>
              <View style={styles.actionRow}>
                <PillButton title="Open" variant="secondary" onPress={() => router.push(`/(protected)/enterprise/campaigns/${encodeURIComponent(campaign.id)}` as any)} />
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
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: "rgba(13,31,56,0.9)",
  },
  filterActive: { backgroundColor: C.blue, borderColor: C.blue },
  filterText: { color: C.textMuted, fontWeight: "600", fontSize: 13 },
  filterTextActive: { color: "#fff" },
  card: { marginBottom: 10 },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  cardTitle: { color: C.text, fontSize: 16, fontWeight: "700" },
  meta: { color: C.textMuted, fontSize: 12, marginTop: 4 },
  actionRow: { marginTop: 10 },
  empty: { color: C.textFaint, fontSize: 13 },
});
