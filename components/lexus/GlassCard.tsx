import React from "react";
import { Platform, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { useLexusTheme } from "../../context/LexusThemeContext";

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
  const { colors, isDark, plan } = useLexusTheme();
  const isPrestige = plan === "prestige";

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.cardSurface,
          borderColor: isPrestige && isDark ? "rgba(216, 180, 254, 0.2)" : colors.border,
          shadowColor: isPrestige ? colors.purple : colors.shadow,
          shadowOpacity: isPrestige ? (isDark ? 0.2 : 0.12) : (isDark ? 0.1 : 0.08),
        },
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
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 14,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: "0 6px 14px rgba(0,0,0,0.08)",
      },
    }),
  },
  padded: {
    padding: 18,
  },
});
