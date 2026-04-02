import React from 'react';
import { Platform, View, ActivityIndicator } from 'react-native';
import NativeIntroScreen from './index.native';
// Note: We cannot directly import index.web without fighting Metro bundler on native.

// Expo Router requires a base file without a platform extension to map the route.
// Metro Bundler automatically prefers `index.web.tsx` on web, and `index.native.tsx` on native platforms.
// If for any reason those fail to register, this acts as the universal fallback.

export default function IndexFallback() {
  if (Platform.OS === 'web') {
    // If we get here on web, it means index.web.tsx wasn't picked up for some reason.
    // In normal Expo execution, this file is entirely bypassed by index.web.tsx.
    return (
      <View style={{ flex: 1, backgroundColor: '#050507', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4F8CFF" />
      </View>
    );
  }

  // Fallback to the Native wrapper
  return <NativeIntroScreen />;
}
