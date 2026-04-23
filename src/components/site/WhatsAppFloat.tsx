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
      viewBox="0 0 32 32"
      aria-hidden="true"
      className="h-8 w-8 md:h-9 md:w-9"
    >
      <path
        fill="#ffffff"
        d="M16.003 3.2C8.94 3.2 3.2 8.94 3.2 16c0 2.255.59 4.456 1.71 6.398L3.1 28.8l6.56-1.722A12.78 12.78 0 0 0 16 28.8h.005c7.06 0 12.8-5.74 12.803-12.8 0-3.42-1.33-6.633-3.748-9.052A12.71 12.71 0 0 0 16.003 3.2Zm-.003 2.4c2.776 0 5.385 1.083 7.347 3.047A10.32 10.32 0 0 1 26.4 16c0 5.733-4.667 10.4-10.4 10.4h-.004a10.36 10.36 0 0 1-5.27-1.443l-.378-.225-3.892 1.022 1.04-3.793-.247-.392A10.34 10.34 0 0 1 5.6 16C5.6 10.267 10.267 5.6 16 5.6Zm-5.83 5.39c-.272 0-.715.103-1.09.51-.374.408-1.43 1.398-1.43 3.41s1.464 3.957 1.668 4.23c.204.272 2.835 4.534 7.018 6.182 3.476 1.37 4.184 1.097 4.94 1.028.756-.07 2.44-.997 2.785-1.96.343-.962.343-1.787.24-1.96-.103-.17-.375-.272-.785-.477-.41-.205-2.426-1.197-2.802-1.334-.376-.137-.65-.205-.923.205-.272.41-1.06 1.334-1.299 1.607-.24.272-.478.307-.888.103-.41-.205-1.732-.638-3.3-2.036-1.22-1.087-2.043-2.43-2.282-2.84-.24-.41-.026-.632.18-.836.184-.184.41-.477.615-.717.205-.24.273-.41.41-.683.137-.273.069-.512-.034-.717-.103-.205-.9-2.224-1.247-3.04-.328-.798-.66-.69-.9-.703a16.42 16.42 0 0 0-.776-.013Z"
      />
    </svg>
    <span className="sr-only">WhatsApp Polar Tensor</span>
  </a>
);
