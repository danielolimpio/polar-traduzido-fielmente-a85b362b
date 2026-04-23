import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { PageHero } from "@/components/site/PageHero";
import { Seo } from "@/components/site/Seo";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Target,
  History,
  Sparkles,
  Bot,
  CheckCircle2,
  TrendingUp,
  Calendar,
  Users,
  Code2,
  Database,
  Server,
  Sigma,
  ArrowRight,
} from "lucide-react";
import { SIGNUP_URL, SITE_URL } from "@/lib/constants";
import felixPhoto from "@/assets/felix-bick.png";

const businessInfo = [
  { icon: Calendar, label: "Empresa registrada desde", value: "2018" },
  { icon: TrendingUp, label: "Operando trade desde", value: "2020" },
  { icon: Bot, label: "Operando na Binance desde", value: "2024" },
  { icon: CheckCircle2, label: "Conta empresarial Binance", value: "VIP 9" },
];

const team = [
  { icon: Database, role: "Cientistas de Dados em IA", count: "3x" },
  { icon: Server, role: "DevOps", count: "1x" },
  { icon: Sigma, role: "Matemático", count: "1x" },
  { icon: Code2, role: "CTO Fundador", count: "1x" },
];

const About = () => (
  <main className="min-h-screen bg-background">
    <Seo
      title="Sobre a Polar Tensor | Binance Partner & Pesquisa em IA"
      description="Polar Tensor — Binance Partner com conta VIP 9. Algoritmos proprietários de trading em criptomoedas desde 2018, sede de P&D em Hong Kong e fundo registrado no Panamá."
      canonical={`${SITE_URL}/sobre`}
    />
    <SiteHeader />
    <PageHero
      badge="Sobre nós"
      title="Polar Tensor — Binance Partner"
      subtitle="Revolucionando o mundo cripto com soluções impulsionadas por Inteligência Artificial. Negociação 100% automatizada, executada diretamente na Binance."
      showBack
    />

    {/* História & Visão */}
    <section className="py-20">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">Quem somos</Badge>
          <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
            Pesquisa, tecnologia e <span className="text-gradient-primary">trading algorítmico</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Da pesquisa em Hong Kong à operação 100% automatizada na Binance — uma trajetória construída
            sobre engenharia de dados, IA e disciplina de mercado.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-gradient-card p-8">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <History className="h-6 w-6" />
            </div>
            <h3 className="font-display text-xl font-semibold">História</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Nossa equipe começou a desenvolver algoritmos de trading proprietários para o mercado de
              criptomoedas em <strong className="text-foreground">2018</strong>, com nosso primeiro
              sucesso ocorrendo em <strong className="text-foreground">2020</strong>. A sede está
              localizada em <strong className="text-foreground">Hong Kong</strong>, onde todo o P&D é
              realizado, e o fundo é registrado no <strong className="text-foreground">Panamá</strong>.
            </p>
            <ul className="mt-5 space-y-2 text-sm">
              <li className="flex items-center gap-2"><Sparkles className="h-3.5 w-3.5 text-primary" /> P&D em Hong Kong</li>
              <li className="flex items-center gap-2"><Sparkles className="h-3.5 w-3.5 text-primary" /> Fundo registrado no Panamá</li>
              <li className="flex items-center gap-2"><Sparkles className="h-3.5 w-3.5 text-primary" /> Algoritmos proprietários desde 2018</li>
            </ul>
          </Card>

          <Card className="bg-gradient-card p-8">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="font-display text-xl font-semibold">Visão</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Nosso objetivo é nos tornar o maior provedor de estratégias algorítmicas no setor de
              criptomoedas até <strong className="text-foreground">2027</strong>. Além disso, planejamos
              expandir nossa divisão de software para criar ferramentas e algoritmos para outros hedge
              funds e exchanges de criptomoedas.
            </p>
            <ul className="mt-5 space-y-2 text-sm">
              <li className="flex items-center gap-2"><Sparkles className="h-3.5 w-3.5 text-primary" /> Liderança global até 2027</li>
              <li className="flex items-center gap-2"><Sparkles className="h-3.5 w-3.5 text-primary" /> Expansão da divisão de software</li>
              <li className="flex items-center gap-2"><Sparkles className="h-3.5 w-3.5 text-primary" /> Ferramentas para hedge funds e exchanges</li>
            </ul>
          </Card>
        </div>
      </div>
    </section>

    {/* Binance Partner / Negócio */}
    <section className="border-y border-border/50 bg-secondary/30 py-20">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">Binance Partner</Badge>
          <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
            Revolucionando o mundo cripto com <span className="text-gradient-primary">IA</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Negociação automatizada, 100% executada com Inteligência Artificial, diretamente na Binance.
            Invista e ganhe — sem precisar indicar ninguém.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {businessInfo.map((b) => {
            const Icon = b.icon;
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
              <strong className="text-foreground">Modelo direto ao investidor:</strong> você investe e
              ganha sem precisar indicar ninguém. Sem MMN, sem rede de afiliados — apenas tecnologia
              aplicada ao mercado.
            </p>
          </div>
        </Card>
      </div>
    </section>

    {/* Nosso time — Felix Bick */}
    <section className="py-20">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">Nosso time</Badge>
          <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
            As pessoas por trás da <span className="text-gradient-primary">tecnologia</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Uma equipe enxuta e altamente especializada, focada em pesquisa aplicada e execução.
          </p>
        </div>

        <Card className="overflow-hidden bg-gradient-card">
          <div className="grid gap-0 md:grid-cols-[320px_1fr]">
            <div className="relative h-[420px] md:h-auto">
              <img
                src={felixPhoto}
                alt="Felix Bick — Fundador da Polar Tensor"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-8 md:p-10">
              <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">Fundador</Badge>
              <h3 className="mt-3 font-display text-2xl font-bold md:text-3xl">Felix Bick</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Nascido em Hamburgo, Felix Bick iniciou sua carreira em um banco privado alemão, onde
                desenvolveu uma paixão pelo comércio internacional. Sua trajetória posteriormente o
                levou a Xangai e Hong Kong, onde trabalhou na <strong className="text-foreground">Li & Fung</strong>,
                especializando-se em gestão e otimização de cadeias de suprimentos.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Com o tempo, sua fascinação por padrões e eficiência, combinada com seu interesse em
                criptomoedas, levou ele e sua equipe a começar a desenvolver software de trading
                algorítmico.
              </p>
            </div>
          </div>
        </Card>

        <div className="mt-12">
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 text-primary">
              <Users className="h-5 w-5" />
              <span className="text-xs font-medium uppercase tracking-wider">A equipe</span>
            </div>
            <h3 className="mt-3 font-display text-2xl font-bold md:text-3xl">Especialistas multidisciplinares</h3>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((t) => {
              const Icon = t.icon;
              return (
                <Card key={t.role} className="bg-gradient-card p-6 text-center">
                  <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="font-display text-3xl font-bold text-primary">{t.count}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{t.role}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="border-t border-border/50 bg-secondary/30 py-20">
      <div className="container">
        <Card className="relative overflow-hidden bg-gradient-card p-10 text-center md:p-14">
          <div className="absolute inset-0 bg-gradient-hero opacity-30" />
          <div className="relative">
            <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Building2 className="h-6 w-6" />
            </div>
            <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-bold md:text-4xl">
              Faça parte de uma plataforma com <span className="text-gradient-primary">fundamentos sólidos</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Tecnologia, pesquisa e operação institucional ao alcance de qualquer investidor.
            </p>
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
