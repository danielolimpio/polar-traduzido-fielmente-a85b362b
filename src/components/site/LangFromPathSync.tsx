import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { detectLangFromPath } from "@/lib/routes";

/**
 * Sincroniza o idioma do i18next com o prefixo da URL.
 * /en/* -> en, /es/* -> es, restante -> pt.
 */
export const LangFromPathSync = () => {
  const { pathname } = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    const lang = detectLangFromPath(pathname);
    const current = (i18n.resolvedLanguage || i18n.language || "pt").split("-")[0];
    if (lang !== current) {
      i18n.changeLanguage(lang);
    }
  }, [pathname, i18n]);

  return null;
};
