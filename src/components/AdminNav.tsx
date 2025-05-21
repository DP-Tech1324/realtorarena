
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AdminNav = () => {
  return (
    <div className="hidden md:flex space-x-4 items-center">
      <Button variant="outline" asChild className="text-realtor-gold border-realtor-gold hover:bg-realtor-gold/10">
        <Link to="/manage-properties">
          Property Management
        </Link>
      </Button>
    </div>
  );
};

export default AdminNav;
