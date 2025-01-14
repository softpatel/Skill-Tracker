import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-indigo-900 border-t border-indigo-800 py-4">
      <div className="container mx-auto px-4 text-center text-indigo-200">
        <p>© {new Date().getFullYear()} SkillTracker. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;