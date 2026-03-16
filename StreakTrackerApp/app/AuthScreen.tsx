// app/AuthScreen.tsx
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  useColorScheme,
} from "react-native";
import { Text, View } from "@/components/Themed";
import { router } from "expo-router";
import Colors from "@/constants/Colors";
import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";
import { useTranslation } from "react-i18next";
import { markPinVerified } from "@/src/pinSession";

const STORAGE_KEY_PIN = "StreakTrackerPin";

export default function AuthScreen() {
  const colorScheme = useColorScheme();
  const colorPalette = colorScheme === "dark" ? Colors.dark : Colors.light;
  const styles = getStyles(colorPalette);

  const [digits, setDigits] = useState(["", "", "", ""]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isLoadingPin, setIsLoadingPin] = useState(true);

  const { t } = useTranslation();

  // useRef array – stable across renders, no Rules-of-Hooks violation.
  const inputs = useRef<Array<TextInput | null>>([null, null, null, null]);

  useEffect(() => {
    const checkPin = async () => {
      try {
        const pin = await AsyncStorage.getItem(STORAGE_KEY_PIN);
        if (__DEV__)
          console.info("[AuthScreen] Stored PIN found:", pin !== null);

        if (!pin || pin.trim().length === 0) {
          markPinVerified();
          router.replace("/");
        } else {
          setIsLoadingPin(false);
        }
      } catch (error) {
        console.error("[AuthScreen] Failed to read PIN:", error);
        // Fail open: if storage is broken, skip the lock screen.
        router.replace("/");
      }
    };

    checkPin();
  }, []);

  const handleChange = (text: string, index: number) => {
    const newDigits = [...digits];
    newDigits[index] = text;
    setDigits(newDigits);

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (text && index < 3) {
      inputs.current[index + 1]?.focus();
    }

    if (newDigits.every((d) => d.length === 1)) {
      checkPassword(newDigits.join(""));
    }
  };

  const handleBackspace = (key: string, index: number) => {
    if (key === "Backspace" && digits[index] === "" && index > 0) {
      inputs.current[index - 1]?.focus();
      const newDigits = [...digits];
      newDigits[index - 1] = "";
      setDigits(newDigits);
      Haptics.selectionAsync();
    }
  };

  const checkPassword = async (entered: string) => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY_PIN);
      if (!stored) return;

      if (entered === stored) {
        await Haptics.notificationAsync(
          Haptics.NotificationFeedbackType.Success,
        );
        markPinVerified();
        setIsCorrect(true);
        setTimeout(() => router.replace("/"), 300);
      } else {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        setIsCorrect(false);
        // Reset digits so the user can try again immediately.
        setTimeout(() => {
          setDigits(["", "", "", ""]);
          setIsCorrect(null);
          inputs.current[0]?.focus();
        }, 600);
      }
    } catch (error) {
      console.error("[AuthScreen] Failed to verify PIN:", error);
    }
  };

  if (isLoadingPin) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>Streak Tracker</Text>
          <Text style={styles.paragraph}>{t("subTitleStart")}</Text>

          <View style={styles.inputCon}>
            {digits.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => {
                  inputs.current[index] = ref;
                }}
                style={[
                  styles.input,
                  isCorrect === true && styles.inputSuccess,
                  isCorrect === false && styles.inputError,
                ]}
                keyboardType="number-pad"
                secureTextEntry
                maxLength={1}
                value={digit}
                onChangeText={(text) => handleChange(text, index)}
                onKeyPress={({ nativeEvent }) =>
                  handleBackspace(nativeEvent.key, index)
                }
              />
            ))}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const getStyles = (colorPalette: typeof Colors.light) =>
  StyleSheet.create({
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
      flex: 1,
      paddingHorizontal: 24,
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      fontSize: 48,
      textAlign: "center",
      marginBottom: 12,
      color: colorPalette.text950,
      fontFamily: "PatrickHand",
    },
    paragraph: {
      fontSize: 14,
      textAlign: "center",
      marginBottom: 24,
      color: colorPalette.text900,
      fontFamily: "Roboto",
    },
    input: {
      borderWidth: 1,
      borderRadius: 6,
      width: 40,
      height: 60,
      marginHorizontal: 5,
      backgroundColor: colorPalette.background200,
      color: colorPalette.text950,
      textAlign: "center",
      fontSize: 24,
      fontFamily: "Roboto",
      borderColor: "transparent",
    },
    inputSuccess: {
      borderColor: "green",
      borderWidth: 2,
    },
    inputError: {
      borderColor: "red",
      borderWidth: 2,
    },
    inputCon: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      width: "100%",
      maxWidth: 200,
      marginBottom: 12,
    },
    logo: {
      width: 200,
      height: 200,
      marginBottom: 32,
    },
  });
