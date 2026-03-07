// src/utils/NotificationManager.ts
import { Platform } from "react-native";
import Constants, { ExecutionEnvironment } from "expo-constants";
import type { NotificationTriggerInput } from "expo-notifications";
import { Streak } from "../context/StreaksContext";

// ─── Helpers ────────────────────────────────────────────────────────────────

/**
 * True when running inside Expo Go.
 * expo-notifications' push token auto-registration fires at module load time,
 * which crashes in Expo Go since SDK 53. We therefore never import the module
 * at the top level – we use require() inside each function so the module is
 * only loaded in real builds where this guard is false.
 */
const isExpoGo =
  Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

/** Returns true if the given streak was already tracked today. */
function isTodayTracked(streak: Streak): boolean {
  const today = new Date().toISOString().split("T")[0];
  return streak.trackingDates.some((date) => date.startsWith(today));
}

/**
 * CalendarTrigger is iOS-only. On Android we use the equivalent DailyTrigger.
 * Uses require() so expo-notifications is never loaded in Expo Go.
 */
function buildDailyTrigger(
  hour: number,
  minute: number,
): NotificationTriggerInput {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { SchedulableTriggerInputTypes } = require("expo-notifications");
  if (Platform.OS === "ios") {
    return {
      type: SchedulableTriggerInputTypes.CALENDAR,
      hour,
      minute,
      repeats: true,
    };
  }
  return {
    type: SchedulableTriggerInputTypes.DAILY,
    hour,
    minute,
  };
}

// ─── Public API ──────────────────────────────────────────────────────────────

/** Returns true when every active streak has been tracked today. */
export function allStreaksDone(streaks: Streak[]): boolean {
  const active = streaks.filter((s) => !s.archived);
  return active.length > 0 && active.every(isTodayTracked);
}

/** Requests notification permissions if not already granted. */
export async function requestNotificationPermissions(): Promise<void> {
  if (isExpoGo) return;
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const Notifications = require("expo-notifications");
  const { granted } = await Notifications.getPermissionsAsync();
  if (!granted) {
    await Notifications.requestPermissionsAsync();
  }
}

/**
 * Cancels all scheduled notifications and sets up the two default daily
 * reminders (morning + evening placeholder).
 */
export async function scheduleDefaultReminders(): Promise<void> {
  if (isExpoGo) return;
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const Notifications = require("expo-notifications");

  await Notifications.cancelAllScheduledNotificationsAsync();

  await Notifications.scheduleNotificationAsync({
    identifier: "morning-reminder",
    content: {
      title: "☀️ Neue Streak-Chance!",
      body: "Vergiss nicht, heute an deinen Streaks zu arbeiten.",
    },
    trigger: buildDailyTrigger(8, 0),
  });

  await Notifications.scheduleNotificationAsync({
    identifier: "evening-streak-check",
    content: {
      title: "🌙 Noch nicht zu spät!",
      body: "Du hast noch Streaks offen – zieh durch!",
    },
    trigger: buildDailyTrigger(20, 0),
  });
}

/**
 * Call this whenever the app becomes active. Updates the evening notification
 * content based on whether all streaks for today are already done.
 */
export async function updateEveningReminder(streaks: Streak[]): Promise<void> {
  if (isExpoGo) return;
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const Notifications = require("expo-notifications");

  const done = allStreaksDone(streaks);

  await Notifications.cancelScheduledNotificationAsync("evening-streak-check");

  await Notifications.scheduleNotificationAsync({
    identifier: "evening-streak-check",
    content: done
      ? {
          title: "🎉 Geschafft!",
          body: "Du hast alle deine Streaks für heute erledigt – stark!",
        }
      : {
          title: "🌙 Noch nicht zu spät!",
          body: "Du hast noch Streaks offen – zieh durch!",
        },
    trigger: buildDailyTrigger(20, 0),
  });
}
