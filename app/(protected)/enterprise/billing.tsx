import React, { useMemo } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";

import EnterpriseSurface from "../../../components/enterprise/EnterpriseSurface";
import SectionHeader from "../../../components/lexus/SectionHeader";
import { C } from "../../../components/lexus/theme";
import { useCalls } from "../../../hooks/useCalls";
import { useCapabilities } from "../../../hooks/useCapabilities";
import { useWorkspaceProfile } from "../../../hooks/useWorkspaceProfile";
import { formatTime } from "../../../lib/adapters/calls";

export default function EnterpriseBilling() {
  const { calls } = useCalls();
  const { limits } = useCapabilities();
  const { planLabel } = useWorkspaceProfile();

  const usageRows = useMemo(
    () =>
      calls.slice(0, 20).map((call) => ({
        id: call.callId,
        roomId: call.roomId,
        date: call.initiatedAt,
        amount: 1,
      })),
    [calls]
  );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <SectionHeader title="Billing" subtitle="Enterprise billing and usage summary" />

        <EnterpriseSurface padded={true} style={{ marginBottom: 10 }}>
          <Text style={styles.title}>Current Plan</Text>
          <Text style={styles.value}>{planLabel}</Text>
          <Text style={styles.meta}>{`Monthly call minutes limit: ${limits?.monthlyCallMinutes ?? 0}`}</Text>
          <Text style={styles.meta}>{`Concurrent calls limit: ${limits?.maxConcurrentCalls ?? 0}`}</Text>
        </EnterpriseSurface>

        <EnterpriseSurface padded={true} style={{ marginBottom: 10 }}>
          <Text style={styles.title}>Billing Summary</Text>
          <Text style={styles.meta}>Invoice generation, tax breakdowns and payout routing will be provided in admin-managed billing phase.</Text>
        </EnterpriseSurface>

        <EnterpriseSurface padded={true}>
          <Text style={styles.title}>Recent Usage</Text>
          {usageRows.length === 0 ? (
            <Text style={styles.meta}>No usage rows yet.</Text>
          ) : (
            usageRows.map((row) => (
              <Text key={row.id} style={styles.row}>{`Room ${row.roomId} • ${formatTime(row.date)} • -${row.amount} unit`}</Text>
            ))
          )}
        </EnterpriseSurface>

        <Text style={{ height: 70 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  scroll: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 30 },
  title: { color: C.text, fontSize: 15, fontWeight: "700", marginBottom: 6 },
  value: { color: C.blue, fontSize: 20, fontWeight: "700", marginBottom: 4 },
  meta: { color: C.textMuted, fontSize: 12, marginTop: 4 },
  row: {
    color: C.text,
    fontSize: 12,
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: "rgba(79,140,255,0.1)",
    paddingTop: 8,
  },
});
