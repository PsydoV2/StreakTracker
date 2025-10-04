# 🌟 StreakTracker

**Build better habits – one day at a time.**

StreakTracker ist eine minimalistische und motivierende App, um persönliche Gewohnheiten (Streaks) zu verfolgen.
Egal ob Lesen, Sport oder Meditation – bleib am Ball und feiere jeden Tag deinen Fortschritt.

---

## 🚀 Features

### ✅ Unbegrenzte Streaks

Erstelle beliebig viele Gewohnheiten mit eigenem Titel und Emoji. Jede Aktivität wird als **StreakElement** verwaltet.

### 📅 Fortschrittsübersicht

Ein integriertes **StreakDetailsPopup** zeigt deinen Fortschritt als Kalender-Heatmap sowie:

- aktuelle Streak-Länge
- persönlichen Rekord
- Aktivitätsverlauf

### 🎉 Belohnungen

Nach jedem erfolgreichen Tag sorgt eine animierte **Konfetti-Explosion** für Extra-Motivation.

### 📦 Archivieren & Reaktivieren

Streaks können pausiert oder archiviert werden, ohne verloren zu gehen – perfekt für saisonale Ziele oder Pausen.

### 🔒 PIN-Schutz

Optionaler **vierstelliger PIN**, um deine Streaks zu schützen (lokal in `AsyncStorage` gespeichert).

### 🌗 Dark & Light Mode

Automatische Anpassung an das System-Farbschema mit modernem, reaktionsfähigem Design.

### 🌍 Mehrsprachig

Unterstützt mehrere Sprachen (u. a. 🇺🇸 Englisch, 🇩🇪 Deutsch, 🇫🇷 Französisch, 🇪🇸 Spanisch, 🇮🇹 Italienisch, 🇹🇷 Türkisch).

---

## 🧠 Tech Stack

| Kategorie             | Technologien                                                                                                                                                                   |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Framework             | [Expo](https://expo.dev/) + [React Native](https://reactnative.dev/)                                                                                                           |
| State Management      | React Context (`StreaksContext`, `LanguageContext`)                                                                                                                            |
| Speicher              | AsyncStorage (lokal, offline-fähig)                                                                                                                                            |
| UI & Styling          | Themed Components, [@gorhom/bottom-sheet](https://github.com/gorhom/react-native-bottom-sheet), [react-native-modal](https://github.com/react-native-modal/react-native-modal) |
| Feedback & Animation  | [expo-haptics](https://docs.expo.dev/versions/latest/sdk/haptics/), [react-native-confetti-cannon](https://github.com/Vydia/react-native-confetti-cannon)                      |
| Internationalisierung | [react-i18next](https://react.i18next.com/)                                                                                                                                    |

---

## 📲 Screens / Components

| Datei                     | Beschreibung                                                               |
| ------------------------- | -------------------------------------------------------------------------- |
| `index.tsx`               | Hauptscreen – aktive Streaks anzeigen, neue erstellen, Fortschritt tracken |
| `archive.tsx`             | Archivierte Streaks mit Reaktivierungs-Funktion                            |
| `settings.tsx`            | Sprache & PIN-Einstellungen                                                |
| `StreakElement.tsx`       | Einzelne Streak-Karte mit Aktionen (Track, Archivieren, Löschen, Details)  |
| `StreakDetailsPopup.tsx`  | Popup mit Kalenderübersicht & Rekordanzeige                                |
| `AddStreakElementBtn.tsx` | Schwebender Button zum schnellen Erstellen einer neuen Streak              |

---

## 🛠️ Installation

```bash
# Repository klonen
git clone https://github.com/DeinGitHubUser/StreakTracker.git
cd StreakTracker

# Abhängigkeiten installieren
npm install

# App starten (mit Expo)
npm start
```

Öffne anschließend den QR-Code mit der **Expo Go App** auf deinem Smartphone.

---

## 📦 Daten & Sicherheit

- Alle Daten (Streaks, PIN, Sprache) werden **lokal** gespeichert.
- Keine Cloud, keine Registrierung, kein Tracking.
- Ideal für Nutzer, die Wert auf **Privatsphäre** und **Offline-Funktionalität** legen.

---

## 🌐 Live Preview

👉 [https://streaktracker.sfalter.de](https://streaktracker.sfalter.de)

---

## 🧑‍💻 Autor

**Sebastian Falter** <br>
💼 Fachinformatiker für Anwendungsentwicklung <br>
🌍 [sfalter.de](https://sfalter.de) <br>
