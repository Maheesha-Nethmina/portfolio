import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Contact from './sections/Contact';
import Footer from './components/Footer';

function App() {
  // --- DYNAMIC BACKGROUND LOGIC ---
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  // This creates a radial gradient that follows the mouse
  // It's a soft, multi-colored light (indigo and sky blue)
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
    // We apply the dynamic style and the base classes
    <div 
      style={dynamicBackgroundStyle}
      className="min-h-screen text-slate-900 font-sans transition-colors duration-300"
    >
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero />
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