const steps = ['Cliente liga', 'Smart Call atende', 'Percebe o pedido', 'Consulta disponibilidade', 'Cria marcação', 'Confirma ao cliente'];
export function CallFlow() {
  return <div className="mt-8">
    <ol className="call-flow">{steps.map((step, i) => <li key={step}><span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span><p>{step}</p></li>)}</ol>
    <p className="mt-5 text-sm leading-7 text-text-secondary">Fluxo ilustrativo de agendamento. Consulta, criação e confirmação dependem da integração e das regras validadas para cada projeto.</p>
  </div>;
}
