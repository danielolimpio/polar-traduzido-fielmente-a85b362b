import { MessageCircle } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/5512982519116?text=" +
  encodeURIComponent("Quero saber mais sobre a Polar Tensor");

export const WhatsAppFloat = () => (
  <a
    href={WHATSAPP_URL}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Fale conosco no WhatsApp sobre a Polar Tensor"
    title="Quero saber mais sobre a Polar Tensor"
    className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40 ring-4 ring-[#25D366]/20 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40 md:bottom-6 md:right-6 md:h-16 md:w-16"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
      className="h-7 w-7 md:h-8 md:w-8"
    >
      <path d="M19.11 17.36c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.18.2-.35.23-.65.08-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.68-2.08-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.68-1.63-.93-2.23-.24-.58-.5-.5-.68-.51l-.58-.01c-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.5s1.07 2.9 1.22 3.1c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.48 1.7.62.71.23 1.36.2 1.87.12.57-.08 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.07-.13-.27-.2-.57-.35zM16.04 5.33c-5.9 0-10.7 4.8-10.7 10.7 0 1.88.5 3.72 1.43 5.34L5.33 26.67l5.46-1.43a10.66 10.66 0 0 0 5.25 1.34h.01c5.9 0 10.7-4.8 10.7-10.7s-4.8-10.55-10.71-10.55zm0 19.59h-.01a8.86 8.86 0 0 1-4.52-1.24l-.32-.19-3.24.85.86-3.16-.21-.33a8.84 8.84 0 0 1-1.36-4.72c0-4.9 3.99-8.88 8.9-8.88 2.37 0 4.61.93 6.29 2.6a8.83 8.83 0 0 1 2.6 6.29c0 4.9-3.99 8.78-8.99 8.78z" />
    </svg>
    <span className="sr-only">WhatsApp Polar Tensor</span>
  </a>
);
