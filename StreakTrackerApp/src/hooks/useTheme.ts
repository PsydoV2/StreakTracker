import Colors from "@/src/constants/Colors";
import { useColorScheme } from "./useColorScheme";

/** Resolves the current color scheme straight to the matching Colors palette. */
export function useTheme() {
  const scheme = useColorScheme();
  return scheme === "dark" ? Colors.dark : Colors.light;
}
