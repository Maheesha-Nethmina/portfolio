import React from 'react';
import { motion } from 'framer-motion';

const SectionHeader = ({ title }) => {
  return (
    <motion.div 
      className="mb-12 text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-4xl font-bold text-slate-900 mb-4">{title}</h2>
      <div className="w-20 h-1 bg-indigo-600 mx-auto rounded-full"></div>
    </motion.div>
  );
};

export default SectionHeader;