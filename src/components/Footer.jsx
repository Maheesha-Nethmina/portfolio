import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-50 py-6 mt-16 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-slate-600 text-sm">
          Designed & Built by Maheesha Nethmina
        </p>
        <p className="text-slate-600 text-sm mt-1">
          &copy; {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;