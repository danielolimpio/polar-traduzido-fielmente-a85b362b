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
export const POSTS: BlogPost[] = [
  {
    slug: "trading-algoritmico-cripto",
    date: "2026-07-31",
    author: "Equipe Polar Tensor",
    readingMinutes: 9,
    tags: ["trading algorítmico", "criptomoedas", "inteligência artificial", "redes neurais", "gestão de risco"],
    translations: {
      pt: {
        title: "Trading algorítmico cripto: o guia completo com redes neurais",
        excerpt:
          "Como funciona o trading algorítmico em criptomoedas, por que redes neurais melhoram a execução e a gestão de risco em mercados voláteis, e como começar com segurança.",
        content: `
<p><strong>Trading algorítmico cripto</strong> é a prática de delegar decisões de compra e venda de ativos digitais a regras programadas e modelos estatísticos, em vez de executá-las manualmente. Em um mercado que opera 24 horas por dia, 7 dias por semana, a velocidade e a disciplina de um algoritmo são vantagens estruturais sobre a operação humana.</p>

<h2>O que é trading algorítmico em criptomoedas</h2>
<p>Um algoritmo de trading é um conjunto de instruções que monitora dados de mercado — preço, volume, profundidade do livro de ofertas, volatilidade, taxas de financiamento — e dispara ordens quando condições predefinidas são atendidas. Diferentemente de um trader humano, ele não hesita, não muda de estratégia por emoção e consegue avaliar dezenas de pares simultaneamente em milissegundos.</p>
<p>Nas criptomoedas isso importa ainda mais: Bitcoin, Ethereum e Solana podem variar vários pontos percentuais em minutos, e as melhores janelas de entrada frequentemente aparecem de madrugada, quando nenhum operador manual está atento à tela.</p>

<h2>Por que redes neurais mudam o jogo</h2>
<p>Estratégias clássicas (médias móveis, RSI, grid, arbitragem) usam regras fixas. Uma <strong>rede neural</strong> aprende padrões diretamente dos dados históricos e continua se ajustando conforme o regime de mercado muda. Na prática, isso melhora três frentes:</p>
<ul>
  <li><strong>Reconhecimento de regime:</strong> o modelo distingue tendência, lateralização e choque de volatilidade, e adapta o tamanho da posição a cada cenário.</li>
  <li><strong>Qualidade de execução:</strong> a rede estima o impacto provável de uma ordem e fatia a entrada para reduzir slippage e custo efetivo.</li>
  <li><strong>Filtro de sinais falsos:</strong> ao combinar dezenas de variáveis, o modelo descarta rompimentos frágeis que enganariam um indicador isolado.</li>
</ul>

<h2>Gestão de risco: a parte que separa robô de cassino</h2>
<p>Retorno sem controle de risco é sorte. Um sistema algorítmico sério aplica, de forma automática e sem exceção:</p>
<ul>
  <li><strong>Limite de exposição por operação</strong> — um percentual fixo e pequeno do capital em cada entrada.</li>
  <li><strong>Stop loss e take profit programados</strong> — definidos antes da ordem existir, nunca depois do prejuízo aparecer.</li>
  <li><strong>Drawdown máximo diário</strong> — o sistema simplesmente para de operar ao atingir o limite.</li>
  <li><strong>Diversificação entre pares</strong> — evita concentrar todo o risco em um único ativo correlacionado.</li>
  <li><strong>Circuit breakers de volatilidade</strong> — suspensão automática durante eventos macro e liquidações em cascata.</li>
</ul>

<h2>Backtest, forward test e dados reais</h2>
<p>Antes de operar capital real, uma estratégia precisa passar por backtest em vários ciclos de mercado (alta, baixa e lateral), forward test em conta de simulação e, só então, operação com capital reduzido. Desconfie de curvas de resultado perfeitas: normalmente indicam <em>overfitting</em>, ou seja, um modelo decorado para o passado e frágil no futuro.</p>

<h2>Como a Polar Tensor aplica isso</h2>
<p>A Polar Tensor opera com uma camada de inteligência artificial conectada por API à Binance. O capital permanece na conta da própria pessoa na corretora — a integração usa chaves de API com permissão de negociação, sem permissão de saque. A IA analisa o mercado continuamente, executa entradas e saídas com regras de risco fixas e mantém o histórico de operações auditável.</p>

<h2>Como começar em 4 passos</h2>
<ul>
  <li><strong>1.</strong> Crie e verifique sua conta na corretora (KYC concluído).</li>
  <li><strong>2.</strong> Gere as chaves de API com permissão de negociação e <strong>sem</strong> permissão de saque.</li>
  <li><strong>3.</strong> Comece com um valor que você aceitaria perder e acompanhe por pelo menos um ciclo completo.</li>
  <li><strong>4.</strong> Revise resultados mensalmente e ajuste exposição — nunca dobre a aposta após uma perda.</li>
</ul>

<h2>Perguntas frequentes</h2>
<p><strong>Trading algorítmico dá lucro garantido?</strong> Não. Nenhuma estratégia elimina o risco de perda; algoritmos reduzem erro emocional e melhoram consistência, não garantem retorno.</p>
<p><strong>Preciso saber programar?</strong> Não para usar uma plataforma pronta como a Polar Tensor; sim, se quiser desenvolver o próprio robô.</p>
<p><strong>Qual valor inicial?</strong> O suficiente para cobrir taxas mínimas da corretora e que não comprometa suas finanças pessoais.</p>

<p><em>Aviso de risco: negociação de criptomoedas envolve risco elevado de perda de capital. Este conteúdo é educativo e não constitui recomendação de investimento.</em></p>
`,
      },
      en: {
        title: "Algorithmic crypto trading: a complete guide with neural networks",
        excerpt:
          "How algorithmic trading works in crypto, why neural networks improve execution and risk management in volatile markets, and how to start safely.",
        content: `
<p><strong>Algorithmic crypto trading</strong> means delegating buy and sell decisions on digital assets to programmed rules and statistical models instead of clicking manually. In a market that runs 24/7, an algorithm's speed and discipline are structural advantages over human execution.</p>

<h2>What algorithmic trading is</h2>
<p>A trading algorithm monitors market data — price, volume, order-book depth, volatility, funding rates — and fires orders when predefined conditions are met. It never hesitates, never changes plan out of fear, and can watch dozens of pairs at once in milliseconds.</p>

<h2>Why neural networks change the game</h2>
<ul>
  <li><strong>Regime recognition:</strong> the model tells trend, range and volatility shocks apart and sizes positions accordingly.</li>
  <li><strong>Execution quality:</strong> it estimates market impact and slices orders to cut slippage and effective cost.</li>
  <li><strong>False-signal filtering:</strong> combining dozens of features discards weak breakouts that fool a single indicator.</li>
</ul>

<h2>Risk management is what separates a system from a casino</h2>
<ul>
  <li>Fixed, small exposure per trade</li>
  <li>Stop loss and take profit defined before the order exists</li>
  <li>Maximum daily drawdown that halts trading automatically</li>
  <li>Diversification across pairs</li>
  <li>Volatility circuit breakers during macro events and liquidation cascades</li>
</ul>

<h2>Backtest, forward test, real data</h2>
<p>Test across bull, bear and sideways cycles, then forward test on a demo account, then go live small. Be suspicious of perfect equity curves — they usually mean overfitting.</p>

<h2>How Polar Tensor applies it</h2>
<p>Polar Tensor connects an AI layer to Binance through API keys. Funds stay in your own exchange account; the integration uses trade-only permissions, never withdrawal permissions. The AI analyses the market continuously and executes with fixed risk rules and an auditable trade history.</p>

<h2>Getting started in 4 steps</h2>
<ul>
  <li><strong>1.</strong> Open and verify your exchange account (complete KYC).</li>
  <li><strong>2.</strong> Create API keys with trading enabled and withdrawals disabled.</li>
  <li><strong>3.</strong> Start with an amount you could afford to lose and observe a full cycle.</li>
  <li><strong>4.</strong> Review monthly and adjust exposure — never double down after a loss.</li>
</ul>

<p><em>Risk warning: crypto trading carries a high risk of capital loss. This content is educational and is not investment advice.</em></p>
`,
      },
      es: {
        title: "Trading algorítmico cripto: guía completa con redes neuronales",
        excerpt:
          "Cómo funciona el trading algorítmico en criptomonedas, por qué las redes neuronales mejoran la ejecución y la gestión de riesgo, y cómo empezar con seguridad.",
        content: `
<p>El <strong>trading algorítmico cripto</strong> consiste en delegar las decisiones de compra y venta a reglas programadas y modelos estadísticos en lugar de operar manualmente. En un mercado que funciona 24/7, la velocidad y la disciplina del algoritmo son ventajas estructurales.</p>

<h2>Qué es el trading algorítmico</h2>
<p>Un algoritmo vigila precio, volumen, profundidad del libro de órdenes, volatilidad y tasas de financiación, y lanza órdenes cuando se cumplen condiciones predefinidas. No duda, no cambia de plan por miedo y observa decenas de pares a la vez.</p>

<h2>Por qué las redes neuronales marcan la diferencia</h2>
<ul>
  <li><strong>Reconocimiento de régimen:</strong> distingue tendencia, lateralidad y shocks de volatilidad, y ajusta el tamaño de posición.</li>
  <li><strong>Calidad de ejecución:</strong> estima el impacto y fracciona la orden para reducir el slippage.</li>
  <li><strong>Filtro de señales falsas:</strong> combina decenas de variables y descarta rupturas débiles.</li>
</ul>

<h2>Gestión de riesgo</h2>
<ul>
  <li>Exposición fija y reducida por operación</li>
  <li>Stop loss y take profit definidos antes de abrir la orden</li>
  <li>Drawdown diario máximo que detiene la operativa</li>
  <li>Diversificación entre pares</li>
  <li>Cortacircuitos de volatilidad en eventos macro</li>
</ul>

<h2>Cómo lo aplica Polar Tensor</h2>
<p>Polar Tensor conecta una capa de IA a Binance mediante claves API. El capital permanece en tu propia cuenta del exchange; la integración usa permisos de trading, nunca de retiro.</p>

<p><em>Aviso de riesgo: operar con criptomonedas implica un alto riesgo de pérdida. Contenido educativo, no es asesoramiento de inversión.</em></p>
`,
      },
    },
  },
];


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
