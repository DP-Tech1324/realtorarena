
import React from 'react';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, Plus } from 'lucide-react';

const PropertyManagementHeader = () => {
  return (
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-2xl flex items-center gap-2">
        <Building className="h-5 w-5 text-realtor-gold" /> 
        Properties
      </CardTitle>
      <Button className="bg-realtor-navy hover:bg-realtor-navy/90">
        <Plus className="mr-2 h-4 w-4" />
        Add New Property
      </Button>
    </CardHeader>
  );
};

export default PropertyManagementHeader;
