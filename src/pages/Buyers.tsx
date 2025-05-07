
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import ConsultationForm from '@/components/ConsultationForm';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Buyers = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-[72px]">
        <PageHeader 
          title="Buyer Resources" 
          subtitle="Everything you need to know about buying a home in the GTA"
          bgImage="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3"
        />

        {/* First-Time Buyer Guide */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-realtor-navy mb-6">
                  First-Time Buyer Guide
                </h2>
                <div className="prose max-w-none text-gray-600 mb-8">
                  <p className="mb-4">
                    Buying your first home can feel overwhelming, but with the right guidance, it can be a smooth and rewarding experience. I've helped hundreds of first-time buyers navigate the process with confidence.
                  </p>
                  
                  <h3 className="text-xl font-bold text-realtor-navy mt-6 mb-3">Key Steps in the Home Buying Process</h3>
                  
                  <ol className="list-decimal pl-5 space-y-2">
                    <li><strong>Get pre-approved for a mortgage:</strong> Understand how much you can afford before starting your search.</li>
                    <li><strong>Define your needs and wants:</strong> Make a list of must-haves and nice-to-haves for your new home.</li>
                    <li><strong>Start house hunting:</strong> View properties that match your criteria in neighborhoods that interest you.</li>
                    <li><strong>Make an offer:</strong> When you find the right home, I'll help you prepare a competitive offer.</li>
                    <li><strong>Home inspection:</strong> Once your offer is accepted, get a thorough inspection to identify any issues.</li>
                    <li><strong>Final mortgage approval:</strong> Work with your lender to finalize your mortgage.</li>
                    <li><strong>Closing:</strong> Sign the final paperwork, get your keys, and move into your new home!</li>
                  </ol>
                  
                  <p className="mt-4">
                    As your realtor, I'll be by your side through every step of this process, providing expertise, negotiation skills, and personalized guidance.
                  </p>
                </div>
                <Link to="/contact">
                  <Button className="bg-realtor-gold hover:bg-realtor-gold/90 text-realtor-navy font-medium">
                    Get the Full Guide
                  </Button>
                </Link>
              </div>
              
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3"
                  alt="First-Time Home Buyers" 
                  className="w-full rounded-lg shadow-lg"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded shadow-lg max-w-xs">
                  <p className="text-realtor-navy font-bold">
                    "Jigar made buying our first home so much easier than we expected. He walked us through every step and always had our best interests in mind."
                  </p>
                  <p className="text-gray-600 italic mt-2">— Sarah & Michael, First-Time Buyers</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Financing Tips */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-realtor-navy mb-3">
                Financing Tips for Home Buyers
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Understanding your mortgage options and making smart financial decisions
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-realtor-navy mb-4">Mortgage Pre-Approval</h3>
                <p className="text-gray-600 mb-4">
                  Getting pre-approved for a mortgage gives you a clear budget and shows sellers you're a serious buyer. I can connect you with trusted mortgage brokers who will help you secure the best rates.
                </p>
                <ul className="list-disc pl-5 text-gray-600">
                  <li>Understand your budget before house hunting</li>
                  <li>Strengthen your offer with sellers</li>
                  <li>Lock in interest rates for 90-120 days</li>
                  <li>Identify potential credit issues early</li>
                </ul>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-realtor-navy mb-4">Down Payment Options</h3>
                <p className="text-gray-600 mb-4">
                  In Canada, the minimum down payment is 5% for homes under $500,000, with a sliding scale for higher-priced properties. I can help you explore programs like the First-Time Home Buyer Incentive.
                </p>
                <ul className="list-disc pl-5 text-gray-600">
                  <li>5% minimum for homes under $500,000</li>
                  <li>10% for portions between $500K-$1M</li>
                  <li>20% to avoid CMHC insurance</li>
                  <li>First-time buyer programs available</li>
                </ul>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-realtor-navy mb-4">Closing Costs</h3>
                <p className="text-gray-600 mb-4">
                  Beyond the purchase price, be prepared for additional closing costs that typically range from 1.5% to 4% of the home's value.
                </p>
                <ul className="list-disc pl-5 text-gray-600">
                  <li>Land transfer tax</li>
                  <li>Legal fees</li>
                  <li>Home inspection fees</li>
                  <li>Title insurance</li>
                  <li>Moving expenses</li>
                  <li>Property tax adjustments</li>
                </ul>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Link to="/calculators">
                <Button className="bg-realtor-navy hover:bg-realtor-navy/90 text-white flex items-center gap-2">
                  Calculate Your Mortgage
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Home Buying Consultation */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-realtor-navy mb-3">
                Book a Buyer Consultation
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Let's discuss your home buying goals and create a personalized plan to find your dream home
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg max-w-4xl mx-auto">
              <ConsultationForm defaultType="buyer" />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-realtor-navy mb-3">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Common questions from home buyers in the Greater Toronto Area
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div>
                <h3 className="text-xl font-bold text-realtor-navy mb-2">How long does the home buying process take?</h3>
                <p className="text-gray-600">
                  The timeline varies, but typically you can expect 2-3 months from starting your search to closing on a property. This can be shorter or longer depending on market conditions and your specific situation.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-realtor-navy mb-2">Do I need a home inspection?</h3>
                <p className="text-gray-600">
                  While not legally required, I strongly recommend a home inspection to identify any issues with the property before finalizing your purchase. This can save you from unexpected and costly repairs down the road.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-realtor-navy mb-2">What government programs exist for first-time buyers?</h3>
                <p className="text-gray-600">
                  Several programs can help first-time buyers, including the First-Time Home Buyer Incentive, Home Buyers' Plan (RRSP withdrawals), and the First-Time Home Buyers' Tax Credit. I can help you understand which ones you qualify for.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-realtor-navy mb-2">How competitive is the GTA housing market?</h3>
                <p className="text-gray-600">
                  The GTA market remains competitive, especially in desirable neighborhoods. Working with an experienced realtor who understands the local market will give you an advantage in crafting winning offers.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Buyers;
