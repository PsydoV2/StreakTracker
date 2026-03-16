import React, { createContext, useContext, useEffect, useState } from "react";
import i18n from "i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocales } from "expo-localization";

type Language = "en" | "de" | "es" | "fr" | "it" | "tr" | "pt" | "ja";

type LanguageContextType = {
  language: Language;
  setLanguage: (lng: Language) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const streakTrackerLanguageKey = "streakTrackerLanguage";

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const initLanguage = async () => {
      const savedLng = await AsyncStorage.getItem(streakTrackerLanguageKey);
      const fallback = getLocales()[0]?.languageCode || "en";
      const lng = (savedLng || fallback) as Language;

      await i18n.changeLanguage(lng);
      setLanguageState(lng);
    };

    initLanguage();
  }, []);

  const setLanguage = async (lng: Language) => {
    await i18n.changeLanguage(lng);
    await AsyncStorage.setItem(streakTrackerLanguageKey, lng);
    setLanguageState(lng);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};
