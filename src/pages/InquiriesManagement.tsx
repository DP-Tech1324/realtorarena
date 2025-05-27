
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Eye, Trash, CheckCircle } from 'lucide-react';

// Mock inquiries data
const mockInquiries = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john@example.com',
    phone: '(555) 123-4567',
    property: 'Luxury Villa on Main St',
    message: 'I am interested in viewing this property this weekend.',
    status: 'new',
    date: '2024-03-15'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '(555) 987-6543',
    property: 'Downtown Condo',
    message: 'Could you provide more information about the HOA fees?',
    status: 'contacted',
    date: '2024-03-14'
  },
  {
    id: 3,
    name: 'Mike Davis',
    email: 'mike@example.com',
    phone: '(555) 456-7890',
    property: 'Suburban House',
    message: 'Is this property still available for purchase?',
    status: 'closed',
    date: '2024-03-13'
  }
];

const InquiriesManagement = () => {
  const [inquiries, setInquiries] = useState(mockInquiries);
  const { toast } = useToast();

  const handleStatusChange = (id: number, newStatus: string) => {
    setInquiries(prev => prev.map(inquiry => 
      inquiry.id === id ? { ...inquiry, status: newStatus } : inquiry
    ));
    
    toast({
      title: "Status Updated",
      description: `Inquiry status changed to ${newStatus}`,
    });
  };

  const handleDelete = (id: number) => {
    setInquiries(prev => prev.filter(inquiry => inquiry.id !== id));
    
    toast({
      title: "Inquiry Deleted",
      description: "The inquiry has been permanently deleted.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-realtor-navy">Inquiries Management</h1>
        <p className="text-gray-600 mt-2">Manage and respond to customer inquiries</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-realtor-gold" /> 
            Customer Inquiries ({inquiries.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inquiries.map((inquiry) => (
                  <TableRow key={inquiry.id}>
                    <TableCell className="font-medium">{inquiry.name}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{inquiry.email}</div>
                        <div className="text-gray-500">{inquiry.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{inquiry.property}</TableCell>
                    <TableCell className="max-w-xs truncate">{inquiry.message}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(inquiry.status)}>
                        {inquiry.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{inquiry.date}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleStatusChange(inquiry.id, 'contacted')}
                          disabled={inquiry.status === 'contacted'}
                        >
                          <Eye className="h-4 w-4 text-blue-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleStatusChange(inquiry.id, 'closed')}
                          disabled={inquiry.status === 'closed'}
                        >
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(inquiry.id)}
                        >
                          <Trash className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InquiriesManagement;
