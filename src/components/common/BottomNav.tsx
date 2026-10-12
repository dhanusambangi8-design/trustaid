import React from 'react';
import { Home, CalendarDays, Compass, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const BottomNav: React.FC = () => {
  const { currentScreen, navigateTo } = useApp();

  return (
    <nav aria-label="Bottom Navigation" className="sticky bottom-0 inset-x-0 bg-white border-t border-slate-100 py-2 px-6 flex items-center justify-between z-30 shadow-[0_-4px_16px_rgba(0,0,0,0.03)]">
      <button
        onClick={() => navigateTo('2-home')}
        className={`flex flex-col items-center gap-1 transition ${
          currentScreen === '2-home'
            ? 'text-blue-600 font-semibold'
            : 'text-slate-400 hover:text-slate-600'
        }`}
      >
        <Home className="w-5 h-5 stroke-[2.2]" />
        <span className="text-[11px]">Home</span>
      </button>

      <button
        onClick={() => navigateTo('7-confirm')}
        className={`flex flex-col items-center gap-1 transition ${
          currentScreen === '7-confirm'
            ? 'text-blue-600 font-semibold'
            : 'text-slate-400 hover:text-slate-600'
        }`}
      >
        <CalendarDays className="w-5 h-5 stroke-[2]" />
        <span className="text-[11px]">Bookings</span>
      </button>

      <button
        onClick={() => navigateTo('8-track')}
        className={`flex flex-col items-center gap-1 transition ${
          currentScreen === '8-track'
            ? 'text-blue-600 font-semibold'
            : 'text-slate-400 hover:text-slate-600'
        }`}
      >
        <Compass className="w-5 h-5 stroke-[2]" />
        <span className="text-[11px]">Track</span>
      </button>

      <button
        onClick={() => navigateTo('6-profile')}
        className={`flex flex-col items-center gap-1 transition ${
          currentScreen === '6-profile'
            ? 'text-blue-600 font-semibold'
            : 'text-slate-400 hover:text-slate-600'
        }`}
      >
        <User className="w-5 h-5 stroke-[2]" />
        <span className="text-[11px]">Profile</span>
      </button>
    </nav>
  );
};
