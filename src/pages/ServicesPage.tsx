
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Services from '@/components/Services';
import PageHeader from '@/components/PageHeader';

const ServicesPage = () => {
  // Services page hero images
  const servicesHeroImages = [
    "https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-[72px]">
        <PageHeader 
          title="Our Comprehensive Services" 
          subtitle="Tailored real estate solutions to meet your specific needs and exceed your expectations"
          imageSlider={servicesHeroImages}
        />
        <Services />
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;
