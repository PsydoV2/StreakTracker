// src/context/StreaksContext.tsx
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { differenceInCalendarDays } from "date-fns";
import { STORAGE_KEYS } from "@/src/constants/storageKeys";

// cycle = interval in days (1 = daily, 2 = every 2 days, 7 = weekly, 30 = monthly, …)
export type Streak = {
  id: string;
  title: string;
  emoji: string;
  cycle: number;
  dateLastTracker: string;
  dateCreatedAt: string;
  dateRestartedAt: string | null;
  streakCount: number;
  archived: boolean;
  record: number;
  trackingDates: string[];
};

const STORAGE_KEY = STORAGE_KEYS.streaks;

// Migration map for old string-based cycle values
const LEGACY_CYCLE_MAP: Record<string, number> = {
  daily: 1,
  weekly: 7,
  monthly: 30,
};

type StreakContextType = {
  streaks: Streak[];
  loaded: boolean;
  addStreak: (title: string, emoji: string, cycle?: number) => void;
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

  // Stable identity (empty deps: only closes over setStreaks/STORAGE_KEY) so
  // it can safely be a dependency of the mount effect below without
  // re-triggering it on every render.
  const save = useCallback(async (newStreaks: Streak[]): Promise<void> => {
    setStreaks(newStreaks);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newStreaks));
  }, []);

  // loadStreaks is scoped to the effect (same pattern as AuthScreen's init
  // effect) rather than a component-level function, so it only ever runs
  // once on mount instead of whenever something in this component re-renders.
  useEffect(() => {
    const loadStreaks = async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);

        if (json) {
          const parsed = JSON.parse(json) as any[];
          const now = new Date();

          const checked = parsed.map((s): Streak => {
            // Migrate legacy string cycle values
            const rawCycle = s.cycle;
            const cycle: number =
              typeof rawCycle === "number"
                ? rawCycle
                : typeof rawCycle === "string"
                  ? (LEGACY_CYCLE_MAP[rawCycle] ?? 1)
                  : 1;

            const migrated: Streak = { ...s, cycle };

            if (migrated.archived) return migrated;

            const last = new Date(migrated.dateLastTracker);
            const daysSinceLast = differenceInCalendarDays(now, last);
            const hasStarted = migrated.trackingDates.length > 0;

            // Archive if more than one full interval has been missed
            if (hasStarted && daysSinceLast > cycle) {
              return { ...migrated, archived: true };
            }

            return migrated;
          });

          await save(checked);
        }
      } catch (error) {
        console.error("[StreaksContext] Failed to load streaks:", error);
      } finally {
        setLoaded(true);
      }
    };

    loadStreaks();
  }, [save]);

  function addStreak(title: string, emoji: string, cycle: number = 1): void {
    const newStreak: Streak = {
      id: uuid.v4() as string,
      title,
      emoji,
      cycle,
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
