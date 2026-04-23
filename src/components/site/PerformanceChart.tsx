import { useEffect, useMemo, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Yield (%) and Max Drawdown (%) per month
const monthlyData = [
  { m: "2024-04", y: 21.53, dd: 1.85 },
  { m: "2024-05", y: 18.46, dd: 1.62 },
  { m: "2024-06", y: 21.11, dd: 1.74 },
  { m: "2024-07", y: 17.26, dd: 1.55 },
  { m: "2024-08", y: 23.94, dd: 2.10 },
  { m: "2024-09", y: 30.60, dd: 2.30 },
  { m: "2024-10", y: 39.76, dd: 2.45 },
  { m: "2024-11", y: 30.23, dd: 1.98 },
  { m: "2024-12", y: 24.74, dd: 1.80 },
  { m: "2025-01", y: 27.49, dd: 2.05 },
  { m: "2025-02", y: 20.95, dd: 1.70 },
  { m: "2025-03", y: 14.45, dd: 1.40 },
  { m: "2025-04", y: 24.28, dd: 1.92 },
  { m: "2025-05", y: 17.16, dd: 1.55 },
  { m: "2025-06", y: 17.08, dd: 1.48 },
  { m: "2025-07", y: 27.11, dd: 2.12 },
  { m: "2025-08", y: 17.50, dd: 1.60 },
  { m: "2025-09", y: 12.88, dd: 1.25 },
  { m: "2025-10", y: 12.39, dd: 1.18 },
  // New official data
  { m: "2025-11", y: 18.19, dd: 0.51 },
  { m: "2025-12", y: 24.74, dd: 2.53 },
  { m: "2026-01", y: 8.99, dd: 1.20 },
  { m: "2026-02", y: 15.20, dd: 2.01 },
  { m: "2026-03", y: 24.87, dd: 2.16 },
];

const Y_MAX = 45; // upper bound (%)
const Y_MIN = -5; // lower bound for drawdown
const Y_RANGE = Y_MAX - Y_MIN; // 50
const Y_TICKS_POS = [0, 10, 20, 30, 40];
const Y_TICKS_NEG = [-5];

const formatMonth = (m: string) => {
  // "2024-04" -> "04/24"
  const [y, mm] = m.split("-");
  return `${mm}/${y.slice(2)}`;
};

export const PerformanceChart = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  const AVG = useMemo(
    () => monthlyData.reduce((s, d) => s + d.y, 0) / monthlyData.length,
    [],
  );
  const AVG_DD = useMemo(
    () => monthlyData.reduce((s, d) => s + d.dd, 0) / monthlyData.length,
    [],
  );

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setAnimate(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.25 },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // Convert a value (%) to a top % position inside the chart area
  const toTopPct = (v: number) => ((Y_MAX - v) / Y_RANGE) * 100;
  const zeroTop = toTopPct(0); // y=0 line position from top, in %

  return (
    <section id="desempenho" className="border-y border-border/50 bg-secondary/30 py-24">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
            Desempenho histórico
          </Badge>
          <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">
            Rendimentos mensais <span className="text-gradient-primary">auditados</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Média mensal de {AVG.toLocaleString("pt-BR", { maximumFractionDigits: 2 })}% entre
            04/24 e 03/26. Resultados passados não garantem retornos futuros.
          </p>
        </div>

        <Card className="bg-gradient-card p-6 md:p-10">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Rendimento médio mensal</div>
              <div className="font-display text-4xl font-bold text-primary">
                {AVG.toLocaleString("pt-BR", { maximumFractionDigits: 2 })}%
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Drawdown mensal médio</div>
              <div className="font-display text-4xl font-bold text-destructive">
                {AVG_DD.toLocaleString("pt-BR", { maximumFractionDigits: 2 })}%
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="mb-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="inline-block h-3 w-3 rounded-sm bg-gradient-to-t from-primary/40 via-primary to-primary-glow" />
              Rendimento mensal
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-3 w-3 rounded-sm bg-destructive/70" />
              Drawdown máx.
            </div>
          </div>

          {/* Chart */}
          <div ref={ref} className="relative">
            <div className="overflow-x-auto pb-2">
              <div className="relative flex min-w-[900px] gap-[10px] pl-16 pr-2">
                {/* Y-axis grid */}
                <div className="pointer-events-none absolute inset-0 left-16 right-2 h-[380px]">
                  {Y_TICKS_POS.slice().reverse().map((t) => {
                    const top = toTopPct(t);
                    return (
                      <div
                        key={t}
                        className="absolute left-0 right-0 flex items-center"
                        style={{ top: `${top}%` }}
                      >
                        <span className="absolute -left-14 w-12 text-right text-[10px] tabular-nums text-muted-foreground">
                          {t}%
                        </span>
                        <div className="h-px w-full bg-border/50" />
                      </div>
                    );
                  })}

                  {/* Negative tick (drawdown axis) */}
                  {Y_TICKS_NEG.map((t) => {
                    const top = toTopPct(t);
                    return (
                      <div
                        key={t}
                        className="absolute left-0 right-0 flex items-center"
                        style={{ top: `${top}%` }}
                      >
                        <span className="absolute -left-14 w-12 text-right text-[10px] tabular-nums text-destructive/80">
                          {t}%
                        </span>
                        <div className="h-px w-full bg-destructive/20" />
                      </div>
                    );
                  })}

                  {/* Zero line */}
                  <div
                    className="absolute left-0 right-0"
                    style={{ top: `${zeroTop}%` }}
                  >
                    <div className="h-[2px] w-full bg-border" />
                  </div>

                  {/* Average line */}
                  <div
                    className="absolute left-0 right-0"
                    style={{ top: `${toTopPct(AVG)}%` }}
                  >
                    <div className="relative h-px w-full bg-primary/70">
                      <span className="absolute -top-5 right-0 z-10 rounded bg-primary px-1.5 py-0.5 text-[9px] font-semibold text-primary-foreground shadow">
                        Média {AVG.toLocaleString("pt-BR", { maximumFractionDigits: 2 })}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bars */}
                <div className="relative h-[380px] flex-1">
                  <div className="absolute inset-0 flex items-stretch gap-[10px]">
                    {monthlyData.map((d, i) => {
                      const posHeightPct = (d.y / Y_RANGE) * 100; // height of positive bar
                      const negHeightPct = (d.dd / Y_RANGE) * 100; // height of drawdown bar
                      return (
                        <div
                          key={d.m}
                          className="group relative flex h-full flex-1 flex-col items-center justify-start"
                        >
                          {/* Positive bar (above zero line) */}
                          <div
                            className="absolute left-1/2 w-full max-w-[24px] -translate-x-1/2"
                            style={{
                              bottom: `${100 - zeroTop}%`,
                              height: `${posHeightPct}%`,
                            }}
                          >
                            <div
                              className="relative h-full w-full origin-bottom rounded-t-md bg-gradient-to-t from-primary/40 via-primary to-primary-glow shadow-[0_0_18px_-4px_hsl(var(--primary)/0.6)] ring-1 ring-primary/30 transition-[transform,opacity] duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:brightness-125"
                              style={{
                                transform: animate ? "scaleY(1)" : "scaleY(0)",
                                opacity: animate ? 1 : 0,
                                transitionDelay: `${i * 55}ms`,
                              }}
                            >
                              {/* Value label on top */}
                              <div
                                className={`absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold tabular-nums text-foreground transition-opacity duration-700 ${
                                  animate ? "opacity-100" : "opacity-0"
                                }`}
                                style={{ transitionDelay: `${600 + i * 55}ms` }}
                              >
                                {d.y.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}%
                              </div>
                              {/* Glossy highlight */}
                              <span className="pointer-events-none absolute inset-x-0 top-0 h-1/3 rounded-t-md bg-gradient-to-b from-white/30 to-transparent" />
                            </div>
                          </div>

                          {/* Drawdown bar (below zero line, light red) */}
                          <div
                            className="absolute left-1/2 w-full max-w-[24px] -translate-x-1/2"
                            style={{
                              top: `${zeroTop}%`,
                              height: `${negHeightPct}%`,
                            }}
                          >
                            <div
                              className="relative h-full w-full origin-top rounded-b-md bg-gradient-to-b from-destructive/70 to-destructive/40 ring-1 ring-destructive/40 transition-[transform,opacity] duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:brightness-110"
                              style={{
                                transform: animate ? "scaleY(1)" : "scaleY(0)",
                                opacity: animate ? 1 : 0,
                                transitionDelay: `${300 + i * 55}ms`,
                              }}
                            >
                              {/* DD label */}
                              <div
                                className={`absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-semibold tabular-nums text-destructive transition-opacity duration-700 ${
                                  animate ? "opacity-100" : "opacity-0"
                                }`}
                                style={{ transitionDelay: `${800 + i * 55}ms` }}
                              >
                                -{d.dd.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}%
                              </div>
                            </div>
                          </div>

                          {/* Hover tooltip */}
                          <div className="pointer-events-none absolute -top-14 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-popover px-2 py-1 text-[11px] font-medium text-popover-foreground opacity-0 shadow-md transition-opacity group-hover:opacity-100">
                            <div>{formatMonth(d.m)}</div>
                            <div className="text-primary">
                              Lucro: {d.y.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}%
                            </div>
                            <div className="text-destructive">
                              Drawdown: {d.dd.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}%
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* X-axis labels */}
              <div className="mt-6 flex min-w-[900px] gap-[10px] pl-16 pr-2">
                {monthlyData.map((d) => (
                  <div
                    key={d.m}
                    className="flex-1 text-center text-[10px] tabular-nums text-muted-foreground"
                  >
                    {formatMonth(d.m)}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Resultados auditados do sistema Polar One. Passe o mouse sobre cada barra para ver
            rendimento e drawdown exatos.
          </p>
        </Card>
      </div>
    </section>
  );
};
