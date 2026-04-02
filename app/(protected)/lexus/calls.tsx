import React from "react";
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native";
import { router } from "expo-router";
import { C } from "../../../components/lexus/theme";
import GlassCard from "../../../components/lexus/GlassCard";
import PillButton from "../../../components/lexus/PillButton";
import SectionHeader from "../../../components/lexus/SectionHeader";
import StatusPill from "../../../components/lexus/StatusPill";

const KPI_STATS = [
  { label: "Total Calls", value: 1420 },
  { label: "Connected", value: 890 },
  { label: "Hot Leads", value: 145 },
];

const RECENT_CALLS = [
  { id: "1", phone: "9876543211", status: "completed", duration: "1m 45s", time: "10:30 am", batch: "Batch #d2d6357b", note: "Interested in 3BHK" },
  { id: "2", phone: "9123456789", status: "failed", duration: "0s", time: "10:28 am", batch: "Batch #d2d6357b", note: "User busy" },
  { id: "3", phone: "8765432109", status: "retrying", duration: "0s", time: "10:15 am", batch: "Batch #a1b2c3d4", note: "Not reachable" },
  { id: "4", phone: "9988776655", status: "completed", duration: "4m 12s", time: "09:55 am", batch: "Batch #a1b2c3d4", note: "Not interested" },
];

export default function LexusCallsStats() {
  const getStatusTone = (status: string) => {
    switch(status) {
      case "completed": return "success";
      case "failed": return "danger";
      case "retrying": return "warning";
      default: return "neutral";
    }
  };

  return (
    <SafeAreaView style={S.safe}>
      <ScrollView contentContainerStyle={S.scroll} showsVerticalScrollIndicator={false}>
        <SectionHeader title="Call Analytics" subtitle="Your AI campaign performance" style={{ marginTop: 18 }} />

        {/* Top KPIs */}
        <View style={S.kpiRow}>
          {KPI_STATS.map((stat, i) => (
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
            <Text style={S.trendPlaceholderText}>Graph Component Here</Text>
            <View style={S.trendStatsRow}>
              <View style={S.trendStatCol}>
                <Text style={S.trendStatVal}>16.5%</Text>
                <Text style={S.trendStatLab}>Conversion Rate</Text>
              </View>
              <View style={S.trendStatCol}>
                <Text style={S.trendStatVal}>48s</Text>
                <Text style={S.trendStatLab}>Avg Duration</Text>
              </View>
            </View>
          </View>
        </GlassCard>

        {/* Recent Calls Log */}
        <SectionHeader title="Recent Calls Log" actionLabel="View All" onAction={() => Alert.alert("View all calls")} />

        <View style={S.list}>
          {RECENT_CALLS.map((call) => (
            <GlassCard key={call.id} style={S.callCard} padded={false} radius={12}>
              <View style={S.callTopRow}>
                <Text style={S.callPhone}>{call.phone}</Text>
                <StatusPill label={call.status} tone={getStatusTone(call.status)} />
              </View>
              <View style={S.callMidRow}>
                <Text style={S.callMeta}>⏱ {call.duration}</Text>
                <Text style={S.callMeta}>📅 {call.time}</Text>
                <Text style={S.callMeta}>🏷 {call.batch}</Text>
              </View>
              <Text style={S.callNote}>📝 {call.note}</Text>
              
              {/* Footer Actions */}
              <View style={S.callActionsRow}>
                {call.status === "failed" && (
                  <PillButton 
                    title="Retry Now" 
                    variant="primary" 
                    style={{ height: 32, paddingHorizontal: 16, marginRight: 8 }} 
                    onPress={() => Alert.alert("Retry initiated")} 
                  />
                )}
                {call.status === "completed" && (
                  <PillButton 
                    title="View Transcript" 
                    variant="ghost" 
                    style={{ height: 32, paddingHorizontal: 16 }} 
                    onPress={() => Alert.alert("Transcript feature coming soon")} 
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
