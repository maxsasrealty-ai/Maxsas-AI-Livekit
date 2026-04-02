import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import {
    fetchAdminTenantUsage,
    fetchAdminTenants,
    updateAdminTenant,
} from "../../../lib/api/admin";
import {
    PlanName,
    TenantAdminRecord,
    TenantUsageSummary,
    WorkspaceConfigOverrides,
} from "../../../shared/contracts";

const PLAN_OPTIONS: PlanName[] = ["Lexus", "Prestige", "Enterprise"];

export default function AdminTenantDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const tenantId = useMemo(() => String(id || ""), [id]);

  const [tenant, setTenant] = useState<TenantAdminRecord | null>(null);
  const [usage, setUsage] = useState<TenantUsageSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [plan, setPlan] = useState<PlanName>("Lexus");

  const [productLabel, setProductLabel] = useState("");
  const [workspaceLabel, setWorkspaceLabel] = useState("");
  const [tenantDisplayName, setTenantDisplayName] = useState("");

  const [leadsLabel, setLeadsLabel] = useState("");
  const [batchesLabel, setBatchesLabel] = useState("");
  const [callsLabel, setCallsLabel] = useState("");
  const [campaignsLabel, setCampaignsLabel] = useState("");

  const [assistantLabel, setAssistantLabel] = useState("");
  const [defaultAgentLabel, setDefaultAgentLabel] = useState("");

  const loadTenant = useCallback(async () => {
    if (!tenantId) {
      return;
    }

    setLoading(true);
    setError(null);

    const [tenantsResponse, usageResponse] = await Promise.all([
      fetchAdminTenants(),
      fetchAdminTenantUsage(tenantId),
    ]);

    if (!tenantsResponse.success) {
      setError(tenantsResponse.error.message);
      setLoading(false);
      return;
    }

    const found = tenantsResponse.data.find((item) => item.id === tenantId) || null;
    if (!found) {
      setError(`Tenant ${tenantId} not found`);
      setLoading(false);
      return;
    }

    setTenant(found);
    setName(found.name || "");
    setPlan(found.planName);

    setProductLabel(found.workspaceConfig.branding.productLabel || "");
    setWorkspaceLabel(found.workspaceConfig.branding.workspaceLabel || "");
    setTenantDisplayName(found.workspaceConfig.branding.tenantDisplayName || "");

    setLeadsLabel(found.workspaceConfig.vocabulary.leadsLabel || "");
    setBatchesLabel(found.workspaceConfig.vocabulary.batchesLabel || "");
    setCallsLabel(found.workspaceConfig.vocabulary.callsLabel || "");
    setCampaignsLabel(found.workspaceConfig.vocabulary.campaignsLabel || "");

    setAssistantLabel(found.workspaceConfig.voiceAgentDisplay.assistantLabel || "");
    setDefaultAgentLabel(found.workspaceConfig.voiceAgentDisplay.defaultAgentLabel || "");

    if (usageResponse.success) {
      setUsage(usageResponse.data);
    } else {
      setUsage(null);
    }

    setLoading(false);
  }, [tenantId]);

  useEffect(() => {
    void loadTenant();
  }, [loadTenant]);

  const onSave = useCallback(async () => {
    if (!tenantId || saving) {
      return;
    }

    setSaving(true);
    setError(null);

    const overrides: WorkspaceConfigOverrides = {
      branding: {
        productLabel,
        workspaceLabel,
        tenantDisplayName,
      },
      vocabulary: {
        leadsLabel,
        batchesLabel,
        callsLabel,
        campaignsLabel,
      },
      voiceAgentDisplay: {
        assistantLabel,
        defaultAgentLabel,
      },
    };

    const response = await updateAdminTenant(tenantId, {
      name: name || undefined,
      planName: plan,
      workspaceConfigOverrides: overrides,
    });

    if (!response.success) {
      setError(response.error.message);
      setSaving(false);
      return;
    }

    await loadTenant();
    setSaving(false);
  }, [
    assistantLabel,
    batchesLabel,
    callsLabel,
    campaignsLabel,
    defaultAgentLabel,
    leadsLabel,
    loadTenant,
    name,
    plan,
    productLabel,
    saving,
    tenantDisplayName,
    tenantId,
    workspaceLabel,
  ]);

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.content}>
        <View style={s.headerRow}>
          <Pressable style={s.backButton} onPress={() => router.back()}>
            <Text style={s.backText}>Back</Text>
          </Pressable>
          <Text style={s.title}>Tenant Settings</Text>
        </View>

        <Text style={s.subtitle}>{tenantId}</Text>

        {loading ? (
          <ActivityIndicator color="#4F8CFF" />
        ) : tenant ? (
          <>
            <View style={s.card}>
              <Text style={s.cardTitle}>Plan & Branding</Text>

              <TextInput
                style={s.input}
                value={name}
                onChangeText={setName}
                placeholder="Tenant name"
                placeholderTextColor="rgba(232,237,245,0.4)"
              />

              <View style={s.planRow}>
                {PLAN_OPTIONS.map((option) => (
                  <Pressable
                    key={option}
                    style={[s.planChip, plan === option && s.planChipActive]}
                    onPress={() => setPlan(option)}
                  >
                    <Text style={[s.planChipText, plan === option && s.planChipTextActive]}>{option}</Text>
                  </Pressable>
                ))}
              </View>

              <TextInput
                style={s.input}
                value={productLabel}
                onChangeText={setProductLabel}
                placeholder="Product label"
                placeholderTextColor="rgba(232,237,245,0.4)"
              />
              <TextInput
                style={s.input}
                value={workspaceLabel}
                onChangeText={setWorkspaceLabel}
                placeholder="Workspace label"
                placeholderTextColor="rgba(232,237,245,0.4)"
              />
              <TextInput
                style={s.input}
                value={tenantDisplayName}
                onChangeText={setTenantDisplayName}
                placeholder="Tenant display name"
                placeholderTextColor="rgba(232,237,245,0.4)"
              />
            </View>

            <View style={s.card}>
              <Text style={s.cardTitle}>Vocabulary</Text>
              <TextInput style={s.input} value={leadsLabel} onChangeText={setLeadsLabel} placeholder="Leads label" placeholderTextColor="rgba(232,237,245,0.4)" />
              <TextInput style={s.input} value={batchesLabel} onChangeText={setBatchesLabel} placeholder="Batches label" placeholderTextColor="rgba(232,237,245,0.4)" />
              <TextInput style={s.input} value={callsLabel} onChangeText={setCallsLabel} placeholder="Calls label" placeholderTextColor="rgba(232,237,245,0.4)" />
              <TextInput style={s.input} value={campaignsLabel} onChangeText={setCampaignsLabel} placeholder="Campaigns label" placeholderTextColor="rgba(232,237,245,0.4)" />
            </View>

            <View style={s.card}>
              <Text style={s.cardTitle}>Voice Settings</Text>
              <TextInput style={s.input} value={assistantLabel} onChangeText={setAssistantLabel} placeholder="Assistant label" placeholderTextColor="rgba(232,237,245,0.4)" />
              <TextInput style={s.input} value={defaultAgentLabel} onChangeText={setDefaultAgentLabel} placeholder="Default agent label" placeholderTextColor="rgba(232,237,245,0.4)" />
            </View>

            <View style={s.card}>
              <Text style={s.cardTitle}>Usage Summary</Text>
              {usage ? (
                <>
                  <Text style={s.meta}>{`Calls total: ${usage.callStats.totalCalls}`}</Text>
                  <Text style={s.meta}>{`Calls active: ${usage.callStats.activeCalls}`}</Text>
                  <Text style={s.meta}>{`Calls completed: ${usage.callStats.completedCalls}`}</Text>
                  <Text style={s.meta}>{`Calls failed: ${usage.callStats.failedCalls}`}</Text>
                  <Text style={s.meta}>{`Call minutes: ${usage.callStats.totalDurationMinutes}`}</Text>

                  <View style={s.divider} />

                  <Text style={s.meta}>{`Campaigns total: ${usage.campaignStats.totalCampaigns}`}</Text>
                  <Text style={s.meta}>{`Draft: ${usage.campaignStats.draft}`}</Text>
                  <Text style={s.meta}>{`Queued: ${usage.campaignStats.queued}`}</Text>
                  <Text style={s.meta}>{`Active: ${usage.campaignStats.active}`}</Text>
                  <Text style={s.meta}>{`Completed: ${usage.campaignStats.completed}`}</Text>
                  <Text style={s.meta}>{`Archived: ${usage.campaignStats.archived}`}</Text>
                </>
              ) : (
                <Text style={s.meta}>Usage data unavailable</Text>
              )}
            </View>

            <Pressable style={[s.saveButton, saving && s.saveButtonDisabled]} onPress={onSave} disabled={saving}>
              <Text style={s.saveButtonText}>{saving ? "Saving..." : "Save Tenant Settings"}</Text>
            </Pressable>
          </>
        ) : (
          <Text style={s.error}>Tenant not found.</Text>
        )}

        {error ? <Text style={s.error}>{error}</Text> : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#050d1a" },
  content: { padding: 16, paddingBottom: 40, gap: 12 },
  headerRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  backButton: {
    borderWidth: 1,
    borderColor: "rgba(79,140,255,0.35)",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  backText: { color: "#AFC8FF", fontSize: 12, fontWeight: "600" },
  title: { color: "#E8EDF5", fontSize: 24, fontWeight: "800" },
  subtitle: { color: "rgba(232,237,245,0.65)", fontSize: 12, marginBottom: 8 },
  card: {
    backgroundColor: "rgba(11,24,42,0.96)",
    borderWidth: 1,
    borderColor: "rgba(79,140,255,0.2)",
    borderRadius: 14,
    padding: 14,
    gap: 8,
  },
  cardTitle: { color: "#E8EDF5", fontSize: 16, fontWeight: "700", marginBottom: 4 },
  input: {
    backgroundColor: "rgba(79,140,255,0.08)",
    borderColor: "rgba(79,140,255,0.28)",
    borderWidth: 1,
    borderRadius: 10,
    color: "#E8EDF5",
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  planRow: { flexDirection: "row", gap: 8, marginBottom: 6 },
  planChip: {
    borderWidth: 1,
    borderColor: "rgba(79,140,255,0.22)",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "rgba(79,140,255,0.08)",
  },
  planChipActive: {
    backgroundColor: "rgba(79,140,255,0.25)",
    borderColor: "rgba(79,140,255,0.5)",
  },
  planChipText: { color: "rgba(232,237,245,0.75)", fontSize: 12, fontWeight: "600" },
  planChipTextActive: { color: "#E8EDF5" },
  meta: { color: "rgba(232,237,245,0.74)", fontSize: 13 },
  divider: { marginVertical: 8, height: 1, backgroundColor: "rgba(79,140,255,0.2)" },
  saveButton: {
    backgroundColor: "#4F8CFF",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  saveButtonDisabled: { opacity: 0.6 },
  saveButtonText: { color: "#fff", fontWeight: "700" },
  error: { color: "#FF8B8B", fontSize: 13 },
});
