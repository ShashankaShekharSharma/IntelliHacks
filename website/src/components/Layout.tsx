import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ParticleBackground from './ParticleBackground';
import { useTheme } from '../contexts/ThemeContext';

const Layout: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <ParticleBackground />
      <Navbar />
      <main className="flex-grow z-10 relative">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;