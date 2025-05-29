// src/components/ProtectedRoute.tsx
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
 console.log("🔍 ProtectedRoute: ", {
  isLoading,
  user,
  userRole,
  isAdmin,
  location: location.pathname
});
  // 1. Wait for auth state to resolve
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-realtor-gold"></div>
      </div>
    );
  }

  // 2. If not authenticated, redirect to login and save current location
  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // 3. If allowedRoles are provided but user doesn't match, deny access
  if (allowedRoles.length > 0 && (!userRole || !allowedRoles.includes(userRole))) {
    return <Navigate to="/access-denied" replace />;
  }

  // 4. Backward compatibility: allow legacy admin/agent checks
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/access-denied" replace />;
  }

  if (requireAgent && !isAgent) {
    return <Navigate to="/access-denied" replace />;
  }

  // 5. Access granted
  return <>{children}</>;
  
};

export default ProtectedRoute;
