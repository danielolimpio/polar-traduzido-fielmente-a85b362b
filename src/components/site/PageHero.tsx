import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface PageHeroProps {
  badge?: string;
  title: string;
  subtitle?: string;
  showBack?: boolean;
}

export const PageHero = ({ badge, title, subtitle, showBack }: PageHeroProps) => (
  <section className="relative overflow-hidden border-b border-border/50 bg-gradient-hero">
    <div className="absolute inset-0 grid-bg opacity-40" />
    <div className="absolute left-1/2 top-0 -z-0 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
    <div className="container relative py-16 md:py-20">
      {showBack && (
        <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Voltar para o início
        </Link>
      )}
      {badge && (
        <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
          {badge}
        </Badge>
      )}
      <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-tight md:text-6xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{subtitle}</p>
      )}
    </div>
  </section>
);
