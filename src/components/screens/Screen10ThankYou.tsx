import React from 'react';
import { useApp } from '../../context/AppContext';
import { Check } from 'lucide-react';

export const Screen10ThankYou: React.FC = () => {
  const { navigateTo, booking, feedback } = useApp();

  return (
    <div className="flex-1 flex flex-col justify-between px-5 pt-8 pb-6 text-slate-900 bg-white">
      <div className="flex flex-col items-center text-center">
        {/* Large green checkmark circle matching wireframe */}
        <div className="w-20 h-20 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/25 mb-5 ring-8 ring-emerald-50 animate-bounce-short">
          <Check className="w-10 h-10 stroke-[3]" />
        </div>

        <h1 className="text-2xl font-extrabold text-slate-900 mb-1.5">
          Thank you!
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xs mb-8">
          Your help makes our community stronger.
        </p>

        {/* Request Summary Card matching wireframe Screen 10 */}
        <div className="w-full bg-slate-50/70 rounded-2xl border border-slate-200/90 p-4 text-left shadow-2xs">
          <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
            Request Summary
          </h2>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
              <span className="text-slate-500 font-medium">Service</span>
              <span className="font-bold text-slate-800">{booking.serviceName}</span>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
              <span className="text-slate-500 font-medium">Helper</span>
              <span className="font-bold text-slate-800">{booking.helper.name}</span>
            </div>

            <div className="flex justify-between items-center py-1">
              <span className="text-slate-500 font-medium">Date & Time</span>
              <span className="font-bold text-slate-800">{booking.dateTime}</span>
            </div>

            {feedback.rating > 0 && (
              <div className="flex justify-between items-center pt-1 border-t border-slate-200/60">
                <span className="text-slate-500 font-medium">Your Rating</span>
                <span className="font-bold text-amber-500">
                  {'★'.repeat(feedback.rating)} ({feedback.rating}/5)
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Back to Home CTA */}
      <div className="pt-6">
        <button
          onClick={() => navigateTo('2-home')}
          className="w-full py-3.5 px-4 rounded-xl bg-[#1E56DE] hover:bg-[#1846b8] active:scale-[0.99] text-white text-sm font-semibold tracking-wide shadow-md shadow-blue-500/20 transition-all flex items-center justify-center cursor-pointer"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};
