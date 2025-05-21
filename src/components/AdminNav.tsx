
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";

const AdminNav = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Check admin status on component mount and when localStorage changes
  useEffect(() => {
    const checkAdminStatus = () => {
      setIsAdmin(localStorage.getItem('isAdmin') === 'true');
    };
    
    // Initial check
    checkAdminStatus();
    
    // Listen for storage changes (in case AdminToggle component changes it)
    window.addEventListener('storage', checkAdminStatus);
    
    return () => {
      window.removeEventListener('storage', checkAdminStatus);
    };
  }, []);

  const handleManagePropertiesClick = (e: React.MouseEvent) => {
    if (!isAdmin) {
      e.preventDefault();
      toast({
        title: "Access Denied",
        description: "You need administrator privileges to access property management.",
        variant: "destructive",
      });
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
