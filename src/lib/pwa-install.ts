// Native PWA install trigger — uses ONLY the browser's built-in interfaces.
// - Android/Desktop Chrome/Edge: fires the native `beforeinstallprompt`
//   prompt on the first user gesture (click/touch/keydown) anywhere on the
//   page. The event is captured early in index.html so it is never missed.
// - iOS Safari: shows the browser's native instruction (a plain alert) for
//   Share → Add to Home Screen, since iOS exposes no install API.
// - Address-bar install icon: appears automatically once the manifest +
//   service worker + HTTPS criteria are met (no extra code required).
//
// No custom modals or dialogs. Respects the browser's user-gesture rule.
// Guards against Lovable preview iframes and already-installed PWAs.

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

declare global {
  interface Window {
    __pwaDeferredPrompt?: BeforeInstallPromptEvent | null;
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

export function initPwaInstall(): void {
  if (typeof window === "undefined") return;
  if (isInIframe() || isPreviewHost()) return;
  if (isStandalone()) return;

  // Register the minimal service worker — required by Chromium browsers to
  // fire `beforeinstallprompt` and to show the address-bar install icon.
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        /* ignore */
      });
    });
  }

  // Late listener as a backup in case the early inline capture in index.html
  // missed the event (it shouldn't, but defense-in-depth).
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    window.__pwaDeferredPrompt = e as BeforeInstallPromptEvent;
  });

  window.addEventListener("appinstalled", () => {
    window.__pwaDeferredPrompt = null;
  });

  let iosShown = false;

  const handleGesture = async () => {
    // Android / Desktop Chromium — native install prompt.
    const deferred = window.__pwaDeferredPrompt;
    if (deferred) {
      window.__pwaDeferredPrompt = null;
      cleanup();
      try {
        await deferred.prompt();
        await deferred.userChoice;
      } catch {
        /* user dismissed or browser blocked — fine */
      }
      return;
    }

    // iOS Safari — no install API; surface the browser's native instruction
    // exactly once per page load via a plain alert (no custom dialog).
    if (!iosShown && isIOS() && isSafari()) {
      iosShown = true;
      cleanup();
      window.alert(
        "Para instalar a Polar Tensor: toque no ícone Compartilhar e escolha “Adicionar à Tela de Início”."
      );
    }
  };

  const opts: AddEventListenerOptions = { capture: true };
  const cleanup = () => {
    window.removeEventListener("pointerdown", handleGesture, opts);
    window.removeEventListener("keydown", handleGesture, opts);
  };

  window.addEventListener("pointerdown", handleGesture, opts);
  window.addEventListener("keydown", handleGesture, opts);
}
