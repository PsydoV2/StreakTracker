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

export default function Login() {
  const colorScheme = useColorScheme();
  const colorPalette = colorScheme === "dark" ? Colors.dark : Colors.light;
  const styles = getStyles(colorPalette);

  const [digits, setDigits] = useState(["", "", "", ""]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isLoadingPin, setIsLoadingPin] = useState<boolean>();

  const { t } = useTranslation();

  const storageKeyForPin = "StreakTrackerPin";

  const inputs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  const handleChange = (text: string, index: number) => {
    const newDigits = [...digits];
    newDigits[index] = text;
    setDigits(newDigits);

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (text && index < 3) {
      inputs[index + 1].current?.focus();
    }

    if (newDigits.every((d) => d.length === 1)) {
      checkPassword(newDigits.join(""));
    }
  };

  const checkPassword = async (entered: string) => {
    let stored = await AsyncStorage.getItem(storageKeyForPin);
    if (!stored) return;

    if (entered === stored) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setIsCorrect(true);
      setTimeout(() => {
        router.replace("/");
      }, 300);
    } else {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setIsCorrect(false);
    }
  };

  useEffect(() => {
    setIsLoadingPin(true);

    const checkPin = async () => {
      const pin = await AsyncStorage.getItem(storageKeyForPin);
      if (__DEV__) console.info("Found: ", pin);

      if (!pin || pin.trim().length === 0) {
        router.replace("/");
      } else {
        setIsLoadingPin(false); // Nur wenn PIN existiert
      }
    };

    checkPin();
  }, []);

  if (isLoadingPin) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0} // ggf. anpassen
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
                ref={inputs[index]}
                style={[
                  styles.input,
                  isCorrect === true && {
                    borderColor: "green",
                    borderWidth: 2,
                  },
                  isCorrect === false && { borderColor: "red", borderWidth: 2 },
                ]}
                keyboardType="number-pad"
                secureTextEntry
                maxLength={1}
                value={digit}
                onChangeText={(text) => handleChange(text, index)}
                onKeyPress={({ nativeEvent }) => {
                  if (
                    nativeEvent.key === "Backspace" &&
                    digits[index] === "" &&
                    index > 0
                  ) {
                    inputs[index - 1].current?.focus();
                    const newDigits = [...digits];
                    newDigits[index - 1] = "";
                    setDigits(newDigits);
                    Haptics.selectionAsync();
                  }
                }}
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
