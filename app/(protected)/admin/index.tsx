import { router } from "expo-router";
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

import { createAdminTenant, fetchAdminTenants } from "../../../lib/api/admin";
import { PlanName, TenantAdminRecord } from "../../../shared/contracts";

const PLAN_OPTIONS: PlanName[] = ["Lexus", "Prestige", "Enterprise"];

export default function AdminTenantsScreen() {
  const [tenants, setTenants] = useState<TenantAdminRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [newTenantId, setNewTenantId] = useState("");
  const [newTenantName, setNewTenantName] = useState("");
  const [newTenantPlan, setNewTenantPlan] = useState<PlanName>("Lexus");

  const loadTenants = useCallback(async () => {
    setLoading(true);
    setError(null);

    const response = await fetchAdminTenants();
    if (!response.success) {
      setError(response.error.message);
      setLoading(false);
      return;
    }

    setTenants(response.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    void loadTenants();
  }, [loadTenants]);

  const canCreate = useMemo(() => newTenantId.trim().length > 0, [newTenantId]);

  const onCreateTenant = useCallback(async () => {
    if (!canCreate || submitting) {
      return;
    }

    setSubmitting(true);
    setError(null);

    const response = await createAdminTenant({
      id: newTenantId.trim(),
      name: newTenantName.trim() || undefined,
      planName: newTenantPlan,
    });

    if (!response.success) {
      setError(response.error.message);
      setSubmitting(false);
      return;
    }

    setNewTenantId("");
    setNewTenantName("");
    await loadTenants();
    setSubmitting(false);
  }, [canCreate, loadTenants, newTenantId, newTenantName, newTenantPlan, submitting]);

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.content}>
        <Text style={s.title}>Admin Provisioning</Text>
        <Text style={s.subtitle}>Create and manage tenant workspaces</Text>

        <View style={s.card}>
          <Text style={s.cardTitle}>Create Tenant</Text>

          <TextInput
            style={s.input}
            value={newTenantId}
            onChangeText={setNewTenantId}
            placeholder="Tenant ID (example: acme-enterprise)"
            placeholderTextColor="rgba(232,237,245,0.4)"
            autoCapitalize="none"
          />
          <TextInput
            style={s.input}
            value={newTenantName}
            onChangeText={setNewTenantName}
            placeholder="Tenant name"
            placeholderTextColor="rgba(232,237,245,0.4)"
          />

          <View style={s.planRow}>
            {PLAN_OPTIONS.map((plan) => (
              <Pressable
                key={plan}
                style={[s.planChip, newTenantPlan === plan && s.planChipActive]}
                onPress={() => setNewTenantPlan(plan)}
              >
                <Text style={[s.planChipText, newTenantPlan === plan && s.planChipTextActive]}>{plan}</Text>
              </Pressable>
            ))}
          </View>

          <Pressable
            style={[s.button, (!canCreate || submitting) && s.buttonDisabled]}
            onPress={onCreateTenant}
            disabled={!canCreate || submitting}
          >
            <Text style={s.buttonText}>{submitting ? "Creating..." : "Create Tenant"}</Text>
          </Pressable>
        </View>

        <View style={s.card}>
          <View style={s.listHeader}>
            <Text style={s.cardTitle}>Tenant List</Text>
            <Pressable style={s.refreshButton} onPress={loadTenants}>
              <Text style={s.refreshText}>Refresh</Text>
            </Pressable>
          </View>

          {loading ? (
            <ActivityIndicator color="#4F8CFF" />
          ) : tenants.length === 0 ? (
            <Text style={s.empty}>No tenants yet.</Text>
          ) : (
            tenants.map((tenant) => (
              <Pressable
                key={tenant.id}
                style={s.row}
                onPress={() => router.push(`/(protected)/admin/${tenant.id}` as never)}
              >
                <View style={{ flex: 1 }}>
                  <Text style={s.rowTitle}>{tenant.name || tenant.id}</Text>
                  <Text style={s.rowMeta}>{tenant.id}</Text>
                </View>
                <Text style={s.rowPlan}>{tenant.planName}</Text>
              </Pressable>
            ))
          )}
        </View>

        {error ? <Text style={s.error}>{error}</Text> : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#050d1a" },
  content: { padding: 16, paddingBottom: 40, gap: 12 },
  title: { color: "#E8EDF5", fontSize: 26, fontWeight: "800" },
  subtitle: { color: "rgba(232,237,245,0.7)", fontSize: 13, marginBottom: 8 },
  card: {
    backgroundColor: "rgba(11,24,42,0.96)",
    borderWidth: 1,
    borderColor: "rgba(79,140,255,0.2)",
    borderRadius: 14,
    padding: 14,
    gap: 10,
  },
  cardTitle: { color: "#E8EDF5", fontSize: 16, fontWeight: "700" },
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
  planRow: { flexDirection: "row", gap: 8 },
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
  button: {
    marginTop: 4,
    backgroundColor: "#4F8CFF",
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: "center",
  },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: "#fff", fontWeight: "700" },
  listHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  refreshButton: {
    borderWidth: 1,
    borderColor: "rgba(79,140,255,0.3)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  refreshText: { color: "#AFC8FF", fontSize: 12, fontWeight: "600" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(79,140,255,0.16)",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 12,
  },
  rowTitle: { color: "#E8EDF5", fontSize: 14, fontWeight: "600" },
  rowMeta: { color: "rgba(232,237,245,0.55)", fontSize: 12 },
  rowPlan: {
    color: "#9CC0FF",
    fontSize: 12,
    fontWeight: "700",
    backgroundColor: "rgba(79,140,255,0.12)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  empty: { color: "rgba(232,237,245,0.55)", fontSize: 13 },
  error: { color: "#FF8B8B", fontSize: 13 },
});
