import { Stack, router } from "expo-router";
import { useColorScheme } from "react-native";
import Colors from "@/constants/Colors";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isPinVerified } from "@/src/pinSession";

const STORAGE_KEY_PIN = "StreakTrackerPin";

export default function AppLayout() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  const { t } = useTranslation();

  // Guard: redirect to AuthScreen if a PIN is set and not yet verified this session.
  useEffect(() => {
    if (isPinVerified()) return;

    AsyncStorage.getItem(STORAGE_KEY_PIN).then((pin) => {
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
