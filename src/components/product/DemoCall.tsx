import { useRef, useState } from 'react';
import { trackEvent } from '../../lib/analytics';
import { Section } from '../sections/Section';

type DemoCallProps = { audioSrc?: string; transcript?: string; context?: 'hero' | 'smart-call' };
const bars = [8, 18, 32, 24, 14, 38, 50, 28, 42, 20, 36, 54, 30, 18, 46, 34, 12, 28, 48, 22, 38, 16, 30, 10];
const time = (value: number) => `${Math.floor(value / 60)}:${String(Math.floor(value % 60)).padStart(2, '0')}`;

export function DemoCall({ audioSrc, transcript, context = 'hero' }: DemoCallProps) {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [error, setError] = useState('');
  const toggle = async () => {
    if (!audio.current) return;
    if (playing) { audio.current.pause(); return; }
    try { await audio.current.play(); } catch { setError('Não foi possível reproduzir. Pede uma demonstração à equipa.'); }
  };
  return (
    <Section id="demo" className="border-y border-border bg-bg-surface">
      <div className="page-shell grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div>
          <p className="eyebrow">Smart Call · Demonstração</p>
          <h2 className="text-section">Ouve o atendimento.<br />Percebe o fluxo.</h2>
          <p className="mt-6 text-lead text-text-secondary">Uma demonstração ajuda a avaliar as respostas, as pausas e o encaminhamento de um pedido no teu negócio.</p>
        </div>
        <div className="product-panel">
          <div className="flex items-center justify-between gap-4">
            <p className="font-semibold">{audioSrc ? 'Exemplo de chamada' : 'Demo em breve'}</p>
            <span className="text-sm text-text-secondary">{duration ? time(duration) : 'Áudio ainda não disponível'}</span>
          </div>
          <div className="my-8 flex h-16 items-center justify-center gap-1.5" aria-hidden="true">
            {bars.map((height, index) => <span key={index} className={`w-1.5 rounded-full bg-signal/70 ${playing ? 'voice-bar' : ''}`} style={{ height, animationDelay: `${index * -55}ms` }} />)}
          </div>
          {audioSrc ? <>
            <audio ref={audio} src={audioSrc} preload="none" onLoadedMetadata={() => setDuration(Number.isFinite(audio.current?.duration) ? audio.current!.duration : 0)} onTimeUpdate={() => setElapsed(audio.current?.currentTime ?? 0)} onPlay={() => { setPlaying(true); trackEvent(context === 'hero' ? 'hero_demo_play' : 'smart_call_demo_play'); }} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} onError={() => setError('Áudio indisponível. Contacta-nos para uma demonstração.')} />
            <button className="text-link" type="button" onClick={toggle}>{playing ? 'Pausar chamada' : 'Reproduzir chamada'}</button>
            <span className="ml-4 text-sm tabular-nums text-text-secondary">{time(elapsed)} / {time(duration)}</span>
            {transcript && <details className="mt-5"><summary className="cursor-pointer py-3">Ler transcrição</summary><p className="leading-7 text-text-secondary">{transcript}</p></details>}
          </> : <>
            <p className="text-sm leading-7 text-text-secondary">Estamos a preparar um exemplo público. Entretanto, podes pedir uma demonstração adaptada à tua operação.</p>
            <a className="text-link mt-4" href="#contacto">Marcar demonstração <span aria-hidden="true">↗</span></a>
          </>}
          {error && <p role="alert" className="mt-3 text-sm text-error">{error}</p>}
        </div>
      </div>
    </Section>
  );
}
