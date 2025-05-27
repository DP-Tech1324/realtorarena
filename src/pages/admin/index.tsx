import React from 'react';
import AdminLayout from '@/components/admin/Layout';
import StatCard from '@/components/admin/StatCard';

const AdminDashboard = () => {
  return (
    <AdminLayout title="Dashboard Overview">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Total Properties" value="128" />
        <StatCard label="Inquiries Today" value="12" />
        <StatCard label="Pending Listings" value="3" />
        <StatCard label="Storage Used" value="64 MB" />
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
