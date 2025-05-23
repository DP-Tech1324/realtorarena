
import React from 'react';

// This component will serve as a placeholder for embedding external content like iframes
const CustomEmbed = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-realtor-navy mb-6 text-center">Embed Area</h2>
          
          <div className="bg-realtor-light-gray rounded-lg shadow-sm p-8 min-h-[300px] flex items-center justify-center border-2 border-dashed border-realtor-medium-gray">
            <div className="text-center text-realtor-medium-gray">
              <p className="text-lg mb-2">Custom HTML Embed Area</p>
              <p className="text-sm">Paste your iframe or embed code here</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomEmbed;
