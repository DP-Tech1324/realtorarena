
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Phone, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-realtor-navy">
              <span className="text-realtor-gold">Luxury</span> Realty
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-realtor-navy hover:text-realtor-gold transition-colors duration-200">
              Home
            </Link>
            <Link to="/properties" className="text-realtor-navy hover:text-realtor-gold transition-colors duration-200">
              Properties
            </Link>
            <Link to="/services" className="text-realtor-navy hover:text-realtor-gold transition-colors duration-200">
              Services
            </Link>
            <Link to="/agents" className="text-realtor-navy hover:text-realtor-gold transition-colors duration-200">
              Our Team
            </Link>
            <Link to="/contact" className="text-realtor-navy hover:text-realtor-gold transition-colors duration-200">
              Contact
            </Link>
          </div>

          {/* Call to Action Button */}
          <div className="hidden md:flex items-center">
            <Button className="flex items-center gap-2 bg-realtor-navy hover:bg-realtor-navy/90 text-white">
              <Phone size={16} />
              <span>(555) 123-4567</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMenu}
              className="text-realtor-navy"
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
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link 
              to="/properties" 
              className="text-realtor-navy hover:text-realtor-gold transition-colors duration-200 py-2 px-4"
              onClick={toggleMenu}
            >
              Properties
            </Link>
            <Link 
              to="/services" 
              className="text-realtor-navy hover:text-realtor-gold transition-colors duration-200 py-2 px-4"
              onClick={toggleMenu}
            >
              Services
            </Link>
            <Link 
              to="/agents" 
              className="text-realtor-navy hover:text-realtor-gold transition-colors duration-200 py-2 px-4"
              onClick={toggleMenu}
            >
              Our Team
            </Link>
            <Link 
              to="/contact" 
              className="text-realtor-navy hover:text-realtor-gold transition-colors duration-200 py-2 px-4"
              onClick={toggleMenu}
            >
              Contact
            </Link>
            <Button className="flex items-center gap-2 bg-realtor-navy hover:bg-realtor-navy/90 text-white mx-4">
              <Phone size={16} />
              <span>(555) 123-4567</span>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
