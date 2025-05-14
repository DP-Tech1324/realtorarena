
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Index from "./pages/Index"; 
import About from "./pages/About";
import Listings from "./pages/Listings";
import Buyers from "./pages/Buyers";
import Sellers from "./pages/Sellers";
import HomeValuation from "./pages/HomeValuation";
import Calculators from "./pages/Calculators";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogPostPage from "./pages/BlogPostPage";
import ServicesPage from "./pages/ServicesPage";
import Properties from "./pages/Properties";
import NotFound from "./pages/NotFound";
import AgentsPage from "./pages/AgentsPage";
import ContactPage from "./pages/ContactPage";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/buyers" element={<Buyers />} />
          <Route path="/sellers" element={<Sellers />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/valuation" element={<HomeValuation />} />
          <Route path="/calculators" element={<Calculators />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contact-us" element={<Navigate to="/contact" replace />} />
          <Route path="/agents" element={<AgentsPage />} />
          <Route path="/team" element={<Navigate to="/agents" replace />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPostPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
