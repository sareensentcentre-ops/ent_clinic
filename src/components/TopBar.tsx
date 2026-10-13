import React from 'react';
import { Phone, Clock, MapPin, ArrowRight } from 'lucide-react';
import { CLINIC_CONTACT } from '../data/clinicData';

interface TopBarProps {
  onBookClick: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onBookClick }) => {
  return (
    <div className="bg-[#0b1f3a] text-white text-xs sm:text-sm py-2 px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-slate-300">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            <span>OPD: Mon–Sat 9:00 AM–12:00 PM & 5:00 PM–7:00 PM</span>
          </div>
          <span className="hidden sm:inline text-slate-600">|</span>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-blue-400" />
            <span>Flat no B1, behind V2 Mall, next to Chandra Eye Care, Rashmi Nagar Colony, Lanka, Varanasi.</span>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-slate-300 hidden lg:inline whitespace-nowrap">FOR APPOINTMENTS & CONSULTATION:</span>
          <a
            href={`tel:${CLINIC_CONTACT.phone}`}
            className="flex items-center gap-1.5 font-bold text-white hover:text-blue-300 transition-colors whitespace-nowrap flex-shrink-0"
          >
            <Phone className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
            <span className="whitespace-nowrap">{CLINIC_CONTACT.phoneFormatted}</span>
          </a>
          <button
            onClick={onBookClick}
            className="hidden sm:inline-flex items-center gap-1 bg-blue-600 hover:bg-blue-500 text-white font-medium px-3 py-1 rounded text-xs transition-colors"
          >
            <span>BOOK NOW</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
