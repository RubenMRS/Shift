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

function CurrentPage() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';

  if (path === '/privacidade') return <LegalPage type="privacy" />;
  if (path === '/termos') return <LegalPage type="terms" />;
  if (path !== '/') return <NotFound />;

  return (
    <>
      <Hero />
      <Services />
      <Process />
      <About />
      <Faq />
      <Contact />
    </>
  );
}

function App() {
  return (
    <SmoothScroll>
      <div className="min-h-[100dvh] overflow-x-clip bg-bg-primary text-text-primary">
        <a className="skip-link" href="#conteudo">Saltar para o conteúdo</a>
        <div className="site-texture" aria-hidden="true" />
        <Navbar />
        <main id="conteudo">
          <CurrentPage />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}

export default App;
