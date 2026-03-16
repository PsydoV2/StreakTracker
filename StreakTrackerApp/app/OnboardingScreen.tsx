// app/OnboardingScreen.tsx
import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
  ViewToken,
} from "react-native";
import { Text } from "@/components/Themed";
import { useCallback, useRef, useState } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { FontAwesome6 } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import Colors from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";

const SCREEN_WIDTH = Dimensions.get("window").width;

const STORAGE_KEY_ONBOARDED = "StreakTrackerOnboarded";
const STORAGE_KEY_LAST_VERSION = "StreakTrackerLastVersion";

type Page = {
  icon: string;
  iconColor: "primary" | "accent";
  titleKey: string;
  bodyKey: string;
};

const PAGES: Page[] = [
  {
    icon: "fire-flame-curved",
    iconColor: "accent",
    titleKey: "onboarding1Title",
    bodyKey: "onboarding1Body",
  },
  {
    icon: "circle-check",
    iconColor: "primary",
    titleKey: "onboarding2Title",
    bodyKey: "onboarding2Body",
  },
  {
    icon: "chart-simple",
    iconColor: "primary",
    titleKey: "onboarding3Title",
    bodyKey: "onboarding3Body",
  },
  {
    icon: "rocket",
    iconColor: "accent",
    titleKey: "onboarding4Title",
    bodyKey: "onboarding4Body",
  },
];

export default function OnboardingScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  const styles = getStyles(theme);
  const { t } = useTranslation();

  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setCurrentIndex(viewableItems[0].index);
      }
    },
    []
  );

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const handleNext = () => {
    if (currentIndex < PAGES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      handleComplete();
    }
  };

  const handleComplete = async () => {
    const version = Constants.expoConfig?.version ?? "0";
    await Promise.all([
      AsyncStorage.setItem(STORAGE_KEY_ONBOARDED, "true"),
      AsyncStorage.setItem(STORAGE_KEY_LAST_VERSION, version),
    ]);
    router.replace("/AuthScreen");
  };

  const renderPage = ({ item }: { item: Page }) => {
    const iconColor =
      item.iconColor === "accent" ? theme.accent500 : theme.primary500;
    const iconBg =
      item.iconColor === "accent"
        ? theme.accent500 + "18"
        : theme.primary500 + "18";

    return (
      <View style={styles.page}>
        <View style={[styles.iconWrap, { backgroundColor: iconBg }]}>
          <FontAwesome6 name={item.icon as any} size={56} color={iconColor} />
        </View>
        <Text style={styles.pageTitle}>{t(item.titleKey)}</Text>
        <Text style={styles.pageBody}>{t(item.bodyKey)}</Text>
      </View>
    );
  };

  const isLast = currentIndex === PAGES.length - 1;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background100 }]}
    >
      {/* Skip */}
      {!isLast && (
        <TouchableOpacity style={styles.skipBtn} onPress={handleComplete}>
          <Text style={styles.skipText}>{t("onboardingSkip")}</Text>
        </TouchableOpacity>
      )}

      {/* Pager */}
      <FlatList
        ref={flatListRef}
        data={PAGES}
        renderItem={renderPage}
        keyExtractor={(_, i) => String(i)}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig.current}
        style={styles.pager}
      />

      {/* Dots */}
      <View style={styles.dotsRow}>
        {PAGES.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, i === currentIndex && styles.dotActive]}
          />
        ))}
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
        <Text style={styles.nextBtnText}>
          {isLast ? t("onboardingGetStarted") : t("onboardingNext")}
        </Text>
        {!isLast && (
          <FontAwesome6
            name="arrow-right"
            size={16}
            color="white"
            style={{ marginLeft: 8 }}
          />
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const getStyles = (theme: typeof Colors.light) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
    },
    skipBtn: {
      alignSelf: "flex-end",
      paddingHorizontal: 20,
      paddingTop: 12,
      paddingBottom: 4,
    },
    skipText: {
      fontFamily: "Roboto",
      fontSize: 15,
      color: theme.text700,
    },

    pager: {
      flex: 1,
    },
    page: {
      width: SCREEN_WIDTH,
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 36,
    },
    iconWrap: {
      width: 140,
      height: 140,
      borderRadius: 36,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 40,
    },
    pageTitle: {
      fontFamily: "PatrickHand",
      fontSize: 30,
      color: theme.text900,
      textAlign: "center",
      marginBottom: 16,
    },
    pageBody: {
      fontFamily: "Roboto",
      fontSize: 16,
      color: theme.text700,
      textAlign: "center",
      lineHeight: 24,
    },

    dotsRow: {
      flexDirection: "row",
      gap: 8,
      marginBottom: 20,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.background400,
    },
    dotActive: {
      width: 24,
      backgroundColor: theme.primary500,
    },

    nextBtn: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.primary500,
      marginHorizontal: 24,
      marginBottom: 24,
      paddingVertical: 16,
      borderRadius: 14,
      width: SCREEN_WIDTH - 48,
    },
    nextBtnText: {
      fontFamily: "PatrickHand",
      fontSize: 22,
      color: "white",
    },
  });
