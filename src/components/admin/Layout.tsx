import React from 'react';
import Sidebar from './Sidebar';

const AdminLayout = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-semibold mb-4">{title}</h1>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
