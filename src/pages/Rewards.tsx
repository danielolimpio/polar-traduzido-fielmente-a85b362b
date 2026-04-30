import { useTranslation, Trans } from "react-i18next";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { PageHero } from "@/components/site/PageHero";
import { Seo } from "@/components/site/Seo";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, Bot, TrendingUp, CalendarDays, CalendarCheck, Wallet, Banknote,
  Clock, Receipt, Repeat, Users, Network, Trophy, Infinity as InfinityIcon,
  Sparkles, Crown, Gem,
} from "lucide-react";
import { SIGNUP_URL, SITE_URL } from "@/lib/constants";

const businessRuleIcons = [Bot, TrendingUp, CalendarDays, CalendarCheck, Wallet, Banknote, Clock, Receipt, Repeat];

const referralLevels = [
  "20%", "15%", "10%", "5%", "4%", "3%", "3%", "2%", "2%", "2%", "1%", "1%", "1%", "0,5%", "0,5%",
].map((value, i) => ({ level: i + 1, value }));

const residualLevels = [
  "10%", "5%", "4%", "3%", "2%", "2%", "1%", "1%", "1%", "1%",
].map((value, i) => ({ level: i + 1, value }));

const Rewards = () => {
  const { t } = useTranslation();
  const businessRules = t("rewardsPage.businessRules", { returnObjects: true }) as { label: string; value: string }[];
  const ranks = t("rewardsPage.ranks", { returnObjects: true }) as { name: string; bonus: string }[];
  const infiniteRewards = t("rewardsPage.infiniteRewards", { returnObjects: true }) as { name: string; value: string }[];

  return (
    <main className="min-h-screen bg-background">
      <Seo
        title={t("rewardsPage.seoTitle")}
        description={t("rewardsPage.seoDesc")}
        canonical={`${SITE_URL}/recompensas`}
      />
      <SiteHeader />
      <PageHero
        badge={t("rewardsPage.heroBadge")}
        title={t("rewardsPage.heroTitle")}
        subtitle={t("rewardsPage.heroSubtitle")}
        showBack
      />

      <section className="py-20">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">{t("rewardsPage.rulesBadge")}</Badge>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
              {t("rewardsPage.rulesTitle1")} <span className="text-gradient-primary">{t("rewardsPage.rulesTitle2")}</span>
            </h2>
            <p className="mt-3 text-muted-foreground">{t("rewardsPage.rulesSubtitle")}</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {businessRules.map((b, idx) => {
              const Icon = businessRuleIcons[idx];
              return (
                <Card key={b.label} className="bg-gradient-card p-6">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">{b.label}</p>
                  <p className="mt-1 font-display text-lg font-semibold text-foreground">{b.value}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-border/50 bg-secondary/30 py-20">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">{t("rewardsPage.referralBadge")}</Badge>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
              {t("rewardsPage.referralTitle1")} <span className="text-gradient-primary">{t("rewardsPage.referralTitle2")}</span>
            </h2>
            <p className="mt-3 text-muted-foreground">{t("rewardsPage.referralSubtitle")}</p>
            <Card className="mx-auto mt-6 inline-flex max-w-xl items-center gap-3 border-primary/30 bg-primary/5 p-4 text-left">
              <Users className="h-5 w-5 shrink-0 text-primary" />
              <p className="text-sm text-muted-foreground">
                <Trans i18nKey="rewardsPage.referralRule" components={{ 1: <strong className="text-foreground" /> }} />
              </p>
            </Card>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {referralLevels.map((l) => (
              <Card key={l.level} className="group relative overflow-hidden bg-gradient-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary/0 via-primary/60 to-primary/0 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t("rewardsPage.levelLabel")} {String(l.level).padStart(2, "0")}
                  </span>
                  <Network className="h-4 w-4 text-primary/60" />
                </div>
                <p className="mt-3 font-display text-2xl font-bold text-gradient-primary">{l.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{t("rewardsPage.ofLicense")}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">{t("rewardsPage.residualBadge")}</Badge>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
              {t("rewardsPage.residualTitle1")} <span className="text-gradient-primary">{t("rewardsPage.residualTitle2")}</span>
            </h2>
            <p className="mt-3 text-muted-foreground">{t("rewardsPage.residualSubtitle")}</p>
            <Card className="mx-auto mt-6 inline-flex max-w-xl items-center gap-3 border-primary/30 bg-primary/5 p-4 text-left">
              <Sparkles className="h-5 w-5 shrink-0 text-primary" />
              <p className="text-sm text-muted-foreground">
                <Trans i18nKey="rewardsPage.referralRule" components={{ 1: <strong className="text-foreground" /> }} />
              </p>
            </Card>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {residualLevels.map((l) => (
              <Card key={l.level} className="group relative overflow-hidden bg-gradient-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary/0 via-primary/60 to-primary/0 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t("rewardsPage.levelLabel")} {String(l.level).padStart(2, "0")}
                  </span>
                  <TrendingUp className="h-4 w-4 text-primary/60" />
                </div>
                <p className="mt-3 font-display text-2xl font-bold text-gradient-primary">{l.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{t("rewardsPage.ofTrade")}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border/50 bg-secondary/30 py-20">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">{t("rewardsPage.rankBadge")}</Badge>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
              {t("rewardsPage.rankTitle1")} <span className="text-gradient-primary">{t("rewardsPage.rankTitle2")}</span>
            </h2>
            <p className="mt-3 text-muted-foreground">{t("rewardsPage.rankSubtitle")}</p>
            <Card className="mx-auto mt-6 inline-flex max-w-xl items-center gap-3 border-primary/30 bg-primary/5 p-4 text-left">
              <Trophy className="h-5 w-5 shrink-0 text-primary" />
              <p className="text-sm text-muted-foreground">
                <Trans i18nKey="rewardsPage.rankRule" components={{ 1: <strong className="text-foreground" /> }} />
              </p>
            </Card>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {ranks.map((r, i) => (
              <Card key={r.name} className="group relative overflow-hidden bg-gradient-card p-6 text-center transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10">
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary/0 via-primary/60 to-primary/0 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                  {i >= 7 ? <Gem className="h-6 w-6" /> : i >= 4 ? <Crown className="h-6 w-6" /> : <Trophy className="h-6 w-6" />}
                </div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{t("rewardsPage.rankLabel")} {String(i + 1).padStart(2, "0")}</p>
                <p className="mt-1 font-display text-lg font-semibold text-foreground">{r.name}</p>
                <p className="mt-3 font-display text-xl font-bold text-gradient-primary">{r.bonus}</p>
                <p className="mt-1 text-xs text-muted-foreground">{t("rewardsPage.bonusLabel")}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">{t("rewardsPage.infiniteBadge")}</Badge>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
              {t("rewardsPage.infiniteTitle1")} <span className="text-gradient-primary">{t("rewardsPage.infiniteTitle2")}</span> {t("rewardsPage.infiniteTitle3")}
            </h2>
            <p className="mt-3 text-muted-foreground">{t("rewardsPage.infiniteSubtitle")}</p>
            <Card className="mx-auto mt-6 inline-flex max-w-xl items-center gap-3 border-primary/30 bg-primary/5 p-4 text-left">
              <InfinityIcon className="h-5 w-5 shrink-0 text-primary" />
              <p className="text-sm text-muted-foreground">
                <Trans i18nKey="rewardsPage.infiniteRule" components={{ 1: <strong className="text-foreground" /> }} />
              </p>
            </Card>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {infiniteRewards.map((r) => (
              <Card key={r.name} className="group relative overflow-hidden bg-gradient-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10">
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary/0 via-primary/60 to-primary/0 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="flex items-center justify-between">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20">
                    <InfinityIcon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("rewardsPage.rankLabel")}</span>
                </div>
                <p className="mt-4 font-display text-lg font-semibold text-foreground">{r.name}</p>
                <p className="mt-2 font-display text-3xl font-bold text-gradient-primary">{r.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{t("rewardsPage.ofTeam")}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border/50 bg-secondary/30 py-20">
        <div className="container">
          <Card className="relative overflow-hidden bg-gradient-card p-10 text-center md:p-14">
            <div className="absolute inset-0 bg-gradient-hero opacity-30" />
            <div className="relative">
              <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Trophy className="h-6 w-6" />
              </div>
              <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-bold md:text-4xl">
                {t("rewardsPage.ctaTitle1")} <span className="text-gradient-primary">{t("rewardsPage.ctaTitle2")}</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{t("rewardsPage.ctaSubtitle")}</p>
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

export default Rewards;
