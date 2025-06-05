
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileMenu from './navbar/MobileMenu';
import NavigationMenu from './navbar/NavigationMenu';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const adminRoles = ['admin', 'superadmin', 'editor'];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, userRole, signOut, isAdmin } = useAuth();

  // Don't render navbar on admin routes since AdminLayout handles navigation
  const isAdminRoute = location.pathname.startsWith('/admin');
  if (isAdminRoute) {
    return null;
  }

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/auth');
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full h-[72px] z-50 flex items-center transition-colors duration-300',
        isScrolled || isOpen ? 'bg-white shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-realtor-navy font-bold text-xl lg:text-2xl hover:text-realtor-gold transition-colors z-10"
        >
          <span className="text-realtor-gold">Jigar</span> Patel
        </Link>

        {/* Desktop Navigation - hidden on mobile */}
        <div className="hidden md:flex items-center justify-center flex-1">
          <NavigationMenu />
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          {/* Contact button - always visible on desktop */}
          <Button 
            className="hidden md:flex bg-realtor-gold hover:bg-realtor-gold/90 text-realtor-navy"
            asChild
          >
            <Link to="/contact">Contact Agent</Link>
          </Button>

          {/* User menu or login button */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarFallback className="bg-realtor-navy text-white">
                    {user.email?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5 text-sm text-gray-700">
                  <p className="font-medium">{user.email}</p>
                  {userRole && (
                    <p className="text-xs text-gray-500 capitalize">Role: {userRole}</p>
                  )}
                </div>
                <DropdownMenuSeparator />
                
                {isAdmin && (
                  <>
                    <DropdownMenuItem onClick={() => navigate('/admin')}>
                      <Shield className="mr-2 h-4 w-4" />
                      Admin Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              variant="outline" 
              onClick={handleLogin}
              className="hidden md:flex border-realtor-gold text-realtor-gold hover:bg-realtor-gold hover:text-white"
            >
              Login
            </Button>
          )}

          {/* Mobile menu toggle */}
          <button
            className="z-20 block md:hidden text-realtor-navy focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isOpen} />
    </header>
  );
};

export default Navbar;
