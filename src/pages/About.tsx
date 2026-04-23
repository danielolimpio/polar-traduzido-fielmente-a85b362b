import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { PageHero } from "@/components/site/PageHero";
import { Seo } from "@/components/site/Seo";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, Globe2, Landmark, ShieldCheck, FileCheck2, Award, ArrowRight } from "lucide-react";
import { SIGNUP_URL, SITE_URL } from "@/lib/constants";

const entities = [
  {
    region: "Estados Unidos",
    name: "Polar MSB Inc.",
    location: "Sheridan, Wyoming",
    reg: "Nº D1537006",
    extra: "FinCEN: 31000306664168",
  },
  {
    region: "Europa",
    name: "Polar Tensor SP ZOO",
    location: "República da Polônia",
    reg: "KRS: 0001234567",
    extra: "Conformidade com regulação europeia",
  },
  {
    region: "Ásia",
    name: "Polar Tensor LAB Limited",
    location: "Hong Kong, RAE",
    reg: "Nº 78737300",
    extra: "P&D em redes neurais e trading",
  },
  {
    region: "América Central",
    name: "Polar Tensor Corp.",
    location: "Cidade do Panamá",
    reg: "Nº 155771852",
    extra: "Operação técnica e execução",
  },
];

const polarFamily = [
  {
    name: "Polar Money",
    desc: "A fintech do grupo, oferecendo contas multi-moeda, cartões VISA, carteiras digitais e corretora de criptomoedas.",
    items: ["Contas multi-moeda", "Cartões VISA Platinum", "Carteiras digitais", "Exchange cripto"],
  },
  {
    name: "Polar Research",
    desc: "Centro científico de pesquisa em algoritmos de trading com IA e publicação de papers acadêmicos.",
    items: ["Pesquisa aplicada", "Publicações científicas", "Análise quantitativa", "Parcerias acadêmicas"],
  },
];

const About = () => (
  <main className="min-h-screen bg-background">
    <Seo
      title="Sobre a Polar Tensor | Pesquisa em IA para Geração de Riqueza"
      description="Conheça a Polar Tensor: estrutura corporativa global, entidades licenciadas nos EUA, Europa, Hong Kong e Panamá, e nosso compromisso com pesquisa em IA aplicada ao mercado financeiro."
      canonical={`${SITE_URL}/sobre`}
    />
    <SiteHeader />
    <PageHero
      badge="Sobre nós"
      title="Conectando pesquisa em IA à geração de riqueza"
      subtitle="Exploramos a fronteira da inteligência artificial e da modelagem matemática para desenvolver abordagens inovadoras ainda não testadas no mercado financeiro tradicional."
      showBack
    />

    <section className="py-20">
      <div className="container max-w-4xl">
        <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">Visão Geral</Badge>
        <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">Quem somos</h2>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          A Polar Tensor é uma empresa global de tecnologia financeira e pesquisa, focada em soluções
          inovadoras para o setor financeiro. Atuamos em múltiplas jurisdições, mantendo licenças e
          conformidade regulatória em locais estratégicos como Estados Unidos, União Europeia, Hong Kong
          e Panamá — sempre com transparência e documentação acessíveis.
        </p>
      </div>
    </section>

    <section className="border-y border-border/50 bg-secondary/30 py-20">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">Estrutura corporativa</Badge>
          <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">Entidades licenciadas</h2>
          <p className="mt-3 text-muted-foreground">
            Operamos por meio de entidades dedicadas em diferentes jurisdições, cada uma cumprindo seu
            papel regulatório e operacional.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {entities.map((e) => (
            <Card key={e.region} className="bg-gradient-card p-6">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Globe2 className="h-5 w-5" />
                </div>
                <Badge variant="outline" className="border-primary/30 text-xs text-primary">{e.region}</Badge>
              </div>
              <h3 className="font-display text-xl font-semibold">{e.name}</h3>
              <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                <div><span className="text-foreground">Localização: </span>{e.location}</div>
                <div><span className="text-foreground">Registro: </span>{e.reg}</div>
                <div className="text-xs">{e.extra}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20">
      <div className="container">
        <Card className="bg-gradient-card p-8 md:p-10">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <FileCheck2 className="h-7 w-7" />
            </div>
            <div className="flex-1">
              <h3 className="font-display text-xl font-semibold">Auditoria por firma global</h3>
              <p className="mt-2 text-muted-foreground">
                Toda nossa estrutura legal é revisada e verificada periodicamente por uma das quatro grandes
                firmas globais de auditoria, reforçando o compromisso com transparência e conformidade.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>

    <section className="border-y border-border/50 bg-secondary/30 py-20">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">Família Polar</Badge>
          <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">O ecossistema Polar Tensor</h2>
          <p className="mt-3 text-muted-foreground">
            A Polar Tensor é a empresa âncora de um ecossistema integrado, cada parte desempenhando um
            papel distinto no novo cenário financeiro e tecnológico.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {polarFamily.map((f) => (
            <Card key={f.name} className="bg-gradient-card p-8">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                {f.name === "Polar Money" ? <Landmark className="h-6 w-6" /> : <Award className="h-6 w-6" />}
              </div>
              <h3 className="font-display text-xl font-semibold">{f.name}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{f.desc}</p>
              <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
                {f.items.map((i) => (
                  <li key={i} className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-primary" /> {i}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20">
      <div className="container">
        <Card className="relative overflow-hidden bg-gradient-card p-10 text-center">
          <div className="absolute inset-0 bg-gradient-hero opacity-30" />
          <div className="relative">
            <Building2 className="mx-auto h-10 w-10 text-primary" />
            <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-bold md:text-4xl">
              Faça parte de uma plataforma com fundamentos sólidos
            </h2>
            <Button asChild variant="hero" size="lg" className="mt-8">
              <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer">
                Cadastre-se agora <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
          </div>
        </Card>
      </div>
    </section>

    <SiteFooter />
  </main>
);

export default About;
