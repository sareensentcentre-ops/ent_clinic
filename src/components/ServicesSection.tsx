import React from 'react';
import { ArrowRight, Stethoscope, Activity, Sparkles, Baby, FlaskConical, BriefcaseMedical } from 'lucide-react';
import { CLINIC_SERVICES } from '../data/clinicData';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  // Mapping the 6 reference visual cards to the 6 clinic services
  const cards = [
    {
      serviceId: 'ear-treatment',
      category: 'Ear Treatment',
      subtitle: 'Microscopic ear surgeries, eardrum repair & hearing restoration',
      icon: Stethoscope,
    },
    {
      serviceId: 'nose-treatment',
      category: 'Nose & Sinus',
      subtitle: 'Endoscopic sinus surgery (FESS), polyps & allergy care',
      icon: Activity,
    },
    {
      serviceId: 'throat-treatment',
      category: 'Throat & Voice',
      subtitle: 'Storz video laryngoscopy, vocal nodules & stitchless Coblation',
      icon: Sparkles,
    },
    {
      serviceId: 'pediatric-ent',
      category: 'Pediatrics',
      subtitle: 'Specialized gentle care for children, adenoids & glue ear',
      icon: Baby,
    },
    {
      serviceId: 'audiometry-hearing',
      category: 'Audiometry Lab',
      subtitle: 'Accurate testing & diagnostic services, PTA & hearing aids',
      icon: FlaskConical,
    },
    {
      serviceId: 'head-neck-cancer',
      category: 'Head & Neck Oncology',
      subtitle: 'Advanced surgical oncology for oral, laryngeal & neck tumors',
      icon: BriefcaseMedical,
    },
  ];

  return (
    <section id="services" className="py-14 sm:py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Heading Block */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold text-blue-400 tracking-widest uppercase mb-2 block">
            OUR SERVICES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3 drop-shadow-md">
            Comprehensive Healthcare Services
          </h2>
          <p className="text-sm sm:text-base text-slate-200 drop-shadow">
            We offer a wide range of specialized ENT and head-neck medical services to keep you and your family healthy.
          </p>
        </div>

        {/* 6 Cards Grid matching Reference Image 1 proportions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {cards.map((item) => {
            const service = CLINIC_SERVICES.find((s) => s.id === item.serviceId) || CLINIC_SERVICES[0];
            const Icon = item.icon;

            return (
              <div
                key={item.serviceId}
                onClick={() => onSelectService(service)}
                className="group bg-white/95 hover:bg-white backdrop-blur-md rounded-2xl p-6 border border-white/40 hover:border-blue-400 shadow-xl hover:shadow-2xl transition-all duration-200 flex flex-col justify-between text-center cursor-pointer transform hover:-translate-y-1"
              >
                <div>
                  {/* Clean Icon matching Reference 1 style */}
                  <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-blue-50/80 text-blue-600 flex items-center justify-center group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all duration-200">
                    <Icon className="w-7 h-7 stroke-[1.75]" />
                  </div>

                  {/* Card Title */}
                  <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {item.category}
                  </h3>

                  {/* Short Description */}
                  <p className="text-xs text-slate-500 leading-relaxed mb-6">
                    {item.subtitle}
                  </p>
                </div>

                {/* Learn More Link */}
                <div className="pt-2 border-t border-slate-100/80">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 group-hover:text-blue-700 uppercase tracking-wider">
                    <span>LEARN MORE</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
