// Central list of AsyncStorage keys used across the app.
// See the "AsyncStorage keys" table in CLAUDE.md for what each one holds.
export const STORAGE_KEYS = {
  streaks: "@streaks",
  pin: "StreakTrackerPin",
  biometric: "StreakTrackerBiometric",
  onboarded: "StreakTrackerOnboarded",
  lastVersion: "StreakTrackerLastVersion",
  language: "streakTrackerLanguage",
} as const;
