import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { PageHero } from "@/components/site/PageHero";
import { Seo } from "@/components/site/Seo";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRight,
  Search,
  HelpCircle,
  Building2,
  Cpu,
  Wallet,
  ShieldCheck,
  Users,
  Banknote,
  Sparkles,
  MessageCircleQuestion,
} from "lucide-react";
import { SIGNUP_URL, SITE_URL } from "@/lib/constants";

type FaqCategory =
  | "Sobre a empresa"
  | "Tecnologia & Polar One"
  | "Depósitos & Saques"
  | "Taxas & Lucros"
  | "Riscos & Segurança"
  | "Conta & Suporte"
  | "Programa de indicações";

interface FaqEntry {
  category: FaqCategory;
  q: string;
  a: string;
}

const faqs: FaqEntry[] = [
  // Sobre a empresa
  {
    category: "Sobre a empresa",
    q: "Há quanto tempo a Polar Tensor existe?",
    a: "A Polar Tensor foi fundada em 2018 como um centro de pesquisa em algoritmos de trading com inteligência artificial. A primeira versão lucrativa do nosso sistema entrou em produção em 2020, e desde então passamos por múltiplas iterações até a versão atual do Polar One.",
  },
  {
    category: "Sobre a empresa",
    q: "Quem são os fundadores e a equipe por trás do projeto?",
    a: "A Polar Tensor é composta por uma equipe multidisciplinar de cientistas de dados, engenheiros de machine learning, matemáticos quantitativos e profissionais com experiência em mercados financeiros tradicionais e de cripto. A equipe está distribuída entre nossas operações nos EUA, Europa, Hong Kong e Panamá.",
  },
  {
    category: "Sobre a empresa",
    q: "A Polar Tensor é uma corretora ou um fundo de investimento?",
    a: "Nem uma coisa nem outra. Somos uma empresa de tecnologia que licencia o uso de um sistema proprietário de trading automatizado. Você mantém o controle dos seus depósitos, e o sistema apenas executa operações através de APIs autorizadas em corretoras como a Binance.",
  },
  {
    category: "Sobre a empresa",
    q: "Por que a Polar Tensor possui entidades em vários países?",
    a: "Cada jurisdição cumpre um papel específico: os EUA (Wyoming) abrigam a estrutura financeira regulada (FinCEN MSB), a Polônia atende às exigências europeias, Hong Kong concentra a pesquisa e desenvolvimento, e o Panamá centraliza a operação técnica. Essa estrutura garante conformidade global e resiliência regulatória.",
  },
  {
    category: "Sobre a empresa",
    q: "A empresa é auditada por terceiros independentes?",
    a: "Sim. Nossa estrutura legal e financeira é revisada periodicamente por uma das quatro grandes firmas globais de auditoria (Big Four), garantindo transparência sobre a constituição corporativa, conformidade regulatória e governança.",
  },

  // Tecnologia
  {
    category: "Tecnologia & Polar One",
    q: "O que diferencia o Polar One de bots de trading comuns?",
    a: "Bots tradicionais executam regras fixas (grid, DCA, médias móveis). O Polar One utiliza duas redes neurais distintas — uma de tendência e outra de direção — treinadas com bilhões de pontos de dados de mercado. O sistema aprende padrões não-lineares que estratégias baseadas em regras simplesmente não conseguem identificar.",
  },
  {
    category: "Tecnologia & Polar One",
    q: "Em qual exchange o sistema opera?",
    a: "Atualmente operamos exclusivamente na Binance, devido à profundidade de liquidez, baixas taxas institucionais e robustez da infraestrutura de API. Isso permite execução de alta frequência com latência mínima.",
  },
  {
    category: "Tecnologia & Polar One",
    q: "Quais ativos o Polar One opera?",
    a: "O sistema opera principalmente nos pares de maior liquidez do mercado de criptomoedas, com foco em BTC e ETH contra USDT, podendo expandir para outros pares conforme as condições de mercado e liquidez disponível.",
  },
  {
    category: "Tecnologia & Polar One",
    q: "O sistema usa alavancagem?",
    a: "O Polar One opera com alavancagem conservadora, tipicamente entre 1x e 3x, dependendo da estratégia ativa e das condições de mercado. O foco é preservação de capital: o sistema evita exposição agressiva e prioriza consistência semanal sobre retornos pontuais elevados, reduzindo significativamente o risco de liquidação em comparação a estratégias de alta alavancagem.",
  },
  {
    category: "Tecnologia & Polar One",
    q: "O algoritmo é treinado novamente com o tempo?",
    a: "Sim. As redes neurais passam por re-treinamento contínuo conforme novos dados de mercado são incorporados. Isso permite que o sistema se adapte a mudanças de regime — bull market, bear market, alta volatilidade ou consolidação.",
  },
  {
    category: "Tecnologia & Polar One",
    q: "O que acontece em caso de queda da Binance ou da internet?",
    a: "Nossa infraestrutura roda em servidores redundantes em data centers próximos aos servidores da Binance, com failover automático. Em caso de instabilidade da própria exchange, o sistema entra em modo seguro, fechando posições abertas conforme protocolos pré-definidos.",
  },
  {
    category: "Tecnologia & Polar One",
    q: "Posso ver o histórico de operações do sistema?",
    a: "Sim. Após o cadastro, você tem acesso ao painel com histórico detalhado das operações, performance semanal, drawdown, win rate e demais métricas relevantes. Toda transparência possível dentro do que não compromete a propriedade intelectual do algoritmo.",
  },

  // Depósitos & Saques
  {
    category: "Depósitos & Saques",
    q: "Qual o valor mínimo para começar?",
    a: "O valor mínimo de entrada na Polar Tensor é de 1.000 USDT, equivalente ao plano inicial. Os planos intermediários começam em 10.000 USDT e os planos avançados, com taxas de performance reduzidas e gerente de relacionamento dedicado, partem de 50.000 USDT. Todos os valores são depositados em criptomoedas (BTC, ETH, SOL ou USDT) diretamente na sua conta vinculada.",
  },
  {
    category: "Depósitos & Saques",
    q: "Quanto tempo leva para o depósito ser confirmado?",
    a: "Depósitos em Bitcoin, Ethereum, Solana e USDT são confirmados após o número padrão de confirmações da rede blockchain — geralmente entre 10 e 30 minutos, dependendo da rede utilizada e do congestionamento.",
  },
  {
    category: "Depósitos & Saques",
    q: "Como funcionam os saques?",
    a: "Saques são processados automaticamente 24 horas por dia, 7 dias por semana, em USDT ou USDC. Após a solicitação no painel, o valor é enviado para a carteira indicada após validação de segurança.",
  },
  {
    category: "Depósitos & Saques",
    q: "Existe um período mínimo de permanência (lock-up)?",
    a: "Não há lock-up obrigatório do capital. No entanto, recomendamos um horizonte mínimo de algumas semanas para que o efeito da composição dos lucros semanais se manifeste de forma significativa.",
  },
  {
    category: "Depósitos & Saques",
    q: "Posso depositar via PIX ou cartão de crédito?",
    a: "Não diretamente. A entrada de capital é exclusivamente em criptomoedas. Você pode adquirir cripto facilmente em corretoras locais via PIX e transferir para o endereço fornecido no seu painel.",
  },
  {
    category: "Depósitos & Saques",
    q: "Posso fazer aportes adicionais depois de iniciar?",
    a: "Sim. Aportes adicionais são permitidos a qualquer momento e passam a render junto com o capital já existente. Se o aporte ultrapassar o limite do plano atual, você pode migrar para um plano superior.",
  },

  // Taxas & Lucros
  {
    category: "Taxas & Lucros",
    q: "Quando e como os lucros são distribuídos?",
    a: "Os lucros são distribuídos semanalmente, toda sexta-feira às 23:00 UTC, automaticamente no seu painel. Você pode optar por sacar ou reinvestir para potencializar a composição.",
  },
  {
    category: "Taxas & Lucros",
    q: "A taxa de performance incide sobre o capital ou só sobre os lucros?",
    a: "Apenas sobre os lucros. Se em uma semana não houver lucro, não há cobrança de performance. A taxa varia entre 20% e 30% conforme o plano contratado.",
  },
  {
    category: "Taxas & Lucros",
    q: "A taxa de licença de 10% é cobrada todo mês?",
    a: "Não. A taxa de licença de 10% é única, cobrada uma vez sobre o valor inicial depositado, dando direito ao uso vitalício do sistema dentro daquele plano.",
  },
  {
    category: "Taxas & Lucros",
    q: "Existe alguma taxa oculta de saque ou movimentação?",
    a: "Não cobramos taxas adicionais sobre saques. Você arca apenas com a taxa de rede da blockchain (gas fee) no momento do envio para sua carteira externa.",
  },
  {
    category: "Taxas & Lucros",
    q: "Os lucros são garantidos?",
    a: "Não. Nenhum sistema de trading sério oferece garantia de lucro. Apresentamos resultados históricos auditados, mas performance passada não garante resultados futuros. Trading envolve riscos reais de perda.",
  },
  {
    category: "Taxas & Lucros",
    q: "Existe high water mark?",
    a: "Sim. A taxa de performance utiliza marca d'água alta (high water mark): só voltamos a cobrar performance quando seu saldo ultrapassa o pico anterior, evitando dupla cobrança em períodos de recuperação.",
  },

  // Riscos & Segurança
  {
    category: "Riscos & Segurança",
    q: "Meus fundos ficam custodiados pela Polar Tensor?",
    a: "Os fundos operacionais ficam em contas dedicadas na Binance, vinculadas ao seu cadastro. A Polar Tensor opera via APIs com permissão restrita a trading — sem permissão de saque para endereços externos.",
  },
  {
    category: "Riscos & Segurança",
    q: "O que acontece se a Polar Tensor encerrar atividades?",
    a: "Por se tratar de capital alocado em ambiente segregado e por mantermos estrutura corporativa em múltiplas jurisdições com auditoria Big Four, há protocolos formais de devolução de capital e encerramento ordenado descritos nos termos de uso.",
  },
  {
    category: "Riscos & Segurança",
    q: "Como vocês protegem meus dados pessoais?",
    a: "Seguimos práticas alinhadas à LGPD (Brasil) e ao GDPR (Europa). Dados são criptografados em trânsito e em repouso, com acesso restrito por níveis de permissão e auditoria interna periódica.",
  },
  {
    category: "Riscos & Segurança",
    q: "A plataforma exige autenticação em dois fatores (2FA)?",
    a: "Sim. O 2FA é obrigatório para todas as contas, utilizando aplicativos como Google Authenticator ou Authy. Saques exigem confirmação adicional por e-mail.",
  },
  {
    category: "Riscos & Segurança",
    q: "Vocês têm seguro contra falhas tecnológicas?",
    a: "Mantemos protocolos de mitigação de risco operacional, incluindo redundância de infraestrutura e fundo de reserva técnica. Os termos específicos de cobertura constam na documentação contratual disponibilizada após o cadastro.",
  },
  {
    category: "Riscos & Segurança",
    q: "Isso é uma pirâmide ou esquema Ponzi?",
    a: "Não. Pirâmides remuneram participantes antigos com capital de novos entrantes; nosso modelo gera receita exclusivamente da execução algorítmica em mercado real, com extratos verificáveis na Binance e auditoria externa. Não há promessa de retorno fixo nem dependência de recrutamento.",
  },

  // Conta & Suporte
  {
    category: "Conta & Suporte",
    q: "Quem pode abrir uma conta na Polar Tensor?",
    a: "Pessoas físicas maiores de 18 anos com documentação válida, residentes em jurisdições onde nossos serviços são autorizados. Não atendemos residentes de países sob sanções internacionais ou em listas restritivas.",
  },
  {
    category: "Conta & Suporte",
    q: "Preciso passar por verificação KYC?",
    a: "Sim. Como entidade regulada (Polar MSB Inc., FinCEN), seguimos políticas de KYC e AML. A verificação envolve documento oficial, comprovante de endereço e prova de vida (selfie).",
  },
  {
    category: "Conta & Suporte",
    q: "Quanto tempo leva para aprovar minha conta?",
    a: "Após o envio completo da documentação, a verificação geralmente é concluída em até 48 horas úteis. Em casos que exigem análise adicional, o time de compliance entra em contato diretamente.",
  },
  {
    category: "Conta & Suporte",
    q: "Como posso falar com o suporte?",
    a: "O suporte oficial está disponível pelo painel logado, e-mail e WhatsApp. Para clientes dos planos superiores, oferecemos atendimento dedicado com gerente de relacionamento.",
  },
  {
    category: "Conta & Suporte",
    q: "Vocês oferecem suporte em português?",
    a: "Sim. Todo o suporte ao cliente brasileiro é prestado em português, em horário comercial estendido, por profissionais treinados nos detalhes técnicos da plataforma.",
  },
  {
    category: "Conta & Suporte",
    q: "Posso ter mais de uma conta?",
    a: "Não. Mantemos a política de uma conta por CPF/documento, em conformidade com nossas políticas de KYC e prevenção a abuso de plataforma.",
  },

  // Indicações
  {
    category: "Programa de indicações",
    q: "Como funciona o programa de indicações?",
    a: "Ao indicar novos clientes através do seu link único, você recebe uma comissão sobre as taxas de performance geradas pelos seus indicados. O modelo é transparente, sem múltiplos níveis de recrutamento que caracterizam pirâmides.",
  },
  {
    category: "Programa de indicações",
    q: "Preciso ser cliente ativo para indicar pessoas?",
    a: "Sim. O programa de indicação é exclusivo para clientes ativos, com depósito vigente. Isso garante que quem recomenda a Polar Tensor realmente conhece a plataforma.",
  },
  {
    category: "Programa de indicações",
    q: "Existe limite de indicações?",
    a: "Não há limite no número de pessoas que você pode indicar. As comissões são creditadas semanalmente junto com a distribuição de lucros.",
  },
];

