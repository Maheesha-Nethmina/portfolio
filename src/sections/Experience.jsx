import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { motion } from 'framer-motion';
import { FaAws, FaDocker, FaReact, FaAward } from 'react-icons/fa'; 
import { SiSpring } from 'react-icons/si'; 



const certifications = [
  { 
    name: 'Spring 6: Spring Security', 
    platform: 'LinkedIn', 
    icon: <SiSpring />, 
    url: 'https://www.linkedin.com/learning/certificates/925dc1bf75f7a5fa908b9324712e2bea65b309e25fe04781e1ddf20c01d50918' 
  },
  { 
    name: 'Spring Boot 3 Essential Training', 
    platform: 'LinkedIn', 
    icon: <SiSpring />, 
    url: 'https://www.linkedin.com/learning/certificates/1acc841964aec30558d68e91d2731346f23438be226a4b49027217a1eae17987' 
  },
  { 
    name: 'Advanced React', 
    platform: 'Meta (Coursera)', 
    icon: <FaReact />, 
    url: 'https://www.coursera.org/account/accomplishments/verify/141L0ZZTHZHX' 
    
  },
  { 
    name: 'AWS Cloud Practitioner Essentials', 
    platform: 'Amazon (Coursera)', 
    icon: <FaAws />, 
    url: 'https://www.coursera.org/account/accomplishments/verify/2IKIIQTS27FB' 
    
  },
  { 
    name: 'Docker Foundations Professional Certificate', 
    platform: 'LinkedIn', 
    icon: <FaDocker />, 
    url: 'https://www.linkedin.com/learning/certificates/a3057ebb2e9543441777ae891e9d52dce528883e2ea9644f9c3b603bad344183' 
  },
  { 
    name: 'Introduction to DevOps', 
    platform: 'IBM (Coursera)', 
    icon: <FaAward />, 
    url: 'https://www.coursera.org/account/accomplishments/verify/W8OTV9G0RYSS' 
    
  }
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
        className="w-full max-w-4xl mx-auto" 
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certifications.map((cert, index) => (
            
            <motion.a
              key={index}
              href={cert.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center bg-white border border-slate-200 p-4 rounded-lg shadow-lg"
              whileHover={{ scale: 1.03, backgroundColor: '#eef2ff' }} 
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <div className="text-3xl text-indigo-600 mr-4">{cert.icon}</div>
              <div>
                <h4 className="text-lg font-semibold text-slate-900">{cert.name}</h4>
                <p className="text-sm text-slate-600">{cert.platform}</p>
              </div>
            </motion.a>

          ))}
        </div>
      </motion.div>

    </section>
  );
};

export default Experience;