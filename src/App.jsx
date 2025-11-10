import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion'; // 1. Import AnimatePresence
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import Loader from './components/Loader'; // 2. Import your new Loader

function App() {
  // 3. Add loading state
  const [isLoading, setIsLoading] = useState(true);

  // 4. Simulate a load time
  useEffect(() => {
    // Set a timer for 2 seconds (2000 milliseconds)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // <-- You can change this duration

    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []); // Empty array means this runs only once on mount

  return (
    // 5. Use AnimatePresence to handle the exit animation
    <AnimatePresence>
      {isLoading ? (
        // Show the loader while isLoading is true
        <Loader key="loader" />
      ) : (
        // Show your main app content when loading is false
        <div 
          key="main-app"
          className="min-h-screen bg-background text-primary-text dark:bg-dark-background dark:text-dark-primary-text font-sans transition-colors duration-300"
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
      )}
    </AnimatePresence>
  );
}

export default App;