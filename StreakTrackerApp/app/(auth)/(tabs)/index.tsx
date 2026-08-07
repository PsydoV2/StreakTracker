// app/(auth)/(tabs)/index.tsx
import { StyleSheet } from "react-native";
import { View } from "@/src/components/Themed";
import StreakList from "@/src/components/StreakList";
import AddStreakElementBtn from "@/src/components/AddStreakElementBtn";
import StreakConfetti, {
  StreakConfettiHandle,
} from "@/src/components/StreakConfetti";
import { useStreaks } from "@/src/context/StreaksContext";
import { useCallback, useEffect, useRef } from "react";
import { useFocusEffect } from "expo-router";
import { updateEveningReminder } from "@/src/utils/NotificationManager";
import { useTranslation } from "react-i18next";

export default function TabOneScreen() {
  const { streaks, loaded, addStreak, updateStreak, deleteStreak } =
    useStreaks();
  const { t } = useTranslation();

  const confettiRef = useRef<StreakConfettiHandle>(null);

  // Add a sample streak only on the very first launch (empty storage).
  // Guarded by didSeedRef, so this can never fire twice even though
  // addStreak (from context) gets a new identity on every provider render.
  const didSeedRef = useRef(false);
  useEffect(() => {
    if (loaded && streaks.length === 0 && !didSeedRef.current) {
      didSeedRef.current = true;
      addStreak("Read a book", "📚");
    }
  }, [loaded, streaks.length, addStreak]);

  // Update the evening notification whenever the screen comes into focus.
  useFocusEffect(
    useCallback(() => {
      if (loaded) {
        updateEveningReminder(streaks);
      }
    }, [streaks, loaded]),
  );

  const activeStreaks = loaded ? streaks.filter((s) => !s.archived) : [];

  return (
    <View style={styles.container}>
      <StreakList
        streaks={activeStreaks}
        loaded={loaded}
        emptyText={t("emptyStateActive")}
        onUpdateStreak={updateStreak}
        onDeleteStreak={deleteStreak}
        onFireConfetti={() => confettiRef.current?.fire()}
      />

      <AddStreakElementBtn onAdd={addStreak} />

      <StreakConfetti ref={confettiRef} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
