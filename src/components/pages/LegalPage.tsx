import { PageMeta } from './PageMeta';

type LegalPageProps = {
  type: 'privacy' | 'terms';
};

const privacySections = [
  {
    title: '1. Responsável pelo tratamento',
    paragraphs: [
      'A SHIFT AI Solutions é responsável pelo tratamento dos dados pessoais recolhidos neste website. Para questões sobre privacidade, usa geral@shiftai.pt.',
    ],
  },
  {
    title: '2. Dados recolhidos e finalidade',
    paragraphs: [
      'No formulário de contacto recolhemos nome, email profissional, empresa quando indicada, mensagem e dados técnicos necessários para prevenir abuso.',
      'Usamos estes dados apenas para analisar e responder ao pedido, preparar uma demonstração e proteger o formulário contra submissões automáticas.',
    ],
  },
  {
    title: '3. Fundamento jurídico',
    paragraphs: [
      'Tratamos os dados necessários para responder a pedidos feitos pelo próprio utilizador e para diligências pré-contratuais. A prevenção de fraude e abuso assenta no interesse legítimo de proteger o website.',
    ],
  },
  {
    title: '4. Fornecedores e transferências',
    paragraphs: [
      'O alojamento e os serviços técnicos podem tratar dados por conta da SHIFT. O formulário usa hCaptcha para distinguir pessoas de sistemas automáticos; este serviço pode receber endereço IP e dados técnicos do dispositivo.',
      'Quando um fornecedor trata dados fora do Espaço Económico Europeu, exigimos um mecanismo de transferência reconhecido e salvaguardas adequadas.',
    ],
  },
  {
    title: '5. Conservação',
    paragraphs: [
      'Conservamos pedidos de contacto durante o tempo necessário para responder e acompanhar a oportunidade, até 12 meses após o último contacto, salvo obrigação legal ou relação contratual posterior.',
    ],
  },
  {
    title: '6. Direitos',
    paragraphs: [
      'Podes pedir acesso, retificação, apagamento, limitação, oposição ou portabilidade, quando aplicável, através de geral@shiftai.pt. Também podes apresentar reclamação à Comissão Nacional de Proteção de Dados.',
    ],
  },
  {
    title: '7. Cookies e serviços externos',
    paragraphs: [
      'O website não usa cookies de analítica ou publicidade. O hCaptcha pode usar tecnologia estritamente necessária à segurança do formulário. Se adicionarmos medição não essencial, pediremos consentimento antes da ativação.',
    ],
  },
];

const termsSections = [
  {
    title: '1. Âmbito',
    paragraphs: [
      'Estes termos regulam o uso do website da SHIFT AI Solutions. O conteúdo apresenta soluções e permite pedir contacto ou demonstração; não constitui proposta contratual vinculativa.',
    ],
  },
  {
    title: '2. Utilização do website',
    paragraphs: [
      'Não uses o website para enviar conteúdo ilícito, abusivo, malicioso ou dados pessoais de terceiros sem fundamento. Não tentes contornar medidas de segurança nem prejudicar o funcionamento do serviço.',
    ],
  },
  {
    title: '3. Informação e disponibilidade',
    paragraphs: [
      'Procuramos manter a informação correta e o website disponível, mas podemos atualizar conteúdo, funcionalidades ou disponibilidade. Condições específicas de cada projeto são definidas numa proposta ou contrato próprio.',
    ],
  },
  {
    title: '4. Propriedade intelectual',
    paragraphs: [
      'Marca, logótipo, textos, elementos visuais e código próprio pertencem à SHIFT ou aos respetivos titulares. Não podem ser reutilizados comercialmente sem autorização.',
    ],
  },
  {
    title: '5. Ligações externas',
    paragraphs: [
      'Ligações para serviços externos seguem os termos e políticas desses serviços. A SHIFT não controla o conteúdo nem a disponibilidade de websites de terceiros.',
    ],
  },
  {
    title: '6. Lei aplicável e contacto',
    paragraphs: [
      'Aplica-se a lei portuguesa, sem prejuízo de normas imperativas. Para questões sobre estes termos, escreve para geral@shiftai.pt.',
    ],
  },
];

export function LegalPage({ type }: LegalPageProps) {
  const privacy = type === 'privacy';
  const title = privacy ? 'Política de Privacidade' : 'Termos de utilização';
  const description = privacy
    ? 'Como a SHIFT AI Solutions recolhe, utiliza e protege dados pessoais.'
    : 'Condições de utilização do website da SHIFT AI Solutions.';
  const sections = privacy ? privacySections : termsSections;

  return (
    <>
      <PageMeta
        title={`${title} — SHIFT AI SOLUTIONS`}
        description={description}
        path={privacy ? '/privacidade' : '/termos'}
      />
      <section className="legal-page">
        <div className="page-shell">
          <a href="/" className="legal-back">Voltar ao início</a>
          <div className="mt-12 grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <header>
              <p className="mb-5 text-sm font-semibold text-signal">Informação legal</p>
              <h1 className="text-section max-w-[11ch]">{title}</h1>
              <p className="mt-6 text-sm text-text-muted">Última atualização: 4 de setembro de 2026</p>
            </header>

            <div className="legal-copy">
              {sections.map((section) => (
                <section key={section.title}>
                  <h2>{section.title}</h2>
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {privacy && section.title.startsWith('4.') && (
                    <p>
                      Consulta também a <a href="https://www.hcaptcha.com/privacy" target="_blank" rel="noreferrer">política de privacidade do hCaptcha</a>.
                    </p>
                  )}
                  {privacy && section.title.startsWith('6.') && (
                    <p>
                      Consulta a <a href="https://www.cnpd.pt/" target="_blank" rel="noreferrer">Comissão Nacional de Proteção de Dados</a>.
                    </p>
                  )}
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
