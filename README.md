# 🌟 StreakTracker

**Build better habits – one day at a time.**

StreakTracker is a minimalist and motivating app for tracking personal habits (streaks).
Whether it's reading, working out, or meditating – stay consistent and celebrate every day of progress.

---

## 🚀 Features

### ✅ Unlimited Streaks

Create as many habits as you want with a custom title and emoji. Each habit is managed as a **StreakElement**.

### 📅 Progress Overview

The built-in **StreakDetailsPopup** shows your progress as a calendar heatmap along with:

- current streak length
- personal best
- total days tracked

### 🎉 Rewards

After every successful day, an animated **confetti explosion** provides extra motivation.

### 📦 Archive & Restore

Streaks can be paused or archived without losing data – perfect for seasonal goals or breaks.

### 🔒 PIN & Biometric Protection

Optional **4-digit PIN** to protect your streaks (stored locally in `AsyncStorage`).
**Face ID or fingerprint** can additionally be enabled as a fast unlock method.

### 📱 Onboarding

On first launch, a **4-page onboarding** walks you through the app's key features.
The onboarding can be restarted at any time from the settings.

### 🌗 Dark & Light Mode

Automatic adaptation to the system color scheme with a modern, responsive design.

### 🌍 Multilingual

Supports 8 languages:
🇺🇸 English · 🇩🇪 German · 🇫🇷 French · 🇪🇸 Spanish · 🇮🇹 Italian · 🇹🇷 Turkish · 🇵🇹 Portuguese · 🇯🇵 Japanese

---

## 🧠 Tech Stack

| Category       | Technologies                                                                                                                                                                   |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Framework      | [Expo](https://expo.dev/) + [React Native](https://reactnative.dev/)                                                                                                           |
| Routing        | [expo-router](https://expo.github.io/router/) (file-based)                                                                                                                     |
| State          | React Context (`StreaksContext`, `LanguageContext`)                                                                                                                             |
| Storage        | AsyncStorage (local, offline-first)                                                                                                                                            |
| UI & Styling   | Themed Components, [@gorhom/bottom-sheet](https://github.com/gorhom/react-native-bottom-sheet), [react-native-modal](https://github.com/react-native-modal/react-native-modal) |
| Feedback       | [expo-haptics](https://docs.expo.dev/versions/latest/sdk/haptics/), [react-native-confetti-cannon](https://github.com/Vydia/react-native-confetti-cannon)                      |
| Biometrics     | [expo-local-authentication](https://docs.expo.dev/versions/latest/sdk/local-authentication/) (Face ID / Fingerprint)                                                           |
| i18n           | [react-i18next](https://react.i18next.com/)                                                                                                                                    |

---

## 📲 Screens / Components

| File                      | Description                                                              |
| ------------------------- | ------------------------------------------------------------------------ |
| `OnboardingScreen.tsx`    | 4-page welcome guide on first app launch                                 |
| `AuthScreen.tsx`          | PIN or biometric lock screen                                             |
| `index.tsx`               | Main screen – view active streaks, create new ones, track progress       |
| `archive.tsx`             | Archived streaks with restore functionality                              |
| `settings.tsx`            | Security, language & app info                                            |
| `StreakElement.tsx`        | Streak card with actions (track, archive, delete, details)               |
| `StreakDetailsPopup.tsx`   | Bottom sheet with heatmap, stats & personal best                         |
| `AddStreakElementBtn.tsx`  | Floating button for quickly creating a new streak                        |

---

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/PsydoV2/StreakTracker.git
cd StreakTracker/StreakTrackerApp

# Install dependencies
npm install

# Start the app (with Expo)
npx expo start
```

Scan the QR code with the **Expo Go** app on your smartphone.

---

## 📦 Data & Privacy

- All data (streaks, PIN, language) is stored **locally** on the device.
- No cloud, no account, no tracking.
- Ideal for users who value **privacy** and **offline functionality**.

---

## 🌐 Live Preview

👉 [https://streaktracker.sfalter.de](https://streaktracker.sfalter.de)

---

## 📁 Project Structure

```
StreakTracker/
├── StreakTrackerApp/    # React Native / Expo App
└── StreakTrackerWeb/    # Next.js Landing Page
```

---

## 🧑‍💻 Author

**Sebastian Falter** <br>
🌍 [sfalter.de](https://sfalter.de) <br>
