
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import PropertyTable from '@/components/property/PropertyTable';
import PropertyManagementHeader from '@/components/property/PropertyManagementHeader';
import AdminCheck from '@/components/admin/AdminCheck';
import { usePropertyManagement } from '@/hooks/usePropertyManagement';

const PropertyManagement = () => {
  const { properties, isLoading, handleDeleteProperty } = usePropertyManagement();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-[72px]">
        <PageHeader 
          title="Property Management" 
          subtitle="Add, edit, and remove property listings"
          showCta={false}
        />
        
        <div className="container mx-auto px-4 py-12">
          <AdminCheck>
            <Card>
              <PropertyManagementHeader />
              <CardContent>
                <PropertyTable 
                  properties={properties} 
                  isLoading={isLoading}
                  onDeleteProperty={handleDeleteProperty}
                />
              </CardContent>
            </Card>
          </AdminCheck>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PropertyManagement;
