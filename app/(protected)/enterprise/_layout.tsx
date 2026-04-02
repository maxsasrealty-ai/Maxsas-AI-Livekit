import { Tabs } from "expo-router";
import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

import { CallsProvider } from "../../../context/CallsContext";
import { useWorkspaceProfile } from "../../../hooks/useWorkspaceProfile";

function EnterpriseTabs() {
  const { vocabulary } = useWorkspaceProfile();

  return (
    <Tabs
      screenOptions={{
        sceneStyle: { backgroundColor: "#050f1f" },
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: Platform.OS === "web" ? 22 : 10,
          alignSelf: "center",
          width: Platform.OS === "web" ? "98%" : "auto",
          maxWidth: 1180,
          marginHorizontal: Platform.OS === "web" ? "auto" : 10,
          left: Platform.OS === "web" ? 0 : 10,
          right: Platform.OS === "web" ? 0 : 10,
          height: 66,
          borderRadius: 20,
          backgroundColor: "rgba(5,15,30,0.97)",
          borderWidth: 1,
          borderColor: "rgba(79,140,255,0.22)",
          elevation: 10,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#4F8CFF",
        tabBarInactiveTintColor: "rgba(232,237,245,0.58)",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <View style={s.iconWrap}>
              <Text style={[s.icon, { color }]}>🏢</Text>
            </View>
          ),
          tabBarLabel: "Dashboard",
        }}
      />
      <Tabs.Screen
        name="campaigns/index"
        options={{
          tabBarIcon: ({ color }) => (
            <View style={s.iconWrap}>
              <Text style={[s.icon, { color }]}>🎯</Text>
            </View>
          ),
          tabBarLabel: vocabulary.campaignsLabel,
        }}
      />
      <Tabs.Screen
        name="calls"
        options={{
          tabBarIcon: ({ color }) => (
            <View style={s.iconWrap}>
              <Text style={[s.icon, { color }]}>📞</Text>
            </View>
          ),
          tabBarLabel: vocabulary.callsLabel,
        }}
      />
      <Tabs.Screen
        name="contacts/index"
        options={{
          tabBarIcon: ({ color }) => (
            <View style={s.iconWrap}>
              <Text style={[s.icon, { color }]}>👥</Text>
            </View>
          ),
          tabBarLabel: "Contacts",
        }}
      />
      <Tabs.Screen
        name="teams/index"
        options={{
          tabBarIcon: ({ color }) => (
            <View style={s.iconWrap}>
              <Text style={[s.icon, { color }]}>🧑‍💼</Text>
            </View>
          ),
          tabBarLabel: "Teams",
        }}
      />
      <Tabs.Screen
        name="settings/index"
        options={{
          tabBarIcon: ({ color }) => (
            <View style={s.iconWrap}>
              <Text style={[s.icon, { color }]}>⚙️</Text>
            </View>
          ),
          tabBarLabel: "Settings",
        }}
      />
      <Tabs.Screen
        name="billing"
        options={{
          tabBarIcon: ({ color }) => (
            <View style={s.iconWrap}>
              <Text style={[s.icon, { color }]}>💳</Text>
            </View>
          ),
          tabBarLabel: "Billing",
        }}
      />
      <Tabs.Screen name="campaigns/[id]" options={{ href: null }} />
      <Tabs.Screen name="contacts/[id]" options={{ href: null }} />
    </Tabs>
  );
}

export default function EnterpriseLayout() {
  return (
    <CallsProvider>
      <View style={s.webWrapper}>
        <EnterpriseTabs />
      </View>
    </CallsProvider>
  );
}

const s = StyleSheet.create({
  webWrapper: {
    flex: 1,
    backgroundColor: "#040913",
    ...(Platform.OS === "web"
      ? {
          alignSelf: "center",
          width: "100%",
          maxWidth: 1180,
          borderLeftWidth: 1,
          borderRightWidth: 1,
          borderColor: "rgba(79,140,255,0.10)",
        }
      : {}),
  },
  iconWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 19,
  },
});
