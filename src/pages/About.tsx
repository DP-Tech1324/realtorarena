import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Phone, Mail, Award, Users, ThumbsUp, School } from 'lucide-react';
import AdminToggle from '@/components/AdminToggle';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-[72px]">
        <PageHeader 
          title="About Jigar Patel" 
          subtitle="Your Trusted Real Estate Professional"
          bgImage="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3"
        />
        
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Profile Image and Contact */}
              <div className="lg:col-span-1">
                <div className="mb-8">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3" 
                    alt="Jigar Patel" 
                    className="rounded-lg shadow-lg w-full h-auto object-cover aspect-[3/4]"
                  />
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
                  <h3 className="text-xl font-bold text-realtor-navy mb-4">Contact Information</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-realtor-gold mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium">(647) 555-1234</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-realtor-gold mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">jigar@royallepage.ca</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Link to="/contact">
                      <Button className="w-full bg-realtor-gold text-realtor-navy hover:bg-realtor-gold/90">
                        Contact Me
                      </Button>
                    </Link>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold text-realtor-navy mb-4">Office</h3>
                  <p className="mb-1 font-medium">Royal LePage</p>
                  <p className="text-gray-700">
                    7646 Weston Rd<br />
                    Woodbridge, ON L4L 9J9
                  </p>
                </div>
              </div>
              
              {/* Bio and Details */}
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold text-realtor-navy mb-6">About Me</h2>
                
                <div className="prose max-w-none text-gray-700">
                  <p className="mb-4">
                    As a dedicated real estate professional with Royal LePage, I bring an intimate knowledge of the Greater Toronto Area market, combining local expertise with personalized service to help you achieve your real estate goals.
                  </p>
                  
                  <p className="mb-4">
                    With years of experience in the industry, I understand that buying or selling a home is more than just a transaction—it's a significant life decision. My commitment is to provide exceptional, personalized service for all of my clients, guiding them through every step of the process with care and attention to detail.
                  </p>
                  
                  <p className="mb-8">
                    Whether you're a first-time homebuyer, looking to sell your property, or interested in investment opportunities, I have the expertise and resources to help you succeed in today's competitive market.
                  </p>
                  
                  <h3 className="text-2xl font-bold text-realtor-navy mb-4">My Mission</h3>
                  <p className="mb-8">
                    My mission is simple: to help you achieve your real estate goals with integrity, professionalism, and dedication. I believe in building long-lasting relationships based on trust, ensuring that every client receives the attention and expertise they deserve.
                  </p>
                  
                  <h3 className="text-2xl font-bold text-realtor-navy mb-4">Specialties</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="flex items-start">
                      <Award className="h-5 w-5 text-realtor-gold mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold">Residential Sales</h4>
                        <p className="text-sm text-gray-600">Expert in single-family homes, condos, and townhouses</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Users className="h-5 w-5 text-realtor-gold mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold">First-Time Buyers</h4>
                        <p className="text-sm text-gray-600">Specialized guidance for navigating first purchases</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <ThumbsUp className="h-5 w-5 text-realtor-gold mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold">Luxury Properties</h4>
                        <p className="text-sm text-gray-600">Marketing and selling high-end real estate</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <School className="h-5 w-5 text-realtor-gold mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold">Investment Properties</h4>
                        <p className="text-sm text-gray-600">Identifying valuable investment opportunities</p>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-realtor-navy mb-4">Credentials</h3>
                  <ul className="list-disc pl-5 mb-8">
                    <li>Licensed Real Estate Professional - RECO</li>
                    <li>Member of Toronto Regional Real Estate Board (TRREB)</li>
                    <li>Member of Canadian Real Estate Association (CREA)</li>
                    <li>Royal LePage Diamond Award Recipient</li>
                  </ul>
                </div>
                
                <div className="flex mt-8">
                  <Link to="/contact">
                    <Button size="lg" className="bg-realtor-gold text-realtor-navy hover:bg-realtor-gold/90 mr-4">
                      Contact Me
                    </Button>
                  </Link>
                  
                  <Link to="/listings">
                    <Button size="lg" variant="outline" className="border-realtor-navy text-realtor-navy hover:bg-realtor-navy/10">
                      View Listings
                    </Button>
                  </Link>
                </div>
                
                {/* Admin Toggle (keep for development purposes) */}
                <div className="mt-12 p-4 bg-gray-100 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Developer Tools</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    This is just for demonstration purposes. In a real application, you would implement proper authentication.
                  </p>
                  <AdminToggle />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
