
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";

// For this simple implementation, we'll use local storage to track admin status
// In a real application, you would use a proper authentication system
const checkIsAdmin = (): boolean => {
  return localStorage.getItem('isAdmin') === 'true';
};

const AdminNav = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const isAdmin = checkIsAdmin();

  const handleManagePropertiesClick = (e: React.MouseEvent) => {
    if (!isAdmin) {
      e.preventDefault();
      toast({
        title: "Access Denied",
        description: "You need administrator privileges to access property management.",
        variant: "destructive",
      });
      
      // Optional: If you want to redirect to a login page
      // navigate('/admin-login');
    }
  };

  return (
    <div className="hidden md:flex space-x-4 items-center">
      <Button 
        variant="outline" 
        asChild={isAdmin} // Only make it a Link if the user is an admin
        className="text-realtor-gold border-realtor-gold hover:bg-realtor-gold/10"
        onClick={handleManagePropertiesClick}
      >
        {isAdmin ? (
          <Link to="/manage-properties">
            Property Management
          </Link>
        ) : (
          <span>Property Management</span>
        )}
      </Button>
    </div>
  );
};

export default AdminNav;
