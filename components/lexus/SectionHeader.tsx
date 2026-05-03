import React from "react";
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { useLexusTheme } from "../../context/LexusThemeContext";

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: string;
  style?: StyleProp<ViewStyle>;
}

export default function SectionHeader({
  title,
  subtitle,
  actionLabel,
  onAction,
  icon,
  style,
}: SectionHeaderProps) {
  const { colors } = useLexusTheme();

  return (
    <View style={[styles.container, style]}>
      <View style={styles.titleContainer}>
        {icon && <Text style={styles.icon}>{icon}</Text>}
        <View style={styles.textStack}>
          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
          {subtitle && <Text style={[styles.subtitle, { color: colors.textMuted }]}>{subtitle}</Text>}
        </View>
      </View>
      {actionLabel && (
        <TouchableOpacity onPress={onAction} style={styles.actionButton} activeOpacity={0.7}>
          <Text style={[styles.actionText, { color: colors.blue }]}>{actionLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    marginTop: 10,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  icon: {
    fontSize: 20,
    marginRight: 8,
  },
  textStack: {
    flex: 1,
  },
  title: {
    fontWeight: "700",
    fontSize: 17,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  actionButton: {
    paddingVertical: 6,
    paddingLeft: 12,
  },
  actionText: {
    fontWeight: "600",
    fontSize: 14,
  },
});
