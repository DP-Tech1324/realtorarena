
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requireAgent?: boolean;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAdmin = false,
  requireAgent = false,
  allowedRoles = [],
}) => {
  const { user, isLoading, isAdmin, isAgent, userRole } = useAuth();
  const location = useLocation();

  console.log('🔍 ProtectedRoute check:', {
    isLoading,
    user: !!user,
    userRole,
    isAdmin,
    allowedRoles,
    location: location.pathname
  });

  // Show loading spinner while auth is resolving
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-realtor-gold"></div>
      </div>
    );
  }

  // Not signed in? Redirect to login with intended destination saved
  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Wait for role to be determined if roles are required
  if ((allowedRoles.length > 0 || requireAdmin || requireAgent) && userRole === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-realtor-gold"></div>
      </div>
    );
  }

  // Check role-based access
  if (allowedRoles.length > 0 && (!userRole || !allowedRoles.includes(userRole))) {
    return <Navigate to="/access-denied" replace />;
  }

  // Legacy checks for backward compatibility
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/access-denied" replace />;
  }

  if (requireAgent && !isAgent) {
    return <Navigate to="/access-denied" replace />;
  }

  // Access granted
  return <>{children}</>;
};

export default ProtectedRoute;
