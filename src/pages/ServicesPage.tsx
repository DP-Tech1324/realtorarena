
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Services from '@/components/Services';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import ServicesLinkWrapper from '@/components/ServicesLinkWrapper';

const ServicesPage = () => {
  // Services page hero images
  const servicesHeroImages = [
    "https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  ];

  // Fix service links after the component has rendered
  useEffect(() => {
    // Find all buttons with "Learn More" text
    document.querySelectorAll('button').forEach(button => {
      if (button.textContent?.includes('Learn More')) {
        // Get the closest service card container
        const serviceCard = button.closest('.service-card');
        if (!serviceCard) return;
        
        // Find which service this is based on the heading
        const heading = serviceCard.querySelector('h3');
        if (!heading) return;
        
        const headingText = heading.textContent?.toLowerCase() || '';
        
        // Create the appropriate link
        let serviceId = '';
        if (headingText.includes('property sales')) {
          serviceId = 'property-sales';
        } else if (headingText.includes('property acquisition')) {
          serviceId = 'property-acquisition';
        } else if (headingText.includes('relocation')) {
          serviceId = 'relocation-services';
        } else {
          return;
        }
        
        // Create a link element to replace the button
        const link = document.createElement('a');
        link.href = `/services/${serviceId}`;
        link.className = button.className;
        link.innerHTML = button.innerHTML;
        
        // Replace the button with the link
        button.parentNode?.replaceChild(link, button);
      }
    });
  }, []);

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
        <ServicesLinkWrapper />
        
        {/* Additional Service Categories Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-realtor-navy mb-3">Specialized Real Estate Services</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Additional services tailored to meet specific real estate needs
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-realtor-navy mb-3">Investment Properties</h3>
                <p className="text-gray-600 mb-4">
                  Strategic guidance for investors looking to build or expand their real estate portfolio.
                </p>
                <Link to="/services/property-acquisition">
                  <Button variant="outline" className="border-realtor-navy text-realtor-navy hover:bg-realtor-navy hover:text-white">
                    Learn More
                  </Button>
                </Link>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-realtor-navy mb-3">Luxury Properties</h3>
                <p className="text-gray-600 mb-4">
                  Exclusive representation for high-end properties with premium marketing and discreet service.
                </p>
                <Link to="/services/property-sales">
                  <Button variant="outline" className="border-realtor-navy text-realtor-navy hover:bg-realtor-navy hover:text-white">
                    Learn More
                  </Button>
                </Link>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-realtor-navy mb-3">Commercial Real Estate</h3>
                <p className="text-gray-600 mb-4">
                  Professional guidance for businesses seeking office, retail, or industrial spaces.
                </p>
                <Link to="/services/property-acquisition">
                  <Button variant="outline" className="border-realtor-navy text-realtor-navy hover:bg-realtor-navy hover:text-white">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;
