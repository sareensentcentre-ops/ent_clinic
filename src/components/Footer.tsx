import React, { useState } from 'react';
import { MapPin, Phone, Mail, Globe, Send, Facebook, Twitter, Instagram, Linkedin, Check } from 'lucide-react';
import { CLINIC_CONTACT, CLINIC_SERVICES } from '../data/clinicData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onBookClick: () => void;
  onOpenDoctorModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onBookClick,
  onOpenDoctorModal,
}) => {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
    }
  };

  return (
    <footer className="bg-[#0b1f3a]/90 backdrop-blur-md text-slate-300 pt-16 pb-8 border-t border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 5 Columns Layout matching Reference Image 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 pb-12 border-b border-slate-800/80">
          {/* Column 1: Logo & Mission (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center p-1.5 border border-white/20">
                <img
                  src="/images/sareen-logo.png"
                  alt="Sareen ENT Logo"
                  className="w-full h-full object-contain brightness-110"
                />
              </div>
              <div>
                <span className="font-extrabold text-base text-white tracking-tight block">
                  Sareen&apos;s ENT
                </span>
                <span className="text-[10px] font-semibold text-blue-400 tracking-wider uppercase block">
                  &amp; Head Neck Centre
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              We are dedicated to providing high-precision ENT and Head &amp; Neck surgical oncology care with compassion, modern German technology, and surgical excellence.
            </p>

            {/* Social Circle Icons */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-blue-600 text-white flex items-center justify-center transition-colors text-xs"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-blue-400 text-white flex items-center justify-center transition-colors text-xs"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-pink-600 text-white flex items-center justify-center transition-colors text-xs"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-blue-700 text-white flex items-center justify-center transition-colors text-xs"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors"
                >
                  Our Services
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenDoctorModal}
                  className="hover:text-white transition-colors"
                >
                  Dr. Akhil Sareen
                </button>
              </li>
              <li>
                <button
                  onClick={onBookClick}
                  className="hover:text-white transition-colors"
                >
                  Book Appointment
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('technology')}
                  className="hover:text-white transition-colors"
                >
                  Zeiss &amp; Storz Tech
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Services (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-xs">
              {CLINIC_SERVICES.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => onNavigate(s.id)}
                    className="hover:text-white transition-colors text-left"
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Contact Info
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300 leading-relaxed">
                  {CLINIC_CONTACT.addressLine1}, {CLINIC_CONTACT.addressLine2}, {CLINIC_CONTACT.locality}
                  <span className="block text-slate-400 text-[11px] mt-0.5">({CLINIC_CONTACT.landmark})</span>
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a
                  href={`tel:${CLINIC_CONTACT.phone}`}
                  className="hover:text-white transition-colors font-semibold"
                >
                  {CLINIC_CONTACT.phoneFormatted}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a
                  href={`mailto:${CLINIC_CONTACT.email}`}
                  className="hover:text-white transition-colors"
                >
                  {CLINIC_CONTACT.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a
                  href={CLINIC_CONTACT.website}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  www.sareenent.com
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Newsletter / Updates (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              OPD Timings
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              Mon – Sat: 9:00 AM – 12:00 PM <br />
              Evening: 5:00 PM – 7:00 PM <br />
              <span className="text-amber-400 font-medium">Sunday: Closed</span>
            </p>

            <form onSubmit={handleSubscribe} className="relative mt-4">
              <input
                type="email"
                required
                placeholder="Your Email Address"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-3 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                aria-label="Submit Email"
                className="absolute right-1 top-1 bottom-1 px-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-md flex items-center justify-center transition-colors"
              >
                {subscribed ? <Check className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
              </button>
            </form>
            {subscribed && (
              <p className="text-[11px] text-emerald-400 mt-2">
                Thank you! We will keep you updated.
              </p>
            )}
          </div>
        </div>

        {/* Bottom Bar matching Reference Image 1 */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; 2026 Sareen&apos;s ENT &amp; Head Neck Centre. All Rights Reserved.
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
              Privacy Policy
            </button>
            <span className="text-slate-700">|</span>
            <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </button>
            <span className="text-slate-700">|</span>
            <a
              href={CLINIC_CONTACT.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 hover:underline"
            >
              Google Maps Location
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
