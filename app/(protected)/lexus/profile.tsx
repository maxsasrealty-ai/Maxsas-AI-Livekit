import { router } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
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
import { LexusThemeColors } from "../../../components/lexus/theme";
import { useLexusTheme } from "../../../context/LexusThemeContext";
import { useCalls } from "../../../hooks/useCalls";
import { useCapabilities } from "../../../hooks/useCapabilities";
import { useResponsive } from "../../../hooks/useResponsive";
import {
    clearCurrentAuthUser,
    getCurrentAuthUser,
    subscribeAuthSession,
} from "../../../lib/auth/session";

const defaultAlert = (msg: string) => {
  Alert.alert("Coming soon", msg);
};

export default function LexusProfile() {
  const { calls, isLoading, isBootstrapping, error } = useCalls();
  const { limits, can, planLabel, premiumPlanLabel, upgradeLabel, vocabulary } = useCapabilities();
  const { mode, plan, setMode, setPlan, colors, isDark } = useLexusTheme();
  const { isDesktop } = useResponsive();
  const s = useMemo(() => createStyles(colors, isDark, isDesktop), [colors, isDark, isDesktop]);
  const bottomSpacer = isDesktop ? 112 : 72;

  const [authUser, setAuthUser] = useState<Awaited<ReturnType<typeof getCurrentAuthUser>>>(null);
  const activeCalls = calls.filter((call) => call.state === "active").length;

  useEffect(() => {
    let mounted = true;

    void getCurrentAuthUser().then((user) => {
      if (mounted) {
        setAuthUser(user);
      }
    });

    const unsubscribe = subscribeAuthSession((user) => {
      if (mounted) {
        setAuthUser(user);
      }
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  const displayName = authUser?.fullName || "Maxsas AI";
  const displayEmail = authUser?.email || "Not signed in";
  const companyName = authUser?.tenantName || "Your Workspace";

  const handleLogout = async () => {
    await clearCurrentAuthUser();
    router.replace("/(public)/login");
  };

  return (
    <SafeAreaView style={s.safeArea}>
      <ScrollView contentContainerStyle={s.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={s.headerBlock}>
          <View style={s.avatarContainer}>
            <Text style={s.avatarText}>{displayName.slice(0, 1).toUpperCase()}</Text>
          </View>
          <Text style={s.profileName}>{displayName}</Text>
          <Text style={s.profileSubtitle}>
            {plan === "prestige" ? "Prestige" : "Lexus"} Plan Account
          </Text>
          <StatusPill 
            label={plan === "prestige" ? "Prestige" : "Active"} 
            tone={plan === "prestige" ? "warning" : "success"} // Use warning (amber) for a premium look
            style={{ marginTop: 4 }} 
          />
        </View>

        <SectionHeader title="Account Summary" />
        <GlassCard style={s.card} padded={true}>
          <ProfileRow label="Email" value={displayEmail} styles={s} />
          <Divider styles={s} />
          <ProfileRow label="Company name" value={companyName} styles={s} />
          <Divider styles={s} />
          <ProfileRow label="Role" value="Administrator" styles={s} />
          <Divider styles={s} />
          <ProfileRow label="Plan" value={plan === "prestige" ? "Prestige" : planLabel} styles={s} />
          <Divider styles={s} />
          <ProfileRow label="Monthly minutes" value={String(limits?.monthlyCallMinutes ?? 0)} styles={s} />
          <Divider styles={s} />
          <ProfileRow label="Concurrent calls" value={String(limits?.maxConcurrentCalls ?? 0)} styles={s} />
        </GlassCard>

        <SectionHeader title="Settings" />
        <GlassCard style={s.card} padded={true}>
          <Text style={s.settingTitle}>Appearance</Text>
          <Text style={s.settingSubtitle}>Choose how Lexus app looks on your device.</Text>
          <View style={s.modeRow}>
            <TouchableOpacity
              onPress={() => void setMode("light")}
              style={[s.modeButton, mode === "light" && s.modeButtonActive]}
            >
              <Text style={[s.modeButtonText, mode === "light" && s.modeButtonTextActive]}>Light</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => void setMode("dark")}
              style={[s.modeButton, mode === "dark" && s.modeButtonActive]}
            >
              <Text style={[s.modeButtonText, mode === "dark" && s.modeButtonTextActive]}>Dark</Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 24 }}>
            <Text style={s.settingTitle}>UI Preview Mode (Mock)</Text>
            <Text style={s.settingSubtitle}>Visually test the premium interface before backend wiring.</Text>
            <View style={s.modeRow}>
              <TouchableOpacity
                onPress={() => void setPlan("lexus")}
                style={[s.modeButton, plan === "lexus" && s.modeButtonActive]}
              >
                <Text style={[s.modeButtonText, plan === "lexus" && s.modeButtonTextActive]}>Lexus</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => void setPlan("prestige")}
                style={[s.modeButton, plan === "prestige" && s.modeButtonActive, plan === "prestige" && { backgroundColor: colors.purple }]}
              >
                <Text style={[s.modeButtonText, plan === "prestige" && s.modeButtonTextActive]}>Prestige</Text>
              </TouchableOpacity>
            </View>
          </View>
        </GlassCard>

        <GlassCard style={s.planCard} padded={true}>
          <View style={s.planHeader}>
            <Text style={[s.planCardTitle, plan === "prestige" && { color: colors.purple }]}>
              Current Plan: {plan === "prestige" ? "Prestige" : "Lexus"}
            </Text>
          </View>
          <Text style={s.planBenefits}>
            {`${vocabulary.callsLabel} tracked: ${calls.length} · Active now: ${activeCalls}`}
          </Text>
          <View style={s.featureRow}>
            <StatusPill label={`Live calls: ${can("calls.live") ? "On" : "Off"}`} tone={can("calls.live") ? "success" : "neutral"} />
            <StatusPill label={`Call history: ${can("calls.history") ? "On" : "Off"}`} tone={can("calls.history") ? "success" : "neutral"} />
          </View>
          <View style={s.featureRow}>
            <StatusPill label={`Transcript full: ${can("transcripts.full") ? "On" : "Off"}`} tone={can("transcripts.full") ? "success" : "neutral"} />
            <StatusPill label={`Recordings: ${can("recordings.playback") ? "On" : "Off"}`} tone={can("recordings.playback") ? "success" : "neutral"} />
          </View>
          <PillButton
            title={upgradeLabel}
            variant="primary"
            onPress={() =>
              defaultAlert(
                `Billing and subscription management backend is not available in this phase. ${premiumPlanLabel} remains visible as a locked upgrade path.`
              )
            }
          />
        </GlassCard>

        {(isLoading || isBootstrapping) && <Text style={s.infoText}>Refreshing profile capabilities...</Text>}
        {!isLoading && !isBootstrapping && error && <Text style={s.infoText}>Failed to refresh capabilities: {error}</Text>}

        <SectionHeader title="Quick Actions" />
        <GlassCard style={s.card} padded={true}>
          <ActionRow label="Change Password" onPress={() => defaultAlert("Change Password")} styles={s} />
          <Divider styles={s} />
          <ActionRow label="Notification Settings" onPress={() => defaultAlert("Notification Settings")} styles={s} />
          <Divider styles={s} />
          <ActionRow label="Support" onPress={() => defaultAlert("Support")} styles={s} />
          <Divider styles={s} />
          <ActionRow label="App Permissions" onPress={() => defaultAlert("App Permissions")} styles={s} />
        </GlassCard>

        <View style={s.logoutContainer}>
          <PillButton title="Logout" variant="danger" onPress={handleLogout} />
        </View>

        <View style={{ height: bottomSpacer }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function Divider({ styles }: { styles: ReturnType<typeof createStyles> }) {
  return <View style={styles.divider} />;
}

function ProfileRow({
  label,
  value,
  styles,
}: {
  label: string;
  value: string;
  styles: ReturnType<typeof createStyles>;
}) {
  return (
    <View style={styles.summaryRow}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={styles.summaryValue}>{value}</Text>
    </View>
  );
}

function ActionRow({
  label,
  onPress,
  styles,
}: {
  label: string;
  onPress: () => void;
  styles: ReturnType<typeof createStyles>;
}) {
  return (
    <TouchableOpacity style={styles.actionRow} onPress={onPress}>
      <Text style={styles.actionText}>{label}</Text>
      <Text style={styles.chevron}>Open</Text>
    </TouchableOpacity>
  );
}

function createStyles(colors: LexusThemeColors, isDark: boolean, isDesktop: boolean) {
  const scale = isDesktop ? 0.82 : 1;
  const px = (value: number) => Math.round(value * scale);

  return StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: colors.bg },
    scrollContent: { paddingHorizontal: px(16), paddingTop: px(16), paddingBottom: px(32) },
    headerBlock: { alignItems: "center", marginBottom: px(14), marginTop: px(16) },
    avatarContainer: {
      width: px(84),
      height: px(84),
      borderRadius: px(42),
      backgroundColor: isDark ? "rgba(79,140,255,0.16)" : "rgba(79,140,255,0.12)",
      borderWidth: 2,
      borderColor: colors.border,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: px(12),
    },
    avatarText: { fontSize: px(34), fontWeight: "700", color: colors.blue },
    profileName: { fontSize: px(24), fontWeight: "700", color: colors.text, marginBottom: px(4) },
    profileSubtitle: { fontSize: px(14), color: colors.textMuted, marginBottom: px(8) },
    card: { marginBottom: px(16) },
    summaryRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: px(9) },
    summaryLabel: { fontSize: px(14), color: colors.textMuted },
    summaryValue: { fontSize: px(14), color: colors.text, fontWeight: "600", maxWidth: "58%", textAlign: "right" },
    divider: { height: 1, backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(16,33,61,0.08)", marginVertical: px(3) },
    planCard: {
      backgroundColor: isDark ? "rgba(79, 140, 255, 0.08)" : "rgba(79, 140, 255, 0.06)",
      borderColor: colors.blue,
      marginBottom: px(16),
    },
    planHeader: { marginBottom: px(8) },
    planCardTitle: { fontSize: px(18), fontWeight: "700", color: colors.blue },
    planBenefits: { fontSize: px(14), color: colors.text, marginBottom: px(16), lineHeight: px(20) },
    featureRow: { flexDirection: "row", gap: px(8), marginBottom: px(10) },
    infoText: { color: colors.textFaint, textAlign: "center", marginBottom: px(12) },
    actionRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: px(12) },
    actionText: { fontSize: px(15), color: colors.text },
    chevron: { fontSize: px(12), color: colors.blue, lineHeight: px(16), fontWeight: "700" },
    logoutContainer: { marginTop: px(18) },
    settingTitle: { color: colors.text, fontSize: px(15), fontWeight: "700", marginBottom: px(4) },
    settingSubtitle: { color: colors.textMuted, fontSize: px(13), marginBottom: px(12) },
    modeRow: {
      flexDirection: "row",
      backgroundColor: isDark ? "rgba(4,12,24,0.55)" : "rgba(79,140,255,0.08)",
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: px(14),
      padding: px(4),
      gap: px(8),
    },
    modeButton: {
      flex: 1,
      height: px(36),
      borderRadius: px(10),
      alignItems: "center",
      justifyContent: "center",
    },
    modeButtonActive: {
      backgroundColor: colors.blue,
    },
    modeButtonText: {
      color: colors.textMuted,
      fontWeight: "700",
      fontSize: px(13),
    },
    modeButtonTextActive: {
      color: "#fff",
    },
  });
}
