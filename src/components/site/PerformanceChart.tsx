import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const monthlyYields = [
  { m: "2024-04", y: 21.53 }, { m: "2024-05", y: 18.46 }, { m: "2024-06", y: 21.11 },
  { m: "2024-07", y: 17.26 }, { m: "2024-08", y: 23.94 }, { m: "2024-09", y: 30.60 },
  { m: "2024-10", y: 39.76 }, { m: "2024-11", y: 30.23 }, { m: "2024-12", y: 24.74 },
  { m: "2025-01", y: 27.49 }, { m: "2025-02", y: 20.95 }, { m: "2025-03", y: 14.45 },
  { m: "2025-04", y: 24.28 }, { m: "2025-05", y: 17.16 }, { m: "2025-06", y: 17.08 },
  { m: "2025-07", y: 27.11 }, { m: "2025-08", y: 17.50 }, { m: "2025-09", y: 12.88 },
  { m: "2025-10", y: 12.39 },
];

const Y_MAX = 45; // chart upper bound (%)
const Y_TICKS = [0, 10, 20, 30, 40];
const AVG = 22.04;

export const PerformanceChart = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

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
            Média mensal de {AVG.toLocaleString("pt-BR")}% entre 04/2024 e 10/2025. Resultados
            passados não garantem retornos futuros.
          </p>
        </div>

        <Card className="bg-gradient-card p-6 md:p-10">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Rendimento médio mensal</div>
              <div className="font-display text-4xl font-bold text-primary">
                {AVG.toLocaleString("pt-BR")}%
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Drawdown diário máximo</div>
              <div className="font-display text-4xl font-bold">~1,8%</div>
            </div>
          </div>

          {/* Chart */}
          <div ref={ref} className="relative">
            <div className="overflow-x-auto pb-2">
              <div className="relative flex min-w-[760px] gap-[10px] pl-28 pr-2">
                {/* Y-axis grid */}
                <div className="pointer-events-none absolute inset-0 left-28 right-2 h-[340px]">
                  {Y_TICKS.slice().reverse().map((t) => {
                    const top = ((Y_MAX - t) / Y_MAX) * 100;
                    return (
                      <div
                        key={t}
                        className="absolute left-0 right-0 flex items-center"
                        style={{ top: `${top}%` }}
                      >
                        <span className="absolute -left-12 w-10 text-right text-[10px] tabular-nums text-muted-foreground">
                          {t.toFixed(2)} %
                        </span>
                        <div className="h-px w-full bg-border/50" />
                      </div>
                    );
                  })}

                  {/* Average line */}
                  <div
                    className="absolute left-0 right-0"
                    style={{ top: `${((Y_MAX - AVG) / Y_MAX) * 100}%` }}
                  >
                    <div className="relative h-px w-full bg-destructive/80">
                      <span className="absolute -left-24 -top-5 z-10 rounded bg-destructive px-1.5 py-0.5 text-[9px] font-semibold text-destructive-foreground shadow">
                        Média {AVG.toLocaleString("pt-BR")}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bars */}
                <div className="relative flex h-[340px] flex-1 items-end gap-[10px]">
                  {monthlyYields.map((d, i) => {
                    const heightPct = (d.y / Y_MAX) * 100;
                    return (
                      <div
                        key={d.m}
                        className="group relative flex h-full flex-1 items-end justify-center"
                      >
                        {/* Bar */}
                        <div
                          className="relative w-full max-w-[28px] origin-bottom rounded-t-md bg-gradient-to-t from-primary/40 via-primary to-primary-glow shadow-[0_0_18px_-4px_hsl(var(--primary)/0.6)] ring-1 ring-primary/30 transition-[height,opacity] duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:brightness-125"
                          style={{
                            height: animate ? `${heightPct}%` : "0%",
                            opacity: animate ? 1 : 0,
                            transitionDelay: `${i * 60}ms`,
                          }}
                        >
                          {/* Value label on top of bar */}
                          <div
                            className={`absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold tabular-nums text-foreground transition-opacity duration-700 ${
                              animate ? "opacity-100" : "opacity-0"
                            }`}
                            style={{ transitionDelay: `${600 + i * 60}ms` }}
                          >
                            {d.y.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}%
                          </div>
                          {/* Glossy highlight */}
                          <span className="pointer-events-none absolute inset-x-0 top-0 h-1/3 rounded-t-md bg-gradient-to-b from-white/30 to-transparent" />
                          {/* Hover tooltip */}
                          <div className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-popover px-2 py-1 text-[11px] font-medium text-popover-foreground opacity-0 shadow-md transition-opacity group-hover:opacity-100">
                            {d.m} · {d.y.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}%
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* X-axis labels */}
              <div className="mt-3 flex min-w-[760px] gap-[10px] pl-28 pr-2">
                {monthlyYields.map((d) => (
                  <div
                    key={d.m}
                    className="flex-1 text-center text-[10px] tabular-nums text-muted-foreground"
                  >
                    {d.m}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Resultados auditados do sistema Polar One. Passe o mouse sobre cada barra para ver o
            rendimento exato.
          </p>
        </Card>
      </div>
    </section>
  );
};
