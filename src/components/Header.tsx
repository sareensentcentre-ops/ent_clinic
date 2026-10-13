import React, { useState } from 'react';
import { Phone, Menu, X, ChevronDown } from 'lucide-react';
import { CLINIC_CONTACT } from '../data/clinicData';

interface HeaderProps {
  currentSection: string;
  onNavigate: (sectionId: string) => void;
  onBookClick: () => void;
  onOpenDoctorModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentSection,
  onNavigate,
  onBookClick,
  onOpenDoctorModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [specializationsOpen, setSpecializationsOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT US' },
    { id: 'services', label: 'SERVICES' },
    { id: 'doctor', label: 'DOCTOR' },
    { id: 'specializations', label: 'SPECIALIZATIONS', hasDropdown: true },
    { id: 'technology', label: 'TECHNOLOGY' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const specializationList = [
    { id: 'ear-treatment', title: 'Zeiss Microscopic Ear Surgery' },
    { id: 'nose-treatment', title: 'Karl Storz Endoscopic Sinus Surgery (FESS)' },
    { id: 'throat-treatment', title: 'Storz Laryngoscopy & Coblation' },
    { id: 'pediatric-ent', title: 'Pediatric Stitchless ENT' },
    { id: 'audiometry-hearing', title: 'Advanced Audiometry & Hearing Tests' },
    { id: 'head-neck-cancer', title: 'Head & Neck Surgical Oncology' },
  ];

  const handleNavClick = (id: string) => {
    if (id === 'doctor') {
      onOpenDoctorModal();
      setMobileMenuOpen(false);
      return;
    }
    onNavigate(id);
    setMobileMenuOpen(false);
    setSpecializationsOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-white/20 transition-shadow duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Brand matching Reference 1 placement */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-xl bg-blue-50 border border-blue-100 group-hover:border-blue-300 transition-colors">
              <img
                src="/images/sareen-logo.png"
                alt="Sareen ENT Logo"
                className="w-10 h-10 object-contain"
                onError={(e) => {
                  // Fallback to text logo if image fails
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                Sareen&apos;s ENT
              </span>
              <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider">
                &amp; Head Neck Centre
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                Lanka, Varanasi
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-[13px] font-bold tracking-wider text-slate-700">
            {navLinks.map((link) => (
              <div key={link.id} className="relative group">
                {link.hasDropdown ? (
                  <button
                    onClick={() => setSpecializationsOpen(!specializationsOpen)}
                    onMouseEnter={() => setSpecializationsOpen(true)}
                    className={`flex items-center gap-1 py-2 hover:text-blue-600 transition-colors uppercase ${
                      currentSection === link.id ? 'text-blue-600 border-b-2 border-blue-600' : ''
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleNavClick(link.id)}
                    className={`py-2 transition-colors uppercase relative hover:text-blue-600 ${
                      currentSection === link.id ? 'text-blue-600' : ''
                    }`}
                  >
                    <span>{link.label}</span>
                    {currentSection === link.id && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                    )}
                  </button>
                )}

                {/* Dropdown for Specializations */}
                {link.hasDropdown && (
                  <div
                    onMouseLeave={() => setSpecializationsOpen(false)}
                    className={`absolute top-full left-0 w-72 bg-white rounded-xl shadow-xl border border-slate-100 py-2 transition-all duration-200 ${
                      specializationsOpen
                        ? 'opacity-100 pointer-events-auto translate-y-1'
                        : 'opacity-0 pointer-events-none -translate-y-2'
                    }`}
                  >
                    {specializationList.map((spec) => (
                      <button
                        key={spec.id}
                        onClick={() => handleNavClick(spec.id)}
                        className="w-full text-left px-4 py-2.5 text-xs font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50/50 transition-colors flex items-center justify-between"
                      >
                        <span>{spec.title}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right: Phone Container exactly matching Reference Image 1 */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${CLINIC_CONTACT.phone}`}
              className="flex items-center gap-3 group"
            >
              <div className="w-11 h-11 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                <Phone className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">
                  Book Appointment
                </span>
                <span className="text-sm font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {CLINIC_CONTACT.phoneFormatted}
                </span>
              </div>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onBookClick}
              className="sm:hidden px-2.5 py-1.5 bg-blue-600 text-white rounded text-xs font-semibold"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <div key={link.id}>
              {link.hasDropdown ? (
                <div>
                  <button
                    onClick={() => setSpecializationsOpen(!specializationsOpen)}
                    className="w-full flex items-center justify-between py-2 text-sm font-bold text-slate-700"
                  >
                    <span>{link.label}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${specializationsOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {specializationsOpen && (
                    <div className="pl-4 py-1 space-y-1 bg-slate-50 rounded-lg my-1">
                      {specializationList.map((spec) => (
                        <button
                          key={spec.id}
                          onClick={() => handleNavClick(spec.id)}
                          className="w-full text-left py-1.5 text-xs text-slate-600 hover:text-blue-600"
                        >
                          {spec.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => handleNavClick(link.id)}
                  className="w-full text-left py-2 text-sm font-bold text-slate-700 hover:text-blue-600"
                >
                  {link.label}
                </button>
              )}
            </div>
          ))}

          <div className="pt-4 border-t border-slate-100">
            <a
              href={`tel:${CLINIC_CONTACT.phone}`}
              className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 text-blue-700 font-bold text-sm"
            >
              <Phone className="w-4 h-4" />
              <span>Call: {CLINIC_CONTACT.phoneFormatted}</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBookClick();
              }}
              className="w-full mt-2 py-2.5 bg-blue-600 text-white rounded-lg font-bold text-sm text-center"
            >
              Book Consultation Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
