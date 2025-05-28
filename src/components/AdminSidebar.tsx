
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

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userRole, signOut } = useAuth();

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
    <aside className="w-64 bg-white shadow-lg border-r hidden lg:block">
      <div className="h-full p-4 space-y-6 flex flex-col">
        <div className="text-xl font-bold text-realtor-navy mb-4">Admin Menu</div>
        
        <ul className="space-y-2 flex-1">
          {links.map(({ to, label, icon: Icon, exact, roles }) => {
            if (!canAccessLink(roles)) return null;
            
            return (
              <li key={to}>
                <Link
                  to={to}
                  className={cn(
                    'flex items-center px-4 py-2 rounded-md text-sm font-medium hover:bg-realtor-gold/10 transition-colors',
                    isActive(to, exact)
                      ? 'bg-realtor-gold/20 text-realtor-navy font-semibold'
                      : 'text-gray-700'
                  )}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="border-t pt-4">
          <div className="text-xs text-gray-500 mb-2 px-4">
            Role: <span className="font-medium capitalize">{userRole}</span>
          </div>
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
