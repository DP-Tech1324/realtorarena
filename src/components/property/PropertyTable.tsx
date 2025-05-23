
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { PenSquare, Trash } from 'lucide-react';
import { Property } from '@/types/Property';

interface PropertyTableProps {
  properties: Property[];
  isLoading: boolean;
  onDeleteProperty: (id: string) => void;
}

const PropertyTable = ({ properties, isLoading, onDeleteProperty }: PropertyTableProps) => {
  // Format price with commas
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-realtor-navy"></div>
      </div>
    );
  }

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {properties.map((property) => (
            <TableRow key={property.id}>
              <TableCell className="font-medium">{property.title}</TableCell>
              <TableCell>{`${property.address}, ${property.city}`}</TableCell>
              <TableCell>${formatPrice(property.price)}</TableCell>
              <TableCell>
                <span className="capitalize">{property.propertyType}</span>
              </TableCell>
              <TableCell>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  property.status === 'for-sale' 
                    ? 'bg-green-100 text-green-800' 
                    : property.status === 'sold'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {property.status === 'for-sale' ? 'For Sale' : 
                   property.status === 'for-rent' ? 'For Rent' :
                   property.status === 'sold' ? 'Sold' : 'Pending'}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  className="mr-1"
                >
                  <PenSquare className="h-4 w-4 text-amber-600" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDeleteProperty(property.id)}
                >
                  <Trash className="h-4 w-4 text-red-600" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PropertyTable;
