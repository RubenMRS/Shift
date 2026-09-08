import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { Services } from './components/sections/Services';
import { Process } from './components/sections/Process';
import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';
import { Faq } from './components/sections/Faq';
import { Footer } from './components/layout/Footer';
import { SmoothScroll } from './components/layout/SmoothScroll';
import { LegalPage } from './components/pages/LegalPage';
import { NotFound } from './components/pages/NotFound';
import { PageMeta } from './components/pages/PageMeta';
import { normalizePath, routeMeta } from './data/routes';
import { DemoCall } from './components/product/DemoCall';
import { CaseStudy } from './components/product/CaseStudy';
import { MotionLayer } from './components/layout/MotionLayer';

function CurrentPage({ path }: { path: string }) {
  if (path === '/privacidade') return <LegalPage type="privacy" />;
  if (path === '/termos') return <LegalPage type="terms" />;
  if (path !== '/') return <NotFound />;

  return (
    <>
      <Hero />
      <DemoCall />
      <Services />
      <CaseStudy />
      <Process />
      <About />
      <Faq />
      <Contact />
    </>
  );
}

function App({ path = '/' }: { path?: string }) {
  path = normalizePath(path);
  const meta = routeMeta(path);
  return (
    <SmoothScroll>
      <PageMeta {...meta} noIndex={meta.path === '/404'} />
      <div className="min-h-[100dvh] overflow-x-clip bg-bg-primary text-text-primary">
        <MotionLayer />
        <a className="skip-link" href="#conteudo">Saltar para o conteúdo</a>
        <div className="site-texture" aria-hidden="true" />
        <Navbar />
        <main id="conteudo" tabIndex={-1}>
          <CurrentPage path={path} />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}

export default App;
