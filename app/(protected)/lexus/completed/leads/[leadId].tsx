import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";

// ── PALETTE ───────────────────────────────────────────────────────────────
const C = {
  bg: "#040c18",
  bgCard: "#0d1f38",
  bgSoft: "#0a1628",
  blue: "#4F8CFF",
  green: "#00D084",
  amber: "#F5A623",
  red: "#FF6B6B",
  purple: "#A78BFA",
  cyan: "#5AC8FA",
  text: "#e8edf5",
  textMuted: "rgba(232,237,245,0.65)",
  textFaint: "rgba(232,237,245,0.40)",
  border: "rgba(79,140,255,0.20)",
};

// ── MOCK DATA ─────────────────────────────────────────────────────────────
const MOCK_LEAD = {
  id: "L-1101",
  name: "Rahul Sharma",
  phone: "+91 9876543211",
  temperature: "hot",
  status: "qualified",
  outcome: "Site Visit Booked",
  time: "2h ago",
  summary: "Buyer showed strong interest for a 3BHK in Whitefield and requested a callback tomorrow to finalize the site visit timing.",
  transcriptPreview: "AI: Hello, am I speaking with Mr. Rahul Sharma?\nRahul: Yes, speaking. Who is this?\nAI: Hi Rahul, I am calling from Maxsas Realty regarding your recent inquiry for premium villas. Are you still looking to invest in a property?",
  transcriptFull: "AI: Hello, am I speaking with Mr. Rahul Sharma?\nRahul: Yes, speaking. Who is this?\nAI: Hi Rahul, I am calling from Maxsas Realty regarding your recent inquiry for premium villas. Are you still looking to invest in a property?\nRahul: Oh yes, actually I am currently evaluating a few options in the Whitefield area.\nAI: Excellent choice. Whitefield has incredible ROI currently. Are you looking for immediate possession or an under-construction project?\nRahul: Immediate possession preferably. Budget is around 80 Lakhs. Can we arrange a visit for Saturday?",
  audioDuration: "02m 14s",
  qualification: {
    propertyIntent: "Buy",
    type: "3BHK Villa",
    area: "Whitefield",
    budget: "₹80L",
    timeline: "2 months",
  },
};

