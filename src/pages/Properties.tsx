
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FeaturedProperties from '@/components/FeaturedProperties';

const Properties = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-[72px]">
        <div className="bg-realtor-navy py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Properties</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Discover our exclusive collection of exceptional properties
            </p>
          </div>
        </div>
        <FeaturedProperties />
      </main>
      <Footer />
    </div>
  );
};

export default Properties;
