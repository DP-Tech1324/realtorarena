
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Mail, Phone, Clock } from 'lucide-react';

const InquiriesManagement = () => {
  // Mock data for demonstration
  const inquiries = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john@example.com',
      phone: '(555) 123-4567',
      subject: 'Property Inquiry - 123 Main St',
      message: 'I am interested in viewing this property. When would be a good time?',
      date: '2024-01-15',
      status: 'New'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      phone: '(555) 987-6543',
      subject: 'Home Valuation Request',
      message: 'Could you provide a market evaluation for my home at 456 Oak Ave?',
      date: '2024-01-14',
      status: 'In Progress'
    },
    {
      id: 3,
      name: 'Mike Wilson',
      email: 'mike@example.com',
      phone: '(555) 555-0123',
      subject: 'Consultation Booking',
      message: 'I would like to schedule a consultation to discuss selling my property.',
      date: '2024-01-13',
      status: 'Resolved'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New':
        return 'bg-blue-100 text-blue-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'Resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-realtor-navy">Inquiries Management</h1>
        <p className="text-gray-600 mt-2">Manage customer inquiries and contact requests</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <MessageSquare className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Inquiries</p>
                <p className="text-2xl font-bold">{inquiries.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold">{inquiries.filter(i => i.status === 'New' || i.status === 'In Progress').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Mail className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Resolved</p>
                <p className="text-2xl font-bold">{inquiries.filter(i => i.status === 'Resolved').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Phone className="h-8 w-8 text-realtor-gold" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">This Week</p>
                <p className="text-2xl font-bold">2</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Inquiries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {inquiries.map((inquiry) => (
              <div key={inquiry.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{inquiry.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(inquiry.status)}`}>
                        {inquiry.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      <Mail className="w-4 h-4 inline mr-1" />
                      {inquiry.email}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      <Phone className="w-4 h-4 inline mr-1" />
                      {inquiry.phone}
                    </p>
                    <p className="font-medium text-realtor-navy mb-2">{inquiry.subject}</p>
                    <p className="text-gray-700 text-sm mb-3">{inquiry.message}</p>
                    <p className="text-xs text-gray-500">Received: {inquiry.date}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button size="sm" variant="outline">
                      Reply
                    </Button>
                    <Button size="sm" variant="outline">
                      Mark Resolved
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InquiriesManagement;
