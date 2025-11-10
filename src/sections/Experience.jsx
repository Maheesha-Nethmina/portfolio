import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { motion } from 'framer-motion';
import { FaAws, FaDocker, FaReact, FaAward } from 'react-icons/fa'; 
import { SiSpring } from 'react-icons/si'; 

const certifications = [
  { name: 'Spring 6: Spring Security', platform: 'LinkedIn', icon: <SiSpring /> },
  { name: 'Spring Boot 3 Essential Training', platform: 'LinkedIn', icon: <SiSpring /> },
  { name: 'Advanced React', platform: 'Meta (Coursera)', icon: <FaReact /> },
  { name: 'AWS Cloud Practitioner Essentials', platform: 'Amazon (Coursera)', icon: <FaAws /> },
  { name: 'Docker Foundations Professional Certificate', platform: 'LinkedIn', icon: <FaDocker /> },
  { name: 'Introduction to DevOps', platform: 'IBM (Coursera)', icon: <FaAward /> }, 
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const Experience = () => {
  return (
    <section id="experience" className="py-24">
      <SectionHeader title="Certifications" />
      
      <motion.div 
        className="w-full max-w-2xl mx-auto"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="space-y-4">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              className="flex items-center bg-white border border-slate-200 p-4 rounded-lg shadow-lg"
              whileHover={{ scale: 1.03, backgroundColor: '#eef2ff' }} // bg-indigo-50
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <div className="text-3xl text-indigo-600 mr-4">{cert.icon}</div>
              <div>
                <h4 className="text-lg font-semibold text-slate-900">{cert.name}</h4>
                <p className="text-sm text-slate-600">{cert.platform}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

    </section>
  );
};

export default Experience;