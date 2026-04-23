import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { PageHero } from "@/components/site/PageHero";
import { Seo } from "@/components/site/Seo";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle2, Cpu, Clock, Wallet, TrendingDown, HelpCircle } from "lucide-react";
import { SIGNUP_URL, SITE_URL } from "@/lib/constants";

const planFaqs = [
  {
    q: "Como funciona a taxa de licença única de 10%?",
    a: "Ao depositar, uma taxa única de 10% é deduzida automaticamente do valor aportado para liberar o uso do Polar One. Ela é cobrada apenas uma vez, no momento do depósito, e cobre o licenciamento do software de trading algorítmico — não há mensalidades nem cobranças recorrentes pelo uso da plataforma.",
  },
  {
    q: "A taxa de licença incide sobre cada novo depósito?",
    a: "Sim. A taxa de 10% é aplicada sobre cada novo valor depositado, pois corresponde ao licenciamento do capital que será operado pelo Polar One. Saldos reinvestidos a partir de lucros já distribuídos não pagam licença novamente.",
  },
  {
    q: "Como é calculada a taxa de performance?",
    a: "A taxa de performance incide exclusivamente sobre os lucros gerados pelo Polar One — nunca sobre o capital depositado. O percentual varia conforme o plano escolhido (de 40% no Iniciante até 20% no Empresa). Se não houver lucro na semana, não há cobrança de performance.",
  },
  {
    q: "Existe high-water mark na taxa de performance?",
    a: "Sim. A performance só é cobrada sobre novos lucros líquidos acima do maior valor já registrado na sua conta. Caso haja semanas com resultado negativo, você só voltará a pagar performance depois que sua conta superar a marca anterior — garantindo que você nunca pague duas vezes pelo mesmo lucro.",
  },
  {
    q: "Quando os lucros são distribuídos?",
    a: "A distribuição de resultados ocorre toda sexta-feira, às 23:00 UTC, diretamente no seu backoffice. Após o crédito, você pode reinvestir, manter na conta ou solicitar saque a qualquer momento.",
  },
  {
    q: "Os lucros são creditados automaticamente?",
    a: "Sim. O processo é 100% automatizado: ao final do ciclo semanal, o sistema calcula o resultado líquido, deduz a taxa de performance correspondente ao seu plano e credita o lucro disponível em sua carteira interna no backoffice.",
  },
  {
    q: "Posso sacar meu capital a qualquer momento?",
    a: "Sim. Você pode solicitar o saque parcial ou total da sua contribuição quando quiser, sem prazo de carência ou bloqueio. Os saques são processados de forma automática 24/7, em USDT.",
  },
  {
    q: "Como funciona a taxa de saída decrescente?",
    a: "Para cobrir custos operacionais, é aplicada uma taxa única sobre o valor sacado: 10% nos primeiros 12 meses após o depósito, 5% entre 12 e 24 meses, e gratuita após 24 meses. A contagem é feita por depósito, então aportes mais antigos podem já estar isentos.",
  },
  {
    q: "Existe valor mínimo ou máximo para saque?",
    a: "Não há valor máximo — você pode sacar todo o seu saldo disponível a qualquer momento. O valor mínimo de saque é de 10 USDT para cobrir os custos de rede da blockchain.",
  },
  {
    q: "Posso mudar de plano depois de começar?",
    a: "Sim. Conforme seu saldo cresce, você pode migrar para planos superiores e passar a pagar uma taxa de performance menor. A mudança é automática quando seu capital atinge a faixa do próximo nível, mas também pode ser solicitada manualmente no backoffice.",
  },
];

