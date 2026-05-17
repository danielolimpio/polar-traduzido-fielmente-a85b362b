/// <reference types="vite/client" />
/// <reference types="vite-imagetools/client" />

declare module "*&as=picture" {
  const out: {
    sources: { avif?: string; webp?: string; jpeg?: string; png?: string };
    img: { src: string; w: number; h: number };
  };
  export default out;
}

declare module "*&as=src" {
  const out: string;
  export default out;
}
