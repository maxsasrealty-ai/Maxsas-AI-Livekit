import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { CallsProvider } from '../../../context/CallsContext';
import { useCapabilities } from '../../../hooks/useCapabilities';

function LexusTabs() {
  const { vocabulary } = useCapabilities();

  return (
    <Tabs
      screenOptions={{
        sceneStyle: { backgroundColor: '#040c18' },
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: Platform.OS === 'web' ? 24 : 12,
          alignSelf: 'center',
          width: Platform.OS === 'web' ? '95%' : 'auto',
          maxWidth: 1024,
          marginHorizontal: Platform.OS === 'web' ? 'auto' : 16,
          left: Platform.OS === 'web' ? 0 : 16,
          right: Platform.OS === 'web' ? 0 : 16,
          height: 64,
          borderRadius: 24,
          backgroundColor: 'rgba(4,12,24,0.94)',
          borderWidth: 1,
          borderColor: 'rgba(79,140,255,0.25)',
          shadowColor: '#000',
          shadowOpacity: 0.35,
          shadowRadius: 18,
          shadowOffset: { width: 0, height: 8 },
          elevation: 12,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#4F8CFF',
        tabBarInactiveTintColor: 'rgba(232,237,245,0.55)',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color, fontSize: 20 }}>🏠</Text>
            </View>
          ),
          tabBarLabel: 'Home',
        }}
      />
      <Tabs.Screen
        name="batches/index"
        options={{
          tabBarIcon: ({ color }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color, fontSize: 20 }}>📞</Text>
            </View>
          ),
          tabBarLabel: vocabulary.leadsLabel,
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          tabBarIcon: ({ color }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color, fontSize: 20 }}>💳</Text>
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
              <Text style={{ color, fontSize: 20 }}>📈</Text>
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
              <Text style={{ color, fontSize: 20 }}>👤</Text>
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
    <CallsProvider>
      <View style={s.webWrapper}>
        <LexusTabs />
      </View>
    </CallsProvider>
  );
}

const s = StyleSheet.create({
  webWrapper: {
    flex: 1,
    backgroundColor: '#02060d', // Darker background outside the SaaS frame on mega-widescreens
    // Center it on Web and restrict the width to look like a desktop app:
    ...(Platform.OS === 'web'
      ? {
          alignSelf: 'center',
          width: '100%',
          maxWidth: 1024,
          overflow: 'hidden',
          borderLeftWidth: 1,
          borderRightWidth: 1,
          borderColor: 'rgba(79,140,255,0.1)',
        }
      : {}),
  },
});
