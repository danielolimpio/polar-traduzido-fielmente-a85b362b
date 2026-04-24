import { Link } from "react-router-dom";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Seo } from "@/components/site/Seo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Smartphone,
  Apple,
  Bell,
  Wallet,
  TrendingUp,
  BarChart3,
  ShieldCheck,
  Zap,
  Eye,
  ArrowRight,
} from "lucide-react";
import { SIGNUP_URL, SITE_URL } from "@/lib/constants";
import appHome from "@/assets/app-home.jpeg";
import appWallet from "@/assets/app-wallet.webp";
import appTrading from "@/assets/app-trading.webp";
import appTransparency from "@/assets/app-transparency.webp";

const APP_STORE_URL = "https://apps.apple.com/app/polar-tensor";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.polartensor";

const StoreButtons = ({ className = "" }: { className?: string }) => (
  <div className={`flex flex-col items-center justify-center gap-3 sm:flex-row ${className}`}>
    <Button asChild variant="hero" size="lg" className="w-full sm:w-auto">
      <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" aria-label="Baixar Polar Tensor na App Store">
        <Apple className="mr-2 h-5 w-5" />
        Baixar na App Store
      </a>
    </Button>
    <Button asChild variant="hero" size="lg" className="w-full sm:w-auto">
      <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" aria-label="Baixar Polar Tensor no Google Play">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-2 h-5 w-5 fill-current">
          <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.205 12l2.493-2.491zM5.864 2.658L16.802 8.99l-2.302 2.302-8.636-8.634z"/>
        </svg>
        Baixar no Google Play
      </a>
    </Button>
  </div>
);

const features = [
  {
    img: appHome,
    icon: Eye,
    title: "Painel da Conta",
    desc: "Acompanhe sua carteira completa em tempo real. Monitore saldo disponível, valor investido em trading e lucros semanais com gráficos intuitivos. Mantenha-se informado com métricas de desempenho atualizadas e visualize seus rendimentos com detalhamento diário.",
    reverse: false,
  },
  {
    img: appWallet,
    icon: Wallet,
    title: "Gestão Inteligente da Carteira",
    desc: "Controle total sobre seus fundos com depósitos, transferências e saques de forma fluida. Veja o histórico completo de transações — incluindo lucros de trading, depósitos, saques e toda atividade da conta — com data, hora e valores detalhados.",
    reverse: true,
  },
  {
    img: appTrading,
    icon: TrendingUp,
    title: "Interface Avançada de Trading",
    desc: "Gerencie seu valor ativo de trading com a opção de reinvestimento automático (Auto-Reinvest). Acompanhe seu nível atual, taxa de performance, evolução até o próximo nível e veja métricas detalhadas de lucro da semana, semana passada e últimos 30 dias.",
    reverse: false,
  },
  {
    img: appTransparency,
    icon: BarChart3,
    title: "Transparência Total",
    desc: "Veja as métricas globais de desempenho da empresa e estatísticas de todos os tempos com transparência completa. Acompanhe percentuais semanais, compare períodos diferentes (semana, mês, 3M, 6M, ano e todos) e analise retornos cumulativos com gráficos interativos.",
    reverse: true,
  },
];

const highlights = [
  {
    icon: Zap,
    title: "Trading com IA no seu bolso",
    desc: "O sistema Polar One opera 24/5 — você acompanha cada movimento direto do celular.",
  },
  {
    icon: Bell,
    title: "Notificações em tempo real",
    desc: "Receba alertas de distribuição de lucros, depósitos, saques e bonificações da rede.",
  },
  {
    icon: ShieldCheck,
    title: "Segurança bancária",
    desc: "Autenticação biométrica, criptografia de ponta-a-ponta e KYC integrado.",
  },
];

const DownloadApp = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: "Polar Tensor App",
    operatingSystem: "iOS, Android",
    applicationCategory: "FinanceApplication",
    description:
      "Baixar App Polar Tensor — aplicativo oficial de trading com IA em criptomoedas. Acompanhe sua carteira, lucros e operações automatizadas no celular.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "1280",
    },
    downloadUrl: `${SITE_URL}/baixar-app`,
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Baixar App Polar Tensor | Aplicativo Oficial de Trading com IA"
        description="Baixar App Polar Tensor: aplicativo oficial para iOS e Android. Acompanhe seu portfólio em USDT, lucros automáticos do Polar One, depósitos, saques e bonificações da rede direto no celular."
        canonical={`${SITE_URL}/baixar-app`}
        jsonLd={jsonLd}
      />
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border/50 bg-gradient-hero">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute left-1/2 top-0 -z-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
        <div className="container relative py-20 text-center md:py-28">
          <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
            <Smartphone className="mr-1.5 h-3.5 w-3.5" />
            Disponível para iOS e Android
          </Badge>
          <h1 className="mx-auto mt-6 max-w-4xl font-display text-4xl font-bold leading-tight md:text-6xl">
            Baixar <span className="text-gradient-primary">App Polar Tensor</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            Acesse trading automatizado com inteligência artificial, acompanhe sua carteira e
            gerencie seus fundos — tudo na palma da sua mão.
          </p>
          <StoreButtons className="mt-10" />

          <div className="mx-auto mt-14 max-w-xs">
            <div className="relative">
              <div className="absolute -inset-6 rounded-[3rem] bg-gradient-primary opacity-25 blur-2xl" />
              <div className="relative animate-float">
                <img
                  src={appHome}
                  alt="App Polar Tensor — tela inicial com saldo em USDT"
                  className="mx-auto w-[260px] rounded-[2.5rem] border border-border/50 shadow-card"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="border-b border-border/50 bg-secondary/30 py-16">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-3">
            {highlights.map((h) => (
              <Card key={h.title} className="bg-gradient-card p-6">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                  <h.icon className="h-5 w-5" />
                </div>
                <h3 className="mb-1 font-display text-lg font-semibold">{h.title}</h3>
                <p className="text-sm text-muted-foreground">{h.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES with screenshots */}
      <section className="py-20">
        <div className="container space-y-24">
          {features.map((f) => (
            <div
              key={f.title}
              className={`grid items-center gap-12 lg:grid-cols-2 ${
                f.reverse ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="relative mx-auto w-full max-w-[280px]">
                <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-primary opacity-20 blur-2xl" />
                <img
                  src={f.img}
                  alt={`Tela ${f.title} do App Polar Tensor`}
                  className="relative mx-auto w-full rounded-[2rem] border border-border/50 shadow-card"
                  loading="lazy"
                />
              </div>
              <div>
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                  <f.icon className="h-5 w-5" />
                </div>
                <h2 className="font-display text-3xl font-bold md:text-4xl">{f.title}</h2>
                <p className="mt-4 text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="border-t border-border/50 bg-gradient-hero py-20">
        <div className="container">
          <Card className="mx-auto max-w-3xl bg-gradient-card p-10 text-center">
            <h2 className="font-display text-3xl font-bold md:text-4xl">Pronto para começar?</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Baixe o App Polar Tensor e comece a operar com a precisão da inteligência artificial
              direto do seu celular.
            </p>
            <StoreButtons className="mt-8" />
            <div className="mt-8 text-sm">
              <a
                href={SIGNUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-primary hover:underline"
              >
                Cadastrar minha conta primeiro <ArrowRight className="h-4 w-4" />
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
