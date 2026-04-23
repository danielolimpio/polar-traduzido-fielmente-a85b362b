import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { PageHero } from "@/components/site/PageHero";
import { Seo } from "@/components/site/Seo";
import { Card } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { ReactNode } from "react";
import { SITE_URL } from "@/lib/constants";

const Section = ({ n, title, children }: { n: number; title: string; children: ReactNode }) => (
  <section className="space-y-3">
    <h2 className="font-display text-xl font-semibold text-primary">{n}. {title}</h2>
    <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">{children}</div>
  </section>
);

const RiskDisclosure = () => (
  <main className="min-h-screen bg-background">
    <Seo
      title="Aviso de Risco | Polar Tensor"
      description="Declaração de Aviso de Risco da Polar Tensor sobre ativos digitais, trading automatizado, riscos de mercado, regulatórios, tecnológicos e de liquidez."
      canonical={`${SITE_URL}/aviso-de-risco`}
    />
    <SiteHeader />
    <PageHero
      badge="Legal"
      title="Declaração de Aviso de Risco"
      subtitle="Ativos digitais, trading automatizado e serviços de tecnologia."
      showBack
    />

    <section className="py-16">
      <div className="container max-w-3xl">
        <Card className="mb-6 flex items-start gap-4 border-primary/30 bg-primary/5 p-6">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <p className="text-sm text-muted-foreground">
            Trading em ativos digitais envolve riscos significativos. Você pode perder parte ou a totalidade
            do capital. Esta declaração não constitui consultoria de investimento, recomendação ou garantia
            de desempenho.
          </p>
        </Card>

        <Card className="space-y-8 bg-card p-8 md:p-10">
          <Section n={1} title="Finalidade desta declaração">
            <p>Esta Declaração de Aviso de Risco visa informar clientes e potenciais usuários dos serviços sobre os principais riscos relacionados a: ativos digitais e mercados de criptoativos, tecnologia de trading automatizado e algorítmico, serviços de execução e o uso de infraestrutura e serviços de terceiros.</p>
            <p>Esta declaração faz parte das informações pré-contratuais fornecidas ao cliente e deve ser lida em conjunto com os termos, divulgações e acordos aplicáveis.</p>
          </Section>

          <Section n={2} title="Aviso geral de risco">
            <p>Ativos digitais são produtos de alto risco. A participação nos mercados de ativos digitais e o uso de tecnologia de trading automatizado podem resultar em perda parcial ou total do capital.</p>
            <p>Você só deve usar os serviços se compreender plenamente a natureza dos riscos envolvidos e puder arcar com a perda integral dos valores alocados.</p>
            <p>Desempenho passado, real ou simulado, não é indicativo de resultados futuros.</p>
          </Section>

          <Section n={3} title="Risco de mercado">
            <p>Mercados de ativos digitais estão sujeitos a alta volatilidade. Os preços podem flutuar rápida e imprevisivelmente devido a, entre outros: sentimento e especulação do mercado, condições de liquidez, eventos regulatórios, mudanças tecnológicas, eventos macroeconômicos e ações de participantes do mercado.</p>
            <p>Movimentos adversos podem resultar em perdas rápidas e sem aviso.</p>
          </Section>

          <Section n={4} title="Sem garantia de desempenho ou proteção de capital">
            <p>Nenhuma entidade do grupo oferece: garantias de lucro ou retorno; seguro ou preservação de capital; metas mínimas de desempenho; representações sobre resultados esperados.</p>
            <p>Toda atividade de trading é realizada por conta e risco exclusivo do cliente.</p>
          </Section>

          <Section n={5} title="Risco de trading automatizado e algorítmico">
            <p>Sistemas automatizados e algorítmicos operam com base em regras e lógica pré-definidas. Os riscos associados ao trading automatizado incluem, entre outros: condições de mercado adversas não antecipadas pelo sistema, execução em preços desfavoráveis, latência sob certas condições de mercado, limitações inerentes a dados históricos ou suposições do modelo.</p>
            <p>Sistemas automatizados podem performar mal ou de forma imprevisível em determinadas condições de mercado.</p>
          </Section>

          <Section n={6} title="Sem consultoria de investimento ou discricionariedade">
            <p>Os serviços são prestados em base apenas de execução e tecnologia. Não fornecemos consultoria de investimento, avaliação de adequação, monitoramento contínuo de portfólio do cliente ou atuação como gestor de investimentos.</p>
            <p>Decisões de avaliar, desativar, depositar, sacar ou alocar fundos permanecem inteiramente com o cliente.</p>
          </Section>

          <Section n={7} title="Risco tecnológico e operacional">
            <p>Os serviços dependem de sistemas tecnológicos complexos, incluindo software, hardware, redes e infraestrutura de terceiros. Os riscos potenciais incluem: paralisações ou tempo de inatividade do sistema, atrasos de latência ou execução, erros ou bugs de software, incidentes de cibersegurança e falha de provedores terceirizados.</p>
            <p>Embora medidas razoáveis sejam implementadas para manter integridade do sistema, operação ininterrupta e livre de erros não pode ser garantida.</p>
          </Section>

          <Section n={8} title="Risco de custódia e camada de execução">
            <p>Os ativos do cliente podem estar sujeitos a arranjos de custódia, incluindo riscos operacionais, riscos de domínio, falhas em provedores de serviços de terceiros, congestionamento ou falha da rede blockchain e riscos associados a locais de execução e provedores de liquidez.</p>
            <p>Transferências temporárias de ativos para fins de execução estão sujeitas a riscos operacionais da camada de execução.</p>
          </Section>

          <Section n={9} title="Risco regulatório e legal">
            <p>O tratamento regulatório dos ativos digitais pode mudar. Ações legislativas, regulatórias ou de fiscalização futuras podem: restringir ou proibir certas atividades, impor obrigações adicionais de conformidade, afetar a disponibilidade dos serviços ou impactar o valor ou a comerciabilidade dos ativos digitais.</p>
            <p>Mudanças regulatórias podem ocorrer com pouca ou nenhuma antecedência.</p>
          </Section>

          <Section n={10} title="Risco de liquidez">
            <p>Certos ativos digitais podem apresentar liquidez limitada. Isso pode resultar em: dificuldade em entrar ou sair de posições, slippage aumentado, execução em preços materialmente diferentes do esperado e incapacidade de executar nos prazos desejados.</p>
          </Section>

          <Section n={11} title="Risco de contraparte e terceiros">
            <p>Os serviços dependem de provedores terceirizados, incluindo: exchanges, provedores de liquidez, processadores de pagamento, provedores de tecnologia de custódia e fornecedores de infraestrutura.</p>
            <p>Falhas, insolvência, má conduta ou interrupções operacionais de terceiros podem afetar adversamente a disponibilidade do serviço ou os resultados de execução.</p>
          </Section>

          <Section n={12} title="Eventos extraordinários e força maior">
            <p>Eventos extraordinários fora do controle razoável — incluindo, entre outros, desastres naturais, guerra, emergências regulatórias, falhas de mercado ou rede — podem prejudicar ou suspender os serviços.</p>
            <p>Tais eventos podem resultar em perdas ou atrasos para os quais nenhuma garantia ou compensação pode ser fornecida.</p>
          </Section>

          <Section n={13} title="Reconhecimento de responsabilidade do cliente">
            <p>Ao usar os serviços, os clientes reconhecem e aceitam que: leram e entenderam estes riscos; avaliaram independentemente os riscos envolvidos; são os únicos responsáveis por suas decisões e ações; conhecem possíveis perdas e expectativas.</p>
            <p>Os clientes devem buscar aconselhamento profissional independente se tiverem dúvidas sobre os riscos.</p>
          </Section>

          <Section n={14} title="Sem declaração de confiança">
            <p>Os clientes não devem confiar em quaisquer declarações, materiais ou comunicações como garantias de rentabilidade, segurança ou resultados.</p>
            <p>Apenas a documentação contratual vinculante governa a relação legal.</p>
          </Section>
        </Card>
      </div>
    </section>

    <SiteFooter />
  </main>
);

export default RiskDisclosure;
