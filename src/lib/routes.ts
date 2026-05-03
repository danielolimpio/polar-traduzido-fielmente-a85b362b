import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { SITE_URL } from "./constants";

export type LangCode = "pt" | "en" | "es";
export const LANGS: LangCode[] = ["pt", "en", "es"];

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

// PT permanece sem prefixo (idioma padrão). EN e ES usam prefixo /en e /es.
export const ROUTE_SLUGS: Record<RouteKey, Record<LangCode, string>> = {
  home:        { pt: "",                en: "",                es: "" },
  about:       { pt: "sobre",           en: "about",           es: "sobre" },
  technology:  { pt: "tecnologia",      en: "technology",      es: "tecnologia" },
  consultancy: { pt: "consultoria",     en: "consultancy",     es: "consultoria" },
  plans:       { pt: "planos",          en: "plans",           es: "planes" },
  rewards:     { pt: "recompensas",     en: "rewards",         es: "recompensas" },
  privacy:     { pt: "privacidade",     en: "privacy",         es: "privacidad" },
  terms:       { pt: "termos",          en: "terms",           es: "terminos" },
  risk:        { pt: "aviso-de-risco",  en: "risk-disclosure", es: "aviso-de-riesgo" },
  faq:         { pt: "faq",             en: "faq",             es: "faq" },
  downloadApp: { pt: "baixar-app",      en: "download-app",    es: "descargar-app" },
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

export const buildAlternates = (key: RouteKey): Record<string, string> => ({
  "pt-BR": buildUrl(key, "pt"),
  pt: buildUrl(key, "pt"),
  en: buildUrl(key, "en"),
  es: buildUrl(key, "es"),
  "x-default": buildUrl(key, "pt"),
});

export const detectLangFromPath = (pathname: string): LangCode => {
  const seg = pathname.split("/")[1];
  if (seg === "en" || seg === "es") return seg;
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

/**
 * Dado o pathname atual, identifica qual RouteKey ele representa
 * (em qualquer idioma). Útil para o LanguageSwitcher trocar de idioma
 * preservando a página atual.
 */
export const matchRouteKey = (pathname: string): RouteKey | null => {
  // Remove possível prefixo de idioma
  const clean = pathname.replace(/^\/(en|es)(?=\/|$)/, "") || "/";
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
