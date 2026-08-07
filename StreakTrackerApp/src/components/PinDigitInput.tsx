import { RefObject } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Colors from "@/src/constants/Colors";

export type DigitStatus = "idle" | "filled" | "success" | "error";

type Props = {
  digits: string[];
  onChangeDigit: (text: string, index: number) => void;
  onKeyPressDigit?: (key: string, index: number) => void;
  inputsRef: RefObject<(TextInput | null)[]>;
  status: DigitStatus | ((digit: string, index: number) => DigitStatus);
  size?: "sm" | "lg";
  theme: typeof Colors.light;
};

/** Row of 4 single-digit boxes shared by the unlock screen and the PIN setup modal. */
export default function PinDigitInput({
  digits,
  onChangeDigit,
  onKeyPressDigit,
  inputsRef,
  status,
  size = "sm",
  theme,
}: Props) {
  const styles = getStyles(theme, size);

  return (
    <View style={styles.row}>
      {digits.map((digit, index) => {
        const digitStatus =
          typeof status === "function" ? status(digit, index) : status;

        return (
          <TextInput
            key={index}
            ref={(ref) => {
              inputsRef.current[index] = ref;
            }}
            style={[
              styles.box,
              digitStatus === "filled" && styles.boxFilled,
              digitStatus === "success" && styles.boxSuccess,
              digitStatus === "error" && styles.boxError,
            ]}
            keyboardType="number-pad"
            secureTextEntry
            maxLength={1}
            value={digit}
            onChangeText={(text) => onChangeDigit(text, index)}
            onKeyPress={
              onKeyPressDigit
                ? ({ nativeEvent }) => onKeyPressDigit(nativeEvent.key, index)
                : undefined
            }
          />
        );
      })}
    </View>
  );
}

const getStyles = (colors: typeof Colors.light, size: "sm" | "lg") =>
  StyleSheet.create({
    row: {
      flexDirection: "row",
      justifyContent: size === "sm" ? "space-evenly" : undefined,
      gap: size === "lg" ? 12 : undefined,
      width: size === "sm" ? "100%" : undefined,
      maxWidth: size === "sm" ? 200 : undefined,
    },
    box: {
      borderWidth: size === "sm" ? 1 : 2,
      borderRadius: size === "sm" ? 6 : 12,
      width: size === "sm" ? 40 : 56,
      height: size === "sm" ? 60 : 68,
      marginHorizontal: size === "sm" ? 5 : 0,
      backgroundColor: colors.background200,
      color: size === "sm" ? colors.text950 : colors.text900,
      textAlign: "center",
      fontSize: size === "sm" ? 24 : 26,
      fontFamily: "Roboto",
      borderColor: size === "sm" ? "transparent" : colors.background300,
    },
    boxFilled: {
      borderColor: colors.primary500,
      backgroundColor: colors.primary500 + "12",
    },
    boxSuccess: {
      borderColor: "green",
      borderWidth: 2,
    },
    boxError: {
      borderColor: size === "sm" ? "red" : colors.secondary500,
      borderWidth: 2,
      backgroundColor: size === "sm" ? undefined : colors.secondary500 + "10",
    },
  });
