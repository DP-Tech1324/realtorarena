
import React from 'react';
import { Outlet, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, Menu, X, Home, Building, MessageSquare, Users, BarChart3, RefreshCw } from 'lucide-react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Link } from 'react-router-dom';

const ModernAdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAdmin, userRole, signOut, user, isLoading, refreshProfile } = useAuth();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate('/auth');
  };

  const handleRefreshProfile = async () => {
    setRefreshing(true);
    await refreshProfile();
    setTimeout(() => setRefreshing(false), 1000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/access-denied" state={{ from: location }} replace />;
  }

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/admin', active: location.pathname === '/admin' },
    { icon: Building, label: 'Properties', path: '/admin/properties', active: location.pathname === '/admin/properties' },
    { icon: MessageSquare, label: 'Inquiries', path: '/admin/inquiries', active: location.pathname === '/admin/inquiries' },
    ...(userRole === 'superadmin' ? [
      { icon: Users, label: 'Users', path: '/admin/users', active: location.pathname === '/admin/users' }
    ] : []),
    { icon: BarChart3, label: 'Analytics', path: '/admin/analytics', active: location.pathname === '/admin/analytics' },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
          </div>
          <div className="mt-8 flex-grow flex flex-col">
            <nav className="flex-1 px-2 space-y-2">
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                      item.active
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <IconComponent className={`mr-3 h-5 w-5 ${
                      item.active ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                    }`} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="flex-shrink-0 p-4 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={handleLogout}
                className="w-full text-red-600 border-red-200 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/40" onClick={() => setSidebarOpen(false)}>
          <div className="bg-white w-64 h-full shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="font-semibold text-lg text-gray-900">Admin Panel</h2>
              <Button size="icon" variant="ghost" onClick={() => setSidebarOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <nav className="p-2 space-y-2">
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                      item.active
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <IconComponent className={`mr-3 h-5 w-5 ${
                      item.active ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                    }`} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Top header */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-40">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <Button 
                size="icon" 
                variant="ghost" 
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              
              <div className="flex items-center gap-3">
                <div className="text-sm text-gray-600">
                  <span className="hidden sm:inline">Logged in as: </span>
                  <span className="capitalize font-semibold text-gray-900">{userRole}</span>
                </div>
                
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleRefreshProfile}
                  disabled={refreshing}
                  className="text-gray-500 hover:text-gray-700 p-1"
                >
                  <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                onClick={handleLogout} 
                size="sm"
                className="lg:hidden text-red-600 border-red-200 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-1" />
                <span className="hidden xs:inline">Logout</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ModernAdminLayout;
