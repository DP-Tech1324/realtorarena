
import { Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
        <Route path="/manage-properties" element={<PropertyManagement />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/images" element={<ImageManagement />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/inquiries" element={<InquiriesManagement />} />
        <Route path="/admin/analytics" element={<AnalyticsPage />} />
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
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
