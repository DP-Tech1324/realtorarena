
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  MessageSquare, Search, Filter, Mail, Phone, Calendar, 
  MoreHorizontal, Eye, CheckCircle, Clock, AlertTriangle
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useInquiriesManagement } from '@/hooks/useInquiriesManagement';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const ModernAdminInquiries = () => {
  const {
    inquiries,
    loading,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    updateInquiryStatus,
    deleteInquiry,
  } = useInquiriesManagement();

  const getStatusBadge = (status: string) => {
    const variants = {
      new: { class: 'bg-blue-100 text-blue-800 border-blue-200', icon: Clock },
      contacted: { class: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: Phone },
      qualified: { class: 'bg-emerald-100 text-emerald-800 border-emerald-200', icon: CheckCircle },
      closed: { class: 'bg-gray-100 text-gray-800 border-gray-200', icon: CheckCircle },
    };
    
    const variant = variants[status as keyof typeof variants] || variants.new;
    const IconComponent = variant.icon;
    
    return (
      <Badge className={`${variant.class} border font-medium`}>
        <IconComponent className="h-3 w-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const stats = {
    total: inquiries.length,
    new: inquiries.filter(i => i.status === 'new').length,
    contacted: inquiries.filter(i => i.status === 'contacted').length,
    qualified: inquiries.filter(i => i.status === 'qualified').length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" text="Loading inquiries..." />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Inquiry Management</h1>
            <p className="text-emerald-100 opacity-90">
              Track and manage customer inquiries to grow your business.
            </p>
          </div>
          <MessageSquare className="h-16 w-16 opacity-20" />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Inquiries', value: stats.total, icon: MessageSquare, color: 'from-blue-500 to-blue-600' },
          { label: 'New', value: stats.new, icon: Clock, color: 'from-blue-500 to-blue-600' },
          { label: 'Contacted', value: stats.contacted, icon: Phone, color: 'from-yellow-500 to-yellow-600' },
          { label: 'Qualified', value: stats.qualified, icon: CheckCircle, color: 'from-emerald-500 to-emerald-600' },
        ].map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="relative overflow-hidden border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  </div>
                  <div className="p-3 rounded-full bg-gray-50">
                    <IconComponent className="h-6 w-6 text-gray-600" />
                  </div>
                </div>
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color}`}></div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Search and Filters */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48 h-12">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="qualified">Qualified</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Inquiries List */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">Customer Inquiries ({inquiries.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {inquiries.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Inquiries Found</h3>
              <p className="text-gray-600">No inquiries match your current search criteria.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {inquiries.map((inquiry) => (
                <div key={inquiry.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-semibold text-gray-900">{inquiry.name}</h3>
                            {getStatusBadge(inquiry.status)}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Mail className="h-4 w-4" />
                              <span>{inquiry.email}</span>
                            </div>
                            {inquiry.phone && (
                              <div className="flex items-center gap-1">
                                <Phone className="h-4 w-4" />
                                <span>{inquiry.phone}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(inquiry.created_at).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-10 w-10 p-0">
                              <MoreHorizontal className="h-5 w-5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem 
                              onClick={() => updateInquiryStatus(inquiry.id, 'contacted')}
                              className="cursor-pointer"
                            >
                              <Phone className="h-4 w-4 mr-2" />
                              Mark as Contacted
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => updateInquiryStatus(inquiry.id, 'qualified')}
                              className="cursor-pointer"
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Mark as Qualified
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => updateInquiryStatus(inquiry.id, 'closed')}
                              className="cursor-pointer"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              Mark as Closed
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => deleteInquiry(inquiry.id)}
                              className="cursor-pointer text-red-600"
                            >
                              <AlertTriangle className="h-4 w-4 mr-2" />
                              Delete Inquiry
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      {/* Message */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-700 leading-relaxed">{inquiry.message}</p>
                      </div>

                      {/* Property Info */}
                      {inquiry.property_id && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <p className="text-sm text-blue-800 font-medium">
                            Property Inquiry: {inquiry.property_id}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ModernAdminInquiries;
