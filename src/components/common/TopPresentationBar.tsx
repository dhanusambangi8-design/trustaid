import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { ScreenId } from '../../types';
import { Smartphone, Monitor, RotateCcw, ShieldCheck, UserCheck, ChevronDown, ChevronUp, Mail } from 'lucide-react';
import { ContactModal } from './ContactModal';

export const TopPresentationBar: React.FC = () => {
  const {
    currentScreen,
    navigateTo,
    isDeviceFrameView,
    setIsDeviceFrameView,
    userRole,
    setUserRole,
    bookingsList,
  } = useApp();

  const [mobileFlowExpanded, setMobileFlowExpanded] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const pendingCount = bookingsList.filter((b) => b.status === 'pending').length;

  const screens: { id: ScreenId; num: string; label: string }[] = [
    { id: '1-login', num: '1', label: 'Login' },
    { id: '2-home', num: '2', label: 'Dashboard' },
    { id: '3-request', num: '3', label: 'Request' },
    { id: '4-categories', num: '4', label: 'Categories' },
    { id: '5-helpers', num: '5', label: 'Helpers' },
    { id: '6-profile', num: '6', label: 'Profile' },
    { id: '7-confirm', num: '7', label: 'Confirm' },
    { id: '8-track', num: '8', label: 'Tracking' },
    { id: '9-feedback', num: '9', label: 'Feedback' },
    { id: '10-thankyou', num: '10', label: 'Done' },
    { id: 'helper-dashboard', num: '⚡', label: 'Helper' },
  ];

  const handleReset = () => {
    navigateTo('1-login');
  };

  const handleRoleToggle = (role: 'customer' | 'helper') => {
    setUserRole(role);
    if (role === 'helper') {
      navigateTo('helper-dashboard');
    } else {
      navigateTo('2-home');
    }
  };

  return (
    <>
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50 shadow-md">
      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between gap-2">
        {/* Brand */}
        <div className="flex items-center space-x-2.5">
          <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-600 text-white font-bold text-sm sm:text-base shadow-sm">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-white">Trust Aid</span>
              <span className="text-[10px] sm:text-xs bg-blue-500/20 text-blue-400 font-semibold px-1.5 py-0.5 rounded-full border border-blue-500/30 hidden xs:inline">
                Verified Help
              </span>
            </div>
          </div>
        </div>

        {/* Center: Live Role Switcher */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-700/80">
          <button
            onClick={() => handleRoleToggle('customer')}
            className={`flex items-center gap-1 px-2 sm:px-3 py-1 rounded-lg text-xs font-bold transition ${
              userRole === 'customer'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Customer</span>
          </button>

          <button
            onClick={() => handleRoleToggle('helper')}
            className={`flex items-center gap-1 px-2 sm:px-3 py-1 rounded-lg text-xs font-bold transition relative ${
              userRole === 'helper'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Helper</span>
            {pendingCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-extrabold">
                {pendingCount}
              </span>
            )}
          </button>
        </div>

        {/* Right: View mode toggle & reset */}
        <div className="flex items-center gap-1.5">
          <div className="bg-slate-800 p-0.5 rounded-lg flex items-center border border-slate-700 text-xs">
            <button
              onClick={() => setIsDeviceFrameView(false)}
              className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-md font-medium transition-all ${
                !isDeviceFrameView
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Full Screen Modern Web View"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Full Screen</span>
            </button>
            <button
              onClick={() => setIsDeviceFrameView(true)}
              className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-md font-medium transition-all ${
                isDeviceFrameView
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Mobile Device Mockup View"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Phone Frame</span>
            </button>
          </div>

          <button
            onClick={() => setContactOpen(true)}
            className="flex items-center gap-1 text-xs text-blue-400 hover:text-white px-2 py-1 rounded-lg bg-blue-950/60 hover:bg-blue-900/60 border border-blue-500/30 transition cursor-pointer"
            title="Contact student founders"
          >
            <Mail className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden lg:inline font-semibold">Contact Team</span>
          </button>

          <button
            onClick={handleReset}
            className="hidden sm:flex items-center gap-1 text-xs text-slate-400 hover:text-white px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 transition"
            title="Reset prototype"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Flow Toggle Button */}
          <button
            onClick={() => setMobileFlowExpanded(!mobileFlowExpanded)}
            className="sm:hidden p-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs flex items-center"
            title="Toggle screens list"
          >
            {mobileFlowExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Screen Flow Navigator (Always on Desktop, Collapsible on Mobile) */}
      <div
        className={`${
          mobileFlowExpanded ? 'block' : 'hidden sm:block'
        } bg-slate-950/90 border-t border-slate-800/80 px-2 py-1.5 overflow-x-auto scrollbar-none transition-all`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-start md:justify-center gap-1 min-w-max px-2">
          <span className="text-[10px] font-semibold text-slate-400 mr-1 uppercase tracking-wider hidden sm:inline">
            Flow:
          </span>
          {screens.map((screen) => {
            const isActive = currentScreen === screen.id;
            return (
              <button
                key={screen.id}
                onClick={() => {
                  navigateTo(screen.id);
                  setMobileFlowExpanded(false);
                }}
                className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs transition-all font-medium ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm ring-1 ring-blue-400 font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <span
                  className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-bold ${
                    isActive ? 'bg-white text-blue-600' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {screen.num}
                </span>
                <span>{screen.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
    </>
  );
};
