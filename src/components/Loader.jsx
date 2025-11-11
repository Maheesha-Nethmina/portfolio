import React from 'react';
import { motion } from 'framer-motion';

// --- Animation for the spinning loader ---
const loaderVariants = {
  animation: {
    rotate: 360,
    borderRadius: ["50% 50%", "50% 50%", "2% 50%"], 
    
    transition: {
      rotate: {
        duration: 1.5,
        ease: "linear",
        repeat: Infinity,
      },
      borderRadius: {
        duration: 1.5,
        ease: "easeInOut",
        repeat: Infinity,
      }
    },
  },
};


const containerVariants = {
  hidden: { 
    opacity: 0,
    transition: { duration: 0.5 }
  },
  visible: { 
    opacity: 1,
    transition: { duration: 0.3 }
  },
};

const Loader = () => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center 
                 bg-background dark:bg-dark-background"
      variants={containerVariants}
      initial="visible"
      animate="visible"
      exit="hidden" 
      
    >
      <motion.div
        className="w-16 h-16 border-4 border-accent dark:border-indigo-400"
        variants={loaderVariants}
        animate="animation"
      />
    </motion.div>
  );
};

export default Loader;