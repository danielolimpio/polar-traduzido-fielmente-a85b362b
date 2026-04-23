import { Link } from "react-router-dom";
import { Lock, Dot } from "lucide-react";
import { Logo } from "./Logo";

const regulations = [
  {
    name: "Polar Tensor Corp. (Panamá)",
    description: "Tecnologia de Trading Automatizado",
    items: [
      { label: "Número de registro", value: "155771852" },
      { label: "Número SEC (EUA) CIK", value: "0002085242" },
    ],
  },
  {
    name: "Polar Tensor USA LLC (Wyoming, EUA)",
    description: "Entidade cliente para EUA e Internacional (Não-UE)",
    items: [
      { label: "Jurisdição", value: "Estados Unidos — Wyoming" },
    ],
  },
  {
    name: "Polar Tensor Europe SP ZOO (Polônia)",
    description: "Entidade cliente para a União Europeia",
    items: [
      { label: "Jurisdição", value: "República da Polônia (UE)" },
    ],
  },
  {
    name: "Polar MSB Inc. (Montana, EUA)",
    description: "Pagamentos, câmbio fiat e serviços de cartão",
    items: [
      { label: "Número de registro", value: "D1537006" },
      { label: "Número FinCen", value: "31000306664168" },
    ],
  },
  {
    name: "Polar Tensor LAB Limited (Hong Kong)",
    description: "Empresa de Pesquisa e Desenvolvimento",
    items: [
      { label: "Número de registro", value: "78737300" },
    ],
  },
  {
    name: "Polar Tensor Africa Limited (Nigéria)",
    description: "Integração de clientes fora da UE e EUA",
    items: [
      { label: "Jurisdição", value: "República Federal da Nigéria" },
    ],
  },
];

export const SiteFooter = () => (
  <footer className="border-t border-border/50 bg-background py-12">
    <div className="container">
      {/* Regulatory information */}
      <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {regulations.map((r) => (
          <div
            key={r.name}
            className="rounded-xl border border-border/60 bg-card/40 p-5"
          >
            <h4 className="mb-1 font-display text-sm font-semibold text-foreground">
              {r.name}
            </h4>
            <p className="mb-3 text-xs text-muted-foreground">{r.description}</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {r.items.map((it) => (
                <li key={it.label} className="flex items-start gap-2">
                  <Dot className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>
                    {it.label}:{" "}
                    <span className="font-semibold text-foreground">{it.value}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

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
