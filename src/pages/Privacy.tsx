import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { PageHero } from "@/components/site/PageHero";
import { Seo } from "@/components/site/Seo";
import { Card } from "@/components/ui/card";
import { ReactNode } from "react";
import { SITE_URL } from "@/lib/constants";

const Section = ({ n, title, children }: { n: number; title: string; children: ReactNode }) => (
  <section className="space-y-3">
    <h2 className="font-display text-xl font-semibold text-primary">{n}. {title}</h2>
    <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">{children}</div>
  </section>
);

const Privacy = () => (
  <main className="min-h-screen bg-background">
    <Seo
      title="Política de Privacidade | Polar Tensor"
      description="Aviso de Privacidade e Proteção de Dados da Polar Tensor: como coletamos, armazenamos, compartilhamos e protegemos dados pessoais em nossas operações globais."
      canonical={`${SITE_URL}/privacidade`}
    />
    <SiteHeader />
    <PageHero
      badge="Legal"
      title="Aviso de Privacidade & Proteção de Dados"
      subtitle="Tratamento de dados pessoais e segurança da informação."
      showBack
    />

    <section className="py-16">
      <div className="container max-w-3xl">
        <Card className="space-y-8 bg-card p-8 md:p-10">
          <Section n={1} title="Finalidade e status legal">
            <p>Este Aviso de Privacidade descreve como dados pessoais são coletados, armazenados, compartilhados e protegidos no âmbito dos serviços oferecidos pelo grupo Polar Tensor.</p>
            <p>Este Aviso é fornecido em conformidade com as leis de proteção de dados aplicáveis, incluindo, quando relevante:</p>
            <ul className="list-disc pl-6">
              <li>Regulamento (UE) 2016/679 (RGPD);</li>
              <li>Leis estaduais e federais de privacidade dos EUA;</li>
              <li>Outras normas internacionais aplicáveis.</li>
            </ul>
          </Section>

          <Section n={2} title="Controladores e escopo">
            <p>Dependendo do serviço utilizado, os dados pessoais podem ser tratados por uma ou mais entidades do grupo, atuando como controladores independentes em seus respectivos escopos:</p>
            <ul className="list-disc pl-6">
              <li>Polar Tensor US LLC — onboarding e operações nos EUA;</li>
              <li>Polar Tensor Europe SP ZOO — operações na União Europeia;</li>
              <li>Polar MSB Inc. — serviços de pagamento e on/off-ramp;</li>
              <li>Polar Tensor Corp. — execução técnica e operações de plataforma.</li>
            </ul>
          </Section>

          <Section n={3} title="Categorias de dados pessoais">
            <p>As seguintes categorias de dados pessoais podem ser tratadas, conforme aplicável:</p>
            <ul className="list-disc pl-6">
              <li>Dados de identificação (nome, data de nascimento, nacionalidade);</li>
              <li>Informações de contato (e-mail, telefone);</li>
              <li>Dados de conta e onboarding;</li>
              <li>Dados de verificação KYC e AML, incluindo documentos de identidade e prova de vida;</li>
              <li>Dados transacionais e de atividade;</li>
              <li>Dados técnicos (IP, identificadores de dispositivo, logs);</li>
              <li>Comunicações e registros de suporte.</li>
            </ul>
            <p>Dados sensíveis somente são tratados quando estritamente necessário e permitido por lei.</p>
          </Section>

          <Section n={4} title="Finalidades do tratamento">
            <p>Os dados são tratados para finalidades legítimas como: onboarding e administração de contas, verificação de identidade, prevenção a fraudes, prestação dos serviços, registro contábil, segurança e integridade dos sistemas, obrigações regulatórias, e comunicação com o cliente.</p>
            <p>Não realizamos decisões automatizadas com efeitos jurídicos relevantes sem salvaguardas adequadas.</p>
          </Section>

          <Section n={5} title="Bases legais">
            <p>O tratamento é realizado com base em uma ou mais das seguintes hipóteses, conforme aplicável: execução de contrato, cumprimento de obrigações legais e regulatórias, legítimo interesse (incluindo segurança e prevenção a fraudes) e consentimento, quando exigido.</p>
          </Section>

          <Section n={6} title="Compartilhamento e destinatários">
            <p>Os dados podem ser compartilhados, quando necessário e permitido por lei, com: entidades do grupo, prestadores regulados (KYC, fornecedores, processadores de pagamento), parceiros de execução e infraestrutura, auditores, consultores legais e autoridades regulatórias.</p>
            <p>Não vendemos dados pessoais a terceiros.</p>
          </Section>

          <Section n={7} title="Transferências internacionais">
            <p>Quando ocorrem transferências internacionais, aplicamos salvaguardas adequadas como decisões de adequação, cláusulas contratuais padrão ou outros mecanismos legalmente reconhecidos. Limitamos transferências ao necessário para fins operacionais e de conformidade.</p>
          </Section>

          <Section n={8} title="Retenção de dados">
            <p>Os dados são retidos pelo tempo necessário para cumprir obrigações contratuais, legais e regulatórias, ou para defesa de direitos. Os prazos variam de acordo com o tipo de dado e a legislação aplicável.</p>
          </Section>

          <Section n={9} title="Segurança dos dados">
            <p>Adotamos medidas técnicas e organizacionais adequadas para proteger os dados contra acesso não autorizado, perda, destruição, alteração e uso indevido. Apesar disso, nenhum sistema é 100% seguro.</p>
          </Section>

          <Section n={10} title="Direitos dos titulares">
            <p>Conforme a legislação aplicável, você pode ter o direito de: acessar seus dados, solicitar correção ou exclusão, restringir ou se opor ao tratamento, solicitar portabilidade e apresentar reclamação à autoridade competente.</p>
            <p>As solicitações podem estar sujeitas a verificação e limites legais.</p>
          </Section>

          <Section n={11} title="Cookies e tecnologias de rastreamento">
            <p>Nossos sites podem usar cookies e tecnologias semelhantes para: segurança, funcionalidade, analytics, monitoramento de desempenho e otimização da experiência do usuário. Mecanismos de consentimento são fornecidos quando exigido.</p>
          </Section>

          <Section n={12} title="Sem renúncia de obrigações">
            <p>Nada neste Aviso limita ou exclui direitos ou obrigações impostos por leis de proteção de dados aplicáveis.</p>
          </Section>

          <Section n={13} title="Alterações">
            <p>Este Aviso pode ser atualizado periodicamente para refletir mudanças legais, regulatórias ou operacionais. A versão mais recente estará sempre disponível em nosso site.</p>
          </Section>
        </Card>
      </div>
    </section>

    <SiteFooter />
  </main>
);

export default Privacy;
