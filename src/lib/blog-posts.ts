import type { LangCode } from "./routes";

/**
 * Estrutura de artigos do Blog Polar Tensor.
 *
 * Para adicionar um novo artigo:
 * 1) adicione uma entrada em POSTS com um `slug` único (kebab-case, sem acentos);
 * 2) preencha `title`, `excerpt` e `content` (HTML permitido) para cada idioma
 *    que quiser publicar — idiomas ausentes usam o fallback do array `fallbackLang`;
 * 3) opcionalmente defina `cover` (URL da imagem), `author`, `readingMinutes` e `tags`.
 */

export interface BlogPostTranslation {
  title: string;
  excerpt: string;
  /** HTML seguro renderizado dentro do artigo. Use <p>, <h2>, <ul>, <a>, <strong>. */
  content: string;
}

export interface BlogPost {
  slug: string;
  /** ISO date, ex: "2026-07-02" */
  date: string;
  author?: string;
  cover?: string;
  readingMinutes?: number;
  tags?: string[];
  translations: Partial<Record<LangCode, BlogPostTranslation>>;
}

/** Ordem de fallback quando o idioma atual não tem tradução. */
export const FALLBACK_LANGS: LangCode[] = ["pt", "en", "es"];

/** ADICIONE SEUS ARTIGOS AQUI. */
export const POSTS: BlogPost[] = [];

export const getPostsSorted = (): BlogPost[] =>
  [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));

export const getPostBySlug = (slug: string): BlogPost | undefined =>
  POSTS.find((p) => p.slug === slug);

export const getPostTranslation = (
  post: BlogPost,
  lang: LangCode,
): BlogPostTranslation | undefined => {
  if (post.translations[lang]) return post.translations[lang];
  for (const l of FALLBACK_LANGS) {
    if (post.translations[l]) return post.translations[l];
  }
  const first = Object.values(post.translations)[0];
  return first;
};
