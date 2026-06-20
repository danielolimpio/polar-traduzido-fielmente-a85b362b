// Prerender SEO shells: gera index.html dedicado por rota e por idioma.
// PT (default) sem prefixo, EN em /en/* e ES em /es/*.

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "..", "dist");
const SITE = "https://polartensor.trade";

const LANGS = ["pt", "en", "es", "vi", "fr", "de", "it"];
const HREFLANG = { pt: "pt-BR", en: "en", es: "es", vi: "vi", fr: "fr", de: "de", it: "it" };

const SLUGS = {
  home:        { pt: "",                en: "",                es: "",                vi: "",                  fr: "",                de: "",                  it: "" },
  about:       { pt: "sobre",           en: "about",           es: "sobre",           vi: "gioi-thieu",        fr: "a-propos",        de: "ueber-uns",         it: "chi-siamo" },
  technology:  { pt: "tecnologia",      en: "technology",      es: "tecnologia",      vi: "cong-nghe",         fr: "technologie",     de: "technologie",       it: "tecnologia" },
  consultancy: { pt: "consultoria",     en: "consultancy",     es: "consultoria",     vi: "tu-van",            fr: "conseil",         de: "beratung",          it: "consulenza" },
  plans:       { pt: "planos",          en: "plans",           es: "planes",          vi: "goi-cuoc",          fr: "plans",           de: "plaene",            it: "piani" },
  rewards:     { pt: "recompensas",     en: "rewards",         es: "recompensas",     vi: "phan-thuong",       fr: "recompenses",     de: "belohnungen",       it: "ricompense" },
  privacy:     { pt: "privacidade",     en: "privacy",         es: "privacidad",      vi: "bao-mat",           fr: "confidentialite", de: "datenschutz",       it: "privacy" },
  terms:       { pt: "termos",          en: "terms",           es: "terminos",        vi: "dieu-khoan",        fr: "conditions",      de: "agb",               it: "termini" },
  risk:        { pt: "aviso-de-risco",  en: "risk-disclosure", es: "aviso-de-riesgo", vi: "canh-bao-rui-ro",   fr: "avertissement-de-risque", de: "risikohinweis", it: "avviso-di-rischio" },
  faq:         { pt: "faq",             en: "faq",             es: "faq",             vi: "faq",               fr: "faq",             de: "faq",               it: "faq" },
  downloadApp: { pt: "baixar-app",      en: "download-app",    es: "descargar-app",   vi: "tai-ung-dung",      fr: "telecharger-app", de: "app-herunterladen", it: "scarica-app" },
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

// ============================================================================
// SECTIONS — Conteúdo SEO rico por rota×idioma renderizado dentro de <noscript>.
// Invisível para usuários com JavaScript ativo (não afeta layout). Usado pelos
// crawlers (Googlebot/Bingbot) para entender o conteúdo da página e extrair
// sinais de relevância e palavras-chave de cauda longa.
// ============================================================================
const SECTIONS = {
  home: {
    pt: [
      { h2: "Trading Algorítmico com IA em Criptomoedas", p: "A Polar Tensor opera um sistema de trading algorítmico de alta frequência com redes neurais proprietárias (Polar One) treinadas para identificar padrões de tendência e direção em criptomoedas como Bitcoin (BTC), Ethereum (ETH), Solana (SOL), USDT e USDC. O bot trader executa ordens automatizadas na corretora Binance via API com latência inferior a 50 milissegundos, 24 horas por dia, 5 dias por semana, sem necessidade de intervenção manual do investidor." },
      { h2: "Como funciona o robô de trading Polar One", p: "O Polar One combina análise multi-timeframe, redes neurais convolucionais e modelos de aprendizado profundo para gerar sinais de compra e venda em tempo real. As operações são executadas exclusivamente na sua conta da Binance — a Polar Tensor nunca custodia seus fundos. Você mantém controle total dos seus ativos e pode pausar ou encerrar a operação a qualquer momento." },
      { h2: "Por que escolher a Polar Tensor", ul: ["Robô de trading com inteligência artificial 100% automatizado", "Operação 24/5 nos pares BTC/USDT, ETH/USDT, SOL/USDT", "Resultados auditados publicados semanalmente", "Saques em USDT processados rapidamente via Binance", "Investimento mínimo a partir de US$ 100 em USDT", "Suporte oficial em português, inglês e espanhol", "Programa de recompensas com indicação multinível e residuais", "Estrutura corporativa global: Panamá, Estados Unidos (FinCEN) e Hong Kong"] },
      { h2: "Para quem é a Polar Tensor", p: "Investidores iniciantes e experientes que buscam renda passiva em criptomoedas, traders que querem automatizar estratégias na Binance, profissionais de marketing de rede focados em produtos de tecnologia financeira, e qualquer pessoa interessada em diversificar a carteira com trading algorítmico de cripto sem precisar acompanhar gráficos manualmente." },
      { h2: "Mercado de criptomoedas e Binance", p: "Operamos nos maiores pares de liquidez da Binance, incluindo Bitcoin (BTC/USDT), Ethereum (ETH/USDT), Solana (SOL/USDT), BNB, XRP, ADA, DOGE, AVAX, LINK, MATIC e outras altcoins selecionadas pelo modelo. A escolha da Binance se deve à profundidade de book, baixo spread, taxas competitivas e API estável — fatores essenciais para um bot de trading de alta frequência funcionar com edge estatístico." },
    ],
    en: [
      { h2: "AI Algorithmic Crypto Trading", p: "Polar Tensor runs a high-frequency algorithmic trading system powered by proprietary neural networks (Polar One) trained to identify trend and direction patterns in cryptocurrencies such as Bitcoin (BTC), Ethereum (ETH), Solana (SOL), USDT and USDC. The crypto trading bot executes automated orders on Binance via API with sub-50ms latency, 24/5, with no manual intervention required." },
      { h2: "How the Polar One trading bot works", p: "Polar One combines multi-timeframe analysis, convolutional neural networks and deep learning models to generate real-time buy and sell signals. Trades execute exclusively on your own Binance account — Polar Tensor never custodies your funds. You keep full control and can pause or stop the bot at any time." },
      { h2: "Why choose Polar Tensor", ul: ["Fully automated AI trading bot", "24/5 operation on BTC/USDT, ETH/USDT, SOL/USDT pairs", "Weekly audited performance reports", "Fast USDT withdrawals via Binance", "Minimum investment from US$100 in USDT", "Official support in English, Portuguese and Spanish", "Multilevel referral and residual rewards program", "Global corporate footprint: Panama, USA (FinCEN) and Hong Kong"] },
    ],
    es: [
      { h2: "Trading Algorítmico de Criptomonedas con IA", p: "Polar Tensor opera un sistema de trading algorítmico de alta frecuencia con redes neuronales propias (Polar One) entrenadas para identificar patrones de tendencia y dirección en criptomonedas como Bitcoin (BTC), Ethereum (ETH), Solana (SOL), USDT y USDC. El bot de trading ejecuta órdenes automatizadas en Binance vía API con latencia inferior a 50ms, 24/5, sin intervención manual del inversor." },
      { h2: "Cómo funciona el bot Polar One", p: "Polar One combina análisis multi-timeframe, redes neuronales convolucionales y modelos de aprendizaje profundo para generar señales de compra y venta en tiempo real. Las operaciones se ejecutan exclusivamente en tu cuenta de Binance — Polar Tensor nunca custodia tus fondos." },
      { h2: "Por qué elegir Polar Tensor", ul: ["Bot de trading con IA 100% automatizado", "Operación 24/5 en BTC/USDT, ETH/USDT, SOL/USDT", "Resultados auditados semanalmente", "Retiros rápidos en USDT por Binance", "Inversión mínima desde US$100 en USDT", "Soporte oficial en español, portugués e inglés", "Programa de recompensas multinivel y residuales", "Estructura corporativa: Panamá, EE.UU. (FinCEN) y Hong Kong"] },
    ],
  },
  about: {
    pt: [
      { h2: "História da Polar Tensor", p: "A Polar Tensor foi fundada em 2018 por Felix Bick e equipe de pesquisadores em finanças quantitativas, com a missão de democratizar o acesso a estratégias de trading algorítmico antes restritas a hedge funds e mesas proprietárias de bancos de investimento. Desde então, a empresa expandiu sua infraestrutura globalmente, mantendo entidades operacionais no Panamá (Polar Tensor Corp.), Estados Unidos (Polar MSB Inc., registrada na FinCEN) e Hong Kong (Polar Tensor LAB Limited)." },
      { h2: "Missão e visão", p: "Tornar o trading algorítmico de criptomoedas acessível, transparente e auditável para investidores de varejo em todo o mundo. Acreditamos que tecnologia de inteligência artificial financeira de ponta deve estar disponível além do circuito institucional, com regras claras, taxas justas e total controle dos fundos pelo próprio investidor." },
      { h2: "Estrutura corporativa global", ul: ["Polar Tensor Corp. — Cidade do Panamá, Panamá", "Polar MSB Inc. — Estados Unidos, registrada como Money Services Business na FinCEN", "Polar Tensor LAB Limited — Hong Kong, hub de pesquisa em IA", "Equipe distribuída em mais de 10 países", "Auditoria periódica de resultados por terceiros independentes"] },
    ],
    en: [
      { h2: "Polar Tensor History", p: "Polar Tensor was founded in 2018 by Felix Bick and a team of quantitative finance researchers, with the mission to democratize access to algorithmic trading strategies once restricted to hedge funds and bank prop desks. The company maintains operating entities in Panama (Polar Tensor Corp.), the United States (Polar MSB Inc., registered with FinCEN), and Hong Kong (Polar Tensor LAB Limited)." },
      { h2: "Mission and vision", p: "Make algorithmic crypto trading accessible, transparent and auditable for retail investors worldwide. Cutting-edge AI trading technology should be available beyond the institutional circuit, with clear rules, fair fees and full custody of funds by the investor." },
    ],
    es: [
      { h2: "Historia de Polar Tensor", p: "Polar Tensor fue fundada en 2018 por Felix Bick y un equipo de investigadores en finanzas cuantitativas, con la misión de democratizar el acceso a estrategias de trading algorítmico antes restringidas a hedge funds y mesas propietarias de bancos de inversión. Mantiene entidades en Panamá, EE.UU. (FinCEN) y Hong Kong." },
    ],
  },
  technology: {
    pt: [
      { h2: "Arquitetura do sistema Polar One", p: "O Polar One é um sistema de trading algorítmico construído sobre uma stack proprietária que combina redes neurais recorrentes (LSTM/GRU), redes convolucionais 1D para análise de séries temporais financeiras, e modelos de atenção (Transformer) para detecção de regime de mercado. A inferência roda em GPUs dedicadas em data centers próximos aos servidores da Binance, garantindo latência média inferior a 50ms entre sinal e execução." },
      { h2: "Stack técnica", ul: ["Redes neurais de tendência: detectam direção macro do par", "Redes neurais de direção: timing de entrada e saída", "Modelos multi-timeframe: 1m, 5m, 15m, 1h, 4h, 1d", "Engine de risk management com stop loss adaptativo", "Co-location próximo aos matching engines da Binance", "Pipeline de dados em streaming via WebSocket", "Backtest contínuo em mais de 6 anos de dados históricos"] },
      { h2: "Inteligência artificial aplicada ao trading", p: "Diferente de bots baseados em indicadores técnicos clássicos (RSI, MACD, Bollinger), o Polar One aprende padrões diretamente dos dados de mercado e se reajusta automaticamente conforme o regime muda — bull, bear, lateral ou alta volatilidade. Isso reduz a dependência de parâmetros manuais e melhora a robustez frente a black swans." },
    ],
    en: [
      { h2: "Polar One system architecture", p: "Polar One is built on a proprietary stack combining recurrent neural networks (LSTM/GRU), 1D convolutional networks for financial time series, and attention models (Transformer) for market regime detection. Inference runs on dedicated GPUs in data centers near Binance servers, ensuring sub-50ms average latency between signal and execution." },
    ],
    es: [
      { h2: "Arquitectura del sistema Polar One", p: "Polar One se basa en una stack propia que combina redes neuronales recurrentes (LSTM/GRU), redes convolucionales 1D para series temporales financieras y modelos de atención (Transformer) para detección de régimen de mercado. La inferencia corre en GPUs dedicadas con latencia inferior a 50ms." },
    ],
  },
  plans: {
    pt: [
      { h2: "Modelo transparente de cobrança", p: "A Polar Tensor cobra apenas duas taxas, sem mensalidade fixa, sem taxa de adesão recorrente e sem cobrança sobre o capital depositado: (1) taxa única de licença de 10% sobre o valor depositado, paga apenas uma vez no momento do cadastro do plano, e (2) taxa de performance de 20% a 30% calculada exclusivamente sobre os lucros gerados. Se o robô não gerar lucro no período, nenhuma taxa de performance é cobrada." },
      { h2: "Investimento mínimo e máximo", ul: ["Mínimo: US$ 100 em USDT", "Recomendado: US$ 500 a US$ 5.000 USDT para diversificação", "Sem limite máximo — planos institucionais sob consulta", "Aporte inicial pode ser feito em USDT, USDC, BTC ou ETH", "Sem fidelidade — você pode encerrar quando quiser"] },
      { h2: "Saques e liquidez", p: "Os saques são processados em USDT diretamente para a sua carteira Binance ou outra wallet on-chain compatível (TRC-20, ERC-20, BEP-20). Não há tempo de carência prolongado: as solicitações são processadas em até 24 horas úteis e você pode sacar lucros e capital sempre que desejar, respeitando apenas o ciclo semanal de fechamento de resultados." },
    ],
    en: [
      { h2: "Transparent fee model", p: "Polar Tensor charges only two fees, with no monthly subscription, no recurring signup fee and no charges on deposited capital: (1) a one-time 10% license fee on the deposit amount, and (2) a performance fee of 20%–30% calculated exclusively on generated profits. If the bot does not generate profit, no performance fee is charged." },
    ],
    es: [
      { h2: "Modelo transparente de tarifas", p: "Polar Tensor cobra solo dos tarifas, sin suscripción mensual: (1) tarifa única de licencia del 10% sobre el depósito y (2) tarifa de rendimiento del 20% al 30% solo sobre las ganancias generadas." },
    ],
  },
  rewards: {
    pt: [
      { h2: "Plano de Recompensas Polar Tensor", p: "A Polar Tensor remunera os usuários que indicam novos investidores através de um plano de recompensas multinível com até 15 níveis de profundidade, residuais em 10 níveis sobre as taxas de performance recorrentes, e um sistema de bônus por ranking que recompensa graduações com valores que vão de US$ 50 (Bronze) até US$ 500.000 (Diamante)." },
      { h2: "Estrutura de bonificações", ul: ["Indicação direta: comissão sobre licença de novos cadastros", "Indicação multinível: até 15 níveis de profundidade", "Residuais: 10 níveis sobre taxas de performance", "Bônus de ranking: Bronze, Prata, Ouro, Platina, Diamante", "Recompensa Infinita: bônus global pago em graduações superiores", "Pagamentos semanais em USDT diretamente na sua wallet"] },
    ],
    en: [
      { h2: "Polar Tensor Rewards Plan", p: "Polar Tensor rewards users who refer new investors through a multilevel plan with up to 15 referral levels, residuals on 10 levels over recurring performance fees, and a rank-bonus system that pays from US$50 (Bronze) up to US$500,000 (Diamond)." },
    ],
    es: [
      { h2: "Plan de Recompensas Polar Tensor", p: "Polar Tensor recompensa a usuarios que refieren nuevos inversores con un plan multinivel hasta 15 niveles, residuales en 10 niveles sobre tarifas de rendimiento recurrentes y bonos de rango desde US$50 (Bronce) hasta US$500.000 (Diamante)." },
    ],
  },
  faq: {
    pt: [
      { h2: "A Polar Tensor é confiável?", p: "Sim. A Polar Tensor opera desde 2018 com estrutura corporativa registrada no Panamá, Estados Unidos (FinCEN) e Hong Kong. Os fundos do investidor permanecem na sua própria conta da Binance — a empresa nunca custodia capital de terceiros, apenas executa ordens automatizadas via API." },
      { h2: "Como começar a usar o robô Polar One?", p: "Crie uma conta gratuita na Polar Tensor, conecte sua conta Binance via chave de API com permissão apenas de leitura e trading (sem permissão de saque), faça um depósito mínimo de US$ 100 em USDT na sua Binance, ative o plano e o robô começa a operar automaticamente." },
      { h2: "Quais criptomoedas o bot opera?", p: "Bitcoin (BTC), Ethereum (ETH), Solana (SOL), Binance Coin (BNB), XRP, Cardano (ADA), Dogecoin (DOGE), Avalanche (AVAX), Chainlink (LINK), Polygon (MATIC) e outras altcoins selecionadas dinamicamente conforme liquidez e edge estatístico do modelo." },
      { h2: "Tem risco de perder dinheiro?", p: "Sim. Toda operação em criptomoedas envolve risco de perda. Apesar dos resultados históricos auditados serem positivos, resultados passados não garantem resultados futuros. Recomendamos investir apenas o que você pode perder e ler o Aviso de Risco completo antes de iniciar." },
    ],
    en: [
      { h2: "Is Polar Tensor trustworthy?", p: "Yes. Polar Tensor has operated since 2018 with corporate entities in Panama, the US (FinCEN-registered) and Hong Kong. Investor funds remain on the user's own Binance account — the company never custodies third-party capital, it only executes automated orders via API." },
      { h2: "How to start with the Polar One bot?", p: "Create a free Polar Tensor account, connect your Binance account via API key with read+trade permissions only (no withdrawal permission), deposit at least US$100 in USDT on your Binance, activate the plan and the bot starts trading automatically." },
    ],
    es: [
      { h2: "¿Es confiable Polar Tensor?", p: "Sí. Polar Tensor opera desde 2018 con entidades en Panamá, EE.UU. (FinCEN) y Hong Kong. Los fondos permanecen en la cuenta Binance del usuario — la empresa nunca custodia capital de terceros." },
      { h2: "¿Cómo empezar con el bot Polar One?", p: "Crea una cuenta gratuita en Polar Tensor, conecta tu cuenta Binance vía API key (solo lectura y trading, sin permiso de retiro), deposita mínimo US$100 en USDT y activa el plan." },
    ],
  },
  consultancy: {
    pt: [
      { h2: "Consultoria especializada", p: "A consultoria Polar Tensor é um atendimento personalizado para investidores que querem entender melhor o sistema Polar One, planejar aportes maiores, estruturar networks de indicação ou tirar dúvidas técnicas sobre integração com Binance, gestão de risco e otimização de retorno." },
    ],
    en: [{ h2: "Specialized consultancy", p: "Polar Tensor consultancy provides personalized support for investors planning larger allocations, structuring referral networks, or with technical questions about Binance integration, risk management and return optimization." }],
    es: [{ h2: "Consultoría especializada", p: "La consultoría Polar Tensor brinda atención personalizada a inversores que quieren entender mejor el sistema Polar One, planear aportes mayores o estructurar redes de referidos." }],
  },
  downloadApp: {
    pt: [
      { h2: "App Polar Tensor para iOS e Android", p: "O aplicativo oficial Polar Tensor está disponível para iPhone (iOS), smartphones Android e também como Progressive Web App (PWA) instalável a partir do navegador. Pelo app você acompanha em tempo real o saldo da carteira em USDT, lucros gerados pelo Polar One, histórico de operações na Binance, depósitos, saques, bonificações da rede e ranking." },
    ],
    en: [{ h2: "Polar Tensor app for iOS and Android", p: "The official Polar Tensor app is available for iPhone (iOS), Android smartphones and as an installable Progressive Web App (PWA). Track USDT balance, Polar One profits, Binance trade history, deposits, withdrawals, network bonuses and ranking in real time." }],
    es: [{ h2: "App Polar Tensor para iOS y Android", p: "La app oficial Polar Tensor está disponible para iPhone (iOS), Android y como PWA instalable. Sigue saldo en USDT, ganancias de Polar One, historial Binance, depósitos, retiros y bonos en tiempo real." }],
  },
  risk: {
    pt: [{ h2: "Riscos do trading em criptomoedas", p: "Trading em criptomoedas envolve alta volatilidade e riscos significativos: risco de mercado (variação de preço), risco regulatório (mudança de regras em jurisdições), risco de liquidez (book fino em altcoins), risco tecnológico (falhas de API ou exchange) e risco operacional. Resultados passados auditados não constituem garantia de resultados futuros. Invista apenas o capital que você pode perder integralmente sem comprometer sua estabilidade financeira." }],
    en: [{ h2: "Crypto trading risks", p: "Crypto trading involves high volatility and significant risks: market risk, regulatory risk, liquidity risk, technological risk and operational risk. Past audited results do not guarantee future results. Only invest capital you can fully afford to lose." }],
    es: [{ h2: "Riesgos del trading en cripto", p: "El trading de cripto implica alta volatilidad y riesgos: mercado, regulatorio, liquidez, tecnológico y operacional. Resultados pasados no garantizan resultados futuros." }],
  },
  privacy: {
    pt: [{ h2: "Tratamento de dados pessoais", p: "A Polar Tensor processa dados pessoais em conformidade com a LGPD (Lei Geral de Proteção de Dados — Brasil) e o GDPR (Regulamento Geral de Proteção de Dados — União Europeia). Coletamos apenas o estritamente necessário para prestação do serviço, cumprimento de obrigações regulatórias (KYC/AML) e segurança da plataforma." }],
    en: [{ h2: "Personal data processing", p: "Polar Tensor processes personal data in compliance with LGPD (Brazil) and GDPR (EU). We collect only what is strictly necessary for service delivery, regulatory obligations (KYC/AML) and platform security." }],
    es: [{ h2: "Tratamiento de datos personales", p: "Polar Tensor procesa datos personales conforme a LGPD (Brasil) y GDPR (UE). Solo recopilamos lo estrictamente necesario para el servicio, KYC/AML y seguridad." }],
  },
  terms: {
    pt: [{ h2: "Termos e condições de uso", p: "Estes Termos de Uso regem o acesso e a utilização da plataforma Polar Tensor, incluindo o sistema Polar One, o aplicativo móvel, o site polartensor.trade e os serviços de consultoria. Ao se cadastrar e utilizar os serviços, o usuário declara estar ciente do Aviso de Risco e concorda integralmente com estas condições." }],
    en: [{ h2: "Terms and conditions of use", p: "These Terms of Use govern access to and use of the Polar Tensor platform, including the Polar One system, the mobile app, the polartensor.trade website and consultancy services." }],
    es: [{ h2: "Términos y condiciones de uso", p: "Estos Términos de Uso rigen el acceso y uso de la plataforma Polar Tensor, incluyendo Polar One, la app móvil, el sitio polartensor.trade y la consultoría." }],
  },
};
// Fallback: idiomas sem sections usam EN
for (const key of Object.keys(SECTIONS)) {
  for (const lang of LANGS) {
    if (!SECTIONS[key][lang]) SECTIONS[key][lang] = SECTIONS[key].en || SECTIONS[key].pt;
  }
}

// Bloco compartilhado de palavras-chave de cauda longa renderizado em todas as
// rotas dentro do <noscript>. Reforça intenção de busca em cripto/Binance.
const KEYWORD_CLOUD = {
  pt: ["robô de trading com IA", "bot trading binance", "trading algorítmico criptomoedas", "inteligência artificial cripto", "rede neural trading", "robô trader bitcoin", "bot ethereum solana", "renda passiva criptomoedas", "investir em bitcoin com IA", "como investir em criptomoedas 2026", "saque em USDT", "binance api trading bot", "melhor robô de trading 2026", "automação de trading cripto", "quant trading criptomoedas", "copy trading IA binance", "investimento em USDT", "ganhar dinheiro com bitcoin", "bot grátis binance", "indicação cripto multinível", "marketing de rede cripto", "ranking cripto bonificação", "trader profissional binance", "estratégia long short cripto", "scalping bot binance", "swing trading IA cripto", "trading 24/5 automatizado", "felix bick polar tensor", "polar tensor brasil oficial", "polar tensor cadastro grátis"],
  en: ["AI crypto trading bot", "binance trading bot", "algorithmic cryptocurrency trading", "neural network trading", "automated bitcoin bot", "ethereum solana bot", "passive income crypto", "best crypto trading bot 2026", "binance api bot", "ai trading platform", "USDT withdrawal", "quant crypto trading", "copy trading binance ai", "free crypto bot", "multilevel referral crypto", "polar tensor official", "felix bick polar tensor"],
  es: ["bot de trading con IA", "bot binance criptomonedas", "trading algorítmico cripto", "red neuronal trading", "robot trader bitcoin", "ingreso pasivo cripto", "mejor bot trading 2026", "trading automatizado binance", "retiro en USDT", "polar tensor oficial"],
  vi: ["bot giao dịch AI crypto", "bot binance trading", "trí tuệ nhân tạo crypto", "polar tensor chính thức"],
  fr: ["robot de trading IA crypto", "bot binance trading", "polar tensor officiel"],
  de: ["KI Krypto Trading Bot", "binance trading bot", "polar tensor offiziell"],
  it: ["bot trading IA crypto", "binance trading bot", "polar tensor ufficiale"],
};

const NAV_LABELS = {
  pt: { home: "Home", about: "Sobre", technology: "Tecnologia", plans: "Planos", rewards: "Recompensas", downloadApp: "Baixar App", consultancy: "Consultoria", faq: "FAQ", risk: "Aviso de Risco", privacy: "Privacidade", terms: "Termos" },
  en: { home: "Home", about: "About", technology: "Technology", plans: "Plans", rewards: "Rewards", downloadApp: "Download App", consultancy: "Consultancy", faq: "FAQ", risk: "Risk Disclosure", privacy: "Privacy", terms: "Terms" },
  es: { home: "Inicio", about: "Sobre", technology: "Tecnología", plans: "Planes", rewards: "Recompensas", downloadApp: "Descargar App", consultancy: "Consultoría", faq: "FAQ", risk: "Aviso de Riesgo", privacy: "Privacidad", terms: "Términos" },
  vi: { home: "Trang chủ", about: "Giới thiệu", technology: "Công nghệ", plans: "Gói cước", rewards: "Phần thưởng", downloadApp: "Tải ứng dụng", consultancy: "Tư vấn", faq: "FAQ", risk: "Cảnh báo rủi ro", privacy: "Bảo mật", terms: "Điều khoản" },
  fr: { home: "Accueil", about: "À propos", technology: "Technologie", plans: "Plans", rewards: "Récompenses", downloadApp: "Télécharger l'app", consultancy: "Conseil", faq: "FAQ", risk: "Avertissement de risque", privacy: "Confidentialité", terms: "Conditions" },
  de: { home: "Startseite", about: "Über uns", technology: "Technologie", plans: "Pläne", rewards: "Belohnungen", downloadApp: "App herunterladen", consultancy: "Beratung", faq: "FAQ", risk: "Risikohinweis", privacy: "Datenschutz", terms: "AGB" },
  it: { home: "Home", about: "Chi siamo", technology: "Tecnologia", plans: "Piani", rewards: "Ricompense", downloadApp: "Scarica app", consultancy: "Consulenza", faq: "FAQ", risk: "Avviso di rischio", privacy: "Privacy", terms: "Termini" },
};

const HTML_LANG = { pt: "pt-BR", en: "en", es: "es", vi: "vi", fr: "fr", de: "de", it: "it" };
const OG_LOCALE = { pt: "pt_BR", en: "en_US", es: "es_ES", vi: "vi_VN", fr: "fr_FR", de: "de_DE", it: "it_IT" };

// Para idiomas sem conteúdo SEO próprio em CONTENT (vi/fr/de/it),
// usamos o inglês como fallback — o componente <Seo /> ajusta dinamicamente no client.
const CONTENT_FALLBACK_LANG = "en";
for (const key of Object.keys(SLUGS)) {
  for (const lang of LANGS) {
    if (!CONTENT[key]?.[lang]) {
      CONTENT[key] = CONTENT[key] || {};
      CONTENT[key][lang] = CONTENT[key][CONTENT_FALLBACK_LANG];
    }
  }
}

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
  html = html.replace(/<meta name="twitter:title" content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${c.title}" />`);
  html = html.replace(/<meta name="twitter:description" content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${c.description}" />`);
  // Garante twitter:card como summary_large_image em todas as rotas
  html = html.replace(/<meta name="twitter:card" content="[^"]*"\s*\/?>/, `<meta name="twitter:card" content="summary_large_image" />`);
  // twitter:image e og:image:alt específicos por rota (usa imagem padrão até termos OG por rota)
  const ogImage = `${SITE}/og-image.jpg`;
  html = html.replace(/<meta name="twitter:image" content="[^"]*"\s*\/?>/, `<meta name="twitter:image" content="${ogImage}" />`);
  html = html.replace(/<meta name="twitter:image:alt" content="[^"]*"\s*\/?>/, `<meta name="twitter:image:alt" content="${c.title}" />`);
  html = html.replace(/<meta property="og:image" content="[^"]*"\s*\/?>/, `<meta property="og:image" content="${ogImage}" />`);
  html = html.replace(/<meta property="og:image:secure_url" content="[^"]*"\s*\/?>/, `<meta property="og:image:secure_url" content="${ogImage}" />`);
  html = html.replace(/<meta property="og:image:alt" content="[^"]*"\s*\/?>/, `<meta property="og:image:alt" content="${c.title}" />`);

  // Build hreflang alternates and inject before </head>
  const alts = LANGS.map((l) => {
    return `    <link rel="alternate" hreflang="${HREFLANG[l]}" href="${buildUrl(key, l)}" />`;
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

  // Injeta WebPage + BreadcrumbList JSON-LD por rota (grafo de entidades)
  const homeUrl = buildUrl("home", lang);
  const breadcrumbs = key === "home"
    ? [{ "@type": "ListItem", position: 1, name: labels.home, item: homeUrl }]
    : [
        { "@type": "ListItem", position: 1, name: labels.home, item: homeUrl },
        { "@type": "ListItem", position: 2, name: labels[key], item: url },
      ];
  const pageJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: c.title,
        description: c.description,
        inLanguage: HTML_LANG[lang],
        isPartOf: { "@id": "https://polartensor.trade/#website" },
        about: { "@id": "https://polartensor.trade/#organization" },
        primaryImageOfPage: { "@type": "ImageObject", url: `${SITE}/og-image.jpg` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: breadcrumbs,
      },
    ],
  };
  const pageScript = `<script type="application/ld+json" id="seo-prerender-webpage">${JSON.stringify(pageJsonLd)}</script>`;
  html = html.replace("</head>", `${pageScript}\n  </head>`);

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
