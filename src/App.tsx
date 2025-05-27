
import { Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/AuthContext';

import ScrollToTop from '@/components/ScrollToTop';
import ProtectedRoute from '@/components/ProtectedRoute';
import AiChatBubble from '@/components/AiChatBubble';

// Public Pages
import Home from '@/pages/Home';
import About from '@/pages/About';
import Listings from '@/pages/Listings';
import Properties from '@/pages/Properties';
import PropertyDetails from '@/pages/PropertyDetails';
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
import AuthPage from '@/pages/auth/AuthPage';
import RlpSearch from '@/pages/RlpSearch';
import Resources from '@/pages/Resources';
import Favorites from '@/pages/Favorites';
import NotFound from '@/pages/NotFound';

// Admin Pages - Updated structure
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminInquiries from '@/pages/admin/AdminInquiries';
import AdminUsers from '@/pages/admin/AdminUsers';
import AdminAnalytics from '@/pages/admin/AdminAnalytics';
import AdminImages from '@/pages/admin/AdminImages';

// Property Management
import ManageProperties from '@/pages/ManageProperties';

// Services Subpages
import PropertySales from './pages/PropertySales';
import PropertyAcquisition from './pages/PropertyAcquisition';
import Relocation from './pages/Relocation';
import Investment from './pages/Investment';
import Luxury from './pages/Luxury';
import Commercial from './pages/Commercial';

// Query Client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/properties/:id" element={<PropertyDetails />} />
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
          <Route path="/resources/for-buyers" element={<Buyers />} />
          <Route path="/resources/for-sellers" element={<Sellers />} />
          <Route path="/resources/home-valuation" element={<HomeValuation />} />
          <Route path="/resources/mortgage-calculator" element={<Calculators />} />
          <Route path="/favorites" element={<Favorites />} />

          {/* Services Subpages */}
          <Route path="/property-sales" element={<PropertySales />} />
          <Route path="/property-acquisition" element={<PropertyAcquisition />} />
          <Route path="/relocation" element={<Relocation />} />
          <Route path="/investment" element={<Investment />} />
          <Route path="/luxury" element={<Luxury />} />
          <Route path="/commercial" element={<Commercial />} />

          {/* Protected Agent Route */}
          <Route path="/manage-properties" element={
            <ProtectedRoute requireAgent={true}>
              <ManageProperties />
            </ProtectedRoute>
          } />

          {/* Protected Admin Routes - Updated structure */}
          <Route path="/admin" element={
            <ProtectedRoute requireAdmin={true}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/inquiries" element={
            <ProtectedRoute requireAdmin={true}>
              <AdminInquiries />
            </ProtectedRoute>
          } />
          <Route path="/admin/users" element={
            <ProtectedRoute requireAdmin={true}>
              <AdminUsers />
            </ProtectedRoute>
          } />
          <Route path="/admin/analytics" element={
            <ProtectedRoute requireAdmin={true}>
              <AdminAnalytics />
            </ProtectedRoute>
          } />
          <Route path="/admin/images" element={
            <ProtectedRoute requireAdmin={true}>
              <AdminImages />
            </ProtectedRoute>
          } />

          {/* Catch All */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        
        {/* AI Chat Bubble - appears on all pages */}
        <AiChatBubble />
        
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
