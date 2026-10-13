import React from 'react';
import { X, Award, GraduationCap, Building, CheckCircle2, Calendar, Phone, ArrowRight } from 'lucide-react';
import { DOCTOR_PROFILE, CLINIC_CONTACT } from '../data/clinicData';

interface DoctorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookAppointment: () => void;
}

export const DoctorModal: React.FC<DoctorModalProps> = ({
  isOpen,
  onClose,
  onBookAppointment,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-100 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <span className="text-[11px] font-bold text-blue-600 uppercase tracking-widest block">
              DOCTOR PROFILE &amp; CREDENTIALS
            </span>
            <h3 className="text-2xl font-extrabold text-slate-900">
              {DOCTOR_PROFILE.name}
            </h3>
            <p className="text-xs text-slate-600 font-semibold mt-0.5">
              {DOCTOR_PROFILE.qualifications} &bull; {DOCTOR_PROFILE.title}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Doctor Profile"
            className="w-8 h-8 rounded-full bg-slate-200/70 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-600">
          {/* Quick Doctor Summary Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-blue-50/50 p-5 rounded-2xl border border-blue-100/60">
            <div className="md:col-span-4 flex justify-center">
              <div className="relative w-36 h-36 rounded-2xl overflow-hidden border-2 border-white shadow-md bg-white">
                <img
                  src="/images/dr-akhil-sareen.png"
                  alt="Dr. Akhil Sareen"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/doc-img.png";
                  }}
                />
              </div>
            </div>
            <div className="md:col-span-8 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-700">
                <Award className="w-4 h-4 text-blue-600" />
                <span>{DOCTOR_PROFILE.experience}</span>
              </div>
              <p className="text-xs leading-relaxed text-slate-700">
                {DOCTOR_PROFILE.bio}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {DOCTOR_PROFILE.fellowships.map((f, i) => (
                  <span
                    key={i}
                    className="inline-block bg-white text-slate-800 border border-slate-200 px-2.5 py-1 rounded-md text-[11px] font-semibold"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Education & Fellowships */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-blue-600" />
              <span>Academic Qualifications &amp; Fellowships</span>
            </h4>
            <div className="space-y-2">
              <div className="p-3 bg-slate-50 rounded-xl text-xs flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">MBBS &amp; MS (Otolaryngology / ENT)</strong>
                  <p className="text-slate-600 mt-0.5">Institute of Medical Sciences (IMS), Banaras Hindu University (BHU), Varanasi</p>
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl text-xs flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">Fellowship of Head &amp; Neck Surgery (FOHNS)</strong>
                  <p className="text-slate-600 mt-0.5">Specialized advanced surgical training in oral, laryngeal, and neck cancer resections.</p>
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl text-xs flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">Fellowship in Endoscopic &amp; Skull Base Surgery</strong>
                  <p className="text-slate-600 mt-0.5">Minimally invasive sinus, skull base, and CSF leak repair techniques.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Clinical Leadership & Affiliations */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Building className="w-4 h-4 text-blue-600" />
              <span>Hospital Appointments &amp; Affiliations</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {DOCTOR_PROFILE.affiliations.map((aff, i) => (
                <div key={i} className="p-3 border border-slate-200/80 rounded-xl text-xs">
                  <span className="font-semibold text-slate-800">{aff}</span>
                </div>
              ))}
            </div>
          </div>

          {/* OPD Consultation Timings */}
          <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-xl flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-amber-700" />
              <div>
                <span className="text-xs font-bold text-amber-900 block">
                  OPD Consultation Schedule
                </span>
                <span className="text-xs text-amber-800">
                  Mon – Sat: 9:00 AM – 12:00 PM &amp; 5:00 PM – 7:00 PM (Sunday Closed)
                </span>
              </div>
            </div>
            <a
              href={`tel:${CLINIC_CONTACT.phone}`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 hover:text-amber-950"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{CLINIC_CONTACT.phoneFormatted}</span>
            </a>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-500">
            Clinic: Flat B1, Lanka, 200m from BHU Gate, Varanasi
          </span>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 border border-slate-200 rounded-lg w-full sm:w-auto"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onBookAppointment();
              }}
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-lg text-xs tracking-wide w-full sm:w-auto shadow-sm"
            >
              <span>Book Appointment with Dr. Sareen</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
