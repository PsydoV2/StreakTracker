// app/(auth)/settings.tsx
import {
  StyleSheet,
  Switch,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  useColorScheme,
} from "react-native";
import { Text } from "@/components/Themed";
import { useEffect, useRef, useState } from "react";
import Modal from "react-native-modal";
import Colors from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/src/context/LanguageContext";

const STORAGE_KEY_PIN = "StreakTrackerPin";

type Language = "en" | "de" | "es" | "fr" | "it" | "tr";

const LANGUAGES: { code: Language; flag: string }[] = [
  { code: "en", flag: "🇺🇸" },
  { code: "de", flag: "🇩🇪" },
  { code: "fr", flag: "🇫🇷" },
  { code: "es", flag: "🇪🇸" },
  { code: "it", flag: "🇮🇹" },
  { code: "tr", flag: "🇹🇷" },
];

export default function Settings() {
  const colorScheme = useColorScheme();
  const colorPalette = colorScheme === "dark" ? Colors.dark : Colors.light;
  const styles = getStyles(colorPalette);

  const [pinSet, setPinSet] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [pinStep, setPinStep] = useState<"enter" | "confirm">("enter");
  const [enteredPin, setEnteredPin] = useState(["", "", "", ""]);
  const [confirmPin, setConfirmPin] = useState(["", "", "", ""]);
  const [pinError, setPinError] = useState(false);

  const { t } = useTranslation();
  const { setLanguage } = useLanguage();

  // Stable ref arrays – avoids calling useRef inside a loop (Rules of Hooks).
  const inputs = useRef<Array<TextInput | null>>([null, null, null, null]);
  const confirmInputs = useRef<Array<TextInput | null>>([
    null,
    null,
    null,
    null,
  ]);

  useEffect(() => {
    (async () => {
      const pin = await AsyncStorage.getItem(STORAGE_KEY_PIN);
      setPinSet(!!pin);
    })();
  }, []);

  const openSetPinModal = () => {
    setEnteredPin(["", "", "", ""]);
    setConfirmPin(["", "", "", ""]);
    setPinStep("enter");
    setPinError(false);
    setModalVisible(true);
  };

  const toggleUsePin = async (value: boolean) => {
    if (!value) {
      await AsyncStorage.removeItem(STORAGE_KEY_PIN);
      setPinSet(false);
    } else {
      openSetPinModal();
    }
  };

  const handlePinChange = (text: string, index: number, isConfirm = false) => {
    const target = isConfirm ? [...confirmPin] : [...enteredPin];
    target[index] = text;

    if (isConfirm) {
      setConfirmPin(target);
    } else {
      setEnteredPin(target);
    }

    if (text && index < 3) {
      const nextRef = isConfirm ? confirmInputs : inputs;
      nextRef.current[index + 1]?.focus();
    }
  };

  const handleNextStepOrSave = async () => {
    setPinError(false);

    if (pinStep === "enter") {
      if (enteredPin.join("").length < 4) {
        setPinError(true);
        return;
      }
      setPinStep("confirm");
      setTimeout(() => confirmInputs.current[0]?.focus(), 100);
      return;
    }

    // Confirm step
    if (confirmPin.join("") !== enteredPin.join("")) {
      setPinError(true);
      setConfirmPin(["", "", "", ""]);
      confirmInputs.current[0]?.focus();
      return;
    }

    await AsyncStorage.setItem(STORAGE_KEY_PIN, enteredPin.join(""));
    setModalVisible(false);
    setPinSet(true);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.label}>{t("pinAuthentication")}</Text>
        <Switch
          value={pinSet}
          onValueChange={toggleUsePin}
          trackColor={{
            false: colorPalette.background400,
            true: colorPalette.primary300,
          }}
          thumbColor={
            pinSet ? colorPalette.primary500 : colorPalette.background500
          }
        />
      </View>

      <View style={styles.warnSection}>
        <Text style={[styles.label, { textAlign: "center", width: "100%" }]}>
          ⚠️ {t("warnPinWorking")} ⚠️
        </Text>
      </View>

      <View style={styles.langSection}>
        {LANGUAGES.map(({ code, flag }) => (
          <TouchableOpacity
            key={code}
            style={styles.langBtn}
            onPress={() => setLanguage(code)}
          >
            <Text style={styles.langIcon}>{flag}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        useNativeDriver
        hideModalContentWhileAnimating
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            {pinStep === "enter" ? "Enter new PIN" : "Repeat PIN"}
          </Text>

          <View style={styles.pinRow}>
            {(pinStep === "enter" ? enteredPin : confirmPin).map(
              (digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => {
                    const targetRef =
                      pinStep === "enter" ? inputs : confirmInputs;
                    targetRef.current[index] = ref;
                  }}
                  style={[styles.pinInput, pinError && styles.pinInputError]}
                  keyboardType="number-pad"
                  secureTextEntry
                  maxLength={1}
                  value={digit}
                  onChangeText={(text) =>
                    handlePinChange(text, index, pinStep === "confirm")
                  }
                />
              ),
            )}
          </View>

          <TouchableOpacity
            onPress={handleNextStepOrSave}
            style={styles.saveButton}
          >
            <Text style={styles.saveButtonText}>
              {pinStep === "enter" ? "Continue" : "Save"}
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const getStyles = (colorPalette: typeof Colors.light) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      alignItems: "center",
      justifyContent: "flex-start",
    },
    section: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
      marginBottom: 48,
      width: "90%",
    },
    warnSection: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
      marginTop: -40,
      marginBottom: 48,
      width: "90%",
    },
    langSection: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      marginBottom: 48,
      width: "100%",
    },
    label: {
      fontSize: 16,
      fontWeight: "600",
    },
    modalContainer: {
      backgroundColor: colorPalette.background100,
      padding: 24,
      borderRadius: 10,
      alignItems: "center",
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: "600",
      marginBottom: 16,
      color: colorPalette.text900,
    },
    pinRow: {
      flexDirection: "row",
      gap: 10,
      marginBottom: 16,
    },
    pinInput: {
      borderWidth: 1,
      borderRadius: 6,
      width: 50,
      height: 60,
      textAlign: "center",
      fontSize: 24,
      backgroundColor: colorPalette.background200,
      borderColor: "transparent",
      color: colorPalette.text900,
    },
    pinInputError: {
      borderColor: "red",
    },
    saveButton: {
      backgroundColor: colorPalette.primary500,
      paddingVertical: 10,
      paddingHorizontal: 30,
      borderRadius: 6,
      width: 240,
    },
    saveButtonText: {
      color: "white",
      fontSize: 22,
      fontFamily: "PatrickHand",
      textAlign: "center",
    },
    langBtn: {
      width: 50,
      aspectRatio: 1,
      backgroundColor: colorPalette.background200,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    langIcon: {
      fontSize: 25,
    },
  });
