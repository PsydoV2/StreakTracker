// app/_layout.tsx
// Must be the very first import so gesture-handler's native module loads
// before anything else touches it.
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../src/i18n";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DarkTheme, DefaultTheme, Slot, ThemeProvider } from "expo-router";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import { StreaksProvider } from "@/src/context/StreaksContext";
import { LanguageProvider } from "@/src/context/LanguageContext";
import {
  requestNotificationPermissions,
  scheduleDefaultReminders,
} from "@/src/utils/NotificationManager";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "AuthScreen",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Roboto: require("../assets/fonts/Roboto-Regular.ttf"),
    PatrickHand: require("../assets/fonts/PatrickHand-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    // Fire-and-forget: errors are handled inside each function.
    requestNotificationPermissions();
    scheduleDefaultReminders();
  }, []);

  if (!loaded) return null;

  return <RootLayoutNav />;
}

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
