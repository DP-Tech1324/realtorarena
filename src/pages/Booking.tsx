import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import BookingForm from '@/components/booking/BookingForm';

const Booking = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-[72px]">
        <PageHeader
          title="Book a Consultation"
          subtitle="Choose a date and time that works for you"
          bgImage="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=60"
        />
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-2xl">
            <h2 className="text-3xl font-bold text-realtor-navy mb-6 text-center">Schedule Your Appointment</h2>
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
              <BookingForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Booking;
