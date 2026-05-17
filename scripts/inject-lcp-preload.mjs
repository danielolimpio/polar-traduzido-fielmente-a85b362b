// Injeta <link rel="preload" as="image" ...> nas páginas com LCP de imagem.
// Roda DEPOIS do vite build + prerender.
// Extrai os srcsets diretamente do bundle JS (string literais emitidas por
// vite-imagetools com `?as=picture`).

import { readdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "..", "dist");
const assetsDir = join(distDir, "assets");

// Por rota: imagem LCP, widths esperados e atributo sizes.
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

async function loadBundles() {
  if (!existsSync(assetsDir)) return "";
  const files = await readdir(assetsDir);
  const jsFiles = files.filter((f) => f.endsWith(".js"));
  const chunks = await Promise.all(
    jsFiles.map((f) => readFile(join(assetsDir, f), "utf8").catch(() => "")),
  );
  return chunks.join("\n");
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Procura no bundle um srcset que case com o basename, formato e EXATAMENTE
// os widths esperados (para distinguir variantes diferentes do mesmo arquivo).
function findSrcset(bundle, basename, widths, ext) {
  const baseEsc = escapeRegex(basename);
  const segment = `/assets/${baseEsc}-[A-Za-z0-9_-]+\\.${ext} (\\d+)w`;
  // Casa uma lista contígua de N segmentos separados por ", "
  const listRe = new RegExp(
    `(?:${segment})(?:, ${segment}){${widths.length - 1}}`,
    "g",
  );
  const matches = bundle.match(listRe) || [];
  for (const m of matches) {
    const ws = [...m.matchAll(/ (\d+)w/g)].map((x) => Number(x[1]));
    if (
      ws.length === widths.length &&
      ws.every((w, i) => w === widths[i])
    ) {
      return m;
    }
  }
  return null;
}

async function injectInto(htmlRelPath, srcsetAvif, srcsetWebp, sizes) {
  const fullPath = join(distDir, htmlRelPath);
  if (!existsSync(fullPath)) {
    console.warn(`[lcp-preload] pulando ${htmlRelPath} (não existe)`);
    return false;
  }
  let html = await readFile(fullPath, "utf8");
  if (html.includes('data-lcp-preload="1"')) return false;

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
  const bundle = await loadBundles();
  let total = 0;
  for (const t of TARGETS) {
    const srcsetAvif = findSrcset(bundle, t.basename, t.widths, "avif");
    const srcsetWebp = findSrcset(bundle, t.basename, t.widths, "webp");
    if (!srcsetAvif && !srcsetWebp) {
      console.warn(
        `[lcp-preload] srcset não encontrado para ${t.basename} (${t.widths.join("/")})`,
      );
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
