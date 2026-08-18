import React from 'react';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { Services } from './components/sections/Services';
import { Process } from './components/sections/Process';
import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/layout/Footer';

import { SmoothScroll } from './components/layout/SmoothScroll';

function App() {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-bg-primary text-text-primary selection:bg-signal/30 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Process />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
    </SmoothScroll>
  );
}

export default App;
