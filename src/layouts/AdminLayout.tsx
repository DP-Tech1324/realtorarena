
import React from 'react';
import { Outlet, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AdminSidebar from '@/components/AdminSidebar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAdmin, userRole, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate('/auth');
  };

  if (!isAdmin) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-grow pt-[72px]">
        <AdminSidebar />
        <main className="flex-grow bg-gray-50 p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-gray-600">
              Logged in as: <span className="font-medium capitalize">{userRole}</span>
            </div>
            <Button variant="outline" onClick={handleLogout} className="text-red-600 border-red-200 hover:bg-red-50">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;