// ── SCREEN COMPONENT ──────────────────────────────────────────────────────
export default function LexusCompletedLeadDetail() {
  const { leadId } = useLocalSearchParams<{ leadId: string }>();
  const [modalVisible, setModalVisible] = useState(false);

  // In a real app we would fetch the exact lead data using leadId
  const lead = MOCK_LEAD;

  const getTempColor = (temp: string) => {
    switch (temp.toLowerCase()) {
      case "hot":
        return C.red;
      case "warm":
        return C.amber;
      case "cold":
      default:
        return C.blue;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "qualified":
        return C.green;
      case "follow_up":
      case "needs action":
        return C.amber;
      case "failed":
        return C.red;
      default:
        return C.blue;
    }
  };

  const openUpgradeModal = () => setModalVisible(true);
  const closeUpgradeModal = () => setModalVisible(false);

  return (
    <SafeAreaView style={styles.safe}>
      {/* ── 1) HEADER ── */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTitle}>Lead Details</Text>
          <Text style={styles.headerSub}>Completed call insight</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.contentPad}>
          
          {/* ── 2) LEAD PROFILE CARD ── */}
          <View style={styles.card}>
            <View style={styles.profileTop}>
              <View style={styles.profileAvatar}>
                <Text style={styles.profileAvatarText}>
                  {lead.name.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{lead.name}</Text>
                <Text style={styles.profilePhone}>{lead.phone}</Text>
                <Text style={styles.profileTime}>Contacted: {lead.time}</Text>
              </View>
            </View>

            <View style={styles.profileStatusRow}>
              <Text style={styles.profileOutcomeLabel}>Outcome:</Text>
              <Text style={styles.profileOutcomeVal}>{lead.outcome}</Text>
            </View>

            <View style={styles.pillRow}>
              <View style={[styles.pill, { backgroundColor: `${getTempColor(lead.temperature)}15`, borderColor: `${getTempColor(lead.temperature)}40` }]}>
                <Text style={[styles.pillText, { color: getTempColor(lead.temperature) }]}>
                  {lead.temperature.toUpperCase()}
                </Text>
              </View>
              <View style={[styles.pill, { backgroundColor: `${getStatusColor(lead.status)}15`, borderColor: `${getStatusColor(lead.status)}40` }]}>
                <Text style={[styles.pillText, { color: getStatusColor(lead.status) }]}>
                  {lead.status.toUpperCase()}
                </Text>
              </View>
            </View>
          </View>

          {/* ── 3) AI SUMMARY CARD ── */}
          <Text style={styles.sectionHeader}>AI Summary</Text>
          <View style={styles.card}>
            <Text style={styles.summaryText}>{lead.summary}</Text>
          </View>

          {/* ── 6) QUALIFICATION DETAILS CARD ── */}
          <Text style={styles.sectionHeader}>Qualification</Text>
          <View style={styles.card}>
            <View style={styles.qualRow}>
              <Text style={styles.qualLabel}>Property Intent</Text>
              <Text style={styles.qualVal}>{lead.qualification.propertyIntent}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.qualRow}>
              <Text style={styles.qualLabel}>Type</Text>
              <Text style={styles.qualVal}>{lead.qualification.type}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.qualRow}>
              <Text style={styles.qualLabel}>Preferred Area</Text>
              <Text style={styles.qualVal}>{lead.qualification.area}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.qualRow}>
              <Text style={styles.qualLabel}>Budget</Text>
              <Text style={styles.qualVal}>{lead.qualification.budget}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.qualRow}>
              <Text style={styles.qualLabel}>Timeline</Text>
              <Text style={styles.qualVal}>{lead.qualification.timeline}</Text>
            </View>
          </View>

          {/* ── 4) TRANSCRIPT PREVIEW CARD ── */}
          <Text style={styles.sectionHeader}>Transcript Preview</Text>
          <View style={[styles.card, { paddingBottom: 0, overflow: 'hidden' }]}>
            <Text style={styles.transcriptPreviewText}>{lead.transcriptPreview}...</Text>
            
            <View style={styles.premiumOverlayStrip}>
              <View style={styles.premiumFooter}>
                <Text style={styles.premiumLockIcon}>🔒</Text>
                <Text style={styles.premiumFooterText}>Unlock full transcript with Diamond Plan</Text>
                <TouchableOpacity style={styles.premiumBtn} onPress={openUpgradeModal}>
                  <Text style={styles.premiumBtnText}>View Full Transcript</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* ── 5) AUDIO CARD ── */}
          <Text style={styles.sectionHeader}>Call Recording</Text>
          <View style={styles.card}>
            <View style={styles.audioRow}>
              <View style={styles.audioIconBox}>
                <Text style={styles.audioIcon}>🎵</Text>
              </View>
              <View style={styles.audioInfo}>
                <Text style={styles.audioTitle}>Full AI Conversation</Text>
                <Text style={styles.audioDuration}>{lead.audioDuration}</Text>
              </View>
              <TouchableOpacity style={styles.audioBtn} onPress={openUpgradeModal}>
                <Text style={styles.audioBtnIcon}>🔒</Text>
                <Text style={styles.audioBtnText}>Listen</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
        <View style={{ height: 60 }} />
      </ScrollView>

      {/* ── 7) PREMIUM UPGRADE MODAL ── */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeUpgradeModal}
      >
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            <View style={styles.modalDiamondIconWrap}>
              <Text style={styles.modalDiamondIcon}>💎</Text>
            </View>
            
            <Text style={styles.modalTitle}>Upgrade to Diamond</Text>
            <Text style={styles.modalSub}>
              Unlock call recordings, full transcripts, deeper AI insights and advanced lead analysis.
            </Text>

            <View style={styles.benefitList}>
              {[
                "Full transcript access",
                "Listen to AI call recordings",
                "Advanced qualification breakdown",
                "Priority lead intelligence"
              ].map((b, i) => (
                <View key={i} style={styles.benefitRow}>
                  <Text style={styles.benefitCheck}>✓</Text>
                  <Text style={styles.benefitText}>{b}</Text>
                </View>
              ))}
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.upgradeNowBtn} onPress={closeUpgradeModal}>
                <Text style={styles.upgradeNowText}>Upgrade Now</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.maybeLaterBtn} onPress={closeUpgradeModal}>
                <Text style={styles.maybeLaterText}>Maybe Later</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

