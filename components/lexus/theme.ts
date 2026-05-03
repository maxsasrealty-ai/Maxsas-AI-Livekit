export const LEXUS_THEME = {
  dark: {
    bg: "#040c18",
    bgCard: "#0d1f38",
    bgSoft: "#0a1628",
    blue: "#4F8CFF",
    green: "#00D084",
    amber: "#F5A623",
    red: "#FF6B6B",
    purple: "#A78BFA",
    text: "#e8edf5",
    textMuted: "rgba(232,237,245,0.65)",
    textFaint: "rgba(232,237,245,0.40)",
    border: "rgba(79,140,255,0.20)",
    cardSurface: "rgba(13,31,56,0.96)",
    shadow: "#000000",
  },
  light: {
    bg: "#eef3fb",
    bgCard: "#ffffff",
    bgSoft: "#e4edf9",
    blue: "#4F8CFF",
    green: "#00A86B",
    amber: "#E09A2D",
    red: "#E05555",
    purple: "#7A6BE6",
    text: "#10213d",
    textMuted: "rgba(16,33,61,0.64)",
    textFaint: "rgba(16,33,61,0.44)",
    border: "rgba(79,140,255,0.22)",
    cardSurface: "#ffffff",
    shadow: "#0f1f3a",
  },
} as const;

export const PRESTIGE_THEME = {
  dark: {
    bg: "#020712",
    bgCard: "#081326",
    bgSoft: "#060f1c",
    blue: "#6B5BFF", // richer indigo / premium violet blend
    green: "#00D084",
    amber: "#F5A623",
    red: "#FF6B6B",
    purple: "#D8B4FE",
    text: "#f0f4f8",
    textMuted: "rgba(240,244,248,0.70)",
    textFaint: "rgba(240,244,248,0.45)",
    border: "rgba(107,91,255,0.30)", // richer glow restraint
    cardSurface: "rgba(8,19,38,0.96)",
    shadow: "#000000",
  },
  light: {
    bg: "#f3f5fa",
    bgCard: "#ffffff",
    bgSoft: "#eaedf6",
    blue: "#6B5BFF",
    green: "#00A86B",
    amber: "#E09A2D",
    red: "#E05555",
    purple: "#7A6BE6",
    text: "#0c162c",
    textMuted: "rgba(12,22,44,0.68)",
    textFaint: "rgba(12,22,44,0.48)",
    border: "rgba(107,91,255,0.28)",
    cardSurface: "#ffffff",
    shadow: "#0a1324",
  },
} as const;

export type ThemePlan = "lexus" | "prestige";
export type LexusThemeMode = keyof typeof LEXUS_THEME;
export type LexusThemeColors = (typeof LEXUS_THEME)[LexusThemeMode];

// Backward-compatible default for screens that still read a static palette.
export const C: LexusThemeColors = LEXUS_THEME.dark;
