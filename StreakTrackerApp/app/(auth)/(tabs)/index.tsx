import { Button, Dimensions, ScrollView, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import StreakElement from "@/components/StreakElement";
import AddStreakElementBtn from "@/components/AddStreakElementBtn";
import { useStreaks } from "@/src/context/StreaksContext"; // 👈 importieren
import { useCallback, useEffect, useState } from "react";
import ConfettiCannon from "react-native-confetti-cannon";
import { useFocusEffect } from "expo-router";
import { updateEveningReminder } from "@/src/utils/NotificationManager";

export default function TabOneScreen() {
  const { streaks, loaded, addStreak, updateStreak, deleteStreak } =
    useStreaks();
  const [showConfetti, setShowConfetti] = useState(false);

  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    if (loaded && streaks.length === 0) {
      // Beispielstreak nur beim allerersten Start
      addStreak("Read a book", "📚");
    }
  }, [loaded]);

  useFocusEffect(
    useCallback(() => {
      if (loaded) {
        updateEveningReminder(streaks);
      }
    }, [streaks, loaded])
  );

  const handleConfettiAbfeuern = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {loaded &&
          streaks
            .filter((s) => !s.archived)
            .map((streak) => (
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
          origin={{ x: screenWidth / 2, y: 0 }} // mittig oben
          fallSpeed={3000} // langsamer, schöner Fall
          explosionSpeed={0} // keine Explosion
          fadeOut={true}
          autoStart={true}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
