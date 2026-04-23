import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
import { Logo } from "./Logo";

export const SiteFooter = () => (
  <footer className="border-t border-border/50 bg-background py-12">
    <div className="container">
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
            <li><a href="/#faq" className="hover:text-foreground">FAQ</a></li>
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
        <p>© 2026 Polar Tensor. Todos os direitos reservados.</p>
        <p className="flex items-center gap-2">
          <Lock className="h-3 w-3" />
          Trading envolve riscos. Negocie com responsabilidade.
        </p>
      </div>
    </div>
  </footer>
);
