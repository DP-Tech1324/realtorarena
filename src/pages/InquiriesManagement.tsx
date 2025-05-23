
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import { useToast } from "@/components/ui/use-toast";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  MessageSquare, 
  Calendar, 
  Check, 
  X, 
  Eye 
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

// Mock contact form submissions
const mockContactRequests = [
  { id: '1', name: 'James Wilson', email: 'james@example.com', message: 'I\'m interested in buying property in the downtown area. Can you provide more information about current listings?', date: '2024-05-20', status: 'Unread' },
  { id: '2', name: 'Jennifer Lopez', email: 'jennifer@example.com', message: 'I would like to schedule a showing for the luxury villa on Oak Street.', date: '2024-05-18', status: 'Read' },
  { id: '3', name: 'Robert Johnson', email: 'robert@example.com', message: 'Can you send me more details about your selling process?', date: '2024-05-15', status: 'Replied' },
  { id: '4', name: 'Mary Smith', email: 'mary@example.com', message: 'I have some questions about the property at 456 Queen Street.', date: '2024-05-10', status: 'Read' },
];

// Mock consultation requests
const mockConsultations = [
  { id: '1', name: 'Michael Brown', email: 'michael@example.com', phone: '555-123-4567', propertyId: '2', date: '2024-06-01', time: '10:00 AM', message: 'I want to discuss selling my current home and buying a new one.', consultationType: 'Selling', status: 'Scheduled' },
  { id: '2', name: 'Emma Davis', email: 'emma@example.com', phone: '555-234-5678', propertyId: '3', date: '2024-05-28', time: '2:30 PM', message: 'Looking for advice on mortgage options.', consultationType: 'Buying', status: 'Pending' },
  { id: '3', name: 'David Garcia', email: 'david@example.com', phone: '555-345-6789', propertyId: null, date: '2024-05-26', time: '1:00 PM', message: 'Need guidance on first-time home buying.', consultationType: 'Buying', status: 'Completed' },
  { id: '4', name: 'Lisa Taylor', email: 'lisa@example.com', phone: '555-456-7890', propertyId: '1', date: '2024-05-25', time: '4:00 PM', message: 'Want to discuss investment property options.', consultationType: 'Investment', status: 'Cancelled' },
];

