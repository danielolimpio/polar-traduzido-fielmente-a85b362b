import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown, Gem, Activity, TrendingUp, Wallet, Sparkles, ShieldCheck, Star } from "lucide-react";

const BINANCE = "#F0B90B";

const liveFeed = [
  { sym: "XRP", time: "11:30:08", open: "1,4192", close: "1,4193" },
  { sym: "ADA", time: "11:30:07", open: "0,2480", close: "0,2481" },
  { sym: "XRP", time: "11:30:07", open: "1,4191", close: "1,4192" },
  { sym: "SOL", time: "11:30:06", open: "85,88", close: "85,89" },
  { sym: "BTC", time: "11:30:04", open: "77.760,32", close: "77.780,82" },
  { sym: "ETH", time: "11:30:04", open: "2.327,87", close: "2.328,41" },
];

export const BinancePanel = () => {
  return (
    <section className="relative overflow-hidden border-y border-border/50 bg-secondary/30 py-24">
      {/* Premium glows */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full blur-[140px]"
        style={{ background: `${BINANCE}1A` }}
      />
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-20" />

      <div className="container relative">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Badge
            variant="outline"
            className="gap-1.5 border-[color:var(--bnb)]/40 bg-[color:var(--bnb)]/10 text-[color:var(--bnb)]"
            style={{ ["--bnb" as any]: BINANCE }}
          >
            <Crown className="h-3.5 w-3.5" />
            Conta Institucional · Binance VIP9
          </Badge>
          <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">
            Operações reais na <span style={{ color: BINANCE }}>Binance</span> com{" "}
            <span className="text-gradient-primary">credibilidade auditável</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Volume institucional, status máximo de privilégio na maior exchange do mundo e feed de
            execução ao vivo direto do back-office Polar One.
          </p>
        </div>

        {/* Top KPI cards */}
        <div className="grid gap-5 md:grid-cols-3">
          {/* Banca Binance */}
          <Card
            className="relative overflow-hidden border-[color:var(--bnb)]/30 bg-gradient-card p-6 md:p-7"
            style={{ ["--bnb" as any]: BINANCE }}
          >
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl"
              style={{ background: `${BINANCE}33` }}
            />
            <div className="relative flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: `${BINANCE}1F`, color: BINANCE }}
                >
                  <Wallet className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                    Banca na Binance
                  </div>
                  <div className="text-xs font-medium" style={{ color: BINANCE }}>
                    Total Value · USDT
                  </div>
                </div>
              </div>
              <Gem className="h-5 w-5 opacity-70" style={{ color: BINANCE }} />
            </div>
            <div className="relative mt-5">
              <div
                className="font-display text-3xl font-bold tabular-nums md:text-4xl"
                style={{ color: BINANCE }}
              >
                192.491.814,64
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                ≈ US$ 192.491.814,64 · atualizado em tempo real
              </div>
            </div>
            <div
              className="relative mt-5 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold"
              style={{
                borderColor: `${BINANCE}55`,
                background: `${BINANCE}14`,
                color: BINANCE,
              }}
            >
              <ShieldCheck className="h-3 w-3" /> Custódia direta na Binance
            </div>
          </Card>

          {/* VIP9 */}
          <Card
            className="relative overflow-hidden border-[color:var(--bnb)]/40 bg-gradient-card p-6 md:p-7"
            style={{ ["--bnb" as any]: BINANCE }}
          >
            <div
              className="pointer-events-none absolute -right-10 -top-10 text-[120px] font-black leading-none opacity-[0.07] md:text-[150px]"
              style={{ color: BINANCE }}
            >
              VIP9
            </div>
            <div className="relative flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: `${BINANCE}1F`, color: BINANCE }}
                >
                  <Crown className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                    Status na Binance
                  </div>
                  <div className="text-xs font-medium" style={{ color: BINANCE }}>
                    My VIP Privilege
                  </div>
                </div>
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-current" style={{ color: BINANCE }} />
                ))}
              </div>
            </div>
            <div className="relative mt-5">
              <div
                className="font-display text-4xl font-black tracking-tight md:text-5xl"
                style={{ color: BINANCE }}
              >
                VIP 9
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                Nível máximo institucional · Taxas mínimas e prioridade de execução
              </div>
            </div>
            <div className="relative mt-5 grid grid-cols-3 gap-2 text-center text-[10px]">
              {["Maker -0,005%", "Taker 0,015%", "API premium"].map((t) => (
                <div
                  key={t}
                  className="rounded-md border px-1.5 py-1 font-semibold tabular-nums"
                  style={{
                    borderColor: `${BINANCE}40`,
                    background: `${BINANCE}10`,
                    color: BINANCE,
                  }}
                >
                  {t}
                </div>
              ))}
            </div>
          </Card>

          {/* Lucro total */}
          <Card className="relative overflow-hidden border-primary/30 bg-gradient-card p-6 md:p-7">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
            <div className="relative flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                    Lucro em todo o período
                  </div>
                  <div className="text-xs font-medium text-primary">Performance Overview</div>
                </div>
              </div>
              <Sparkles className="h-5 w-5 text-primary opacity-80" />
            </div>
            <div className="relative mt-5">
              <div className="font-display text-3xl font-bold tabular-nums text-primary md:text-4xl">
                +10.341,76%
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                Retorno acumulado · sistema Polar One auditado
              </div>
            </div>
            <div className="relative mt-5 inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
              <Activity className="h-3 w-3" /> Últimos 30 dias: +20,55%
            </div>
          </Card>
        </div>

        {/* Live trading feed */}
        <Card className="mt-6 overflow-hidden bg-gradient-card p-0">
          <div
            className="flex flex-wrap items-center justify-between gap-3 border-b border-border/50 px-5 py-4"
            style={{
              background: `linear-gradient(90deg, ${BINANCE}10 0%, transparent 60%)`,
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-lg"
                style={{ background: `${BINANCE}1F`, color: BINANCE }}
              >
                <Activity className="h-4 w-4" />
              </div>
              <div>
                <div className="font-display text-base font-semibold">
                  Feed de Trading ao Vivo
                </div>
                <div className="text-xs text-muted-foreground">
                  Execuções em tempo real no back-office Polar One
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">LIVE</span>
            </div>
          </div>

          <div className="divide-y divide-border/50">
            {liveFeed.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-3 px-5 py-3 text-xs sm:grid-cols-[80px_1fr_1fr_1fr] sm:gap-6 sm:text-sm"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="flex h-7 w-7 items-center justify-center rounded-md text-[10px] font-bold"
                    style={{ background: `${BINANCE}1A`, color: BINANCE }}
                  >
                    {row.sym}
                  </div>
                </div>
                <div className="text-[11px] text-muted-foreground sm:text-xs">{row.time}</div>
                <div className="text-right sm:text-left">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Open
                  </div>
                  <div className="tabular-nums">${row.open}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Close
                  </div>
                  <div className="tabular-nums font-semibold text-primary">${row.close}</div>
                </div>
              </div>
            ))}
          </div>

          <div
            className="border-t border-border/50 px-5 py-3 text-center text-[11px] text-muted-foreground"
            style={{ background: `${BINANCE}08` }}
          >
            Dados ilustrativos do back-office · Execução real auditada na Binance
          </div>
        </Card>
      </div>
    </section>
  );
};
