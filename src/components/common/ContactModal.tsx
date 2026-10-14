import React, { useState } from 'react';
import { Mail, Phone, MapPin, X, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
      onClose();
    }, 2500);
  };

  const founderEmails = [
    'n220949@rguktn.ac.in',
    'n220626@rguktn.ac.in',
    'n220876@rguktn.ac.in',
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div
        className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-left mb-5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Trust Aid Support & Founders</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            We're Here to Help
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            College Startup Pitch · RGUKT Nuzvid Student Innovation
          </p>
        </div>

        {/* Official Email Contacts */}
        <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 mb-4 text-left">
          <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-2">
            Founder & Support Email IDs
          </span>
          <div className="space-y-2">
            {founderEmails.map((email) => (
              <a
                key={email}
                href={`mailto:${email}?subject=Trust%20Aid%20Inquiry`}
                className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200/80 hover:border-blue-400 hover:bg-blue-50/30 transition group"
              >
                <div className="flex items-center space-x-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-800 group-hover:text-blue-600 transition">
                    {email}
                  </span>
                </div>
                <span className="text-[10px] text-blue-600 font-semibold group-hover:underline">
                  Email us →
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Quick Contact Numbers & Location */}
        <div className="grid grid-cols-2 gap-2 mb-5 text-left text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-1.5 text-slate-700 font-bold mb-0.5">
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>Helpline</span>
            </div>
            <a href="tel:+919845012345" className="text-slate-600 hover:text-blue-600 font-semibold text-[11px]">
              +91 98450 12345
            </a>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-1.5 text-slate-700 font-bold mb-0.5">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span>Campus / Hub</span>
            </div>
            <span className="text-slate-600 font-medium text-[11px]">
              RGUKT Nuzvid / Bengaluru
            </span>
          </div>
        </div>

        {/* Interactive Contact / Demo Request Form */}
        <div className="border-t border-slate-100 pt-4 text-left">
          <h3 className="text-xs font-bold text-slate-800 mb-2.5">
            Send us a Message or Request a Demo
          </h3>

          {submitted ? (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center text-emerald-800 space-y-1">
              <CheckCircle2 className="w-7 h-7 text-emerald-600 mx-auto" />
              <p className="text-xs font-bold">Message Sent Successfully!</p>
              <p className="text-[11px] text-emerald-600">Our student founders will get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-2.5">
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your Name"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Your Email"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <textarea
                rows={2}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Questions, feedback, or college pitch inquiries..."
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
              ></textarea>
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Inquiry to Team</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
