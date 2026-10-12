import React from 'react';
import { useApp } from '../../context/AppContext';
import type { ScreenId } from '../../types';
import { Smartphone, Monitor, RotateCcw, ShieldCheck, UserCheck } from 'lucide-react';

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
    { id: 'helper-dashboard', num: '⚡', label: 'Helper Portal' },
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
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50 shadow-md">
      {/* Pitch Header info */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-lg shadow-sm">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-white">Trust Aid</span>
              <span className="text-xs bg-blue-500/20 text-blue-400 font-semibold px-2 py-0.5 rounded-full border border-blue-500/30">
                Verified Help Near Me
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Interactive Digital Prototype · Startup Pitch
            </p>
          </div>
        </div>

        {/* Live Active Role Switcher */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-700/80">
          <button
            onClick={() => handleRoleToggle('customer')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition ${
              userRole === 'customer'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Customer View</span>
          </button>

          <button
            onClick={() => handleRoleToggle('helper')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition relative ${
              userRole === 'helper'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Helper Portal</span>
            {pendingCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-extrabold">
                {pendingCount}
              </span>
            )}
          </button>
        </div>

        {/* View mode toggle & reset */}
        <div className="flex items-center gap-2">
          <div className="bg-slate-800 p-0.5 rounded-lg flex items-center border border-slate-700 text-xs">
            <button
              onClick={() => setIsDeviceFrameView(true)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md font-medium transition-all ${
                isDeviceFrameView
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Mobile Device Wireframe View"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Mobile Frame</span>
            </button>
            <button
              onClick={() => setIsDeviceFrameView(false)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md font-medium transition-all ${
                !isDeviceFrameView
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Responsive Desktop View"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Desktop View</span>
            </button>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 transition"
            title="Reset prototype to beginning"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Screen Flow Navigator */}
      <div className="bg-slate-950/80 border-t border-slate-800/80 px-2 py-1.5 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center justify-start md:justify-center gap-1.5 min-w-max px-2">
          <span className="text-[11px] font-semibold text-slate-400 mr-1 uppercase tracking-wider">
            Flow:
          </span>
          {screens.map((screen) => {
            const isActive = currentScreen === screen.id;
            return (
              <button
                key={screen.id}
                onClick={() => navigateTo(screen.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs transition-all font-medium ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 ring-2 ring-blue-400'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
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
  );
};
