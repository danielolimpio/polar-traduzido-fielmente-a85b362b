// Injeta <link rel="preload" as="image" imagesrcset=... imagesizes=...
// type="image/avif" fetchpriority="high"> nas páginas com LCP de imagem.
// Roda DEPOIS do vite build + prerender. Lê dist/assets/ para descobrir os
// arquivos com hash gerados pelo vite-imagetools e monta o srcset correto.

import { readdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "..", "dist");
const assetsDir = join(distDir, "assets");

// Para cada rota, qual imagem é o LCP, quais larguras esperar e qual sizes usar.
const TARGETS = [
  {
    htmlPaths: ["index.html", "en/index.html", "es/index.html"],
    basename: "hero-app",
    widths: [280, 320, 560, 640],
    sizes: "(min-width: 768px) 320px, 280px",
  },
  {
    htmlPaths: [
      "baixar-app/index.html",
      "en/download-app/index.html",
      "es/descargar-app/index.html",
    ],
    basename: "hero-app",
    widths: [260, 520],
    sizes: "260px",
  },
];

async function findAssetFiles() {
  if (!existsSync(assetsDir)) return [];
  return readdir(assetsDir);
}

function matchVariant(files, basename, width, ext) {
  // vite-imagetools emite algo como: hero-app-280.<hash>.avif
  const re = new RegExp(`^${basename}-${width}\\.[a-z0-9]+\\.${ext}$`, "i");
  return files.find((f) => re.test(f));
}

function buildSrcset(files, basename, widths, ext) {
  const parts = [];
  for (const w of widths) {
    const f = matchVariant(files, basename, w, ext);
    if (f) parts.push(`/assets/${f} ${w}w`);
  }
  return parts.join(", ");
}

async function injectInto(htmlRelPath, srcsetAvif, srcsetWebp, sizes) {
  const fullPath = join(distDir, htmlRelPath);
  if (!existsSync(fullPath)) {
    console.warn(`[lcp-preload] pulando ${htmlRelPath} (não existe)`);
    return false;
  }
  let html = await readFile(fullPath, "utf8");

  // Evita duplicação se rodar de novo.
  if (html.includes('data-lcp-preload="1"')) {
    return false;
  }

  const tags = [];
  if (srcsetAvif) {
    tags.push(
      `<link rel="preload" as="image" type="image/avif" imagesrcset="${srcsetAvif}" imagesizes="${sizes}" fetchpriority="high" data-lcp-preload="1" />`,
    );
  }
  if (srcsetWebp) {
    tags.push(
      `<link rel="preload" as="image" type="image/webp" imagesrcset="${srcsetWebp}" imagesizes="${sizes}" fetchpriority="high" data-lcp-preload="1" />`,
    );
  }
  if (!tags.length) return false;

  html = html.replace("</head>", `    ${tags.join("\n    ")}\n  </head>`);
  await writeFile(fullPath, html, "utf8");
  console.log(`[lcp-preload] injetado em ${htmlRelPath}`);
  return true;
}

async function main() {
  if (!existsSync(distDir)) {
    console.error("[lcp-preload] dist/ não existe — rode o build antes.");
    process.exit(1);
  }
  const files = await findAssetFiles();
  let total = 0;
  for (const t of TARGETS) {
    const srcsetAvif = buildSrcset(files, t.basename, t.widths, "avif");
    const srcsetWebp = buildSrcset(files, t.basename, t.widths, "webp");
    if (!srcsetAvif && !srcsetWebp) {
      console.warn(`[lcp-preload] nenhum asset encontrado para ${t.basename}`);
      continue;
    }
    for (const p of t.htmlPaths) {
      if (await injectInto(p, srcsetAvif, srcsetWebp, t.sizes)) total++;
    }
  }
  console.log(`[lcp-preload] concluído: ${total} arquivo(s) atualizado(s).`);
}

main().catch((err) => {
  console.error("[lcp-preload] erro:", err);
  process.exit(1);
});
