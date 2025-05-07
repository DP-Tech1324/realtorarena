
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, Key, Users, ArrowRight } from 'lucide-react';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const services: Service[] = [
  {
    id: 1,
    title: 'Property Sales',
    description: 'Strategic marketing and negotiation to sell your property for the highest possible price.',
    icon: <Building className="h-10 w-10 text-realtor-gold" />,
  },
  {
    id: 2,
    title: 'Property Acquisition',
    description: 'Expert guidance to help you find and purchase your dream home or investment property.',
    icon: <Key className="h-10 w-10 text-realtor-gold" />,
  },
  {
    id: 3,
    title: 'Relocation Services',
    description: 'Comprehensive support for families and professionals moving to a new area.',
    icon: <Users className="h-10 w-10 text-realtor-gold" />,
  },
];

const Services = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-realtor-navy mb-3">Our Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We offer a comprehensive range of real estate services tailored to meet your specific needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service.id} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex items-center pb-2">
                <div className="rounded-full bg-realtor-navy/5 p-4 mb-4">
                  {service.icon}
                </div>
                <CardTitle className="text-xl text-realtor-navy">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 mb-6">
                  {service.description}
                </CardDescription>
                <Button variant="outline" className="w-full border-realtor-navy text-realtor-navy hover:bg-realtor-navy hover:text-white">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button className="bg-realtor-gold hover:bg-realtor-gold/90 text-realtor-navy flex items-center gap-2 font-medium">
            View All Services
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
