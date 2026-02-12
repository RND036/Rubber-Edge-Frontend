// app/_layout.tsx

// Blockchain polyfills - MUST be at the very top
import 'react-native-get-random-values';
import { Buffer } from 'buffer';
global.Buffer = global.Buffer || Buffer;

import { Stack, useRouter, useSegments } from 'expo-router';
import * as ExpoSplash from 'expo-splash-screen';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { LanguageProvider } from '../context/LanguageContext';
import { BlockchainProvider } from '../context/BlockchainContext';
import { useNotificationWebSocket } from '../hooks/useNotificationWebSocket';

// Prevent auto hide BEFORE the UI mounts
ExpoSplash.preventAutoHideAsync().catch(() => { });

import SplashScreen from './splash'; // your Lottie component

// Inner component that uses auth context
function RootLayoutNav() {
  const router = useRouter();
  const segments = useSegments();
  const { user, isLoading } = useAuth();

  // Initialize WebSocket connection
  useNotificationWebSocket();

  // Route user based on auth state
  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';

    // Not logged in → redirect to auth
    if (!user && !inAuthGroup) {
      router.replace('/(auth)/signin');
    }
    // Logged in → redirect based on role
    else if (user && inAuthGroup) {
      // User is logged in but still in auth group, redirect to appropriate dashboard
      if (user.role === 'farmer') {
        router.replace('/(tabs)');
      } else if (user.role === 'buyer') {
        router.replace('/(buyer)');
      } else if (user.role === 'officer') {
        router.replace('/(officer)');
      }
    }
  }, [user, segments, isLoading]);

  // Log user info when available
  useEffect(() => {
    if (user) {
      console.log('👤 User logged in:', user.id, user.role);
    }
  }, [user]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#2E7D32" />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false, // Hide default headers since custom headers are used
      }}
    />
  );
}

export default function RootLayout() {
  const [appReady, setAppReady] = useState(false);
  const [showLottie, setShowLottie] = useState(false);

  // 1) Initial app load - preload assets
  useEffect(() => {
    (async () => {
      try {
        // Preload fonts/assets/config here
        // e.g. await Font.loadAsync({...});
      } catch (e) {
        console.warn('Startup preload error:', e);
      } finally {
        // Hide native splash ASAP
        await ExpoSplash.hideAsync().catch(() => { });
        setAppReady(true);
        // Show in-app Lottie
        setShowLottie(true);
      }
    })();
  }, []);

  // 2) Handle Lottie animation finish
  const handleLottieFinish = useCallback(async () => {
    setShowLottie(false);
  }, []);

  // While preloading, render nothing
  if (!appReady) return null;

  // Show Lottie splash after native splash is hidden
  if (showLottie) {
    return <SplashScreen onAnimationFinish={handleLottieFinish} />;
  }

  // Your real app screens wrapped in AuthProvider, LanguageProvider, and BlockchainProvider
  return (
    <LanguageProvider>
      <AuthProvider>
        <BlockchainProvider>
          <RootLayoutNav />
        </BlockchainProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
