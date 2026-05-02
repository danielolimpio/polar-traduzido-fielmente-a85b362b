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

const LANG_TO_OG_LOCALE: Record<string, string> = {
  pt: "pt_BR",
  en: "en_US",
  es: "es_ES",
};

const LANG_TO_HTML_LANG: Record<string, string> = {
  pt: "pt-BR",
  en: "en",
  es: "es",
};

const setOrCreateMeta = (selector: string, attr: string, value: string) => {
  if (typeof document === "undefined") return;
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    const m = selector.match(/\[([^=]+)="([^"]+)"\]/);
    if (m) el.setAttribute(m[1], m[2]);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
};

i18n.on("languageChanged", (lng) => {
  if (typeof document === "undefined") return;
  const base = lng.split("-")[0];
  document.documentElement.lang = LANG_TO_HTML_LANG[base] || lng;
  const ogLocale = LANG_TO_OG_LOCALE[base] || "pt_BR";
  setOrCreateMeta('meta[property="og:locale"]', "content", ogLocale);
});

export default i18n;