const plans = [
  {
    name: "Iniciante",
    min: "100 USDT",
    fee: "40%",
    features: [
      "Acesso ao sistema Polar One",
      "Distribuição semanal de lucros",
      "Saques automáticos 24/7",
      "Suporte via comunidade",
    ],
  },
  {
    name: "Básico",
    min: "1.000 USDT",
    fee: "37%",
    features: [
      "Tudo do plano Iniciante",
      "Relatórios mensais de desempenho",
      "Acesso ao backoffice completo",
      "Suporte por e-mail",
    ],
  },
  {
    name: "Avançado",
    min: "3.000 USDT",
    fee: "33%",
    features: [
      "Tudo do plano Básico",
      "Alertas de execução em tempo real",
      "Materiais educativos exclusivos",
      "Suporte prioritário",
    ],
  },
  {
    name: "Profissional",
    min: "8.000 USDT",
    fee: "30%",
    features: [
      "Tudo do plano Avançado",
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

const highlights = [
  {
    icon: Wallet,
    title: "Licença única de 10%",
    desc: "Cobrada uma única vez sobre o valor depositado para liberar o uso do Polar One.",
  },
  {
    icon: Clock,
    title: "Lucros toda sexta-feira",
    desc: "Distribuição semanal de resultados às 23:00 UTC, direto no seu backoffice.",
  },
  {
    icon: TrendingDown,
    title: "Taxa de saída decrescente",
    desc: "10% nos primeiros 12 meses, 5% após 12 meses e gratuita após 24 meses.",
  },
];

const Plans = () => (
  <main className="min-h-screen bg-background">
    <Seo
      title="Planos | Polar Tensor"
      description="Conheça os planos da Polar Tensor: Iniciante, Básico, Avançado, Profissional, Elite e Empresa. Use o Polar One com licença única de 10% e taxa de performance sobre lucros."
      canonical={`${SITE_URL}/planos`}
    />
    <SiteHeader />
    <PageHero
      badge="Planos"
      title="Escolha o seu nível de acesso"
      subtitle="Use o Polar One por conta própria e comece a ganhar imediatamente. Taxa de licença única e performance apenas sobre os lucros gerados."
      showBack
    />

    {/* Software description */}
    <section className="py-16">
      <div className="container max-w-4xl">
        <Card className="bg-gradient-card p-6 md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-start">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Cpu className="h-7 w-7" />
            </div>
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                Use Nosso Software de Trading
              </h2>
              <p>
                Através da nossa plataforma, você agora pode utilizar o{" "}
                <span className="font-semibold text-foreground">Polar One</span> por conta própria
                e começar a ganhar imediatamente. Uma{" "}
                <span className="font-semibold text-foreground">taxa de licença única de 10%</span>{" "}
                será deduzida do valor depositado.
              </p>
              <p>
                Estamos cobrando uma{" "}
                <span className="font-semibold text-foreground">taxa de performance</span> sobre os
                lucros gerados pelo uso do nosso software, baseada no valor adicionado ao trading.
                Os lucros são distribuídos toda{" "}
                <span className="font-semibold text-foreground">sexta-feira às 23:00 UTC</span>.
              </p>
              <p>
                Você pode retirar todo ou parte da sua contribuição a qualquer momento; no entanto,
                uma taxa única de{" "}
                <span className="font-semibold text-foreground">10%</span> será aplicada para
                cobrir os custos operacionais. Após{" "}
                <span className="font-semibold text-foreground">12 meses</span>, essa taxa cairá
                para <span className="font-semibold text-foreground">5%</span>, e após{" "}
                <span className="font-semibold text-foreground">24 meses</span>, será gratuita.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 border-t border-border/50 pt-8 md:grid-cols-3">
            {highlights.map((h) => (
              <div key={h.title} className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <h.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">{h.title}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>

    {/* Plans grid */}
    <section className="border-t border-border/50 bg-secondary/20 py-20">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
            Todos os planos
          </Badge>
          <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
            Do Iniciante ao Empresa
          </h2>
          <p className="mt-3 text-muted-foreground">
            Quanto maior o nível, menor a taxa de performance sobre os lucros.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

              <Button asChild variant={p.featured ? "hero" : "outline"} className="mt-8 w-full">
                <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer">
                  Começar agora
                </a>
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>

    <SiteFooter />
  </main>
);

export default Plans;
