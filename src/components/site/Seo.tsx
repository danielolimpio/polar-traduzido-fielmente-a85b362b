import { useEffect } from "react";
import { useTranslation } from "react-i18next";

interface SeoProps {
  title: string;
  description: string;
  canonical: string;
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

const LANG_TO_OG: Record<string, string> = {
  pt: "pt_BR",
  en: "en_US",
  es: "es_ES",
};
const LANG_TO_HTML: Record<string, string> = {
  pt: "pt-BR",
  en: "en",
  es: "es",
};

const DEFAULT_OG_IMAGE = "https://polartensor.trade/og-image.png";

export const Seo = ({ title, description, canonical, image, jsonLd }: SeoProps) => {
  const { i18n } = useTranslation();
  const lang = (i18n.language || "pt").split("-")[0];

  useEffect(() => {
    const ogImage = image || DEFAULT_OG_IMAGE;
    document.title = title;
    document.documentElement.lang = LANG_TO_HTML[lang] || lang;

    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:url"]', "content", canonical);
    setMeta('meta[property="og:image"]', "content", ogImage);
    setMeta('meta[property="og:locale"]', "content", LANG_TO_OG[lang] || "pt_BR");
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);
    setMeta('meta[name="twitter:image"]', "content", ogImage);

    upsertLink("canonical", canonical);
    // Hreflang alternates (mesma URL para os 3 idiomas - estratégia atual)
    upsertLink("alternate", canonical, "pt-BR");
    upsertLink("alternate", canonical, "pt");
    upsertLink("alternate", canonical, "en");
    upsertLink("alternate", canonical, "es");
    upsertLink("alternate", canonical, "x-default");

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
  }, [title, description, canonical, image, jsonLd, lang]);
  return null;
};
