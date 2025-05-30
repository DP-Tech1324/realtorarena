import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdminSidebar from '@/components/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Users, MessageSquare, BarChart3 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    properties: 0,
    users: 0,
    inquiries: 0,
    views: 3500, // Static for now
  });

  useEffect(() => {
    const fetchCounts = async () => {
      const [properties, users, inquiries] = await Promise.all([
        supabase.from('listings').select('id', { count: 'exact', head: true }),
        supabase.from('admin_users').select('id', { count: 'exact', head: true }),
        supabase.from('inquiries').select('id', { count: 'exact', head: true }),
      ]);

      setStats({
        properties: properties.count ?? 0,
        users: users.count ?? 0,
        inquiries: inquiries.count ?? 0,
        views: 3500, // mock value
      });
    };

    fetchCounts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-[72px]">
        <div className="flex">
          <AdminSidebar />
          <div className="flex-1 p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-realtor-navy">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome to your admin panel</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link to="/admin/properties">
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Building className="h-5 w-5 text-realtor-gold" />
                      Properties
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{stats.properties}</div>
                    <p className="text-sm text-muted-foreground">Total listings</p>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/admin/users">
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Users className="h-5 w-5 text-realtor-gold" />
                      Users
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{stats.users}</div>
                    <p className="text-sm text-muted-foreground">Registered users</p>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/admin/inquiries">
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-realtor-gold" />
                      Inquiries
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{stats.inquiries}</div>
                    <p className="text-sm text-muted-foreground">Total inquiries</p>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/admin/analytics">
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-realtor-gold" />
                      Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{stats.views.toLocaleString()}</div>
                    <p className="text-sm text-muted-foreground">Monthly views</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
