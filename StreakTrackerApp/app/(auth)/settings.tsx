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

  const { t, i18n } = useTranslation();

  const inputs = Array.from({ length: 4 }, () => useRef<TextInput>(null));
  const confirmInputs = Array.from({ length: 4 }, () =>
    useRef<TextInput>(null)
  );

  const { language, setLanguage } = useLanguage();

  const storageKeyForPin = "StreakTrackerPin";

  // Load current PIN status
  useEffect(() => {
    (async () => {
      const pin = await AsyncStorage.getItem(storageKeyForPin);
      setPinSet(!!pin);
    })();
  }, []);

  const openSetPinModal = () => {
    setEnteredPin(["", "", "", ""]);
    setConfirmPin(["", "", "", ""]);
    setPinStep("enter");
    setModalVisible(true);
  };

  const toggleUsePin = async (value: boolean) => {
    if (!value) {
      await AsyncStorage.removeItem(storageKeyForPin);
      setPinSet(false);
    } else {
      openSetPinModal();
    }
  };

  const handlePinChange = (text: string, index: number, isConfirm = false) => {
    const target = isConfirm ? [...confirmPin] : [...enteredPin];
    target[index] = text;

    isConfirm ? setConfirmPin(target) : setEnteredPin(target);

    if (text && index < 3) {
      const nextInput = isConfirm
        ? confirmInputs[index + 1]
        : inputs[index + 1];
      nextInput.current?.focus();
    }
  };

  const handleNextStepOrSave = async () => {
    setPinError(false);
    if (pinStep === "enter") {
      if (enteredPin.join("").length === 4) {
        setPinStep("confirm");
        setTimeout(() => confirmInputs[0].current?.focus(), 100);
      } else {
        setPinError(true);
      }
    } else {
      if (confirmPin.join("") !== enteredPin.join("")) {
        setPinError(true);
        setConfirmPin(["", "", "", ""]);
        confirmInputs[0].current?.focus();
        return;
      }

      await AsyncStorage.setItem(storageKeyForPin, enteredPin.join(""));
      setModalVisible(false);
      setPinSet(true);
      Keyboard.dismiss();
    }
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
        <TouchableOpacity
          style={styles.langBtn}
          onPress={() => {
            setLanguage("en");
          }}
        >
          <Text style={styles.langIcon}>🇺🇸</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.langBtn}
          onPress={() => {
            setLanguage("de");
          }}
        >
          <Text style={styles.langIcon}>🇩🇪</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.langBtn}
          onPress={() => {
            setLanguage("fr");
          }}
        >
          <Text style={styles.langIcon}>🇫🇷</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.langBtn}
          onPress={() => {
            setLanguage("es");
          }}
        >
          <Text style={styles.langIcon}>🇪🇸</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.langBtn}
          onPress={() => {
            setLanguage("it");
          }}
        >
          <Text style={styles.langIcon}>🇮🇹</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.langBtn}
          onPress={() => {
            setLanguage("tr");
          }}
        >
          <Text style={styles.langIcon}>🇹🇷</Text>
        </TouchableOpacity>
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
            {pinStep === "enter" ? "Enter new PIN" : "repeat PIN"}
          </Text>

          <View style={styles.pinRow}>
            {(pinStep === "enter" ? enteredPin : confirmPin).map(
              (digit, index) => (
                <TextInput
                  key={index}
                  ref={
                    pinStep === "enter" ? inputs[index] : confirmInputs[index]
                  }
                  style={[
                    styles.pinInput,
                    pinError == true && { borderColor: "red" },
                    pinError == false && { borderColor: "transparent" },
                  ]}
                  keyboardType="number-pad"
                  secureTextEntry
                  maxLength={1}
                  value={digit}
                  onChangeText={(text) =>
                    handlePinChange(text, index, pinStep === "confirm")
                  }
                />
              )
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
    logout: {
      marginBottom: 24,
      padding: 12,
      backgroundColor: colorPalette.accent500,
      borderRadius: 6,
      width: "90%",
    },
    logoutText: {
      color: colorPalette.text100,
      fontSize: 24,
      fontFamily: "PatrickHand",
      textAlign: "center",
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
    changePin: {
      marginTop: 8,
      backgroundColor: colorPalette.primary500,
      width: "90%",
      padding: 10,
      borderRadius: 6,
    },
    changePinText: {
      color: colorPalette.text900,
      fontSize: 24,
      fontFamily: "PatrickHand",
      textAlign: "center",
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
