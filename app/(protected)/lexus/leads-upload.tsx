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
import { C } from "../../../components/lexus/theme";
import GlassCard from "../../../components/lexus/GlassCard";
import PillButton from "../../../components/lexus/PillButton";
import SectionHeader from "../../../components/lexus/SectionHeader";

export default function LexusUploadLeads() {
  return (
    <SafeAreaView style={S.safe}>
      <View style={S.headerRow}>
        <TouchableOpacity style={S.backBtn} onPress={() => router.back()}>
          <Text style={S.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={S.headerTitle}>Upload Leads</Text>
        <View style={{ width: 36 }} />
      </View>
      <ScrollView contentContainerStyle={S.scroll} showsVerticalScrollIndicator={false}>
        {/* Main Upload Card */}
        <GlassCard style={S.cardMain} padded={true}>
          <View style={S.iconCircle}><Text style={S.iconMain}>📤</Text></View>
          <Text style={S.cardTitle}>Upload CSV from your portal</Text>
          <Text style={S.cardSubtitle}>
            Import leads from 99acres, MagicBricks or internal CRM to start AI calling.
          </Text>
          <PillButton 
            title="Choose CSV File" 
            onPress={() => Alert.alert("File picker integration pending")}
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
            <Text style={S.cardTitleSmall}>Create Single Lead</Text>
            <Text style={S.cardSubtitleSmall}>
              Quickly add one manual lead and test AI calling.
            </Text>
          </View>
          <TouchableOpacity
            style={S.chevronBtn}
            onPress={() => Alert.alert("Manual lead creation coming soon")}
          >
            <Text style={S.chevronIcon}>›</Text>
          </TouchableOpacity>
        </GlassCard>

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
