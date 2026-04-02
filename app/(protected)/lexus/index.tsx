import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { C } from '../../../components/lexus/theme';
import GlassCard from '../../../components/lexus/GlassCard';
import PillButton from '../../../components/lexus/PillButton';
import SectionHeader from '../../../components/lexus/SectionHeader';
import StatusPill from '../../../components/lexus/StatusPill';

const todayStats = [
  { label: 'In Progress', icon: '📞', value: 0, color: '#FF6B9A' },
  { label: 'Pending', icon: '⏳', value: 0, color: '#FFD36B' },
  { label: 'Completed', icon: '✅', value: 0, color: '#00D084' },
];

const recentActivity = [
  { icon: '🟢', text: 'Batch #d2d6357b started • 1 contact', time: '2m ago' },
  { icon: '💰', text: 'Wallet recharged ₹500', time: '1h ago' },
  { icon: '🔥', text: 'Lead 9876543211 marked as Hot', time: '3h ago' },
];

export default function LexusHome() {
  return (
    <SafeAreaView style={S.safe}>
      <ScrollView contentContainerStyle={S.scroll} showsVerticalScrollIndicator={false}>
        {/* Header Avatar & Title */}
        <View style={S.headerWrap}>
          <View style={S.avatar}><Text style={S.avatarText}>M</Text></View>
          <Text style={S.title}>MAXSAS AI</Text>
          <Text style={S.subtitle}>Your AI lead strategist is ready.</Text>
          <GlassCard padded={true} radius={16} style={{ width: '100%', padding: 14 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={S.demoLabel}>Try AI Demo Call</Text>
              <View style={S.demoSwitchPill}>
                <View style={S.demoSwitchDot} />
              </View>
            </View>
            <Text style={S.demoSubtext}>Waiting for call system response...</Text>
          </GlassCard>
        </View>

        {/* Live Status Banner */}
        <View style={{ alignSelf: 'center', marginBottom: 22 }}>
          <StatusPill label="● Live Updates Active" tone="success" />
        </View>

        {/* Today Activity */}
        <SectionHeader title="Today Activity" />
        <View style={S.statsRow}>
          {todayStats.map((stat, i) => (
            <GlassCard key={stat.label} style={[S.statCard, { marginRight: i < 2 ? 12 : 0 }]} padded={false}> 
              <Text style={[S.statIcon, { color: stat.color }]}>{stat.icon}</Text>
              <Text style={S.statValue}>{stat.value}</Text>
              <Text style={S.statLabel}>{stat.label}</Text>
            </GlassCard>
          ))}
        </View>

        {/* Upload Leads CTA */}
        <GlassCard padded={true} radius={16} style={{ marginBottom: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <View style={S.uploadIconWrap}><Text style={S.uploadIcon}>📤</Text></View>
            <View style={{ flex: 1 }}>
              <Text style={S.uploadTitle}>Upload New Leads</Text>
              <Text style={S.uploadSubtitle}>Import CSV from portal and start AI calling.</Text>
            </View>
          </View>
          <PillButton 
            title="Upload Leads" 
            onPress={() => router.push('/(protected)/lexus/leads-upload' as any)} 
          />
        </GlassCard>

        {/* Completed Batches Shortcut */}
        <GlassCard padded={true} radius={16} style={{ marginBottom: 26 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <View style={[S.uploadIconWrap, { backgroundColor: 'rgba(0,208,132,0.13)' }]}>
              <Text style={[S.uploadIcon, { color: C.green }]}>📂</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={S.uploadTitle}>Completed Batches</Text>
              <Text style={S.uploadSubtitle}>Review finished campaigns and lead temperatures</Text>
            </View>
          </View>
          <PillButton 
            title="View Results" 
            variant="secondary"
            onPress={() => router.push('/(protected)/lexus/completed' as any)} 
          />
        </GlassCard>

        {/* Recent Activity */}
        <SectionHeader title="Recent Activity" />
        <View style={S.activityList}>
          {recentActivity.map((item, i) => (
            <GlassCard key={i} style={S.activityCard} padded={false} radius={12}>
              <Text style={S.activityIcon}>{item.icon}</Text>
              <Text style={S.activityText}>{item.text}</Text>
              <Text style={S.activityTime}>{item.time}</Text>
            </GlassCard>
          ))}
        </View>
        
        {/* Bottom padding for tab bar */}
        <View style={{ height: 60 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const S = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  scroll: { paddingTop: 36, paddingBottom: 36, paddingHorizontal: 20 },
  headerWrap: { alignItems: 'center', marginBottom: 20 },
  avatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: C.bgCard, alignItems: 'center', justifyContent: 'center', marginBottom: 10, borderWidth: 2, borderColor: C.blue, shadowColor: '#000', shadowOpacity: 0.18, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 4 },
  avatarText: { color: C.blue, fontWeight: 'bold', fontSize: 28, letterSpacing: 1 },
  title: { color: C.text, fontWeight: '700', fontSize: 20, marginBottom: 2, letterSpacing: 1 },
  subtitle: { color: C.textMuted, fontSize: 14, marginBottom: 14 },
  demoLabel: { color: C.text, fontWeight: '600', fontSize: 15 },
  demoSwitchPill: { width: 36, height: 20, borderRadius: 12, backgroundColor: 'rgba(79,140,255,0.18)', alignItems: 'flex-end', justifyContent: 'center', padding: 3 },
  demoSwitchDot: { width: 14, height: 14, borderRadius: 7, backgroundColor: C.blue },
  demoSubtext: { color: C.textFaint, fontSize: 12, marginTop: 6, fontStyle: 'italic' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 22 },
  statCard: { flex: 1, alignItems: 'center', paddingVertical: 14 },
  statIcon: { fontSize: 22, marginBottom: 2 },
  statValue: { color: C.text, fontWeight: '700', fontSize: 18, marginBottom: 2 },
  statLabel: { color: C.textMuted, fontSize: 13, fontWeight: '500' },
  uploadIconWrap: { width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(79,140,255,0.13)', alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  uploadIcon: { fontSize: 22, color: C.blue },
  uploadTitle: { color: C.text, fontWeight: '700', fontSize: 16, marginBottom: 2 },
  uploadSubtitle: { color: C.textMuted, fontSize: 13 },
  activityList: { marginTop: 8, marginBottom: 24 },
  activityCard: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 14, marginBottom: 10 },
  activityIcon: { fontSize: 18, marginRight: 10 },
  activityText: { color: C.text, fontSize: 14, flex: 1 },
  activityTime: { color: C.textFaint, fontSize: 12, marginLeft: 8 },
});
