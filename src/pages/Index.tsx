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
  Sparkles,
  TrendingUp,
  Wallet,
  Zap,
} from "lucide-react";
import dashboardImg from "@/assets/dashboard.webp";
import appImg from "@/assets/app-portfolio.webp";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SIGNUP_URL } from "@/lib/constants";
import { PerformanceChart as Performance } from "@/components/site/PerformanceChart";

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
    <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer" aria-label="Cadastre-se na Polar Tensor">
      {children}
    </a>
  </Button>
);

const Hero = () => (
  <section className="relative overflow-hidden bg-gradient-hero">
    <div className="absolute inset-0 grid-bg opacity-40" />
    <div className="absolute left-1/2 top-0 -z-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />

    <div className="container relative grid gap-12 py-16 md:py-24 lg:grid-cols-2 lg:items-center lg:py-28">
      <div className="animate-fade-up space-y-8">
        <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
          <Sparkles className="mr-1.5 h-3 w-3" />
          Sistema Polar One — Operacional desde 2024
        </Badge>

        <h1 className="font-display text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="text-gradient-primary">Polar Tensor</span>
          <br />
          Trading com IA
          <br />
          em Criptomoedas
        </h1>

        <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
          A <strong className="text-foreground">Polar Tensor</strong> é a plataforma de trading
          algorítmico com redes neurais proprietárias para o mercado de criptomoedas — análise
          multi-timeframe, execução de baixa latência e gestão de risco automatizada operando 24/5.
        </p>

        <div className="flex flex-wrap gap-3">
          <CtaButton size="lg">
            <Download className="mr-2 h-4 w-4" />
            Cadastre-se Grátis
          </CtaButton>
          <CtaButton variant="outline" size="lg">
            Consultoria Institucional
          </CtaButton>
        </div>

        <div className="grid grid-cols-3 gap-6 pt-6">
          <div>
            <div className="font-display text-3xl font-bold text-primary">~3%</div>
            <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">Drawdown máx.</div>
          </div>
          <div>
            <div className="font-display text-3xl font-bold text-primary">&lt;50ms</div>
            <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">Latência</div>
          </div>
          <div>
            <div className="font-display text-3xl font-bold text-primary">20K+</div>
            <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">Trades/dia</div>
          </div>
        </div>
      </div>

      <div className="relative animate-fade-up [animation-delay:200ms]">
        <div className="absolute -inset-4 rounded-3xl bg-gradient-primary opacity-20 blur-2xl" />
        <div className="relative animate-float">
          <img
            src={appImg}
            alt="Aplicativo Polar Tensor mostrando portfólio em USDT"
            className="mx-auto w-[280px] rounded-[2.5rem] border border-border/50 shadow-card md:w-[320px]"
          />
        </div>
      </div>
    </div>
  </section>
);

const trustPoints = [
  {
    icon: Database,
    title: "Base de Dados Robusta",
    desc: "Coleta de dados on-chain, sentimento, livro de ordens e métricas de mercado em múltiplos timeframes para alimentar nossos modelos.",
  },
  {
    icon: Brain,
    title: "Modelos Testados em Combate",
    desc: "Redes neurais que combinam análise de tendência e direção, validadas em diferentes regimes de mercado desde 2020.",
  },
  {
    icon: ShieldCheck,
    title: "Backtesting Rigoroso",
    desc: "Cada modelo é testado contra dados históricos extensos antes de operar capital real, garantindo edge estatístico.",
  },
];

