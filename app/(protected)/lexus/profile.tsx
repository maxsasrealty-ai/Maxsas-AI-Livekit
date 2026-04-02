import React from "react";
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import GlassCard from "../../../components/lexus/GlassCard";
import PillButton from "../../../components/lexus/PillButton";
import SectionHeader from "../../../components/lexus/SectionHeader";
import StatusPill from "../../../components/lexus/StatusPill";
import { C } from "../../../components/lexus/theme";
import { useCalls } from "../../../hooks/useCalls";
import { useCapabilities } from "../../../hooks/useCapabilities";

const defaultAlert = (msg: string) => {
  Alert.alert("Coming soon", msg);
};

export default function LexusProfile() {
  const { calls, isLoading, isBootstrapping, error } = useCalls();
  const { limits, can, planLabel, premiumPlanLabel, upgradeLabel, vocabulary } = useCapabilities();
  const activeCalls = calls.filter((call) => call.state === "active").length;

  const planBadge = planLabel;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Header Block */}
        <View style={styles.headerBlock}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>M</Text>
          </View>
          <Text style={styles.profileName}>Maxsas AI</Text>
          <Text style={styles.profileSubtitle}>{planBadge} Plan Account</Text>
          <StatusPill label="Active" tone="success" style={{ marginTop: 4 }} />
        </View>

        {/* Account Summary Card */}
        <SectionHeader title="Account Summary" />
        <GlassCard style={styles.card} padded={true}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Email</Text>
            <Text style={styles.summaryValue}>admin@maxsas.com</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Company name</Text>
            <Text style={styles.summaryValue}>Maxsas Realty</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Role</Text>
            <Text style={styles.summaryValue}>Administrator</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Plan</Text>
            <Text style={styles.summaryValue}>{planBadge}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Monthly minutes</Text>
            <Text style={styles.summaryValue}>{limits?.monthlyCallMinutes ?? 0}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Concurrent calls</Text>
            <Text style={styles.summaryValue}>{limits?.maxConcurrentCalls ?? 0}</Text>
          </View>
        </GlassCard>

        {/* Plan Card */}
        <GlassCard style={styles.planCard} padded={true}>
          <View style={styles.planHeader}>
            <Text style={styles.planCardTitle}>Current Plan: {planBadge}</Text>
          </View>
          <Text style={styles.planBenefits}>
            {`${vocabulary.callsLabel} tracked: ${calls.length} · Active now: ${activeCalls}`}
          </Text>
          <View style={styles.featureRow}>
            <StatusPill label={`Live calls: ${can("calls.live") ? "On" : "Off"}`} tone={can("calls.live") ? "success" : "neutral"} />
            <StatusPill label={`Call history: ${can("calls.history") ? "On" : "Off"}`} tone={can("calls.history") ? "success" : "neutral"} />
          </View>
          <View style={styles.featureRow}>
            <StatusPill label={`Transcript full: ${can("transcripts.full") ? "On" : "Off"}`} tone={can("transcripts.full") ? "success" : "neutral"} />
            <StatusPill label={`Recordings: ${can("recordings.playback") ? "On" : "Off"}`} tone={can("recordings.playback") ? "success" : "neutral"} />
          </View>
          <PillButton
            title={upgradeLabel}
            variant="primary"
            onPress={() => defaultAlert(`Billing and subscription management backend is not available in this phase. ${premiumPlanLabel} remains visible as a locked upgrade path.`)}
          />
        </GlassCard>

        {(isLoading || isBootstrapping) && (
          <Text style={styles.infoText}>Refreshing profile capabilities...</Text>
        )}
        {!isLoading && !isBootstrapping && error && (
          <Text style={styles.infoText}>Failed to refresh capabilities: {error}</Text>
        )}

        {/* Quick Actions List */}
        <SectionHeader title="Quick Actions" />
        <GlassCard style={styles.card} padded={true}>
          <TouchableOpacity
            style={styles.actionRow}
            onPress={() => defaultAlert("Change Password")}
          >
            <Text style={styles.actionText}>Change Password</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity
            style={styles.actionRow}
            onPress={() => defaultAlert("Notification Settings")}
          >
            <Text style={styles.actionText}>Notification Settings</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity
            style={styles.actionRow}
            onPress={() => defaultAlert("Support")}
          >
            <Text style={styles.actionText}>Support</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity
            style={styles.actionRow}
            onPress={() => defaultAlert("App Permissions")}
          >
            <Text style={styles.actionText}>App Permissions</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </GlassCard>

        {/* Logout Card */}
        <View style={styles.logoutContainer}>
          <PillButton
            title="Logout"
            variant="danger"
            onPress={() => defaultAlert("Logout flow")}
          />
        </View>

        {/* Bottom padding for tab bar */}
        <View style={{ height: 60 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: C.bg },
  scrollContent: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 32 },
  headerBlock: { alignItems: "center", marginBottom: 14, marginTop: 16 },
  avatarContainer: { width: 80, height: 80, borderRadius: 40, backgroundColor: C.blue, alignItems: "center", justifyContent: "center", marginBottom: 12 },
  avatarText: { fontSize: 32, fontWeight: "bold", color: "#ffffff" },
  profileName: { fontSize: 22, fontWeight: "600", color: C.text, marginBottom: 4 },
  profileSubtitle: { fontSize: 14, color: C.textMuted, marginBottom: 8 },
  card: { marginBottom: 16 },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 8 },
  summaryLabel: { fontSize: 14, color: C.textMuted },
  summaryValue: { fontSize: 14, color: C.text, fontWeight: "500" },
  divider: { height: 1, backgroundColor: "rgba(255,255,255,0.05)", marginVertical: 4 },
  planCard: { backgroundColor: "rgba(79, 140, 255, 0.08)", borderColor: C.blue, marginBottom: 16 },
  planHeader: { marginBottom: 8 },
  planCardTitle: { fontSize: 18, fontWeight: "bold", color: C.blue },
  planBenefits: { fontSize: 14, color: C.text, marginBottom: 16, lineHeight: 20 },
  featureRow: { flexDirection: "row", gap: 8, marginBottom: 10 },
  infoText: { color: C.textFaint, textAlign: "center", marginBottom: 12 },
  actionRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 12 },
  actionText: { fontSize: 15, color: C.text },
  chevron: { fontSize: 20, color: C.textMuted, lineHeight: 20 },
  logoutContainer: { marginTop: 18 },
});
