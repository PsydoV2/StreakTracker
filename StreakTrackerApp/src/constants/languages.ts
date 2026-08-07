export type Language = "en" | "de" | "es" | "fr" | "it" | "tr" | "pt" | "ja";

export const LANGUAGES: { code: Language; flag: string; name: string }[] = [
  { code: "en", flag: "🇺🇸", name: "EN" },
  { code: "de", flag: "🇩🇪", name: "DE" },
  { code: "fr", flag: "🇫🇷", name: "FR" },
  { code: "es", flag: "🇪🇸", name: "ES" },
  { code: "it", flag: "🇮🇹", name: "IT" },
  { code: "tr", flag: "🇹🇷", name: "TR" },
  { code: "pt", flag: "🇧🇷", name: "PT" },
  { code: "ja", flag: "🇯🇵", name: "JA" },
];
