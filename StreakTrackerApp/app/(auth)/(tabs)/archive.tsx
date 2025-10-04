import { Dimensions, ScrollView, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import StreakElement from "@/components/StreakElement";
import { useStreaks } from "@/src/context/StreaksContext";
import { useState } from "react";
import ConfettiCannon from "react-native-confetti-cannon";

export default function TabTwoScreen() {
  const { streaks, loaded, addStreak, updateStreak, deleteStreak } =
    useStreaks();

  const [showConfetti, setShowConfetti] = useState(false);

  const screenWidth = Dimensions.get("window").width;

  const handleConfettiAbfeuern = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <View style={styles.container}>
      {loaded && streaks.filter((s) => s.archived).length === 0 && (
        <Text
          style={{
            marginTop: 20,
            opacity: 0.6,
            fontFamily: "PatrickHand",
            fontSize: 22,
            width: "100%",
            textAlign: "center",
          }}
        >
          No archived streaks yet.
        </Text>
      )}

      <ScrollView showsVerticalScrollIndicator={false}>
        {loaded &&
          streaks
            .filter((s) => s.archived)
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
