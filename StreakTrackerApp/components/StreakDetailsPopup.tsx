import React, { forwardRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  useColorScheme,
  Dimensions,
} from "react-native";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import Colors from "@/constants/Colors";
import { FontAwesome6 } from "@expo/vector-icons";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

interface Props {
  streakCount: number;
  record: number;
  trackingDates: string[];
}

const NUM_COLUMNS = 14;
const CELL_SIZE = Math.floor(Dimensions.get("window").width / NUM_COLUMNS) - 10;

const StreakDetailsPopup = forwardRef<BottomSheetModal, Props>(
  ({ streakCount, record, trackingDates }, ref) => {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? "light"];
    const styles = getStyles(theme);
    const today = new Date();

    const { t } = useTranslation();

    const totalDays = 14 * 12;
    const dateList = Array.from({ length: totalDays }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      return d;
    });

    const safeDates = trackingDates ?? [];
    const trackedSet = new Set(
      safeDates.map((d) => format(new Date(d), "yyyy-MM-dd"))
    );

    const renderItem = ({ item }: { item: Date }) => {
      const dateKey = format(item, "yyyy-MM-dd");
      const tracked = trackedSet.has(dateKey);

      return (
        <View
          style={[
            styles.cell,
            {
              backgroundColor: tracked ? theme.primary400 : theme.background100,
            },
          ]}
        />
      );
    };

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={["75%"]}
        index={0}
        backgroundStyle={{ backgroundColor: theme.background200 }}
        style={{ borderRadius: 50 }}
        handleIndicatorStyle={{ backgroundColor: theme.background900 }}
      >
        <BottomSheetView style={styles.container}>
          <View style={styles.header}>
            <FontAwesome6 name="calendar-alt" style={styles.headerIcon} />
            <Text style={styles.headerText}>{t("streakOverview")}</Text>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statsContainer}>
              <FontAwesome6 name="fire-flame-curved" style={styles.statIcon} />
              <Text style={styles.statText}>{streakCount}</Text>
            </View>
            <View style={styles.statsContainer}>
              <FontAwesome6 name="medal" style={styles.statIcon} />
              <Text style={styles.statText}>{record}</Text>
            </View>
          </View>

          <Text style={styles.timeSpanText}>{t("timeSpanText")}</Text>
          <FlatList
            data={dateList}
            keyExtractor={(item) => item.toISOString()}
            renderItem={renderItem}
            numColumns={NUM_COLUMNS}
            scrollEnabled={false}
            contentContainerStyle={styles.grid}
          />
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

export default StreakDetailsPopup;

const getStyles = (colors: typeof Colors.light) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
    },

    header: {
      width: "100%",
      flexDirection: "row",

      justifyContent: "center",
      alignItems: "center",
      gap: 16,
      marginBottom: 8,
      marginTop: 8,
    },
    headerIcon: {
      fontSize: 30,
      color: colors.text900,
    },
    headerText: {
      fontSize: 34,
      color: colors.text900,
      fontFamily: "PatrickHand",
    },

    statsRow: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-evenly",
      marginTop: 16,
      marginBottom: 16,
    },
    statsContainer: {
      flexDirection: "row",
      height: 100,
      width: "40%",
      backgroundColor: colors.background100,
      borderRadius: 20,

      justifyContent: "center",
      alignItems: "center",
      gap: 16,
    },
    statIcon: {
      color: colors.accent500,
      fontSize: 30,
    },
    statText: {
      fontSize: 30,
      fontFamily: "PatrickHand",
      color: colors.text900,
    },

    grid: {
      marginBottom: 30,
    },
    cell: {
      height: CELL_SIZE,
      aspectRatio: 1,
      borderRadius: 5,
      margin: 4,
    },

    timeSpanText: {
      color: colors.text700,
      fontFamily: "PatrickHand",
      width: "91%",
      textAlign: "left",
      fontSize: 20,
    },
  });
