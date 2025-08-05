import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { AuthProvider } from '@/hooks/useAuth';
import { PlatformProvider } from '@/hooks/usePlatforms';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <AuthProvider>
      <PlatformProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="light" />
      </PlatformProvider>
    </AuthProvider>
  );
}