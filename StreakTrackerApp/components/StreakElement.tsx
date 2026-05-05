import Colors from "@/constants/Colors";
import {
  Dimensions,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { Text, View } from "./Themed";
import { useState } from "react";
import { Streak } from "@/src/context/StreaksContext";
import EmojiOverlayPicker from "./EmojiPicker";
import { differenceInCalendarDays, parseISO } from "date-fns";
import { Entypo, Feather, FontAwesome6 } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useRef } from "react";
import StreakDetailsPopup from "./StreakDetailsPopup";
import { useTranslation } from "react-i18next";

interface Props extends Streak {
  onUpdate: (updated: Streak | null) => void;
  confettiAbfeuern: () => void;
}

export default function StreakElement(props: Props) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  const styles = getStyles(theme);

  const { t } = useTranslation();

  const [title, setTitle] = useState(props.title);
  const [showPicker, setShowPicker] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const sheetRef = useRef<BottomSheetModal>(null);

  const openDetails = () => {
    sheetRef.current?.present();
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
    const newRecord = Math.max(props.record, newStreakCount);

    props.onUpdate({
      ...props,
      dateLastTracker: new Date().toISOString(),
      streakCount: newStreakCount,
      trackingDates: [...props.trackingDates, new Date().toISOString()],
      record: newRecord,
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

  const today = new Date();
  const lastTracked = props.dateLastTracker
    ? parseISO(props.dateLastTracker)
    : null;
  const canTrackToday =
    !lastTracked || differenceInCalendarDays(today, lastTracked) > 0;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => setShowPicker(true)}
        >
          <Text style={styles.icon}>{props.emoji}</Text>
        </TouchableOpacity>
        <TextInput
          value={title}
          onChangeText={setTitle}
          onBlur={handleTitleBlur}
          style={styles.streakName}
          keyboardType="default"
        />
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <Entypo name="dots-three-vertical" size={24} color={theme.text900} />
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <View style={styles.streakCount}>
          <FontAwesome6
            name="fire-flame-curved"
            style={styles.streakCountIcon}
          />
          <Text style={styles.streakCountText}>{props.streakCount}</Text>
        </View>

        <TouchableOpacity style={styles.detailsBtn} onPress={openDetails}>
          <FontAwesome6 name="eye" style={styles.detailsBtnIcon} />
          <Text style={styles.detailsBtnText}>{t("viewStreakDetails")}</Text>
        </TouchableOpacity>

        {props.archived ? (
          <TouchableOpacity
            style={styles.archiveBtn}
            onPress={() => handleRestartStreak()}
          >
            <Feather name="refresh-cw" style={styles.archiveBtnIcon} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.addBtn, !canTrackToday && { opacity: 0.5 }]}
            disabled={!canTrackToday}
            onPress={() => {
              if (!canTrackToday) return;
              handleTrackToday();
            }}
          >
            <Feather name="check" style={styles.addBtnIcon} />
            {/* <Text style={styles.btnText}>Track Today</Text> */}
          </TouchableOpacity>
        )}
      </View>

      <EmojiOverlayPicker
        visible={showPicker}
        onSelect={handleEmojiChange}
        onClose={() => setShowPicker(false)}
      />

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
                style={[styles.modalItem, styles.modalArchiveBtn]}
              >
                <FontAwesome6 name="box-archive" style={styles.modalItemIcon} />
                <Text style={styles.modalText}>{t("archive")}</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => {
                setMenuVisible(false);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                props.onUpdate(null);
              }}
              style={[styles.modalItem, styles.modalDeleteBtn]}
            >
              <FontAwesome6 name="trash" style={styles.modalItemIcon} />
              <Text style={styles.modalText}>{t("delete")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setMenuVisible(false)}
              style={[styles.modalItem, styles.modalCancelBtn]}
            >
              <Text style={[styles.modalText, { color: theme.text800 }]}>
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
      />
    </View>
  );
}

const getStyles = (colors: typeof Colors.light) =>
  StyleSheet.create({
    container: {
      width: "95%",
      minHeight: 130,
      backgroundColor: colors.background200,
      overflow: "hidden",

      margin: "auto",
      marginBottom: 8,
      marginTop: 8,

      borderWidth: 2,
      borderColor: colors.background300,
      borderRadius: 12,
    },

    row: {
      width: "100%",
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
    },

    iconBtn: {
      height: "100%",
      aspectRatio: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    icon: {
      fontSize: 35,
    },

    streakName: {
      fontSize: 28,
      color: colors.text900,
      width: "70%",
      fontFamily: "PatrickHand",
    },

    streakCount: {
      flexDirection: "row",
      alignItems: "center",
      height: 50,
    },
    streakCountIcon: {
      fontSize: 28,
      color: colors.accent500,
      marginRight: 8,
    },
    streakCountText: {
      fontSize: 28,
      color: colors.accent500,
      fontFamily: "PatrickHand",
    },

    archiveBtn: {
      width: 50,
      aspectRatio: 1,

      borderWidth: 2,
      borderColor: colors.accent400,
      borderRadius: 10,

      justifyContent: "center",
      alignItems: "center",
    },
    archiveBtnIcon: {
      color: colors.accent500,
      fontSize: 30,
    },

    addBtn: {
      width: 50,
      aspectRatio: 1,

      borderWidth: 2,
      borderColor: colors.primary500,
      borderRadius: 10,

      justifyContent: "center",
      alignItems: "center",
    },
    addBtnIcon: {
      color: colors.primary500,
      fontSize: 38,
    },

    modalOverlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
      flex: 1,

      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      backgroundColor: colors.background100,
      height: 250,
      width: "90%",
      borderRadius: 10,

      justifyContent: "center",
      alignItems: "center",
      gap: 16,
    },
    modalItem: {
      height: 55,
      width: "80%",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",

      borderWidth: 2,
      borderRadius: 10,
    },
    modalText: {
      fontSize: 20,
      fontFamily: "PatrickHand",
    },
    modalCancelBtn: {
      borderColor: colors.primary500,
    },
    modalArchiveBtn: {
      borderColor: colors.accent500,
    },
    modalDeleteBtn: {
      borderColor: colors.secondary500,
    },
    modalItemIcon: {
      color: colors.text900,
      marginRight: 8,
      fontSize: 16,
    },

    detailsBtn: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",

      width: 180,
      height: 50,

      borderWidth: 2,
      borderColor: colors.primary500,
      borderRadius: 10,
    },
    detailsBtnIcon: {
      color: colors.text900,
      fontSize: 18,
    },
    detailsBtnText: {
      fontFamily: "PatrickHand",
      fontSize: 20,
    },
  });
