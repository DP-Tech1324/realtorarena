
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";
import { ShieldCheck, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const AdminNav = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isAdmin, signOut } = useAuth();

  const handleAdminPanelClick = (e: React.MouseEvent) => {
    if (!isAdmin) {
      e.preventDefault();
      toast({
        title: "Access Denied",
        description: "You need administrator privileges to access the admin panel.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="hidden md:flex space-x-4 items-center">
      {isAdmin && (
        <Button 
          variant="outline" 
          onClick={handleLogout}
          className="text-red-500 border-red-500 hover:bg-red-500/10"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      )}
      
      <Button 
        variant="outline" 
        asChild={isAdmin} // Only make it a Link if the user is an admin
        className="text-realtor-gold border-realtor-gold hover:bg-realtor-gold/10"
        onClick={handleAdminPanelClick}
      >
        {isAdmin ? (
          <Link to="/admin">
            <ShieldCheck className="mr-2 h-4 w-4" />
            Admin Panel
          </Link>
        ) : (
          <Link to="/auth">
            <ShieldCheck className="mr-2 h-4 w-4" />
            Admin Login
          </Link>
        )}
      </Button>
    </div>
  );
};

export default AdminNav;
