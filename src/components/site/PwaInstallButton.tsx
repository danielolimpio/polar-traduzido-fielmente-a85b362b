import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { triggerPwaInstall } from "@/lib/pwa-install";
import { useLocalizedPath } from "@/lib/routes";
import { cn } from "@/lib/utils";

type ButtonVariant = "hero" | "outline" | "ghost";
type ButtonSize = "sm" | "lg" | "default";

interface PwaInstallButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  /** If the native install UI cannot be shown, redirect to this external URL. */
  fallbackHref?: string;
  /** If the native install UI cannot be shown and no fallbackHref is set, navigate to the localized /download-app route. */
  fallbackToRoute?: boolean;
  ariaLabel?: string;
}

export const PwaInstallButton = ({
  children,
  variant = "outline",
  size = "default",
  className,
  fallbackHref,
  fallbackToRoute = true,
  ariaLabel,
}: PwaInstallButtonProps) => {
  const navigate = useNavigate();
  const downloadAppPath = useLocalizedPath("downloadApp");

  const handleClick = useCallback(async () => {
    const triggered = await triggerPwaInstall();
    if (triggered) return;

    if (fallbackHref) {
      window.location.href = fallbackHref;
      return;
    }

    if (fallbackToRoute) {
      navigate(downloadAppPath);
    }
  }, [fallbackHref, fallbackToRoute, navigate, downloadAppPath]);

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={cn(className)}
      aria-label={ariaLabel}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
};
