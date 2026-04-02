import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
import {
    Alert,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { C } from "../../../../components/lexus/theme";
import GlassCard from "../../../../components/lexus/GlassCard";
import PillButton from "../../../../components/lexus/PillButton";
import SectionHeader from "../../../../components/lexus/SectionHeader";
import StatusPill from "../../../../components/lexus/StatusPill";

const MOCK_BATCH_DETAIL: Record<string, any> = {
  d2d6357b: {
    id: "d2d6357b", status: "running", type: "MANUAL", createdAt: "2/3/2026 09:14 am",
    totalContacts: 6, completed: 3, pending: 3, failed: 0, retrying: 0, progress: 50,
    kpi: { total: 6, success: 3, action: 1 }, retry: { total: 2, avg: 0.33, scheduled: 1 },
    contacts: [
      { id: "1", phone: "9876543211", status: "completed", retryInfo: "Retry: 0/3 — Next at N/A", lastNote: "AI: site_visit_scheduled" },
      { id: "2", phone: "9876543212", status: "pending", retryInfo: "Retry: 0/3 — Next at N/A", lastNote: "AI: -" },
      { id: "6", phone: "9876543216", status: "failed", retryInfo: "Retry: 3/3 — Next at N/A", lastNote: "AI: not interested" },
    ],
  },
};

const DEFAULT_BATCH = MOCK_BATCH_DETAIL.d2d6357b;

const CONTACT_TABS = [
  { key: "pending", label: "Pending" },
  { key: "completed", label: "Completed" },
  { key: "failed", label: "Failed" },
];

export default function LexusBatchDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const batch = useMemo(() => (id && MOCK_BATCH_DETAIL[id as string]) || DEFAULT_BATCH, [id]);
  const [tab, setTab] = useState<"pending" | "completed" | "failed">("pending");
  const contacts = useMemo(() => batch.contacts.filter((c: any) => c.status === tab), [batch, tab]);

  return (
    <SafeAreaView style={S.safe}>
      <ScrollView contentContainerStyle={S.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={S.headerRow}>
          <TouchableOpacity style={S.backBtn} onPress={() => router.back()}>
            <Text style={S.backIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={S.headerTitle}>Batch Details</Text>
        </View>
        <View style={S.headerSubtitleRow}>
          <Text style={S.headerSubtitle}>{batch.status.toUpperCase()} • {batch.type}</Text>
        </View>

        {/* Batch Summary Card */}
        <GlassCard style={S.cardMain} padded={true}>
          <Text style={S.cardLabel}>Batch ID</Text>
          <Text style={S.cardValue}>{batch.id}</Text>
          <View style={S.cardRow}>
            <View style={S.cardCol}><Text style={S.cardColLabel}>Total Contacts</Text><Text style={S.cardColValue}>{batch.totalContacts}</Text></View>
            <View style={S.cardCol}><Text style={S.cardColLabel}>Created</Text><Text style={S.cardColValue}>{batch.createdAt}</Text></View>
          </View>
          <View style={[S.statusStrip, { backgroundColor: batch.status === "completed" ? C.blue : C.green }]}> 
            <Text style={S.statusStripText}>
              {batch.status === "completed" ? "✅ AI Campaign Completed" : "📞 Calling in progress"}
            </Text>
          </View>
        </GlassCard>

        <PillButton 
          title="View Billing Detail" 
          variant="ghost" 
          style={{ alignSelf: 'center', marginBottom: 14, height: 40 }}
          onPress={() => Alert.alert("Billing detail coming soon")}
        />

        {/* Progress Section */}
        <GlassCard style={S.mb14}>
          <View style={S.progressRow}>
            <Text style={S.progressLabel}>Progress</Text>
            <Text style={S.progressPercent}>{batch.progress}%</Text>
          </View>
          <View style={S.progressBarTrack}>
            <View style={[S.progressBarFill, { width: `${batch.progress}%` }]} />
          </View>
          <Text style={S.progressNote}>{batch.completed} completed • {batch.pending} pending</Text>
        </GlassCard>

        {/* KPI Cards Row */}
        <View style={S.kpiRow}>
          <GlassCard style={S.kpiCard} padded={false} radius={12}><Text style={S.kpiIcon}>👥</Text><Text style={S.kpiValue}>{batch.kpi.total}</Text><Text style={S.kpiLabel}>Total Leads</Text></GlassCard>
          <GlassCard style={S.kpiCard} padded={false} radius={12}><Text style={S.kpiIcon}>✅</Text><Text style={S.kpiValue}>{batch.kpi.success}</Text><Text style={S.kpiLabel}>Success</Text></GlassCard>
          <GlassCard style={S.kpiCard} padded={false} radius={12}><Text style={S.kpiIcon}>❗️</Text><Text style={S.kpiValue}>{batch.kpi.action}</Text><Text style={S.kpiLabel}>Action</Text></GlassCard>
        </View>

        <SectionHeader title="Contact(s)" style={{ marginTop: 10 }} />
        <View style={S.tabsRow}>
          {CONTACT_TABS.map(t => (
            <TouchableOpacity
              key={t.key}
              style={[S.tabPill, tab === t.key ? S.tabPillActive : S.tabPillInactive]}
              onPress={() => setTab(t.key as any)}
            >
              <Text style={tab === t.key ? S.tabPillTextActive : S.tabPillTextInactive}>{t.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={S.contactsList}>
          {contacts.length === 0 ? (
            <Text style={S.emptyContacts}>No contacts in this state.</Text>
          ) : (
            contacts.map((c: any, i: number) => (
              <GlassCard key={c.id} style={S.contactRow} padded={false} radius={12}>
                <View style={S.contactCircle}><Text style={S.contactCircleText}>{i + 1}.</Text></View>
                <View style={S.contactCol}>
                  <Text style={S.contactPhone}>{c.phone}</Text>
                  <Text style={S.contactRetry}>{c.retryInfo}</Text>
                  <Text style={S.contactNote}>{c.lastNote}</Text>
                </View>
                <View style={S.contactStatusCol}>
                  <StatusPill 
                    label={c.status} 
                    tone={c.status === "completed" ? "success" : c.status === "failed" ? "danger" : "info"} 
                    style={{ marginBottom: 6 }}
                  />
                  {c.status === "failed" && (
                    <PillButton 
                      title="Retry" 
                      variant="primary" 
                      style={{ height: 32, paddingHorizontal: 12 }} 
                      onPress={() => Alert.alert(`Retry contact ${c.phone}`)}
                    />
                  )}
                </View>
              </GlassCard>
            ))
          )}
        </View>
        <View style={{ height: 60 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const S = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  scroll: { paddingHorizontal: 16, paddingBottom: 32 },
  headerRow: { flexDirection: 'row', alignItems: 'center', paddingTop: Platform.OS === 'android' ? 18 : 0, paddingHorizontal: 2, marginBottom: 2, height: 56 },
  backBtn: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(13,31,56,0.85)', borderWidth: 1, borderColor: C.border, marginRight: 2 },
  backIcon: { color: C.blue, fontSize: 26, fontWeight: '600', marginTop: -2 },
  headerTitle: { flex: 1, textAlign: 'center', color: C.text, fontWeight: '700', fontSize: 18, letterSpacing: 0.5 },
  headerSubtitleRow: { alignItems: 'center', marginBottom: 10 },
  headerSubtitle: { color: C.textMuted, fontSize: 13, fontWeight: '600', letterSpacing: 1 },
  mb14: { marginBottom: 14 },
  cardMain: { alignItems: 'center', marginBottom: 14 },
  cardLabel: { color: C.textFaint, fontSize: 13, fontWeight: '600', marginBottom: 2 },
  cardValue: { color: C.text, fontWeight: '700', fontSize: 16, marginBottom: 8 },
  cardRow: { flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginBottom: 8 },
  cardCol: { flex: 1, alignItems: 'center' },
  cardColLabel: { color: C.textMuted, fontSize: 12, marginBottom: 2 },
  cardColValue: { color: C.text, fontWeight: '700', fontSize: 14 },
  statusStrip: { width: '100%', borderRadius: 12, paddingVertical: 7, alignItems: 'center', marginTop: 6, marginBottom: 2 },
  statusStripText: { color: '#fff', fontWeight: '700', fontSize: 14, letterSpacing: 0.5 },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  progressLabel: { color: C.text, fontWeight: '700', fontSize: 15 },
  progressPercent: { color: C.green, fontWeight: '700', fontSize: 15 },
  progressBarTrack: { width: '100%', height: 10, borderRadius: 999, backgroundColor: 'rgba(79,140,255,0.13)', marginBottom: 6, overflow: 'hidden' },
  progressBarFill: { height: 10, borderRadius: 999, backgroundColor: C.green },
  progressNote: { color: C.textFaint, fontSize: 12, marginTop: 2 },
  kpiRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 },
  kpiCard: { flex: 1, alignItems: 'center', marginHorizontal: 4, paddingVertical: 12 },
  kpiIcon: { fontSize: 20, marginBottom: 2 },
  kpiValue: { color: C.text, fontWeight: '700', fontSize: 16, marginBottom: 2 },
  kpiLabel: { color: C.textFaint, fontSize: 12, fontWeight: '600' },
  tabsRow: { flexDirection: 'row', marginBottom: 8, gap: 8 },
  tabPill: { paddingHorizontal: 14, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginRight: 8, borderWidth: 1 },
  tabPillActive: { backgroundColor: C.blue, borderColor: C.blue },
  tabPillInactive: { backgroundColor: 'rgba(13,31,56,0.92)', borderColor: C.border },
  tabPillTextActive: { color: '#fff', fontWeight: '700', fontSize: 14 },
  tabPillTextInactive: { color: C.textMuted, fontWeight: '600', fontSize: 14 },
  contactsList: { marginBottom: 24 },
  emptyContacts: { color: C.textFaint, fontSize: 14, textAlign: 'center', marginVertical: 18 },
  contactRow: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 12, paddingHorizontal: 14, marginBottom: 10 },
  contactCircle: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(79,140,255,0.13)', alignItems: 'center', justifyContent: 'center', marginRight: 10, marginTop: 2 },
  contactCircleText: { color: C.blue, fontWeight: '700', fontSize: 15 },
  contactCol: { flex: 1, justifyContent: 'center' },
  contactPhone: { color: C.text, fontWeight: '700', fontSize: 15, marginBottom: 2 },
  contactRetry: { color: C.textMuted, fontSize: 12, marginBottom: 1 },
  contactNote: { color: C.textFaint, fontSize: 12 },
  contactStatusCol: { alignItems: 'flex-end', justifyContent: 'center', minWidth: 90, marginLeft: 8 },
});
