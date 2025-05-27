
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdminSidebar from '@/components/AdminSidebar';
import ImageManagement from '@/pages/ImageManagement';

const AdminImages = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-[72px]">
        <div className="flex">
          <AdminSidebar />
          <div className="flex-1">
            <div className="p-8">
              <ImageManagement />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminImages;
