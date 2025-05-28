
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdminSidebar from '@/components/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Users, MessageSquare, BarChart3 } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-[72px]">
        <div className="flex">
          <AdminSidebar />
          <div className="flex-1 p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-realtor-navy">Admin Dashboard</h1>
              <p className="text-gray-600 mt-2">Welcome to your admin panel</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Building className="h-5 w-5 text-realtor-gold" /> 
                    Properties
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">98</div>
                  <p className="text-sm text-muted-foreground">Total listings</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="h-5 w-5 text-realtor-gold" /> 
                    Users
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">245</div>
                  <p className="text-sm text-muted-foreground">Registered users</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-realtor-gold" /> 
                    Inquiries
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">135</div>
                  <p className="text-sm text-muted-foreground">Total inquiries</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-realtor-gold" /> 
                    Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">3.5K</div>
                  <p className="text-sm text-muted-foreground">Monthly views</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
