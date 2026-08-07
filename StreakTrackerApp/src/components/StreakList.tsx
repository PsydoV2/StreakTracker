import { ScrollView, StyleSheet } from "react-native";
import { Text, View } from "@/src/components/Themed";
import StreakElement from "@/src/components/StreakElement";
import { Streak } from "@/src/context/StreaksContext";

type Props = {
  streaks: Streak[];
  loaded: boolean;
  emptyText: string;
  onUpdateStreak: (updated: Streak) => void;
  onDeleteStreak: (id: string) => void;
  onFireConfetti: () => void;
};

/** Shared list body for the active-streaks and archive tabs. */
export default function StreakList({
  streaks,
  loaded,
  emptyText,
  onUpdateStreak,
  onDeleteStreak,
  onFireConfetti,
}: Props) {
  return (
    <View style={styles.container}>
      {loaded && streaks.length === 0 && (
        <Text style={styles.emptyHint}>{emptyText}</Text>
      )}

      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        {loaded &&
          streaks.map((streak) => (
            <StreakElement
              key={streak.id}
              {...streak}
              onUpdate={(updated) => {
                if (!updated) {
                  onDeleteStreak(streak.id);
                } else {
                  onUpdateStreak(updated);
                }
              }}
              confettiAbfeuern={onFireConfetti}
            />
          ))}
      </ScrollView>
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
