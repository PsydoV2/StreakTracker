// app/AuthScreen.tsx
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { Text, View } from "@/src/components/Themed";
import PinDigitInput from "@/src/components/PinDigitInput";
import { router } from "expo-router";
import Colors from "@/src/constants/Colors";
import { useCallback, useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";
import * as LocalAuthentication from "expo-local-authentication";
import { useTranslation } from "react-i18next";
import { markPinVerified } from "@/src/pinSession";
import { FontAwesome6 } from "@expo/vector-icons";
import { STORAGE_KEYS } from "@/src/constants/storageKeys";
import { useTheme } from "@/src/hooks/useTheme";

export default function AuthScreen() {
  const colorPalette = useTheme();
  const styles = getStyles(colorPalette);

  const [digits, setDigits] = useState(["", "", "", ""]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isLoadingPin, setIsLoadingPin] = useState(true);
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const [biometricType, setBiometricType] = useState<"face" | "fingerprint">(
    "fingerprint",
  );

  const { t } = useTranslation();
  const inputs = useRef<(TextInput | null)[]>([null, null, null, null]);

  const navigateAfterAuth = useCallback(() => {
    router.replace("/");
  }, []);

  useEffect(() => {
    const init = async () => {
      try {
        // 1. Onboarding check
        const onboarded = await AsyncStorage.getItem(STORAGE_KEYS.onboarded);
        if (!onboarded) {
          router.replace("/OnboardingScreen");
          return;
        }

        // 2. PIN check
        const pin = await AsyncStorage.getItem(STORAGE_KEYS.pin);
        if (__DEV__)
          console.info("[AuthScreen] Stored PIN found:", pin !== null);

        if (!pin || pin.trim().length === 0) {
          markPinVerified();
          navigateAfterAuth();
          return;
        }

        // 3. Biometric check
        const biometricEnabled = await AsyncStorage.getItem(
          STORAGE_KEYS.biometric,
        );
        if (biometricEnabled === "true") {
          const hasHardware = await LocalAuthentication.hasHardwareAsync();
          const isEnrolled = await LocalAuthentication.isEnrolledAsync();
          if (hasHardware && isEnrolled) {
            const types =
              await LocalAuthentication.supportedAuthenticationTypesAsync();
            const hasFace = types.includes(
              LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION,
            );
            setBiometricType(hasFace ? "face" : "fingerprint");
            setBiometricAvailable(true);
          }
        }

        setIsLoadingPin(false);
      } catch (error) {
        console.error("[AuthScreen] Init error:", error);
        router.replace("/");
      }
    };

    init();
  }, [navigateAfterAuth]);

  const triggerBiometric = useCallback(async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: t("biometricPrompt"),
        cancelLabel: t("cancel"),
        disableDeviceFallback: true,
      });

      if (result.success) {
        await Haptics.notificationAsync(
          Haptics.NotificationFeedbackType.Success,
        );
        markPinVerified();
        navigateAfterAuth();
      }
    } catch (error) {
      console.error("[AuthScreen] Biometric auth error:", error);
    }
  }, [t, navigateAfterAuth]);

  // Auto-trigger biometric once confirmed available.
  useEffect(() => {
    if (!isLoadingPin && biometricAvailable) {
      triggerBiometric();
    }
  }, [isLoadingPin, biometricAvailable, triggerBiometric]);

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
      const stored = await AsyncStorage.getItem(STORAGE_KEYS.pin);
      if (!stored) return;

      if (entered === stored) {
        await Haptics.notificationAsync(
          Haptics.NotificationFeedbackType.Success,
        );
        markPinVerified();
        setIsCorrect(true);
        setTimeout(navigateAfterAuth, 300);
      } else {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        setIsCorrect(false);
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
            <PinDigitInput
              digits={digits}
              onChangeDigit={handleChange}
              onKeyPressDigit={handleBackspace}
              inputsRef={inputs}
              status={
                isCorrect === true
                  ? "success"
                  : isCorrect === false
                    ? "error"
                    : "idle"
              }
              size="sm"
              theme={colorPalette}
            />
          </View>

          {biometricAvailable && (
            <TouchableOpacity
              style={styles.biometricBtn}
              onPress={triggerBiometric}
              activeOpacity={0.7}
            >
              <FontAwesome6
                name={biometricType === "face" ? "face-smile" : "fingerprint"}
                size={20}
                color={colorPalette.primary500}
              />
              <Text style={styles.biometricLabel}>{t("biometricAuth")}</Text>
            </TouchableOpacity>
          )}
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
    logo: {
      width: 200,
      height: 200,
      marginBottom: 32,
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
    inputCon: {
      marginBottom: 24,
    },
    biometricBtn: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: colorPalette.primary500 + "40",
      backgroundColor: colorPalette.primary500 + "0E",
    },
    biometricLabel: {
      fontFamily: "Roboto",
      fontSize: 15,
      color: colorPalette.primary500,
    },
  });
