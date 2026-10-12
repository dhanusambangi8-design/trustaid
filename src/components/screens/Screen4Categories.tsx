import React from 'react';
import { useApp } from '../../context/AppContext';
import { SERVICE_CATEGORIES } from '../../data/mockData';
import {
  ArrowLeft,
  Building2,
  Pill,
  ShoppingCart,
  Car,
  FileText,
  Users,
  ChevronRight,
} from 'lucide-react';
import type { ServiceCategory } from '../../types';

export const Screen4Categories: React.FC = () => {
  const { goBack, navigateTo, setSelectedCategory, setActiveFilterCategory } = useApp();

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'hospital':
        return <Building2 className="w-5 h-5 text-blue-600" />;
      case 'medicine':
        return <Pill className="w-5 h-5 text-blue-600" />;
      case 'grocery':
        return <ShoppingCart className="w-5 h-5 text-blue-600" />;
      case 'transport':
        return <Car className="w-5 h-5 text-blue-600" />;
      case 'documentation':
        return <FileText className="w-5 h-5 text-blue-600" />;
      case 'companionship':
        return <Users className="w-5 h-5 text-blue-600" />;
      default:
        return <Building2 className="w-5 h-5 text-blue-600" />;
    }
  };

  const handleCategoryClick = (cat: ServiceCategory) => {
    setSelectedCategory(cat);
    setActiveFilterCategory(cat.id);
    navigateTo('5-helpers');
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-5 pt-3 pb-6 text-slate-900 bg-white">
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between mb-5">
          <button
            onClick={goBack}
            className="p-1 rounded-full text-slate-700 hover:bg-slate-100 transition"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-base font-bold text-slate-900">Service Categories</h2>
          <div className="w-5"></div>
        </div>

        {/* Categories Vertical List matching Screen 4 wireframe */}
        <div className="space-y-3">
          {SERVICE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat)}
              className="w-full p-4 rounded-2xl border border-slate-200/90 bg-white hover:border-blue-400 hover:shadow-sm hover:bg-blue-50/20 active:scale-[0.99] transition-all flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center space-x-3.5 text-left">
                <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100/60 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  {getServiceIcon(cat.id)}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition">
                    {cat.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-bold text-blue-600">
                      ₹{cat.basePrice}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {cat.priceUnit}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-[11px] text-slate-500">
                      {cat.availableHelpers} helpers
                    </span>
                  </div>
                </div>
              </div>

              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition" />
            </button>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-6 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
        <p className="text-xs text-slate-600 font-medium">
          Need a customized service? Our verified helpers adapt to your unique needs.
        </p>
      </div>
    </div>
  );
};
