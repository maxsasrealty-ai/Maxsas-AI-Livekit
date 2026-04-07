import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import GlassCard from '../../../components/lexus/GlassCard';
import LiveStageStrip from '../../../components/lexus/live/LiveStageStrip';
import PillButton from '../../../components/lexus/PillButton';
import SectionHeader from '../../../components/lexus/SectionHeader';
import StatusPill from '../../../components/lexus/StatusPill';
import { C } from '../../../components/lexus/theme';
import { useCalls } from '../../../hooks/useCalls';
import { useCapabilities } from '../../../hooks/useCapabilities';
import { formatBatchName, formatTime, getQuickStats } from '../../../lib/adapters/calls';
import { connectionLabel } from '../../../lib/adapters/liveEvents';

export default function LexusHome() {
  const { calls: rawCalls, isLoading, isBootstrapping, error, liveByCallId, liveConnectionState } = useCalls();
  const calls = Array.isArray(rawCalls) ? rawCalls : [];
  const { can, planLabel, vocabulary } = useCapabilities();
  const stats = getQuickStats(calls);
  const activeCalls = calls.filter((call) => ["initiated", "dispatching", "ringing", "connected", "active"].includes(call.state));

  const todayStats = [
    { label: 'In Progress', icon: '📞', value: stats.inProgress, color: '#FF6B9A' },
    { label: 'Failed', icon: '⛔', value: stats.failed, color: '#FFD36B' },
    { label: 'Completed', icon: '✅', value: stats.completed, color: '#00D084' },
  ];

  const recentActivity = calls.slice(0, 3).map((call) => ({
    icon: call.state === 'completed' ? '✅' : call.state === 'failed' ? '🔴' : '🟢',
    text: `Call ${call.callId.slice(0, 8)}... in room ${call.roomId} is ${call.state}`,
    time: formatTime(call.initiatedAt),
  }));

  return (
    <SafeAreaView style={S.safe}>
      <ScrollView contentContainerStyle={S.scroll} showsVerticalScrollIndicator={false}>
        {/* Header Avatar & Title */}
        <View style={S.headerWrap}>
          <View style={S.avatar}><Text style={S.avatarText}>M</Text></View>
          <Text style={S.title}>MAXSAS AI</Text>
          <Text style={S.subtitle}>Your AI lead strategist is ready.</Text>
          <GlassCard padded={true} radius={16} style={{ width: '100%', padding: 14 }}>
            <Text style={S.demoLabel}>System Overview</Text>
              <Text style={S.demoSubtext}>
                {isBootstrapping || isLoading
                  ? 'Loading call system data...'
                  : error
                  ? `Backend error: ${error}`
                  : `Plan ${planLabel} • ${stats.total} persisted calls`}
              </Text>
          </GlassCard>
        </View>

        {/* Live Status Banner */}
        <View style={{ alignSelf: 'center', marginBottom: 22 }}>
            <StatusPill label={can('calls.history') ? '● Live Updates Active' : '● Limited Plan Access'} tone={can('calls.history') ? 'success' : 'warning'} />
        </View>

        <GlassCard padded={true} radius={14} style={{ marginBottom: 16 }}>
          <Text style={S.demoLabel}>{connectionLabel(liveConnectionState)}</Text>
          <Text style={S.demoSubtext}>{activeCalls.length} active call operations</Text>
        </GlassCard>

        <SectionHeader title="Active Operations" />
        {activeCalls.length === 0 ? (
          <GlassCard padded={true} radius={14} style={{ marginBottom: 16 }}>
            <Text style={S.activityText}>No calls are actively processing right now.</Text>
          </GlassCard>
        ) : (
          activeCalls.slice(0, 2).map((call) => (
            <TouchableOpacity
              key={call.callId}
              activeOpacity={0.85}
              onPress={() => router.push(`/(protected)/lexus/batches/${encodeURIComponent(call.roomId)}` as any)}
            >
              <GlassCard padded={true} radius={14} style={{ marginBottom: 12 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                  <Text style={S.uploadTitle}>{formatBatchName(call.roomId)}</Text>
                  <StatusPill label={call.state} tone="info" />
                </View>
                {liveByCallId[call.callId] && <LiveStageStrip snapshot={liveByCallId[call.callId]} />}
              </GlassCard>
            </TouchableOpacity>
          ))
        )}

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

        {/* Upload CTA */}
        <GlassCard padded={true} radius={16} style={{ marginBottom: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <View style={S.uploadIconWrap}><Text style={S.uploadIcon}>📤</Text></View>
            <View style={{ flex: 1 }}>
              <Text style={S.uploadTitle}>{`Upload New ${vocabulary.leadsLabel}`}</Text>
              <Text style={S.uploadSubtitle}>{`Import CSV from portal and start AI ${vocabulary.callsLabel.toLowerCase()}.`}</Text>
            </View>
          </View>
          <PillButton 
            title={`Upload ${vocabulary.leadsLabel}`}
            onPress={() => router.push('/(protected)/lexus/leads-upload' as any)} 
          />
        </GlassCard>

        {/* Completed Campaign Shortcut */}
        <GlassCard padded={true} radius={16} style={{ marginBottom: 26 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <View style={[S.uploadIconWrap, { backgroundColor: 'rgba(0,208,132,0.13)' }]}>
              <Text style={[S.uploadIcon, { color: C.green }]}>📂</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={S.uploadTitle}>{`Completed ${vocabulary.batchesLabel}`}</Text>
              <Text style={S.uploadSubtitle}>{`Review finished ${vocabulary.campaignsLabel.toLowerCase()} and lead temperatures`}</Text>
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
          {(recentActivity.length ? recentActivity : [{ icon: 'ℹ️', text: 'No recent call activity yet.', time: '-' }]).map((item, i) => (
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
