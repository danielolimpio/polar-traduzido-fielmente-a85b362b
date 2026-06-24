// Native PWA install trigger — uses ONLY the browser's built-in interfaces.
// - Android/Desktop Chrome/Edge: fires the native `beforeinstallprompt`
//   prompt as soon as it is available. If the user clicks before Chrome
//   fires the event (common on a brand-new browser without prior engagement),
//   we ARM the trigger and fire the prompt the moment the event arrives.
// - iOS Safari: shows the browser's native instruction (a plain alert) for
//   Share → Add to Home Screen, since iOS exposes no install API.
// - Address-bar install icon: appears automatically once the manifest +
//   service worker + HTTPS criteria are met (no extra code required).
//
// No custom modals or dialogs. Guards against Lovable preview iframes and
// already-installed PWAs.

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

declare global {
  interface Window {
    __pwaDeferredPrompt?: BeforeInstallPromptEvent | null;
    __pwaInstallArmed?: boolean;
  }
}

function isInIframe(): boolean {
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
}

function isPreviewHost(): boolean {
  const h = window.location.hostname;
  return (
    h.includes("lovableproject.com") ||
    h.includes("lovable.app") ||
    h.includes("id-preview--") ||
    h.includes("preview--")
  );
}

function isStandalone(): boolean {
  return (
    window.matchMedia?.("(display-mode: standalone)").matches ||
    (window.navigator as unknown as { standalone?: boolean }).standalone === true
  );
}

function isIOS(): boolean {
  const ua = window.navigator.userAgent;
  return /iPad|iPhone|iPod/.test(ua) && !(window as unknown as { MSStream?: unknown }).MSStream;
}

function isSafari(): boolean {
  const ua = window.navigator.userAgent;
  return /Safari/.test(ua) && !/CriOS|FxiOS|EdgiOS|OPiOS/.test(ua);
}

let iosAlertShownThisSession = false;

async function firePrompt(deferred: BeforeInstallPromptEvent): Promise<boolean> {
  try {
    window.__pwaDeferredPrompt = null;
    await deferred.prompt();
    await deferred.userChoice;
    return true;
  } catch {
    return false;
  }
}

/**
 * Attempt to fire the native PWA install prompt (Chromium/Android/desktop)
 * or show the native iOS Safari install instruction. If the deferred prompt
 * has not arrived yet, ARM it so the prompt fires automatically when it does.
 */
export async function triggerPwaInstall(): Promise<boolean> {
  if (typeof window === "undefined") return false;
  if (isInIframe() || isPreviewHost()) return false;
  if (isStandalone()) return false;

  const deferred = window.__pwaDeferredPrompt;
  if (deferred) {
    return firePrompt(deferred);
  }

  // iOS Safari — no install API; surface the browser's native instruction.
  if (isIOS() && isSafari()) {
    if (!iosAlertShownThisSession) {
      iosAlertShownThisSession = true;
      window.alert(
        "Para instalar a Polar Tensor: toque no ícone Compartilhar e escolha “Adicionar à Tela de Início”."
      );
    }
    return true;
  }

  // Chromium hasn't fired beforeinstallprompt yet (no engagement). ARM the
  // trigger so the prompt fires the moment Chrome fires the event.
  if (!window.__pwaInstallArmed) {
    window.__pwaInstallArmed = true;
    const onPrompt = (e: Event) => {
      e.preventDefault();
      const evt = e as BeforeInstallPromptEvent;
      window.__pwaDeferredPrompt = evt;
      window.removeEventListener("beforeinstallprompt", onPrompt as EventListener);
      // Fire immediately — user gesture was recent enough on most browsers.
      firePrompt(evt).catch(() => {
        /* keep armed flag so a later click can retry */
        window.__pwaInstallArmed = false;
      });
    };
    window.addEventListener("beforeinstallprompt", onPrompt as EventListener);
  }

  return false;
}

export function initPwaInstall(): void {
  if (typeof window === "undefined") return;
  if (isInIframe() || isPreviewHost()) return;
  if (isStandalone()) return;

  // Register the minimal service worker — required by Chromium browsers to
  // fire `beforeinstallprompt` and to show the address-bar install icon.
  if ("serviceWorker" in navigator) {
    const register = () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        /* ignore */
      });
    };
    if (document.readyState === "complete") register();
    else window.addEventListener("load", register, { once: true });
  }

  // Backup listener in case the early inline capture in index.html missed it.
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    window.__pwaDeferredPrompt = e as BeforeInstallPromptEvent;
  });

  window.addEventListener("appinstalled", () => {
    window.__pwaDeferredPrompt = null;
    window.__pwaInstallArmed = false;
  });
}
