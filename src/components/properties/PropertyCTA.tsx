
import React from 'react';
import { Button } from '@/components/ui/button';

const PropertyCTA: React.FC = () => {
  return (
    <section className="py-16 bg-realtor-navy">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Found a Property You Like?</h2>
        <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
          Schedule a viewing to see the property in person and get all your questions answered.
        </p>
        <Button size="lg" className="bg-realtor-gold hover:bg-realtor-gold/90 text-realtor-navy font-medium">
          Book a Viewing
        </Button>
      </div>
    </section>
  );
};

export default PropertyCTA;
