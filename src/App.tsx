import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AuthProvider } from '@/contexts/AuthContext';
import ScrollToTop from '@/components/ScrollToTop';
import ProtectedRoute from '@/components/ProtectedRoute';
import AiChatBubble from '@/components/AiChatBubble';
import { Toaster } from "@/components/ui/toaster";

// ─── Public Pages ─────────────────────────────────────
import Home from '@/pages/Home';
import About from '@/pages/About';
import Listings from '@/pages/Listings';
import Properties from '@/pages/Properties';
import PropertyDetails from '@/pages/PropertyDetails';
import Contact from '@/pages/Contact';
import ContactPage from '@/pages/ContactPage';
import Blog from '@/pages/Blog';
import BlogPostPage from '@/pages/BlogPostPage';
import Buyers from '@/pages/Buyers';
import Sellers from '@/pages/Sellers';
import AgentsPage from '@/pages/AgentsPage';
import ServicesPage from '@/pages/ServicesPage';
import ServiceDetail from '@/pages/ServiceDetail';
import Calculators from '@/pages/Calculators';
import HomeValuation from '@/pages/HomeValuation';
import RlpSearch from '@/pages/RlpSearch';
import Favorites from '@/pages/Favorites';
import Resources from '@/pages/Resources';
import AuthPage from '@/pages/auth/AuthPage';
import NotFound from '@/pages/NotFound';
import AccessDenied from '@/pages/AccessDenied';

// ─── Services Subpages ────────────────────────────────
import PropertySales from '@/pages/PropertySales';
import PropertyAcquisition from '@/pages/PropertyAcquisition';
import Relocation from '@/pages/Relocation';
import Investment from '@/pages/Investment';
import Luxury from '@/pages/Luxury';
import Commercial from '@/pages/Commercial';

// ─── Admin Pages (Protected) ──────────────────────────
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminProperties from '@/pages/admin/AdminProperties';
import AdminInquiries from '@/pages/admin/AdminInquiries';
import AdminUsers from '@/pages/admin/AdminUsers';
import AdminAnalytics from '@/pages/admin/AdminAnalytics';
import AdminImages from '@/pages/admin/AdminImages';
import AdminMarketing from '@/pages/admin/AdminMarketing';

// ─── Agent-only Page ──────────────────────────────────
import ManageProperties from '@/pages/ManageProperties';


// Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ScrollToTop />
        <Routes>

          {/* ── Public Routes ── */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/properties" element={<Properties />} />
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
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/rlp-search" element={<RlpSearch />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/auth" element={<AuthPage />} />

          {/* ── Services Subpages ── */}
          <Route path="/property-sales" element={<PropertySales />} />
          <Route path="/property-acquisition" element={<PropertyAcquisition />} />
          <Route path="/relocation" element={<Relocation />} />
          <Route path="/investment" element={<Investment />} />
          <Route path="/luxury" element={<Luxury />} />
          <Route path="/commercial" element={<Commercial />} />

          {/* ── Agent Protected ── */}
          <Route path="/manage-properties" element={
          <ProtectedRoute allowedRoles={['admin', 'superadmin', 'editor']}>
          <ManageProperties />
            </ProtectedRoute>
            } />

          {/* ── Admin Protected ── */}
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['admin', 'superadmin', 'editor']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/properties" element={
            <ProtectedRoute allowedRoles={['admin', 'superadmin', 'editor']}>
              <AdminProperties />
            </ProtectedRoute>
          } />
          <Route path="/admin/inquiries" element={
            <ProtectedRoute allowedRoles={['admin', 'superadmin', 'editor']}>
              <AdminInquiries />
            </ProtectedRoute>
          } />
          <Route path="/admin/users" element={
            <ProtectedRoute allowedRoles={['superadmin']}>
              <AdminUsers />
            </ProtectedRoute>
          } />
          <Route path="/admin/analytics" element={
            <ProtectedRoute allowedRoles={['admin', 'superadmin']}>
              <AdminAnalytics />
            </ProtectedRoute>
          } />
          <Route path="/admin/images" element={
            <ProtectedRoute allowedRoles={['admin', 'superadmin', 'editor']}>
              <AdminImages />
            </ProtectedRoute>
          } />
          <Route path="/admin/marketing" element={
            <ProtectedRoute allowedRoles={['admin', 'superadmin']}>
              <AdminMarketing />
            </ProtectedRoute>
          } />

          {/* ── Fallback ── */}
          <Route path="/access-denied" element={<AccessDenied />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <AiChatBubble />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