const InquiriesManagement = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [contactRequests, setContactRequests] = useState(mockContactRequests);
  const [consultations, setConsultations] = useState(mockConsultations);
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  
  // Check if user is admin
  useEffect(() => {
    const checkAdminStatus = () => {
      setIsAdmin(localStorage.getItem('isAdmin') === 'true');
    };
    
    checkAdminStatus();
    
    // Listen for storage changes
    window.addEventListener('storage', checkAdminStatus);
    
    return () => {
      window.removeEventListener('storage', checkAdminStatus);
    };
  }, []);

  // If not admin, redirect to homepage
  if (!isAdmin) {
    toast({
      title: "Access Denied",
      description: "You need administrator privileges to access this page.",
      variant: "destructive",
    });
    return <Navigate to="/admin" />;
  }
  
  const handleMarkAsRead = (id: string) => {
    const updatedRequests = contactRequests.map(request => 
      request.id === id ? { ...request, status: 'Read' } : request
    );
    setContactRequests(updatedRequests);
    toast({
      title: "Status Updated",
      description: "Inquiry marked as read."
    });
  };
  
  const handleUpdateConsultationStatus = (id: string, status: string) => {
    const updatedConsultations = consultations.map(consultation => 
      consultation.id === id ? { ...consultation, status } : consultation
    );
    setConsultations(updatedConsultations);
    toast({
      title: "Status Updated",
      description: `Consultation marked as ${status.toLowerCase()}.`
    });
  };
  
  const handleViewDetails = (item: any, type: 'contact' | 'consultation') => {
    setSelectedInquiry({ ...item, type });
    setIsDialogOpen(true);
  };
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Unread': return 'bg-red-100 text-red-800';
      case 'Read': return 'bg-blue-100 text-blue-800';
      case 'Replied': return 'bg-green-100 text-green-800';
      case 'Scheduled': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-teal-100 text-teal-800';
      case 'Cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-[72px]">
        <PageHeader 
          title="Inquiries Management" 
          subtitle="Manage contact form submissions and consultation requests"
          showCta={false}
        />
        
        <div className="container mx-auto px-4 py-12">
          <Tabs defaultValue="contacts" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="contacts" className="flex items-center">
                <MessageSquare className="mr-2 h-4 w-4" /> Contact Requests
              </TabsTrigger>
              <TabsTrigger value="consultations" className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" /> Consultation Requests
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="contacts">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Form Submissions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {contactRequests.map((request) => (
                          <TableRow key={request.id}>
                            <TableCell className="font-medium">{request.name}</TableCell>
                            <TableCell>{request.email}</TableCell>
                            <TableCell>{request.date}</TableCell>
                            <TableCell>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                                {request.status}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleViewDetails(request, 'contact')}
                                className="mr-1"
                              >
                                <Eye className="h-4 w-4 text-blue-600" />
                              </Button>
                              {request.status === 'Unread' && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleMarkAsRead(request.id)}
                                >
                                  <Check className="h-4 w-4 text-green-600" />
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="consultations">
              <Card>
                <CardHeader>
                  <CardTitle>Consultation Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {consultations.map((consultation) => (
                          <TableRow key={consultation.id}>
                            <TableCell className="font-medium">{consultation.name}</TableCell>
                            <TableCell>{consultation.consultationType}</TableCell>
                            <TableCell>{consultation.date}</TableCell>
                            <TableCell>{consultation.time}</TableCell>
                            <TableCell>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(consultation.status)}`}>
                                {consultation.status}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleViewDetails(consultation, 'consultation')}
                                className="mr-1"
                              >
                                <Eye className="h-4 w-4 text-blue-600" />
                              </Button>
                              
                              {consultation.status === 'Pending' && (
                                <>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleUpdateConsultationStatus(consultation.id, 'Scheduled')}
                                    className="mr-1"
                                  >
                                    <Check className="h-4 w-4 text-green-600" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleUpdateConsultationStatus(consultation.id, 'Cancelled')}
                                  >
                                    <X className="h-4 w-4 text-red-600" />
                                  </Button>
                                </>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {selectedInquiry?.type === 'contact' ? 'Contact Request Details' : 'Consultation Request Details'}
              </DialogTitle>
              <DialogDescription>
                Submitted on {selectedInquiry?.date}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Name</h3>
                <p>{selectedInquiry?.name}</p>
              </div>
              
              <div>
                <h3 className="font-semibold">Email</h3>
                <p>{selectedInquiry?.email}</p>
              </div>
              
              {selectedInquiry?.type === 'consultation' && (
                <>
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p>{selectedInquiry?.phone}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold">Appointment</h3>
                    <p>{selectedInquiry?.date} at {selectedInquiry?.time}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold">Consultation Type</h3>
                    <p>{selectedInquiry?.consultationType}</p>
                  </div>
                </>
              )}
              
              <div>
                <h3 className="font-semibold">Message</h3>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedInquiry?.message}</p>
              </div>
              
              <div>
                <h3 className="font-semibold">Status</h3>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  selectedInquiry && getStatusColor(selectedInquiry.status)
                }`}>
                  {selectedInquiry?.status}
                </span>
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-4">
              {selectedInquiry?.type === 'contact' && selectedInquiry?.status === 'Unread' && (
                <Button 
                  onClick={() => {
                    handleMarkAsRead(selectedInquiry.id);
                    setIsDialogOpen(false);
                  }}
                  className="bg-realtor-navy hover:bg-realtor-navy/90"
                >
                  Mark as Read
                </Button>
              )}
              {selectedInquiry?.type === 'consultation' && selectedInquiry?.status === 'Pending' && (
                <>
                  <Button 
                    onClick={() => {
                      handleUpdateConsultationStatus(selectedInquiry.id, 'Scheduled');
                      setIsDialogOpen(false);
                    }}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Schedule
                  </Button>
                  <Button 
                    onClick={() => {
                      handleUpdateConsultationStatus(selectedInquiry.id, 'Cancelled');
                      setIsDialogOpen(false);
                    }}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Cancel
                  </Button>
                </>
              )}
              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
    </div>
  );
};

export default InquiriesManagement;
