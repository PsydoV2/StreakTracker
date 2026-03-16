// app/(auth)/(tabs)/archive.tsx
import { Dimensions, ScrollView, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import StreakElement from "@/components/StreakElement";
import { useStreaks } from "@/src/context/StreaksContext";
import { useEffect, useRef, useState } from "react";
import ConfettiCannon from "react-native-confetti-cannon";
import { useTranslation } from "react-i18next";

export default function ArchiveScreen() {
  const { streaks, loaded, updateStreak, deleteStreak } = useStreaks();
  const { t } = useTranslation();

  const [showConfetti, setShowConfetti] = useState(false);
  const confettiTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    return () => {
      if (confettiTimer.current) clearTimeout(confettiTimer.current);
    };
  }, []);

  const handleConfettiAbfeuern = () => {
    setShowConfetti(true);
    confettiTimer.current = setTimeout(() => setShowConfetti(false), 3000);
  };

  const archivedStreaks = loaded ? streaks.filter((s) => s.archived) : [];

  return (
    <View style={styles.container}>
      {loaded && archivedStreaks.length === 0 && (
        <Text style={styles.emptyHint}>{t("noArchivedStreaksYet")}</Text>
      )}

      <ScrollView showsVerticalScrollIndicator={false}>
        {archivedStreaks.map((streak) => (
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
