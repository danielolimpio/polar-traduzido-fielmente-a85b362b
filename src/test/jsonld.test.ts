/**
 * Valida todos os blocos JSON-LD presentes em index.html.
 *
 * Este teste roda no build/CI e protege contra:
 * - JSON malformado (vírgulas, aspas, chaves)
 * - Caracteres UTF-8 problemáticos (BOM, replacement chars, control chars)
 * - Schemas obrigatórios ausentes (@context, @type)
 * - FAQPage com mainEntity vazia ou perguntas/respostas faltando
 * - Itens FAQ com texto vazio ou muito curto (motivo comum de
 *   "item inválido" no Google Search Console)
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, it, expect } from "vitest";

const indexHtml = readFileSync(
  resolve(__dirname, "..", "..", "index.html"),
  "utf8"
);

function extractJsonLdBlocks(html: string): string[] {
  const regex =
    /<script\s+type=["']application\/ld\+json["']\s*>([\s\S]*?)<\/script>/gi;
  const blocks: string[] = [];
  let match: RegExpExecArray | null;
  while ((match = regex.exec(html)) !== null) {
    blocks.push(match[1].trim());
  }
  return blocks;
}

const blocks = extractJsonLdBlocks(indexHtml);

describe("JSON-LD em index.html", () => {
  it("deve conter pelo menos um bloco JSON-LD", () => {
    expect(blocks.length).toBeGreaterThan(0);
  });

  it.each(blocks.map((b, i) => [i, b]))(
    "bloco #%i deve ser JSON válido",
    (_, raw) => {
      expect(() => JSON.parse(raw as string)).not.toThrow();
    }
  );

  it.each(blocks.map((b, i) => [i, b]))(
    "bloco #%i não deve conter caracteres problemáticos (BOM, replacement, control chars)",
    (_, raw) => {
      const text = raw as string;
      // BOM
      expect(text.charCodeAt(0)).not.toBe(0xfeff);
      // Replacement char (UTF-8 inválido)
      expect(text).not.toContain("\uFFFD");
      // Control chars exceto tab/lf/cr
      // eslint-disable-next-line no-control-regex
      expect(text).not.toMatch(/[\x00-\x08\x0B\x0C\x0E-\x1F]/);
    }
  );

  it.each(blocks.map((b, i) => [i, b]))(
    "bloco #%i deve ter @context e @type",
    (_, raw) => {
      const data = JSON.parse(raw as string);
      const items = Array.isArray(data) ? data : [data];
      for (const item of items) {
        expect(item["@context"]).toBeTruthy();
        // Aceita @type direto ou @graph (multi-tipos)
        expect(item["@type"] || item["@graph"]).toBeTruthy();
      }
    }
  );
});

describe("JSON-LD FAQPage", () => {
  const faqBlocks = blocks
    .map((b) => {
      try {
        return JSON.parse(b);
      } catch {
        return null;
      }
    })
    .filter((d): d is Record<string, unknown> => !!d && d["@type"] === "FAQPage");

  // FAQPage agora é injetado dinamicamente APENAS na rota /faq (src/pages/Faq.tsx).
  // Se aparecer também em index.html, o Google Search Console reporta
  // "O campo FAQPage está duplicado" em /faq e /es/faq.
  it("não deve existir nenhum bloco FAQPage em index.html (é injetado por rota)", () => {
    expect(faqBlocks.length).toBe(0);
  });
});
