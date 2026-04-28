// Notifica os motores de busca após o deploy que o sitemap foi atualizado
// e que novas URLs (ex: /baixar-app) precisam ser rastreadas.
//
// Estratégia (2026):
// 1) IndexNow (Bing, Yandex, Seznam — Google está experimentando)
//    -> envia URLs específicas para rastreamento imediato
// 2) Google: o endpoint ping foi descontinuado em jun/2023.
//    A submissão oficial é via Search Console. O sitemap.xml já está
//    declarado em robots.txt e no GSC, então o Google revisita
//    automaticamente. Imprimimos um lembrete para "Solicitar indexação"
//    no GSC para acelerar.
//
// Para IndexNow funcionar, hospedamos uma chave no domínio:
//   https://polartensor.trade/<INDEXNOW_KEY>.txt  (conteúdo = a própria chave)
// O arquivo é gerado em build (public/) — veja README abaixo.

const SITE = "https://polartensor.trade";
const SITEMAP = `${SITE}/sitemap.xml`;
const INDEXNOW_KEY = process.env.INDEXNOW_KEY; // definido como GitHub Secret

const URLS_TO_NOTIFY = [
  `${SITE}/`,
  `${SITE}/baixar-app`,
  `${SITE}/recompensas`,
  `${SITE}/faq`,
  `${SITE}/sobre`,
  `${SITE}/tecnologia`,
  `${SITE}/planos`,
  `${SITE}/consultoria`,
];

async function pingIndexNow() {
  if (!INDEXNOW_KEY) {
    console.log(
      "[notify] INDEXNOW_KEY não definida — pulando IndexNow.\n" +
        "         Defina como GitHub Secret para ativar notificação automática ao Bing/Yandex."
    );
    return;
  }

  const payload = {
    host: "polartensor.trade",
    key: INDEXNOW_KEY,
    keyLocation: `${SITE}/${INDEXNOW_KEY}.txt`,
    urlList: URLS_TO_NOTIFY,
  };

  try {
    const res = await fetch("https://api.indexnow.org/IndexNow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });
    console.log(
      `[notify] IndexNow respondeu HTTP ${res.status} (200/202 = sucesso)`
    );
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.log(`[notify] resposta: ${body}`);
    }
  } catch (err) {
    console.error("[notify] erro IndexNow:", err.message);
  }
}

async function pingBingSitemap() {
  // Bing ainda aceita ping de sitemap (Google não)
  const url = `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP)}`;
  try {
    const res = await fetch(url);
    console.log(`[notify] Bing ping sitemap: HTTP ${res.status}`);
  } catch (err) {
    console.error("[notify] erro Bing ping:", err.message);
  }
}

function googleReminder() {
  console.log(
    "\n[notify] Google: ping de sitemap foi descontinuado (jun/2023)." +
      "\n         O Googlebot revisita o sitemap.xml automaticamente (declarado em robots.txt)." +
      "\n         Para acelerar /baixar-app: Google Search Console -> Inspeção de URL" +
      "\n         -> https://polartensor.trade/baixar-app -> Solicitar indexação.\n"
  );
}

async function main() {
  console.log(`[notify] sitemap: ${SITEMAP}`);
  console.log(`[notify] URLs prioritárias: ${URLS_TO_NOTIFY.length}`);
  await pingIndexNow();
  await pingBingSitemap();
  googleReminder();
  console.log("[notify] concluído.");
}

main().catch((err) => {
  console.error("[notify] falha:", err);
  // Não falha o deploy se o ping der erro
  process.exit(0);
});
