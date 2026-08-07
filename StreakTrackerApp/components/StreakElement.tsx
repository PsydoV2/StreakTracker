import Colors from "@/constants/Colors";
import {
  Modal,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { Text, View } from "./Themed";
import { useState, useRef } from "react";
import { Streak } from "@/src/context/StreaksContext";
import EmojiOverlayPicker from "./EmojiPicker";
import { differenceInCalendarDays, parseISO } from "date-fns";
import { Entypo, Feather, FontAwesome6 } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import StreakDetailsPopup from "./StreakDetailsPopup";
import { useTranslation } from "react-i18next";

interface Props extends Streak {
  onUpdate: (updated: Streak | null) => void;
  confettiAbfeuern: () => void;
}

const CYCLE_PRESETS = [1, 2, 3, 7, 14, 30];

function getCycleLabel(
  cycle: number,
  t: (key: string, opts?: Record<string, unknown>) => string,
): string {
  if (cycle === 1) return t("cycleDaily");
  if (cycle === 7) return t("cycleWeekly");
  if (cycle === 30) return t("cycleMonthly");
  if (cycle % 7 === 0) return t("cycleEveryNWeeks", { count: cycle / 7 });
  return t("cycleEveryNDays", { count: cycle });
}

export default function StreakElement(props: Props) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme === "dark" ? "dark" : "light"];
  const styles = getStyles(theme);

  const { t } = useTranslation();

  const [title, setTitle] = useState(props.title);
  const [showPicker, setShowPicker] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [cyclePickerVisible, setCyclePickerVisible] = useState(false);
  const [customInput, setCustomInput] = useState(String(props.cycle ?? 1));

  const sheetRef = useRef<BottomSheetModal>(null);
  const cycle = props.cycle ?? 1;

  const openCyclePicker = () => {
    setCustomInput(String(cycle));
    setCyclePickerVisible(true);
  };

  const handleTitleBlur = () => {
    if (title !== props.title) {
      props.onUpdate({ ...props, title });
    }
  };

  const handleEmojiChange = (emoji: string) => {
    props.onUpdate({ ...props, emoji });
  };

  const handleTrackToday = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const newStreakCount = props.streakCount + 1;
    props.onUpdate({
      ...props,
      dateLastTracker: new Date().toISOString(),
      streakCount: newStreakCount,
      record: Math.max(props.record, newStreakCount),
      trackingDates: [...props.trackingDates, new Date().toISOString()],
    });
    props.confettiAbfeuern();
  };

  const handleRestartStreak = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    props.onUpdate({
      ...props,
      archived: false,
      streakCount: 0,
      dateLastTracker: new Date(0).toISOString(),
      dateRestartedAt: new Date().toISOString(),
      trackingDates: [],
    });
    props.confettiAbfeuern();
  };

  const handleCycleChange = (newCycle: number) => {
    if (newCycle < 1 || newCycle > 365) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    props.onUpdate({ ...props, cycle: newCycle });
    setCyclePickerVisible(false);
  };

  const handleCustomApply = () => {
    const parsed = parseInt(customInput, 10);
    if (!isNaN(parsed) && parsed >= 1 && parsed <= 365) {
      handleCycleChange(parsed);
    }
  };

  const adjustCustom = (delta: number) => {
    const current = parseInt(customInput, 10) || 1;
    const next = Math.min(365, Math.max(1, current + delta));
    setCustomInput(String(next));
  };

  const today = new Date();
  const lastTracked = props.dateLastTracker
    ? parseISO(props.dateLastTracker)
    : null;
  const daysSinceLast = lastTracked
    ? differenceInCalendarDays(today, lastTracked)
    : 9999;
  const canTrackThisPeriod = daysSinceLast >= cycle;

  const accentColor = props.archived
    ? theme.background400
    : !canTrackThisPeriod
      ? theme.primary500
      : theme.accent500;

  const customInputNum = parseInt(customInput, 10) || 1;
  const isCustom = !CYCLE_PRESETS.includes(cycle);

  return (
    <View style={styles.card}>
      {/* Left accent bar */}
      <View style={[styles.accentBar, { backgroundColor: accentColor }]} />

      {/* Card body */}
      <View style={styles.body}>
        {/* Top row */}
        <View style={styles.topRow}>
          <TouchableOpacity
            style={styles.emojiBtn}
            onPress={() => setShowPicker(true)}
            activeOpacity={0.7}
          >
            <Text style={styles.emoji}>{props.emoji}</Text>
          </TouchableOpacity>

          <View style={styles.titleArea}>
            <TextInput
              value={title}
              onChangeText={setTitle}
              onBlur={handleTitleBlur}
              style={styles.streakName}
              keyboardType="default"
            />
            <TouchableOpacity
              style={styles.cycleBadge}
              onPress={openCyclePicker}
              activeOpacity={0.7}
            >
              <FontAwesome6
                name="rotate"
                size={10}
                color={theme.primary500}
                style={{ marginRight: 4 }}
              />
              <Text style={styles.cycleBadgeText}>
                {getCycleLabel(cycle, t)}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.menuBtn}
            onPress={() => setMenuVisible(true)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Entypo
              name="dots-three-vertical"
              size={18}
              color={theme.text500}
            />
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Bottom row */}
        <View style={styles.bottomRow}>
          <View style={styles.countArea}>
            <FontAwesome6
              name="fire-flame-curved"
              size={22}
              color={theme.accent500}
              style={{ marginRight: 6 }}
            />
            <Text style={styles.countText}>{props.streakCount}</Text>
          </View>

          <TouchableOpacity
            style={styles.detailsBtn}
            onPress={() => sheetRef.current?.present()}
            activeOpacity={0.7}
          >
            <FontAwesome6
              name="eye"
              size={14}
              color={theme.text600}
              style={{ marginRight: 6 }}
            />
            <Text style={styles.detailsBtnText}>{t("viewStreakDetails")}</Text>
          </TouchableOpacity>

          {props.archived ? (
            <TouchableOpacity
              style={[styles.actionBtn, { borderColor: theme.accent400 }]}
              onPress={handleRestartStreak}
              activeOpacity={0.7}
            >
              <Feather name="refresh-cw" size={20} color={theme.accent500} />
            </TouchableOpacity>
          ) : canTrackThisPeriod ? (
            <TouchableOpacity
              style={[styles.actionBtn, { borderColor: theme.primary500 }]}
              onPress={handleTrackToday}
              activeOpacity={0.7}
            >
              <Feather name="check" size={22} color={theme.primary500} />
            </TouchableOpacity>
          ) : (
            <View style={[styles.actionBtn, styles.actionBtnDone]}>
              <Feather name="check" size={22} color={theme.primary500} />
            </View>
          )}
        </View>
      </View>

      {/* Emoji picker */}
      <EmojiOverlayPicker
        visible={showPicker}
        onSelect={handleEmojiChange}
        onClose={() => setShowPicker(false)}
      />

      {/* Cycle picker modal */}
      <Modal
        animationType="fade"
        transparent
        visible={cyclePickerVisible}
        onRequestClose={() => setCyclePickerVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setCyclePickerVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t("setCycle")}</Text>

            {/* Preset options */}
            <View style={styles.presetGrid}>
              {CYCLE_PRESETS.map((n) => (
                <TouchableOpacity
                  key={n}
                  style={[
                    styles.presetChip,
                    cycle === n && styles.presetChipSelected,
                  ]}
                  onPress={() => handleCycleChange(n)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.presetChipText,
                      cycle === n && styles.presetChipTextSelected,
                    ]}
                  >
                    {getCycleLabel(n, t)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Custom stepper */}
            <View
              style={[styles.customRow, isCustom && styles.customRowActive]}
            >
              <Text style={styles.customLabel}>{t("cycleCustom")}</Text>
              <View style={styles.stepper}>
                <TouchableOpacity
                  style={styles.stepperBtn}
                  onPress={() => adjustCustom(-1)}
                  activeOpacity={0.7}
                >
                  <Feather name="minus" size={16} color={theme.text700} />
                </TouchableOpacity>
                <TextInput
                  style={styles.stepperInput}
                  value={customInput}
                  onChangeText={(v) => setCustomInput(v.replace(/[^0-9]/g, ""))}
                  keyboardType="number-pad"
                  maxLength={3}
                  selectTextOnFocus
                />
                <Text style={styles.stepperUnit}>{t("days")}</Text>
                <TouchableOpacity
                  style={styles.stepperBtn}
                  onPress={() => adjustCustom(1)}
                  activeOpacity={0.7}
                >
                  <Feather name="plus" size={16} color={theme.text700} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={[
                  styles.applyBtn,
                  customInputNum < 1 || customInputNum > 365
                    ? { opacity: 0.4 }
                    : {},
                ]}
                onPress={handleCustomApply}
                activeOpacity={0.7}
              >
                <Text style={styles.applyBtnText}>{t("save")}</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.modalCancelBtn}
              onPress={() => setCyclePickerVisible(false)}
            >
              <Text style={styles.modalCancelText}>{t("cancel")}</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Context menu modal */}
      <Modal
        animationType="fade"
        transparent
        visible={menuVisible}
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setMenuVisible(false)}
        >
          <View style={styles.modalContent}>
            {!props.archived && (
              <TouchableOpacity
                onPress={() => {
                  setMenuVisible(false);
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  props.onUpdate({ ...props, archived: true });
                }}
                style={[styles.menuItem, { borderColor: theme.accent500 }]}
              >
                <FontAwesome6
                  name="box-archive"
                  size={15}
                  color={theme.text700}
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.menuItemText}>{t("archive")}</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => {
                setMenuVisible(false);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                props.onUpdate(null);
              }}
              style={[styles.menuItem, { borderColor: theme.secondary500 }]}
            >
              <FontAwesome6
                name="trash"
                size={15}
                color={theme.text700}
                style={{ marginRight: 8 }}
              />
              <Text style={styles.menuItemText}>{t("delete")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setMenuVisible(false)}
              style={[styles.menuItem, { borderColor: theme.primary500 }]}
            >
              <Text style={[styles.menuItemText, { color: theme.text700 }]}>
                {t("cancel")}
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <StreakDetailsPopup
        ref={sheetRef}
        streakCount={props.streakCount}
        record={props.record}
        trackingDates={props.trackingDates}
        cycle={cycle}
      />
    </View>
  );
}

