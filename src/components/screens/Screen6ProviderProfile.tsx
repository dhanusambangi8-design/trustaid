import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, MoreHorizontal, ShieldCheck, CheckCircle2, Award, Heart } from 'lucide-react';

export const Screen6ProviderProfile: React.FC = () => {
  const { goBack, navigateTo, selectedHelper, createBookingFromForm } = useApp();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);

  const handleBookHelper = () => {
    createBookingFromForm();
    navigateTo('7-confirm');
  };

  const handleShare = () => {
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-5 pt-3 pb-6 text-slate-900 bg-white relative">
      {showShareToast && (
        <div className="absolute top-12 left-6 right-6 z-50 bg-slate-900 text-white text-xs py-2 px-3 rounded-lg text-center shadow-lg">
          Profile link copied to clipboard!
        </div>
      )}

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
          <h2 className="text-base font-bold text-slate-900">Provider Profile</h2>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="p-1.5 rounded-full text-slate-500 hover:text-red-500 hover:bg-slate-100 transition"
              aria-label="Save helper"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-1.5 rounded-full text-slate-700 hover:bg-slate-100 transition"
              aria-label="More options"
            >
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Profile Card Header */}
        <div className="flex flex-col items-center text-center mt-2 mb-6">
          <div className="relative mb-3">
            <img
              src={selectedHelper.avatar}
              alt={selectedHelper.name}
              className="w-24 h-24 rounded-full object-cover ring-4 ring-slate-100 shadow-sm"
            />
            {/* Green Shield Verification Badge on top right of avatar */}
            <div className="absolute top-0 -right-6 flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-300 px-2 py-1 rounded-xl shadow-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <div className="text-[9px] font-bold leading-tight text-left">
                <span>Verified</span>
                <span className="block text-[8px] text-emerald-600 font-normal">& checked</span>
              </div>
            </div>
          </div>

          <h1 className="text-xl font-bold text-slate-900">
            {selectedHelper.name}
          </h1>
          <p className="text-xs text-blue-600 font-semibold mt-0.5">
            {selectedHelper.serviceName}
          </p>

          {/* Rating and completed metrics */}
          <div className="flex items-center justify-center gap-1.5 mt-2 text-xs text-slate-600">
            <span className="flex items-center text-amber-500 font-bold">
              ★ {selectedHelper.rating}
            </span>
            <span>({selectedHelper.reviewsCount} reviews)</span>
            <span className="text-slate-300">•</span>
            <span className="font-medium text-slate-700">
              {selectedHelper.helpsCompleted} helps completed
            </span>
          </div>

          {/* Helper Pricing Badge */}
          <div className="inline-flex items-center gap-2 mt-3 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs">
            <span className="text-slate-600 font-medium">Standard Rate:</span>
            <span className="font-bold text-blue-700">₹{selectedHelper.priceRate}</span>
            <span className="text-[10px] text-slate-400">(Accepts min ₹{selectedHelper.minAcceptedPrice})</span>
          </div>
        </div>

        {/* About Section */}
        <div className="mb-5 text-left">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
            About {selectedHelper.name.split(' ')[0]}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
            {selectedHelper.about}
          </p>
        </div>

        {/* Verification Badges matching wireframe row */}
        <div className="mb-6">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
            Verification & Badges
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {selectedHelper.badges.map((badge, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-slate-200 bg-white text-center shadow-2xs hover:border-blue-300 transition"
              >
                <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-1.5">
                  {idx === 0 ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : idx === 1 ? (
                    <ShieldCheck className="w-3.5 h-3.5" />
                  ) : (
                    <Award className="w-3.5 h-3.5" />
                  )}
                </div>
                <span className="text-[10px] font-semibold text-slate-700 leading-tight">
                  {badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Bottom CTA */}
      <div className="pt-2">
        <button
          onClick={handleBookHelper}
          className="w-full py-3.5 px-4 rounded-xl bg-[#1E56DE] hover:bg-[#1846b8] active:scale-[0.99] text-white text-sm font-semibold tracking-wide shadow-md shadow-blue-500/20 transition-all flex items-center justify-center cursor-pointer"
        >
          Book Helper
        </button>
      </div>
    </div>
  );
};
