
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import { useToast } from "@/components/ui/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Trash, Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from 'date-fns';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  listing_id?: string;
  created_at: string;
  status?: string;
}

const InquiriesManagement = () => {
  const { isAdmin, isLoading, user } = useAuth();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoadingInquiries, setIsLoadingInquiries] = useState(true);
  const { toast } = useToast();

  // Fetch inquiries from Supabase
  useEffect(() => {
    const fetchInquiries = async () => {
      if (!user) return;
      
      try {
        setIsLoadingInquiries(true);
        const { data, error } = await supabase
          .from('inquiries')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        setInquiries(data || []);
      } catch (error: any) {
        toast({
          title: "Error",
          description: `Failed to load inquiries: ${error.message}`,
          variant: "destructive",
        });
      } finally {
        setIsLoadingInquiries(false);
      }
    };
    
    if (user) {
      fetchInquiries();
    }
  }, [user]);

  // If still checking authentication or not admin, show loading or redirect
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-realtor-gold"></div>
      </div>
    );
  }

  if (!isAdmin) {
    toast({
      title: "Access Denied",
      description: "You need administrator privileges to access this page.",
      variant: "destructive",
    });
    return <Navigate to="/" />;
  }
  
  const handleViewInquiry = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setIsDialogOpen(true);
  };
  
  const handleDeleteInquiry = async (id: string) => {
    try {
      const { error } = await supabase
        .from('inquiries')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setInquiries(inquiries.filter(inquiry => inquiry.id !== id));
      
      toast({
        title: "Inquiry Deleted",
        description: "The inquiry has been successfully removed."
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to delete inquiry: ${error.message}`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-[72px]">
        <PageHeader 
          title="Inquiries Management" 
          subtitle="View and manage inquiries from potential clients"
          showCta={false}
        />
        
        <div className="container mx-auto px-4 py-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-realtor-gold" /> 
                Contact Inquiries
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingInquiries ? (
                <div className="flex justify-center py-10">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-realtor-navy"></div>
                </div>
              ) : inquiries.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No inquiries available at the moment.
                </div>
              ) : (
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {inquiries.map((inquiry) => (
                        <TableRow key={inquiry.id}>
                          <TableCell className="font-medium">{inquiry.name}</TableCell>
                          <TableCell>{inquiry.email}</TableCell>
                          <TableCell>{inquiry.phone || 'N/A'}</TableCell>
                          <TableCell>{format(new Date(inquiry.created_at), 'PPP')}</TableCell>
                          <TableCell>
                            <Badge 
                              className={
                                inquiry.status === 'responded' ? 'bg-green-100 text-green-800' : 
                                inquiry.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-blue-100 text-blue-800'
                              }
                            >
                              {inquiry.status || 'New'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleViewInquiry(inquiry)}
                              className="mr-1"
                            >
                              <Eye className="h-4 w-4 text-blue-600" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteInquiry(inquiry.id)}
                            >
                              <Trash className="h-4 w-4 text-red-600" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Inquiry Detail Dialog */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Inquiry Details</DialogTitle>
                <DialogDescription>
                  Submitted on {selectedInquiry ? format(new Date(selectedInquiry.created_at), 'PPP') : ''}
                </DialogDescription>
              </DialogHeader>
              
              {selectedInquiry && (
                <div className="space-y-4 mt-2">
                  <div>
                    <h3 className="font-semibold text-sm text-gray-500">From</h3>
                    <p className="font-medium">{selectedInquiry.name}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-sm text-gray-500">Contact Information</h3>
                    <p>Email: {selectedInquiry.email}</p>
                    <p>Phone: {selectedInquiry.phone || 'Not provided'}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-sm text-gray-500">Message</h3>
                    <p className="whitespace-pre-wrap">{selectedInquiry.message}</p>
                  </div>
                  
                  {selectedInquiry.listing_id && (
                    <div>
                      <h3 className="font-semibold text-sm text-gray-500">Related Property</h3>
                      <a 
                        href={`/properties/${selectedInquiry.listing_id}`} 
                        className="text-realtor-gold hover:underline"
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        View Property
                      </a>
                    </div>
                  )}
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default InquiriesManagement;
