import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ShowMenu from './buttons/menu';

const NavLink = ({ to, children }) => {
  return (
    <Link 
      to={to}
      className="relative px-4 py-2 group text-lg font-medium text-white transition-colors duration-200 hover:text-purple-200"
    >
      {children}
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-200 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
    </Link>
  );
};

const MobileMenuItem = ({ to, children }) => (
  <Link
    to={to}
    className="w-full px-4 py-3 text-white hover:bg-white/10 transition-colors duration-200 rounded-lg"
  >
    {children}
  </Link>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-gray-900/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/" 
            className="flex items-center space-x-3 group"
          >
            <img 
              src="/assets/images/logo.svg" 
              alt="Logo" 
              className="h-8 w-auto transform transition-transform duration-300 group-hover:scale-110" 
            />
            <span className="text-2xl font-bold text-white">
              VolunteersIITJ
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            <NavLink to="/">Forms</NavLink>
            <NavLink to="/advertiserDashboard">Dashboard</NavLink>
            <NavLink to="/makeAdvertisement">Make Ad</NavLink>
            <NavLink to="/">News</NavLink>
            <NavLink to="/contactus">Contact Us</NavLink>
            <NavLink to="/aboutus">About Us</NavLink>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors duration-200"
          >
            <ShowMenu />
          </button>
        </div>

        <div className={`md:hidden transform transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900/95 rounded-lg shadow-xl mt-2">
            <MobileMenuItem to="/">Forms</MobileMenuItem>
            <MobileMenuItem to="/advertiserDashboard">Dashboard</MobileMenuItem>
            <MobileMenuItem to="/makeAdvertisement">Make Ad</MobileMenuItem>
            <MobileMenuItem to="/">News</MobileMenuItem>
            <MobileMenuItem to="/contactus">Contact Us</MobileMenuItem>
            <MobileMenuItem to="/aboutus">About Us</MobileMenuItem>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;