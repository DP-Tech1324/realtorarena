
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Phone, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location]);

  return (
    <nav className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 
      ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className={`text-2xl font-bold ${isScrolled ? 'text-realtor-navy' : 'text-white'}`}>
              <span className="text-realtor-gold">Jigar </span>Patel
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`${isScrolled ? 'text-realtor-navy' : 'text-white'} hover:text-realtor-gold transition-colors duration-200`}
            >
              Home
            </Link>
            <Link 
              to="/listings" 
              className={`${isScrolled ? 'text-realtor-navy' : 'text-white'} hover:text-realtor-gold transition-colors duration-200`}
            >
              Listings
            </Link>
            <Link 
              to="/buyers" 
              className={`${isScrolled ? 'text-realtor-navy' : 'text-white'} hover:text-realtor-gold transition-colors duration-200`}
            >
              Buyers
            </Link>
            <Link 
              to="/sellers" 
              className={`${isScrolled ? 'text-realtor-navy' : 'text-white'} hover:text-realtor-gold transition-colors duration-200`}
            >
              Sellers
            </Link>
            <Link 
              to="/about" 
              className={`${isScrolled ? 'text-realtor-navy' : 'text-white'} hover:text-realtor-gold transition-colors duration-200`}
            >
              About
            </Link>
            <Link 
              to="/blog" 
              className={`${isScrolled ? 'text-realtor-navy' : 'text-white'} hover:text-realtor-gold transition-colors duration-200`}
            >
              Blog
            </Link>
            <Link 
              to="/contact" 
              className={`${isScrolled ? 'text-realtor-navy' : 'text-white'} hover:text-realtor-gold transition-colors duration-200`}
            >
              Contact
            </Link>
          </div>

          {/* Call to Action Button */}
          <div className="hidden md:flex items-center">
            <Button className={`flex items-center gap-2 
              ${isScrolled ? 
                'bg-realtor-gold hover:bg-realtor-gold/90 text-realtor-navy' : 
                'bg-white hover:bg-white/90 text-realtor-navy'}`}
            >
              <Phone size={16} />
              <span>(647) 555-1234</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMenu}
              className={isScrolled ? 'text-realtor-navy' : 'text-white'}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-lg animate-fade-in">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-realtor-navy hover:text-realtor-gold transition-colors duration-200 py-2 px-4"
            >
              Home
            </Link>
            <Link 
              to="/listings" 
              className="text-realtor-navy hover:text-realtor-gold transition-colors duration-200 py-2 px-4"
            >
              Listings
            </Link>
            <Link 
              to="/buyers" 
              className="text-realtor-navy hover:text-realtor-gold transition-colors duration-200 py-2 px-4"
            >
              Buyers
            </Link>
            <Link 
              to="/sellers" 
              className="text-realtor-navy hover:text-realtor-gold transition-colors duration-200 py-2 px-4"
            >
              Sellers
            </Link>
            <Link 
              to="/about" 
              className="text-realtor-navy hover:text-realtor-gold transition-colors duration-200 py-2 px-4"
            >
              About
            </Link>
            <Link 
              to="/blog" 
              className="text-realtor-navy hover:text-realtor-gold transition-colors duration-200 py-2 px-4"
            >
              Blog
            </Link>
            <Link 
              to="/contact" 
              className="text-realtor-navy hover:text-realtor-gold transition-colors duration-200 py-2 px-4"
            >
              Contact
            </Link>
            <Button className="flex items-center gap-2 bg-realtor-gold hover:bg-realtor-gold/90 text-realtor-navy mx-4">
              <Phone size={16} />
              <span>(647) 555-1234</span>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
