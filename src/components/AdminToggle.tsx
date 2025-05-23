
import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';

const AdminToggle = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    
    toast({
      title: "Logged Out",
      description: "You have been logged out of admin mode.",
    });
    
    // Force page reload to update UI state
    navigate('/');
  };

  return (
    <Button 
      onClick={handleLogout}
      className="bg-red-600 hover:bg-red-700"
    >
      Logout
    </Button>
  );
};

export default AdminToggle;