const getStyles = (colors: typeof Colors.light) =>
  StyleSheet.create({
    card: {
      flexDirection: "row",
      width: "93%",
      marginHorizontal: "auto",
      marginVertical: 7,
      borderRadius: 16,
      backgroundColor: colors.background100,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: colors.background300,
      ...Platform.select({
        ios: {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.07,
          shadowRadius: 8,
        },
        android: {
          elevation: 3,
        },
      }),
    },

    accentBar: {
      width: 5,
      alignSelf: "stretch",
    },

    body: {
      flex: 1,
      paddingHorizontal: 12,
    },

    topRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 11,
      gap: 8,
    },

    emojiBtn: {
      width: 44,
      height: 44,
      justifyContent: "center",
      alignItems: "center",
    },
    emoji: {
      fontSize: 32,
    },

    titleArea: {
      flex: 1,
      justifyContent: "center",
      gap: 4,
    },
    streakName: {
      fontSize: 22,
      color: colors.text900,
      fontFamily: "PatrickHand",
      padding: 0,
    },

    cycleBadge: {
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "flex-start",
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.primary500 + "50",
      backgroundColor: colors.primary500 + "12",
    },
    cycleBadgeText: {
      fontSize: 11,
      fontFamily: "Roboto",
      color: colors.primary500,
      fontWeight: "600",
    },

    menuBtn: {
      width: 36,
      height: 36,
      justifyContent: "center",
      alignItems: "center",
    },

    divider: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: colors.background300,
      marginHorizontal: -12,
    },

    bottomRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 10,
      gap: 8,
    },

    countArea: {
      flexDirection: "row",
      alignItems: "center",
      minWidth: 58,
    },
    countText: {
      fontSize: 26,
      color: colors.accent500,
      fontFamily: "PatrickHand",
    },

    detailsBtn: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      height: 42,
      borderWidth: 1.5,
      borderColor: colors.background400,
      borderRadius: 10,
    },
    detailsBtnText: {
      fontFamily: "PatrickHand",
      fontSize: 17,
      color: colors.text700,
    },

    actionBtn: {
      width: 44,
      height: 44,
      borderWidth: 2,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
    },
    actionBtnDone: {
      borderColor: colors.primary500 + "40",
      backgroundColor: colors.primary500 + "15",
    },

    // Modals
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      backgroundColor: colors.background100,
      width: "90%",
      borderRadius: 16,
      paddingVertical: 20,
      paddingHorizontal: 16,
      gap: 10,
      alignItems: "stretch",
    },
    modalTitle: {
      fontSize: 20,
      fontFamily: "PatrickHand",
      color: colors.text900,
      textAlign: "center",
      marginBottom: 4,
    },

    // Preset chip grid
    presetGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
    },
    presetChip: {
      paddingHorizontal: 14,
      paddingVertical: 9,
      borderRadius: 20,
      borderWidth: 1.5,
      borderColor: colors.background400,
      backgroundColor: colors.background200,
    },
    presetChipSelected: {
      borderColor: colors.primary500,
      backgroundColor: colors.primary500 + "18",
    },
    presetChipText: {
      fontSize: 14,
      fontFamily: "PatrickHand",
      color: colors.text700,
    },
    presetChipTextSelected: {
      color: colors.primary500,
    },

    // Custom stepper row
    customRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderRadius: 12,
      borderWidth: 1.5,
      borderColor: colors.background400,
      borderStyle: "dashed",
    },
    customRowActive: {
      borderColor: colors.primary500,
      borderStyle: "solid",
      backgroundColor: colors.primary500 + "08",
    },
    customLabel: {
      fontSize: 14,
      fontFamily: "PatrickHand",
      color: colors.text600,
      flex: 1,
    },
    stepper: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    stepperBtn: {
      width: 28,
      height: 28,
      borderRadius: 8,
      borderWidth: 1.5,
      borderColor: colors.background400,
      justifyContent: "center",
      alignItems: "center",
    },
    stepperInput: {
      width: 44,
      borderRadius: 8,
      borderWidth: 1.5,
      borderColor: colors.primary500 + "70",
      textAlign: "center",
      fontSize: 16,
      fontFamily: "Roboto",
      color: colors.text900,
      paddingHorizontal: 4,
      paddingVertical: 6,
      ...Platform.select({ android: { includeFontPadding: false } }),
    },
    stepperUnit: {
      fontSize: 13,
      fontFamily: "Roboto",
      color: colors.text600,
      marginLeft: 2,
    },
    applyBtn: {
      paddingHorizontal: 12,
      paddingVertical: 7,
      borderRadius: 8,
      backgroundColor: colors.primary500,
    },
    applyBtnText: {
      fontSize: 14,
      fontFamily: "PatrickHand",
      color: "#fff",
    },

    modalCancelBtn: {
      paddingVertical: 14,
      borderRadius: 10,
      borderWidth: 1.5,
      borderColor: colors.primary500,
      alignItems: "center",
      marginTop: 2,
    },
    modalCancelText: {
      fontSize: 18,
      fontFamily: "PatrickHand",
      color: colors.text700,
    },

    menuItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      height: 52,
      borderWidth: 1.5,
      borderRadius: 10,
    },
    menuItemText: {
      fontSize: 19,
      fontFamily: "PatrickHand",
      color: colors.text900,
    },
  });
