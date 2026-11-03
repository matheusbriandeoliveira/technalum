import { useEffect } from 'react'
import ScrollReveal from './ScrollReveal.jsx'
import './LegalPages.css'

const legalPages = {
  '/politica-de-privacidade.html': {
    title: 'Política de Privacidade',
    description:
      'Saiba como a TECHNALUM trata os dados pessoais compartilhados por meio de seus canais de contato.',
    sections: [
      {
        title: '1. Quem somos',
        paragraphs: [
          'A TECHNALUM Esquadrias e Fachadas, identificada neste site pelo CNPJ 04.023.900/0001-05, respeita a privacidade dos visitantes e trata dados pessoais de acordo com a legislação aplicável, incluindo a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 — LGPD).',
        ],
      },
      {
        title: '2. Dados que podem ser tratados',
        paragraphs: [
          'Este site não possui formulários de cadastro ou compra. Se você entrar em contato por telefone, e-mail ou por um link para um serviço externo, poderemos receber os dados que decidir compartilhar, como nome, telefone, endereço de e-mail e informações sobre seu projeto.',
          'Como ocorre em serviços web, o provedor de hospedagem pode registrar informações técnicas de acesso, como endereço IP, data e hora da requisição e dados do navegador, conforme sua própria configuração e política.',
        ],
      },
      {
        title: '3. Para que usamos os dados',
        paragraphs: [
          'Os dados compartilhados conosco são utilizados para responder a solicitações, prestar orientações, preparar ou acompanhar propostas e manter comunicações relacionadas ao atendimento solicitado.',
          'Não solicitamos dados pessoais sensíveis por meio deste site. Evite enviar informações dessa natureza pelos canais de contato.',
        ],
      },
      {
        title: '4. Compartilhamento e armazenamento',
        paragraphs: [
          'Os dados não são comercializados. Eles podem ser tratados por fornecedores que apoiem a operação dos canais de comunicação ou da infraestrutura do site, somente na medida necessária para esses serviços e conforme as obrigações aplicáveis.',
          'As informações são mantidas pelo período necessário para atender à solicitação, cumprir obrigações legais ou resguardar direitos. O prazo pode variar conforme o contexto do atendimento.',
        ],
      },
      {
        title: '5. Seus direitos',
        paragraphs: [
          'Nos termos da LGPD, você pode solicitar confirmação do tratamento, acesso, correção, anonimização, bloqueio ou eliminação de dados, além de outras providências previstas em lei. A aplicação de cada direito depende das circunstâncias e das obrigações legais vigentes.',
          'Para exercer seus direitos ou esclarecer dúvidas sobre privacidade, escreva para contato2@technalum.com.br.',
        ],
      },
      {
        title: '6. Links externos e atualizações',
        paragraphs: [
          'O site pode direcionar você a serviços de terceiros, como WhatsApp e Instagram. Ao acessá-los, o tratamento de dados passa a seguir também as políticas e os termos desses serviços.',
          'Esta política pode ser atualizada para refletir mudanças no site, nos serviços utilizados ou na legislação. A versão publicada nesta página é a vigente.',
        ],
      },
    ],
  },
  '/termos-de-uso.html': {
    title: 'Termos de Uso',
    description:
      'Condições para navegação e utilização do site da TECHNALUM Esquadrias e Fachadas.',
    sections: [
      {
        title: '1. Aceitação e finalidade',
        paragraphs: [
          'Ao acessar este site, você concorda com estes Termos de Uso. O site apresenta informações institucionais e exemplos das soluções da TECHNALUM Esquadrias e Fachadas.',
        ],
      },
      {
        title: '2. Informações sobre produtos e serviços',
        paragraphs: [
          'As descrições, imagens e demais conteúdos têm caráter informativo e podem apresentar exemplos de aplicações. Não constituem, por si só, proposta comercial, garantia de disponibilidade ou especificação final de um produto.',
          'Cada solução depende das características do imóvel, das medidas, dos materiais, das condições técnicas e do escopo acordado. Preços, prazos, especificações e condições de fornecimento são definidos em proposta própria.',
        ],
      },
      {
        title: '3. Uso adequado do site',
        paragraphs: [
          'Você se compromete a utilizar o site de forma lícita, sem tentar comprometer sua segurança, disponibilidade ou funcionamento, nem utilizar seus canais para enviar conteúdo ilícito, abusivo ou não solicitado.',
        ],
      },
      {
        title: '4. Propriedade intelectual',
        paragraphs: [
          'Os textos, marcas, logotipos, imagens e demais elementos disponibilizados pertencem à TECHNALUM ou são utilizados com autorização de seus respectivos titulares. A reprodução ou utilização para fins comerciais depende de autorização prévia, salvo quando permitida pela legislação.',
        ],
      },
      {
        title: '5. Disponibilidade e links de terceiros',
        paragraphs: [
          'Buscamos manter as informações atualizadas e o site disponível, mas não garantimos funcionamento ininterrupto ou ausência de erros. O acesso pode ser suspenso para manutenção ou por fatores alheios ao nosso controle.',
          'Links para serviços externos são oferecidos para conveniência. A TECHNALUM não controla o conteúdo, a disponibilidade ou as práticas desses serviços; seu uso está sujeito aos termos de cada terceiro.',
        ],
      },
      {
        title: '6. Alterações e contato',
        paragraphs: [
          'Estes termos podem ser atualizados a qualquer momento. A versão vigente é a publicada nesta página. Dúvidas podem ser encaminhadas para contato2@technalum.com.br.',
        ],
      },
    ],
  },
  '/politica-de-cookies.html': {
    title: 'Política de Cookies',
    description:
      'Informações sobre cookies e tecnologias semelhantes relacionadas ao site da TECHNALUM.',
    sections: [
      {
        title: '1. O que são cookies',
        paragraphs: [
          'Cookies são pequenos arquivos armazenados no navegador por um site. Eles podem ser usados, por exemplo, para manter funcionalidades, lembrar preferências ou medir audiência.',
        ],
      },
      {
        title: '2. Uso neste site',
        paragraphs: [
          'Na versão atual, o código do site não configura cookies próprios para publicidade, análise de audiência ou personalização, nem utiliza cookies para manter uma conta ou sessão de usuário.',
          'A infraestrutura de hospedagem e os serviços externos podem ter práticas técnicas próprias. Ao seguir links para WhatsApp, Instagram ou outros sites, você passa a interagir com esses serviços, que podem utilizar cookies conforme suas próprias políticas.',
        ],
      },
      {
        title: '3. Como gerenciar cookies',
        paragraphs: [
          'Você pode consultar, bloquear ou remover cookies nas configurações do navegador. O procedimento varia entre navegadores. O bloqueio de cookies de terceiros pode afetar recursos oferecidos diretamente por esses serviços externos.',
        ],
      },
      {
        title: '4. Atualizações e contato',
        paragraphs: [
          'Esta política será revisada caso o site passe a utilizar cookies ou tecnologias semelhantes de outras formas. Para dúvidas, entre em contato pelo e-mail contato2@technalum.com.br.',
        ],
      },
    ],
  },
}

