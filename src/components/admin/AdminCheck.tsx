
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";

interface AdminCheckProps {
  children: React.ReactNode;
}

const AdminCheck = ({ children }: AdminCheckProps) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  // Check if user is admin
  useEffect(() => {
    const checkAdminStatus = () => {
      setIsAdmin(localStorage.getItem('isAdmin') === 'true');
      setIsLoading(false);
    };
    
    checkAdminStatus();
    
    // Listen for storage changes
    window.addEventListener('storage', checkAdminStatus);
    
    return () => {
      window.removeEventListener('storage', checkAdminStatus);
    };
  }, []);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-realtor-navy"></div>
      </div>
    );
  }

  // If not admin, redirect to homepage
  if (!isAdmin) {
    toast({
      title: "Access Denied",
      description: "You need administrator privileges to access this page.",
      variant: "destructive",
    });
    return <Navigate to="/admin" />;
  }
  
  // Return children if admin
  return <>{children}</>;
};

export default AdminCheck;
