// Prerender simples: gera um index.html dedicado por rota dentro de dist/
// com <title>, <meta description>, <link canonical> e conteúdo SEO em <noscript>.
// O React continua hidratando normalmente — isto é apenas um "shell" SEO
// para que o Googlebot enxergue conteúdo imediato em cada URL.

import { readFile, writeFile, mkdir, copyFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "..", "dist");
const SITE = "https://polartensor.trade";

const routes = [
  {
    path: "/sobre",
    title: "Sobre a Polar Tensor | Empresa de Trading com IA em Criptomoedas",
    description:
      "Conheça a Polar Tensor: empresa de tecnologia financeira fundada em 2018, especializada em algoritmos de trading com redes neurais para o mercado de criptomoedas.",
    h1: "Sobre a Polar Tensor",
    body: `A Polar Tensor é uma empresa de tecnologia financeira fundada em 2018 que desenvolve
      algoritmos proprietários de trading com redes neurais para o mercado de criptomoedas.
      Com sedes registradas no Panamá, Estados Unidos (FinCEN MSB) e Hong Kong, atendemos
      clientes em mais de 30 países, oferecendo operação automatizada 24/5 na Binance,
      transparência total dos resultados e suporte em português.`,
  },
  {
    path: "/tecnologia",
    title: "Tecnologia Polar One | Trading Algorítmico com Redes Neurais",
    description:
      "Polar One: sistema automatizado de trading com redes neurais de tendência e direção, latência inferior a 50ms e operação 24/5 na Binance.",
    h1: "Tecnologia Polar One",
    body: `O Polar One é o sistema proprietário da Polar Tensor que combina redes neurais de
      tendência e direção para executar operações de alta frequência em criptomoedas com
      latência inferior a 50 milissegundos. A infraestrutura roda em data centers próximos
      às matching engines da Binance, garantindo execução otimizada e gestão de risco
      contínua, com drawdown historicamente baixo.`,
  },
  {
    path: "/planos",
    title: "Planos e Taxas | Polar Tensor — Trading Automatizado",
    description:
      "Conheça os planos da Polar Tensor: investimento mínimo de $100 USDT, taxa única de licença de 10% e taxa de performance de 20% a 30% apenas sobre lucros.",
    h1: "Planos e Taxas Polar Tensor",
    body: `A Polar Tensor opera com um modelo transparente: investimento mínimo de $100 USDT,
      taxa única de licença de 10% sobre o depósito e taxa de performance entre 20% e 30%
      cobrada apenas sobre lucros gerados, com distribuição semanal. Saques mínimos de
      $20 USD com taxa fixa de $2, processados em até 24 horas todos os dias.`,
  },
  {
    path: "/recompensas",
    title: "Plano de Recompensas Polar Tensor | Indicação, Residuais e Ranking",
    description:
      "Plano de recompensas Polar Tensor: ganhos por indicação em até 15 níveis, residuais em 10 níveis, bônus de ranking até $500.000 e Recompensa Infinita por graduação.",
    h1: "Plano de Recompensas Polar Tensor",
    body: `O plano de recompensas da Polar Tensor oferece múltiplas fontes de ganhos:
      bonificação por indicação em até 15 níveis (de 20% no nível 1 até 0,5% nos últimos
      níveis), ganhos residuais em 10 níveis sobre as negociações da rede, bônus de ranking
      conforme volume e perna máxima — começando em $50 (Bronze) até $500.000 (Diamante) —
      e a Recompensa Infinita, um pool global distribuído entre os graduados a partir do
      ranking Ouro (5%) até Diamante (20%). Operação 100% automatizada com IA, retorno
      médio mensal de 22%, pagamentos comerciais às sextas-feiras, investimento mínimo de
      $100 USDT e juros compostos por reinvestimento automático.`,
  },
  {
    path: "/baixar-app",
    title: "Baixar App Polar Tensor | Aplicativo Oficial de Trading com IA",
    description:
      "Baixar App Polar Tensor: aplicativo oficial para iOS e Android. Acompanhe seu portfólio em USDT, lucros do Polar One, depósitos, saques e bonificações da rede direto no celular.",
    h1: "Baixar App Polar Tensor",
    body: `Baixe o aplicativo oficial Polar Tensor para iOS e Android e acompanhe seu trading
      automatizado com inteligência artificial direto do celular. O App Polar Tensor permite
      visualizar saldo da carteira em USDT, lucros semanais do sistema Polar One, histórico
      completo de transações (depósitos, saques, transferências, comissões e bônus), gerenciar
      o valor ativo em trading com reinvestimento automático, acompanhar a evolução até o
      próximo nível e visualizar métricas globais de transparência da empresa com gráficos
      interativos. Disponível gratuitamente na App Store e no Google Play.`,
  },
  {
    path: "/consultoria",
    title: "Consultoria Polar Tensor | Atendimento Personalizado para Investidores",
    description:
      "Consultoria especializada Polar Tensor para investidores que buscam orientação personalizada em trading algorítmico de criptomoedas.",
    h1: "Consultoria Polar Tensor",
    body: `O serviço de consultoria da Polar Tensor oferece atendimento personalizado para
      investidores que desejam compreender melhor o funcionamento do sistema Polar One,
      planejar aportes e estruturar uma estratégia de longo prazo no mercado de
      criptomoedas com suporte de especialistas certificados.`,
  },
  {
    path: "/faq",
    title: "Perguntas Frequentes | Polar Tensor — Tire suas Dúvidas",
    description:
      "Perguntas frequentes sobre a Polar Tensor: como funciona o Polar One, taxas, valores mínimos, riscos, registro da empresa e processo de cadastro.",
    h1: "Perguntas Frequentes",
    body: `Respostas para as principais dúvidas sobre a Polar Tensor: o que é a empresa,
      como funciona o sistema Polar One, quais os riscos do trading em criptomoedas,
      como funcionam as taxas de licença e performance, onde a empresa está registrada
      (Panamá, EUA e Hong Kong) e como realizar seu cadastro gratuito.`,
  },
  {
    path: "/aviso-de-risco",
    title: "Aviso de Risco | Polar Tensor — Riscos do Trading em Criptomoedas",
    description:
      "Aviso de risco da Polar Tensor: trading em criptomoedas envolve volatilidade e riscos de mercado, regulatórios, de liquidez e tecnológicos.",
    h1: "Aviso de Risco",
    body: `Operações com criptomoedas envolvem alta volatilidade e riscos significativos,
      incluindo riscos de mercado, regulatórios, de liquidez e tecnológicos. Resultados
      passados não garantem resultados futuros. Você pode perder parte ou a totalidade do
      capital investido. Invista apenas valores que está disposto a perder.`,
  },
  {
    path: "/privacidade",
    title: "Política de Privacidade | Polar Tensor",
    description:
      "Política de Privacidade da Polar Tensor: como coletamos, usamos e protegemos seus dados pessoais em conformidade com a LGPD e GDPR.",
    h1: "Política de Privacidade",
    body: `A Polar Tensor respeita sua privacidade e processa seus dados pessoais em
      conformidade com a LGPD (Brasil) e GDPR (União Europeia). Coletamos apenas as
      informações necessárias para prestação do serviço e cumprimento de obrigações
      regulatórias (KYC/AML).`,
  },
  {
    path: "/termos",
    title: "Termos de Uso | Polar Tensor",
    description:
      "Termos de Uso da Polar Tensor: condições gerais para utilização da plataforma de trading algorítmico e do sistema Polar One.",
    h1: "Termos de Uso",
    body: `Estes Termos de Uso regem o acesso e a utilização dos serviços oferecidos pela
      Polar Tensor, incluindo a plataforma de trading automatizado Polar One. Ao se
      cadastrar, você concorda com as condições aqui descritas.`,
  },
];

