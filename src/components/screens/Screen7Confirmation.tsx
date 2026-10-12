import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  Building2,
  Calendar,
  MapPin,
  HeartHandshake,
  Pencil,
} from 'lucide-react';

export const Screen7Confirmation: React.FC = () => {
  const { goBack, navigateTo, booking, setBooking } = useApp();
  const [editingDateTime, setEditingDateTime] = useState(false);
  const [tempDateTime, setTempDateTime] = useState(booking.dateTime || '25 May 2025, 10:00 AM');

  const handleConfirm = () => {
    setBooking((prev) => ({
      ...prev,
      dateTime: tempDateTime,
      status: 'accepted',
    }));
    navigateTo('8-track');
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-5 pt-3 pb-6 text-slate-900 bg-white overflow-y-auto overscroll-contain">
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={goBack}
            className="p-1 rounded-full text-slate-700 hover:bg-slate-100 transition"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-base font-bold text-slate-900">Booking Confirmation</h2>
          <div className="w-5"></div>
        </div>

        {/* Detailed Summary Cards matching wireframe Screen 7 */}
        <div className="space-y-3">
          {/* Card 1: Service */}
          <div className="p-3.5 rounded-2xl border border-slate-200/90 bg-slate-50/50 flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-100/70 text-blue-700 flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider block">
                Service
              </span>
              <span className="text-sm font-bold text-slate-800">
                {booking.serviceName}
              </span>
            </div>
          </div>

          {/* Card 2: Helper */}
          <div className="p-3.5 rounded-2xl border border-slate-200/90 bg-slate-50/50 flex items-center space-x-3.5">
            <img
              src={booking.helper.avatar}
              alt={booking.helper.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-white shrink-0"
            />
            <div>
              <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider block">
                Helper
              </span>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-slate-800">
                  {booking.helper.name}
                </span>
                <span className="text-xs text-amber-500 font-semibold flex items-center">
                  ★ {booking.helper.rating} ({booking.helper.reviewsCount})
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: Date & Time */}
          <div className="p-3.5 rounded-2xl border border-slate-200/90 bg-slate-50/50 flex items-center justify-between">
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-100/70 text-blue-700 flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider block">
                  Date & Time
                </span>
                {editingDateTime ? (
                  <input
                    type="text"
                    value={tempDateTime}
                    onChange={(e) => setTempDateTime(e.target.value)}
                    className="text-xs p-1 border border-blue-400 rounded bg-white text-slate-800"
                  />
                ) : (
                  <span className="text-xs sm:text-sm font-bold text-slate-800">
                    {tempDateTime}
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={() => setEditingDateTime(!editingDateTime)}
              className="text-xs text-blue-600 font-medium hover:underline p-1"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 4: Location */}
          <div className="p-3.5 rounded-2xl border border-slate-200/90 bg-slate-50/50 flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-100/70 text-blue-700 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider block">
                Location
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-800">
                {booking.location}
              </span>
            </div>
          </div>

          {/* Card 5: Service Price & Helper Acceptance */}
          <div className="p-3.5 rounded-2xl border border-blue-200/90 bg-blue-50/50 flex items-center justify-between">
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-blue-700 font-semibold uppercase tracking-wider block">
                  Service Price & Honorarium
                </span>
                <span className="text-sm font-extrabold text-slate-900">
                  ₹{booking.offeredPrice || 350}
                </span>
                <span className="text-[11px] text-slate-500 block">
                  Helper decides to give service based on this price
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Cancellation Notice */}
        <p className="text-[11px] text-slate-400 text-center mt-5 leading-relaxed px-2">
          You can cancel or reschedule before the helper accepts your request.
        </p>
      </div>

      {/* Confirm CTA */}
      <div className="pt-4">
        <button
          onClick={handleConfirm}
          className="w-full py-3.5 px-4 rounded-xl bg-[#1E56DE] hover:bg-[#1846b8] active:scale-[0.99] text-white text-sm font-semibold tracking-wide shadow-md shadow-blue-500/20 transition-all flex items-center justify-center cursor-pointer"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};
