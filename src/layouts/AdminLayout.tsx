
import React from 'react';
import { Outlet, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AdminSidebar from '@/components/AdminSidebar';
import { Button } from '@/components/ui/button';
import { LogOut, Menu, X } from 'lucide-react';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAdmin, userRole, signOut, user, isLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate('/auth');
  };

  // Show loading spinner while checking auth status
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-realtor-gold"></div>
      </div>
    );
  }

  // Redirect if not admin
  if (!isAdmin || !userRole || !['admin', 'superadmin', 'editor'].includes(userRole)) {
    return <Navigate to="/access-denied" state={{ from: location }} replace />;
  }

  return (
    <div className="min-h-screen flex bg-gray-50 w-full">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 flex-shrink-0">
        <AdminSidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/40" onClick={() => setSidebarOpen(false)}>
          <div className="bg-white w-64 h-full shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="font-semibold text-lg text-realtor-navy">Admin Panel</h2>
              <Button size="icon" variant="ghost" onClick={() => setSidebarOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <AdminSidebar />
          </div>
        </div>
      )}

      {/* Main content area */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Top header bar */}
        <header className="flex items-center justify-between p-4 border-b bg-white shadow-sm">
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <Button 
              size="icon" 
              variant="ghost" 
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-4 w-4" />
            </Button>
            
            <div className="text-sm text-gray-600">
              Welcome back, <span className="capitalize font-semibold text-realtor-navy">{userRole}</span>
              {user?.email && <span className="ml-2 text-gray-500">({user.email})</span>}
            </div>
          </div>

          {/* Logout button - only visible on mobile */}
          <Button 
            variant="outline" 
            onClick={handleLogout} 
            className="lg:hidden text-red-600 border-red-200 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </header>

        {/* Page content */}
        <section className="flex-1 p-6 overflow-auto bg-gray-50">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default AdminLayout;
