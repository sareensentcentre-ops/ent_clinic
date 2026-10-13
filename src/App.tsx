/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { AboutAndBookingSection } from './components/AboutAndBookingSection';
import { StatsAndTestimonials } from './components/StatsAndTestimonials';
import { TechnologySection } from './components/TechnologySection';
import { FaqAndGallerySection } from './components/FaqAndGallerySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { DoctorModal } from './components/DoctorModal';
import { AppointmentModal } from './components/AppointmentModal';
import { GlobalScrollCanvas } from './components/GlobalScrollCanvas';
import { CLINIC_SERVICES, CLINIC_CONTACT } from './data/clinicData';
import { ServiceItem } from './types';
import { MessageSquare, Phone } from 'lucide-react';

export default function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isDoctorModalOpen, setIsDoctorModalOpen] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [appointmentDepartment, setAppointmentDepartment] = useState('Ear Treatment');

  const scrollToSection = (sectionId: string) => {
    setCurrentSection(sectionId);

    // If it's a specific service id, open its modal
    const serviceMatch = CLINIC_SERVICES.find((s) => s.id === sectionId);
    if (serviceMatch) {
      setSelectedService(serviceMatch);
      return;
    }

    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenAppointmentModal = (dept: string = 'Ear Treatment') => {
    setAppointmentDepartment(dept);
    setIsAppointmentModalOpen(true);
  };

  return (
    <div className="relative min-h-screen text-slate-800 antialiased flex flex-col bg-transparent selection:bg-blue-600 selection:text-white">
      {/* 1. Global Full-Page Scroll-Based Canvas Animation */}
      <GlobalScrollCanvas />

      {/* 2. Main Header */}
      <Header
        currentSection={currentSection}
        onNavigate={scrollToSection}
        onBookClick={() => handleOpenAppointmentModal()}
        onOpenDoctorModal={() => setIsDoctorModalOpen(true)}
      />

      {/* 3. Main Content Container Overlaying Background */}
      <main className="relative z-10 flex-1">
        {/* Hero Section */}
        <Hero
          onBookClick={() => handleOpenAppointmentModal()}
          onLearnMoreClick={() => setIsDoctorModalOpen(true)}
        />

        {/* Our Services 6-Cards Row */}
        <ServicesSection
          onSelectService={(service) => setSelectedService(service)}
        />

        {/* About Us + 3-Image Collage + Book An Appointment Form */}
        <AboutAndBookingSection
          onLearnMoreAboutUs={() => setIsDoctorModalOpen(true)}
        />

        {/* Stats & Patient Testimonial Bar */}
        <StatsAndTestimonials />

        {/* World-Class German & US Technology Armamentarium */}
        <TechnologySection />

        {/* FAQs & Clinic Gallery */}
        <FaqAndGallerySection />

        {/* Location & Contact */}
        <ContactSection />
      </main>

      {/* 4. Footer */}
      <Footer
        onNavigate={scrollToSection}
        onBookClick={() => handleOpenAppointmentModal()}
        onOpenDoctorModal={() => setIsDoctorModalOpen(true)}
      />

      {/* Floating Action Buttons for quick emergency / appointment reach */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <a
          href="https://wa.me/917905095365"
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          className="w-13 h-13 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
        >
          <MessageSquare className="w-6 h-6" />
        </a>

        <a
          href={`tel:${CLINIC_CONTACT.phone}`}
          aria-label="Call Sareen ENT Clinic"
          className="w-13 h-13 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
        >
          <Phone className="w-6 h-6" />
        </a>
      </div>

      {/* Modals */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onBookAppointment={(serviceTitle) => handleOpenAppointmentModal(serviceTitle)}
      />

      <DoctorModal
        isOpen={isDoctorModalOpen}
        onClose={() => setIsDoctorModalOpen(false)}
        onBookAppointment={() => {
          setIsDoctorModalOpen(false);
          handleOpenAppointmentModal('General ENT Consultation');
        }}
      />

      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
        defaultDepartment={appointmentDepartment}
      />
    </div>
  );
}
