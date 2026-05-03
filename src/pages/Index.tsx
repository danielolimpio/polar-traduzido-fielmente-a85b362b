import { Link } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Activity,
  ArrowRight,
  Brain,
  ChartLine,
  CheckCircle2,
  Cpu,
  Database,
  Download,
  Gauge,
  Globe,
  LineChart,
  Network,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TrendingUp,
  Wallet,
  Zap,
} from "lucide-react";
import appImg from "@/assets/hero-app.jpeg";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SIGNUP_URL } from "@/lib/constants";
import { PerformanceChart as Performance } from "@/components/site/PerformanceChart";
import { BinancePanel } from "@/components/site/BinancePanel";
import { VideoShowcase } from "@/components/site/VideoShowcase";
import { Seo } from "@/components/site/Seo";
import { useLocalizedPath } from "@/lib/routes";

const CtaButton = ({
  children,
  variant = "hero",
  size = "lg",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "hero" | "outline" | "ghost";
  size?: "sm" | "lg" | "default";
  className?: string;
}) => (
  <Button asChild variant={variant} size={size} className={className}>
    <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer" aria-label="Polar Tensor">
      {children}
    </a>
  </Button>
);

const Hero = () => {
  const { t } = useTranslation();
  const downloadAppPath = useLocalizedPath("downloadApp");
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute left-1/2 top-0 -z-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />

      <div className="container relative grid gap-12 py-16 md:py-24 lg:grid-cols-2 lg:items-center lg:py-28">
        <div className="animate-fade-up space-y-8">
          <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
            <Sparkles className="mr-1.5 h-3 w-3" />
            {t("hero.badge")}
          </Badge>

          <h1 className="font-display text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="text-gradient-primary">{t("hero.title1")}</span>
            <br />
            {t("hero.title2")}
            <br />
            {t("hero.title3")}
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
            <Trans i18nKey="hero.description" components={{ 1: <strong className="text-foreground" /> }} />
          </p>

          <div className="flex flex-wrap gap-3">
            <CtaButton size="lg">
              <Download className="mr-2 h-4 w-4" />
              {t("common.signUpFree")}
            </CtaButton>
            <Button asChild variant="outline" size="lg">
              <Link to={downloadAppPath} aria-label={t("common.downloadAppFull")}>
                <Smartphone className="mr-2 h-4 w-4" />
                {t("common.downloadAppFull")}
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-6">
            <div>
              <div className="font-display text-3xl font-bold text-primary">~3%</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{t("hero.stat1")}</div>
            </div>
            <div>
              <div className="font-display text-3xl font-bold text-primary">&lt;50ms</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{t("hero.stat2")}</div>
            </div>
            <div>
              <div className="font-display text-3xl font-bold text-primary">20K+</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{t("hero.stat3")}</div>
            </div>
          </div>
        </div>

        <div className="relative animate-fade-up [animation-delay:200ms]">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-primary opacity-20 blur-2xl" />
          <div className="relative animate-float">
            <img
              src={appImg}
              alt={t("hero.imageAlt")}
              className="mx-auto w-[280px] rounded-[2.5rem] border border-border/50 shadow-card md:w-[320px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const trustIcons = [Database, Brain, ShieldCheck];

const Trust = () => {
  const { t } = useTranslation();
  const items = t("trust.items", { returnObjects: true }) as Array<{ title: string; desc: string }>;
  return (
    <section id="sobre" className="py-24">
      <div className="container">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">{t("trust.badge")}</Badge>
          <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">
            {t("trust.title1")} <span className="text-gradient-primary">{t("trust.title2")}</span>
          </h2>
          <p className="mt-4 text-muted-foreground">{t("trust.subtitle")}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((p, i) => {
            const Icon = trustIcons[i];
            return (
              <Card key={p.title} className="group bg-gradient-card p-8 transition-all hover:-translate-y-1 hover:shadow-glow">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-display text-xl font-semibold">{p.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const techIcons = [LineChart, Database, Zap, TrendingUp];

const TechnologySection = () => {
  const { t } = useTranslation();
  const items = t("techHome.items", { returnObjects: true }) as Array<{ title: string; desc: string }>;
  return (
    <section id="tecnologia" className="border-y border-border/50 bg-secondary/30 py-24">
      <div className="container">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">{t("techHome.badge")}</Badge>
          <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">
            {t("techHome.title1")} <span className="text-gradient-primary">{t("techHome.title2")}</span>
          </h2>
          <p className="mt-4 text-muted-foreground">{t("techHome.subtitle")}</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {items.map((c, i) => {
            const Icon = techIcons[i];
            return (
              <Card key={c.title} className="bg-gradient-card p-6 transition-all hover:border-primary/40">
                <Icon className="mb-4 h-7 w-7 text-primary" />
                <h3 className="mb-2 font-display text-lg font-semibold">{c.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const engineIcons = [Network, Gauge, Cpu];

const Engine = () => {
  const { t } = useTranslation();
  const items = t("engine.items", { returnObjects: true }) as Array<{ title: string; desc: string }>;
  return (
    <section className="py-24">
      <div className="container">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">{t("engine.badge")}</Badge>
          <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">
            {t("engine.title1")} <span className="text-gradient-primary">{t("engine.title2")}</span>
          </h2>
          <p className="mt-4 text-muted-foreground">{t("engine.subtitle")}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((p, i) => {
            const Icon = engineIcons[i];
            return (
              <Card key={p.title} className="relative bg-gradient-card p-8">
                <div className="absolute right-6 top-6 font-display text-5xl font-bold text-primary/20">
                  0{i + 1}
                </div>
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 font-display text-xl font-semibold">{p.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              </Card>
            );
          })}
        </div>

        <Card className="mt-10 bg-gradient-card p-8 md:p-10">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Activity className="h-7 w-7" />
            </div>
            <div className="flex-1">
              <h3 className="mb-2 font-display text-xl font-semibold">{t("engine.opTitle")}</h3>
              <p className="text-muted-foreground">{t("engine.opDesc")}</p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

const Plans = () => {
  const { t } = useTranslation();
  const plansPath = useLocalizedPath("plans");
  const plans = (t("plansHome.items", { returnObjects: true }) as Array<{
    name: string; min: string; fee: string; features: string[];
  }>).map((p, i) => ({ ...p, featured: i === 1 }));

  return (
    <section id="planos" className="py-24">
      <div className="container">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">{t("plansHome.badge")}</Badge>
          <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">
            {t("plansHome.title1")} <span className="text-gradient-primary">{t("plansHome.title2")}</span>
          </h2>
          <p className="mt-4 text-muted-foreground">{t("plansHome.subtitle")}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <Card
              key={p.name}
              className={`relative bg-gradient-card p-8 transition-all hover:-translate-y-1 ${
                p.featured ? "border-primary/60 shadow-glow" : ""
              }`}
            >
              {p.featured && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-primary text-primary-foreground">
                  {t("plansHome.popular")}
                </Badge>
              )}
              <h3 className="font-display text-2xl font-bold">{p.name}</h3>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-4xl font-bold text-primary">{p.fee}</span>
                <span className="text-sm text-muted-foreground">{t("plansHome.perfFee")}</span>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {t("plansHome.from")} <span className="font-semibold text-foreground">{p.min}</span>
              </div>

              <ul className="mt-8 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Button asChild
                variant={p.featured ? "hero" : "outline"}
                className="mt-8 w-full"
              >
                <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer">{t("plansHome.start")}</a>
              </Button>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button asChild variant="outline" size="lg">
            <Link to={plansPath}>{t("plansHome.seeAll")} <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

const benefitIcons = [Wallet, ChartLine, Sparkles, ShieldCheck];

const Rewards = () => {
  const { t } = useTranslation();
  const benefits = t("rewardsHome.benefits", { returnObjects: true }) as Array<{ t: string; d: string }>;
  const ranks = t("rewardsHome.ranks", { returnObjects: true }) as Array<{ t: string; v: string; b: string }>;
  return (
    <section className="border-y border-border/50 bg-secondary/30 py-24">
      <div className="container grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">{t("rewardsHome.badge")}</Badge>
          <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">
            {t("rewardsHome.title1")} <span className="text-gradient-primary">{t("rewardsHome.title2")}</span>
          </h2>
          <p className="mt-4 text-muted-foreground">{t("rewardsHome.subtitle")}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {benefits.map((b, i) => {
              const Icon = benefitIcons[i];
              return (
                <div key={b.t} className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold">{b.t}</div>
                    <div className="text-sm text-muted-foreground">{b.d}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <Card className="bg-gradient-card p-5 sm:p-8">
          <h3 className="font-display text-xl font-semibold">{t("rewardsHome.ranksTitle")}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{t("rewardsHome.ranksSubtitle")}</p>

          <div className="mt-6 grid grid-cols-[auto_1fr_auto] items-center gap-x-3 px-3 pb-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground sm:gap-x-6 sm:px-4 sm:text-xs">
            <span>{t("rewardsHome.colRank")}</span>
            <span className="text-right sm:text-left">{t("rewardsHome.colVolume")}</span>
            <span className="text-right">{t("rewardsHome.colBonus")}</span>
          </div>

          <div className="space-y-2">
            {ranks.map((row) => (
              <div
                key={row.t}
                className="grid grid-cols-[auto_1fr_auto] items-center gap-x-3 rounded-lg border border-border/50 bg-background/40 px-3 py-2.5 text-xs sm:gap-x-6 sm:px-4 sm:py-3 sm:text-sm"
              >
                <span className="font-semibold">{row.t}</span>
                <span className="text-right tabular-nums text-muted-foreground sm:text-left">{row.v}</span>
                <span className="text-right tabular-nums font-medium text-primary">{row.b}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
};

const FAQ = () => {
  const { t } = useTranslation();
  const items = t("faqHome.items", { returnObjects: true }) as Array<{ q: string; a: string }>;
  return (
    <section id="faq" className="py-24">
      <div className="container max-w-3xl">
        <div className="mb-12 text-center">
          <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">{t("faqHome.badge")}</Badge>
          <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">
            {t("faqHome.title1")} <span className="text-gradient-primary">{t("faqHome.title2")}</span>
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {items.map((item, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="rounded-xl border border-border/50 bg-card px-5"
            >
              <AccordionTrigger className="text-left font-medium hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

const CTA = () => {
  const { t } = useTranslation();
  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute left-1/2 top-1/2 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px]" />
      <div className="container relative text-center">
        <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">{t("ctaHome.badge")}</Badge>
        <h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-bold md:text-6xl">
          {t("ctaHome.title1")} <span className="text-gradient-primary">{t("ctaHome.title2")}</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{t("ctaHome.subtitle")}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <CtaButton size="lg">
            <Download className="mr-2 h-4 w-4" />
            {t("ctaHome.btn1")}
          </CtaButton>
          <CtaButton variant="outline" size="lg">
            <Globe className="mr-2 h-4 w-4" />
            {t("ctaHome.btn2")}
          </CtaButton>
        </div>
        <p className="mt-6 text-xs text-muted-foreground">{t("ctaHome.footer")}</p>
      </div>
    </section>
  );
};

const BinanceVideo = () => {
  const { t } = useTranslation();
  return (
    <VideoShowcase
      badge={t("video.binance.badge")}
      titleStart={t("video.binance.titleStart")}
      titleHighlight={t("video.binance.titleHighlight")}
      description={t("video.binance.description")}
      videoSrc="/videos/polar-tensor-binance.mp4"
      showCta={false}
    />
  );
};

const Index = () => {
  const { t } = useTranslation();
  return (
    <main className="min-h-screen bg-background">
      <Seo
        title={t("home.seoTitle")}
        description={t("home.seoDesc")}
        routeKey="home"
      />
      <SiteHeader />
      <Hero />
      <VideoShowcase />
      <Trust />
      <TechnologySection />
      <BinancePanel />
      <BinanceVideo />
      <Engine />
      <Performance />
      <Plans />
      <Rewards />
      <FAQ />
      <CTA />
      <SiteFooter />
    </main>
  );
};

export default Index;
