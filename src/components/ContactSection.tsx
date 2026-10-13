import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, Check, ExternalLink } from 'lucide-react';
import { CLINIC_CONTACT } from '../data/clinicData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Consultation Inquiry',
    message: '',
  });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
  };

  return (
    <section id="contact" className="py-14 sm:py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold text-blue-400 tracking-widest uppercase mb-2 block">
            LOCATION &amp; CONTACT
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3 drop-shadow-md">
            Visit Sareen&apos;s ENT in Lanka, Varanasi
          </h2>
          <p
            className="text-sm sm:text-base text-slate-200 drop-shadow"
          >
            Conveniently located 200 meters from the BHU main gate, near V2 Mall and Chandra Eye Care.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Cards & Info */}
          <div className="lg:col-span-5 space-y-4">
            {/* Address Card */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-white/40 shadow-xl flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-slate-900 mb-1">
                  Clinic Location
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {CLINIC_CONTACT.addressLine1}, {CLINIC_CONTACT.addressLine2}, {CLINIC_CONTACT.locality}
                </p>
                <div className="mt-2 flex items-center gap-3">
                  <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    {CLINIC_CONTACT.landmark}
                  </span>
                  <a
                    href={CLINIC_CONTACT.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] font-bold text-slate-600 hover:text-blue-600 inline-flex items-center gap-1"
                  >
                    <span>Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Phone & Timings */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-white/40 shadow-xl flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Phone className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-slate-900 mb-1">
                  Telephone &amp; WhatsApp
                </h4>
                <p className="text-xs text-slate-600 mb-2">
                  Call for appointments, queries &amp; directions:
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={`tel:${CLINIC_CONTACT.phone}`}
                    className="text-xs font-bold text-blue-600 hover:underline bg-blue-50 px-3 py-1 rounded-lg"
                  >
                    {CLINIC_CONTACT.phoneFormatted}
                  </a>
                  <a
                    href="https://wa.me/917905095365"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1 rounded-lg inline-flex items-center gap-1 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Chat</span>
                  </a>
                </div>
              </div>
            </div>

            {/* OPD Timings */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-white/40 shadow-xl flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Clock className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-slate-900 mb-1">
                  OPD Schedule
                </h4>
                <div className="text-xs text-slate-600 space-y-1">
                  <p>
                    <strong>Monday – Saturday:</strong> 9:00 AM – 12:00 PM (Morning)
                  </p>
                  <p>
                    <strong>Evening Shift:</strong> 5:00 PM – 7:00 PM
                  </p>
                  <p className="text-rose-600 font-semibold pt-0.5">
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-white/40 shadow-xl flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-slate-900 mb-1">
                  Email Inquiries
                </h4>
                <a
                  href={`mailto:${CLINIC_CONTACT.email}`}
                  className="text-xs text-blue-600 font-semibold hover:underline"
                >
                  {CLINIC_CONTACT.email}
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Send Message Form */}
          <div className="lg:col-span-7 bg-white/95 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/40 shadow-2xl">
            <h3 className="text-xl font-extrabold text-slate-900 mb-2">
              Send a Message or Consultation Query
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Our clinic desk will respond promptly via phone or email during OPD hours.
            </p>

            {isSent ? (
              <div className="p-8 text-center space-y-3 bg-emerald-50 rounded-xl border border-emerald-100">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h4 className="text-base font-bold text-slate-900">
                  Message Sent Successfully!
                </h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Thank you for reaching out. Dr. Akhil Sareen&apos;s team has received your message and will contact you shortly.
                </p>
                <button
                  onClick={() => setIsSent(false)}
                  className="mt-3 text-xs font-semibold text-blue-600 hover:underline block mx-auto"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Verma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. ramesh@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Subject / Treatment Area
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all cursor-pointer"
                    >
                      <option value="Ear Problem / Hearing Loss">Ear Problem / Hearing Loss</option>
                      <option value="Sinusitis / Nasal Blockage / Polyps">Sinusitis / Nasal Blockage / Polyps</option>
                      <option value="Throat / Voice / Hoarseness">Throat / Voice / Hoarseness</option>
                      <option value="Pediatric Tonsils / Adenoids">Pediatric Tonsils / Adenoids</option>
                      <option value="Head & Neck Lump / Cancer Evaluation">Head &amp; Neck Lump / Cancer Evaluation</option>
                      <option value="Audiometry Hearing Test">Audiometry Hearing Test</option>
                      <option value="General OPD Consultation">General OPD Consultation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Describe Your Symptoms or Medical Query
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Provide details about symptoms, duration, previous treatments or preferred appointment timing..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl text-xs sm:text-sm tracking-wide shadow-sm hover:shadow transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Consultation Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
