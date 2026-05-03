import { useTranslation } from "react-i18next";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { PageHero } from "@/components/site/PageHero";
import { Seo } from "@/components/site/Seo";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Activity, ArrowRight, BarChart3, Cpu, Database, Gauge, LineChart, Network,
  ShieldCheck, Sparkles, TrendingUp, Zap, Clock, Layers, BookOpen,
} from "lucide-react";
import { SIGNUP_URL, SITE_URL } from "@/lib/constants";

const stageIcons = [Network, Gauge, Cpu];
const edgeIcons = [Sparkles, Layers, TrendingUp, Clock, ShieldCheck, Activity];
const dataIcons = [BarChart3, Database, LineChart, BookOpen];

const Technology = () => {
  const { t } = useTranslation();
  const stages = t("technology.stages", { returnObjects: true }) as { title: string; desc: string; bullets: string[] }[];
  const edge = t("technology.edge", { returnObjects: true }) as { t: string; d: string }[];
  const data = t("technology.data", { returnObjects: true }) as { t: string; d: string }[];
  const metrics = t("technology.metrics", { returnObjects: true }) as { v: string; t: string; d: string }[];

  return (
    <main className="min-h-screen bg-background">
      <Seo
        title={t("technology.seoTitle")}
        description={t("technology.seoDesc")}
        routeKey="technology"
      />
      <SiteHeader />
      <PageHero
        badge={t("technology.heroBadge")}
        title={t("technology.heroTitle")}
        subtitle={t("technology.heroSubtitle")}
        showBack
      />

      <section className="py-20">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-3">
            {stages.map((s, idx) => {
              const Icon = stageIcons[idx];
              return (
                <Card key={s.title} className="bg-gradient-card p-8">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-xl font-semibold">{s.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{s.desc}</p>
                  <ul className="mt-5 space-y-2 text-sm">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2">
                        <Zap className="h-3.5 w-3.5 text-primary" /> {b}
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>

          <Card className="mt-10 border-primary/30 bg-primary/5 p-8">
            <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary">{t("technology.hypothesisBadge")}</Badge>
            <p className="mt-4 text-muted-foreground">{t("technology.hypothesisText")}</p>
          </Card>
        </div>
      </section>

      <section className="border-y border-border/50 bg-secondary/30 py-20">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">{t("technology.edgeBadge")}</Badge>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">{t("technology.edgeTitle")}</h2>
            <p className="mt-3 text-muted-foreground">{t("technology.edgeSubtitle")}</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {edge.map((e, idx) => {
              const Icon = edgeIcons[idx];
              return (
                <Card key={e.t} className="bg-gradient-card p-6">
                  <Icon className="mb-4 h-7 w-7 text-primary" />
                  <h3 className="font-display text-lg font-semibold">{e.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{e.d}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">{t("technology.dataBadge")}</Badge>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">{t("technology.dataTitle")}</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {data.map((d, idx) => {
              const Icon = dataIcons[idx];
              return (
                <Card key={d.t} className="bg-gradient-card p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold">{d.t}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{d.d}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-border/50 bg-secondary/30 py-20">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">{t("technology.metricsBadge")}</Badge>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">{t("technology.metricsTitle")}</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-4">
            {metrics.map((m) => (
              <Card key={m.t} className="bg-gradient-card p-6 text-center">
                <div className="font-display text-3xl font-bold text-primary">{m.v}</div>
                <div className="mt-2 font-semibold">{m.t}</div>
                <div className="mt-1 text-xs text-muted-foreground">{m.d}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container text-center">
          <Button asChild variant="hero" size="lg">
            <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer">
              {t("common.accessPlatform")} <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
};

export default Technology;
