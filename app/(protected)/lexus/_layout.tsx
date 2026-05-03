import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { CallsProvider } from '../../../context/CallsContext';
import { LexusThemeProvider, useLexusTheme } from '../../../context/LexusThemeContext';

const TAB_LABEL_STYLE = {
  fontSize: Platform.OS === 'web' ? 11 : 10,
  fontWeight: '700' as const,
  marginTop: 2,
};

function LexusTabs() {
  const { colors, isDark } = useLexusTheme();

  return (
    <Tabs
      screenOptions={{
        sceneStyle: { backgroundColor: colors.bg },
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: 'absolute',
          bottom: Platform.OS === 'web' ? 18 : 12,
          alignSelf: 'center',
          width: Platform.OS === 'web' ? '100%' : 'auto',
          maxWidth: Platform.OS === 'web' ? 1120 : 900,
          marginHorizontal: Platform.OS === 'web' ? 'auto' : 16,
          left: Platform.OS === 'web' ? 20 : 16,
          right: Platform.OS === 'web' ? 20 : 16,
          height: Platform.OS === 'web' ? 68 : 74,
          borderRadius: Platform.OS === 'web' ? 22 : 26,
          paddingTop: Platform.OS === 'web' ? 10 : 8,
          paddingBottom: Platform.OS === 'web' ? 10 : 8,
          backgroundColor: isDark ? 'rgba(4,12,24,0.94)' : 'rgba(255,255,255,0.96)',
          borderWidth: 1,
          borderColor: colors.border,
          shadowColor: colors.shadow,
          shadowOpacity: isDark ? 0.35 : 0.14,
          shadowRadius: 18,
          shadowOffset: { width: 0, height: 8 },
          elevation: 12,
        },
        tabBarItemStyle: {
          borderRadius: Platform.OS === 'web' ? 16 : 18,
          marginHorizontal: Platform.OS === 'web' ? 6 : 4,
          marginVertical: 4,
          paddingVertical: 6,
        },
        tabBarLabelStyle: TAB_LABEL_STYLE,
        tabBarIconStyle: {
          marginTop: 1,
        },
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.blue,
        tabBarInactiveTintColor: colors.textFaint,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color, fontSize: Platform.OS === 'web' ? 18 : 20 }}>🏠</Text>
            </View>
          ),
          tabBarLabel: 'Home',
        }}
      />
      <Tabs.Screen
        name="leads-upload"
        options={{
          tabBarIcon: ({ color }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color, fontSize: Platform.OS === 'web' ? 18 : 20 }}>📞</Text>
            </View>
          ),
          tabBarLabel: 'Upload',
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          tabBarIcon: ({ color }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color, fontSize: Platform.OS === 'web' ? 18 : 20 }}>💳</Text>
            </View>
          ),
          tabBarLabel: 'Wallet',
        }}
      />
      <Tabs.Screen
        name="calls"
        options={{
          tabBarIcon: ({ color }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color, fontSize: Platform.OS === 'web' ? 18 : 20 }}>📈</Text>
            </View>
          ),
          tabBarLabel: 'Reports',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color, fontSize: Platform.OS === 'web' ? 18 : 20 }}>👤</Text>
            </View>
          ),
          tabBarLabel: 'Profile',
        }}
      />
    </Tabs>
  );
}

export default function LexusLayout() {
  return (
    <LexusThemeProvider>
      <CallsProvider>
        <WebFrame>
          <LexusTabs />
        </WebFrame>
      </CallsProvider>
    </LexusThemeProvider>
  );
}

function WebFrame({ children }: { children: React.ReactNode }) {
  const { colors } = useLexusTheme();

  return (
    <View style={[s.webWrapper, { backgroundColor: colors.bgSoft, borderColor: colors.border }]}> 
      {children}
    </View>
  );
}

const s = StyleSheet.create({
  webWrapper: {
    flex: 1,
    ...(Platform.OS === 'web'
      ? {
          alignSelf: 'center',
          width: '100%',
          maxWidth: 1120,
          borderLeftWidth: 1,
          borderRightWidth: 1,
        }
      : {}),
  },
});
