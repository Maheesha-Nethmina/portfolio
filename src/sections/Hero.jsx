import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiDownload } from 'react-icons/hi';
import { motion } from 'framer-motion';
import profilePic from '../assets/profile-pic.jpg';

const Hero = () => {
  const roles = [
    'Software Engineer',
    'Full-Stack Developer',
    'Front-End Engineer',
  ];

  return (
    <section id="home" className="min-h-[calc(100vh-80px)] flex items-center py-16">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        
        <motion.div
          className="md:w-3/5 text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-semibold text-slate-900 mb-2">
            Hi, I'm
          </h2>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-4">
            Maheesha Nethmina.
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-600 mb-6">
            {' '}
            <span className="text-indigo-600">
              <Typewriter
                words={roles}
                loop={true}
                cursor
                cursorStyle='|'
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-xl mx-auto md:mx-0 mb-8">
            Final-year Computer Science and Technology undergraduate passionate about building modern, scalable, and user-focused software solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6">
            {/* --- DOWNLOAD CV BUTTON --- */}
            <motion.a
              href="/Professional Modern CV Resume.pdf"
              download="Maheesha_Nethmina_CV.pdf"
              className="inline-flex items-center gap-2 bg-indigo-600 text-white font-bold
                         text-lg px-8 py-4 rounded-lg shadow-lg
                         hover:bg-indigo-700 transition-all duration-300
                         transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
            >
              <HiDownload className="h-5 w-5" />
              Download CV
            </motion.a>
            
            {/* Social Links */}
            <div className="flex justify-center md:justify-start space-x-6">
              <motion.a
                href="https://github.com/Maheesha-Nethmina"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-indigo-600"
                whileHover={{ scale: 1.2, y: -5 }}
                aria-label="GitHub"
              >
                <FaGithub size={30} />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/maheesha-nethmina/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-indigo-600"
                whileHover={{ scale: 1.2, y: -5 }}
                aria-label="LinkedIn"
              >
                <FaLinkedin size={30} />
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* --- IMAGE (No Changes) --- */}
        <motion.div
          className="md:w-2/5 flex justify-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden
                          border-4 border-indigo-500/10 shadow-xl
                          hover:border-indigo-500/30 transition-all duration-300">
            <img 
              src={profilePic}
              alt="Maheesha Nethmina" 
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;