// Gera o arquivo de validação IndexNow em dist/<KEY>.txt
// Necessário para que Bing/Yandex confirmem que somos donos do domínio.
import { writeFile } from "node:fs/promises";
import { existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "..", "dist");
const KEY = process.env.INDEXNOW_KEY;

if (!KEY) {
  console.log("[indexnow-key] INDEXNOW_KEY não definida — pulando geração da chave.");
  process.exit(0);
}

if (!/^[a-zA-Z0-9-]{8,128}$/.test(KEY)) {
  console.error("[indexnow-key] INDEXNOW_KEY inválida (use 8-128 chars alfanuméricos ou hífen).");
  process.exit(1);
}

if (!existsSync(distDir)) mkdirSync(distDir, { recursive: true });

const filePath = join(distDir, `${KEY}.txt`);
await writeFile(filePath, KEY, "utf8");
console.log(`[indexnow-key] gerado ${KEY}.txt em dist/`);
