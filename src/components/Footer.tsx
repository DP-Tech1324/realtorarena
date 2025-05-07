
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-realtor-navy text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-6">
              <span className="text-realtor-gold">Luxury</span> Realty
            </h3>
            <p className="text-white/80 mb-6">
              We specialize in luxury real estate, helping clients find their dream homes and investment properties in the most desirable locations.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-realtor-gold transition-colors duration-200">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-realtor-gold transition-colors duration-200">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-realtor-gold transition-colors duration-200">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-realtor-gold transition-colors duration-200">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-white/80 hover:text-realtor-gold transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/properties" className="text-white/80 hover:text-realtor-gold transition-colors duration-200">
                  Properties
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-white/80 hover:text-realtor-gold transition-colors duration-200">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/agents" className="text-white/80 hover:text-realtor-gold transition-colors duration-200">
                  Our Team
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/80 hover:text-realtor-gold transition-colors duration-200">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Property Categories */}
          <div>
            <h4 className="text-lg font-bold mb-6">Property Categories</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/80 hover:text-realtor-gold transition-colors duration-200">
                  Luxury Homes
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-realtor-gold transition-colors duration-200">
                  Waterfront Properties
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-realtor-gold transition-colors duration-200">
                  Urban Condos
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-realtor-gold transition-colors duration-200">
                  New Developments
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-realtor-gold transition-colors duration-200">
                  Investment Properties
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 className="text-lg font-bold mb-6">Newsletter</h4>
            <p className="text-white/80 mb-4">
              Subscribe to our newsletter for the latest property listings and real estate news.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 rounded-l-md w-full focus:outline-none text-gray-800"
                required
              />
              <button
                type="submit"
                className="bg-realtor-gold text-realtor-navy px-4 py-2 rounded-r-md font-medium hover:bg-realtor-gold/90 transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Footer Bar */}
      <div className="bg-realtor-navy border-t border-white/10 py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <p className="text-white/80 text-sm">
            &copy; {new Date().getFullYear()} Luxury Realty. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-white/80 hover:text-realtor-gold text-sm transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-white/80 hover:text-realtor-gold text-sm transition-colors duration-200">
              Terms of Service
            </a>
            <a href="#" className="text-white/80 hover:text-realtor-gold text-sm transition-colors duration-200">
              Disclaimer
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
