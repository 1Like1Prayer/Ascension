import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import { useAppFonts } from '@/hooks/use-app-fonts';
import { palette } from '@/theme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { ready } = useAppFonts();

  useEffect(() => {
    if (ready) SplashScreen.hideAsync();
  }, [ready]);

  if (!ready) return null;

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
