import React from "react";
import { View, Text, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { C } from "./theme";

export interface StatusPillProps {
  label: string;
  tone?: "success" | "warning" | "danger" | "info" | "neutral";
  style?: StyleProp<ViewStyle>;
}

export default function StatusPill({
  label,
  tone = "neutral",
  style,
}: StatusPillProps) {
  const getThemeColors = () => {
    switch (tone) {
      case "success":
        return { bg: "rgba(0, 208, 132, 0.15)", text: C.green };
      case "warning":
        return { bg: "rgba(245, 166, 35, 0.15)", text: C.amber };
      case "danger":
        return { bg: "rgba(255, 107, 107, 0.15)", text: C.red };
      case "info":
        return { bg: "rgba(79, 140, 255, 0.15)", text: C.blue };
      case "neutral":
      default:
        return { bg: "rgba(232, 237, 245, 0.10)", text: C.textMuted };
    }
  };

  const colors = getThemeColors();

  return (
    <View style={[styles.pill, { backgroundColor: colors.bg }, style]}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: "flex-start",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontWeight: "700",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
});
