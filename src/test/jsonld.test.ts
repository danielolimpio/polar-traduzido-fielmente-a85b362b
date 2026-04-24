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

  it("deve existir exatamente um bloco FAQPage", () => {
    expect(faqBlocks.length).toBe(1);
  });

  const faq = faqBlocks[0];

  it("deve ter mainEntity com pelo menos 3 perguntas", () => {
    const mainEntity = (faq?.mainEntity ?? []) as unknown[];
    expect(Array.isArray(mainEntity)).toBe(true);
    expect(mainEntity.length).toBeGreaterThanOrEqual(3);
  });

  it("cada Question deve ter name (>= 8 chars) e acceptedAnswer.text (>= 40 chars)", () => {
    const mainEntity = (faq?.mainEntity ?? []) as Array<{
      "@type"?: string;
      name?: string;
      acceptedAnswer?: { "@type"?: string; text?: string };
    }>;
    for (const q of mainEntity) {
      expect(q["@type"]).toBe("Question");
      expect(q.name?.trim().length ?? 0).toBeGreaterThanOrEqual(8);

      expect(q.acceptedAnswer).toBeTruthy();
      expect(q.acceptedAnswer?.["@type"]).toBe("Answer");

      const answerText = q.acceptedAnswer?.text?.trim() ?? "";
      expect(
        answerText.length,
        `Resposta para "${q.name}" tem só ${answerText.length} chars (Google rejeita respostas curtas/vagas)`
      ).toBeGreaterThanOrEqual(40);

      // Bloqueia respostas promocionais/vagas que o Google costuma rejeitar
      const lower = answerText.toLowerCase();
      const vague = [
        "veja a seção",
        "veja em nosso site",
        "consulte o painel",
        "fale com o suporte",
        "entre em contato",
        "saiba mais em",
      ];
      for (const phrase of vague) {
        expect(
          lower.includes(phrase),
          `Resposta para "${q.name}" contém frase vaga "${phrase}" — Google pode marcar como item inválido`
        ).toBe(false);
      }
    }
  });
});
