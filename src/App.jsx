import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Certifications from './sections/Certifications';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import About from './sections/About';
import SmoothScroll from './components/SmoothScroll';
import Preloader from './components/Preloader';
import ScrollProgress from './components/ScrollProgress';
import CursorGlow from './components/CursorGlow';
import BackToTop from './components/BackToTop';
import { ScrollTrigger } from '../src/lib/Gsap';

function App() {
  // Hero intro waits for the preloader curtain
  const [ready, setReady] = useState(false);

  // Re-measure trigger positions once fonts / images have settled
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
    return () => window.removeEventListener('load', refresh);
  }, []);

  return (
    <div className="relative min-h-screen bg-page text-ink font-sans transition-colors duration-300">
      <SmoothScroll />
      <Preloader onDone={() => setReady(true)} />
      <ScrollProgress />
      <CursorGlow />
      {/* Static decorative grid (the cursor-following glow lives in CursorGlow) */}
      <div aria-hidden="true" className="bg-grid pointer-events-none fixed inset-0 z-0" />

      <Navbar />
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero ready={ready} />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;