import React, { forwardRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  useColorScheme,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import Colors from "@/constants/Colors";
import { FontAwesome6 } from "@expo/vector-icons";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
interface Props {
  streakCount: number;
  record: number;
  trackingDates: string[];
  cycle: number;
}

const NUM_COLUMNS = 14;
const SCREEN_WIDTH = Dimensions.get("window").width;
const CELL_SIZE = Math.floor((SCREEN_WIDTH - 32) / NUM_COLUMNS) - 4;

const StreakDetailsPopup = forwardRef<BottomSheetModal, Props>(
  ({ streakCount, record, trackingDates, cycle }, ref) => {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? "light"];
    const styles = getStyles(theme);
    const today = new Date();

    const { t } = useTranslation();

    const totalDays = NUM_COLUMNS * 12;
    const dateList = Array.from({ length: totalDays }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      return d;
    });

    const safeDates = trackingDates ?? [];
    const totalTracked = safeDates.length;

    const trackedSet = new Set(
      safeDates.map((d) => format(new Date(d), "yyyy-MM-dd"))
    );

    const renderItem = ({ item }: { item: Date }) => {
      const dateKey = format(item, "yyyy-MM-dd");
      const tracked = trackedSet.has(dateKey);
      const isToday = dateKey === format(today, "yyyy-MM-dd");

      return (
        <View
          style={[
            styles.cell,
            tracked
              ? styles.cellTracked
              : isToday
                ? styles.cellToday
                : styles.cellEmpty,
          ]}
        />
      );
    };

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={["78%"]}
        index={0}
        backgroundStyle={{ backgroundColor: theme.background200 }}
        handleIndicatorStyle={{
          backgroundColor: theme.background500,
          width: 40,
        }}
      >
        <BottomSheetScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* ── Header ── */}
          <View style={styles.header}>
            <View style={styles.headerIconWrap}>
              <FontAwesome6
                name="fire-flame-curved"
                size={22}
                color={theme.accent500}
              />
            </View>
            <Text style={styles.headerText}>{t("streakOverview")}</Text>
          </View>

          {/* ── Stats row ── */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{streakCount}</Text>
              <View style={styles.statLabelRow}>
                <FontAwesome6
                  name="fire-flame-curved"
                  size={11}
                  color={theme.accent500}
                  style={{ marginRight: 4 }}
                />
                <Text style={styles.statLabel}>{t("currentStreak")}</Text>
              </View>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{record}</Text>
              <View style={styles.statLabelRow}>
                <FontAwesome6
                  name="medal"
                  size={11}
                  color={theme.accent500}
                  style={{ marginRight: 4 }}
                />
                <Text style={styles.statLabel}>{t("personalBest")}</Text>
              </View>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{totalTracked}</Text>
              <View style={styles.statLabelRow}>
                <FontAwesome6
                  name="calendar-check"
                  size={11}
                  color={theme.accent500}
                  style={{ marginRight: 4 }}
                />
                <Text style={styles.statLabel}>
                {cycle === 7
                  ? t("weeksTracked")
                  : cycle === 30
                    ? t("monthsTracked")
                    : cycle === 1
                      ? t("daysTracked")
                      : t("timesTracked")}
              </Text>
              </View>
            </View>
          </View>

          {/* ── Heatmap ── */}
          <View style={styles.heatmapSection}>
            <Text style={styles.sectionLabel}>{t("timeSpanText")}</Text>
            <FlatList
              data={dateList}
              keyExtractor={(item) => item.toISOString()}
              renderItem={renderItem}
              numColumns={NUM_COLUMNS}
              scrollEnabled={false}
              contentContainerStyle={styles.grid}
            />

            {/* Legend */}
            <View style={styles.legend}>
              <View style={[styles.legendCell, styles.cellEmpty]} />
              <Text style={styles.legendText}>{t("noActivity")}</Text>
              <View style={styles.legendSpacer} />
              <View style={[styles.legendCell, styles.cellTracked]} />
              <Text style={styles.legendText}>{t("tracked")}</Text>
            </View>
          </View>
        </BottomSheetScrollView>
      </BottomSheetModal>
    );
  }
);

export default StreakDetailsPopup;

const getStyles = (colors: typeof Colors.light) =>
  StyleSheet.create({
    scrollContent: {
      paddingHorizontal: 16,
      paddingBottom: 32,
    },

    // Header
    header: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      marginTop: 4,
      marginBottom: 20,
      paddingHorizontal: 4,
    },
    headerIconWrap: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor: colors.accent500 + "18",
      justifyContent: "center",
      alignItems: "center",
    },
    headerText: {
      fontSize: 28,
      color: colors.text900,
      fontFamily: "PatrickHand",
    },

    // Stats
    statsRow: {
      flexDirection: "row",
      backgroundColor: colors.background100,
      borderRadius: 16,
      marginBottom: 20,
      overflow: "hidden",
    },
    statCard: {
      flex: 1,
      alignItems: "center",
      paddingVertical: 16,
      paddingHorizontal: 4,
    },
    statNumber: {
      fontSize: 34,
      fontFamily: "PatrickHand",
      color: colors.text900,
      lineHeight: 38,
    },
    statLabelRow: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 4,
    },
    statLabel: {
      fontSize: 11,
      fontFamily: "Roboto",
      color: colors.text700,
      textAlign: "center",
    },
    statDivider: {
      width: StyleSheet.hairlineWidth,
      backgroundColor: colors.background300,
      marginVertical: 12,
    },

    // Heatmap
    heatmapSection: {
      backgroundColor: colors.background100,
      borderRadius: 16,
      padding: 14,
    },
    sectionLabel: {
      fontSize: 13,
      fontFamily: "Roboto",
      fontWeight: "600",
      color: colors.text700,
      marginBottom: 10,
      letterSpacing: 0.3,
    },
    grid: {
      gap: 0,
    },
    cell: {
      width: CELL_SIZE,
      height: CELL_SIZE,
      borderRadius: 3,
      margin: 2,
    },
    cellEmpty: {
      backgroundColor: colors.background300,
    },
    cellTracked: {
      backgroundColor: colors.primary400,
    },
    cellToday: {
      backgroundColor: colors.background400,
      borderWidth: 1,
      borderColor: colors.primary500,
    },

    // Legend
    legend: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 12,
      justifyContent: "flex-end",
    },
    legendCell: {
      width: 12,
      height: 12,
      borderRadius: 3,
    },
    legendText: {
      fontSize: 11,
      fontFamily: "Roboto",
      color: colors.text700,
      marginLeft: 4,
    },
    legendSpacer: {
      width: 16,
    },
  });
