
import React from 'react';

const CustomEmbed = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-realtor-navy mb-6 text-center">Royal LePage Listings</h2>
          
          <div className="bg-white rounded-lg shadow-sm p-4 min-h-[600px] w-full">
            <iframe
              src="https://jigarpatel.royallepage.ca/index.php?advanced=1"
              width="100%"
              height="1200"
              style={{border: 'none'}}
              loading="lazy"
              sandbox="allow-scripts allow-forms"
              title="Royal LePage Listings"
            />
          </div>
          
          <div className="mt-12 bg-realtor-light-gray rounded-lg shadow-sm p-8 min-h-[300px] flex items-center justify-center border-2 border-dashed border-realtor-medium-gray">
            <div className="text-center text-realtor-medium-gray">
              <p className="text-lg mb-2">Additional Custom HTML Embed Area</p>
              <p className="text-sm">Paste your iframe or embed code here</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomEmbed;
