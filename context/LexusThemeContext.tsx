import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Platform } from "react-native";

import { LEXUS_THEME, PRESTIGE_THEME, LexusThemeColors, LexusThemeMode, ThemePlan } from "../components/lexus/theme";

interface LexusThemeContextValue {
  mode: LexusThemeMode;
  plan: ThemePlan;
  colors: LexusThemeColors;
  isDark: boolean;
  setMode: (mode: LexusThemeMode) => Promise<void>;
  toggleMode: () => Promise<void>;
  setPlan: (plan: ThemePlan) => Promise<void>;
}

const STORAGE_KEY = "maxsas.lexus.theme.mode";
const PLAN_STORAGE_KEY = "maxsas.lexus.theme.plan";

const FALLBACK_THEME_VALUE: LexusThemeContextValue = {
  mode: "dark",
  plan: "lexus",
  colors: LEXUS_THEME.dark,
  isDark: true,
  setMode: async () => {},
  toggleMode: async () => {},
  setPlan: async () => {},
};

const LexusThemeContext = createContext<LexusThemeContextValue | null>(null);

async function readStoredMode(): Promise<LexusThemeMode | null> {
  if (Platform.OS === "web" && typeof window !== "undefined") {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw === "light" || raw === "dark") {
        return raw;
      }
      return null;
    } catch {
      return null;
    }
  }

  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (raw === "light" || raw === "dark") {
      return raw;
    }
    return null;
  } catch {
    return null;
  }
}

async function writeStoredMode(mode: LexusThemeMode): Promise<void> {
  if (Platform.OS === "web" && typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      // Ignore persistence failures.
    }
    return;
  }

  try {
    await AsyncStorage.setItem(STORAGE_KEY, mode);
  } catch {
    // Ignore persistence failures.
  }
}

async function readStoredPlan(): Promise<ThemePlan | null> {
  if (Platform.OS === "web" && typeof window !== "undefined") {
    try {
      const raw = window.localStorage.getItem(PLAN_STORAGE_KEY);
      if (raw === "lexus" || raw === "prestige") {
        return raw;
      }
      return null;
    } catch {
      return null;
    }
  }

  try {
    const raw = await AsyncStorage.getItem(PLAN_STORAGE_KEY);
    if (raw === "lexus" || raw === "prestige") {
      return raw;
    }
    return null;
  } catch {
    return null;
  }
}

async function writeStoredPlan(plan: ThemePlan): Promise<void> {
  if (Platform.OS === "web" && typeof window !== "undefined") {
    try {
      window.localStorage.setItem(PLAN_STORAGE_KEY, plan);
    } catch {
      // Ignore persistence failures.
    }
    return;
  }

  try {
    await AsyncStorage.setItem(PLAN_STORAGE_KEY, plan);
  } catch {
    // Ignore persistence failures.
  }
}

export function LexusThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<LexusThemeMode>("dark");
  const [plan, setPlanState] = useState<ThemePlan>("lexus");

  useEffect(() => {
    let mounted = true;

    void readStoredMode().then((stored) => {
      if (!mounted || !stored) return;
      setModeState(stored);
    });

    void readStoredPlan().then((stored) => {
      if (!mounted || !stored) return;
      setPlanState(stored);
    });

    return () => {
      mounted = false;
    };
  }, []);

  const setMode = useCallback(async (nextMode: LexusThemeMode) => {
    setModeState(nextMode);
    await writeStoredMode(nextMode);
  }, []);

  const toggleMode = useCallback(async () => {
    const nextMode: LexusThemeMode = mode === "dark" ? "light" : "dark";
    await setMode(nextMode);
  }, [mode, setMode]);

  const setPlan = useCallback(async (nextPlan: ThemePlan) => {
    setPlanState(nextPlan);
    await writeStoredPlan(nextPlan);
  }, []);

  const value = useMemo<LexusThemeContextValue>(
    () => {
      const baseColors = plan === "prestige" ? PRESTIGE_THEME[mode] : LEXUS_THEME[mode];
      return {
        mode,
        plan,
        colors: baseColors,
        isDark: mode === "dark",
        setMode,
        toggleMode,
        setPlan,
      };
    },
    [mode, plan, setMode, toggleMode, setPlan]
  );

  return <LexusThemeContext.Provider value={value}>{children}</LexusThemeContext.Provider>;
}

export function useLexusTheme(): LexusThemeContextValue {
  const context = useContext(LexusThemeContext);
  return context ?? FALLBACK_THEME_VALUE;
}
