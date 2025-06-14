
import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

// Lazy load components
const ModernHome = lazy(() => import('@/pages/ModernHome'));
const ModernProperties = lazy(() => import('@/pages/ModernProperties'));
const PropertyDetails = lazy(() => import('@/pages/PropertyDetails'));
const ModernAdminLayout = lazy(() => import('@/layouts/ModernAdminLayout'));
const ModernAdminDashboard = lazy(() => import('@/pages/admin/ModernAdminDashboard'));
const ModernAdminUsers = lazy(() => import('@/pages/admin/ModernAdminUsers'));
const ModernAdminInquiries = lazy(() => import('@/pages/admin/ModernAdminInquiries'));
const AdminProperties = lazy(() => import('@/pages/admin/AdminProperties'));
const AuthPage = lazy(() => import('@/pages/auth/AuthPage'));
const AccessDenied = lazy(() => import('@/pages/AccessDenied'));
const NotFound = lazy(() => import('@/pages/NotFound'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-white">
            <Suspense fallback={
              <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner size="lg" text="Loading application..." />
              </div>
            }>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<ModernHome />} />
                <Route path="/properties" element={<ModernProperties />} />
                <Route path="/property/:id" element={<PropertyDetails />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/access-denied" element={<AccessDenied />} />

                {/* Admin Routes */}
                <Route path="/admin" element={<ModernAdminLayout />}>
                  <Route index element={<ModernAdminDashboard />} />
                  <Route path="properties" element={<AdminProperties />} />
                  <Route path="inquiries" element={<ModernAdminInquiries />} />
                  <Route path="users" element={<ModernAdminUsers />} />
                </Route>

                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <Toaster />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
