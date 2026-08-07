# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npx expo start          # Start dev server (Expo Go / web)
npx expo start --android
npx expo start --ios
npx expo start --web
npm test                # Run Jest in watch mode
npx tsc --noEmit       # Type-check without building
```

> **Expo Go caveat**: `expo-notifications` crashes in Expo Go since SDK 53. It is intentionally loaded via `require()` inside each function body (never a top-level import). Do not change this pattern.

## Architecture

### Routing (expo-router v6, file-based)

```
app/
  AuthScreen.tsx          — PIN / biometric gate; redirects to OnboardingScreen on first launch
  OnboardingScreen.tsx    — shown once, sets StreakTrackerOnboarded in AsyncStorage
  (auth)/
    _layout.tsx           — Stack; re-checks PIN on mount via isPinVerified()
    settings.tsx          — Modal screen; PIN setup, language picker, about links
    (tabs)/
      _layout.tsx         — Bottom tab bar (Streaks + Archive)
      index.tsx           — Active streaks list
      archive.tsx         — Archived streaks list
```

Auth flow: `AuthScreen` → checks onboarding → checks PIN → optionally triggers biometric → calls `markPinVerified()` → navigates to `/`. The session flag lives in `src/pinSession.ts` (module-level `let verified`), so it resets when the app process is killed.

### State

- **`StreaksContext`** (`src/context/StreaksContext.tsx`) — single source of truth for all streaks, persisted to AsyncStorage under `@streaks`. On load, auto-archives any streak missed by more than 1 calendar day.
- **`LanguageContext`** (`src/context/LanguageContext.tsx`) — wraps i18next; persists chosen language to AsyncStorage, falls back to device locale.

Both contexts are mounted in `app/_layout.tsx` wrapping the entire `<Slot />`.

### Data model (`Streak` type)

| Field             | Purpose                                                        |
| ----------------- | -------------------------------------------------------------- |
| `streakCount`     | Current consecutive days                                       |
| `record`          | All-time best streak                                           |
| `trackingDates`   | ISO strings of every tracked day                               |
| `dateLastTracker` | ISO string of last tracking; epoch (Jan 1 1970) when untouched |
| `archived`        | True when broken or manually archived                          |
| `dateRestartedAt` | Set on restart; null otherwise                                 |

### Theming & styling

Colors are defined in `constants/Colors.ts` with `light` and `dark` variants. Each color has a scale: `text50–text950`, `background50–background950`, `primary50–primary950`, `secondary50–secondary950`, `accent50–accent950`.

**The color palette and logo (`assets/images/logo.png`) are locked and must not be changed.**

Every component derives styles by calling `getStyles(colorPalette)` at render time:

```ts
const colorScheme = useColorScheme();
const colorPalette = colorScheme === "dark" ? Colors.dark : Colors.light;
const styles = getStyles(colorPalette);
```

### Fonts

| Font          | Usage                           |
| ------------- | ------------------------------- |
| `PatrickHand` | Titles, headings, large UI text |
| `Roboto`      | Body text, labels, info text    |
| `SpaceMono`   | (available, not currently used) |

Always specify `fontFamily` explicitly — React Native does not inherit fonts.

### i18n

8 languages: `en`, `de`, `es`, `fr`, `it`, `tr`, `pt`, `ja`. Locale files live in `src/locales/`. Use `useTranslation()` and the `t()` function in all user-visible strings. Add new keys to all 8 locale files when adding UI text.

### Notifications

`src/utils/NotificationManager.ts` exports:

- `requestNotificationPermissions()` — call once at startup
- `scheduleDefaultReminders()` — sets morning (08:00) and evening (20:00) notifications
- `updateEveningReminder(streaks)` — call on focus to update evening message based on completion state

All functions are no-ops in Expo Go (`isExpoGo` guard). `expo-notifications` is always `require()`'d inside the function body, never imported at the top of the file.

### Key components

- `StreakElement` — card for a single streak; handles inline title editing, emoji picker, track-today button, archive/delete context menu, and details bottom sheet
- `AddStreakElementBtn` — FAB to create new streaks
- `EmojiPicker` — full-screen overlay emoji selector
- `StreakDetailsPopup` — `@gorhom/bottom-sheet` modal with streak stats and tracking calendar

### AsyncStorage keys

| Key                      | Content                           |
| ------------------------ | --------------------------------- |
| `@streaks`               | JSON array of `Streak` objects    |
| `StreakTrackerPin`       | 4-digit PIN string                |
| `StreakTrackerBiometric` | `"true"` if biometric enabled     |
| `StreakTrackerOnboarded` | Any truthy value after onboarding |
| `streakTrackerLanguage`  | Language code                     |
