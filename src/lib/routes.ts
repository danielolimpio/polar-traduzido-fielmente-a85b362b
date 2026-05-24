import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { SITE_URL } from "./constants";

export type LangCode = "pt" | "en" | "es" | "vi" | "fr" | "de" | "it";
export const LANGS: LangCode[] = ["pt", "en", "es", "vi", "fr", "de", "it"];

// hreflang code used on <link rel="alternate"> and sitemap entries
export const LANG_TO_HREFLANG: Record<LangCode, string> = {
  pt: "pt-BR",
  en: "en",
  es: "es",
  vi: "vi",
  fr: "fr",
  de: "de",
  it: "it",
};

export type RouteKey =
  | "home"
  | "about"
  | "technology"
  | "consultancy"
  | "plans"
  | "rewards"
  | "privacy"
  | "terms"
  | "risk"
  | "faq"
  | "downloadApp";

// PT permanece sem prefixo (idioma padrão). Os demais usam prefixo /xx.
export const ROUTE_SLUGS: Record<RouteKey, Record<LangCode, string>> = {
  home:        { pt: "",                en: "",                es: "",                vi: "",                  fr: "",                de: "",                  it: "" },
  about:       { pt: "sobre",           en: "about",           es: "sobre",           vi: "gioi-thieu",        fr: "a-propos",        de: "ueber-uns",         it: "chi-siamo" },
  technology:  { pt: "tecnologia",      en: "technology",      es: "tecnologia",      vi: "cong-nghe",         fr: "technologie",     de: "technologie",       it: "tecnologia" },
  consultancy: { pt: "consultoria",     en: "consultancy",     es: "consultoria",     vi: "tu-van",            fr: "conseil",         de: "beratung",          it: "consulenza" },
  plans:       { pt: "planos",          en: "plans",           es: "planes",          vi: "goi-cuoc",          fr: "plans",           de: "plaene",            it: "piani" },
  rewards:     { pt: "recompensas",     en: "rewards",         es: "recompensas",     vi: "phan-thuong",       fr: "recompenses",     de: "belohnungen",       it: "ricompense" },
  privacy:     { pt: "privacidade",     en: "privacy",         es: "privacidad",      vi: "bao-mat",           fr: "confidentialite", de: "datenschutz",       it: "privacy" },
  terms:       { pt: "termos",          en: "terms",           es: "terminos",        vi: "dieu-khoan",        fr: "conditions",      de: "agb",               it: "termini" },
  risk:        { pt: "aviso-de-risco",  en: "risk-disclosure", es: "aviso-de-riesgo", vi: "canh-bao-rui-ro",   fr: "avertissement-de-risque", de: "risikohinweis", it: "avviso-di-rischio" },
  faq:         { pt: "faq",             en: "faq",             es: "faq",             vi: "faq",               fr: "faq",             de: "faq",               it: "faq" },
  downloadApp: { pt: "baixar-app",      en: "download-app",    es: "descargar-app",   vi: "tai-ung-dung",      fr: "telecharger-app", de: "app-herunterladen", it: "scarica-app" },
};

export const langPrefix = (lang: LangCode) => (lang === "pt" ? "" : `/${lang}`);

export const buildPath = (key: RouteKey, lang: LangCode): string => {
  const slug = ROUTE_SLUGS[key][lang];
  const prefix = langPrefix(lang);
  if (!slug) return prefix || "/";
  return `${prefix}/${slug}`;
};

export const buildUrl = (key: RouteKey, lang: LangCode): string => {
  const path = buildPath(key, lang);
  return `${SITE_URL}${path === "/" ? "/" : path}`;
};

export const buildAlternates = (key: RouteKey): Record<string, string> => {
  const out: Record<string, string> = {};
  for (const lang of LANGS) {
    out[LANG_TO_HREFLANG[lang]] = buildUrl(key, lang);
  }
  out["pt"] = buildUrl(key, "pt");
  out["x-default"] = buildUrl(key, "pt");
  return out;
};

const NON_PT_PREFIXES = LANGS.filter((l) => l !== "pt");

export const detectLangFromPath = (pathname: string): LangCode => {
  const seg = pathname.split("/")[1];
  if ((NON_PT_PREFIXES as string[]).includes(seg)) return seg as LangCode;
  return "pt";
};

export const useCurrentLang = (): LangCode => {
  const { i18n } = useTranslation();
  const base = (i18n.resolvedLanguage || i18n.language || "pt").split("-")[0];
  return (LANGS.includes(base as LangCode) ? base : "pt") as LangCode;
};

export const useLocalizedPath = (key: RouteKey): string => {
  const lang = useCurrentLang();
  return buildPath(key, lang);
};

export const useLocalizedUrl = (key: RouteKey): string => {
  const lang = useCurrentLang();
  return buildUrl(key, lang);
};

const PREFIX_RE = new RegExp(`^/(${NON_PT_PREFIXES.join("|")})(?=/|$)`);

export const matchRouteKey = (pathname: string): RouteKey | null => {
  const clean = pathname.replace(PREFIX_RE, "") || "/";
  const slug = clean.replace(/^\//, "").split("/")[0];
  if (!slug) return "home";
  for (const lang of LANGS) {
    for (const key of Object.keys(ROUTE_SLUGS) as RouteKey[]) {
      if (ROUTE_SLUGS[key][lang] === slug) return key;
    }
  }
  return null;
};

export const useMatchedRouteKey = (): RouteKey | null => {
  const { pathname } = useLocation();
  return matchRouteKey(pathname);
};
