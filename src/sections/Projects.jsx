import React from 'react';
import SectionHeader from '../components/SectionHeader';
import ProjectCard from '../components/ProjectCard';
import { motion } from 'framer-motion';

// --- Make sure these paths are correct! ---
import imgWildfire from '../assets/project-wildfire.jpeg';
import imgFurniQ from '../assets/project-furniq.jpeg';
import imgCoralStay from '../assets/project-coralstay.webp';
import imgLifeLine from '../assets/project-lifeline.webp';
import imgExploreX from '../assets/project-explorex.webp';
import imgTravelGuide from '../assets/project-travelguide.webp';

// All project data from your CV
const projectsData = [
  {
    title: 'Multivariate Anomaly Detection (Wildfire)',
    description: 'Ongoing research using LSTM and Vision Transformers for early wildfire detection and stage classification.',
    imageUrl: imgWildfire,
    tags: ['Machine Learning', 'LSTM', 'Vision Transformer', 'Python'],
    github: '', // Add link if available
    live: '',
  },
  {
    title: 'FurniQ - Online Furniture Store',
    description: 'Full-stack online furniture store with responsive interfaces and backend services.',
    imageUrl: imgFurniQ,
    tags: ['Spring Boot', 'React', 'PostgreSQL', 'Full-Stack'],
    github: 'https://github.com/Maheesha-Nethmina/FurniQ_forntend',
    figma: 'figma/furniQ', // Replace with full figma link
  },
  {
    title: 'CoralStay - Booking Platform',
    description: 'MERN stack web app for booking hotel rooms and coral reef tours, featuring a virtual reef and admin panel.',
    imageUrl: imgCoralStay,
    tags: ['MERN', 'React', 'Node.js', 'MongoDB', 'Full-Stack'],
    github: 'https://github.com/Maheesha-Nethmina/Coral-Stay_Frontend',
    figma: 'figma/CoralStay', // Replace with full figma link
  },
  {
    title: 'ExploreX - Frontend Web App',
    description: 'Responsive, mobile-friendly frontend project with component-based architecture and smooth navigation.',
    imageUrl: imgExploreX,
    tags: ['React', 'CSS', 'Frontend', 'Figma'],
    github: 'https://github.com/Maheesha-Nethmina/Explore-X',
    figma: 'figma/ExploreX', // Replace with full figma link
  },
  {
    title: 'LifeLine - Donation System',
    description: 'A full-stack system for verified medical donations, ensuring transparency and volunteer engagement.',
    imageUrl: imgLifeLine,
    tags: ['PHP', 'MySQL', 'HTML', 'CSS', 'Bootstrap'],
    github: 'https://github.com/Maheesha-Nethmina/Life-Line',
  },
  {
    title: 'TravelGuide - Booking System',
    description: 'Team project for a RAD module. Implemented booking, auth, and admin features.',
    imageUrl: imgTravelGuide,
    tags: ['Java', 'JSP', 'Servlets', 'MySQL'],
    github: 'https://github.com/Maheesha-Nethmina/Travel Guide',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const Projects = () => {
  return (
    <section id="projects" className="py-24">
      <SectionHeader title="Projects" />
      <motion.div 
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {projectsData.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </motion.div>
    </section>
  );
};

export default Projects;