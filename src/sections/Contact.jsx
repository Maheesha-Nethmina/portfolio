import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
  return (
    <section id="contact" className="py-24">
      <SectionHeader title="Get In Touch" />
      
      <motion.div 
        className="text-center max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-lg text-slate-600 mb-8">
          I'm currently looking for new opportunities. Whether you have a question or just want to say hi, 
          my inbox is always open, and I'll get back to you!
        </p>
        
        <a 
          href="mailto:maheeshanethmina@gmail.com"
          className="inline-block bg-indigo-600 text-white font-bold 
                     text-lg px-8 py-4 rounded-lg shadow-lg 
                     hover:bg-indigo-700 transition-all duration-300
                     transform hover:scale-105"
        >
          Say Hello
        </a>

        <div className="flex justify-center space-x-8 mt-12">
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
          <motion.a
            href="mailto:maheeshanethmina@gmail.com"
            className="text-slate-600 hover:text-indigo-600"
            whileHover={{ scale: 1.2, y: -5 }}
            aria-label="Email"
          >
            <FaEnvelope size={30} />
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;