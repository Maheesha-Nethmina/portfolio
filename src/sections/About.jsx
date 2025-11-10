import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../components/SectionHeader'; // Re-using your header component

const About = () => {
  return (
    <section id="about" className="py-24">
      {/* Adds a consistent title */}
      <SectionHeader title="About Me" />
      
      <motion.div
        // A clean, single-column layout
        className="w-full max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
      >
        {/* This is your CV summary and goals combined into two paragraphs,
          using the dark-mode compatible text colors.
        */}
        <p className="text-lg text-secondary-text dark:text-dark-secondary-text mb-4">
          I'm a final-year Computer Science & Technology student passionate about developing scalable, efficient, and modern software solutions. My experience in software development and problem-solving is hands-on, especially in building full-stack applications using <b>Spring Boot</b>, <b>React</b>, and the <b>MERN stack</b>.
        </p>
        <p className="text-lg text-secondary-text dark:text-dark-secondary-text">
          I am actively seeking an internship where I can contribute and grow. I am excited by roles in <b className="text-primary-text dark:text-dark-primary-text">Software Engineering</b>, <b className="text-primary-text dark:text-dark-primary-text">Full-Stack Development</b>, and <b className="text-primary-text dark:text-dark-primary-text">Front-End Engineering</b>. My working knowledge of <b className="text-primary-text dark:text-dark-primary-text">AWS , Github Action</b> and <b className="text-primary-text dark:text-dark-primary-text">Docker</b> also fuels my strong interest in <b className="text-primary-text dark:text-dark-primary-text">DevOps</b>.
        </p>
      </motion.div>
    </section>
  );
};

export default About;