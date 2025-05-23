
import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { 
  Building, 
  Upload, 
  Users, 
  MessageSquare, 
  BarChart3
} from 'lucide-react';
import AdminToggle from '@/components/AdminToggle';
import { useToast } from '@/components/ui/use-toast';
import AdminLogin from '@/components/AdminLogin';

const AdminPanel = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();
  
  // Check if user is admin
  useEffect(() => {
    const checkAdminStatus = () => {
      setIsAdmin(localStorage.getItem('isAdmin') === 'true');
    };
    
    checkAdminStatus();
    
    // Listen for storage changes
    window.addEventListener('storage', checkAdminStatus);
    
    return () => {
      window.removeEventListener('storage', checkAdminStatus);
    };
  }, []);

  const handleLoginSuccess = () => {
    setIsAdmin(true);
  };

  // If not admin, show login screen instead of redirecting
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-[72px]">
          <PageHeader 
            title="Administrator Panel" 
            subtitle="Login required to access administration features"
            showCta={false}
          />
          
          <section className="py-12">
            <div className="container mx-auto px-4">
              <AdminLogin onLoginSuccess={handleLoginSuccess} />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-[72px]">
        <PageHeader 
          title="Administrator Panel" 
          subtitle="Manage properties, users, and site content"
          showCta={false}
        />
        
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-2xl font-bold text-realtor-navy">Admin Controls</h2>
              <div className="flex items-center gap-4">
                <AdminToggle />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Property Management Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-realtor-gold" />
                    Property Management
                  </CardTitle>
                  <CardDescription>Add, edit, or remove properties</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Manage all property listings including details, images, and status.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full bg-realtor-navy hover:bg-realtor-navy/90">
                    <Link to="/manage-properties">Manage Properties</Link>
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Image Upload Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5 text-realtor-gold" />
                    Image Management
                  </CardTitle>
                  <CardDescription>Upload and manage property images</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Upload, organize, and delete images for properties and other content.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full bg-realtor-navy hover:bg-realtor-navy/90">
                    <Link to="/admin/images">Manage Images</Link>
                  </Button>
                </CardFooter>
              </Card>
              
              {/* User Management Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-realtor-gold" />
                    User Management
                  </CardTitle>
                  <CardDescription>Manage admin access and permissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Control which users have administrator privileges.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full bg-realtor-navy hover:bg-realtor-navy/90">
                    <Link to="/admin/users">Manage Users</Link>
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Inquiries Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-realtor-gold" />
                    Inquiries
                  </CardTitle>
                  <CardDescription>View and respond to contact requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Manage customer inquiries, contact form submissions and consultation requests.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full bg-realtor-navy hover:bg-realtor-navy/90">
                    <Link to="/admin/inquiries">View Inquiries</Link>
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Analytics Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-realtor-gold" />
                    Analytics
                  </CardTitle>
                  <CardDescription>View site performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Monitor site traffic, popular properties, and user engagement.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full bg-realtor-navy hover:bg-realtor-navy/90">
                    <Link to="/admin/analytics">View Analytics</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPanel;
