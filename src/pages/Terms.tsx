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

const Terms = () => (
  <main className="min-h-screen bg-background">
    <Seo
      title="Termos de Uso | Polar Tensor"
      description="Termos de Uso da plataforma Polar Tensor: regras de acesso, elegibilidade, obrigações do usuário, limitação de responsabilidade e mais."
      canonical={`${SITE_URL}/termos`}
    />
    <SiteHeader />
    <PageHero
      badge="Legal"
      title="Termos de Uso"
      subtitle="Plataforma de tecnologia e interface de execução."
      showBack
    />

    <section className="py-16">
      <div className="container max-w-3xl">
        <Card className="space-y-8 bg-card p-8 md:p-10">
          <Section n={1} title="Finalidade e status legal">
            <p>Estes Termos de Uso regem o acesso e o uso das plataformas tecnológicas, interfaces, dashboards, sites e ferramentas de software relacionadas à execução, disponibilizadas no âmbito do grupo Polar Tensor.</p>
            <p>Estes Termos não substituem nenhum acordo cliente aplicável que reja custódia, pagamentos ou relações com entidades licenciadas.</p>
            <p>Ao acessar ou usar a Plataforma, você reconhece que leu, compreendeu e concorda em estar vinculado a estes Termos.</p>
          </Section>

          <Section n={2} title="Partes e escopo">
            <p>A Plataforma é operada e disponibilizada pelas seguintes entidades, atuando estritamente em seus respectivos papéis:</p>
            <ul className="list-disc pl-6">
              <li>Polar Tensor Corp. — operação da tecnologia de execução e infraestrutura de trading automatizado;</li>
              <li>Polar Tensor US LLC — acesso ao cliente para usuários dos EUA e não-UE;</li>
              <li>Polar Tensor Europe SP ZOO — acesso ao cliente para usuários da UE.</li>
            </ul>
            <p>Os direitos de acesso e a funcionalidade podem variar conforme a jurisdição e o status regulatório.</p>
          </Section>

          <Section n={3} title="Natureza da Plataforma">
            <p>A Plataforma fornece funcionalidade somente de tecnologia e execução, incluindo: acesso a ferramentas automatizadas de execução, exibição de informações da conta, iniciação de processos de execução por instrução explícita do usuário e conectividade técnica com locais de execução de terceiros.</p>
            <p>A Plataforma não fornece consultoria de investimento, gestão discricionária de portfólio nem recomendações personalizadas.</p>
          </Section>

          <Section n={4} title="Elegibilidade e acesso">
            <p>Você pode acessar e usar a Plataforma somente se: foi devidamente onboarded pela entidade licenciada aplicável, atende aos requisitos legais de elegibilidade em sua jurisdição e seu acesso não foi suspenso ou rescindido.</p>
            <p>O grupo se reserva o direito de restringir ou negar o acesso quando exigido por lei, regulamentação ou obrigações de conformidade.</p>
          </Section>

          <Section n={5} title="Controle e ativação pelo usuário">
            <p>A funcionalidade de execução automatizada: está inativa por padrão; requer ativação manual e explícita pelo usuário; pode ser desativada pelo usuário a qualquer momento, sujeito a restrições técnicas de processamento.</p>
            <p>Nenhuma execução ocorre sem iniciação do usuário.</p>
          </Section>

          <Section n={6} title="Caráter somente de execução">
            <p>Toda execução realizada pela Plataforma: é não discricionária; segue lógica de sistema pré-definida; não é adaptada a usuários individuais; é limitada a transações spot de criptoativos.</p>
            <p>Nenhum relacionamento fiduciário, consultivo ou discricionário é criado pelo uso da Plataforma.</p>
          </Section>

          <Section n={7} title="Obrigações do usuário">
            <p>Você concorda em: usar a Plataforma somente para fins lícitos; cumprir todas as leis e regulamentos aplicáveis; manter a confidencialidade das credenciais de acesso; monitorar a atividade associada à sua conta; notificar prontamente a entidade aplicável sobre qualquer acesso não autorizado ou incidente de segurança.</p>
          </Section>

          <Section n={8} title="Conduta proibida">
            <p>Você não deve: usar indevidamente ou interferir na Plataforma ou em sua operação; tentar acesso não autorizado a sistemas ou dados; fazer engenharia reversa ou contornar salvaguardas técnicas; usar a Plataforma para fins ilícitos ou abusivos; engajar-se em condutas que possam prejudicar a integridade ou a segurança da Plataforma.</p>
          </Section>

          <Section n={9} title="Disponibilidade e modificações">
            <p>A Plataforma é fornecida "no estado em que se encontra" e "conforme disponível". O grupo pode: modificar, suspender ou descontinuar funcionalidades; realizar manutenção ou atualizações; restringir acesso quando exigido por motivos legais, técnicos ou de segurança.</p>
            <p>Não há garantia de disponibilidade ininterrupta.</p>
          </Section>

          <Section n={10} title="Serviços de terceiros">
            <p>A Plataforma pode integrar-se ou conectar-se a serviços de terceiros, incluindo locais de execução e provedores de infraestrutura. O grupo não controla tais terceiros e não é responsável por suas ações, disponibilidade ou desempenho.</p>
          </Section>

          <Section n={11} title="Limitação de responsabilidade">
            <p>Na máxima extensão permitida por lei: nenhuma responsabilidade é aceita por perdas decorrentes de movimentos de mercado, atrasos de execução, interrupções do sistema ou falhas de terceiros; nenhuma responsabilidade é aceita por danos indiretos ou consequenciais; a responsabilidade é limitada conforme estabelecido no acordo cliente aplicável.</p>
            <p>Nada nestes Termos exclui responsabilidades que não possam ser excluídas pela lei aplicável.</p>
          </Section>

          <Section n={12} title="Propriedade intelectual">
            <p>Toda a propriedade intelectual associada à Plataforma permanece de propriedade do grupo Polar Tensor ou de seus licenciadores. O uso da Plataforma não transfere quaisquer direitos de propriedade ou propriedade intelectual.</p>
          </Section>

          <Section n={13} title="Suspensão e rescisão">
            <p>O acesso à Plataforma pode ser suspenso ou rescindido: por violação destes Termos; quando exigido por lei ou regulamentação; por motivos de segurança ou conformidade; após o término do relacionamento subjacente com o cliente.</p>
          </Section>

          <Section n={14} title="Lei aplicável e jurisdição">
            <p>Estes Termos são regidos pelas leis especificadas no acordo cliente aplicável, sem prejuízo das leis obrigatórias de proteção ao consumidor.</p>
          </Section>

          <Section n={15} title="Alterações">
            <p>Estes Termos podem ser atualizados periodicamente. O uso continuado da Plataforma constitui aceitação da versão mais atual.</p>
          </Section>
        </Card>
      </div>
    </section>

    <SiteFooter />
  </main>
);

export default Terms;
