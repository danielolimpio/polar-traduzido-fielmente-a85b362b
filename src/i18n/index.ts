import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import pt from "./locales/pt.json";
import en from "./locales/en.json";
import es from "./locales/es.json";

export const SUPPORTED_LANGS = [
  { code: "pt", label: "Portuguese", flag: "pt" },
  { code: "en", label: "English", flag: "gb" },
  { code: "es", label: "Spanish", flag: "es" },
] as const;

export type LangCode = (typeof SUPPORTED_LANGS)[number]["code"];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      pt: { translation: pt },
      en: { translation: en },
      es: { translation: es },
    },
    fallbackLng: "pt",
    supportedLngs: ["pt", "en", "es"],
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
      lookupLocalStorage: "polar-lang",
    },
  });

i18n.on("languageChanged", (lng) => {
  if (typeof document !== "undefined") {
    document.documentElement.lang = lng;
  }
});

export default i18n;
