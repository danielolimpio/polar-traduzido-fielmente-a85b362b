import { useTranslation, Trans } from "react-i18next";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { PageHero } from "@/components/site/PageHero";
import { Seo } from "@/components/site/Seo";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Building2, Target, History, Sparkles, Bot, CheckCircle2,
  TrendingUp, Calendar, Users, Code2, Database, Server, Sigma, ArrowRight,
} from "lucide-react";
import { SIGNUP_URL, SITE_URL } from "@/lib/constants";
import felixPicture from "@/assets/felix-bick.webp?w=160;240;320&format=avif;webp&as=picture";
import felixBlur from "@/assets/felix-bick.webp?w=24&blur=400&format=webp&as=src";
import { ResponsiveImage } from "@/components/site/ResponsiveImage";

const businessIcons = [Calendar, TrendingUp, Bot, CheckCircle2];
const teamIcons = [Database, Server, Sigma, Code2];

const About = () => {
  const { t } = useTranslation();
  const businessInfo = t("about.businessInfo", { returnObjects: true }) as { label: string; value: string }[];
  const team = t("about.team", { returnObjects: true }) as { role: string; count: string }[];
  const historyBullets = t("about.historyBullets", { returnObjects: true }) as string[];
  const visionBullets = t("about.visionBullets", { returnObjects: true }) as string[];

  return (
    <main className="min-h-screen bg-background">
      <Seo
        title={t("about.seoTitle")}
        description={t("about.seoDesc")}
        routeKey="about"
      />
      <SiteHeader />
      <PageHero
        badge={t("about.heroBadge")}
        title={t("about.heroTitle")}
        subtitle={t("about.heroSubtitle")}
        showBack
      />

      <section className="py-20">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">{t("about.whoBadge")}</Badge>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
              {t("about.whoTitle1")} <span className="text-gradient-primary">{t("about.whoTitle2")}</span>
            </h2>
            <p className="mt-3 text-muted-foreground">{t("about.whoSubtitle")}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-gradient-card p-8">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <History className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-semibold">{t("about.historyTitle")}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                <Trans i18nKey="about.historyText" components={{ 1: <strong className="text-foreground" />, 3: <strong className="text-foreground" />, 5: <strong className="text-foreground" />, 7: <strong className="text-foreground" /> }} />
              </p>
              <ul className="mt-5 space-y-2 text-sm">
                {historyBullets.map((b) => (
                  <li key={b} className="flex items-center gap-2"><Sparkles className="h-3.5 w-3.5 text-primary" /> {b}</li>
                ))}
              </ul>
            </Card>

            <Card className="bg-gradient-card p-8">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-semibold">{t("about.visionTitle")}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                <Trans i18nKey="about.visionText" components={{ 1: <strong className="text-foreground" /> }} />
              </p>
              <ul className="mt-5 space-y-2 text-sm">
                {visionBullets.map((b) => (
                  <li key={b} className="flex items-center gap-2"><Sparkles className="h-3.5 w-3.5 text-primary" /> {b}</li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <section className="border-y border-border/50 bg-secondary/30 py-20">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">{t("about.partnerBadge")}</Badge>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
              {t("about.partnerTitle1")} <span className="text-gradient-primary">{t("about.partnerTitle2")}</span>
            </h2>
            <p className="mt-3 text-muted-foreground">{t("about.partnerSubtitle")}</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {businessInfo.map((b, idx) => {
              const Icon = businessIcons[idx];
              return (
                <Card key={b.label} className="bg-gradient-card p-6 text-center">
                  <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">{b.label}</p>
                  <p className="mt-2 font-display text-2xl font-bold text-foreground">{b.value}</p>
                </Card>
              );
            })}
          </div>

          <Card className="mx-auto mt-8 max-w-3xl border-primary/30 bg-primary/5 p-6">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <p className="text-sm leading-relaxed text-muted-foreground">
                <Trans i18nKey="about.directInvestor" components={{ 1: <strong className="text-foreground" /> }} />
              </p>
            </div>
          </Card>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">{t("about.teamBadge")}</Badge>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
              {t("about.teamTitle1")} <span className="text-gradient-primary">{t("about.teamTitle2")}</span>
            </h2>
            <p className="mt-3 text-muted-foreground">{t("about.teamSubtitle")}</p>
          </div>

          <Card className="overflow-hidden bg-gradient-card">
            <div className="grid gap-0 md:grid-cols-[320px_1fr]">
              <div className="relative h-[420px] md:h-auto">
                <ResponsiveImage
                  picture={felixPicture}
                  placeholder={felixBlur}
                  alt={t("about.founderPhotoAlt")}
                  width={400}
                  height={400}
                  sizes="(min-width: 768px) 320px, 100vw"
                  wrapperClassName="h-full w-full"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-8 md:p-10">
                <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">{t("about.founderBadge")}</Badge>
                <h3 className="mt-3 font-display text-2xl font-bold md:text-3xl">{t("about.founderName")}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  <Trans i18nKey="about.founderBio1" components={{ 1: <strong className="text-foreground" /> }} />
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t("about.founderBio2")}</p>
              </div>
            </div>
          </Card>

          <div className="mt-12">
            <div className="mx-auto mb-8 max-w-2xl text-center">
              <div className="inline-flex items-center gap-2 text-primary">
                <Users className="h-5 w-5" />
                <span className="text-xs font-medium uppercase tracking-wider">{t("about.teamLabel")}</span>
              </div>
              <h3 className="mt-3 font-display text-2xl font-bold md:text-3xl">{t("about.teamSpecialists")}</h3>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((m, idx) => {
                const Icon = teamIcons[idx];
                return (
                  <Card key={m.role} className="bg-gradient-card p-6 text-center">
                    <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <p className="font-display text-3xl font-bold text-primary">{m.count}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{m.role}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border/50 bg-secondary/30 py-20">
        <div className="container">
          <Card className="relative overflow-hidden bg-gradient-card p-10 text-center md:p-14">
            <div className="absolute inset-0 bg-gradient-hero opacity-30" />
            <div className="relative">
              <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Building2 className="h-6 w-6" />
              </div>
              <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-bold md:text-4xl">
                {t("about.ctaTitle1")} <span className="text-gradient-primary">{t("about.ctaTitle2")}</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{t("about.ctaSubtitle")}</p>
              <Button asChild variant="hero" size="lg" className="mt-8">
                <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer">
                  {t("common.signUpCta")} <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
};

export default About;
