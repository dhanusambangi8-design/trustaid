import React from 'react';
import { Home, CalendarDays, Compass, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const BottomNav: React.FC = () => {
  const { currentScreen, navigateTo } = useApp();

  const navItems = [
    { id: '2-home', label: 'Home', icon: Home },
    { id: '7-confirm', label: 'Bookings', icon: CalendarDays },
    { id: '8-track', label: 'Track', icon: Compass },
    { id: '6-profile', label: 'Profile', icon: User },
  ] as const;

  return (
    <nav
      aria-label="Bottom Navigation"
      className="sticky bottom-0 inset-x-0 w-full bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-4 sm:px-6 pt-2 pb-3 flex items-center justify-around z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]"
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentScreen === item.id;
        return (
          <button
            key={item.id}
            onClick={() => navigateTo(item.id)}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-all cursor-pointer ${
              isActive
                ? 'text-blue-600 font-bold'
                : 'text-slate-400 hover:text-slate-600 font-medium'
            }`}
          >
            <div className={`p-1 rounded-full transition-transform ${isActive ? 'scale-110' : ''}`}>
              <Icon className="w-5 h-5 stroke-[2.2]" />
            </div>
            <span className="text-[10px] tracking-tight mt-0.5">{item.label}</span>
            {isActive && (
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-0.5"></span>
            )}
          </button>
        );
      })}
    </nav>
  );
};
