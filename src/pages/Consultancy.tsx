import { useTranslation } from "react-i18next";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { PageHero } from "@/components/site/PageHero";
import { Seo } from "@/components/site/Seo";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Building2, Landmark, Users } from "lucide-react";
import { SITE_URL } from "@/lib/constants";
import { useState, FormEvent } from "react";
import { toast } from "@/hooks/use-toast";

const segmentIcons = [Building2, Landmark, Users];

const Consultancy = () => {
  const { t } = useTranslation();
  const [submitting, setSubmitting] = useState(false);
  const segments = t("consultancy.segments", { returnObjects: true }) as { t: string; d: string }[];

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      (e.target as HTMLFormElement).reset();
      toast({
        title: t("consultancy.toastTitle"),
        description: t("consultancy.toastDesc"),
      });
    }, 800);
  };

  return (
    <main className="min-h-screen bg-background">
      <Seo
        title={t("consultancy.seoTitle")}
        description={t("consultancy.seoDesc")}
        routeKey="consultancy"
      />
      <SiteHeader />
      <PageHero
        badge={t("consultancy.heroBadge")}
        title={t("consultancy.heroTitle")}
        subtitle={t("consultancy.heroSubtitle")}
        showBack
      />

      <section className="py-16">
        <div className="container">
          <div className="grid gap-5 md:grid-cols-3">
            {segments.map((s, idx) => {
              const Icon = segmentIcons[idx];
              return (
                <Card key={s.t} className="bg-gradient-card p-8 text-center">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-display text-lg font-semibold">{s.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container max-w-3xl">
          <Card className="bg-gradient-card p-8 md:p-10">
            <h2 className="font-display text-2xl font-bold">{t("consultancy.formTitle")}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{t("consultancy.formSubtitle")}</p>

            <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">{t("consultancy.fullName")}</Label>
                <Input id="name" required placeholder={t("consultancy.fullNamePh")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="org">{t("consultancy.org")}</Label>
                <Input id="org" placeholder={t("consultancy.orgPh")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t("consultancy.email")}</Label>
                <Input id="email" type="email" required placeholder={t("consultancy.emailPh")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">{t("consultancy.phone")}</Label>
                <Input id="phone" placeholder={t("consultancy.phonePh")} />
              </div>
              <div className="space-y-2">
                <Label>{t("consultancy.clientType")}</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder={t("consultancy.clientTypePh")} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="corporate">{t("consultancy.clientCorporate")}</SelectItem>
                    <SelectItem value="institutional">{t("consultancy.clientInstitutional")}</SelectItem>
                    <SelectItem value="hnw">{t("consultancy.clientHnw")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{t("consultancy.investRange")}</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder={t("consultancy.investRangePh")} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="100k">{t("consultancy.range1")}</SelectItem>
                    <SelectItem value="500k">{t("consultancy.range2")}</SelectItem>
                    <SelectItem value="1m">{t("consultancy.range3")}</SelectItem>
                    <SelectItem value="5m+">{t("consultancy.range4")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="msg">{t("consultancy.msg")}</Label>
                <Textarea id="msg" rows={5} placeholder={t("consultancy.msgPh")} />
              </div>
              <div className="md:col-span-2">
                <Button type="submit" variant="hero" size="lg" className="w-full" disabled={submitting}>
                  {submitting ? t("consultancy.submitting") : t("consultancy.submit")}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
};

export default Consultancy;
