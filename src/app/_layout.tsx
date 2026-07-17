import { ClerkProvider, useAuth } from '@clerk/expo';
import { tokenCache } from '@clerk/expo/token-cache';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import { useAppFonts } from '@/hooks/use-app-fonts';
import { palette } from '@/theme';

SplashScreen.preventAutoHideAsync();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error(
    'Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY. Add it to .env.local (Clerk Dashboard → API keys).',
  );
}

export default function RootLayout() {
  // `tokenCache` persists the session in the device keychain (expo-secure-store)
  // so it survives restarts; on web it's undefined and Clerk uses web storage.
  return (
    <ClerkProvider publishableKey={publishableKey!} tokenCache={tokenCache}>
      <RootNavigator />
    </ClerkProvider>
  );
}

function RootNavigator() {
  const { ready } = useAppFonts();
  const { isLoaded } = useAuth();
  // Hold the splash until fonts AND Clerk are ready, so the first frame already
  // reflects the real session state (no signed-out flash before signed-in).
  const appReady = ready && isLoaded;

  useEffect(() => {
    if (appReady) SplashScreen.hideAsync();
  }, [appReady]);

  if (!appReady) return null;

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: palette.ink900 },
        }}
      />
    </>
  );
}
