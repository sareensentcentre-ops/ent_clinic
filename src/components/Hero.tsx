import React from 'react';
import { ArrowRight, Calendar, Clock, MapPin, PlusSquare, ShieldCheck, Heart, ChevronDown } from 'lucide-react';

interface HeroProps {
  onBookClick: () => void;
  onLearnMoreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick, onLearnMoreClick }) => {
  return (
    <section id="home" className="relative z-10 pt-8 pb-16 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-24 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: Headline, Copy, Actions & Trust Badges */}
          <div className="lg:col-span-6 xl:col-span-6">
            {/* Small Kicker with Dash */}
            <div className="flex items-center gap-2 mb-3 text-blue-400 font-bold text-xs sm:text-sm tracking-wider uppercase">
              <span className="w-6 h-0.5 bg-blue-500 inline-block"></span>
              <span>WELCOME TO SAREEN&apos;S ENT CLINIC</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] mb-6 drop-shadow-md">
              Your Health, <br />
              <span className="text-blue-400">Our Priority</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed mb-8 max-w-xl drop-shadow">
              We provide high-precision medical and surgical care for ear, nose, throat and head-neck conditions with German Zeiss microscopy, Karl Storz endoscopy, and Coblation technology for you and your family.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <button
                onClick={onBookClick}
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold px-7 py-3.5 rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all duration-150 text-sm tracking-wide transform hover:-translate-y-0.5"
              >
                <span>BOOK APPOINTMENT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onLearnMoreClick}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-3.5 rounded-xl border border-white/20 hover:border-white/40 backdrop-blur-md transition-all duration-150 text-sm tracking-wide transform hover:-translate-y-0.5"
              >
                <span>LEARN MORE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Trust Badges matching Reference bottom row */}
            <div className="flex flex-wrap items-center gap-5 sm:gap-6 pt-4 border-t border-white/15 text-xs sm:text-sm font-semibold text-slate-200">
              <div className="flex items-center gap-2">
                <div className="text-blue-400">
                  <PlusSquare className="w-5 h-5" />
                </div>
                <span>Expert Doctors</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-blue-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span>Advanced Technology</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-blue-400">
                  <Heart className="w-5 h-5" />
                </div>
                <span>Patient Focused Care</span>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Info Card with Glassmorphism */}
          <div className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-end mt-4 lg:mt-0">
            <div className="w-full max-w-[420px] bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/40 p-6 sm:p-7 space-y-5 text-slate-800">
              {/* Item 1: Book Appointment */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-tight">
                    Book Appointment
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Easy &amp; Fast Consultation
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-100" />

              {/* Item 2: Opening Hours */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-tight">
                    Opening Hours
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Mon – Sat: 09:00 AM – 12:00 PM <br />
                    Evening: 05:00 PM – 07:00 PM <br />
                    <span className="text-rose-500 font-semibold">Sunday Closed</span>
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-100" />

              {/* Item 3: Visit Our Clinic */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-tight">
                    Visit Our Clinic
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    Flat no B1, behind V2 Mall, next to Chandra Eye Care, Rashmi Nagar Colony, Lanka, Varanasi.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onBookClick}
                  className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-3.5 rounded-xl text-xs sm:text-sm tracking-wide shadow-md hover:shadow-lg transition-all"
                >
                  <span>SCHEDULE VISIT NOW</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint indicator */}
        <div className="mt-12 flex items-center justify-center text-white/70 text-xs font-semibold tracking-widest uppercase gap-2">
          <span>SCROLL DOWN TO EXPLORE SERVICES &amp; CLINIC WALKTHROUGH</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-blue-400" />
        </div>
      </div>
    </section>
  );
};
