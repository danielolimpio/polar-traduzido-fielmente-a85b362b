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

const stages = [
  {
    icon: Network,
    title: "Redes de Tendência",
    desc: "Analisam dominância do BTC, volumes de transações e médias multi-timeframe para definir a direção primária do mercado.",
    bullets: ["Avaliação diária", "Integração on-chain", "Ciclos longos"],
  },
  {
    icon: Gauge,
    title: "Redes de Direção",
    desc: "Arquitetura CNN multi-eixo com mecanismos de atenção que processa três timeframes simultaneamente para previsões de curto prazo.",
    bullets: ["Sinais de alta frequência", "Câmera de quase tempo real", "Análise de livro de ordens"],
  },
  {
    icon: Cpu,
    title: "Engine de Execução",
    desc: "Conjunto em tempo real com pontuação dinâmica de confiança e dimensionamento adaptativo de posições para gestão de risco.",
    bullets: ["Decisões tick a tick", "Conexão direta com exchanges", "Controles de risco rígidos"],
  },
];

const edge = [
  { icon: Sparkles, t: "Execução baseada em confiança", d: "Cada operação carrega um nível quantificado de confiança, regulando dinamicamente o tamanho da posição." },
  { icon: Layers, t: "Consenso multi-modelo", d: "Múltiplas redes neurais devem concordar antes da execução, reduzindo viés de modelo único." },
  { icon: TrendingUp, t: "Adaptação ao regime de mercado", d: "Detecção automática de regime para manter o edge sob diferentes condições." },
  { icon: Clock, t: "Timing de execução ótimo", d: "Análise de microestrutura para reduzir slippage e impacto de mercado." },
  { icon: ShieldCheck, t: "Verificação contínua", d: "Backtests estatísticos garantem que o edge se mantém significativo e não degrada." },
  { icon: Activity, t: "Escalonamento dinâmico de risco", d: "Monitoramento de drawdown em tempo real reduz exposição em cenários adversos." },
];

const dataPoints = [
  { icon: BarChart3, t: "Dados de Mercado", d: "OHLCV, volumes e indicadores técnicos em múltiplos timeframes, do diário ao sub-segundo." },
  { icon: Database, t: "Análises On-Chain", d: "Atividade de rede, padrões de transações e métricas de adoção." },
  { icon: LineChart, t: "Dinâmica do Order Book", d: "Captura de microestrutura, desbalanço, profundidade e spreads." },
  { icon: BookOpen, t: "Sentimento", d: "Notícias e mídias sociais com janela de 15 minutos para contexto de mercado." },
];

const metrics = [
  { v: "1.15", t: "Profit Factor", d: "Consistente em diferentes regimes." },
  { v: "<50ms", t: "Latência de Predição", d: "Limites ultra-baixos para decisões em tempo real." },
  { v: "10K+", t: "Trades diários", d: "Execução de alta frequência em vários mercados." },
  { v: "24/7", t: "Cobertura", d: "Monitoramento e operação contínuos." },
];

const Technology = () => (
  <main className="min-h-screen bg-background">
    <Seo
      title="Tecnologia | Polar Tensor — Redes Neurais para Trading Cripto"
      description="Conheça a tecnologia da Polar Tensor: arquiteturas CNN com atenção, redes neurais de tendência e direção, execução de baixa latência e integração massiva de dados."
      canonical={`${SITE_URL}/tecnologia`}
    />
    <SiteHeader />
    <PageHero
      badge="Como funciona"
      title="Engenharia de redes neurais para mercados de cripto"
      subtitle="Abordagem em duas etapas que combina análise de tendências e previsão direcional de alta frequência para o melhor timing de execução."
      showBack
    />

    <section className="py-20">
      <div className="container">
        <div className="grid gap-6 md:grid-cols-3">
          {stages.map((s) => (
            <Card key={s.title} className="bg-gradient-card p-8">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <s.icon className="h-6 w-6" />
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
          ))}
        </div>

        <Card className="mt-10 border-primary/30 bg-primary/5 p-8">
          <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary">Hipótese central</Badge>
          <p className="mt-4 text-muted-foreground">
            A informação flui bidirecionalmente entre timeframes: timeframes maiores restringem movimentos
            mais curtos, enquanto dados de microestrutura fornecem sinais antecipados que se propagam para
            cima. Nosso sistema captura ambas as dimensões simultaneamente para desempenho ótimo.
          </p>
        </Card>
      </div>
    </section>

    <section className="border-y border-border/50 bg-secondary/30 py-20">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">Edge estatístico</Badge>
          <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">Vantagem mensurável e replicável</h2>
          <p className="mt-3 text-muted-foreground">
            Abordagens sistemáticas de exploração do mercado com confiança quantificável e controles
            rigorosos de risco.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {edge.map((e) => (
            <Card key={e.t} className="bg-gradient-card p-6">
              <e.icon className="mb-4 h-7 w-7 text-primary" />
              <h3 className="font-display text-lg font-semibold">{e.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{e.d}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">Integração de dados</Badge>
          <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">Inteligência a partir de múltiplas fontes</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {dataPoints.map((d) => (
            <Card key={d.t} className="bg-gradient-card p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <d.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold">{d.t}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{d.d}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>

    <section className="border-y border-border/50 bg-secondary/30 py-20">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">Métricas</Badge>
          <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">Resultados validados por pesquisa</h2>
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
            Acessar a plataforma <ArrowRight className="ml-1 h-4 w-4" />
          </a>
        </Button>
      </div>
    </section>

    <SiteFooter />
  </main>
);

export default Technology;
