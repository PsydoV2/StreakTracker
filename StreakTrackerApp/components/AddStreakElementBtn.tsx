import Colors from "@/constants/Colors";
import { FontAwesome6 } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import * as Haptics from "expo-haptics";

type Props = {
  onAdd: (title: string, emoji: string) => void;
};

export default function AddStreakElementBtn({ onAdd }: Props) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  const styles = getStyles(theme);

  const handleAdd = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onAdd("New Streak", "📚");
  };

  return (
    <TouchableOpacity style={styles.btn} onPress={handleAdd}>
      <FontAwesome6 name="add" size={25} color="white" />
    </TouchableOpacity>
  );
}

const getStyles = (colorPalette: typeof Colors.light) =>
  StyleSheet.create({
    btn: {
      backgroundColor: colorPalette.primary500,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: 50,
      width: 50,
      borderRadius: 10,
      position: "absolute",
      bottom: 20,
      right: 20,
    },
  });
