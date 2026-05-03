// Prerender SEO shells: gera index.html dedicado por rota e por idioma.
// PT (default) sem prefixo, EN em /en/* e ES em /es/*.

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "..", "dist");
const SITE = "https://polartensor.trade";

const LANGS = ["pt", "en", "es"];

const SLUGS = {
  home:        { pt: "",                en: "",                es: "" },
  about:       { pt: "sobre",           en: "about",           es: "sobre" },
  technology:  { pt: "tecnologia",      en: "technology",      es: "tecnologia" },
  consultancy: { pt: "consultoria",     en: "consultancy",     es: "consultoria" },
  plans:       { pt: "planos",          en: "plans",           es: "planes" },
  rewards:     { pt: "recompensas",     en: "rewards",         es: "recompensas" },
  privacy:     { pt: "privacidade",     en: "privacy",         es: "privacidad" },
  terms:       { pt: "termos",          en: "terms",           es: "terminos" },
  risk:        { pt: "aviso-de-risco",  en: "risk-disclosure", es: "aviso-de-riesgo" },
  faq:         { pt: "faq",             en: "faq",             es: "faq" },
  downloadApp: { pt: "baixar-app",      en: "download-app",    es: "descargar-app" },
};

const langPrefix = (l) => (l === "pt" ? "" : `/${l}`);
const buildPath = (key, lang) => {
  const slug = SLUGS[key][lang];
  const prefix = langPrefix(lang);
  if (!slug) return prefix || "/";
  return `${prefix}/${slug}`;
};
const buildUrl = (key, lang) => `${SITE}${buildPath(key, lang)}`;

