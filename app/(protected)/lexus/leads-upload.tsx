import * as DocumentPicker from "expo-document-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    Modal,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import GlassCard from "../../../components/lexus/GlassCard";
import PillButton from "../../../components/lexus/PillButton";
import { C } from "../../../components/lexus/theme";
import { useCalls } from "../../../hooks/useCalls";
import { useCapabilities } from "../../../hooks/useCapabilities";

export default function LexusUploadLeads() {
  const { can, premiumPlanLabel, vocabulary, capabilities } = useCapabilities();
  const { initiateCall, error } = useCalls();

  const [modalVisible, setModalVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [agentName, setAgentName] = useState("");

  const canStartLiveCall = can("calls.live");

  const handleSingleLeadPress = () => {
    // In dev/demo: if capabilities haven't loaded (CORS/fetch issue), still allow triggering the call
    const callBlocked = canStartLiveCall === false && capabilities !== null;
    if (callBlocked) {
      Alert.alert("Feature unavailable", "Live calling is not enabled on your current plan.");
      return;
    }
    setModalVisible(true);
  };

  const handleStartCall = async () => {
    if (!phoneNumber.trim()) {
      const msg = "Please enter a valid phone number.";
      Platform.OS === "web" ? alert(msg) : Alert.alert("Required", msg);
      return;
    }

    setModalVisible(false);

    const callId = await initiateCall({
      roomId: `manual-${Date.now()}`,
      phoneNumber: phoneNumber.trim(),
      agentName: agentName.trim() || "maxsas-voice-agent-prod",
      direction: "outbound",
    });

    if (!callId) {
      // Show error in web-safe way
      console.error("Call initiation failed:", error);
      if (Platform.OS !== "web") {
        Alert.alert("Call initiation failed", error || "Unable to create call session. Check backend is running on port 4000.");
      } else {
        const msg = error || "Unable to create call session. Check backend is running on port 4000 and CORS is configured.";
        alert(msg);
      }
      return;
    }

    // Redirect to the dashboard to monitor live state
    router.replace("/(protected)/lexus/calls");
  };

  const handlePickCSV = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["text/csv", "application/vnd.ms-excel"],
        copyToCacheDirectory: false,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        if (Platform.OS === "web") {
           // Provide basic alert/confirm for web
           const confirmMsg = `File: ${result.assets[0].name}\n\nSince the batch ingestion endpoint is not available yet, this will now simulate a batch by triggering one test call! Proceed?`;
           if (window.confirm(confirmMsg)) {
              handleSingleLeadPress();
           }
        } else {
          Alert.alert(
            "CSV Selected",
            `File: ${result.assets[0].name}\n\nSince the batch ingestion endpoint is not available yet, this will now simulate a batch by triggering one test call!`,
            [
              { text: "Cancel", style: "cancel" },
              { text: "Start Simulation", onPress: () => { handleSingleLeadPress(); } }
            ]
          );
        }
      }
    } catch (err) {
      console.warn("Error picking document:", err);
    }
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
            onPress={() => {
              void handlePickCSV();
            }}
            style={{ width: '100%', marginBottom: 10, zIndex: 10 }}
          />
          <Text style={S.supportedText}>
            Supported: CSV with phone, name, city, budget columns.
          </Text>
        </GlassCard>

        {/* Secondary Action Card */}
        <TouchableOpacity 
           activeOpacity={0.7} 
           onPress={() => handleSingleLeadPress()}
           style={{ marginBottom: 28, zIndex: 10 }}
        >
          <GlassCard style={[S.cardSecondary, { marginBottom: 0 }]} padded={false} radius={14}>
            <View style={S.iconCircleSmall}><Text style={S.iconSecondary}>✍️</Text></View>
            <View style={{ flex: 1 }}>
                <Text style={S.cardTitleSmall}>{`Create Single ${vocabulary.leadsLabel.slice(0, -1)}`}</Text>
              <Text style={S.cardSubtitleSmall}>
                  {`Quickly add one manual ${vocabulary.leadsLabel.slice(0, -1).toLowerCase()} and test AI ${vocabulary.callsLabel.toLowerCase()}.`}
              </Text>
            </View>
            <View style={S.chevronBtn}>
              <Text style={S.chevronIcon}>›</Text>
            </View>
          </GlassCard>
        </TouchableOpacity>

        {capabilities !== null && !canStartLiveCall && (
          <GlassCard style={S.cardSecondary} padded={true} radius={14}>
            <Text style={S.cardSubtitleSmall}>{`Live ${vocabulary.callsLabel.toLowerCase()} are unavailable on your plan. Upgrade to ${premiumPlanLabel} to start calls from this screen.`}</Text>
          </GlassCard>
        )}

        {/* Info / Tips Section */}
        <Text style={S.tipsText}>
          Tip: For large campaigns, upload smaller batches (50–100 leads) for better monitoring.
        </Text>
      </ScrollView>

      {/* Manual Single Call Modal */}
      <Modal visible={modalVisible} transparent={true} animationType="fade" onRequestClose={() => setModalVisible(false)}>
        <View style={S.modalOverlay}>
          <View style={S.modalContainer}>
            <Text style={S.modalTitle}>Create Single Call</Text>
            
            <Text style={S.inputLabel}>Phone Number *</Text>
            <TextInput
              style={S.input}
              placeholder="+919876543210"
              placeholderTextColor={C.textFaint}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />

            <Text style={S.inputLabel}>Name (Optional)</Text>
            <TextInput
              style={S.input}
              placeholder="E.g. John Doe"
              placeholderTextColor={C.textFaint}
              value={agentName}
              onChangeText={setAgentName}
            />

            <View style={S.modalActions}>
              <TouchableOpacity style={S.modalBtnCancel} onPress={() => setModalVisible(false)}>
                <Text style={S.modalBtnCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={S.modalBtnSubmit} onPress={() => void handleStartCall()}>
                <Text style={S.modalBtnSubmitText}>Start Call</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  
  // Modal Styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', padding: 20 },
  modalContainer: { backgroundColor: '#1E293B', padding: 24, borderRadius: 16, borderWidth: 1, borderColor: '#334155' },
  modalTitle: { color: C.text, fontSize: 18, fontWeight: '700', marginBottom: 20, textAlign: 'center' },
  inputLabel: { color: C.textMuted, fontSize: 13, marginBottom: 6, fontWeight: '600' },
  input: { backgroundColor: '#0F172A', color: C.text, borderRadius: 8, paddingHorizontal: 14, paddingVertical: 12, marginBottom: 16, borderWidth: 1, borderColor: '#334155' },
  modalActions: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 },
  modalBtnCancel: { paddingHorizontal: 16, paddingVertical: 10, marginRight: 10 },
  modalBtnCancelText: { color: '#94A3B8', fontWeight: '600', fontSize: 15 },
  modalBtnSubmit: { backgroundColor: C.blue, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
  modalBtnSubmitText: { color: '#FFF', fontWeight: '600', fontSize: 15 },
});
