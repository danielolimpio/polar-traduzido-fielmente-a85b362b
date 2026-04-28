import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Menu, Smartphone, X } from "lucide-react";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { SIGNUP_URL } from "@/lib/constants";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

export const SiteHeader = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/sobre", label: t("nav.about") },
    { to: "/tecnologia", label: t("nav.technology") },
    { to: "/consultoria", label: t("nav.consultancy") },
    { to: "/planos", label: t("nav.plans") },
    { to: "/recompensas", label: t("nav.rewards") },
    { to: "/faq", label: t("nav.faq") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  "text-sm transition-colors hover:text-foreground",
                  isActive ? "text-foreground" : "text-muted-foreground",
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher className="hidden sm:inline-flex" />
          <Button asChild variant="outline" size="sm" className="hidden border-primary/40 bg-primary/5 text-primary hover:bg-primary/10 hover:text-primary lg:inline-flex">
            <Link to="/baixar-app" aria-label={t("common.downloadAppFull")}>
              <Smartphone className="mr-1.5 h-3.5 w-3.5" />
              {t("common.downloadApp")}
            </Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer">{t("common.signIn")}</a>
          </Button>
          <Button asChild variant="hero" size="sm">
            <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer">
              {t("common.signUp")} <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </a>
          </Button>
          <button
            type="button"
            className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-md border border-border md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={t("common.openMenu")}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border/50 bg-background md:hidden">
          <nav className="container flex flex-col gap-1 py-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded px-2 py-2 text-sm text-muted-foreground hover:bg-secondary"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 px-2">
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
