// src/utils/NotificationManager.ts
import * as Notifications from "expo-notifications";
import { Streak } from "../context/StreaksContext";

// prüft, ob ein Streak heute bereits getrackt wurde
function isTodayTracked(streak: Streak): boolean {
  const today = new Date().toISOString().split("T")[0];
  return streak.trackingDates.some((date) => date.startsWith(today));
}

// ➤ Berechne, ob alle aktiven Streaks getrackt wurden
export function allStreaksDone(streaks: Streak[]): boolean {
  const active = streaks.filter((s) => !s.archived);
  return active.length > 0 && active.every(isTodayTracked);
}

// ➤ Anfrage für Benachrichtigungsrechte
export async function requestNotificationPermissions() {
  const { granted } = await Notifications.getPermissionsAsync();
  if (!granted) {
    await Notifications.requestPermissionsAsync();
  }
}

// ➤ Standard-Reminder morgens & abends setzen (einmal beim App-Start)
export async function scheduleDefaultReminders() {
  await Notifications.cancelAllScheduledNotificationsAsync(); // optional: reset

  // Morgen-Reminder
  await Notifications.scheduleNotificationAsync({
    identifier: "morning-reminder",
    content: {
      title: "☀️ Neue Streak-Chance!",
      body: "Vergiss nicht, heute an deinen Streaks zu arbeiten.",
    },
    trigger: {
      hour: 8, // 8 Uhr morgens
      minute: 0,
      repeats: true,
      type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
    },
  });

  // Platzhalter für Abend (wird bei App-Öffnung angepasst)
  await Notifications.scheduleNotificationAsync({
    identifier: "evening-streak-check",
    content: {
      title: "🌙 Noch nicht zu spät!",
      body: "Du hast noch Streaks offen – zieh durch!",
    },
    trigger: {
      hour: 20,
      minute: 0,
      repeats: true,
      type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
    },
  });
}

// ➤ Diese Funktion rufst du bei App-Öffnung auf mit deinen aktuellen Streaks
export async function updateEveningReminder(streaks: Streak[]) {
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
    trigger: {
      hour: 20,
      minute: 0,
      repeats: true,
      type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
    },
  });
}
