import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { queryClient } from "@/lib/query-client";
import { AppProvider } from "@/contexts/AppContext";
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from "@expo-google-fonts/inter";

SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="form16/[id]" options={{ headerShown: false, presentation: "card" }} />
      <Stack.Screen name="sections/[id]" options={{ headerShown: false, presentation: "card" }} />
      <Stack.Screen name="heads/[id]" options={{ headerShown: false, presentation: "card" }} />
      <Stack.Screen name="glossary/[id]" options={{ headerShown: false, presentation: "card" }} />
      <Stack.Screen name="learn/quiz" options={{ headerShown: false, presentation: "card" }} />
      <Stack.Screen name="settings/index" options={{ headerShown: false, presentation: "card" }} />
      <Stack.Screen name="regime/index" options={{ headerShown: false, presentation: "card" }} />
      <Stack.Screen name="bookmarks/index" options={{ headerShown: false, presentation: "card" }} />
      <Stack.Screen name="checklist/index" options={{ headerShown: false, presentation: "card" }} />
      <Stack.Screen name="estimator/index" options={{ headerShown: false, presentation: "card" }} />
      <Stack.Screen name="specimen/index" options={{ headerShown: false, presentation: "card" }} />
      <Stack.Screen name="budget-changes/index" options={{ headerShown: false, presentation: "card" }} />
      <Stack.Screen name="itr-selector/index" options={{ headerShown: false, presentation: "card" }} />
      <Stack.Screen name="investment-deadlines/index" options={{ headerShown: false, presentation: "card" }} />
    </Stack>
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <KeyboardProvider>
            <AppProvider>
              <StatusBar barStyle="light-content" backgroundColor="#1B2A4A" />
              <RootLayoutNav />
            </AppProvider>
          </KeyboardProvider>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
