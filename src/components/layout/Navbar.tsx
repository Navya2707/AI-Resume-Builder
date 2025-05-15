import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 text-primary-900 font-bold text-xl">
          <FileText className="h-6 w-6" />
          <span>ResumeAI</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLinks location={location} />
          <Link
            to="/builder"
            className="btn-primary py-2 px-4 rounded-md transition-colors duration-300"
          >
            Create Resume
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white fixed inset-0 pt-16 z-40 animate-fade-in">
          <div className="container mx-auto px-4 py-6 flex flex-col space-y-6">
            <MobileNavLinks location={location} toggleMenu={toggleMenu} />
            <Link
              to="/builder"
              className="btn-primary py-3 text-center rounded-md transition-colors duration-300"
              onClick={toggleMenu}
            >
              Create Resume
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

const NavLinks: React.FC<{ location: { pathname: string } }> = ({ location }) => {
  return (
    <>
      <Link
        to="/"
        className={`hover:text-primary-600 transition-colors ${
          location.pathname === '/' ? 'text-primary-600 font-medium' : 'text-gray-700'
        }`}
      >
        Home
      </Link>
      <Link
        to="/templates"
        className={`hover:text-primary-600 transition-colors ${
          location.pathname === '/templates' ? 'text-primary-600 font-medium' : 'text-gray-700'
        }`}
      >
        Templates
      </Link>
    </>
  );
};

const MobileNavLinks: React.FC<{ location: { pathname: string }; toggleMenu: () => void }> = ({
  location,
  toggleMenu,
}) => {
  return (
    <>
      <Link
        to="/"
        className={`text-lg py-3 border-b border-gray-200 ${
          location.pathname === '/' ? 'text-primary-600 font-medium' : 'text-gray-700'
        }`}
        onClick={toggleMenu}
      >
        Home
      </Link>
      <Link
        to="/templates"
        className={`text-lg py-3 border-b border-gray-200 ${
          location.pathname === '/templates' ? 'text-primary-600 font-medium' : 'text-gray-700'
        }`}
        onClick={toggleMenu}
      >
        Templates
      </Link>
    </>
  );
};

export default Navbar;