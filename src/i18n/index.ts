import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import pt from "./locales/pt.json";
import en from "./locales/en.json";
import es from "./locales/es.json";
import vi from "./locales/vi.json";
import fr from "./locales/fr.json";
import de from "./locales/de.json";
import it from "./locales/it.json";

export const SUPPORTED_LANGS = [
  { code: "pt", label: "Português", flag: "br" },
  { code: "en", label: "English", flag: "gb" },
  { code: "es", label: "Español", flag: "es" },
  { code: "fr", label: "Français", flag: "fr" },
  { code: "de", label: "Deutsch", flag: "de" },
  { code: "it", label: "Italiano", flag: "it" },
  { code: "vi", label: "Tiếng Việt", flag: "vn" },
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
      vi: { translation: vi },
      fr: { translation: fr },
      de: { translation: de },
      it: { translation: it },
    },
    fallbackLng: "pt",
    supportedLngs: ["pt", "en", "es", "vi", "fr", "de", "it"],
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
  vi: "vi_VN",
  fr: "fr_FR",
  de: "de_DE",
  it: "it_IT",
};

const LANG_TO_HTML_LANG: Record<string, string> = {
  pt: "pt-BR",
  en: "en",
  es: "es",
  vi: "vi",
  fr: "fr",
  de: "de",
  it: "it",
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
