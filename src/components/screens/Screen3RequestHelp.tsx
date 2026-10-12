import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SERVICE_CATEGORIES } from '../../data/mockData';
import type { UrgencyLevel } from '../../types';
import { ArrowLeft, ChevronRight, Crosshair, MapPin, Check } from 'lucide-react';

export const Screen3RequestHelp: React.FC = () => {
  const {
    navigateTo,
    goBack,
    selectedCategory,
    setSelectedCategory,
    urgency,
    setUrgency,
    location,
    setLocation,
    notes,
    setNotes,
    offeredPrice,
    setOfferedPrice,
    createBookingFromForm,
  } = useApp();

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  const handleUrgencyChange = (level: UrgencyLevel) => {
    setUrgency(level);
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    createBookingFromForm();
    // In the prototype flow: either jump to find nearby helpers or proceed to booking confirmation
    navigateTo('5-helpers');
  };

  const handleDetectLocation = () => {
    setIsLocating(true);
    setTimeout(() => {
      setLocation('Whitefield Main Rd, Bengaluru (GPS Accurate)');
      setIsLocating(false);
    }, 600);
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-5 pt-3 pb-6 text-slate-900 bg-white relative">
      {/* Category Selection Modal Sheet */}
      {showCategoryModal && (
        <div
          className="absolute inset-0 z-50 bg-black/40 flex flex-col justify-end"
          onClick={() => setShowCategoryModal(false)}
        >
          <div
            className="bg-white rounded-t-3xl p-5 shadow-2xl max-h-[80%] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-4"></div>
            <h3 className="text-base font-bold text-slate-900 mb-3">Select Service Category</h3>
            <div className="space-y-2">
              {SERVICE_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setShowCategoryModal(false);
                  }}
                  className={`w-full p-3 rounded-xl border flex items-center justify-between text-left transition ${
                    selectedCategory.id === cat.id
                      ? 'border-blue-600 bg-blue-50/50 text-blue-900'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-sm">{cat.name}</div>
                    <div className="text-xs text-slate-500">{cat.description}</div>
                  </div>
                  {selectedCategory.id === cat.id && (
                    <Check className="w-5 h-5 text-blue-600" />
                  )}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowCategoryModal(false)}
              className="w-full mt-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div>
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-5">
          <button
            onClick={goBack}
            className="p-1 rounded-full text-slate-700 hover:bg-slate-100 transition"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-base font-bold text-slate-900">Request Help</h2>
          <div className="w-5"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleContinue} className="space-y-4">
          {/* Service Category Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Service Category
            </label>
            <button
              type="button"
              onClick={() => setShowCategoryModal(true)}
              className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 text-left flex items-center justify-between transition group"
            >
              <span className="text-xs sm:text-sm text-slate-800 font-medium">
                {selectedCategory ? selectedCategory.name : 'Select a service'}
              </span>
              <div className="flex items-center text-slate-400 group-hover:text-blue-600">
                <ChevronRight className="w-4 h-4" />
              </div>
            </button>
          </div>

          {/* Your Location Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Your Location
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <MapPin className="w-4 h-4 text-blue-600" />
              </div>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter your location"
                className="w-full pl-9 pr-10 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
              />
              <button
                type="button"
                onClick={handleDetectLocation}
                disabled={isLocating}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition"
                title="Use current GPS location"
              >
                <Crosshair className={`w-4 h-4 ${isLocating ? 'animate-spin text-blue-600' : ''}`} />
              </button>
            </div>
          </div>

          {/* Urgency Segmented Control */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Urgency
            </label>
            <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 rounded-xl">
              {(['Low', 'Normal', 'High'] as UrgencyLevel[]).map((level) => {
                const isActive = urgency === level;
                return (
                  <button
                    key={level}
                    type="button"
                    onClick={() => handleUrgencyChange(level)}
                    className={`py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#1E56DE] text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {level}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Service Price & Helper Decision */}
          <div className="p-3 bg-blue-50/70 border border-blue-200/80 rounded-2xl">
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-800">
                Offered Price / Honorarium
              </label>
              <span className="text-[11px] font-extrabold text-blue-700 bg-white px-2 py-0.5 rounded-md border border-blue-200">
                ₹{offeredPrice} ({selectedCategory.priceUnit})
              </span>
            </div>
            <p className="text-[11px] text-slate-600 mb-2">
              Helpers decide to accept the service based on your offered price.
            </p>
            <div className="grid grid-cols-3 gap-2">
              {[selectedCategory.basePrice, selectedCategory.basePrice + 50, selectedCategory.basePrice + 150].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setOfferedPrice(amt)}
                  className={`py-1.5 px-2 rounded-xl text-xs font-bold transition border cursor-pointer ${
                    offeredPrice === amt
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  ₹{amt}
                </button>
              ))}
            </div>
          </div>

          {/* Additional Notes Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Additional Notes
            </label>
            <textarea
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Tell us more about your request..."
              className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition resize-none"
            ></textarea>
          </div>
        </form>
      </div>

      {/* Bottom CTA */}
      <div className="pt-4">
        <button
          onClick={handleContinue}
          className="w-full py-3.5 px-4 rounded-xl bg-[#1E56DE] hover:bg-[#1846b8] active:scale-[0.99] text-white text-sm font-semibold tracking-wide shadow-md shadow-blue-500/20 transition-all flex items-center justify-center cursor-pointer"
        >
          Continue
        </button>
      </div>
    </div>
  );
};
