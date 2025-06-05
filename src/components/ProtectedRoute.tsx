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

  console.log('🔍 ProtectedRoute:', {
    isLoading,
    user,
    userRole,
    isAdmin,
    location: location.pathname
  });

  

  // 🚫 Not signed in? Redirect to login with intended destination saved
  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
  // ✅ Wait until both auth state and userRole resolve before rendering access logic
  if (
    isLoading || 
    (user && (allowedRoles.length > 0 || requireAdmin || requireAgent) && userRole === null)
  ) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-realtor-gold"></div>
      </div>
    );
  }

  // ❌ If role list is provided but user's role is not included → deny
  if (allowedRoles.length > 0 && (!userRole || !allowedRoles.includes(userRole))) {
    return <Navigate to="/access-denied" replace />;
  }

  // 🧭 Legacy backward compatibility checks
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/access-denied" replace />;
  }

  if (requireAgent && !isAgent) {
    return <Navigate to="/access-denied" replace />;
  }

  // ✅ Access granted
  return <>{children}</>;
};

export default ProtectedRoute;
