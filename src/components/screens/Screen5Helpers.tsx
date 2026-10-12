import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HELPERS_DATA, SERVICE_CATEGORIES } from '../../data/mockData';
import type { Helper } from '../../types';
import { ArrowLeft, SlidersHorizontal, Star, Check, Search } from 'lucide-react';

export const Screen5Helpers: React.FC = () => {
  const {
    goBack,
    navigateTo,
    setSelectedHelper,
    activeFilterCategory,
    setActiveFilterCategory,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [showAllHelpers, setShowAllHelpers] = useState(false);

  const filteredHelpers = HELPERS_DATA.filter((helper) => {
    const matchesCategory =
      !activeFilterCategory || helper.serviceId === activeFilterCategory;
    const matchesSearch =
      helper.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      helper.serviceName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const displayedHelpers = showAllHelpers ? filteredHelpers : filteredHelpers.slice(0, 4);

  const handleSelectHelper = (helper: Helper) => {
    setSelectedHelper(helper);
    navigateTo('6-profile');
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-5 pt-3 pb-6 text-slate-900 bg-white relative overflow-y-auto overscroll-contain">
      {/* Filter drawer / modal */}
      {showFilterDrawer && (
        <div
          className="absolute inset-0 z-50 bg-black/40 flex flex-col justify-end"
          onClick={() => setShowFilterDrawer(false)}
        >
          <div
            className="bg-white rounded-t-3xl p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-4"></div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-slate-900">Filter Helpers</h3>
              <button
                onClick={() => { setActiveFilterCategory(null); setSearchQuery(''); }}
                className="text-xs text-blue-600 font-semibold"
              >
                Reset
              </button>
            </div>

            {/* Search by helper name */}
            <div className="relative mb-3">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search helper by name..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            
            <p className="text-xs text-slate-500 mb-2 font-medium">Filter by Service:</p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              <button
                onClick={() => setActiveFilterCategory(null)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                  activeFilterCategory === null
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                All Services
              </button>
              {SERVICE_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilterCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                    activeFilterCategory === cat.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowFilterDrawer(false)}
              className="w-full py-3 rounded-xl bg-[#1E56DE] text-white font-semibold text-sm shadow-md"
            >
              Apply Filter
            </button>
          </div>
        </div>
      )}

      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={goBack}
            className="p-1 rounded-full text-slate-700 hover:bg-slate-100 transition"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-base font-bold text-slate-900">Nearby Verified Helpers</h2>
          <button
            onClick={() => setShowFilterDrawer(true)}
            className="p-1 rounded-full text-slate-700 hover:bg-slate-100 transition relative"
            aria-label="Filter helpers"
          >
            <SlidersHorizontal className="w-5 h-5" />
            {activeFilterCategory && (
              <span className="w-2 h-2 rounded-full bg-blue-600 absolute top-1 right-1"></span>
            )}
          </button>
        </div>

        {/* Quick Filter Tag indicator if active */}
        {activeFilterCategory && (
          <div className="flex items-center justify-between bg-blue-50/70 border border-blue-200/60 px-3 py-1.5 rounded-xl mb-3 text-xs text-blue-900">
            <span>
              Filtered: <strong>{SERVICE_CATEGORIES.find((c) => c.id === activeFilterCategory)?.name}</strong>
            </span>
            <button
              onClick={() => setActiveFilterCategory(null)}
              className="font-bold text-blue-600 hover:text-blue-800"
            >
              Clear
            </button>
          </div>
        )}

        {/* Helpers List matching wireframe card design */}
        <div className="space-y-3">
          {displayedHelpers.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-slate-500 text-sm">No helpers found for this filter.</p>
              <button
                onClick={() => setActiveFilterCategory(null)}
                className="mt-2 text-xs font-semibold text-blue-600 hover:underline"
              >
                View all helpers
              </button>
            </div>
          ) : (
            displayedHelpers.map((helper) => (
              <div
                key={helper.id}
                onClick={() => handleSelectHelper(helper)}
                className="p-3.5 rounded-2xl border border-slate-200/90 bg-white hover:border-blue-400 hover:shadow-sm active:scale-[0.99] transition-all cursor-pointer flex items-center justify-between group"
              >
                {/* Left: Avatar & Info */}
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={helper.avatar}
                      alt={helper.name}
                      className="w-13 h-13 rounded-full object-cover ring-2 ring-slate-100"
                    />
                    {helper.isVerified && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center ring-2 ring-white shadow-xs">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition">
                      {helper.name}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-xs text-slate-500 font-medium">
                        {helper.serviceName}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs font-bold text-blue-600">
                        ₹{helper.priceRate}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-xs text-slate-700">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-semibold text-slate-800">{helper.rating}</span>
                      <span className="text-slate-400">({helper.reviewsCount})</span>
                    </div>
                  </div>
                </div>

                {/* Right: Distance & Online Status */}
                <div className="flex flex-col items-end justify-between self-stretch text-right py-0.5">
                  <span className="text-xs text-slate-500 font-medium">
                    {helper.distanceKm} km
                  </span>
                  
                  {helper.isOnline && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Online
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* View more helpers button */}
      <div className="pt-4">
        <button
          onClick={() => setShowAllHelpers(!showAllHelpers)}
          className="w-full py-3 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold tracking-wide transition flex items-center justify-center cursor-pointer"
        >
          {showAllHelpers ? 'Show fewer helpers' : 'View more helpers'}
        </button>
      </div>
    </div>
  );
};
