import { useTranslation } from "react-i18next";
import { Check, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { SUPPORTED_LANGS } from "@/i18n";
import "flag-icons/css/flag-icons.min.css";

export const LanguageSwitcher = ({ className }: { className?: string }) => {
  const { i18n, t } = useTranslation();
  const current =
    SUPPORTED_LANGS.find((l) => l.code === i18n.resolvedLanguage) ??
    SUPPORTED_LANGS[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "inline-flex h-9 items-center gap-2 rounded-md border border-border/60 bg-background/60 px-2.5 text-xs font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
          className,
        )}
        aria-label={t("common.language")}
      >
        <span
          className={`fi fi-${current.flag} !h-3.5 !w-5 rounded-[2px] shadow-sm`}
          aria-hidden
        />
        <span className="hidden sm:inline">{current.label}</span>
        <Globe className="h-3.5 w-3.5 text-muted-foreground sm:hidden" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[180px]">
        {SUPPORTED_LANGS.map((lng) => {
          const active = lng.code === current.code;
          return (
            <DropdownMenuItem
              key={lng.code}
              onClick={() => i18n.changeLanguage(lng.code)}
              className={cn(
                "flex cursor-pointer items-center gap-3 text-sm",
                active && "bg-primary/10 text-primary",
              )}
            >
              <span
                className={`fi fi-${lng.flag} !h-3.5 !w-5 rounded-[2px] shadow-sm`}
                aria-hidden
              />
              <span className="flex-1">{lng.label}</span>
              {active && <Check className="h-3.5 w-3.5" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