const pageLinks = [
  { href: '/politica-de-privacidade.html', label: 'Política de Privacidade' },
  { href: '/termos-de-uso.html', label: 'Termos de Uso' },
  { href: '/politica-de-cookies.html', label: 'Política de Cookies' },
]

const currentPath = window.location.pathname.replace(/\/+$/, '') || '/'

export function LegalPage() {
  const page = legalPages[currentPath]

  useEffect(() => {
    document.title = page
      ? `${page.title} | TECHNALUM`
      : 'Página não encontrada | TECHNALUM'
  }, [page])

  if (!page) {
    return (
      <div className="legal-page">
        <main className="legal-main">
          <ScrollReveal as="p" className="legal-eyebrow">
            TECHNALUM
          </ScrollReveal>
          <ScrollReveal as="h1">Página não encontrada</ScrollReveal>
          <a className="legal-home-link" href="/">
            Voltar ao site
            <span aria-hidden="true">↗</span>
          </a>
        </main>
      </div>
    )
  }

  return (
    <div className="legal-page">
      <header className="legal-header">
        <a className="legal-brand" href="/" aria-label="TECHNALUM — página inicial">
          <img src="/logoSemFundo.png" alt="TECHNALUM" />
        </a>
        <a className="legal-home-link" href="/">
          Voltar ao site
          <span aria-hidden="true">↗</span>
        </a>
      </header>

      <main className="legal-main">
        <ScrollReveal as="p" className="legal-eyebrow">
          INFORMAÇÕES LEGAIS
        </ScrollReveal>
        <ScrollReveal as="h1">{page.title}</ScrollReveal>
        <ScrollReveal as="p" className="legal-intro">
          {page.description}
        </ScrollReveal>
        <ScrollReveal as="p" className="legal-updated">
          Última atualização: 3 de novembro de 2026
        </ScrollReveal>

        <div className="legal-content">
          {page.sections.map((section) => (
            <section className="legal-section" key={section.title}>
              <ScrollReveal as="h2">{section.title}</ScrollReveal>
              {section.paragraphs.map((paragraph) => (
                <ScrollReveal as="p" key={paragraph}>
                  {paragraph}
                </ScrollReveal>
              ))}
            </section>
          ))}
        </div>

        <nav className="legal-related" aria-label="Outras informações legais">
          {pageLinks
            .filter((link) => link.href !== currentPath)
            .map((link) => (
              <a href={link.href} key={link.href}>
                {link.label}
              </a>
            ))}
        </nav>
      </main>

      <footer className="legal-footer">
        <ScrollReveal as="span" amount={0.05}>
          © 2026 Technalum Esquadrias e Fachadas.
        </ScrollReveal>
        <ScrollReveal as="span" amount={0.05}>
          <a href="/">Página inicial</a>
        </ScrollReveal>
      </footer>
    </div>
  )
}
