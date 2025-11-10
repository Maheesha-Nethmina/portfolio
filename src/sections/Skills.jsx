import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { motion } from 'framer-motion';

// --- UPDATED IMPORTS ---
// Added FaHtml5 and FaCss3Alt
import { 
  FaJava, FaReact, FaNodeJs, FaPhp, FaPython, FaDocker, FaAws, FaGithub, FaFigma, FaBootstrap, FaHtml5, FaCss3Alt
} from 'react-icons/fa';

import { 
  SiJavascript, SiSpring, SiPostgresql, SiMysql, SiMongodb, SiTailwindcss, SiJira, SiPostman, SiCanva, SiGithubactions
} from 'react-icons/si';

// --- UPDATED SKILLS ARRAY ---
const skills = [
  { name: 'Java', icon: <FaJava /> },
  { name: 'Spring Boot', icon: <SiSpring /> },
  { name: 'React.js', icon: <FaReact /> },
  { name: 'JavaScript', icon: <SiJavascript /> },
  { name: 'HTML5', icon: <FaHtml5 /> }, // Added
  { name: 'CSS3', icon: <FaCss3Alt /> }, // Added
  { name: 'Node.js', icon: <FaNodeJs /> },
  { name: 'Python', icon: <FaPython /> },
  { name: 'PHP', icon: <FaPhp /> },
  { name: 'PostgreSQL', icon: <SiPostgresql /> },
  { name: 'MySQL', icon: <SiMysql /> },
  { name: 'MongoDB', icon: <SiMongodb /> },
  { name: 'AWS', icon: <FaAws /> },
  { name: 'Docker', icon: <FaDocker /> },
  { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
  { name: 'Bootstrap', icon: <FaBootstrap /> },
  { name: 'GitHub', icon: <FaGithub /> },
  { name: 'GitHub Actions', icon: <SiGithubactions /> },
  { name: 'Postman', icon: <SiPostman /> },
  { name: 'Jira', icon: <SiJira /> },
  { name: 'Figma', icon: <FaFigma /> },
  { name: 'Canva', icon: <SiCanva /> },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const Skills = () => {
  return (
    <section id="skills" className="py-24">
      <SectionHeader title="Technical Skills" />
      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {skills.map((skill) => (
          <motion.div
            key={skill.name}
            className="flex flex-col items-center justify-center p-4 
                       bg-white border border-slate-200 
                       rounded-lg shadow-lg"
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05, 
              backgroundColor: '#eef2ff', // This is bg-indigo-50
              boxShadow: '0 10px 20px -5px rgb(99 102 241 / 0.2)', 
            }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="text-5xl text-indigo-600 mb-2">{skill.icon}</div>
            <span className="text-sm font-medium text-slate-900">{skill.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;