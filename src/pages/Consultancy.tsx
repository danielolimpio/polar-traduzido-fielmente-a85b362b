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

const segments = [
  { icon: Building2, t: "Clientes Corporativos", d: "Empresas em busca de gestão estratégica de investimentos." },
  { icon: Landmark, t: "Investidores Institucionais", d: "Instituições financeiras que demandam estratégias avançadas." },
  { icon: Users, t: "Indivíduos de Alto Patrimônio", d: "Clientes privados com portfólios significativos." },
];

const Consultancy = () => {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      (e.target as HTMLFormElement).reset();
      toast({
        title: "Solicitação enviada",
        description: "Nossa equipe institucional entrará em contato em até 1 dia útil.",
      });
    }, 800);
  };

  return (
    <main className="min-h-screen bg-background">
      <Seo
        title="Consultoria Institucional | Polar Tensor"
        description="Consultoria sob medida para clientes corporativos, investidores institucionais e indivíduos de alto patrimônio. Estratégias dedicadas com IA da Polar Tensor."
        canonical={`${SITE_URL}/consultoria`}
      />
      <SiteHeader />
      <PageHero
        badge="Serviços institucionais"
        title="Consultoria Institucional & Alto Patrimônio"
        subtitle="Para clientes corporativos, investidores institucionais e indivíduos de alto patrimônio que requerem estratégias de investimento sob medida e suporte dedicado."
        showBack
      />

      <section className="py-16">
        <div className="container">
          <div className="grid gap-5 md:grid-cols-3">
            {segments.map((s) => (
              <Card key={s.t} className="bg-gradient-card p-8 text-center">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <s.icon className="h-7 w-7" />
                </div>
                <h3 className="font-display text-lg font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container max-w-3xl">
          <Card className="bg-gradient-card p-8 md:p-10">
            <h2 className="font-display text-2xl font-bold">Solicite uma consultoria</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Preencha o formulário e nossa equipe entrará em contato em até 1 dia útil.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo *</Label>
                <Input id="name" required placeholder="Seu nome" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="org">Empresa / Organização</Label>
                <Input id="org" placeholder="Empresa (opcional)" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail *</Label>
                <Input id="email" type="email" required placeholder="voce@empresa.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone (opcional)</Label>
                <Input id="phone" placeholder="+55 (11) 00000-0000" />
              </div>
              <div className="space-y-2">
                <Label>Tipo de cliente</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Selecione uma opção" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="corporate">Cliente Corporativo</SelectItem>
                    <SelectItem value="institutional">Investidor Institucional</SelectItem>
                    <SelectItem value="hnw">Alto Patrimônio</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Faixa de investimento</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Selecione uma faixa" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="100k">100k – 500k USDT</SelectItem>
                    <SelectItem value="500k">500k – 1M USDT</SelectItem>
                    <SelectItem value="1m">1M – 5M USDT</SelectItem>
                    <SelectItem value="5m+">Acima de 5M USDT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="msg">Conte sobre seus objetivos e necessidades</Label>
                <Textarea id="msg" rows={5} placeholder="Compartilhe contexto, metas e prazos..." />
              </div>
              <div className="md:col-span-2">
                <Button type="submit" variant="hero" size="lg" className="w-full" disabled={submitting}>
                  {submitting ? "Enviando..." : "Solicitar consultoria"}
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
