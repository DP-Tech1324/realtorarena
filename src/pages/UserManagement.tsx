
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, UserPlus, Shield, ShieldOff, Trash } from 'lucide-react';

// Mock user data - in a real app, this would come from your database
const mockUsers = [
  { id: 1, username: 'admin', email: 'admin@example.com', role: 'Admin', dateAdded: '2024-01-15' },
  { id: 2, username: 'paul', email: 'paul@example.com', role: 'Admin', dateAdded: '2024-02-10' },
  { id: 3, username: 'sarah', email: 'sarah@example.com', role: 'Editor', dateAdded: '2024-03-05' },
  { id: 4, username: 'john', email: 'john@example.com', role: 'Viewer', dateAdded: '2024-04-20' }
];

const UserManagement = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState(mockUsers);
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

  // If not admin, redirect to homepage
  if (!isAdmin) {
    toast({
      title: "Access Denied",
      description: "You need administrator privileges to access this page.",
      variant: "destructive",
    });
    return <Navigate to="/admin" />;
  }
  
  const handleDeleteUser = (userId: number) => {
    // Filter out the user with the specified ID
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    
    toast({
      title: "User Deleted",
      description: "The user has been successfully removed."
    });
  };
  
  const handleToggleAdmin = (userId: number) => {
    // Map through users and toggle admin status for the specified user
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        const newRole = user.role === 'Admin' ? 'Viewer' : 'Admin';
        return { ...user, role: newRole };
      }
      return user;
    });
    
    setUsers(updatedUsers);
    
    const user = users.find(user => user.id === userId);
    const action = user?.role === 'Admin' ? 'removed from' : 'added to';
    
    toast({
      title: "Role Updated",
      description: `${user?.username} has been ${action} admin role.`
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-[72px]">
        <PageHeader 
          title="User Management" 
          subtitle="Manage users and permissions"
          showCta={false}
        />
        
        <div className="container mx-auto px-4 py-12">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-realtor-gold" /> 
                Users and Permissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-end mb-4">
                <Button className="bg-realtor-navy hover:bg-realtor-navy/90">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add New User
                </Button>
              </div>
              
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Username</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Date Added</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.username}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.role === 'Admin' 
                              ? 'bg-green-100 text-green-800' 
                              : user.role === 'Editor'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {user.role}
                          </span>
                        </TableCell>
                        <TableCell>{user.dateAdded}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleToggleAdmin(user.id)}
                            className="mr-1"
                          >
                            {user.role === 'Admin' ? (
                              <ShieldOff className="h-4 w-4 text-amber-600" />
                            ) : (
                              <Shield className="h-4 w-4 text-green-600" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            <Trash className="h-4 w-4 text-red-600" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserManagement;
