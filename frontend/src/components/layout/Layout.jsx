import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-indigo-950">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-gradient-to-b from-indigo-900 to-indigo-950 rounded-lg p-8 shadow-xl">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;