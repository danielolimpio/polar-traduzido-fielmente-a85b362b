import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { RouteKey, buildAlternates, buildUrl } from "@/lib/routes";

interface SeoProps {
  title: string;
  description: string;
  /**
   * URL canônica completa. Opcional quando `routeKey` é fornecido —
   * nesse caso é calculada automaticamente a partir do idioma atual.
   */
  canonical?: string;
  /**
   * Chave da rota: gera canonical localizada, alternates hreflang e og:url.
   * Sempre prefira este modo para suportar /en/ e /es/.
   */
  routeKey?: RouteKey;
  image?: string;
  jsonLd?: object | object[];
}

const setMeta = (selector: string, attr: string, value: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    const [, key, val] = selector.match(/\[([^=]+)="([^"]+)"\]/) || [];
    if (key && val) el.setAttribute(key, val);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
};

const upsertLink = (rel: string, href: string, hreflang?: string) => {
  const sel = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let link = document.head.querySelector<HTMLLinkElement>(sel);
  if (!link) {
    link = document.createElement("link");
    link.rel = rel;
    if (hreflang) link.hreflang = hreflang;
    document.head.appendChild(link);
  }
  link.href = href;
};

const removeAlternates = () => {
  document.head
    .querySelectorAll('link[rel="alternate"][hreflang]')
    .forEach((el) => el.remove());
};

const LANG_TO_OG: Record<string, string> = {
  pt: "pt_BR",
  en: "en_US",
  es: "es_ES",
  vi: "vi_VN",
  fr: "fr_FR",
  de: "de_DE",
  it: "it_IT",
};
const LANG_TO_HTML: Record<string, string> = {
  pt: "pt-BR",
  en: "en",
  es: "es",
  vi: "vi",
  fr: "fr",
  de: "de",
  it: "it",
};
const SUPPORTED: ReadonlyArray<"pt" | "en" | "es" | "vi" | "fr" | "de" | "it"> = ["pt", "en", "es", "vi", "fr", "de", "it"];

const DEFAULT_OG_IMAGE = "https://polartensor.trade/og-image.jpg";

export const Seo = ({ title, description, canonical, routeKey, image, jsonLd }: SeoProps) => {
  const { i18n } = useTranslation();
  const lang = (i18n.language || "pt").split("-")[0];

  useEffect(() => {
    const ogImage = image || DEFAULT_OG_IMAGE;
    const resolvedCanonical =
      canonical ||
      (routeKey ? buildUrl(routeKey, (SUPPORTED.includes(lang as typeof SUPPORTED[number]) ? lang : "pt") as typeof SUPPORTED[number]) : "");

    document.title = title;
    document.documentElement.lang = LANG_TO_HTML[lang] || lang;

    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    if (resolvedCanonical) setMeta('meta[property="og:url"]', "content", resolvedCanonical);
    setMeta('meta[property="og:image"]', "content", ogImage);
    setMeta('meta[property="og:locale"]', "content", LANG_TO_OG[lang] || "pt_BR");
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);
    setMeta('meta[name="twitter:image"]', "content", ogImage);

    if (resolvedCanonical) upsertLink("canonical", resolvedCanonical);

    // Recalcula alternates por idioma sempre que a rota muda
    removeAlternates();
    if (routeKey) {
      const alts = buildAlternates(routeKey);
      Object.entries(alts).forEach(([hl, href]) => upsertLink("alternate", href, hl));
    } else if (resolvedCanonical) {
      upsertLink("alternate", resolvedCanonical, "x-default");
    }

    // Inject per-page JSON-LD
    const id = "seo-page-jsonld";
    document.getElementById(id)?.remove();
    if (jsonLd) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = id;
      script.text = JSON.stringify(Array.isArray(jsonLd) ? jsonLd : [jsonLd]);
      document.head.appendChild(script);
    }

    return () => {
      document.getElementById(id)?.remove();
    };
  }, [title, description, canonical, routeKey, image, jsonLd, lang]);
  return null;
};
