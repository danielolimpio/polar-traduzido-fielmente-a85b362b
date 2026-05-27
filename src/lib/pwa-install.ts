// Native PWA install trigger.
// - Android/Chrome/Desktop: captures `beforeinstallprompt` and fires the native
//   install prompt on the first user gesture (click/touch/keydown).
// - iOS Safari: shows the browser's native Share sheet hint via a one-time
//   transient alert (no custom modal) — iOS does not expose a prompt API.
// Guards against Lovable preview iframes and already-installed PWAs.

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const STORAGE_KEY = "pwa-install-handled";

function isInIframe(): boolean {
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
}

function isPreviewHost(): boolean {
  const h = window.location.hostname;
  return h.includes("lovableproject.com") || h.includes("lovable.app") || h.includes("id-preview--");
}

function isStandalone(): boolean {
  return (
    window.matchMedia?.("(display-mode: standalone)").matches ||
    // iOS Safari
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

export function initPwaInstall(): void {
  if (typeof window === "undefined") return;
  if (isInIframe() || isPreviewHost()) return;
  if (isStandalone()) return;

  // 1. Register the minimal service worker — required by Chrome to fire
  //    beforeinstallprompt and to mark the app as installable.
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        /* ignore */
      });
    });
  }

  let deferredPrompt: BeforeInstallPromptEvent | null = null;

  window.addEventListener("beforeinstallprompt", (e) => {
    // Prevent Chrome's default mini-infobar so we can fire it on user gesture.
    e.preventDefault();
    deferredPrompt = e as BeforeInstallPromptEvent;
  });

  window.addEventListener("appinstalled", () => {
    deferredPrompt = null;
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  });

  const handleFirstGesture = async () => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") return cleanup();
    } catch {
      /* ignore */
    }

    // Android / Desktop Chrome / Edge — native install prompt.
    if (deferredPrompt) {
      cleanup();
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* ignore */
      }
      try {
        await deferredPrompt.prompt();
        await deferredPrompt.userChoice;
      } catch {
        /* ignore */
      }
      deferredPrompt = null;
      return;
    }

    // iOS Safari — no install API exists. Show the native browser instruction
    // (a plain alert) pointing to Share → Add to Home Screen. One-shot only.
    if (isIOS() && isSafari()) {
      cleanup();
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* ignore */
      }
      window.alert(
        "Para instalar a Polar Tensor: toque no ícone Compartilhar e escolha “Adicionar à Tela de Início”."
      );
    }
  };

  const opts: AddEventListenerOptions = { once: false, capture: true };
  const cleanup = () => {
    window.removeEventListener("pointerdown", handleFirstGesture, opts);
    window.removeEventListener("keydown", handleFirstGesture, opts);
  };

  window.addEventListener("pointerdown", handleFirstGesture, opts);
  window.addEventListener("keydown", handleFirstGesture, opts);
}
