
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, MessageSquare, BarChart3, Users, TrendingUp, Eye } from 'lucide-react';
import { useAdminData } from '@/hooks/useAdminData';
import { useAuth } from '@/contexts/AuthContext';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const ModernAdminDashboard = () => {
  const { stats, loading } = useAdminData();
  const { userRole } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" text="Loading dashboard..." />
      </div>
    );
  }

  const statsCards = [
    {
      title: 'Total Properties',
      value: stats.totalProperties,
      subtitle: `${stats.activeProperties} active`,
      icon: Building,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Inquiries',
      value: stats.totalInquiries,
      subtitle: `${stats.pendingInquiries} pending`,
      icon: MessageSquare,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      title: 'Monthly Views',
      value: stats.monthlyViews.toLocaleString(),
      subtitle: 'Property views',
      icon: Eye,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Analytics',
      value: '24/7',
      subtitle: 'Real-time tracking',
      icon: BarChart3,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      roles: ['admin', 'superadmin'],
    },
  ];

  const filteredCards = statsCards.filter(card => 
    !card.roles || card.roles.includes(userRole || '')
  );

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 rounded-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
            <p className="text-blue-100 opacity-90">
              Here's what's happening with your real estate business today.
            </p>
          </div>
          <div className="hidden md:block">
            <TrendingUp className="h-16 w-16 opacity-20" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredCards.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <Card key={stat.title} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <div className="flex items-baseline space-x-2">
                      <p className="text-3xl font-bold text-gray-900">
                        {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500">{stat.subtitle}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <IconComponent className="h-6 w-6 text-gray-700" />
                  </div>
                </div>
                
                {/* Gradient bottom border */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color}`}></div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <button className="flex items-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-left">
                <Building className="h-5 w-5 text-blue-600 mr-3" />
                <div>
                  <p className="font-medium">Add New Property</p>
                  <p className="text-sm text-gray-500">Create a new property listing</p>
                </div>
              </button>
              
              <button className="flex items-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-left">
                <MessageSquare className="h-5 w-5 text-emerald-600 mr-3" />
                <div>
                  <p className="font-medium">Review Inquiries</p>
                  <p className="text-sm text-gray-500">Respond to customer inquiries</p>
                </div>
              </button>

              {userRole === 'superadmin' && (
                <button className="flex items-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-left">
                  <Users className="h-5 w-5 text-purple-600 mr-3" />
                  <div>
                    <p className="font-medium">Manage Users</p>
                    <p className="text-sm text-gray-500">Add or edit admin users</p>
                  </div>
                </button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New property listing created</p>
                  <p className="text-xs text-gray-500">Modern Downtown Condo - 2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Inquiry received</p>
                  <p className="text-xs text-gray-500">Luxury Family Home - 4 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Property status updated</p>
                  <p className="text-xs text-gray-500">Trendy Townhouse marked as sold - 6 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ModernAdminDashboard;
