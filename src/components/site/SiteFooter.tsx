import { Link } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import { Lock, ShieldCheck, Building2, Landmark, Globe2, Banknote, FlaskConical, MapPin, AlertTriangle } from "lucide-react";
import { Logo } from "./Logo";

const icons = [Building2, Landmark, Globe2, Banknote, FlaskConical, MapPin];

const items = [
  [
    { label: "Registry", value: "155771852" },
    { label: "SEC (USA) CIK", value: "0002085242" },
  ],
  [{ label: "Jurisdiction", value: "Wyoming, USA" }],
  [{ label: "Jurisdiction", value: "Polônia — UE" }],
  [
    { label: "Registry", value: "D1537006" },
    { label: "FinCEN", value: "31000306664168" },
  ],
  [{ label: "Registry", value: "78737300" }],
  [{ label: "Jurisdiction", value: "Nigéria" }],
];

export const SiteFooter = () => {
  const { t } = useTranslation();
  const regulations = (t("footer.regulations", { returnObjects: true }) as Array<{
    name: string; jurisdiction: string; description: string;
  }>) || [];
  const labelMap: Record<string, string> = {
    Registry: t("footer.registry"),
    Jurisdiction: t("footer.jurisdiction"),
    "SEC (USA) CIK": "SEC (USA) CIK",
    FinCEN: "FinCEN",
  };

  return (
    <footer className="border-t border-border/50 bg-background">
      <section className="relative border-b border-border/50 bg-gradient-to-b from-secondary/30 via-background to-background">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        <div className="container py-14">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              <ShieldCheck className="h-3.5 w-3.5" />
              {t("footer.regulationsBadge")}
            </div>
            <h3 className="mt-4 font-display text-2xl font-bold text-foreground md:text-3xl">
              {t("footer.groupTitle")}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">{t("footer.groupDesc")}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {regulations.map((r, idx) => {
              const Icon = icons[idx] ?? Building2;
              const rowItems = items[idx] ?? [];
              return (
                <div
                  key={r.name}
                  className="group relative overflow-hidden rounded-xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary/0 via-primary/60 to-primary/0 opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-display text-sm font-semibold leading-tight text-foreground">
                        {r.name}
                      </h4>
                      <p className="mt-0.5 flex items-center gap-1 text-[11px] font-medium uppercase tracking-wide text-primary/80">
                        <MapPin className="h-3 w-3" />
                        {r.jurisdiction}
                      </p>
                    </div>
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    {r.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5 border-t border-border/50 pt-3">
                    {rowItems.map((it) => (
                      <span
                        key={it.label}
                        className="inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-background/60 px-2 py-1 text-[11px]"
                      >
                        <span className="text-muted-foreground">{labelMap[it.label] ?? it.label}:</span>
                        <span className="font-mono font-semibold text-foreground">{it.value}</span>
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-center text-xs text-muted-foreground">
            <ShieldCheck className="mr-1 inline h-3.5 w-3.5 text-primary" />
            <Trans i18nKey="footer.groupNote" components={{ 1: <strong className="text-foreground" />, 3: <strong className="text-foreground" /> }} />
          </p>
        </div>
      </section>

      <section className="border-b border-border/50 bg-background">
        <div className="container py-8">
          <div className="mx-auto max-w-6xl rounded-xl border border-destructive/30 bg-destructive/5 p-5 md:p-6">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-destructive/10 text-destructive ring-1 ring-destructive/20">
                <AlertTriangle className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-base font-semibold text-foreground">{t("footer.riskTitle")}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{t("footer.riskBody")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              <Trans i18nKey="footer.tagline" components={{ 1: <strong className="text-foreground" /> }} />
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold">{t("footer.platform")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-foreground">{t("footer.links.home")}</Link></li>
              <li><Link to="/tecnologia" className="hover:text-foreground">{t("footer.links.tech")}</Link></li>
              <li><a href="/#desempenho" className="hover:text-foreground">{t("footer.links.perf")}</a></li>
              <li><a href="/#planos" className="hover:text-foreground">{t("footer.links.plans")}</a></li>
              <li><Link to="/baixar-app" className="font-medium text-primary hover:text-foreground">{t("footer.links.downloadApp")}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold">{t("footer.company")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/sobre" className="hover:text-foreground">{t("footer.links.about")}</Link></li>
              <li><Link to="/consultoria" className="hover:text-foreground">{t("footer.links.consultancy")}</Link></li>
              <li><Link to="/faq" className="hover:text-foreground">{t("footer.links.faq")}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold">{t("footer.legal")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/termos" className="hover:text-foreground">{t("footer.links.terms")}</Link></li>
              <li><Link to="/privacidade" className="hover:text-foreground">{t("footer.links.privacy")}</Link></li>
              <li><Link to="/aviso-de-risco" className="hover:text-foreground">{t("footer.links.risk")}</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 pb-20 text-xs text-muted-foreground sm:flex-row md:pb-8">
          <p className="text-center sm:text-left">
            {t("footer.copyright")}{" "}
            <a
              href="https://danielolimpio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:text-primary"
            >
              Daniel Olímpio
            </a>
          </p>
          <p className="flex items-center gap-2">
            <Lock className="h-3 w-3" />
            {t("footer.riskShort")}
          </p>
        </div>
      </div>
    </footer>
  );
};
