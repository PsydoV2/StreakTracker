import "react-native-gesture-handler";
import "../src/i18n"; // Wichtig: ganz am Anfang importieren
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "AuthScreen",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Roboto: require("../assets/fonts/Roboto-Regular.ttf"),
    PatrickHand: require("../assets/fonts/PatrickHand-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    requestNotificationPermissions();
    scheduleDefaultReminders();
  }, []);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}
import { Slot } from "expo-router";
import { StreaksProvider } from "@/src/context/StreaksContext";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { LanguageProvider } from "@/src/context/LanguageContext";
import {
  requestNotificationPermissions,
  scheduleDefaultReminders,
} from "@/src/utils/NotificationManager";

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <StreaksProvider>
          <LanguageProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <BottomSheetModalProvider>
                <Slot />
              </BottomSheetModalProvider>
            </GestureHandlerRootView>
          </LanguageProvider>
        </StreaksProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
