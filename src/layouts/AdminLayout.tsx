import React from 'react';
import { Outlet, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AdminSidebar from '@/components/AdminSidebar';
import { Button } from '@/components/ui/button';
import { LogOut, Menu } from 'lucide-react';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAdmin, userRole, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate('/auth');
  };

  if (!isAdmin) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar for desktop, overlay for mobile */}
      <div className="hidden lg:block">
        <AdminSidebar />
      </div>
      <div className="lg:hidden fixed top-0 left-0 z-40">
        <Button size="icon" variant="ghost" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Menu />
        </Button>
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/40 z-50" onClick={() => setSidebarOpen(false)}>
            <div className="bg-white w-64 h-full shadow-xl p-2" onClick={e => e.stopPropagation()}>
              <AdminSidebar />
            </div>
          </div>
        )}
      </div>
      {/* Main content */}
      <main className="flex-1 flex flex-col min-h-screen">
        <header className="flex items-center justify-between p-4 border-b bg-white">
          <div className="text-xs text-gray-500">
            Logged in as: <span className="capitalize font-semibold">{userRole}</span>
          </div>
          <Button variant="outline" onClick={handleLogout} className="text-red-600 border-red-200 hover:bg-red-50">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </header>
        <section className="flex-1 p-6">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default AdminLayout;
