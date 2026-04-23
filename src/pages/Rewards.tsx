import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { PageHero } from "@/components/site/PageHero";
import { Seo } from "@/components/site/Seo";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Bot,
  TrendingUp,
  CalendarDays,
  CalendarCheck,
  Wallet,
  Banknote,
  Clock,
  Receipt,
  Repeat,
  Users,
  Network,
  Trophy,
  Infinity as InfinityIcon,
  Sparkles,
  Crown,
  Gem,
} from "lucide-react";
import { SIGNUP_URL, SITE_URL } from "@/lib/constants";

const businessRules = [
  { icon: Bot, label: "Operação", value: "100% automatizada com IA" },
  { icon: TrendingUp, label: "Retorno médio mensal", value: "22%" },
  { icon: CalendarDays, label: "Funcionamento", value: "Segunda a sexta" },
  { icon: CalendarCheck, label: "Pagamentos comerciais", value: "Sextas-feiras" },
  { icon: Wallet, label: "Investimento mínimo", value: "$100" },
  { icon: Banknote, label: "Saque mínimo", value: "$20" },
  { icon: Clock, label: "Retiradas", value: "24h, todos os dias" },
  { icon: Receipt, label: "Taxa de saque", value: "$2 USD" },
  { icon: Repeat, label: "Juros compostos", value: "Reinvestimento automático" },
];

const referralLevels = [
  { level: 1, value: "20%" },
  { level: 2, value: "15%" },
  { level: 3, value: "10%" },
  { level: 4, value: "5%" },
  { level: 5, value: "4%" },
  { level: 6, value: "3%" },
  { level: 7, value: "3%" },
  { level: 8, value: "2%" },
  { level: 9, value: "2%" },
  { level: 10, value: "2%" },
  { level: 11, value: "1%" },
  { level: 12, value: "1%" },
  { level: 13, value: "1%" },
  { level: 14, value: "0,5%" },
  { level: 15, value: "0,5%" },
];

const residualLevels = [
  { level: 1, value: "10%" },
  { level: 2, value: "5%" },
  { level: 3, value: "4%" },
  { level: 4, value: "3%" },
  { level: 5, value: "2%" },
  { level: 6, value: "2%" },
  { level: 7, value: "1%" },
  { level: 8, value: "1%" },
  { level: 9, value: "1%" },
  { level: 10, value: "1%" },
];

const ranks = [
  { name: "Ferro", bonus: "$0" },
  { name: "Bronze", bonus: "$50" },
  { name: "Prata", bonus: "$200" },
  { name: "Ouro", bonus: "$500" },
  { name: "Platina", bonus: "$1.500" },
  { name: "Titânio", bonus: "$6.000" },
  { name: "Safira", bonus: "$20.000" },
  { name: "Ruby", bonus: "$50.000" },
  { name: "Esmeralda", bonus: "$150.000" },
  { name: "Diamante", bonus: "$500.000" },
];

const infiniteRewards = [
  { name: "Ouro", value: "5%" },
  { name: "Platina", value: "7,5%" },
  { name: "Titânio", value: "10%" },
  { name: "Safira", value: "12,5%" },
  { name: "Ruby", value: "15%" },
  { name: "Esmeralda", value: "17,5%" },
  { name: "Diamante", value: "20%" },
];

