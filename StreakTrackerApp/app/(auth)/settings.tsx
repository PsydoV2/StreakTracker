// app/(auth)/settings.tsx
import {
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
} from "react-native";
import { Text } from "@/src/components/Themed";
import PinDigitInput from "@/src/components/PinDigitInput";
import { useEffect, useRef, useState } from "react";
import Modal from "react-native-modal";
import Colors from "@/src/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/src/context/LanguageContext";
import { FontAwesome6 } from "@expo/vector-icons";
import * as LocalAuthentication from "expo-local-authentication";
import { router } from "expo-router";
import { STORAGE_KEYS } from "@/src/constants/storageKeys";
import { LANGUAGES } from "@/src/constants/languages";
import { useTheme } from "@/src/hooks/useTheme";

const PRIVACY_URL = "https://streaktracker.sfalter.de/privacy";
const IMPRINT_URL = "https://streaktracker.sfalter.de/imprint";

export default function Settings() {
  const colorPalette = useTheme();
  const styles = getStyles(colorPalette);

  const [pinSet, setPinSet] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [biometricSupported, setBiometricSupported] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [pinStep, setPinStep] = useState<"enter" | "confirm">("enter");
  const [enteredPin, setEnteredPin] = useState(["", "", "", ""]);
  const [confirmPin, setConfirmPin] = useState(["", "", "", ""]);
  const [pinError, setPinError] = useState(false);

  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();

  const appVersion = "2.0.0";

  const inputs = useRef<(TextInput | null)[]>([null, null, null, null]);
  const confirmInputs = useRef<(TextInput | null)[]>([null, null, null, null]);

  useEffect(() => {
    (async () => {
      const [pin, biometric] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.pin),
        AsyncStorage.getItem(STORAGE_KEYS.biometric),
      ]);
      setPinSet(!!pin);
      setBiometricEnabled(biometric === "true");

      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      setBiometricSupported(hasHardware && isEnrolled);
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
      await Promise.all([
        AsyncStorage.removeItem(STORAGE_KEYS.pin),
        AsyncStorage.removeItem(STORAGE_KEYS.biometric),
      ]);
      setPinSet(false);
      setBiometricEnabled(false);
    } else {
      openSetPinModal();
    }
  };

  const toggleBiometric = async (value: boolean) => {
    if (value) {
      await AsyncStorage.setItem(STORAGE_KEYS.biometric, "true");
      setBiometricEnabled(true);
    } else {
      await AsyncStorage.removeItem(STORAGE_KEYS.biometric);
      setBiometricEnabled(false);
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

    if (confirmPin.join("") !== enteredPin.join("")) {
      setPinError(true);
      setConfirmPin(["", "", "", ""]);
      confirmInputs.current[0]?.focus();
      return;
    }

    await AsyncStorage.setItem(STORAGE_KEYS.pin, enteredPin.join(""));
    setModalVisible(false);
    setPinSet(true);
    Keyboard.dismiss();
  };

  const currentStepNum = pinStep === "enter" ? 1 : 2;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colorPalette.background100 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* ── Security ── */}
        <Text style={styles.sectionLabel}>{t("security").toUpperCase()}</Text>
        <View style={styles.sectionCard}>
          <View style={styles.settingsRow}>
            <View style={styles.rowLeft}>
              <FontAwesome6
                name="lock"
                size={15}
                color={colorPalette.primary500}
                style={styles.rowIcon}
              />
              <Text style={styles.rowLabel}>{t("pinAuthentication")}</Text>
            </View>
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
          <Text style={styles.infoText}>{t("pinInfo")}</Text>

          {biometricSupported && (
            <>
              <View style={styles.rowDivider} />
              <View
                style={[
                  styles.settingsRow,
                  !pinSet && styles.settingsRowDisabled,
                ]}
              >
                <View style={styles.rowLeft}>
                  <FontAwesome6
                    name="fingerprint"
                    size={15}
                    color={
                      pinSet ? colorPalette.primary500 : colorPalette.text700
                    }
                    style={styles.rowIcon}
                  />
                  <Text
                    style={[
                      styles.rowLabel,
                      !pinSet && styles.rowLabelDisabled,
                    ]}
                  >
                    {t("biometricAuth")}
                  </Text>
                </View>
                <Switch
                  value={biometricEnabled}
                  onValueChange={toggleBiometric}
                  disabled={!pinSet}
                  trackColor={{
                    false: colorPalette.background400,
                    true: colorPalette.primary300,
                  }}
                  thumbColor={
                    biometricEnabled
                      ? colorPalette.primary500
                      : colorPalette.background500
                  }
                />
              </View>
              <Text
                style={[
                  styles.infoText,
                  !pinSet && { color: colorPalette.text700 },
                ]}
              >
                {pinSet ? t("biometricInfo") : t("biometricRequiresPin")}
              </Text>
            </>
          )}
        </View>

        {/* ── Language ── */}
        <Text style={styles.sectionLabel}>{t("language").toUpperCase()}</Text>
        <View style={styles.sectionCard}>
          <View style={styles.langGrid}>
            {LANGUAGES.map(({ code, flag, name }) => (
              <TouchableOpacity
                key={code}
                style={[
                  styles.langBtn,
                  language === code && styles.langBtnActive,
                ]}
                onPress={() => setLanguage(code)}
              >
                <Text style={styles.langFlag}>{flag}</Text>
                <Text
                  style={[
                    styles.langCode,
                    language === code && styles.langCodeActive,
                  ]}
                >
                  {name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── About ── */}
        <Text style={styles.sectionLabel}>{t("about").toUpperCase()}</Text>
        <View style={styles.sectionCard}>
          <TouchableOpacity
            style={styles.linkRow}
            onPress={() => Linking.openURL(PRIVACY_URL)}
          >
            <View style={styles.rowLeft}>
              <FontAwesome6
                name="shield-halved"
                size={15}
                color={colorPalette.primary500}
                style={styles.rowIcon}
              />
              <Text style={styles.rowLabel}>{t("privacyPolicy")}</Text>
            </View>
            <FontAwesome6
              name="chevron-right"
              size={13}
              color={colorPalette.text700}
            />
          </TouchableOpacity>

          <View style={styles.rowDivider} />

          <TouchableOpacity
            style={styles.linkRow}
            onPress={() => Linking.openURL(IMPRINT_URL)}
          >
            <View style={styles.rowLeft}>
              <FontAwesome6
                name="file-lines"
                size={15}
                color={colorPalette.primary500}
                style={styles.rowIcon}
              />
              <Text style={styles.rowLabel}>{t("imprint")}</Text>
            </View>
            <FontAwesome6
              name="chevron-right"
              size={13}
              color={colorPalette.text700}
            />
          </TouchableOpacity>

          <View style={styles.rowDivider} />

          <TouchableOpacity
            style={styles.linkRow}
            onPress={async () => {
              await AsyncStorage.removeItem(STORAGE_KEYS.onboarded);
              router.replace("/OnboardingScreen");
            }}
          >
            <View style={styles.rowLeft}>
              <FontAwesome6
                name="rotate-left"
                size={15}
                color={colorPalette.primary500}
                style={styles.rowIcon}
              />
              <Text style={styles.rowLabel}>{t("restartOnboarding")}</Text>
            </View>
            <FontAwesome6
              name="chevron-right"
              size={13}
              color={colorPalette.text700}
            />
          </TouchableOpacity>
        </View>

        {/* ── Footer ── */}
        <Text style={styles.versionText}>StreakTracker v{appVersion}</Text>
      </ScrollView>

      {/* ── PIN Modal ── */}
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        useNativeDriver
        hideModalContentWhileAnimating
        avoidKeyboard
      >
        <View style={styles.modalContainer}>
          {/* Close button */}
          <TouchableOpacity
            style={styles.modalCloseBtn}
            onPress={() => setModalVisible(false)}
          >
            <FontAwesome6 name="xmark" size={16} color={colorPalette.text700} />
          </TouchableOpacity>

          {/* Lock icon */}
          <View style={styles.modalIconWrap}>
            <FontAwesome6
              name="lock"
              size={24}
              color={colorPalette.primary500}
            />
          </View>

          {/* Title */}
          <Text style={styles.modalTitle}>
            {pinStep === "enter" ? t("enterNewPin") : t("repeatPin")}
          </Text>

          {/* Subtitle */}
          <Text style={styles.modalSubtitle}>
            {pinStep === "enter" ? t("pinChoose") : t("pinConfirm")}
          </Text>

          {/* Step indicator */}
          <View style={styles.stepIndicator}>
            <View
              style={[
                styles.stepDot,
                currentStepNum === 1 && styles.stepDotActive,
              ]}
            />
            <View
              style={[
                styles.stepDot,
                currentStepNum === 2 && styles.stepDotActive,
              ]}
            />
          </View>

          {/* PIN inputs */}
          <View style={styles.pinRow}>
            <PinDigitInput
              digits={pinStep === "enter" ? enteredPin : confirmPin}
              onChangeDigit={(text, index) =>
                handlePinChange(text, index, pinStep === "confirm")
              }
              inputsRef={pinStep === "enter" ? inputs : confirmInputs}
              status={(digit) =>
                pinError ? "error" : digit.length > 0 ? "filled" : "idle"
              }
              size="lg"
              theme={colorPalette}
            />
          </View>

          {/* Error message */}
          {pinError && <Text style={styles.errorText}>{t("pinMismatch")}</Text>}

          {/* Action button */}
          <TouchableOpacity
            onPress={handleNextStepOrSave}
            style={styles.saveButton}
          >
            <Text style={styles.saveButtonText}>
              {pinStep === "enter" ? t("continue") : t("save")}
            </Text>
          </TouchableOpacity>

          {/* Cancel link */}
          <TouchableOpacity
            style={styles.cancelLink}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.cancelLinkText}>{t("cancel")}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const LANG_BTN_SIZE = 62;

const getStyles = (colorPalette: typeof Colors.light) =>
  StyleSheet.create({
    scroll: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: 40,
    },

    // Section labels
    sectionLabel: {
      fontSize: 12,
      fontWeight: "600",
      letterSpacing: 0.8,
      color: colorPalette.text700,
      marginTop: 24,
      marginBottom: 6,
      marginLeft: 20,
      fontFamily: "Roboto",
    },

    // Section card
    sectionCard: {
      backgroundColor: colorPalette.background200,
      borderRadius: 14,
      marginHorizontal: 16,
      overflow: "hidden",
    },

    // Settings row (for switch)
    settingsRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingVertical: 14,
      minHeight: 52,
    },

    // Link row
    linkRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingVertical: 14,
      minHeight: 52,
    },

    rowLeft: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },
    rowIcon: {
      width: 22,
      marginRight: 12,
    },
    rowLabel: {
      fontSize: 16,
      fontFamily: "Roboto",
      color: colorPalette.text900,
    },

    rowDivider: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: colorPalette.background300,
      marginHorizontal: 16,
    },

    infoText: {
      fontSize: 12,
      fontFamily: "Roboto",
      color: colorPalette.text700,
      paddingHorizontal: 16,
      paddingBottom: 12,
      marginTop: -4,
    },
    settingsRowDisabled: {
      opacity: 0.5,
    },
    rowLabelDisabled: {
      color: colorPalette.text700,
    },

    // Language grid
    langGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: 8,
      padding: 16,
    },
    langBtn: {
      width: LANG_BTN_SIZE,
      height: LANG_BTN_SIZE,
      backgroundColor: colorPalette.background300,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 2,
      borderColor: "transparent",
    },
    langBtnActive: {
      backgroundColor: colorPalette.primary500 + "18",
      borderColor: colorPalette.primary500,
    },
    langFlag: {
      fontSize: 24,
    },
    langCode: {
      fontSize: 10,
      fontFamily: "Roboto",
      fontWeight: "600",
      color: colorPalette.text700,
      marginTop: 3,
    },
    langCodeActive: {
      color: colorPalette.primary500,
    },

    // Footer
    versionText: {
      fontSize: 13,
      fontFamily: "Roboto",
      color: colorPalette.text700,
      textAlign: "center",
      marginTop: 28,
      opacity: 0.7,
    },

    // PIN Modal container
    modalContainer: {
      backgroundColor: colorPalette.background100,
      paddingHorizontal: 24,
      paddingTop: 20,
      paddingBottom: 28,
      borderRadius: 20,
      alignItems: "center",
    },

    // Close button (top right)
    modalCloseBtn: {
      position: "absolute",
      top: 16,
      right: 16,
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: colorPalette.background200,
      justifyContent: "center",
      alignItems: "center",
    },

    // Lock icon circle
    modalIconWrap: {
      width: 56,
      height: 56,
      borderRadius: 16,
      backgroundColor: colorPalette.primary500 + "18",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 14,
      marginTop: 8,
    },

    // Title & subtitle
    modalTitle: {
      fontSize: 22,
      fontFamily: "PatrickHand",
      color: colorPalette.text900,
      marginBottom: 4,
      textAlign: "center",
    },
    modalSubtitle: {
      fontSize: 13,
      fontFamily: "Roboto",
      color: colorPalette.text700,
      textAlign: "center",
      marginBottom: 16,
    },

    // Step dots
    stepIndicator: {
      flexDirection: "row",
      gap: 6,
      marginBottom: 20,
    },
    stepDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colorPalette.background400,
    },
    stepDotActive: {
      backgroundColor: colorPalette.primary500,
      width: 20,
    },

    // PIN inputs
    pinRow: {
      marginBottom: 8,
    },

    // Error text
    errorText: {
      fontSize: 13,
      fontFamily: "Roboto",
      color: colorPalette.secondary500,
      textAlign: "center",
      marginBottom: 12,
      marginTop: 4,
    },

    // Action button
    saveButton: {
      backgroundColor: colorPalette.primary500,
      paddingVertical: 14,
      borderRadius: 12,
      width: "100%",
      marginTop: 12,
    },
    saveButtonText: {
      color: "white",
      fontSize: 20,
      fontFamily: "PatrickHand",
      textAlign: "center",
    },

    // Cancel link
    cancelLink: {
      marginTop: 14,
      paddingVertical: 4,
    },
    cancelLinkText: {
      fontSize: 14,
      fontFamily: "Roboto",
      color: colorPalette.text700,
    },
  });
