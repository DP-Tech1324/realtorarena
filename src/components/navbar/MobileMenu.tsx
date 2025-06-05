
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, LogOut, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import NavigationMenu from './NavigationMenu';
import { Separator } from '@/components/ui/separator';

interface MobileMenuProps {
  isOpen: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen }) => {
  const { isAdmin, userRole, user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/auth');
  };

  return (
    <nav
      className={cn(
        "fixed md:static top-[72px] left-0 w-full h-[calc(100vh-72px)] md:h-auto md:w-auto md:flex bg-white md:bg-transparent overflow-y-auto md:overflow-visible transition-transform duration-300 transform",
        isOpen ? "translate-x-0 shadow-lg" : "translate-x-full md:translate-x-0"
      )}
      aria-hidden={!isOpen}
      aria-label="Mobile navigation menu"
    >
      <div className="w-full flex flex-col h-full justify-between">
        <div>
          <NavigationMenu className="p-6 md:p-0" />

          {/* User info section for mobile */}
          {user && (
            <>
              <Separator className="mx-6" />
              <div className="px-6 py-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-realtor-navy text-white rounded-full flex items-center justify-center">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{user.email}</p>
                    {userRole && (
                      <p className="text-xs text-gray-500 capitalize">Role: {userRole}</p>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Action buttons at bottom */}
        <div className="p-6 border-t md:hidden space-y-3">
          <Button className="bg-realtor-gold hover:bg-realtor-gold/90 text-realtor-navy w-full" asChild>
            <Link to="/contact">Contact Agent</Link>
          </Button>

          {user ? (
            <div className="space-y-2">
              {isAdmin && (
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-realtor-gold text-realtor-gold hover:bg-realtor-gold hover:text-white"
                  onClick={() => navigate('/admin')}
                >
                  <Shield className="mr-2 h-4 w-4" />
                  Admin Dashboard
                </Button>
              )}
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          ) : (
            <Button 
              variant="outline" 
              onClick={handleLogin}
              className="w-full border-realtor-gold text-realtor-gold hover:bg-realtor-gold hover:text-white"
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MobileMenu;
