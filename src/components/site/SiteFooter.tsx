import { Link } from "react-router-dom";
import { Lock, ShieldCheck, Building2, Landmark, Globe2, Banknote, FlaskConical, MapPin, AlertTriangle } from "lucide-react";
import { Logo } from "./Logo";

const regulations = [
  {
    icon: Building2,
    name: "Polar Tensor Corp.",
    jurisdiction: "República do Panamá",
    description: "Tecnologia de Trading Automatizado",
    items: [
      { label: "Registro", value: "155771852" },
      { label: "SEC (EUA) CIK", value: "0002085242" },
    ],
  },
  {
    icon: Landmark,
    name: "Polar Tensor USA LLC",
    jurisdiction: "Estados Unidos — Wyoming",
    description: "Entidade cliente para EUA e Internacional (Não-UE)",
    items: [
      { label: "Jurisdição", value: "Wyoming, EUA" },
    ],
  },
  {
    icon: Globe2,
    name: "Polar Tensor Europe SP ZOO",
    jurisdiction: "República da Polônia (UE)",
    description: "Entidade cliente para a União Europeia",
    items: [
      { label: "Jurisdição", value: "Polônia — UE" },
    ],
  },
  {
    icon: Banknote,
    name: "Polar MSB Inc.",
    jurisdiction: "Estados Unidos — Montana",
    description: "Pagamentos, câmbio fiat e serviços de cartão",
    items: [
      { label: "Registro", value: "D1537006" },
      { label: "FinCEN", value: "31000306664168" },
    ],
  },
  {
    icon: FlaskConical,
    name: "Polar Tensor LAB Limited",
    jurisdiction: "Hong Kong",
    description: "Empresa de Pesquisa e Desenvolvimento",
    items: [
      { label: "Registro", value: "78737300" },
    ],
  },
  {
    icon: MapPin,
    name: "Polar Tensor Africa Limited",
    jurisdiction: "República Federal da Nigéria",
    description: "Integração de clientes fora da UE e EUA",
    items: [
      { label: "Jurisdição", value: "Nigéria" },
    ],
  },
];

export const SiteFooter = () => (
  <footer className="border-t border-border/50 bg-background">
    {/* Regulatory section — premium corporate band */}
    <section className="relative border-b border-border/50 bg-gradient-to-b from-secondary/30 via-background to-background">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="container py-14">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            <ShieldCheck className="h-3.5 w-3.5" />
            Estrutura corporativa & regulatória
          </div>
          <h3 className="mt-4 font-display text-2xl font-bold text-foreground md:text-3xl">
            Polar Tensor Group™
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Operamos sob um grupo internacional licenciado, com entidades dedicadas
            em múltiplas jurisdições para garantir conformidade, segurança e transparência.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {regulations.map((r) => {
            const Icon = r.icon;
            return (
              <div
                key={r.name}
                className="group relative overflow-hidden rounded-xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary/0 via-primary/60 to-primary/0 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-display text-sm font-semibold leading-tight text-foreground">
                      {r.name}
                    </h4>
                    <p className="mt-0.5 flex items-center gap-1 text-[11px] font-medium uppercase tracking-wide text-primary/80">
                      <MapPin className="h-3 w-3" />
                      {r.jurisdiction}
                    </p>
                  </div>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  {r.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5 border-t border-border/50 pt-3">
                  {r.items.map((it) => (
                    <span
                      key={it.label}
                      className="inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-background/60 px-2 py-1 text-[11px]"
                    >
                      <span className="text-muted-foreground">{it.label}:</span>
                      <span className="font-mono font-semibold text-foreground">{it.value}</span>
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-xs text-muted-foreground">
          <ShieldCheck className="mr-1 inline h-3.5 w-3.5 text-primary" />
          Todas as entidades acima compõem o <strong className="text-foreground">Polar Tensor Group™</strong>,
          sob holding e propriedade da <strong className="text-foreground">Polar Tensor Corporation™</strong>.
        </p>
      </div>
    </section>

    {/* Risk disclaimer */}
    <section className="border-b border-border/50 bg-background">
      <div className="container py-12">
        <div className="mx-auto max-w-4xl rounded-xl border border-destructive/30 bg-destructive/5 p-6 md:p-8">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-destructive/10 text-destructive ring-1 ring-destructive/20">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-display text-lg font-semibold text-foreground">Aviso de Risco</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                O mercado de criptomoedas envolve riscos significativos e pode não ser adequado para
                todas as pessoas. O valor das criptomoedas pode ser altamente volátil e pode flutuar
                rapidamente. Este aviso tem como objetivo fornecer clareza sobre os riscos associados
                à tecnologia blockchain, às criptomoedas e aos serviços oferecidos pela Polar Tensor.
                Ao utilizar nossos serviços, você reconhece e concorda com as seguintes divulgações
                de risco:
              </p>
              <ul className="mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                {[
                  "Volatilidade",
                  "Riscos de Segurança",
                  "Nenhuma Garantia de Lucro",
                  "Riscos de Mercado e Regulatórios",
                  "Riscos de Liquidez e Tecnológicos",
                ].map((r) => (
                  <li key={r} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-destructive" />
                    <span className="text-foreground">{r}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Ao interagir com a Polar Tensor, você entende que pode perder parte ou a totalidade
                de seus criptoativos e concorda em assumir total responsabilidade por suas ações. É
                fortemente recomendado que você busque aconselhamento financeiro independente e
                conduza uma pesquisa aprofundada.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div className="container py-12">
      <div className="grid gap-8 md:grid-cols-4">
        <div className="space-y-4">
          <Logo />
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Polar Tensor</strong> — plataforma de trading
            algorítmico com inteligência artificial para o mercado de criptomoedas.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Plataforma</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/tecnologia" className="hover:text-foreground">Tecnologia</Link></li>
            <li><a href="/#desempenho" className="hover:text-foreground">Desempenho</a></li>
            <li><a href="/#planos" className="hover:text-foreground">Planos</a></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Empresa</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/sobre" className="hover:text-foreground">Sobre</Link></li>
            <li><Link to="/consultoria" className="hover:text-foreground">Consultoria</Link></li>
            <li><Link to="/faq" className="hover:text-foreground">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Legal</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/termos" className="hover:text-foreground">Termos de Uso</Link></li>
            <li><Link to="/privacidade" className="hover:text-foreground">Política de Privacidade</Link></li>
            <li><Link to="/aviso-de-risco" className="hover:text-foreground">Aviso de Risco</Link></li>
          </ul>
        </div>
      </div>
      <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 pb-20 text-xs text-muted-foreground sm:flex-row md:pb-8">
        <p className="text-center sm:text-left">
          © 2026 | Polar Tensor | Todos os direitos reservados | Desenvolvido por{" "}
          <a
            href="https://danielolimpio.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground hover:text-primary"
          >
            Daniel Olímpio
          </a>
        </p>
        <p className="flex items-center gap-2">
          <Lock className="h-3 w-3" />
          Trading envolve riscos. Negocie com responsabilidade.
        </p>
      </div>
    </div>
  </footer>
);
