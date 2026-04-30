import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { PageHero } from "@/components/site/PageHero";
import { Seo } from "@/components/site/Seo";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRight, Search, HelpCircle, Building2, Cpu, Wallet, ShieldCheck,
  Users, Banknote, Sparkles, MessageCircleQuestion,
} from "lucide-react";
import { SIGNUP_URL, SITE_URL } from "@/lib/constants";

type CategoryKey = "company" | "tech" | "deposits" | "fees" | "risk" | "account" | "referral";

interface FaqEntry {
  category: CategoryKey;
  q: string;
  a: string;
}

const categoryOrder: CategoryKey[] = ["company", "tech", "deposits", "fees", "risk", "account", "referral"];

const categoryIcons: Record<CategoryKey, typeof Building2> = {
  company: Building2,
  tech: Cpu,
  deposits: Wallet,
  fees: Banknote,
  risk: ShieldCheck,
  account: Users,
  referral: Sparkles,
};

const Faq = () => {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<"all" | CategoryKey>("all");

  const faqs = t("faqPage.items", { returnObjects: true }) as FaqEntry[];
  const categoryLabels = t("faqPage.categories", { returnObjects: true }) as Record<CategoryKey, string>;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faqs.filter((f) => {
      const matchCat = active === "all" || f.category === active;
      const matchQuery = !q || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [query, active, faqs]);

  const grouped = useMemo(() => {
    const map = new Map<CategoryKey, FaqEntry[]>();
    filtered.forEach((f) => {
      if (!map.has(f.category)) map.set(f.category, []);
      map.get(f.category)!.push(f);
    });
    return categoryOrder
      .filter((c) => map.has(c))
      .map((c) => [c, map.get(c)!] as const);
  }, [filtered]);

  return (
    <main className="min-h-screen bg-background">
      <Seo
        title={t("faqPage.seoTitle")}
        description={t("faqPage.seoDesc")}
        canonical={`${SITE_URL}/faq`}
      />
      <SiteHeader />

      <PageHero
        badge={t("faqPage.heroBadge")}
        title={t("faqPage.heroTitle")}
        subtitle={t("faqPage.heroSubtitle")}
        showBack
      />

      <section className="border-b border-border/50 bg-secondary/30 py-10">
        <div className="container max-w-5xl">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("faqPage.searchPlaceholder")}
              className="h-12 rounded-xl border-border/60 bg-card pl-11 text-sm"
              aria-label={t("faqPage.searchAria")}
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActive("all")}
              className={
                active === "all"
                  ? "rounded-full border border-primary/40 bg-primary/15 px-4 py-1.5 text-xs font-medium text-primary transition"
                  : "rounded-full border border-border/60 bg-card px-4 py-1.5 text-xs text-muted-foreground transition hover:border-primary/30 hover:text-foreground"
              }
            >
              {t("faqPage.all")}
            </button>
            {categoryOrder.map((c) => {
              const isActive = c === active;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setActive(c)}
                  className={
                    isActive
                      ? "rounded-full border border-primary/40 bg-primary/15 px-4 py-1.5 text-xs font-medium text-primary transition"
                      : "rounded-full border border-border/60 bg-card px-4 py-1.5 text-xs text-muted-foreground transition hover:border-primary/30 hover:text-foreground"
                  }
                >
                  {categoryLabels[c]}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container max-w-4xl">
          {grouped.length === 0 && (
            <Card className="bg-gradient-card p-10 text-center">
              <MessageCircleQuestion className="mx-auto h-10 w-10 text-primary" />
              <h3 className="mt-4 font-display text-xl font-semibold">{t("faqPage.noResultsTitle")}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t("faqPage.noResultsDesc")}</p>
            </Card>
          )}

          <div className="space-y-12">
            {grouped.map(([cat, items]) => {
              const Icon = categoryIcons[cat];
              return (
                <div key={cat}>
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="font-display text-xl font-semibold md:text-2xl">{categoryLabels[cat]}</h2>
                      <p className="text-xs text-muted-foreground">
                        {items.length} {items.length === 1 ? t("faqPage.questionSingular") : t("faqPage.questionPlural")}
                      </p>
                    </div>
                  </div>

                  <Accordion type="single" collapsible className="space-y-3">
                    {items.map((item, i) => (
                      <AccordionItem
                        key={`${cat}-${i}`}
                        value={`${cat}-${i}`}
                        className="rounded-xl border border-border/50 bg-card px-5 transition-colors hover:border-primary/30"
                      >
                        <AccordionTrigger className="text-left font-medium hover:no-underline">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container">
          <Card className="relative overflow-hidden bg-gradient-card p-8 md:p-12">
            <div className="absolute inset-0 bg-gradient-hero opacity-30" />
            <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <HelpCircle className="h-9 w-9 text-primary" />
                <h2 className="mt-4 font-display text-2xl font-bold md:text-3xl">{t("faqPage.ctaTitle")}</h2>
                <p className="mt-2 text-muted-foreground">{t("faqPage.ctaSubtitle")}</p>
              </div>
              <Button asChild variant="hero" size="lg" className="shrink-0">
                <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer">
                  {t("faqPage.ctaButton")} <ArrowRight className="ml-1 h-4 w-4" />
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

export default Faq;
