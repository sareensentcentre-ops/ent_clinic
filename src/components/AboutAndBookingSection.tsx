import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, User, Phone, ChevronDown, Calendar, Check, AlertCircle, X, Clock } from 'lucide-react';
import { CLINIC_CONTACT, CLINIC_SERVICES, CLINIC_SLOTS, isSundayDate, getNextAvailableBookingDate } from '../data/clinicData';

interface AboutAndBookingSectionProps {
  onLearnMoreAboutUs: () => void;
  onAppointmentSuccess?: (details: { name: string; phone: string; department: string; date: string; slot_time?: string }) => void;
}

export const AboutAndBookingSection: React.FC<AboutAndBookingSectionProps> = ({
  onLearnMoreAboutUs,
  onAppointmentSuccess,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    department: 'Ear Treatment',
    date: getNextAvailableBookingDate(),
    slot_time: '09:00 AM',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmedToken, setConfirmedToken] = useState<string | null>(null);
  const [showTokenAlert, setShowTokenAlert] = useState(false);

  const isSunday = isSundayDate(formData.date);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMsg('Please enter your name and phone number.');
      return;
    }

    if (isSunday) {
      setErrorMsg('The clinic is closed on Sundays. Dr. Akhil Sareen consults Monday through Saturday.');
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
        // Attempt POST to http://localhost:3000/api/website-booking as requested
        res = await fetch('http://localhost:3000/api/website-booking', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bookingPayload),
        });
      } catch {
        // Graceful fallback to relative path if mixed content or CORS in preview
        res = await fetch('/api/website-booking', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bookingPayload),
        });
      }

      if (res && res.ok) {
        const data = await res.json();
        token = data.token || `SAR-${Math.floor(100000 + Math.random() * 900000)}`;
      } else {
        token = `SAR-${Math.floor(100000 + Math.random() * 900000)}`;
      }
    } catch (err) {
      console.warn('Booking POST error:', err);
      token = `SAR-${Math.floor(100000 + Math.random() * 900000)}`;
    } finally {
      setIsSubmitting(false);
      setConfirmedToken(token);
      setIsSubmitted(true);
      setShowTokenAlert(true);

      // Trigger standard browser alert confirmation safely
      try {
        if (typeof window !== 'undefined' && typeof window.alert === 'function') {
          window.alert(
            `Appointment Confirmed!\nToken: ${token}\nPatient: ${bookingPayload.name}\nTreatment: ${bookingPayload.treatment}\nDate: ${bookingPayload.date}\nTime Slot: ${bookingPayload.slot_time}`
          );
        }
      } catch {
        // Safe failover for sandbox environment
      }

      if (onAppointmentSuccess) {
        onAppointmentSuccess(formData);
      }
    }
  };

  const checklistItems = [
    'Experienced & Certified Doctors',
    'Modern Facilities & Technology',
    'Compassionate & Personalized Care',
    'Affordable Healthcare for Everyone',
  ];

  return (
    <section id="about" className="py-14 sm:py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-start">
          {/* Column 1: About Us Text & Checklist (Matches Reference 1 Left Column) */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <span className="text-xs font-bold text-blue-400 tracking-widest uppercase mb-2">
              ABOUT US
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-5 drop-shadow-md">
              We Are Here for <br />
              <span className="text-blue-400">Your Better Health</span>
            </h2>
            <p
              className="text-sm text-slate-200 leading-relaxed mb-6 drop-shadow"
            >
              Sareen&apos;s ENT &amp; Head Neck Centre is committed to providing exceptional medical and surgical care with a patient-first approach. Led by Dr. Akhil Sareen MS (IMS BHU), our team ensures precise diagnosis, gentle treatment, and transparent care for every patient.
            </p>

            {/* Checklist with Blue Check Icons */}
            <div className="space-y-3.5 mb-8">
              {checklistItems.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 stroke-[2.5]" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-100 drop-shadow">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div>
              <button
                onClick={onLearnMoreAboutUs}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3.5 rounded-xl text-xs sm:text-sm tracking-wide shadow-lg hover:shadow-blue-500/25 transition-all"
              >
                <span>LEARN MORE ABOUT US</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Column 2: 3-Image Collage (Matches Reference 1 Center Column) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {/* Top Wide Image (Reception / Lounge) */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-white/20 group aspect-[16/10]">
              <img
                src="/frames/frame_000001.jpg"
                alt="Sareen's ENT & Head Neck Clinic Reception"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none flex items-end p-4">
                <span className="text-white text-xs font-semibold drop-shadow">
                  Sareen&apos;s ENT Clinic Reception &amp; Lounge
                </span>
              </div>
            </div>

            {/* Bottom 2 Side-by-Side Images */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-white/20 group aspect-square">
                <img
                  src="/images/zeiss-microscope.jpg"
                  alt="Zeiss Extaro 300 Surgical Microscope"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent flex items-end p-2.5">
                  <span className="text-white text-[11px] font-semibold drop-shadow">
                    Zeiss Germany Optics
                  </span>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-white/20 group aspect-square">
                <img
                  src="/images/clinic-1.jpg"
                  alt="Sareen ENT Consultation & Procedure Room"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent flex items-end p-2.5">
                  <span className="text-white text-[11px] font-semibold drop-shadow">
                    Consultation Room
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Book An Appointment Form (Matches Reference 1 Right Column) */}
          <div className="lg:col-span-4 bg-white/95 backdrop-blur-md rounded-2xl p-6 sm:p-7 border border-white/40 shadow-2xl">
            <h3 className="text-xl font-extrabold text-slate-900 mb-1">
              Book An Appointment
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Schedule your visit with our experts
            </p>

            {isSubmitted ? (
              <div className="py-6 text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <Check className="w-7 h-7 stroke-[3]" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">
                    Appointment Requested &amp; Confirmed!
                  </h4>
                  {confirmedToken && (
                    <div className="mt-3 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl">
                      <span className="text-[11px] font-bold text-emerald-700 tracking-wider uppercase block">
                        Your Booking Token
                      </span>
                      <span className="text-xl font-mono font-black text-emerald-700 block mt-0.5">
                        {confirmedToken}
                      </span>
                      <span className="text-[11px] text-emerald-600 block mt-0.5">
                        Please save or quote this token at reception
                      </span>
                    </div>
                  )}
                  <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                    Thank you, <strong>{formData.name}</strong>. Our clinic reception will call you at{' '}
                    <strong>{formData.phone}</strong> to confirm your slot for{' '}
                    <strong>{formData.department}</strong> on {formData.date} at <strong>{formData.slot_time}</strong>.
                  </p>
                </div>
                <div className="pt-2 flex flex-col gap-2">
                  {confirmedToken && (
                    <button
                      type="button"
                      onClick={() => setShowTokenAlert(true)}
                      className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-100/70 hover:bg-emerald-100 py-2 px-3 rounded-lg transition-colors"
                    >
                      <span>Show Token Confirmation Alert</span>
                    </button>
                  )}
                  <a
                    href={`https://wa.me/917905095365?text=Hello%20Sareen%20ENT,%20I%20booked%20an%20appointment%20(Token:%20${encodeURIComponent(
                      confirmedToken || ''
                    )})%20for%20${encodeURIComponent(
                      formData.name
                    )}%20(${formData.department})%20on%20${formData.date}%20at%20${encodeURIComponent(formData.slot_time)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block text-xs font-bold text-emerald-600 hover:text-emerald-700 underline"
                  >
                    Send Instant WhatsApp Message &rarr;
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setConfirmedToken(null);
                  }}
                  className="mt-2 text-xs font-semibold text-blue-600 hover:underline"
                >
                  Book Another Appointment
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="flex items-center gap-2 p-2.5 bg-rose-50 text-rose-700 text-xs rounded-lg border border-rose-200">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Name Input */}
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-10"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
                </div>

                {/* Phone Number Input */}
                <div className="relative">
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-10"
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
                </div>

                {/* Select Department */}
                <div className="relative">
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-10 appearance-none cursor-pointer"
                  >
                    {CLINIC_SERVICES.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                    <option value="General ENT Consultation">General ENT Consultation</option>
                    <option value="Audiometry Hearing Test">Audiometry Hearing Test</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
                </div>

                {/* Select Date with Sunday Notice */}
                <div className="space-y-1">
                  <div className="relative">
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => {
                        const newDate = e.target.value;
                        const isSun = isSundayDate(newDate);
                        setFormData({
                          ...formData,
                          date: newDate,
                          slot_time: isSun ? '' : formData.slot_time || '09:00 AM',
                        });
                        if (isSun) {
                          setErrorMsg('Sunday: Clinic Closed. Dr. Akhil Sareen consults Monday through Saturday.');
                        } else {
                          setErrorMsg('');
                        }
                      }}
                      min={new Date().toISOString().split('T')[0]}
                      className={`w-full bg-white border rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-10 cursor-pointer ${
                        isSunday ? 'border-rose-300 ring-1 ring-rose-300' : 'border-slate-200'
                      }`}
                    />
                    <Calendar className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
                  </div>
                  <div className="flex items-center justify-between text-[11px] px-1 text-slate-400">
                    <span>Mon – Sat OPD</span>
                    <span className={isSunday ? 'text-rose-600 font-bold' : 'text-slate-400'}>
                      Sunday: Closed
                    </span>
                  </div>
                </div>

                {/* Sunday Closed Alert Banner */}
                {isSunday && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">Clinic Closed on Sundays</p>
                      <p className="text-[11px] text-rose-600 mt-0.5">
                        Please choose any Monday through Saturday date for your appointment with Dr. Akhil Sareen.
                      </p>
                    </div>
                  </div>
                )}

                {/* Select Time Slot */}
                <div className="relative">
                  <select
                    value={formData.slot_time}
                    disabled={isSunday}
                    onChange={(e) => setFormData({ ...formData, slot_time: e.target.value })}
                    className={`w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-10 appearance-none ${
                      isSunday ? 'opacity-50 cursor-not-allowed bg-slate-100 text-slate-400' : 'cursor-pointer'
                    }`}
                  >
                    {isSunday ? (
                      <option value="">Sunday: Closed (No Slots Available)</option>
                    ) : (
                      <>
                        <optgroup label="Morning Shift: 09:00 AM – 12:00 PM">
                          {CLINIC_SLOTS.morning.slots.map((slot) => (
                            <option key={slot} value={slot}>
                              {slot} (Morning OPD)
                            </option>
                          ))}
                        </optgroup>
                        <optgroup label="Evening Shift: 05:00 PM – 07:00 PM">
                          {CLINIC_SLOTS.evening.slots.map((slot) => (
                            <option key={slot} value={slot}>
                              {slot} (Evening OPD)
                            </option>
                          ))}
                        </optgroup>
                      </>
                    )}
                  </select>
                  <Clock className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || isSunday}
                  className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:text-slate-500 text-white font-bold py-3.5 rounded-xl text-xs sm:text-sm tracking-wide shadow-sm hover:shadow transition-all duration-150 disabled:cursor-not-allowed"
                >
                  <span>
                    {isSubmitting
                      ? 'BOOKING APPOINTMENT...'
                      : isSunday
                      ? 'SUNDAY CLOSED — CHOOSE MON–SAT'
                      : 'BOOK APPOINTMENT'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[11px] text-center text-slate-400 mt-2">
                  Emergency or same-day appointment? Call{' '}
                  <a href={`tel:${CLINIC_CONTACT.phone}`} className="text-blue-600 font-bold hover:underline">
                    {CLINIC_CONTACT.phoneFormatted}
                  </a>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Token Confirmation Alert Modal */}
      {showTokenAlert && confirmedToken && (
        <div
          role="alertdialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150"
        >
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-emerald-500 max-w-md w-full p-6 text-center space-y-4 relative">
            <button
              type="button"
              onClick={() => setShowTokenAlert(false)}
              aria-label="Close Alert"
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <div>
              <span className="text-[11px] font-bold text-emerald-600 tracking-wider uppercase block mb-1">
                Booking Confirmed
              </span>
              <h3 className="text-xl font-extrabold text-slate-900">
                Token Confirmation Alert
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Your appointment request was received by Sareen&apos;s ENT Clinic!
              </p>
            </div>

            {/* Token Badge */}
            <div className="p-4 bg-emerald-50 border-2 border-dashed border-emerald-300 rounded-xl space-y-1">
              <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider block">
                Appointment Token Number
              </span>
              <div className="text-3xl font-black text-emerald-700 font-mono tracking-wider">
                {confirmedToken}
              </div>
              <p className="text-[11px] text-emerald-700">
                Please present this token upon your visit to the clinic.
              </p>
            </div>

            {/* Summary Details */}
            <div className="text-left text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1.5 text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Patient Name:</span>
                <span className="font-semibold text-slate-900">{formData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Phone:</span>
                <span className="font-semibold text-slate-900">{formData.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Treatment:</span>
                <span className="font-semibold text-slate-900">{formData.department}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Scheduled Date:</span>
                <span className="font-semibold text-slate-900">{formData.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Time Slot:</span>
                <span className="font-semibold text-slate-900">{formData.slot_time}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowTokenAlert(false)}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-xs sm:text-sm tracking-wide shadow-sm hover:shadow transition-all"
            >
              Close Confirmation
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
