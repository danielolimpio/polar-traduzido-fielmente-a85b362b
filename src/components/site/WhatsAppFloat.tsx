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
    className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/40 ring-4 ring-[#25D366]/20 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40 md:bottom-6 md:right-6 md:h-16 md:w-16"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="block h-7 w-7 md:h-8 md:w-8"
    >
      <path
        fill="#fff"
        d="M12.04 2C6.5 2 2 6.49 2 12.02c0 1.77.46 3.5 1.33 5.02L2 22l5.12-1.34a10 10 0 0 0 4.91 1.26h.01C17.57 21.92 22 17.43 22 12S17.57 2 12.04 2Zm0 18.14h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.13.82.84-3.05-.2-.31a8.18 8.18 0 0 1-1.28-4.41c0-4.52 3.69-8.2 8.22-8.2 2.2 0 4.25.85 5.8 2.4a8.13 8.13 0 0 1 2.4 5.8c0 4.53-3.67 8.28-8.16 8.28Zm4.5-6.14c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.37-1.94-1.23-.72-.64-1.2-1.44-1.34-1.68-.14-.24-.02-.37.1-.49.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.79-.2-.47-.4-.42-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2.01s.87 2.32.98 2.48c.12.16 1.71 2.61 4.15 3.67.58.25 1.03.4 1.38.5.58.19 1.11.16 1.52.1.46-.07 1.43-.58 1.62-1.16.2-.57.2-1.06.14-1.16-.05-.1-.22-.16-.46-.28Z"
      />
    </svg>
    <span className="sr-only">WhatsApp Polar Tensor</span>
  </a>
);
