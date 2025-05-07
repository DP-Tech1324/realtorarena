
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';

const Sellers = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-[72px]">
        <PageHeader 
          title="Seller Resources" 
          subtitle="Maximize your property's value with our expert selling strategies"
          bgImage="https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3"
        />

        {/* Marketing Strategy */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-realtor-navy mb-6">
                  Comprehensive Marketing Strategy
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  My proven marketing approach ensures your property receives maximum exposure to qualified buyers, resulting in faster sales and better offers.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="mr-4 mt-1 bg-realtor-gold/20 p-1 rounded-full">
                      <Check className="h-5 w-5 text-realtor-gold" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-realtor-navy mb-1">Professional Photography & Virtual Tours</h3>
                      <p className="text-gray-600">
                        High-quality, professionally shot photos and immersive 3D virtual tours that showcase your property's best features and attract more online interest.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-4 mt-1 bg-realtor-gold/20 p-1 rounded-full">
                      <Check className="h-5 w-5 text-realtor-gold" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-realtor-navy mb-1">Strategic MLS Listing</h3>
                      <p className="text-gray-600">
                        Optimized listing with compelling descriptions on the Multiple Listing Service (MLS) to reach all real estate agents and their clients in the area.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-4 mt-1 bg-realtor-gold/20 p-1 rounded-full">
                      <Check className="h-5 w-5 text-realtor-gold" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-realtor-navy mb-1">Digital Marketing Campaign</h3>
                      <p className="text-gray-600">
                        Targeted social media advertising, email marketing to my database of potential buyers, and premium placement on major real estate websites.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-4 mt-1 bg-realtor-gold/20 p-1 rounded-full">
                      <Check className="h-5 w-5 text-realtor-gold" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-realtor-navy mb-1">Professional Staging Consultation</h3>
                      <p className="text-gray-600">
                        Expert advice on preparing your home to appeal to the widest range of buyers, highlighting its strengths and minimizing weaknesses.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-4 mt-1 bg-realtor-gold/20 p-1 rounded-full">
                      <Check className="h-5 w-5 text-realtor-gold" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-realtor-navy mb-1">Strategic Open Houses</h3>
                      <p className="text-gray-600">
                        Well-promoted open houses targeting qualified buyers at optimal times, with professional representation to highlight your property's features.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Link to="/contact">
                    <Button className="bg-realtor-gold hover:bg-realtor-gold/90 text-realtor-navy font-medium">
                      Discuss Your Selling Strategy
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="space-y-6">
                <img 
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3"
                  alt="Home for Sale" 
                  className="w-full rounded-lg shadow-lg"
                />
                <div className="grid grid-cols-2 gap-6">
                  <img 
                    src="https://images.unsplash.com/photo-1560185008-a8de49506789?ixlib=rb-4.0.3"
                    alt="Professional Photography" 
                    className="w-full rounded-lg shadow-lg h-48 object-cover"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3"
                    alt="Home Staging" 
                    className="w-full rounded-lg shadow-lg h-48 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Home Valuation CTA */}
        <section className="py-16 bg-realtor-navy">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">What's Your Home Worth?</h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Get a free, no-obligation home valuation to understand your property's current market value.
            </p>
            <Link to="/valuation">
              <Button size="lg" className="bg-realtor-gold hover:bg-realtor-gold/90 text-realtor-navy font-medium">
                Get a Free Home Valuation
              </Button>
            </Link>
          </div>
        </section>

        {/* Staging Tips */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-realtor-navy mb-3">
                Home Staging Tips to Maximize Value
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Simple yet effective ways to prepare your home for a successful sale
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-realtor-navy mb-4">Enhance Curb Appeal</h3>
                <p className="text-gray-600 mb-4">
                  First impressions matter. Make your home's exterior inviting to potential buyers before they even step inside.
                </p>
                <ul className="list-disc pl-5 text-gray-600">
                  <li>Clean and maintain landscaping</li>
                  <li>Power wash siding and walkways</li>
                  <li>Add fresh mulch to garden beds</li>
                  <li>Paint the front door a welcoming color</li>
                  <li>Update exterior lighting fixtures</li>
                </ul>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-realtor-navy mb-4">Declutter & Depersonalize</h3>
                <p className="text-gray-600 mb-4">
                  Help buyers envision themselves in the space by creating a clean, neutral environment.
                </p>
                <ul className="list-disc pl-5 text-gray-600">
                  <li>Remove excess furniture to showcase space</li>
                  <li>Pack away personal photos and collections</li>
                  <li>Clear countertops in kitchens and bathrooms</li>
                  <li>Organize closets to highlight storage</li>
                  <li>Consider renting a storage unit temporarily</li>
                </ul>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-realtor-navy mb-4">Make Strategic Updates</h3>
                <p className="text-gray-600 mb-4">
                  Focus on high-impact improvements that offer the best return on investment.
                </p>
                <ul className="list-disc pl-5 text-gray-600">
                  <li>Apply fresh, neutral paint colors</li>
                  <li>Update cabinet hardware and fixtures</li>
                  <li>Replace outdated light fixtures</li>
                  <li>Deep clean carpets or replace if necessary</li>
                  <li>Repair any visible damage or defects</li>
                </ul>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Link to="/contact">
                <Button className="bg-realtor-navy hover:bg-realtor-navy/90 text-white flex items-center gap-2">
                  Request a Staging Consultation
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Seller Success Stories */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-realtor-navy mb-3">
                Success Stories
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Recent results achieved for my selling clients
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <div className="text-realtor-gold font-bold text-2xl mb-2">$75,000</div>
                <div className="text-realtor-navy font-medium mb-4">Over Asking Price</div>
                <p className="text-gray-600 mb-3">Detached home in Woodbridge sold after just one weekend of showings with multiple offers.</p>
                <p className="italic text-gray-500">"Jigar's marketing strategy and negotiation skills were exceptional. We couldn't be happier with the results." - The Johnsons</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <div className="text-realtor-gold font-bold text-2xl mb-2">7 Days</div>
                <div className="text-realtor-navy font-medium mb-4">On Market</div>
                <p className="text-gray-600 mb-3">Luxury condo in downtown Toronto sold quickly to a pre-qualified buyer at full asking price.</p>
                <p className="italic text-gray-500">"The professional photography and virtual tour attracted serious buyers immediately. The process was seamless." - Robert M.</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <div className="text-realtor-gold font-bold text-2xl mb-2">98%</div>
                <div className="text-realtor-navy font-medium mb-4">of List Price Average</div>
                <p className="text-gray-600 mb-3">Consistent results for sellers across various property types and neighborhoods in the GTA.</p>
                <p className="italic text-gray-500">"Jigar's expertise in pricing strategy and market timing helped us maximize our return." - The Chens</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-realtor-navy">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Sell Your Home?</h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Contact me for a no-obligation consultation to discuss your selling goals and timeline.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/valuation">
                <Button size="lg" className="bg-realtor-gold hover:bg-realtor-gold/90 text-realtor-navy font-medium">
                  Get a Home Valuation
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-realtor-navy">
                  Contact Me
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Sellers;
