import { useTranslation, Trans } from "react-i18next";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { PageHero } from "@/components/site/PageHero";
import { Seo } from "@/components/site/Seo";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle2, Cpu, Clock, Wallet, TrendingDown, HelpCircle } from "lucide-react";
import { SIGNUP_URL, SITE_URL } from "@/lib/constants";

const highlightIcons = [Wallet, Clock, TrendingDown];

const Plans = () => {
  const { t } = useTranslation();
  const highlights = t("plansPage.highlights", { returnObjects: true }) as { title: string; desc: string }[];
  const plans = t("plansPage.plans", { returnObjects: true }) as { name: string; min: string; fee: string; features: string[] }[];
  const faqs = t("plansPage.faqs", { returnObjects: true }) as { q: string; a: string }[];

  return (
    <main className="min-h-screen bg-background">
      <Seo
        title={t("plansPage.seoTitle")}
        description={t("plansPage.seoDesc")}
        canonical={`${SITE_URL}/planos`}
      />
      <SiteHeader />
      <PageHero
        badge={t("plansPage.heroBadge")}
        title={t("plansPage.heroTitle")}
        subtitle={t("plansPage.heroSubtitle")}
        showBack
      />

      <section className="py-16">
        <div className="container max-w-4xl">
          <Card className="bg-gradient-card p-6 md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Cpu className="h-7 w-7" />
              </div>
              <div className="space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                  {t("plansPage.softwareTitle")}
                </h2>
                <p><Trans i18nKey="plansPage.softwareP1" components={{ 1: <span className="font-semibold text-foreground" />, 3: <span className="font-semibold text-foreground" /> }} /></p>
                <p><Trans i18nKey="plansPage.softwareP2" components={{ 1: <span className="font-semibold text-foreground" />, 3: <span className="font-semibold text-foreground" /> }} /></p>
                <p><Trans i18nKey="plansPage.softwareP3" components={{ 1: <span className="font-semibold text-foreground" />, 3: <span className="font-semibold text-foreground" />, 5: <span className="font-semibold text-foreground" />, 7: <span className="font-semibold text-foreground" /> }} /></p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 border-t border-border/50 pt-8 md:grid-cols-3">
              {highlights.map((h, idx) => {
                const Icon = highlightIcons[idx];
                return (
                  <div key={h.title} className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{h.title}</div>
                      <p className="mt-1 text-sm text-muted-foreground">{h.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </section>

      <section className="border-t border-border/50 bg-secondary/20 py-20">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
              {t("plansPage.allBadge")}
            </Badge>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">{t("plansPage.allTitle")}</h2>
            <p className="mt-3 text-muted-foreground">{t("plansPage.allSubtitle")}</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((p, i) => {
              const featured = i === 4;
              return (
                <Card
                  key={p.name}
                  className={`relative bg-gradient-card p-8 transition-all hover:-translate-y-1 ${featured ? "border-primary/60 shadow-glow" : ""}`}
                >
                  {featured && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-primary text-primary-foreground">
                      {t("plansPage.popular")}
                    </Badge>
                  )}
                  <h3 className="font-display text-2xl font-bold">{p.name}</h3>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="font-display text-4xl font-bold text-primary">{p.fee}</span>
                    <span className="text-sm text-muted-foreground">{t("plansPage.perfFee")}</span>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    {t("plansPage.from")} <span className="font-semibold text-foreground">{p.min}</span>
                  </div>

                  <ul className="mt-8 space-y-3">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Button asChild variant={featured ? "hero" : "outline"} className="mt-8 w-full">
                    <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer">
                      {t("common.startNow")}
                    </a>
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-border/50 py-20">
        <div className="container max-w-4xl">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
              <HelpCircle className="mr-1 h-3 w-3" />
              {t("plansPage.faqBadge")}
            </Badge>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">{t("plansPage.faqTitle")}</h2>
            <p className="mt-3 text-muted-foreground">{t("plansPage.faqSubtitle")}</p>
          </div>

          <Card className="bg-gradient-card p-2 md:p-4">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-border/50">
                  <AccordionTrigger className="text-left font-display text-base font-semibold hover:text-primary">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
};

export default Plans;
