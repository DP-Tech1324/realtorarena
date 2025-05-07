
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import ContactForm from '@/components/ContactForm';
import ConsultationForm from '@/components/ConsultationForm';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-[72px]">
        <PageHeader 
          title="Contact Me" 
          subtitle="I'm here to help with all your real estate needs"
          bgImage="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3"
        />

        {/* Contact Information Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <h2 className="text-3xl font-bold text-realtor-navy mb-6">
                  Get in Touch
                </h2>
                <p className="text-gray-600 mb-8">
                  Whether you have a question about buying or selling a property, or just want to discuss the real estate market, I'm here to help.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="mr-4 mt-1 bg-realtor-gold/20 p-2 rounded-full">
                      <Phone className="h-5 w-5 text-realtor-gold" />
                    </div>
                    <div>
                      <h3 className="font-bold text-realtor-navy mb-1">Phone</h3>
                      <p className="text-gray-600">(647) 555-1234</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-4 mt-1 bg-realtor-gold/20 p-2 rounded-full">
                      <Mail className="h-5 w-5 text-realtor-gold" />
                    </div>
                    <div>
                      <h3 className="font-bold text-realtor-navy mb-1">Email</h3>
                      <p className="text-gray-600">jigar@royallepage.ca</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-4 mt-1 bg-realtor-gold/20 p-2 rounded-full">
                      <MapPin className="h-5 w-5 text-realtor-gold" />
                    </div>
                    <div>
                      <h3 className="font-bold text-realtor-navy mb-1">Office Address</h3>
                      <p className="text-gray-600">
                        Royal LePage<br />
                        7646 Weston Rd<br />
                        Woodbridge, ON L4L 9J9
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-4 mt-1 bg-realtor-gold/20 p-2 rounded-full">
                      <Clock className="h-5 w-5 text-realtor-gold" />
                    </div>
                    <div>
                      <h3 className="font-bold text-realtor-navy mb-1">Business Hours</h3>
                      <p className="text-gray-600">
                        Monday - Friday: 9:00 AM - 8:00 PM<br />
                        Saturday: 10:00 AM - 6:00 PM<br />
                        Sunday: 11:00 AM - 5:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2">
                <Tabs defaultValue="contact" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger value="contact">Contact Form</TabsTrigger>
                    <TabsTrigger value="consultation">Book Consultation</TabsTrigger>
                  </TabsList>
                  <TabsContent value="contact" className="bg-gray-50 p-6 md:p-8 rounded-lg">
                    <h3 className="text-2xl font-bold text-realtor-navy mb-6">Send Me a Message</h3>
                    <ContactForm />
                  </TabsContent>
                  <TabsContent value="consultation" className="bg-gray-50 p-6 md:p-8 rounded-lg">
                    <h3 className="text-2xl font-bold text-realtor-navy mb-6">Schedule a Consultation</h3>
                    <ConsultationForm />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-realtor-navy mb-3">
                Find Me
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                My office is conveniently located in Woodbridge
              </p>
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-lg h-96">
              <iframe 
                title="Office Location"
                className="w-full h-full border-0"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2878.6294172733374!2d-79.53544068416153!3d43.79258927911615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b2f43a6edfe3f%3A0x38cc923da3b8d921!2s7646%20Weston%20Rd%2C%20Woodbridge%2C%20ON%20L4L%209J9!5e0!3m2!1sen!2sca!4v1620815662877!5m2!1sen!2sca"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-realtor-navy mb-3">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Common questions about working together
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div>
                <h3 className="text-xl font-bold text-realtor-navy mb-2">What areas do you serve?</h3>
                <p className="text-gray-600">
                  I primarily serve the Greater Toronto Area, with a focus on Woodbridge, Vaughan, Richmond Hill, and surrounding communities. However, I can also assist clients throughout the GTA.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-realtor-navy mb-2">Do you work with first-time home buyers?</h3>
                <p className="text-gray-600">
                  Absolutely! I specialize in helping first-time buyers navigate the complex process of purchasing their first home, providing education, guidance, and support every step of the way.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-realtor-navy mb-2">How quickly can you respond to my inquiry?</h3>
                <p className="text-gray-600">
                  I pride myself on prompt communication and typically respond to all inquiries within 24 hours, often much sooner. For urgent matters, I'm available by phone during business hours.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-realtor-navy mb-2">Is there a fee for an initial consultation?</h3>
                <p className="text-gray-600">
                  No, initial consultations are complimentary. I believe in building relationships based on trust and value, so I'm happy to meet with you to discuss your real estate needs without any obligation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Social Media Section */}
        <section className="py-16 bg-realtor-navy">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Connect With Me</h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Follow me on social media for market updates, new listings, and real estate tips
            </p>
            <div className="flex justify-center space-x-6">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white p-3 rounded-full hover:bg-realtor-gold transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-realtor-navy" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white p-3 rounded-full hover:bg-realtor-gold transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-realtor-navy" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white p-3 rounded-full hover:bg-realtor-gold transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-realtor-navy" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                </svg>
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white p-3 rounded-full hover:bg-realtor-gold transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-realtor-navy" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white p-3 rounded-full hover:bg-realtor-gold transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-realtor-navy" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
