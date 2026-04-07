import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { View, Platform, LogBox } from 'react-native';

LogBox.ignoreLogs([
  'useNativeDriver',
  'box-shadow',
  'shadow*',
  'Warning: Invalid DOM property',
]);

// ── Pseudo Auth Hook (Replace with real Zustand/Context provider later) ──
const useAuth = () => ({ isAuthenticated: false, isReady: true });

export default function RootLayout() {
  const { isAuthenticated, isReady } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isReady) return;

    const inProtectedGroup = segments[0] === '(protected)';

    // Production Auth Guards:
    // If not authenticated, kick out of the protected dashboard zone
    // if (!isAuthenticated && inProtectedGroup) {
    //   router.replace('/(public)/login');
    // } 
    // If authenticated, push straight to dashboard (bypassing public login/landing)
    // NOTE: disabled for dev prototype since we manually navigate to lexus dashboard!
    // else if (isAuthenticated && !inProtectedGroup) {
    //   router.replace('/(protected)/lexus');
    // }
  }, [isAuthenticated, isReady, segments]);

  if (!isReady) return <View style={{ flex: 1, backgroundColor: '#040c18' }} />;

  return (
    <>
      {/* Force a purely dark document body on Web to prevent edges from flashing white */}
      {Platform.OS === 'web' && (
        <style dangerouslySetInnerHTML={{ __html: 'body { background-color: #02060d; overflow-x: hidden; }' }} />
      )}
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#02060d' }, animation: 'fade' }} />
    </>
  );
}
