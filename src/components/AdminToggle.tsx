
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";

const AdminToggle = () => {
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Check admin status on component mount
  useEffect(() => {
    setIsAdmin(localStorage.getItem('isAdmin') === 'true');
  }, []);

  const toggleAdminStatus = () => {
    const newStatus = !isAdmin;
    localStorage.setItem('isAdmin', String(newStatus));
    setIsAdmin(newStatus);
    
    toast({
      title: newStatus ? "Admin Mode Activated" : "Admin Mode Deactivated",
      description: newStatus 
        ? "You now have access to property management." 
        : "You no longer have access to property management.",
    });
  };

  return (
    <Button 
      onClick={toggleAdminStatus}
      className={isAdmin ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
    >
      {isAdmin ? "Disable Admin Mode" : "Enable Admin Mode"}
    </Button>
  );
};

export default AdminToggle;
