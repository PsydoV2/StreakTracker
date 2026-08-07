# 📱 StreakTracker – App

**React Native / Expo App** · v1.6.0

Build better habits – one day at a time. StreakTracker helps you track personal habits as streaks, visualize your progress, and stay consistent.

---

## ✨ Features

- **Unlimited streaks** – create habits with custom title and emoji
- **Activity heatmap** – 6-month calendar view per streak
- **Stats** – current streak, personal best, total days tracked
- **Confetti animation** – celebrate every completed day
- **Archive & restore** – pause streaks without losing history
- **PIN protection** – optional 4-digit PIN lock
- **Biometric auth** – Face ID or fingerprint unlock (requires PIN)
- **Onboarding** – 4-page intro on first launch, restartable from settings
- **Dark & Light mode** – automatic system theme
- **8 languages** – EN · DE · FR · ES · IT · TR · PT · JA

---

## 🧠 Tech Stack

| Category     | Technology                                      |
| ------------ | ----------------------------------------------- |
| Framework    | Expo SDK 54 + React Native                      |
| Routing      | expo-router (file-based, typed routes)          |
| State        | React Context (StreaksContext, LanguageContext) |
| Storage      | AsyncStorage (local, offline-first)             |
| Bottom Sheet | @gorhom/bottom-sheet                            |
| Modal        | react-native-modal                              |
| Haptics      | expo-haptics                                    |
| Confetti     | react-native-confetti-cannon                    |
| Biometrics   | expo-local-authentication                       |
| i18n         | react-i18next                                   |
| OTA Updates  | expo-updates (EAS)                              |

---

## 📁 Project Structure

```
StreakTrackerApp/
├── app/
│   ├── _layout.tsx              # Root layout (Slot, font loading)
│   ├── AuthScreen.tsx           # PIN / biometric lock screen
│   ├── OnboardingScreen.tsx     # First-launch onboarding (4 pages)
│   └── (auth)/
│       ├── _layout.tsx          # Auth guard + stack config
│       ├── settings.tsx         # Settings: security, language, about
│       └── (tabs)/
│           ├── _layout.tsx      # Tab bar (Streaks / Archive)
│           ├── index.tsx        # Active streaks screen
│           └── archive.tsx      # Archived streaks screen
├── components/
│   ├── StreakElement.tsx         # Streak card (track, archive, delete, details)
│   ├── StreakDetailsPopup.tsx    # Bottom sheet: heatmap + stats
│   ├── AddStreakElementBtn.tsx   # FAB for creating new streaks
│   └── EmojiPicker.tsx          # Emoji selector with category tabs
├── src/
│   ├── context/
│   │   ├── StreaksContext.tsx    # Streak CRUD + AsyncStorage
│   │   └── LanguageContext.tsx  # Language preference
│   ├── locales/                 # en/de/fr/es/it/tr/pt/ja JSON files
│   ├── i18n.ts                  # i18next setup
│   └── pinSession.ts            # Module-level session flag (PIN verified)
└── assets/
    ├── fonts/                   # PatrickHand, Roboto
    └── images/                  # icon, splash, adaptive-icon
```

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npx expo start
```

Scan the QR code with the **Expo Go** app, or press `a` / `i` for Android / iOS simulator.

---

## 🔐 Auth Flow

```
App launch
  └── OnboardingScreen  (first launch only, skippable)
        └── AuthScreen
              ├── No PIN set  → navigate to /
              ├── PIN set     → enter PIN (or biometrics if enabled)
              └── Verified    → navigate to /
```

The session flag in `src/pinSession.ts` prevents re-authentication on in-app navigation.

---

## 🌍 Localization

Translations live in `src/locales/<lang>.json`. The language is persisted via `LanguageContext` + AsyncStorage. The settings screen offers flag buttons for all 8 supported languages.

---

## 📦 Data & Privacy

- All data (streaks, PIN, language) is stored **locally** on the device.
- No cloud sync, no account, no analytics.

---

## 🧑‍💻 Author

**Sebastian Falter** · [sfalter.de](https://sfalter.de)
