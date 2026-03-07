// src/context/StreaksContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { differenceInCalendarDays } from "date-fns";

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

export const useStreaks = (): StreakContextType => {
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

  async function loadStreaks(): Promise<void> {
    try {
      const json = await AsyncStorage.getItem(STORAGE_KEY);

      if (json) {
        const parsed = JSON.parse(json) as Streak[];
        const now = new Date();

        const checked = parsed.map((s): Streak => {
          // Already archived – nothing to do.
          if (s.archived) return s;

          const last = new Date(s.dateLastTracker);
          const missedDays = differenceInCalendarDays(now, last);

          // A streak is only breakable after it has actually been started
          // (i.e. at least one tracking date exists) and more than one
          // calendar day has passed since the last tracking.
          const hasStarted = s.trackingDates.length > 0;
          if (hasStarted && missedDays > 1) {
            return { ...s, archived: true };
          }

          return s;
        });

        await save(checked, false);
      }
    } catch (error) {
      console.error("[StreaksContext] Failed to load streaks:", error);
    } finally {
      setLoaded(true);
    }
  }

  /**
   * Persists `newStreaks` to AsyncStorage and updates local state.
   * Pass `updateState = false` during the initial load to avoid a
   * superfluous re-render before `setLoaded(true)`.
   */
  async function save(newStreaks: Streak[], updateState = true): Promise<void> {
    if (updateState) setStreaks(newStreaks);
    else setStreaks(newStreaks); // always keep state in sync
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newStreaks));
  }

  function addStreak(title: string, emoji: string): void {
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

  function updateStreak(updated: Streak): void {
    const updatedList = streaks.map((s) => (s.id === updated.id ? updated : s));
    save(updatedList);
  }

  function deleteStreak(id: string): void {
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
