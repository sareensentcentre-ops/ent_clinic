import React from 'react';
import { X, CheckCircle, ShieldCheck, Stethoscope, ArrowRight } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onBookAppointment: (serviceTitle: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onBookAppointment,
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-100 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">
                {service.title}
              </h3>
              <p className="text-xs text-blue-600 font-semibold">
                Sareen&apos;s ENT Specialized Treatment
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Modal"
            className="w-8 h-8 rounded-full bg-slate-200/70 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-600">
          {/* Main Description */}
          <p className="text-sm leading-relaxed text-slate-700">
            {service.fullDesc}
          </p>

          {/* Equipment Used Badge */}
          <div className="flex items-start gap-3 p-3.5 bg-blue-50/60 border border-blue-100 rounded-xl">
            <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wide">
                Specialized Equipment &amp; Technology
              </h4>
              <p className="text-xs text-blue-800 mt-0.5 font-medium">
                {service.equipmentUsed}
              </p>
            </div>
          </div>

          {/* Key Procedures */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Key Procedures &amp; Interventions
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.procedures.map((proc, i) => (
                <div key={i} className="flex items-start gap-2 text-xs">
                  <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-800 font-medium">{proc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Clinical Advantages */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Clinical Advantages at Sareen&apos;s ENT
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.advantages.map((adv, i) => (
                <div key={i} className="flex items-start gap-2 text-xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                  <span className="text-slate-700">{adv}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-500 text-center sm:text-left">
            Consultations by Dr. Akhil Sareen MS (BHU)
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
                onBookAppointment(service.title);
              }}
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-lg text-xs tracking-wide w-full sm:w-auto shadow-sm"
            >
              <span>Book Appointment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