const Trust = () => (
  <section id="sobre" className="py-24">
    <div className="container">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">Por que Polar Tensor</Badge>
        <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">
          Engenharia financeira encontrada com <span className="text-gradient-primary">deep learning</span>
        </h2>
        <p className="mt-4 text-muted-foreground">
          Desenvolvemos algoritmos proprietários para o mercado cripto desde 2018. Sede de P&D em Hong Kong,
          fundo registrado no Panamá.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {trustPoints.map((p) => (
          <Card key={p.title} className="group bg-gradient-card p-8 transition-all hover:-translate-y-1 hover:shadow-glow">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <p.icon className="h-6 w-6" />
            </div>
            <h3 className="mb-2 font-display text-xl font-semibold">{p.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const techCards = [
  {
    icon: LineChart,
    title: "Análise Multi-Timeframe",
    desc: "Arquiteturas CNN com módulos de atenção capturam padrões em escalas temporais simultâneas.",
  },
  {
    icon: Database,
    title: "Integração de Dados",
    desc: "OHLCV, dados on-chain, livro de ordens e sentimento — unificados em um único framework.",
  },
  {
    icon: Zap,
    title: "Execução de Alta Frequência",
    desc: "Latência sub-50ms, conexões diretas com exchanges, escalonamento dinâmico de posições.",
  },
  {
    icon: TrendingUp,
    title: "Performance Comprovada",
    desc: "Ativo desde 2020 (originalmente FTX), totalmente automatizado e controlado por IA desde 2024.",
  },
];

const Technology = () => (
  <section id="tecnologia" className="border-y border-border/50 bg-secondary/30 py-24">
    <div className="container">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">Tecnologia</Badge>
        <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">
          Tecnologia avançada de <span className="text-gradient-primary">trading com IA</span>
        </h2>
        <p className="mt-4 text-muted-foreground">
          Redes neurais baseadas em pesquisa, projetadas para a excelência no mercado cripto.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {techCards.map((c) => (
          <Card key={c.title} className="bg-gradient-card p-6 transition-all hover:border-primary/40">
            <c.icon className="mb-4 h-7 w-7 text-primary" />
            <h3 className="mb-2 font-display text-lg font-semibold">{c.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
          </Card>
        ))}
      </div>

      <div className="mt-16 overflow-hidden rounded-2xl border border-border/50 bg-card shadow-card">
        <img src={dashboardImg} alt="Dashboard Polar One mostrando estatísticas de trading" className="w-full" />
      </div>
    </div>
  </section>
);

const networkPoints = [
  {
    icon: Network,
    title: "Redes de Tendência",
    desc: "Analisam dominância do BTC, dados on-chain e condições de mercado de longo prazo para determinar regime de alta ou baixa.",
  },
  {
    icon: Gauge,
    title: "Redes de Direção",
    desc: "Processam dados em tempo real, alterações no livro de ordens, sentimento de notícias e métricas blockchain para prever movimentos imediatos.",
  },
  {
    icon: Cpu,
    title: "Engine de Execução",
    desc: "Trades de alta frequência são executados quando os modelos apresentam alta confiança, com escalonamento de posição adaptativo.",
  },
];

const Engine = () => (
  <section className="py-24">
    <div className="container">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">Como funciona</Badge>
        <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">
          Nosso motor de <span className="text-gradient-primary">investimento inteligente</span>
        </h2>
        <p className="mt-4 text-muted-foreground">
          Dois tipos de redes neurais trabalhando em conjunto para maximizar precisão e minimizar risco.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {networkPoints.map((p, i) => (
          <Card key={p.title} className="relative bg-gradient-card p-8">
            <div className="absolute right-6 top-6 font-display text-5xl font-bold text-primary/20">
              0{i + 1}
            </div>
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <p.icon className="h-6 w-6" />
            </div>
            <h3 className="mb-3 font-display text-xl font-semibold">{p.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
          </Card>
        ))}
      </div>

      <Card className="mt-10 bg-gradient-card p-8 md:p-10">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Activity className="h-7 w-7" />
          </div>
          <div className="flex-1">
            <h3 className="mb-2 font-display text-xl font-semibold">Operação contínua e automatizada</h3>
            <p className="text-muted-foreground">
              Segunda a sexta, 8:00 UTC às 22:00 UTC — janelas de máxima liquidez. Distribuição semanal de
              lucros toda sexta às 23:00 UTC.
            </p>
          </div>
        </div>
      </Card>
    </div>
  </section>
);


const plans = [
  {
    name: "Profissional",
    min: "8.000 USDT",
    fee: "30%",
    features: [
      "Acesso ao sistema Polar One",
      "Distribuição semanal de lucros",
      "Saques automáticos 24/7",
      "Suporte padrão",
    ],
  },
  {
    name: "Elite",
    min: "25.000 USDT",
    fee: "25%",
    featured: true,
    features: [
      "Tudo do plano Profissional",
      "Taxa de desempenho reduzida",
      "Prioridade na execução",
      "Suporte dedicado",
    ],
  },
  {
    name: "Empresa",
    min: "100.000 USDT",
    fee: "20%",
    features: [
      "Tudo do plano Elite",
      "Menor taxa de desempenho",
      "Gestor de conta exclusivo",
      "Relatórios institucionais",
    ],
  },
];

const Plans = () => (
  <section id="planos" className="py-24">
    <div className="container">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">Planos</Badge>
        <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">
          Escolha o seu <span className="text-gradient-primary">nível de acesso</span>
        </h2>
        <p className="mt-4 text-muted-foreground">
          Taxa única de licença de 10% sobre o valor depositado. Taxa de performance apenas sobre lucros.
        </p>
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
                Mais popular
              </Badge>
            )}
            <h3 className="font-display text-2xl font-bold">{p.name}</h3>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-display text-4xl font-bold text-primary">{p.fee}</span>
              <span className="text-sm text-muted-foreground">taxa de performance</span>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              A partir de <span className="font-semibold text-foreground">{p.min}</span>
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
              <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer">Começar agora</a>
            </Button>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const Rewards = () => (
  <section className="border-y border-border/50 bg-secondary/30 py-24">
    <div className="container grid gap-12 lg:grid-cols-2 lg:items-center">
      <div>
        <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">Programa de Recompensas</Badge>
        <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">
          Construa renda passiva com <span className="text-gradient-primary">indicações</span>
        </h2>
        <p className="mt-4 text-muted-foreground">
          Convide pessoas para a plataforma e receba recompensas até 15 níveis de profundidade na taxa de licença,
          além de recompensas residuais semanais sobre os lucros gerados.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            { icon: Wallet, t: "Recompensas de Licença", d: "Ganhos sobre a taxa de licença até 15 níveis." },
            { icon: ChartLine, t: "Recompensas Residuais", d: "Renda semanal sobre lucros dos indicados." },
            { icon: Sparkles, t: "Recompensa Infinita", d: "Percentual sobre o volume de toda a equipe." },
            { icon: ShieldCheck, t: "Patentes & Bônus", d: "Bônus em USDT do Bronze ao Diamante." },
          ].map((b) => (
            <div key={b.t} className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <b.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold">{b.t}</div>
                <div className="text-sm text-muted-foreground">{b.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Card className="bg-gradient-card p-5 sm:p-8">
        <h3 className="font-display text-xl font-semibold">Patentes</h3>
        <p className="mt-1 text-sm text-muted-foreground">Suba de patente conforme o volume da sua rede cresce.</p>

        <div className="mt-6 grid grid-cols-[auto_1fr_auto] items-center gap-x-3 px-3 pb-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground sm:gap-x-6 sm:px-4 sm:text-xs">
          <span>Patente</span>
          <span className="text-right sm:text-left">Volume</span>
          <span className="text-right">Bônus</span>
        </div>

        <div className="space-y-2">
          {[
            { t: "Ferro", v: "100 USDT", b: "—" },
            { t: "Bronze", v: "500 USDT", b: "50 USDT" },
            { t: "Prata", v: "2.500 USDT", b: "200 USDT" },
            { t: "Ouro", v: "8.000 USDT", b: "500 USDT" },
            { t: "Platina", v: "25.000 USDT", b: "1.500 USDT" },
            { t: "Titânio", v: "100.000 USDT", b: "20.000 USDT" },
            { t: "Rubi", v: "1.000.000 USDT", b: "50.000 USDT" },
            { t: "Esmeralda", v: "3.000.000 USDT", b: "150.000 USDT" },
            { t: "Diamante", v: "8.000.000 USDT", b: "500.000 USDT" },
          ].map((row) => (
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

const faqItems = [
  {
    q: "O que é a Polar Tensor?",
    a: "Somos uma empresa de tecnologia financeira focada em desenvolver algoritmos proprietários de trading com redes neurais para o mercado de criptomoedas. Operamos desde 2018, com nossa primeira versão lucrativa em 2020.",
  },
  {
    q: "Como funciona o sistema Polar One?",
    a: "É um sistema de trading totalmente automatizado que utiliza dois tipos de redes neurais — tendência e direção — para identificar oportunidades e executar trades de alta frequência com baixa latência na Binance.",
  },
  {
    q: "Quais são os riscos envolvidos?",
    a: "Trading em criptomoedas envolve riscos significativos, incluindo volatilidade, riscos de mercado, regulatórios, de liquidez e tecnológicos. Você pode perder parte ou a totalidade do capital. Recomendamos fortemente buscar aconselhamento financeiro independente.",
  },
  {
    q: "Como funcionam as taxas?",
    a: "Cobramos uma taxa única de licença de 10% sobre o valor depositado e uma taxa de performance (20% a 30% conforme o plano) apenas sobre os lucros gerados. Distribuímos lucros semanalmente, toda sexta às 23:00 UTC.",
  },
  {
    q: "Em quais criptomoedas posso depositar?",
    a: "Aceitamos Bitcoin, Ethereum, Solana e USDT. Saques são processados automaticamente 24/7 em USDT e USDC.",
  },
  {
    q: "Onde a empresa está registrada?",
    a: "Polar Tensor Corp. é registrada no Panamá (Nº 155771852), com Polar MSB Inc. nos EUA (Montana, Nº D1537006, FinCEN 31000306664168) e Polar Tensor LAB Limited em Hong Kong (Nº 78737300).",
  },
];

const FAQ = () => (
  <section id="faq" className="py-24">
    <div className="container max-w-3xl">
      <div className="mb-12 text-center">
        <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">FAQ</Badge>
        <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">
          Perguntas <span className="text-gradient-primary">frequentes</span>
        </h2>
      </div>

      <Accordion type="single" collapsible className="space-y-3">
        {faqItems.map((item, i) => (
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

const CTA = () => (
  <section className="relative overflow-hidden py-24">
    <div className="absolute inset-0 bg-gradient-hero" />
    <div className="absolute left-1/2 top-1/2 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px]" />
    <div className="container relative text-center">
      <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">Comece agora</Badge>
      <h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-bold md:text-6xl">
        Comece a operar com <span className="text-gradient-primary">IA hoje</span>
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
        Baixe nosso aplicativo e acesse tecnologia avançada de trading com redes neurais direto do seu celular.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <CtaButton size="lg">
          <Download className="mr-2 h-4 w-4" />
          Cadastre-se Agora
        </CtaButton>
        <CtaButton variant="outline" size="lg">
          <Globe className="mr-2 h-4 w-4" />
          Acessar Plataforma
        </CtaButton>
      </div>
      <p className="mt-6 text-xs text-muted-foreground">
        Disponível em App Store e Google Play • Saques automáticos em USDT e USDC
      </p>
    </div>
  </section>
);

const Index = () => (
  <main className="min-h-screen bg-background">
    <SiteHeader />
    <Hero />
    <Trust />
    <Technology />
    <Engine />
    <Performance />
    <Plans />
    <Rewards />
    <FAQ />
    <CTA />
    <SiteFooter />
  </main>
);

export default Index;
