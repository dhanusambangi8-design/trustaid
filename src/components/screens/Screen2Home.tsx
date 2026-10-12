import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SERVICE_CATEGORIES, HELPERS_DATA } from '../../data/mockData';
import { BottomNav } from '../common/BottomNav';
import {
  Menu,
  Bell,
  Building2,
  Pill,
  ShoppingCart,
  Car,
  FileText,
  Users,
  ChevronRight,
} from 'lucide-react';
import type { ServiceCategory } from '../../types';

export const Screen2Home: React.FC = () => {
  const { navigateTo, setSelectedCategory, setActiveFilterCategory, location } = useApp();
  const [showNotificationToast, setShowNotificationToast] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  const handleSelectService = (category: ServiceCategory) => {
    setSelectedCategory(category);
    setActiveFilterCategory(category.id);
    navigateTo('5-helpers');
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-white text-slate-900 relative overflow-hidden">
      {/* Toast popup */}
      {showNotificationToast && (
        <div className="absolute top-14 left-4 right-4 z-50 bg-slate-900 text-white text-xs p-3 rounded-xl shadow-xl flex items-center justify-between border border-slate-700 animate-fade-in">
          <span>🔔 2 verified helpers just came online in Whitefield!</span>
          <button
            onClick={() => setShowNotificationToast(false)}
            className="text-slate-400 hover:text-white font-bold ml-2"
          >
            ✕
          </button>
        </div>
      )}

      {/* Slide-out Menu Overlay */}
      {menuOpen && (
        <div className="absolute inset-0 z-50 bg-black/40 flex" onClick={() => setMenuOpen(false)}>
          <div
            className="w-3/4 max-w-xs bg-white h-full shadow-2xl p-6 flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center space-x-2 pb-6 border-b border-slate-100">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  A
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">Ananya Sen</h3>
                  <p className="text-xs text-slate-500">Verified Member</p>
                </div>
              </div>
              <div className="mt-4 space-y-1">
                <button
                  onClick={() => { setMenuOpen(false); navigateTo('4-categories'); }}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-slate-700 hover:bg-slate-100 flex items-center justify-between"
                >
                  <span>All Service Categories</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
                <button
                  onClick={() => { setMenuOpen(false); navigateTo('5-helpers'); }}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-slate-700 hover:bg-slate-100 flex items-center justify-between"
                >
                  <span>Nearby Helpers Directory</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
                <button
                  onClick={() => { setMenuOpen(false); navigateTo('8-track'); }}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-slate-700 hover:bg-slate-100 flex items-center justify-between"
                >
                  <span>Active Service Tracking</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={() => { setMenuOpen(false); navigateTo('1-login'); }}
                className="w-full text-left text-xs text-red-600 font-medium py-2"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area (Scrollable) */}
      <div className="flex-1 overflow-y-auto px-5 pt-3 pb-14 overscroll-contain">
        {/* Top App Bar */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setMenuOpen(true)}
            className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-100 transition"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6 stroke-[2]" />
          </button>

          <button
            onClick={() => setShowNotificationToast(true)}
            className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-100 transition relative"
            aria-label="Notifications"
          >
            <Bell className="w-6 h-6 stroke-[2]" />
            <span className="w-2 h-2 rounded-full bg-blue-600 absolute top-1.5 right-1.5 ring-2 ring-white"></span>
          </button>
        </div>

        {/* Greeting & Location */}
        <div className="mb-5">
          <h2 className="text-[22px] font-bold text-slate-900 tracking-tight">
            Hello, Ananya!
          </h2>
          <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-1">
            <span className="text-blue-600">👥</span>
            <span>You're in {location}</span>
          </div>
        </div>

        {/* Big Request Help Button */}
        <button
          onClick={() => navigateTo('3-request')}
          className="w-full py-3.5 px-4 rounded-xl bg-[#1E56DE] hover:bg-[#1846b8] active:scale-[0.99] text-white text-sm font-semibold tracking-wide shadow-md shadow-blue-500/20 transition-all mb-6 cursor-pointer"
        >
          Request Help
        </button>

        {/* Quick Services Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-800">
              Quick Services
            </h3>
            <button
              onClick={() => navigateTo('4-categories')}
              className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-0.5"
            >
              <span>View all</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 3x2 Grid exactly as wireframe */}
          <div className="grid grid-cols-3 gap-2.5">
            {SERVICE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleSelectService(cat)}
                className="group flex flex-col items-center justify-center p-3 rounded-2xl border border-slate-200/90 bg-white hover:border-blue-400 hover:shadow-md hover:bg-blue-50/20 active:scale-[0.97] transition-all text-center cursor-pointer min-h-[92px]"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  {getServiceIcon(cat.id)}
                </div>
                <span className="text-[11px] font-semibold text-slate-700 leading-tight">
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Nearby Verified Helpers Section */}
        <div>
          <h3 className="text-sm font-bold text-slate-800 mb-2.5">
            Nearby Verified Helpers
          </h3>

          <div
            onClick={() => navigateTo('5-helpers')}
            className="p-3.5 rounded-2xl border border-slate-200/90 bg-slate-50/60 hover:bg-slate-50 hover:border-blue-400 transition-all cursor-pointer flex items-center justify-between shadow-xs"
          >
            <div className="flex items-center space-x-3">
              {/* Overlapping Avatars */}
              <div className="flex -space-x-2.5 overflow-hidden py-0.5">
                {HELPERS_DATA.slice(0, 4).map((helper) => (
                  <img
                    key={helper.id}
                    src={helper.avatar}
                    alt={helper.name}
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                  />
                ))}
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    12 Online
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Helpers available near you
                </p>
              </div>
            </div>

            <ChevronRight className="w-5 h-5 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Persistent Bottom Nav */}
      <BottomNav />
    </div>
  );
};
