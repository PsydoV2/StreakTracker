import { Stack, router } from "expo-router";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isPinVerified } from "@/src/pinSession";
import { STORAGE_KEYS } from "@/src/constants/storageKeys";
import { useTheme } from "@/src/hooks/useTheme";
import { useColorScheme } from "@/src/hooks/useColorScheme";

export default function AppLayout() {
  const colorScheme = useColorScheme();
  const theme = useTheme();

  const { t } = useTranslation();

  // Guard: redirect to AuthScreen if a PIN is set and not yet verified this session.
  useEffect(() => {
    if (isPinVerified()) return;

    AsyncStorage.getItem(STORAGE_KEYS.pin).then((pin) => {
      if (pin && pin.trim().length > 0) {
        router.replace("/AuthScreen");
      }
    });
  }, []);

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.background100 },
        headerTintColor: theme.text900,
        contentStyle: { backgroundColor: theme.background100 },
        statusBarStyle: colorScheme === "dark" ? "light" : "dark",
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="settings"
        options={{
          presentation: "modal",
          title: t("settings"),
          headerTitleStyle: {
            fontFamily: "PatrickHand",
            fontSize: 26,
          },
          headerStyle: {
            backgroundColor: theme.background100,
          },
          headerTintColor: theme.text900,
        }}
      />
    </Stack>
  );
}