// SEO content per route per language
const CONTENT = {
  home: {
    pt: { title: "Polar Tensor | Trading Algorítmico com IA em Criptomoedas", description: "Polar Tensor: plataforma de trading algorítmico com redes neurais proprietárias para criptomoedas. Operação 24/5 na Binance, transparência total e suporte em português.", h1: "Polar Tensor — Trading com IA em Criptomoedas", body: "A Polar Tensor é uma empresa de tecnologia financeira que desenvolve algoritmos proprietários de trading com redes neurais para o mercado de criptomoedas, com operação automatizada 24/5 na Binance." },
    en: { title: "Polar Tensor | AI Algorithmic Crypto Trading", description: "Polar Tensor: algorithmic trading platform with proprietary neural networks for cryptocurrencies. 24/5 operation on Binance, full transparency and multilingual support.", h1: "Polar Tensor — AI Crypto Trading", body: "Polar Tensor is a fintech company developing proprietary neural-network trading algorithms for the cryptocurrency market, running 24/5 on Binance." },
    es: { title: "Polar Tensor | Trading Algorítmico de Criptomonedas con IA", description: "Polar Tensor: plataforma de trading algorítmico con redes neuronales propias para criptomonedas. Operación 24/5 en Binance, transparencia total y soporte multilingüe.", h1: "Polar Tensor — Trading de Criptomonedas con IA", body: "Polar Tensor es una empresa fintech que desarrolla algoritmos propios de trading con redes neuronales para el mercado de criptomonedas, operando 24/5 en Binance." },
  },
  about: {
    pt: { title: "Sobre a Polar Tensor | Empresa de Trading com IA em Criptomoedas", description: "Conheça a Polar Tensor: empresa de tecnologia financeira fundada em 2018, especializada em algoritmos de trading com redes neurais para o mercado de criptomoedas.", h1: "Sobre a Polar Tensor", body: "A Polar Tensor é uma empresa de tecnologia financeira fundada em 2018 que desenvolve algoritmos proprietários de trading com redes neurais para o mercado de criptomoedas." },
    en: { title: "About Polar Tensor | AI Crypto Trading Company", description: "Meet Polar Tensor: a fintech company founded in 2018, specialized in neural-network trading algorithms for the cryptocurrency market.", h1: "About Polar Tensor", body: "Polar Tensor is a fintech company founded in 2018 that develops proprietary neural-network trading algorithms for the cryptocurrency market." },
    es: { title: "Sobre Polar Tensor | Empresa de Trading con IA en Criptomonedas", description: "Conoce Polar Tensor: empresa fintech fundada en 2018, especializada en algoritmos de trading con redes neuronales para el mercado de criptomonedas.", h1: "Sobre Polar Tensor", body: "Polar Tensor es una empresa fintech fundada en 2018 que desarrolla algoritmos propios de trading con redes neuronales para el mercado de criptomonedas." },
  },
  technology: {
    pt: { title: "Tecnologia Polar One | Trading Algorítmico com Redes Neurais", description: "Polar One: sistema automatizado de trading com redes neurais de tendência e direção, latência inferior a 50ms e operação 24/5 na Binance.", h1: "Tecnologia Polar One", body: "O Polar One combina redes neurais de tendência e direção para executar operações de alta frequência em criptomoedas com latência inferior a 50 milissegundos." },
    en: { title: "Polar One Technology | Neural-Network Algorithmic Trading", description: "Polar One: automated trading system with trend and direction neural networks, sub-50ms latency and 24/5 operation on Binance.", h1: "Polar One Technology", body: "Polar One combines trend and direction neural networks to execute high-frequency crypto trades with sub-50ms latency." },
    es: { title: "Tecnología Polar One | Trading Algorítmico con Redes Neuronales", description: "Polar One: sistema automatizado de trading con redes neuronales de tendencia y dirección, latencia inferior a 50ms y operación 24/5 en Binance.", h1: "Tecnología Polar One", body: "Polar One combina redes neuronales de tendencia y dirección para ejecutar operaciones de alta frecuencia en criptomonedas con latencia inferior a 50ms." },
  },
  consultancy: {
    pt: { title: "Consultoria Polar Tensor | Atendimento Personalizado para Investidores", description: "Consultoria especializada Polar Tensor para investidores que buscam orientação personalizada em trading algorítmico de criptomoedas.", h1: "Consultoria Polar Tensor", body: "O serviço de consultoria da Polar Tensor oferece atendimento personalizado para investidores que desejam compreender melhor o sistema Polar One." },
    en: { title: "Polar Tensor Consultancy | Personalized Investor Support", description: "Specialized Polar Tensor consultancy for investors seeking personalized guidance on algorithmic crypto trading.", h1: "Polar Tensor Consultancy", body: "Polar Tensor consultancy offers personalized support for investors who want to better understand the Polar One system." },
    es: { title: "Consultoría Polar Tensor | Atención Personalizada al Inversor", description: "Consultoría especializada Polar Tensor para inversores que buscan orientación personalizada en trading algorítmico de criptomonedas.", h1: "Consultoría Polar Tensor", body: "El servicio de consultoría de Polar Tensor ofrece atención personalizada a los inversores que desean comprender mejor el sistema Polar One." },
  },
  plans: {
    pt: { title: "Planos e Taxas | Polar Tensor — Trading Automatizado", description: "Conheça os planos da Polar Tensor: investimento mínimo de $100 USDT, taxa única de licença de 10% e taxa de performance de 20% a 30% apenas sobre lucros.", h1: "Planos e Taxas Polar Tensor", body: "Polar Tensor opera com modelo transparente: mínimo $100 USDT, licença única de 10% sobre o depósito e performance de 20% a 30% apenas sobre lucros gerados." },
    en: { title: "Plans and Fees | Polar Tensor — Automated Trading", description: "Polar Tensor plans: minimum investment of $100 USDT, one-time 10% license fee and 20%–30% performance fee on profits only.", h1: "Polar Tensor Plans and Fees", body: "Polar Tensor uses a transparent model: $100 USDT minimum, one-time 10% license fee on deposit and 20%–30% performance fee on generated profits only." },
    es: { title: "Planes y Tarifas | Polar Tensor — Trading Automatizado", description: "Planes Polar Tensor: inversión mínima de $100 USDT, tarifa única de licencia del 10% y tarifa de rendimiento del 20% al 30% solo sobre ganancias.", h1: "Planes y Tarifas Polar Tensor", body: "Polar Tensor opera con un modelo transparente: mínimo $100 USDT, licencia única del 10% sobre el depósito y rendimiento del 20% al 30% solo sobre ganancias." },
  },
  rewards: {
    pt: { title: "Plano de Recompensas Polar Tensor | Indicação, Residuais e Ranking", description: "Plano de recompensas Polar Tensor: ganhos por indicação em até 15 níveis, residuais em 10 níveis, bônus de ranking até $500.000 e Recompensa Infinita.", h1: "Plano de Recompensas Polar Tensor", body: "Indicação em até 15 níveis, residuais em 10 níveis, bônus de ranking de $50 (Bronze) até $500.000 (Diamante) e Recompensa Infinita global por graduação." },
    en: { title: "Polar Tensor Rewards Plan | Referrals, Residuals and Ranks", description: "Polar Tensor rewards plan: referral earnings up to 15 levels, residuals on 10 levels, rank bonuses up to $500,000 and the Infinite Reward.", h1: "Polar Tensor Rewards Plan", body: "Referral earnings up to 15 levels, residuals on 10 levels, rank bonuses from $50 (Bronze) to $500,000 (Diamond) and the global Infinite Reward by graduation." },
    es: { title: "Plan de Recompensas Polar Tensor | Referidos, Residuales y Rangos", description: "Plan de recompensas Polar Tensor: ganancias por referidos hasta 15 niveles, residuales en 10 niveles, bonos de rango hasta $500.000 y Recompensa Infinita.", h1: "Plan de Recompensas Polar Tensor", body: "Referidos hasta 15 niveles, residuales en 10 niveles, bonos de rango desde $50 (Bronce) hasta $500.000 (Diamante) y la Recompensa Infinita global por graduación." },
  },
  faq: {
    pt: { title: "Perguntas Frequentes | Polar Tensor — Tire suas Dúvidas", description: "Perguntas frequentes sobre a Polar Tensor: como funciona o Polar One, taxas, valores mínimos, riscos, registro da empresa e processo de cadastro.", h1: "Perguntas Frequentes", body: "Respostas para as principais dúvidas sobre a Polar Tensor: o sistema Polar One, riscos, taxas, registros (Panamá, EUA e Hong Kong) e cadastro." },
    en: { title: "Frequently Asked Questions | Polar Tensor — Get Answers", description: "FAQ about Polar Tensor: how Polar One works, fees, minimum amounts, risks, company registration and signup process.", h1: "Frequently Asked Questions", body: "Answers to the main questions about Polar Tensor: the Polar One system, risks, fees, registrations (Panama, USA and Hong Kong) and signup." },
    es: { title: "Preguntas Frecuentes | Polar Tensor — Resuelve tus Dudas", description: "Preguntas frecuentes sobre Polar Tensor: cómo funciona Polar One, tarifas, importes mínimos, riesgos, registro de la empresa y proceso de registro.", h1: "Preguntas Frecuentes", body: "Respuestas a las principales dudas sobre Polar Tensor: el sistema Polar One, riesgos, tarifas, registros (Panamá, EE. UU. y Hong Kong) y registro." },
  },
  downloadApp: {
    pt: { title: "Baixar App Polar Tensor | Aplicativo Oficial de Trading com IA", description: "Baixar App Polar Tensor: aplicativo oficial para iOS e Android. Acompanhe portfólio em USDT, lucros do Polar One, depósitos, saques e bonificações.", h1: "Baixar App Polar Tensor", body: "Baixe o aplicativo oficial Polar Tensor para iOS e Android e acompanhe seu trading automatizado com inteligência artificial direto do celular." },
    en: { title: "Download Polar Tensor App | Official AI Trading App", description: "Download Polar Tensor App: official app for iOS and Android. Track your USDT portfolio, Polar One profits, deposits, withdrawals and network bonuses.", h1: "Download Polar Tensor App", body: "Download the official Polar Tensor app for iOS and Android to follow your automated AI trading directly from your phone." },
    es: { title: "Descargar App Polar Tensor | Aplicación Oficial de Trading con IA", description: "Descargar App Polar Tensor: aplicación oficial para iOS y Android. Sigue tu cartera en USDT, ganancias de Polar One, depósitos, retiros y bonos.", h1: "Descargar App Polar Tensor", body: "Descarga la app oficial Polar Tensor para iOS y Android y sigue tu trading automatizado con inteligencia artificial desde tu móvil." },
  },
  risk: {
    pt: { title: "Aviso de Risco | Polar Tensor — Riscos do Trading em Criptomoedas", description: "Aviso de risco da Polar Tensor: trading em criptomoedas envolve volatilidade e riscos de mercado, regulatórios, de liquidez e tecnológicos.", h1: "Aviso de Risco", body: "Operações com criptomoedas envolvem alta volatilidade e riscos significativos. Resultados passados não garantem resultados futuros." },
    en: { title: "Risk Disclosure | Polar Tensor — Crypto Trading Risks", description: "Polar Tensor risk disclosure: cryptocurrency trading involves volatility and market, regulatory, liquidity and technological risks.", h1: "Risk Disclosure", body: "Crypto operations involve high volatility and significant risks. Past results do not guarantee future results." },
    es: { title: "Aviso de Riesgo | Polar Tensor — Riesgos del Trading en Cripto", description: "Aviso de riesgo de Polar Tensor: el trading de criptomonedas implica volatilidad y riesgos de mercado, regulatorios, de liquidez y tecnológicos.", h1: "Aviso de Riesgo", body: "Las operaciones con criptomonedas implican alta volatilidad y riesgos significativos. Resultados pasados no garantizan resultados futuros." },
  },
  privacy: {
    pt: { title: "Política de Privacidade | Polar Tensor", description: "Política de Privacidade da Polar Tensor: como coletamos, usamos e protegemos seus dados pessoais em conformidade com a LGPD e GDPR.", h1: "Política de Privacidade", body: "A Polar Tensor processa dados pessoais em conformidade com a LGPD e GDPR, coletando apenas o necessário para o serviço e obrigações regulatórias." },
    en: { title: "Privacy Policy | Polar Tensor", description: "Polar Tensor Privacy Policy: how we collect, use and protect your personal data in compliance with LGPD and GDPR.", h1: "Privacy Policy", body: "Polar Tensor processes personal data in compliance with LGPD and GDPR, collecting only what's needed for the service and regulatory obligations." },
    es: { title: "Política de Privacidad | Polar Tensor", description: "Política de Privacidad de Polar Tensor: cómo recopilamos, usamos y protegemos tus datos personales conforme a LGPD y GDPR.", h1: "Política de Privacidad", body: "Polar Tensor procesa datos personales conforme a LGPD y GDPR, recopilando solo lo necesario para el servicio y obligaciones regulatorias." },
  },
  terms: {
    pt: { title: "Termos de Uso | Polar Tensor", description: "Termos de Uso da Polar Tensor: condições gerais para utilização da plataforma de trading algorítmico e do sistema Polar One.", h1: "Termos de Uso", body: "Estes Termos de Uso regem o acesso e a utilização dos serviços oferecidos pela Polar Tensor, incluindo a plataforma Polar One." },
    en: { title: "Terms of Use | Polar Tensor", description: "Polar Tensor Terms of Use: general conditions for using the algorithmic trading platform and the Polar One system.", h1: "Terms of Use", body: "These Terms of Use govern access to and use of the services offered by Polar Tensor, including the Polar One platform." },
    es: { title: "Términos de Uso | Polar Tensor", description: "Términos de Uso de Polar Tensor: condiciones generales para el uso de la plataforma de trading algorítmico y del sistema Polar One.", h1: "Términos de Uso", body: "Estos Términos de Uso rigen el acceso y uso de los servicios ofrecidos por Polar Tensor, incluyendo la plataforma Polar One." },
  },
};

