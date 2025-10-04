import React from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Link, Tabs } from "expo-router";
import { Pressable, StyleSheet } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { Text } from "@/components/Themed";
import { useTranslation } from "react-i18next";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome6>["name"];
  color: string;
}) {
  return <FontAwesome6 size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  const styles = getStyles(theme);

  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: theme.background100 },
        headerTintColor: theme.text900,
        tabBarStyle: { backgroundColor: theme.background100 },
        tabBarActiveTintColor: theme.primary500,
        tabBarInactiveTintColor: theme.background400,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="fire-flame-curved" color={color} />
          ),
          headerLeft: () => (
            <Text style={styles.header}>{t("activeStreaks")}</Text>
          ),
          headerRight: () => (
            <Link href="/settings" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome6
                    name="gears"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text900}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="archive"
        options={{
          title: "",
          headerLeft: () => (
            <Text style={styles.header}>{t("archivedStreaks")}</Text>
          ),
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="box-archive" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const getStyles = (colorPalette: typeof Colors.light) =>
  StyleSheet.create({
    header: {
      marginLeft: 16,
      fontFamily: "PatrickHand",
      color: colorPalette.text900,
      fontSize: 28,
    },
  });
