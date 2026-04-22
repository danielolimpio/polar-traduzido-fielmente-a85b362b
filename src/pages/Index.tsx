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
  Lock,
  Network,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Wallet,
  Zap,
} from "lucide-react";
import dashboardImg from "@/assets/dashboard.webp";
import appImg from "@/assets/app-portfolio.webp";

const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary shadow-glow">
      <span className="font-display text-lg font-bold text-primary-foreground">PT</span>
    </div>
    <span className="font-display text-lg font-semibold tracking-tight">
      Polar <span className="text-primary">Tensor</span>
    </span>
  </div>
);

const Nav = () => (
  <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
    <div className="container flex h-16 items-center justify-between">
      <Logo />
      <nav className="hidden items-center gap-8 md:flex">
        <a href="#sobre" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Sobre</a>
        <a href="#tecnologia" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Tecnologia</a>
        <a href="#desempenho" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Desempenho</a>
        <a href="#planos" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Planos</a>
        <a href="#faq" className="text-sm text-muted-foreground transition-colors hover:text-foreground">FAQ</a>
      </nav>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Entrar</Button>
        <Button variant="hero" size="sm">
          Cadastrar <ArrowRight className="ml-1 h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  </header>
);

const Hero = () => (
  <section className="relative overflow-hidden bg-gradient-hero">
    <div className="absolute inset-0 grid-bg opacity-40" />
    <div className="absolute left-1/2 top-0 -z-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />

    <div className="container relative grid gap-12 py-20 md:py-28 lg:grid-cols-2 lg:items-center">
      <div className="animate-fade-up space-y-8">
        <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
          <Sparkles className="mr-1.5 h-3 w-3" />
          Sistema Polar One — Operacional desde 2024
        </Badge>

        <h1 className="font-display text-5xl font-bold leading-[1.05] md:text-6xl lg:text-7xl">
          Trading Algorítmico
          <br />
          <span className="text-gradient-primary">com Redes Neurais</span>
          <br />
          em Cripto
        </h1>

        <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
          Plataforma proprietária de IA para o mercado de criptomoedas — análise multi-timeframe,
          execução de baixa latência e gestão de risco automatizada operando 24/5.
        </p>

        <div className="flex flex-wrap gap-3">
          <Button variant="hero" size="lg">
            <Download className="mr-2 h-4 w-4" />
            Baixar App
          </Button>
          <Button variant="outline" size="lg">
            Consultoria Institucional
          </Button>
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

const monthlyYields = [
  { m: "Abr/24", y: 21.53 }, { m: "Mai/24", y: 18.46 }, { m: "Jun/24", y: 21.11 },
  { m: "Jul/24", y: 17.26 }, { m: "Ago/24", y: 23.94 }, { m: "Set/24", y: 30.60 },
  { m: "Out/24", y: 39.76 }, { m: "Nov/24", y: 30.23 }, { m: "Dez/24", y: 24.74 },
  { m: "Jan/25", y: 27.49 }, { m: "Fev/25", y: 20.95 }, { m: "Mar/25", y: 14.45 },
  { m: "Abr/25", y: 24.28 }, { m: "Mai/25", y: 17.16 }, { m: "Jun/25", y: 17.08 },
  { m: "Jul/25", y: 27.11 }, { m: "Ago/25", y: 17.50 }, { m: "Set/25", y: 12.88 },
  { m: "Out/25", y: 12.39 },
];

const maxY = Math.max(...monthlyYields.map(d => d.y));

const Performance = () => (
  <section id="desempenho" className="border-y border-border/50 bg-secondary/30 py-24">
    <div className="container">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">Desempenho histórico</Badge>
        <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">
          Rendimentos mensais <span className="text-gradient-primary">auditados</span>
        </h2>
        <p className="mt-4 text-muted-foreground">
          Média mensal de 22,04% entre Abr/2024 e Out/2025. Resultados passados não garantem retornos futuros.
        </p>
      </div>

      <Card className="bg-gradient-card p-6 md:p-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-sm text-muted-foreground">Rendimento médio mensal</div>
            <div className="font-display text-4xl font-bold text-primary">22,04%</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Drawdown diário máximo</div>
            <div className="font-display text-4xl font-bold">~1,8%</div>
          </div>
        </div>

        <div className="flex h-64 items-end gap-1.5 overflow-x-auto pb-2 md:gap-2">
          {monthlyYields.map((d) => (
            <div key={d.m} className="flex min-w-[36px] flex-1 flex-col items-center gap-2">
              <div className="text-[10px] font-medium text-primary">{d.y}%</div>
              <div
                className="w-full rounded-t bg-gradient-primary opacity-90 transition-all hover:opacity-100"
                style={{ height: `${(d.y / maxY) * 100}%` }}
              />
              <div className="text-[10px] text-muted-foreground">{d.m}</div>
            </div>
          ))}
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

            <Button
              variant={p.featured ? "hero" : "outline"}
              className="mt-8 w-full"
            >
              Começar agora
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

      <Card className="bg-gradient-card p-8">
        <h3 className="font-display text-xl font-semibold">Patentes</h3>
        <p className="mt-1 text-sm text-muted-foreground">Suba de patente conforme o volume da sua rede cresce.</p>
        <div className="mt-6 space-y-2">
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
            <div key={row.t} className="flex items-center justify-between rounded-lg border border-border/50 bg-background/40 px-4 py-2.5 text-sm">
              <span className="font-semibold">{row.t}</span>
              <span className="text-muted-foreground">{row.v}</span>
              <span className="text-primary">{row.b}</span>
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
        <Button variant="hero" size="lg">
          <Download className="mr-2 h-4 w-4" />
          Baixar App
        </Button>
        <Button variant="outline" size="lg">
          <Globe className="mr-2 h-4 w-4" />
          Acessar Plataforma Web
        </Button>
      </div>
      <p className="mt-6 text-xs text-muted-foreground">
        Disponível em App Store e Google Play • Saques automáticos em USDT e USDC
      </p>
    </div>
  </section>
);

const Footer = () => (
  <footer className="border-t border-border/50 bg-background py-12">
    <div className="container">
      <div className="grid gap-8 md:grid-cols-4">
        <div className="space-y-4">
          <Logo />
          <p className="text-sm text-muted-foreground">
            Transformando o trading com estratégias impulsionadas por IA.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Plataforma</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#tecnologia" className="hover:text-foreground">Tecnologia</a></li>
            <li><a href="#desempenho" className="hover:text-foreground">Desempenho</a></li>
            <li><a href="#planos" className="hover:text-foreground">Planos</a></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Empresa</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#sobre" className="hover:text-foreground">Sobre</a></li>
            <li><a href="#faq" className="hover:text-foreground">FAQ</a></li>
            <li><a href="#" className="hover:text-foreground">Contato</a></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Legal</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-foreground">Termos de Uso</a></li>
            <li><a href="#" className="hover:text-foreground">Política de Privacidade</a></li>
            <li><a href="#" className="hover:text-foreground">Aviso de Risco</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 text-xs text-muted-foreground sm:flex-row">
        <p>© 2026 Polar Tensor. Todos os direitos reservados.</p>
        <p className="flex items-center gap-2">
          <Lock className="h-3 w-3" />
          Trading envolve riscos. Negocie com responsabilidade.
        </p>
      </div>
    </div>
  </footer>
);

const Index = () => (
  <main className="min-h-screen bg-background">
    <Nav />
    <Hero />
    <Trust />
    <Technology />
    <Engine />
    <Performance />
    <Plans />
    <Rewards />
    <FAQ />
    <CTA />
    <Footer />
  </main>
);

export default Index;
