import { createContext, useContext, useEffect, useState } from "react";

type ThemeProviderType = {
  theme: "dark" | "light";
  setTheme: (theme: "dark" | "light") => void;
};

const ThemeContext = createContext<ThemeProviderType | null>(null);

export const useThemeProvider = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx)
    throw new Error("useThemeProvider must be used inside <ThemeProvider>");
  return ctx;
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setCurrentTheme] = useState<"dark" | "light">("dark");

  function setTheme(theme: "dark" | "light") {
    setCurrentTheme(theme);
    document.documentElement.setAttribute("data-theme", theme);
  }

  // Optional: Set initial theme from localStorage or system preference
  useEffect(() => {
    const storedTheme = localStorage.getItem("streakTrackerTheme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const initialTheme =
      (storedTheme as "dark" | "light") || (prefersDark ? "dark" : "light");
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem("streakTrackerTheme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
