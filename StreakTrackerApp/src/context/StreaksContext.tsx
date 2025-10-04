// src/context/StreaksContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { differenceInDays } from "date-fns";

export type Streak = {
  id: string;
  title: string;
  emoji: string;
  dateLastTracker: string;
  dateCreatedAt: string;
  dateRestartedAt: string | null;
  streakCount: number;
  archived: boolean;
  record: number;
  trackingDates: string[];
};

const STORAGE_KEY = "@streaks";

type StreakContextType = {
  streaks: Streak[];
  loaded: boolean;
  addStreak: (title: string, emoji: string) => void;
  updateStreak: (updated: Streak) => void;
  deleteStreak: (id: string) => void;
};

const StreaksContext = createContext<StreakContextType | null>(null);

export const useStreaks = () => {
  const ctx = useContext(StreaksContext);
  if (!ctx) throw new Error("useStreaks must be used inside <StreaksProvider>");
  return ctx;
};

export const StreaksProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [streaks, setStreaks] = useState<Streak[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadStreaks();
  }, []);

  async function loadStreaks() {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    if (json) {
      const parsed = JSON.parse(json) as Streak[];

      const now = new Date();
      const today = new Date().toISOString();

      const checked = parsed.map((s) => {
        const last = new Date(s.dateLastTracker);
        const missedDays = differenceInDays(now, last);

        if (
          !s.archived &&
          missedDays > 1 &&
          differenceInDays(today, s.dateCreatedAt) > 0 &&
          (!s.dateRestartedAt || differenceInDays(today, s.dateRestartedAt) > 0)
        ) {
          return { ...s, archived: true };
        }

        return s;
      });

      setStreaks(checked);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
    }

    setLoaded(true);
  }

  async function save(newStreaks: Streak[]) {
    setStreaks(newStreaks);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newStreaks));
  }

  function addStreak(title: string, emoji: string) {
    const newStreak: Streak = {
      id: uuid.v4() as string,
      title,
      emoji,
      dateLastTracker: new Date(0).toISOString(),
      dateCreatedAt: new Date().toISOString(),
      dateRestartedAt: null,
      streakCount: 0,
      archived: false,
      record: 0,
      trackingDates: [],
    };
    save([...streaks, newStreak]);
  }

  function updateStreak(updated: Streak) {
    const updatedList = streaks.map((s) => (s.id === updated.id ? updated : s));
    save(updatedList);
  }

  function deleteStreak(id: string) {
    const updated = streaks.filter((s) => s.id !== id);
    save(updated);
  }

  return (
    <StreaksContext.Provider
      value={{ streaks, loaded, addStreak, updateStreak, deleteStreak }}
    >
      {children}
    </StreaksContext.Provider>
  );
};
