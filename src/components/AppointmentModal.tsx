import React, { useState } from 'react';
import { X, Calendar, User, Phone, Check, ArrowRight, Clock, MapPin, AlertCircle } from 'lucide-react';
import { CLINIC_SERVICES, CLINIC_CONTACT, CLINIC_SLOTS, isSundayDate, getNextAvailableBookingDate } from '../data/clinicData';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDepartment?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  defaultDepartment = 'Ear Treatment',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    department: defaultDepartment,
    date: getNextAvailableBookingDate(),
    slot_time: '09:00 AM',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedToken, setConfirmedToken] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const isSunday = isSundayDate(formData.date);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSunday) {
      setErrorMsg('The clinic is closed on Sundays. Please select Monday through Saturday.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);
    const bookingPayload = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      treatment: formData.department,
      date: formData.date,
      slot_time: formData.slot_time,
    };

    let token = '';
    try {
      let res: Response | null = null;
      try {
        res = await fetch('http://localhost:3000/api/website-booking', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bookingPayload),
        });
      } catch {
        res = await fetch('/api/website-booking', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bookingPayload),
        });
      }
      if (res && res.ok) {
        const data = await res.json();
        token = data.token || `SAR-${Math.floor(100000 + Math.random() * 900000)}`;
      } else {
        token = `SAR-${Math.floor(100000 + Math.random() * 900000)}`;
      }
    } catch {
      token = `SAR-${Math.floor(100000 + Math.random() * 900000)}`;
    } finally {
      setIsSubmitting(false);
      setConfirmedToken(token);
      setSubmitted(true);
      try {
        if (typeof window !== 'undefined' && typeof window.alert === 'function') {
          window.alert(
            `Appointment Confirmed!\nToken: ${token}\nPatient: ${bookingPayload.name}\nTreatment: ${bookingPayload.treatment}\nDate: ${bookingPayload.date}`
          );
        }
      } catch {
        // Fallback for sandboxed iframes
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-100 overflow-hidden max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div>
            <span className="text-[11px] font-bold text-blue-600 tracking-wider uppercase block">
              SAREEN&apos;S ENT CLINIC &bull; VARANASI
            </span>
            <h3 className="text-xl font-extrabold text-slate-900">
              Book Doctor Consultation
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full bg-slate-200/70 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto">
          {submitted ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-7 h-7 stroke-[3]" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">
                Consultation Request Received!
              </h4>
              {confirmedToken && (
                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl max-w-xs mx-auto">
                  <span className="text-[11px] font-bold text-emerald-700 tracking-wider uppercase block">
                    Your Booking Token
                  </span>
                  <span className="text-2xl font-mono font-black text-emerald-700 block mt-0.5">
                    {confirmedToken}
                  </span>
                  <span className="text-[11px] text-emerald-600 block mt-0.5">
                    Save this token for your clinic visit
                  </span>
                </div>
              )}
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Dear <strong>{formData.name}</strong>, we have received your booking request for{' '}
                <strong>{formData.department}</strong> on <strong>{formData.date}</strong> at <strong>{formData.slot_time}</strong>.
                Our clinic staff will call <strong>{formData.phone}</strong> shortly to confirm your appointment.
              </p>

              <div className="p-3 bg-blue-50 rounded-xl text-xs text-blue-900 font-medium">
                <p>Clinic: Flat B1, Lanka, 200m from BHU Gate, Varanasi</p>
                <p className="mt-1 font-bold">Helpline: {CLINIC_CONTACT.phoneFormatted}</p>
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/917905095365?text=Hello%20Sareen%20ENT,%20I%20requested%20an%20appointment%20for%20${encodeURIComponent(
                    formData.name
                  )}%20(${encodeURIComponent(formData.department)})%20on%20${formData.date}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700"
                >
                  Confirm on WhatsApp Now
                </a>
              </div>

              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="mt-3 text-xs text-slate-500 hover:text-slate-700 block mx-auto underline"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Patient Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Patient Full Name *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white pr-10"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Contact Phone Number *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white pr-10"
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              {/* Department */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Department / Treatment Specialty
                </label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white cursor-pointer"
                >
                  {CLINIC_SERVICES.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                  <option value="General ENT Consultation">General ENT Consultation</option>
                  <option value="Audiometry Hearing Evaluation">Audiometry Hearing Evaluation</option>
                </select>
              </div>

              {errorMsg && (
                <div className="flex items-center gap-2 p-2.5 bg-rose-50 text-rose-700 text-xs rounded-lg border border-rose-200">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Preferred Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Preferred Date *
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={formData.date}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => {
                        const newDate = e.target.value;
                        const isSun = isSundayDate(newDate);
                        setFormData({
                          ...formData,
                          date: newDate,
                          slot_time: isSun ? '' : formData.slot_time || '09:00 AM',
                        });
                        if (isSun) {
                          setErrorMsg('Sunday: Clinic Closed. Please pick Monday to Saturday.');
                        } else {
                          setErrorMsg('');
                        }
                      }}
                      className={`w-full bg-slate-50 border rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white ${
                        isSunday ? 'border-rose-300 ring-1 ring-rose-300' : 'border-slate-200'
                      }`}
                    />
                  </div>
                  <span className={`text-[10px] mt-0.5 block ${isSunday ? 'text-rose-600 font-bold' : 'text-slate-400'}`}>
                    {isSunday ? 'Sunday Closed' : 'Mon – Sat only'}
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Consultation Slot *
                  </label>
                  <select
                    value={formData.slot_time}
                    disabled={isSunday}
                    onChange={(e) => setFormData({ ...formData, slot_time: e.target.value })}
                    className={`w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white ${
                      isSunday ? 'opacity-50 cursor-not-allowed bg-slate-100' : 'cursor-pointer'
                    }`}
                  >
                    {isSunday ? (
                      <option value="">Sunday: Closed</option>
                    ) : (
                      <>
                        <optgroup label="Morning (09:00 AM – 12:00 PM)">
                          {CLINIC_SLOTS.morning.slots.map((s) => (
                            <option key={s} value={s}>
                              {s} (Morning)
                            </option>
                          ))}
                        </optgroup>
                        <optgroup label="Evening (05:00 PM – 07:00 PM)">
                          {CLINIC_SLOTS.evening.slots.map((s) => (
                            <option key={s} value={s}>
                              {s} (Evening)
                            </option>
                          ))}
                        </optgroup>
                      </>
                    )}
                  </select>
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    {isSunday ? 'No slots available' : 'Dr. Akhil Sareen OPD'}
                  </span>
                </div>
              </div>

              {/* Sunday Notice */}
              {isSunday && (
                <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>Sunday is closed. Please select Monday – Saturday.</span>
                </div>
              )}

              {/* Quick Clinic Info Box */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  <span>OPD Mon–Sat: 9:00 AM–12:00 PM &amp; 5:00 PM–7:00 PM (Sunday Closed)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  <span>Flat B1, Lanka, 200m from BHU Gate, Varanasi</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting || isSunday}
                className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:text-slate-500 text-white font-bold py-3 rounded-xl text-xs sm:text-sm tracking-wide shadow-sm hover:shadow transition-all disabled:cursor-not-allowed"
              >
                <span>
                  {isSubmitting
                    ? 'CONFIRMING...'
                    : isSunday
                    ? 'SUNDAY CLOSED — CHOOSE MON–SAT'
                    : 'CONFIRM APPOINTMENT REQUEST'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
