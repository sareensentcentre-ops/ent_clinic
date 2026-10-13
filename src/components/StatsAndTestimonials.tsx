import React, { useState } from 'react';
import { Users, Award, Stethoscope, Activity, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { CLINIC_STATS, TESTIMONIALS } from '../data/clinicData';

export const StatsAndTestimonials: React.FC = () => {
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  const prevTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS[activeTestimonialIdx];

  const getStatIcon = (type: string) => {
    switch (type) {
      case 'patients':
        return <Users className="w-8 h-8 text-blue-600 stroke-[1.75]" />;
      case 'experience':
        return <Award className="w-8 h-8 text-blue-600 stroke-[1.75]" />;
      case 'surgeries':
        return <Stethoscope className="w-8 h-8 text-blue-600 stroke-[1.75]" />;
      case 'doctors':
      default:
        return <Activity className="w-8 h-8 text-blue-600 stroke-[1.75]" />;
    }
  };

  return (
    <section className="py-14 sm:py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Side: 4 Stats matching Reference Image 1 */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {CLINIC_STATS.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-white/40 shadow-xl flex flex-col items-center hover:shadow-2xl transition-all"
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-50/80 flex items-center justify-center mb-3">
                  {getStatIcon(stat.icon)}
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-900 mt-1">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 hidden sm:block">
                  {stat.sublabel}
                </div>
              </div>
            ))}
          </div>

          {/* Right Side: What Our Patients Say Box matching Reference Image 1 */}
          <div className="lg:col-span-5 bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/40 shadow-2xl relative text-slate-800">
            <span className="text-[11px] font-bold text-blue-600 tracking-widest uppercase block mb-3">
              WHAT OUR PATIENTS SAY
            </span>

            {/* Blue Quote Mark */}
            <div className="text-blue-600 mb-3">
              <Quote className="w-8 h-8 rotate-180 fill-blue-600/10 text-blue-600" />
            </div>

            {/* Testimonial Quote */}
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic mb-6 min-h-[72px]">
              &ldquo;{current.comment}&rdquo;
            </p>

            {/* Reviewer Details + Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                  {current.avatarText}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-tight">
                    {current.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Verified Patient &bull; {current.treatment}
                  </p>
                </div>
              </div>

              {/* Slider Controls */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={prevTestimonial}
                  aria-label="Previous Testimonial"
                  className="w-8 h-8 rounded-full border border-slate-200 hover:border-blue-500 hover:text-blue-600 text-slate-600 flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextTestimonial}
                  aria-label="Next Testimonial"
                  className="w-8 h-8 rounded-full border border-slate-200 hover:border-blue-500 hover:text-blue-600 text-slate-600 flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
