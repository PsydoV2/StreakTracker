// app/(auth)/(tabs)/archive.tsx
import { StyleSheet } from "react-native";
import { View } from "@/src/components/Themed";
import StreakList from "@/src/components/StreakList";
import StreakConfetti, {
  StreakConfettiHandle,
} from "@/src/components/StreakConfetti";
import { useStreaks } from "@/src/context/StreaksContext";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

export default function ArchiveScreen() {
  const { streaks, loaded, updateStreak, deleteStreak } = useStreaks();
  const { t } = useTranslation();

  const confettiRef = useRef<StreakConfettiHandle>(null);

  const archivedStreaks = loaded ? streaks.filter((s) => s.archived) : [];

  return (
    <View style={styles.container}>
      <StreakList
        streaks={archivedStreaks}
        loaded={loaded}
        emptyText={t("noArchivedStreaksYet")}
        onUpdateStreak={updateStreak}
        onDeleteStreak={deleteStreak}
        onFireConfetti={() => confettiRef.current?.fire()}
      />

      <StreakConfetti ref={confettiRef} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
