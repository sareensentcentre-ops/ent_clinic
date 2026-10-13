import React from 'react';
import { ShieldCheck, Cpu, Eye, Sparkles } from 'lucide-react';
import { CLINIC_EQUIPMENT } from '../data/clinicData';

export const TechnologySection: React.FC = () => {
  const getIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Eye className="w-5 h-5 text-blue-600" />;
      case 1:
        return <Cpu className="w-5 h-5 text-blue-600" />;
      case 2:
        return <Sparkles className="w-5 h-5 text-blue-600" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <section id="technology" className="py-14 sm:py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold text-blue-400 tracking-widest uppercase mb-2 block">
            ADVANCED ARMAMENTARIUM
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3 drop-shadow-md">
            World-Class German &amp; US Technology
          </h2>
          <p className="text-sm sm:text-base text-slate-200 drop-shadow">
            Equipped with best-in-class, highly sophisticated surgical and diagnostic equipment for bloodless, stitchless procedures with maximum safety.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CLINIC_EQUIPMENT.map((item, idx) => (
            <div
              key={idx}
              className="bg-white/95 hover:bg-white backdrop-blur-md rounded-2xl p-6 border border-white/40 hover:border-blue-400 shadow-xl hover:shadow-2xl transition-all flex flex-col justify-between transform hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    {getIcon(idx)}
                  </div>
                  <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                    {item.origin}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-1 leading-snug">
                  {item.name}
                </h3>
                <span className="text-xs font-semibold text-blue-600 block mb-3">
                  {item.role}
                </span>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                <span>Installed &amp; Operational in Lanka Clinic</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
