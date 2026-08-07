// app/(auth)/(tabs)/index.tsx
import { Dimensions, ScrollView, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import StreakElement from "@/components/StreakElement";
import AddStreakElementBtn from "@/components/AddStreakElementBtn";
import { useStreaks } from "@/src/context/StreaksContext";
import { useCallback, useEffect, useRef, useState } from "react";
import ConfettiCannon from "react-native-confetti-cannon";
import { useFocusEffect } from "expo-router";
import { updateEveningReminder } from "@/src/utils/NotificationManager";
import { useTranslation } from "react-i18next";

export default function TabOneScreen() {
  const { streaks, loaded, addStreak, updateStreak, deleteStreak } =
    useStreaks();
  const { t } = useTranslation();

  const [showConfetti, setShowConfetti] = useState(false);
  const confettiTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const screenWidth = Dimensions.get("window").width;

  // Add a sample streak only on the very first launch (empty storage).
  // addStreak is intentionally excluded: the didSeedRef guard already
  // ensures this only ever fires once, so re-running it when addStreak's
  // identity changes would add nothing but risk.
  const didSeedRef = useRef(false);
  useEffect(() => {
    if (loaded && streaks.length === 0 && !didSeedRef.current) {
      didSeedRef.current = true;
      addStreak("Read a book", "📚");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, streaks.length]);

  // Update the evening notification whenever the screen comes into focus.
  useFocusEffect(
    useCallback(() => {
      if (loaded) {
        updateEveningReminder(streaks);
      }
    }, [streaks, loaded]),
  );

  // Clear the confetti timer on unmount to avoid state updates on an
  // unmounted component.
  useEffect(() => {
    return () => {
      if (confettiTimer.current) clearTimeout(confettiTimer.current);
    };
  }, []);

  const handleConfettiAbfeuern = () => {
    setShowConfetti(true);
    confettiTimer.current = setTimeout(() => setShowConfetti(false), 3000);
  };

  const activeStreaks = loaded ? streaks.filter((s) => !s.archived) : [];

  return (
    <View style={styles.container}>
      {loaded && activeStreaks.length === 0 && (
        <Text style={styles.emptyHint}>{t("emptyStateActive")}</Text>
      )}
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        {loaded &&
          activeStreaks.map((streak) => (
            <StreakElement
              key={streak.id}
              {...streak}
              onUpdate={(updated) => {
                if (!updated) {
                  deleteStreak(streak.id);
                } else {
                  updateStreak(updated);
                }
              }}
              confettiAbfeuern={handleConfettiAbfeuern}
            />
          ))}
      </ScrollView>

      <AddStreakElementBtn onAdd={addStreak} />

      {showConfetti && (
        <ConfettiCannon
          count={80}
          origin={{ x: screenWidth / 2, y: 0 }}
          fallSpeed={3000}
          explosionSpeed={0}
          fadeOut
          autoStart
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyHint: {
    marginTop: 20,
    opacity: 0.6,
    fontFamily: "PatrickHand",
    fontSize: 22,
    width: "100%",
    textAlign: "center",
  },
});
