
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import AdminToggle from '@/components/AdminToggle';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-[72px]">
        <PageHeader 
          title="About Us" 
          subtitle="Learn more about our company and our mission"
          bgImage="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3"
        />
        
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-realtor-navy mb-6">Our Story</h2>
              <p className="text-gray-700 mb-6">
                Founded in 2010, Prestige Realty has grown from a small local agency to one of the most respected real estate companies in the region. Our dedication to client satisfaction and our deep knowledge of the local market has earned us a reputation for excellence.
              </p>
              
              <p className="text-gray-700 mb-6">
                We believe that buying or selling a home is more than just a transaction—it's a life-changing experience. That's why our team of experienced professionals is dedicated to providing exceptional, personalized service for all of our clients.
              </p>
              
              <h2 className="text-3xl font-bold text-realtor-navy mb-6">Our Mission</h2>
              <p className="text-gray-700 mb-6">
                Our mission is simple: to help our clients achieve their real estate goals with the highest level of service, expertise, and integrity. We are committed to building long-lasting relationships based on trust and mutual respect.
              </p>
              
              <h2 className="text-3xl font-bold text-realtor-navy mb-6">Our Values</h2>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li className="mb-2">Integrity in every interaction</li>
                <li className="mb-2">Excellence in service and results</li>
                <li className="mb-2">Innovation in marketing and technology</li>
                <li className="mb-2">Community involvement and giving back</li>
                <li className="mb-2">Continuous education and improvement</li>
              </ul>
              
              {/* Admin Toggle for demonstration purposes */}
              <div className="mt-12 p-4 bg-gray-100 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Developer Tools</h3>
                <p className="text-sm text-gray-600 mb-4">
                  This is just for demonstration purposes. In a real application, you would implement proper authentication.
                </p>
                <AdminToggle />
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
