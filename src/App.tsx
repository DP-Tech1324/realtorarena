
import { Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/AuthContext';

import Home from '@/pages/Home';
import About from '@/pages/About';
import Listings from '@/pages/Listings';
import Properties from '@/pages/Properties';
import PropertyDetails from '@/pages/PropertyDetails';
import PropertyManagement from '@/pages/PropertyManagement';
import Contact from '@/pages/Contact';
import Blog from '@/pages/Blog';
import BlogPostPage from '@/pages/BlogPostPage';
import Buyers from '@/pages/Buyers';
import Sellers from '@/pages/Sellers';
import AgentsPage from '@/pages/AgentsPage';
import ServicesPage from '@/pages/ServicesPage';
import ServiceDetail from '@/pages/ServiceDetail';
import Calculators from '@/pages/Calculators';
import HomeValuation from '@/pages/HomeValuation';
import ContactPage from '@/pages/ContactPage';
import NotFound from '@/pages/NotFound';
import ScrollToTop from '@/components/ScrollToTop';
import AdminPanel from '@/pages/AdminPanel';
import ImageManagement from '@/pages/ImageManagement';
import UserManagement from '@/pages/UserManagement';
import InquiriesManagement from '@/pages/InquiriesManagement';
import AnalyticsPage from '@/pages/AnalyticsPage';
import AuthPage from '@/pages/auth/AuthPage';
import ProtectedRoute from '@/components/ProtectedRoute';
import RlpSearch from '@/pages/RlpSearch';
import Resources from '@/pages/Resources';
import Favorites from '@/pages/Favorites';
import PropertySales from './pages/PropertySales';
import PropertyAcquisition from './pages/PropertyAcquisition';
import Relocation from './pages/Relocation';
import Investment from './pages/Investment';
import Luxury from './pages/Luxury';
import Commercial from './pages/Commercial';

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
          <Route path="/properties" element={<Properties />} />
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
          <Route path="/contact-us" element={<ContactPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/buyers" element={<Buyers />} />
          <Route path="/sellers" element={<Sellers />} />
          <Route path="/agents" element={<AgentsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/calculators" element={<Calculators />} />
          <Route path="/home-valuation" element={<HomeValuation />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/rlp-search" element={<RlpSearch />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/PropertySales" element={<PropertySales />} />
          <Route path="/PropertyAcquisition" element={<PropertyAcquisition />} />
          <Route path="/Relocation" element={<Relocation />} />
          <Route path="/Investment" element={<Investment />} />
          <Route path="/Luxury" element={<Luxury />} />
          <Route path="/Commercial" element={<Commercial />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
