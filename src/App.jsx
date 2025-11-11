import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import About from './sections/About';

function App() {
  // --- DYNAMIC BACKGROUND LOGIC ---
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const dynamicBackgroundStyle = {
    background: `
      #f8fafc radial-gradient(
        800px at ${mousePos.x}px ${mousePos.y}px,
        rgba(165, 180, 252, 0.15), 
        rgba(56, 189, 248, 0.1), 
        transparent 60%
      )
    `
  };
  // --- END OF DYNAMIC BACKGROUND LOGIC ---

  return (
    <div 
      style={dynamicBackgroundStyle}
      className="min-h-screen text-slate-900 font-sans transition-colors duration-300"
    >
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;