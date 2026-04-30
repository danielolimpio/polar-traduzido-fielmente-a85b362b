import { useTranslation } from "react-i18next";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Seo } from "@/components/site/Seo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Smartphone, Apple, Bell, Wallet, TrendingUp, BarChart3, ShieldCheck, Zap, Eye, ArrowRight,
} from "lucide-react";
import { SIGNUP_URL, SITE_URL } from "@/lib/constants";
import appHome from "@/assets/app-home.jpeg";
import appWallet from "@/assets/app-wallet.webp";
import appTrading from "@/assets/app-trading.webp";
import appTransparency from "@/assets/app-transparency.webp";

const APP_STORE_URL = "https://apps.apple.com/app/polar-tensor";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.polartensor";

const featureImages = [appHome, appWallet, appTrading, appTransparency];
const featureIcons = [Eye, Wallet, TrendingUp, BarChart3];
const highlightIcons = [Zap, Bell, ShieldCheck];

const DownloadApp = () => {
  const { t } = useTranslation();
  const features = t("downloadAppPage.features", { returnObjects: true }) as { title: string; desc: string }[];
  const highlights = t("downloadAppPage.highlights", { returnObjects: true }) as { title: string; desc: string }[];

  const StoreButtons = ({ className = "" }: { className?: string }) => (
    <div className={`flex flex-col items-center justify-center gap-3 sm:flex-row ${className}`}>
      <Button asChild variant="hero" size="lg" className="w-full sm:w-auto">
        <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" aria-label={t("downloadAppPage.appStoreAria")}>
          <Apple className="mr-2 h-5 w-5" />
          {t("downloadAppPage.appStore")}
        </a>
      </Button>
      <Button asChild variant="hero" size="lg" className="w-full sm:w-auto">
        <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" aria-label={t("downloadAppPage.playStoreAria")}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-2 h-5 w-5 fill-current">
            <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.205 12l2.493-2.491zM5.864 2.658L16.802 8.99l-2.302 2.302-8.636-8.634z"/>
          </svg>
          {t("downloadAppPage.playStore")}
        </a>
      </Button>
    </div>
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: "Polar Tensor App",
    operatingSystem: "iOS, Android",
    applicationCategory: "FinanceApplication",
    description: t("downloadAppPage.seoDesc"),
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", ratingCount: "1280" },
    downloadUrl: `${SITE_URL}/baixar-app`,
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={t("downloadAppPage.seoTitle")}
        description={t("downloadAppPage.seoDesc")}
        canonical={`${SITE_URL}/baixar-app`}
        jsonLd={jsonLd}
      />
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-border/50 bg-gradient-hero">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute left-1/2 top-0 -z-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
        <div className="container relative py-20 text-center md:py-28">
          <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
            <Smartphone className="mr-1.5 h-3.5 w-3.5" />
            {t("downloadAppPage.available")}
          </Badge>
          <h1 className="mx-auto mt-6 max-w-4xl font-display text-4xl font-bold leading-tight md:text-6xl">
            {t("downloadAppPage.title1")} <span className="text-gradient-primary">{t("downloadAppPage.title2")}</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">{t("downloadAppPage.subtitle")}</p>
          <StoreButtons className="mt-10" />

          <div className="mx-auto mt-14 max-w-xs">
            <div className="relative">
              <div className="absolute -inset-6 rounded-[3rem] bg-gradient-primary opacity-25 blur-2xl" />
              <div className="relative animate-float">
                <img
                  src={appHome}
                  alt={t("downloadAppPage.imgAlt")}
                  className="mx-auto w-[260px] rounded-[2.5rem] border border-border/50 shadow-card"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border/50 bg-secondary/30 py-16">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-3">
            {highlights.map((h, idx) => {
              const Icon = highlightIcons[idx];
              return (
                <Card key={h.title} className="bg-gradient-card p-6">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-1 font-display text-lg font-semibold">{h.title}</h3>
                  <p className="text-sm text-muted-foreground">{h.desc}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container space-y-24">
          {features.map((f, idx) => {
            const Icon = featureIcons[idx];
            const reverse = idx % 2 === 1;
            return (
              <div
                key={f.title}
                className={`grid items-center gap-12 lg:grid-cols-2 ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}
              >
                <div className="relative mx-auto w-full max-w-[280px]">
                  <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-primary opacity-20 blur-2xl" />
                  <img
                    src={featureImages[idx]}
                    alt={t("downloadAppPage.featureAlt", { title: f.title })}
                    className="relative mx-auto w-full rounded-[2rem] border border-border/50 shadow-card"
                    loading="lazy"
                  />
                </div>
                <div>
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="font-display text-3xl font-bold md:text-4xl">{f.title}</h2>
                  <p className="mt-4 text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="border-t border-border/50 bg-gradient-hero py-20">
        <div className="container">
          <Card className="mx-auto max-w-3xl bg-gradient-card p-10 text-center">
            <h2 className="font-display text-3xl font-bold md:text-4xl">{t("downloadAppPage.ctaTitle")}</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">{t("downloadAppPage.ctaSubtitle")}</p>
            <StoreButtons className="mt-8" />
            <div className="mt-8 text-sm">
              <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline">
                {t("downloadAppPage.ctaSignup")} <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </Card>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default DownloadApp;