const NAV_LABELS = {
  pt: { home: "Home", about: "Sobre", technology: "Tecnologia", plans: "Planos", rewards: "Recompensas", downloadApp: "Baixar App", consultancy: "Consultoria", faq: "FAQ", risk: "Aviso de Risco", privacy: "Privacidade", terms: "Termos" },
  en: { home: "Home", about: "About", technology: "Technology", plans: "Plans", rewards: "Rewards", downloadApp: "Download App", consultancy: "Consultancy", faq: "FAQ", risk: "Risk Disclosure", privacy: "Privacy", terms: "Terms" },
  es: { home: "Inicio", about: "Sobre", technology: "Tecnología", plans: "Planes", rewards: "Recompensas", downloadApp: "Descargar App", consultancy: "Consultoría", faq: "FAQ", risk: "Aviso de Riesgo", privacy: "Privacidad", terms: "Términos" },
};

const HTML_LANG = { pt: "pt-BR", en: "en", es: "es" };
const OG_LOCALE = { pt: "pt_BR", en: "en_US", es: "es_ES" };

function buildHtml(template, key, lang) {
  const c = CONTENT[key][lang];
  const url = buildUrl(key, lang);
  let html = template;

  html = html.replace(/<html\s+lang="[^"]*"/, `<html lang="${HTML_LANG[lang]}"`);
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${c.title}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${c.description}" />`);
  html = html.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${url}" />`);
  html = html.replace(/<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${url}" />`);
  html = html.replace(/<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${c.title}" />`);
  html = html.replace(/<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${c.description}" />`);
  html = html.replace(/<meta property="og:locale" content="[^"]*"\s*\/?>/, `<meta property="og:locale" content="${OG_LOCALE[lang]}" />`);

  // Build hreflang alternates and inject before </head>
  const alts = LANGS.map((l) => {
    const hl = l === "pt" ? "pt-BR" : l;
    return `    <link rel="alternate" hreflang="${hl}" href="${buildUrl(key, l)}" />`;
  }).join("\n");
  const xDefault = `    <link rel="alternate" hreflang="x-default" href="${buildUrl(key, "pt")}" />`;
  // remove existing alternates
  html = html.replace(/\s*<link rel="alternate" hreflang="[^"]*" href="[^"]*"\s*\/?>(?=\s|$)/g, "");
  html = html.replace("</head>", `${alts}\n${xDefault}\n  </head>`);

  const labels = NAV_LABELS[lang];
  const navItems = ["home","about","technology","plans","rewards","downloadApp","consultancy","faq","risk","privacy","terms"]
    .map((k) => `<li><a href="${buildPath(k, lang)}">${labels[k]}</a></li>`).join("");

  const noscript = `<noscript>
        <h1>${c.h1}</h1>
        <p>${c.body.replace(/\s+/g, " ").trim()}</p>
        <nav><ul>${navItems}</ul></nav>
      </noscript>`;
  html = html.replace(/<noscript>[\s\S]*?<\/noscript>/, noscript);

  return html;
}

async function main() {
  if (!existsSync(distDir)) {
    console.error(`[prerender] dist/ não encontrado em ${distDir}. Rode "npm run build" antes.`);
    process.exit(1);
  }

  const indexPath = join(distDir, "index.html");
  const template = await readFile(indexPath, "utf8");

  let count = 0;
  for (const lang of LANGS) {
    for (const key of Object.keys(SLUGS)) {
      const path = buildPath(key, lang);
      // Home PT já é o index raiz — sobrescrever para garantir hreflang corretos
      const isRoot = path === "/";
      const outDir = isRoot ? distDir : join(distDir, path.replace(/^\//, ""));
      await mkdir(outDir, { recursive: true });
      const outFile = join(outDir, "index.html");
      const html = buildHtml(template, key, lang);
      await writeFile(outFile, html, "utf8");
      console.log(`[prerender] gerado ${path === "/" ? "/index.html" : `${path}/index.html`}`);
      count++;
    }
  }

  console.log(`[prerender] concluído: ${count} páginas pré-renderizadas (PT + EN + ES).`);
}

main().catch((err) => {
  console.error("[prerender] erro:", err);
  process.exit(1);
});
