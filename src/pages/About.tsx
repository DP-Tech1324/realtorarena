import Image from "@/components/ui/Image";

import RECOLogo from "@/assets/images/logos/relator.jpeg";
import CREALogo from "@/assets/images/logos/relator.jpeg";
import TRREBLogo from "@/assets/images/logos/TERB.jpg";
import RLPLogo from "@/assets/images/logos/Jigar_Patel_Logo.png";


import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/PageHeader';
import { agent } from '@/data/agent';
import { Phone, Mail, Award, ThumbsUp, Home } from 'lucide-react';

const About = () => {
  // Array of hero banner images for the image slider
  const heroImages = [
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1600573472591-61770e120a4a?ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-[72px]">
        <PageHeader 
          title="About Jigar Patel" 
          subtitle="Your trusted real estate advisor in the Greater Toronto Area"
          imageSlider={heroImages}
        />

        {/* Bio Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="text-3xl font-bold text-realtor-navy mb-6">
                  Jigar Patel
                </h2>
                <div className="flex items-center mb-6">
                  <img 
                    src="/royal-lepage-logo.png" 
                    alt="Royal LePage" 
                    className="h-10 mr-4"
                    onError={(e) => {
                      e.currentTarget.src = "https://www.royallepage.ca/assets/lp/2022/logos/rlp-en.svg";
                      e.currentTarget.onerror = null;
                    }}
                  />
                  <p className="text-lg text-realtor-navy font-medium">
                    Royal LePage Real Estate Professional
                  </p>
                </div>
                <div className="prose max-w-none text-gray-600 mb-8">
                  <p className="mb-4">
                    With over 10 years of experience in the Greater Toronto Area real estate market, I have established myself as a trusted advisor for buyers and sellers alike.
                  </p>
                  <p className="mb-4">
                    Having lived in Woodbridge for most of my life, I bring unparalleled local knowledge and expertise to every transaction. My commitment to client satisfaction, integrity, and professional service has earned me numerous industry accolades and, more importantly, the loyalty and referrals of my many satisfied clients.
                  </p>
                  <p className="mb-4">
                    I understand that buying or selling a home is more than just a transaction—it's a significant life decision. That's why I dedicate myself to providing exceptional, personalized service for all my clients. Whether you're a first-time homebuyer, looking to sell your property, or seeking investment opportunities, I will work tirelessly to help you achieve your real estate goals.
                  </p>
                  <p>
                    As a proud affiliate of Royal LePage, one of Canada's most respected real estate brokerages, I have access to comprehensive resources, cutting-edge technology, and a vast network of professionals to ensure your success in today's competitive market.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <div className="flex items-center">
                    <Phone size={20} className="text-realtor-gold mr-2" />
                    <span>(647) 555-1234</span>
                  </div>
                  <div className="flex items-center">
                    <Mail size={20} className="text-realtor-gold mr-2" />
                    <span>jigar@royallepage.ca</span>
                  </div>
                </div>
                <Link to="/contact">
                  <Button className="bg-realtor-gold hover:bg-realtor-gold/90 text-realtor-navy font-medium">
                    Let's Connect
                  </Button>
                </Link>
              </div>
              
              <div className="order-1 lg:order-2">
                <div className="relative">
                  <img 
                    src={agent.photo}
                    alt="Jigar Patel" 
                    className="w-full rounded-lg shadow-lg object-cover"
                    style={{ height: '600px' }}
                  />
                  <div className="absolute bottom-0 right-0 bg-realtor-navy text-white p-4 rounded-tl-lg">
                    <p className="font-bold">10+ Years Experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Specialties Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-realtor-navy mb-3">My Specialties</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Areas of expertise that help me deliver exceptional results for my clients
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-realtor-gold/20 text-realtor-gold rounded-full flex items-center justify-center mb-6">
                  <Home size={32} />
                </div>
                <h3 className="text-xl font-bold text-realtor-navy mb-3">Residential Properties</h3>
                <p className="text-gray-600">
                  Expert in single-family homes, townhouses, and condos throughout the Greater Toronto Area, with particular focus on Woodbridge, Vaughan, and Richmond Hill.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-realtor-gold/20 text-realtor-gold rounded-full flex items-center justify-center mb-6">
                  <Award size={32} />
                </div>
                <h3 className="text-xl font-bold text-realtor-navy mb-3">Luxury Market</h3>
                <p className="text-gray-600">
                  Specialized knowledge of the luxury real estate market, with a track record of successful high-end property transactions and premium client service.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-realtor-gold/20 text-realtor-gold rounded-full flex items-center justify-center mb-6">
                  <ThumbsUp size={32} />
                </div>
                <h3 className="text-xl font-bold text-realtor-navy mb-3">First-Time Buyers</h3>
                <p className="text-gray-600">
                  Dedicated to guiding first-time homebuyers through the entire process, from financing options to closing, with clear communication and education.
                </p>
              </div>
            </div>

            <div className="mt-16 text-center">
              <h3 className="text-2xl font-bold text-realtor-navy mb-6">My Mission</h3>
              <p className="text-xl text-gray-600 italic max-w-3xl mx-auto">
                "To provide exceptional service with integrity and transparency, helping clients achieve their real estate goals while building lasting relationships based on trust and results."
              </p>
            </div>
          </div>
        </section>

        {/* Credentials Section */}
<section className="py-16 bg-white">
  <div className="container mx-auto px-4">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-realtor-navy mb-3">Professional Credentials</h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Education, certifications, and affiliations that enhance my service to you
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div className="text-center p-6 border border-gray-200 rounded-lg">
        <Image src={RECOLogo} alt="RECO" className="w-16 h-16 mx-auto mb-4" />
        <p className="font-bold text-realtor-navy mb-2">Licensed Realtor</p>
        <p className="text-gray-600">Real Estate Council of Ontario</p>
      </div>

      <div className="text-center p-6 border border-gray-200 rounded-lg">
        <Image src={CREALogo} alt="CREA" className="w-16 h-16 mx-auto mb-4" />
        <p className="font-bold text-realtor-navy mb-2">Member</p>
        <p className="text-gray-600">Canadian Real Estate Association</p>
      </div>

      <div className="text-center p-6 border border-gray-200 rounded-lg">
        <Image src={TRREBLogo} alt="TRREB" className="w-16 h-16 mx-auto mb-4" />
        <p className="font-bold text-realtor-navy mb-2">Member</p>
        <p className="text-gray-600">Toronto Regional Real Estate Board</p>
      </div>

      <div className="text-center p-6 border border-gray-200 rounded-lg">
        <Image src={RLPLogo} alt="Royal LePage Award" className="w-16 h-16 mx-auto mb-4" />
        <p className="font-bold text-realtor-navy mb-2">Top Producer</p>
        <p className="text-gray-600">Royal LePage Diamond Award</p>
      </div>
    </div>
  </div>
</section>


        {/* CTA Section */}
        <section className="py-16 bg-realtor-navy">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Let's Work Together</h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              I'm ready to help you with all your real estate needs. Let's connect and discuss how I can assist you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-realtor-gold hover:bg-realtor-gold/90 text-realtor-navy font-medium">
                  Schedule a Consultation
                </Button>
              </Link>
              <Link to="/listings">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-realtor-navy">
                  Browse My Listings
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

export default About;