function buildHtml(template, route) {
  let html = template;

  // Atualiza <title>
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${route.title}</title>`);

  // Atualiza meta description
  html = html.replace(
    /<meta name="description" content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${route.description}" />`
  );

  // Atualiza canonical
  html = html.replace(
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${SITE}${route.path}" />`
  );

  // Atualiza og:url
  html = html.replace(
    /<meta property="og:url" content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${SITE}${route.path}" />`
  );

  // Atualiza og:title
  html = html.replace(
    /<meta property="og:title" content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${route.title}" />`
  );

  // Atualiza og:description
  html = html.replace(
    /<meta property="og:description" content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${route.description}" />`
  );

  // Substitui o <noscript> com conteúdo específico da rota
  const noscript = `<noscript>
        <h1>${route.h1}</h1>
        <p>${route.body.replace(/\s+/g, " ").trim()}</p>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/sobre">Sobre</a></li>
            <li><a href="/tecnologia">Tecnologia</a></li>
            <li><a href="/planos">Planos</a></li>
            <li><a href="/recompensas">Recompensas</a></li>
            <li><a href="/baixar-app">Baixar App Polar Tensor</a></li>
            <li><a href="/consultoria">Consultoria</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/aviso-de-risco">Aviso de Risco</a></li>
            <li><a href="/privacidade">Privacidade</a></li>
            <li><a href="/termos">Termos</a></li>
          </ul>
        </nav>
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

  for (const route of routes) {
    const outDir = join(distDir, route.path.replace(/^\//, ""));
    await mkdir(outDir, { recursive: true });
    const outFile = join(outDir, "index.html");
    const html = buildHtml(template, route);
    await writeFile(outFile, html, "utf8");
    console.log(`[prerender] gerado ${route.path}/index.html`);
  }

  console.log(`[prerender] concluído: ${routes.length} rotas pré-renderizadas.`);
}

main().catch((err) => {
  console.error("[prerender] erro:", err);
  process.exit(1);
});
