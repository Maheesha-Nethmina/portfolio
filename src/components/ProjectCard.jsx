import React from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { SiFigma } from 'react-icons/si';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const ProjectCard = ({ project }) => {
  const { title, description, imageUrl, tags, github, figma, live } = project;

  return (
    <motion.div 
      className="flex flex-col rounded-lg shadow-xl overflow-hidden 
                 bg-white border border-slate-200"
      variants={cardVariants}
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      <img className="h-48 w-full object-cover" src={imageUrl} alt={title} />
      
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">{title}</h3>
          <p className="text-slate-600 mb-4">{description}</p>
        </div>
        
        <div>
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-full">
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex items-center space-x-4">
            {github && (
              <a 
                href={github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-slate-600 hover:text-indigo-600 transition-colors"
                aria-label="GitHub link"
              >
                <FaGithub size={24} />
              </a>
            )}
            {figma && (
              <a 
                href={figma} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-slate-600 hover:text-indigo-600 transition-colors"
                aria-label="Figma link"
              >
                <SiFigma size={24} />
              </a>
            )}
            {live && (
              <a 
                href={live} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-slate-600 hover:text-indigo-600 transition-colors"
                aria-label="Live demo link"
              >
                <FaExternalLinkAlt size={22} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;