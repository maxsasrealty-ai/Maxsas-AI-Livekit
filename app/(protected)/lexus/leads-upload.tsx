import { router } from "expo-router";
import React from "react";
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
import GlassCard from "../../../components/lexus/GlassCard";
import PillButton from "../../../components/lexus/PillButton";
import { C } from "../../../components/lexus/theme";
import { useCalls } from "../../../hooks/useCalls";
import { useCapabilities } from "../../../hooks/useCapabilities";

export default function LexusUploadLeads() {
  const { can, premiumPlanLabel, vocabulary } = useCapabilities();
  const { initiateCall, error } = useCalls();

  const canStartLiveCall = can("calls.live");

  const handleSingleLead = async () => {
    if (!canStartLiveCall) {
      Alert.alert("Feature unavailable", "Live calling is not enabled on your current plan.");
      return;
    }

    const callId = await initiateCall({
      roomId: `manual-${Date.now()}`,
      phoneNumber: null,
      agentName: "lexus-agent",
      direction: "outbound",
    });

    if (!callId) {
      Alert.alert("Call initiation failed", error || "Unable to create call session.");
      return;
    }

    router.push(`/(protected)/lexus/completed/${encodeURIComponent(callId)}` as any);
  };

  return (
    <SafeAreaView style={S.safe}>
      <View style={S.headerRow}>
        <TouchableOpacity style={S.backBtn} onPress={() => router.back()}>
          <Text style={S.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={S.headerTitle}>{`Upload ${vocabulary.leadsLabel}`}</Text>
        <View style={{ width: 36 }} />
      </View>
      <ScrollView contentContainerStyle={S.scroll} showsVerticalScrollIndicator={false}>
        {/* Main Upload Card */}
        <GlassCard style={S.cardMain} padded={true}>
          <View style={S.iconCircle}><Text style={S.iconMain}>📤</Text></View>
          <Text style={S.cardTitle}>{`Upload ${vocabulary.leadsLabel} CSV from your portal`}</Text>
          <Text style={S.cardSubtitle}>
            {`Import ${vocabulary.leadsLabel.toLowerCase()} from 99acres, MagicBricks or internal CRM to start AI ${vocabulary.callsLabel.toLowerCase()}.`}
          </Text>
          <PillButton 
            title="Choose CSV File" 
            onPress={() => Alert.alert("CSV ingestion endpoint is not available yet. This stage remains UI-only.")}
            style={{ width: '100%', marginBottom: 10 }}
          />
          <Text style={S.supportedText}>
            Supported: CSV with phone, name, city, budget columns.
          </Text>
        </GlassCard>

        {/* Secondary Action Card */}
        <GlassCard style={S.cardSecondary} padded={false} radius={14}>
          <View style={S.iconCircleSmall}><Text style={S.iconSecondary}>✍️</Text></View>
          <View style={{ flex: 1 }}>
              <Text style={S.cardTitleSmall}>{`Create Single ${vocabulary.leadsLabel.slice(0, -1)}`}</Text>
            <Text style={S.cardSubtitleSmall}>
                {`Quickly add one manual ${vocabulary.leadsLabel.slice(0, -1).toLowerCase()} and test AI ${vocabulary.callsLabel.toLowerCase()}.`}
            </Text>
          </View>
          <TouchableOpacity
            style={S.chevronBtn}
            onPress={() => void handleSingleLead()}
          >
            <Text style={S.chevronIcon}>›</Text>
          </TouchableOpacity>
        </GlassCard>

        {!canStartLiveCall && (
          <GlassCard style={S.cardSecondary} padded={true} radius={14}>
            <Text style={S.cardSubtitleSmall}>{`Live ${vocabulary.callsLabel.toLowerCase()} are unavailable on your plan. Upgrade to ${premiumPlanLabel} to start calls from this screen.`}</Text>
          </GlassCard>
        )}

        {/* Info / Tips Section */}
        <Text style={S.tipsText}>
          Tip: For large campaigns, upload smaller batches (50–100 leads) for better monitoring.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const S = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  headerRow: { flexDirection: 'row', alignItems: 'center', paddingTop: Platform.OS === 'android' ? 18 : 0, paddingHorizontal: 10, marginBottom: 16, height: 56 },
  backBtn: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(13,31,56,0.85)', borderWidth: 1, borderColor: C.border, marginRight: 2 },
  backIcon: { color: C.blue, fontSize: 26, fontWeight: '600', marginTop: -2 },
  headerTitle: { flex: 1, textAlign: 'center', color: C.text, fontWeight: '700', fontSize: 18, letterSpacing: 0.5 },
  scroll: { paddingHorizontal: 18, paddingBottom: 32 },
  cardMain: { alignItems: 'center', marginBottom: 22 },
  iconCircle: { width: 54, height: 54, borderRadius: 27, backgroundColor: 'rgba(79,140,255,0.13)', alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  iconMain: { fontSize: 28, color: C.blue },
  cardTitle: { color: C.text, fontWeight: '700', fontSize: 17, marginBottom: 4, textAlign: 'center' },
  cardSubtitle: { color: C.textMuted, fontSize: 14, marginBottom: 18, textAlign: 'center' },
  supportedText: { color: C.textFaint, fontSize: 12, marginTop: 2, textAlign: 'center' },
  cardSecondary: { flexDirection: 'row', alignItems: 'center', padding: 14, marginBottom: 28 },
  iconCircleSmall: { width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(79,140,255,0.13)', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  iconSecondary: { fontSize: 20, color: C.blue },
  cardTitleSmall: { color: C.text, fontWeight: '700', fontSize: 15, marginBottom: 2 },
  cardSubtitleSmall: { color: C.textMuted, fontSize: 13 },
  chevronBtn: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginLeft: 8, backgroundColor: 'rgba(79,140,255,0.10)' },
  chevronIcon: { color: C.blue, fontSize: 22, fontWeight: '700', marginTop: -1 },
  tipsText: { color: C.textFaint, fontSize: 12, marginTop: 10, textAlign: 'center', lineHeight: 16, marginBottom: 12 },
});