const Rewards = () => (
  <main className="min-h-screen bg-background">
    <Seo
      title="Recompensas | Polar Tensor — Plano de Ganhos & Bonificações"
      description="Conheça o plano de recompensas Polar Tensor: ganhos por indicação em até 15 níveis, residuais em 10 níveis, bônus de ranking até $500.000 e Recompensa Infinita por graduação."
      canonical={`${SITE_URL}/recompensas`}
    />
    <SiteHeader />
    <PageHero
      badge="Recompensas"
      title="Plano de Recompensas Polar Tensor"
      subtitle="Ganhos por indicação, residuais, bônus de ranking e Recompensa Infinita — um modelo transparente, escalável e alinhado ao seu crescimento."
      showBack
    />

    {/* Regras gerais do negócio */}
    <section className="py-20">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">Regras do negócio</Badge>
          <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
            Como funciona a <span className="text-gradient-primary">operação</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Parâmetros operacionais que sustentam todo o plano de recompensas.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {businessRules.map((b) => {
            const Icon = b.icon;
            return (
              <Card key={b.label} className="bg-gradient-card p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{b.label}</p>
                <p className="mt-1 font-display text-lg font-semibold text-foreground">{b.value}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>

    {/* Ganhos por indicação */}
    <section className="border-y border-border/50 bg-secondary/30 py-20">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">Indicação</Badge>
          <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
            Ganhos por indicação — <span className="text-gradient-primary">até 15 níveis</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Bonificação direta sobre a Taxa de Licença dos seus indicados.
          </p>
          <Card className="mx-auto mt-6 inline-flex max-w-xl items-center gap-3 border-primary/30 bg-primary/5 p-4 text-left">
            <Users className="h-5 w-5 shrink-0 text-primary" />
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Regra:</strong> Cada Direto Ativo Desbloqueia um Nível.
            </p>
          </Card>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {referralLevels.map((l) => (
            <Card
              key={l.level}
              className="group relative overflow-hidden bg-gradient-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary/0 via-primary/60 to-primary/0 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Nível {String(l.level).padStart(2, "0")}
                </span>
                <Network className="h-4 w-4 text-primary/60" />
              </div>
              <p className="mt-3 font-display text-2xl font-bold text-gradient-primary">{l.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">da Licença</p>
            </Card>
          ))}
        </div>
      </div>
    </section>

    {/* Ganhos residuais */}
    <section className="py-20">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">Residual</Badge>
          <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
            Ganhos residuais — <span className="text-gradient-primary">até 10 níveis</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Receba percentuais sobre as negociações da sua rede.
          </p>
          <Card className="mx-auto mt-6 inline-flex max-w-xl items-center gap-3 border-primary/30 bg-primary/5 p-4 text-left">
            <Sparkles className="h-5 w-5 shrink-0 text-primary" />
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Regra:</strong> Cada Direto Ativo Desbloqueia um Nível.
            </p>
          </Card>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {residualLevels.map((l) => (
            <Card
              key={l.level}
              className="group relative overflow-hidden bg-gradient-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary/0 via-primary/60 to-primary/0 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Nível {String(l.level).padStart(2, "0")}
                </span>
                <TrendingUp className="h-4 w-4 text-primary/60" />
              </div>
              <p className="mt-3 font-display text-2xl font-bold text-gradient-primary">{l.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">da Negociação</p>
            </Card>
          ))}
        </div>
      </div>
    </section>

    {/* Bônus de Ranking */}
    <section className="border-y border-border/50 bg-secondary/30 py-20">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">Graduação</Badge>
          <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
            Bônus de <span className="text-gradient-primary">Ranking</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Conquiste graduações com base em volume e perna máxima e desbloqueie bônus crescentes.
          </p>
          <Card className="mx-auto mt-6 inline-flex max-w-xl items-center gap-3 border-primary/30 bg-primary/5 p-4 text-left">
            <Trophy className="h-5 w-5 shrink-0 text-primary" />
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Regra:</strong> Volume + Perna Máxima.
            </p>
          </Card>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {ranks.map((r, i) => (
            <Card
              key={r.name}
              className="group relative overflow-hidden bg-gradient-card p-6 text-center transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary/0 via-primary/60 to-primary/0 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                {i >= 7 ? <Gem className="h-6 w-6" /> : i >= 4 ? <Crown className="h-6 w-6" /> : <Trophy className="h-6 w-6" />}
              </div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Rank {String(i + 1).padStart(2, "0")}</p>
              <p className="mt-1 font-display text-lg font-semibold text-foreground">{r.name}</p>
              <p className="mt-3 font-display text-xl font-bold text-gradient-primary">{r.bonus}</p>
              <p className="mt-1 text-xs text-muted-foreground">de bônus</p>
            </Card>
          ))}
        </div>
      </div>
    </section>

    {/* Recompensa Infinita */}
    <section className="py-20">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">Recompensa Infinita</Badge>
          <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
            Recompensa <span className="text-gradient-primary">Infinita ♾</span> por Ranks
          </h2>
          <p className="mt-3 text-muted-foreground">
            Participe de um pool global distribuído entre os graduados.
          </p>
          <Card className="mx-auto mt-6 inline-flex max-w-xl items-center gap-3 border-primary/30 bg-primary/5 p-4 text-left">
            <InfinityIcon className="h-5 w-5 shrink-0 text-primary" />
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Regra:</strong> Se Houver Graduados, o Valor é Dividido.
            </p>
          </Card>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {infiniteRewards.map((r) => (
            <Card
              key={r.name}
              className="group relative overflow-hidden bg-gradient-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary/0 via-primary/60 to-primary/0 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="flex items-center justify-between">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20">
                  <InfinityIcon className="h-5 w-5" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Rank</span>
              </div>
              <p className="mt-4 font-display text-lg font-semibold text-foreground">{r.name}</p>
              <p className="mt-2 font-display text-3xl font-bold text-gradient-primary">{r.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">de toda a equipe</p>
            </Card>
          ))}
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
              <Trophy className="h-6 w-6" />
            </div>
            <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-bold md:text-4xl">
              Pronto para começar a <span className="text-gradient-primary">construir sua rede</span>?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Cadastre-se e desbloqueie todos os níveis do plano de recompensas Polar Tensor.
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

export default Rewards;
