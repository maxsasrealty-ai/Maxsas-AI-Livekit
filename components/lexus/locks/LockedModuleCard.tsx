import React from "react";
import { StyleSheet, Text, View } from "react-native";

import GlassCard from "../GlassCard";
import PillButton from "../PillButton";
import { C } from "../theme";

interface LockedModuleCardProps {
  title: string;
  description: string;
  ctaLabel?: string;
  onPress?: () => void;
}

export default function LockedModuleCard({
  title,
  description,
  ctaLabel = "Upgrade plan",
  onPress,
}: LockedModuleCardProps) {
  return (
    <GlassCard style={styles.card} padded={true}>
      <View style={styles.row}>
        <Text style={styles.lock}>LOCKED</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.desc}>{description}</Text>
      <PillButton title={ctaLabel} variant="secondary" onPress={onPress} style={{ marginTop: 10 }} />
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  card: {
    borderColor: "rgba(79,140,255,0.35)",
    backgroundColor: "rgba(13,31,56,0.85)",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  lock: {
    color: C.amber,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.7,
    marginRight: 8,
  },
  title: {
    color: C.text,
    fontWeight: "700",
    fontSize: 15,
  },
  desc: {
    color: C.textMuted,
    fontSize: 13,
    lineHeight: 19,
  },
});
