import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Image as ImageIcon } from 'lucide-react';
import { CLINIC_FAQS } from '../data/clinicData';

export const FaqAndGallerySection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const galleryImages = [
    {
      src: '/images/clinic-1.jpg',
      title: 'Karl Storz Full HD Endoscopic Suite',
      caption: 'Advanced endoscopic diagnosis & FESS surgery setup',
    },
    {
      src: '/images/zeiss-microscope.jpg',
      title: 'Carl Zeiss Extaro 300 Microscope',
      caption: 'German precision magnification for microsurgical ear operations',
    },
    {
      src: '/images/audiometry.jpg',
      title: 'Soundproof Audiometry Testing Suite',
      caption: 'Computerized PTA & middle ear impedance hearing diagnostics',
    },
    {
      src: '/images/clinic-2.jpg',
      title: 'Patient Consultation & Examination Room',
      caption: 'Sterile, comfortable ambience for adult & pediatric care',
    },
  ];

  return (
    <section id="faq" className="py-14 sm:py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Frequently Asked Questions */}
          <div className="lg:col-span-7">
            <div className="mb-8">
              <span className="text-xs font-bold text-blue-400 tracking-widest uppercase mb-2 block flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>QUESTIONS &amp; ANSWERS</span>
              </span>
              <h2 className="text-3xl font-extrabold text-white tracking-tight drop-shadow-md">
                Frequently Asked Questions
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 mt-2 drop-shadow">
                Have questions about OPD consultations, Coblation procedures, or appointments? Find answers below.
              </p>
            </div>

            <div className="space-y-3">
              {CLINIC_FAQS.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="border border-white/40 rounded-xl overflow-hidden bg-white/95 backdrop-blur-md transition-all shadow-md"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-800 hover:text-blue-600 transition-colors"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-blue-600' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/70">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Clinic Facility Gallery */}
          <div className="lg:col-span-5">
            <div className="mb-6">
              <span className="text-xs font-bold text-blue-400 tracking-widest uppercase mb-2 block flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5" />
                <span>CLINICAL AMBIENCE</span>
              </span>
              <h3 className="text-2xl font-extrabold text-white tracking-tight drop-shadow-md">
                Clinic &amp; Equipment Gallery
              </h3>
              <p className="text-xs text-slate-200 mt-1 drop-shadow">
                Authentic glimpse into our high-sterility treatment and surgical facilities in Lanka, Varanasi.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              {galleryImages.map((img, i) => (
                <div
                  key={i}
                  className="group relative rounded-xl overflow-hidden border border-white/30 shadow-xl aspect-square bg-slate-900/50 backdrop-blur-sm"
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end text-white">
                    <h4 className="text-[11px] font-bold leading-tight">
                      {img.title}
                    </h4>
                    <p className="text-[10px] text-slate-300 mt-0.5 line-clamp-2">
                      {img.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3.5 bg-white/95 backdrop-blur-md border border-white/40 rounded-xl text-xs text-blue-900 shadow-md flex items-center justify-between">
              <span>Hygienic &amp; welcoming ambience for patients &amp; attendants</span>
              <span className="font-bold text-blue-700">Lanka, Varanasi</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