const categoryMeta: Record<FaqCategory, { icon: typeof Building2; color: string }> = {
  "Sobre a empresa": { icon: Building2, color: "text-primary" },
  "Tecnologia & Polar One": { icon: Cpu, color: "text-primary" },
  "Depósitos & Saques": { icon: Wallet, color: "text-primary" },
  "Taxas & Lucros": { icon: Banknote, color: "text-primary" },
  "Riscos & Segurança": { icon: ShieldCheck, color: "text-primary" },
  "Conta & Suporte": { icon: Users, color: "text-primary" },
  "Programa de indicações": { icon: Sparkles, color: "text-primary" },
};

const categories: ("Todas" | FaqCategory)[] = [
  "Todas",
  "Sobre a empresa",
  "Tecnologia & Polar One",
  "Depósitos & Saques",
  "Taxas & Lucros",
  "Riscos & Segurança",
  "Conta & Suporte",
  "Programa de indicações",
];

const Faq = () => {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<(typeof categories)[number]>("Todas");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faqs.filter((f) => {
      const matchCat = active === "Todas" || f.category === active;
      const matchQuery =
        !q || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [query, active]);

  const grouped = useMemo(() => {
    const map = new Map<FaqCategory, FaqEntry[]>();
    filtered.forEach((f) => {
      if (!map.has(f.category)) map.set(f.category, []);
      map.get(f.category)!.push(f);
    });
    return Array.from(map.entries());
  }, [filtered]);

  // Observação: o JSON-LD do tipo FAQPage é servido globalmente via index.html
  // (estático, visível ao Googlebot sem necessidade de JS). NÃO injetar outro
  // FAQPage aqui — duplicação causa erro "O campo FAQPage está duplicado" no
  // Google Search Console (Rich Results / Dados Estruturados).

  return (
    <main className="min-h-screen bg-background">
      <Seo
        title="FAQ Polar Tensor | Perguntas frequentes sobre o Polar One"
        description="Tire suas dúvidas sobre a Polar Tensor: tecnologia, taxas, depósitos, saques, segurança, KYC, riscos e programa de indicações. Mais de 35 perguntas respondidas."
        canonical={`${SITE_URL}/faq`}
      />
      <SiteHeader />

      <PageHero
        badge="Central de Ajuda"
        title="Perguntas frequentes sobre a Polar Tensor"
        subtitle="Respostas diretas para as principais dúvidas sobre tecnologia, operação, segurança, taxas, KYC e muito mais."
        showBack
      />

      {/* Search + filters */}
      <section className="border-b border-border/50 bg-secondary/30 py-10">
        <div className="container max-w-5xl">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar uma pergunta… (ex: saque, KYC, taxa, risco)"
              className="h-12 rounded-xl border-border/60 bg-card pl-11 text-sm"
              aria-label="Buscar pergunta"
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {categories.map((c) => {
              const isActive = c === active;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setActive(c)}
                  className={
                    isActive
                      ? "rounded-full border border-primary/40 bg-primary/15 px-4 py-1.5 text-xs font-medium text-primary transition"
                      : "rounded-full border border-border/60 bg-card px-4 py-1.5 text-xs text-muted-foreground transition hover:border-primary/30 hover:text-foreground"
                  }
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ content */}
      <section className="py-16 md:py-20">
        <div className="container max-w-4xl">
          {grouped.length === 0 && (
            <Card className="bg-gradient-card p-10 text-center">
              <MessageCircleQuestion className="mx-auto h-10 w-10 text-primary" />
              <h3 className="mt-4 font-display text-xl font-semibold">
                Nenhuma pergunta encontrada
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Tente outro termo de busca ou selecione outra categoria.
              </p>
            </Card>
          )}

          <div className="space-y-12">
            {grouped.map(([cat, items]) => {
              const Icon = categoryMeta[cat].icon;
              return (
                <div key={cat}>
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="font-display text-xl font-semibold md:text-2xl">{cat}</h2>
                      <p className="text-xs text-muted-foreground">
                        {items.length} {items.length === 1 ? "pergunta" : "perguntas"}
                      </p>
                    </div>
                  </div>

                  <Accordion type="single" collapsible className="space-y-3">
                    {items.map((item, i) => (
                      <AccordionItem
                        key={`${cat}-${i}`}
                        value={`${cat}-${i}`}
                        className="rounded-xl border border-border/50 bg-card px-5 transition-colors hover:border-primary/30"
                      >
                        <AccordionTrigger className="text-left font-medium hover:no-underline">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20">
        <div className="container">
          <Card className="relative overflow-hidden bg-gradient-card p-8 md:p-12">
            <div className="absolute inset-0 bg-gradient-hero opacity-30" />
            <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <HelpCircle className="h-9 w-9 text-primary" />
                <h2 className="mt-4 font-display text-2xl font-bold md:text-3xl">
                  Não encontrou o que procurava?
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Nosso time fala português e está disponível para esclarecer qualquer dúvida
                  antes ou depois do cadastro.
                </p>
              </div>
              <Button asChild variant="hero" size="lg" className="shrink-0">
                <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer">
                  Falar com a Polar Tensor <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
};

export default Faq;
