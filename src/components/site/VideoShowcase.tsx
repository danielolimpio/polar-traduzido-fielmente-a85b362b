import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Sparkles } from "lucide-react";
import { SIGNUP_URL } from "@/lib/constants";

interface VideoShowcaseProps {
  badge?: string;
  titleStart?: string;
  titleHighlight?: string;
  titleEnd?: string;
  description?: string;
  videoSrc?: string;
  showCta?: boolean;
}

export const VideoShowcase = ({
  badge = "Conheça a Polar Tensor",
  titleStart = "Plataforma ",
  titleHighlight = "100% automatizada",
  titleEnd = "",
  description = "Assista e descubra como nossa tecnologia de IA opera no mercado de criptomoedas em parceria com a Binance.",
  videoSrc = "/videos/polar-tensor-intro.mp4",
  showCta = true,
}: VideoShowcaseProps) => (
  <section className="relative overflow-hidden py-20 md:py-24">
    <div className="absolute inset-0 bg-gradient-hero opacity-60" />
    <div className="absolute left-1/2 top-1/2 -z-0 h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[140px]" />

    <div className="container relative">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
          <Sparkles className="mr-1.5 h-3 w-3" />
          {badge}
        </Badge>
        <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">
          {titleStart}<span className="text-gradient-primary">{titleHighlight}</span>{titleEnd}
        </h2>
        <p className="mt-4 text-muted-foreground">
          {description}
        </p>
      </div>

      <div className="relative mx-auto max-w-5xl">
        {/* Premium glow */}
        <div className="absolute -inset-6 rounded-[2rem] bg-gradient-primary opacity-30 blur-3xl" />
        <div className="absolute -inset-1 rounded-[1.5rem] bg-gradient-to-br from-primary via-primary/40 to-primary/80 opacity-80 blur-sm" />

        {/* Frame */}
        <div className="relative rounded-[1.4rem] border border-primary/30 bg-gradient-card p-2 shadow-glow md:p-3">
          <div className="overflow-hidden rounded-[1rem] border border-border/50 bg-background">
            <video
              src={videoSrc}
              controls
              playsInline
              preload="metadata"
              className="h-auto w-full"
              poster=""
            >
              Seu navegador não suporta vídeo HTML5.
            </video>
          </div>
        </div>

        {/* Corner accents */}
        <div className="pointer-events-none absolute -left-2 -top-2 h-6 w-6 rounded-tl-lg border-l-2 border-t-2 border-primary" />
        <div className="pointer-events-none absolute -right-2 -top-2 h-6 w-6 rounded-tr-lg border-r-2 border-t-2 border-primary" />
        <div className="pointer-events-none absolute -bottom-2 -left-2 h-6 w-6 rounded-bl-lg border-b-2 border-l-2 border-primary" />
        <div className="pointer-events-none absolute -bottom-2 -right-2 h-6 w-6 rounded-br-lg border-b-2 border-r-2 border-primary" />
      </div>

      {showCta && (
        <div className="mt-12 flex flex-col items-center gap-3">
          <Button asChild variant="hero" size="lg" className="group relative overflow-hidden px-8 py-6 text-base">
            <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer">
              <Play className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
              Cadastre-se e Comece Agora
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </a>
          </Button>
          <p className="text-xs text-muted-foreground">
            Acesso imediato • Sem custos para criar sua conta
          </p>
        </div>
      )}
    </div>
  </section>
);
