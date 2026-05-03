import { router, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";

import GlassCard from "../../../../components/lexus/GlassCard";
import LockedModuleCard from "../../../../components/lexus/locks/LockedModuleCard";
import StatusPill from "../../../../components/lexus/StatusPill";
import { C } from "../../../../components/lexus/theme";
import { useCallDetail } from "../../../../hooks/useCallDetail";
import { useCapabilities } from "../../../../hooks/useCapabilities";
import { formatTime, statusTone } from "../../../../lib/adapters/calls";

export default function LexusLeadDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const callId = typeof id === "string" ? decodeURIComponent(id) : "";

  const { detail, lead, transcript, isLoading, error } = useCallDetail(callId);
  const { can, upgradeLabel, premiumPlanLabel } = useCapabilities();

  return (
    <SafeAreaView style={styles.safe}>
      <LinearGradient colors={[C.bg, "#0B1526"]} style={StyleSheet.absoluteFillObject} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Lead Details</Text>
            <Text style={styles.headerSubtitle}>ID: {callId.slice(0, 8)}...</Text>
          </View>
        </View>

        {isLoading && (
          <GlassCard padded style={styles.centered}>
            <ActivityIndicator color={C.blue} style={{ marginBottom: 10 }} />
            <Text style={styles.meta}>Analyzing lead data...</Text>
          </GlassCard>
        )}

        {!isLoading && error && (
          <GlassCard padded style={styles.centered}>
            <Text style={styles.errorText}>Failed to load lead profile: {error}</Text>
          </GlassCard>
        )}

        {!isLoading && !error && detail && (
          <View style={styles.content}>
            {/* Caller Profile Card */}
            <GlassCard padded radius={16} style={styles.card}>
              <View style={styles.rowBetween}>
                <Text style={styles.primaryText}>{lead?.fields.name || `Lead ${detail.callId.slice(0, 6)}`}</Text>
                <StatusPill label={detail.state} tone={statusTone(detail.state)} />
              </View>
              
              <View style={styles.pillRow}>
                {detail.lead_bucket ? (
                  <StatusPill
                    label={detail.lead_bucket}
                    tone={
                      detail.lead_bucket === "Qualified"
                        ? "success"
                        : detail.lead_bucket === "Retry"
                        ? "warning"
                        : detail.lead_bucket === "Failed"
                        ? "danger"
                        : "neutral"
                    }
                  />
                ) : (
                  <StatusPill label="Uncategorized" tone="neutral" />
                )}
                {detail.raw_call_outcome ? (
                  <StatusPill
                    label={detail.raw_call_outcome.length > 15 ? detail.raw_call_outcome.slice(0, 15) + "…" : detail.raw_call_outcome}
                    tone="neutral"
                  />
                ) : null}
              </View>

              <View style={styles.divider} />
              
              <View style={styles.infoGrid}>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Phone Number</Text>
                  <Text style={styles.infoValue}>{lead?.fields.phone || detail.roomId || "-"}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Call Date</Text>
                  <Text style={styles.infoValue}>{formatTime(detail.initiatedAt)}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Direction</Text>
                  <Text style={styles.infoValue}>{detail.direction?.toUpperCase() || "-"}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Interaction</Text>
                  <Text style={styles.infoValue}>{detail.transcriptTurns || 0} Turns</Text>
                </View>
              </View>
            </GlassCard>

            {/* AI Summary & Lead Data Card */}
            <GlassCard padded radius={16} style={styles.card}>
              <View style={styles.sectionHeaderRow}>
                <View style={styles.glowDot} />
                <Text style={styles.sectionTitle}>Extracted Lead Data</Text>
              </View>

              <View style={styles.extractedFieldsContainer}>
                {/* Check fields or raw_data for the lead properties */}
                {(lead?.fields?.property_type || lead?.raw_data?.property_type) && (
                  <View style={styles.extractedField}>
                    <Text style={styles.extractedFieldLabel}>Property Type</Text>
                    <Text style={styles.extractedFieldValue}>{lead?.fields?.property_type || lead?.raw_data?.property_type}</Text>
                  </View>
                )}
                {(lead?.fields?.preferred_location || lead?.raw_data?.preferred_location) && (
                  <View style={styles.extractedField}>
                    <Text style={styles.extractedFieldLabel}>Location</Text>
                    <Text style={styles.extractedFieldValue}>{lead?.fields?.preferred_location || lead?.raw_data?.preferred_location}</Text>
                  </View>
                )}
                {(lead?.fields?.budget_range || lead?.raw_data?.budget_range) && (
                  <View style={styles.extractedField}>
                    <Text style={styles.extractedFieldLabel}>Budget</Text>
                    <Text style={styles.extractedFieldValue}>{lead?.fields?.budget_range || lead?.raw_data?.budget_range}</Text>
                  </View>
                )}
                {(lead?.fields?.purchase_timeline || lead?.raw_data?.purchase_timeline) && (
                  <View style={styles.extractedField}>
                    <Text style={styles.extractedFieldLabel}>Timeline</Text>
                    <Text style={styles.extractedFieldValue}>{lead?.fields?.purchase_timeline || lead?.raw_data?.purchase_timeline}</Text>
                  </View>
                )}
                {/* Fallback to show any dynamically mapped fields that aren't explicit */}
                {lead?.fields && Object.entries(lead.fields).map(([k, v]) => {
                  if (!["name", "phone", "summary", "property_type", "preferred_location", "budget_range", "purchase_timeline"].includes(k) && typeof v === "string") {
                    return (
                      <View key={k} style={styles.extractedField}>
                        <Text style={styles.extractedFieldLabel}>{k.replace(/_/g, " ")}</Text>
                        <Text style={styles.extractedFieldValue}>{v}</Text>
                      </View>
                    );
                  }
                  return null;
                })}
              </View>

              {lead?.fields?.summary ? (
                <View style={{ marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.06)" }}>
                  <Text style={styles.infoLabel}>AI Summary</Text>
                  <Text style={styles.summaryText}>{lead.fields.summary}</Text>
                </View>
              ) : null}

              {!lead?.fields?.summary && !lead?.fields?.budget_range && !lead?.raw_data?.budget_range && (
                <Text style={styles.summaryText}>
                  No extracted lead data is available yet. Ensure the call completed successfully.
                </Text>
              )}
            </GlassCard>

            {/* Full Transcript Card */}
            {!can("transcripts.full") ? (
              <LockedModuleCard
                title="Full Call Transcript"
                description={`AI-generated transcript review is available on ${premiumPlanLabel}.`}
                ctaLabel={upgradeLabel}
                onPress={() => router.push("/(protected)/lexus/settings" as any)}
              />
            ) : (
              <GlassCard padded radius={16} style={styles.card}>
                <View style={styles.sectionHeaderRow}>
                  <View style={[styles.glowDot, { backgroundColor: C.success }]} />
                  <Text style={styles.sectionTitle}>Full Transcript</Text>
                </View>
                
                <View style={styles.transcriptContainer}>
                  {transcript.length === 0 ? (
                    <Text style={styles.meta}>No transcript segments available for this call.</Text>
                  ) : (
                    transcript.map((segment, index) => {
                      const isAgent = segment.speaker.toLowerCase() === "agent";
                      return (
                        <View key={segment.id || index} style={[styles.bubbleWrapper, isAgent ? styles.bubbleRight : styles.bubbleLeft]}>
                          {!isAgent && <Text style={styles.speakerName}>Client</Text>}
                          {isAgent && <Text style={[styles.speakerName, { alignSelf: "flex-end", color: C.blue }]}>Lexus AI</Text>}
                          <View style={[styles.bubble, isAgent ? styles.bubbleAgent : styles.bubbleUser]}>
                            <Text style={styles.bubbleText}>{segment.text}</Text>
                          </View>
                        </View>
                      );
                    })
                  )}
                </View>
              </GlassCard>
            )}
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  scroll: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 40 },
  headerRow: { flexDirection: "row", alignItems: "center", marginBottom: 24, paddingHorizontal: 4 },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(79, 140, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(79, 140, 255, 0.2)",
    marginRight: 16,
  },
  backIcon: { color: C.blue, fontSize: 26, marginTop: -4, fontWeight: "300" },
  headerTitle: { color: C.text, fontSize: 22, fontWeight: "800", letterSpacing: 0.5 },
  headerSubtitle: { color: C.textMuted, fontSize: 13, marginTop: 2 },
  centered: { alignItems: "center", justifyContent: "center", paddingVertical: 40 },
  errorText: { color: C.danger, fontSize: 14, textAlign: "center" },
  content: { gap: 16 },
  card: { padding: 20 },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  primaryText: { color: "#FFFFFF", fontSize: 20, fontWeight: "700" },
  pillRow: { marginTop: 12, flexDirection: "row", alignItems: "center", gap: 10, flexWrap: "wrap" },
  divider: { height: 1, backgroundColor: "rgba(255,255,255,0.06)", marginVertical: 16 },
  infoGrid: { flexDirection: "row", flexWrap: "wrap", gap: 16 },
  infoItem: { width: "45%" },
  infoLabel: { color: C.textFaint, fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 },
  infoValue: { color: C.textMuted, fontSize: 14, fontWeight: "500" },
  sectionHeaderRow: { flexDirection: "row", alignItems: "center", marginBottom: 16, gap: 10 },
  glowDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: C.blue, shadowColor: C.blue, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.8, shadowRadius: 6 },
  sectionTitle: { color: C.text, fontSize: 16, fontWeight: "700", letterSpacing: 0.5 },
  summaryText: { color: C.textMuted, fontSize: 15, lineHeight: 24 },
  meta: { color: C.textMuted, fontSize: 14 },
  extractedFieldsContainer: { flexDirection: "row", flexWrap: "wrap", gap: 16, marginTop: 4 },
  extractedField: { width: "45%", backgroundColor: "rgba(255,255,255,0.03)", padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "rgba(255,255,255,0.05)" },
  extractedFieldLabel: { color: C.textFaint, fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 },
  extractedFieldValue: { color: "#FFFFFF", fontSize: 14, fontWeight: "600", textTransform: "capitalize" },
  transcriptContainer: { gap: 16, marginTop: 8 },
  bubbleWrapper: { maxWidth: "85%", marginBottom: 4 },
  bubbleLeft: { alignSelf: "flex-start" },
  bubbleRight: { alignSelf: "flex-end" },
  speakerName: { fontSize: 11, fontWeight: "600", color: C.textFaint, marginBottom: 4, paddingHorizontal: 4 },
  bubble: { paddingHorizontal: 16, paddingVertical: 12, borderRadius: 18 },
  bubbleUser: { backgroundColor: "rgba(255, 255, 255, 0.05)", borderBottomLeftRadius: 4, borderWidth: 1, borderColor: "rgba(255,255,255,0.03)" },
  bubbleAgent: { backgroundColor: "rgba(79, 140, 255, 0.15)", borderBottomRightRadius: 4, borderWidth: 1, borderColor: "rgba(79, 140, 255, 0.25)" },
  bubbleText: { color: "#E2E8F0", fontSize: 14, lineHeight: 20 },
});
