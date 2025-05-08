
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FeaturedProperties from '@/components/FeaturedProperties';
import PageHeader from '@/components/PageHeader';

const Properties = () => {
  // Property page hero images
  const propertyHeroImages = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1600573472591-61770e120a4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-[72px]">
        <PageHeader 
          title="Exclusive Property Collection" 
          subtitle="Discover our handpicked selection of premium properties in desirable locations"
          imageSlider={propertyHeroImages}
          showCta={true}
          ctaText="View Featured Properties"
          ctaLink="#featured-properties"
        />
        <div id="featured-properties">
          <FeaturedProperties />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Properties;
