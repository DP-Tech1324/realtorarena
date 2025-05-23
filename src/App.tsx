
import { Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/AuthContext';

import Home from '@/pages/Home';
import About from '@/pages/About';
import Listings from '@/pages/Listings';
import PropertyDetails from '@/pages/PropertyDetails';
import PropertyManagement from '@/pages/PropertyManagement';
import Contact from '@/pages/Contact';
import ServicesPage from '@/pages/ServicesPage';
import NotFound from '@/pages/NotFound';
import ScrollToTop from '@/components/ScrollToTop';
import AdminPanel from '@/pages/AdminPanel';
import ImageManagement from '@/pages/ImageManagement';
import UserManagement from '@/pages/UserManagement';
import InquiriesManagement from '@/pages/InquiriesManagement';
import AnalyticsPage from '@/pages/AnalyticsPage';
import AuthPage from '@/pages/auth/AuthPage';
import ProtectedRoute from '@/components/ProtectedRoute';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/properties/:id" element={<PropertyDetails />} />
          <Route path="/manage-properties" element={
            <ProtectedRoute requireAgent={true}>
              <PropertyManagement />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute requireAdmin={true}>
              <AdminPanel />
            </ProtectedRoute>
          } />
          <Route path="/admin/images" element={
            <ProtectedRoute requireAdmin={true}>
              <ImageManagement />
            </ProtectedRoute>
          } />
          <Route path="/admin/users" element={
            <ProtectedRoute requireAdmin={true}>
              <UserManagement />
            </ProtectedRoute>
          } />
          <Route path="/admin/inquiries" element={
            <ProtectedRoute requireAdmin={true}>
              <InquiriesManagement />
            </ProtectedRoute>
          } />
          <Route path="/admin/analytics" element={
            <ProtectedRoute requireAdmin={true}>
              <AnalyticsPage />
            </ProtectedRoute>
          } />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
