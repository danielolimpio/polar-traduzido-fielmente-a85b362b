import { useTranslation } from "react-i18next";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { PageHero } from "@/components/site/PageHero";
import { Seo } from "@/components/site/Seo";
import { Card } from "@/components/ui/card";
import { SITE_URL } from "@/lib/constants";

type LegalSection = {
  title: string;
  paragraphs?: string[];
  list?: string[];
  after?: string[];
};

const Privacy = () => {
  const { t } = useTranslation();
  const sections = t("privacy.sections", { returnObjects: true }) as LegalSection[];

  return (
    <main className="min-h-screen bg-background">
      <Seo
        title={t("privacy.seoTitle")}
        description={t("privacy.seoDesc")}
        canonical={`${SITE_URL}/privacidade`}
      />
      <SiteHeader />
      <PageHero
        badge={t("privacy.heroBadge")}
        title={t("privacy.heroTitle")}
        subtitle={t("privacy.heroSubtitle")}
        showBack
      />

      <section className="py-16">
        <div className="container max-w-3xl">
          <Card className="space-y-8 bg-card p-8 md:p-10">
            {sections.map((s, i) => (
              <section key={i} className="space-y-3">
                <h2 className="font-display text-xl font-semibold text-primary">{i + 1}. {s.title}</h2>
                <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                  {s.paragraphs?.map((p, j) => <p key={j}>{p}</p>)}
                  {s.list && (
                    <ul className="list-disc pl-6">
                      {s.list.map((li, j) => <li key={j}>{li}</li>)}
                    </ul>
                  )}
                  {s.after?.map((p, j) => <p key={`a-${j}`}>{p}</p>)}
                </div>
              </section>
            ))}
          </Card>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
};

export default Privacy;
