import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from "react-native";
import { C } from "./theme";

export interface PillButtonProps {
  title: string;
  onPress?: () => void;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  icon?: string;
  style?: StyleProp<ViewStyle>;
}

export default function PillButton({
  title,
  onPress,
  variant = "primary",
  icon,
  style,
}: PillButtonProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return {
          container: { backgroundColor: C.blue, borderWidth: 1, borderColor: C.blue },
          text: { color: "#fff" },
        };
      case "secondary":
        return {
          container: { backgroundColor: "rgba(79,140,255,0.13)", borderWidth: 1, borderColor: "transparent" },
          text: { color: C.blue },
        };
      case "danger":
        return {
          container: { backgroundColor: C.red, borderWidth: 1, borderColor: C.red },
          text: { color: "#fff" },
        };
      case "ghost":
        return {
          container: { backgroundColor: "transparent", borderWidth: 1, borderColor: C.border },
          text: { color: C.text },
        };
      default:
        return {
          container: { backgroundColor: C.blue, borderWidth: 1, borderColor: C.blue },
          text: { color: "#fff" },
        };
    }
  };

  const vStyles = getVariantStyles();

  return (
    <TouchableOpacity
      style={[styles.button, vStyles.container, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {icon && <Text style={[styles.icon, vStyles.text]}>{icon}</Text>}
      <Text style={[styles.title, vStyles.text]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.5,
  },
  icon: {
    fontSize: 18,
    marginRight: 8,
  },
});
