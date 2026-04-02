import React from "react";
import { View, StyleSheet, ViewStyle, StyleProp, Platform } from "react-native";
import { C } from "./theme";

export interface GlassCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  padded?: boolean;
  radius?: number;
}

export default function GlassCard({
  children,
  style,
  padded = true,
  radius = 18,
}: GlassCardProps) {
  return (
    <View
      style={[
        styles.card,
        { borderRadius: radius },
        padded && styles.padded,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(13,31,56,0.96)",
    borderWidth: 1,
    borderColor: C.border,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.10,
        shadowRadius: 10,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      },
    }),
  },
  padded: {
    padding: 18,
  },
});
