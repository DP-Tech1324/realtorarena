
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Home,
  Building,
  Users,
  Upload,
  MessageSquare,
  BarChart3,
  Megaphone,
  LogOut
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, userRole, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate('/auth');
  };

  const links = [
    { to: '/admin', label: 'Dashboard', icon: Home, exact: true, roles: ['admin', 'superadmin', 'editor'] },
    { to: '/admin/properties', label: 'Properties', icon: Building, roles: ['admin', 'superadmin', 'editor'] },
    { to: '/admin/images', label: 'Images', icon: Upload, roles: ['admin', 'superadmin', 'editor'] },
    { to: '/admin/inquiries', label: 'Inquiries', icon: MessageSquare, roles: ['admin', 'superadmin', 'editor'] },
    { to: '/admin/users', label: 'Users', icon: Users, roles: ['superadmin'] },
    { to: '/admin/analytics', label: 'Analytics', icon: BarChart3, roles: ['admin', 'superadmin'] },
    { to: '/admin/marketing', label: 'Marketing', icon: Megaphone, roles: ['admin', 'superadmin'] },
  ];

  const isActive = (linkTo: string, exact?: boolean) => {
    if (exact) {
      return location.pathname === linkTo;
    }
    return location.pathname.startsWith(linkTo);
  };

  const canAccessLink = (linkRoles: string[]) => {
    return userRole && linkRoles.includes(userRole);
  };

  return (
    <aside className="w-64 bg-white shadow-lg border-r h-full flex flex-col">
      <div className="p-4 space-y-6 flex flex-col h-full">
        {/* Header with avatar and role */}
        <div className="flex flex-col items-center space-y-3 pt-2">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-realtor-gold text-white text-lg font-semibold">
              {user?.email?.charAt(0).toUpperCase() ?? 'A'}
            </AvatarFallback>
          </Avatar>
          <div className="text-center">
            <div className="text-sm font-semibold text-gray-900 capitalize">
              {userRole}
            </div>
            {user?.email && (
              <div className="text-xs text-gray-500 mt-1">
                {user.email}
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Navigation Links */}
        <nav className="flex-1">
          <ul className="space-y-2">
            {links.map(({ to, label, icon: Icon, exact, roles }) => {
              if (!canAccessLink(roles)) return null;

              return (
                <li key={to}>
                  <Link
                    to={to}
                    className={cn(
                      'flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150',
                      isActive(to, exact)
                        ? 'bg-realtor-gold/20 text-realtor-navy font-semibold border-l-4 border-realtor-gold'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-realtor-navy'
                    )}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout Button - Only visible on desktop */}
        <div className="border-t pt-4 hidden lg:block">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
