import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
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
  badge,
  titleStart,
  titleHighlight,
  titleEnd = "",
  description,
  videoSrc = "/videos/polar-tensor-intro.mp4",
  showCta = true,
}: VideoShowcaseProps) => {
  const { t } = useTranslation();
  const _badge = badge ?? t("video.default.badge");
  const _titleStart = titleStart ?? t("video.default.titleStart");
  const _titleHighlight = titleHighlight ?? t("video.default.titleHighlight");
  const _description = description ?? t("video.default.description");

  return (
    <section className="relative overflow-hidden py-20 md:py-24">
      <div className="absolute inset-0 bg-gradient-hero opacity-60" />
      <div className="absolute left-1/2 top-1/2 -z-0 h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[140px]" />

      <div className="container relative">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
            <Sparkles className="mr-1.5 h-3 w-3" />
            {_badge}
          </Badge>
          <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">
            {_titleStart}<span className="text-gradient-primary">{_titleHighlight}</span>{titleEnd}
          </h2>
          <p className="mt-4 text-muted-foreground">{_description}</p>
        </div>

        <div className="relative mx-auto max-w-5xl">
          <div className="absolute -inset-6 rounded-[2rem] bg-gradient-primary opacity-30 blur-3xl" />
          <div className="absolute -inset-1 rounded-[1.5rem] bg-gradient-to-br from-primary via-primary/40 to-primary/80 opacity-80 blur-sm" />

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
                {t("video.default.fallback")}
              </video>
            </div>
          </div>

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
                {t("video.default.cta")}
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </a>
            </Button>
            <p className="text-xs text-muted-foreground">{t("video.default.ctaFoot")}</p>
          </div>
        )}
      </div>
    </section>
  );
};