// ── STYLES ─────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.03)",
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  backIcon: { fontSize: 26, color: C.text, lineHeight: 30, marginLeft: -2 },
  headerTitleWrap: { flex: 1 },
  headerTitle: { fontSize: 18, fontWeight: "700", color: C.text },
  headerSub: { fontSize: 12, color: C.textMuted },
  scroll: { paddingBottom: 32 },
  contentPad: { paddingHorizontal: 16, paddingTop: 16 },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "700",
    color: C.text,
    marginTop: 8,
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  card: {
    backgroundColor: C.bgCard,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: C.border,
    padding: 16,
    marginBottom: 20,
  },
  
  // Profile
  profileTop: { flexDirection: "row", alignItems: "center", marginBottom: 14 },
  profileAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(79,140,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  profileAvatarText: { fontSize: 20, fontWeight: "700", color: C.blue },
  profileInfo: { flex: 1 },
  profileName: { fontSize: 18, fontWeight: "700", color: C.text, marginBottom: 2 },
  profilePhone: { fontSize: 14, color: C.textMuted, marginBottom: 4 },
  profileTime: { fontSize: 11, color: C.textFaint },
  profileStatusRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.15)",
    padding: 12,
    borderRadius: 10,
    marginBottom: 14,
  },
  profileOutcomeLabel: { fontSize: 13, color: C.textMuted, marginRight: 8 },
  profileOutcomeVal: { fontSize: 14, fontWeight: "600", color: C.blue },
  pillRow: { flexDirection: "row", gap: 8 },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  pillText: { fontSize: 12, fontWeight: "700", letterSpacing: 0.5 },

  // Summary
  summaryText: { fontSize: 14, color: C.text, lineHeight: 22 },

  // Qualification
  qualRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 6 },
  qualLabel: { fontSize: 13, color: C.textMuted },
  qualVal: { fontSize: 14, fontWeight: "600", color: C.text },
  divider: { height: 1, backgroundColor: "rgba(255,255,255,0.05)", marginVertical: 4 },

  // Transcript
  transcriptPreviewText: {
    fontSize: 14,
    color: C.textMuted,
    lineHeight: 22,
    marginBottom: 60,
  },
  premiumOverlayStrip: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 30, // simulates blur overlap
    backgroundColor: "rgba(13,31,56,0.95)",
  },
  premiumFooter: {
    alignItems: "center",
    paddingBottom: 20,
  },
  premiumLockIcon: { fontSize: 18, marginBottom: 6 },
  premiumFooterText: { fontSize: 13, color: C.amber, fontWeight: "600", marginBottom: 12 },
  premiumBtn: {
    backgroundColor: C.amber,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 999,
  },
  premiumBtnText: { color: "#000", fontWeight: "700", fontSize: 14 },

  // Audio
  audioRow: { flexDirection: "row", alignItems: "center" },
  audioIconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.05)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  audioIcon: { fontSize: 20 },
  audioInfo: { flex: 1 },
  audioTitle: { fontSize: 15, fontWeight: "600", color: C.text, marginBottom: 2 },
  audioDuration: { fontSize: 12, color: C.textMuted },
  audioBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  audioBtnIcon: { fontSize: 12, marginRight: 5 },
  audioBtnText: { color: C.textMuted, fontSize: 13, fontWeight: "600" },

  // Modal
  modalBg: {
    flex: 1,
    backgroundColor: "rgba(4,12,24,0.85)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  modalCard: {
    width: "100%",
    backgroundColor: C.bgCard,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(245,166,35,0.4)",
    padding: 24,
    alignItems: "center",
    shadowColor: C.amber,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  modalDiamondIconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(245,166,35,0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  modalDiamondIcon: { fontSize: 32 },
  modalTitle: { fontSize: 22, fontWeight: "800", color: C.text, marginBottom: 8 },
  modalSub: {
    fontSize: 14,
    color: C.textMuted,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 20,
  },
  benefitList: { width: "100%", marginBottom: 24, paddingHorizontal: 10 },
  benefitRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  benefitCheck: { fontSize: 14, color: C.amber, marginRight: 10, fontWeight: "900" },
  benefitText: { fontSize: 14, color: C.text, fontWeight: "500" },
  modalActions: { width: "100%", alignItems: "center" },
  upgradeNowBtn: {
    width: "100%",
    height: 48,
    backgroundColor: C.amber,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  upgradeNowText: { color: "#000", fontWeight: "700", fontSize: 16 },
  maybeLaterBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  maybeLaterText: { color: C.textMuted, fontSize: 14, fontWeight: "600" },
});
