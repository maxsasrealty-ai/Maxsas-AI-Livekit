import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';

const C = {
  bg: '#040c18',
  blue: '#4F8CFF',
  white: '#ffffff',
  textMuted: 'rgba(232,237,245,0.65)'
};

export default function NativeIntroScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Elegant fade in for the brand mark
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // After 1.5 seconds, bounce them to the login or native feed payload.
    const timer = setTimeout(() => {
      router.replace('/(public)/login');
    }, 1500);

    return () => clearTimeout(timer);
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.brandWrap, { opacity: fadeAnim }]}>
        <View style={styles.logoBox}>
          <Text style={styles.logoIcon}>🏠</Text>
        </View>
        <Text style={styles.brandTitle}>Maxsas AI</Text>
        <Text style={styles.brandSubtitle}>Intelligent Real Estate Agents</Text>
      </Animated.View>
      
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color={C.blue} style={{ marginBottom: 12 }} />
        <Text style={styles.loadingText}>Loading Workspace...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandWrap: {
    alignItems: 'center',
  },
  logoBox: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: 'rgba(79,140,255,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(79,140,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: C.blue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  logoIcon: {
    fontSize: 32,
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: C.white,
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  brandSubtitle: {
    fontSize: 14,
    color: C.blue,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  footerLoader: {
    position: 'absolute',
    bottom: 60,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 12,
    color: C.textMuted,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 1,
  }
});
