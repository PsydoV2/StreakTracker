import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import Colors from "@/constants/Colors";
import { useTranslation } from "react-i18next";

export default function AppLayout() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  const { t } = useTranslation();

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
        options={{ presentation: "modal", title: t("settings") }}
      />
    </Stack>
  );
}
