import React from 'react';
import { Wifi, Battery } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface PhoneFrameProps {
  children: React.ReactNode;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
  const { isDeviceFrameView } = useApp();

  if (!isDeviceFrameView) {
    // Full Screen / Responsive Modern Web App Experience
    return (
      <main className="flex-1 w-full min-h-0 overflow-hidden bg-slate-100/90 flex justify-center items-center p-0 sm:p-4 md:p-5">
        <div className="w-full max-w-4xl h-full max-h-full bg-white sm:rounded-2xl shadow-lg sm:border sm:border-slate-200/80 overflow-hidden flex flex-col">
          <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
            {children}
          </div>
        </div>
      </main>
    );
  }

  // Mobile Device Frame Mode (Pitch Mockup)
  return (
    <main className="flex-1 w-full min-h-0 overflow-hidden bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 flex justify-center items-center p-0 sm:p-3 md:p-4">
      {/* 
        On mobile: Takes 100% full screen with zero fake borders.
        On desktop: Sized dynamically with max-h-[calc(100%-1.25rem)] so it NEVER clips at the bottom!
      */}
      <div className="relative w-full h-full sm:h-[720px] sm:max-h-[calc(100%-1.25rem)] sm:max-w-[375px] md:max-w-[390px] bg-white sm:rounded-[42px] shadow-none sm:shadow-[0_20px_50px_-10px_rgba(15,23,42,0.35)] border-0 sm:border-[8px] sm:border-slate-900 overflow-hidden flex flex-col select-none ring-0 sm:ring-1 sm:ring-slate-800/40">
        
        {/* Top Notch / Dynamic Island on desktop mockup */}
        <div className="hidden sm:flex absolute top-0 inset-x-0 h-8 bg-white z-40 items-center justify-between px-6 pt-1 text-slate-800 border-b border-slate-50">
          <span className="text-[11px] font-bold tracking-tight">9:41</span>
          
          {/* Dynamic Island */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1.5 w-18 h-3.5 bg-black rounded-full flex items-center justify-end pr-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-950/80 border border-slate-700/50"></div>
          </div>

          {/* Right status indicators */}
          <div className="flex items-center space-x-1.5 text-slate-800">
            <div className="flex items-end space-x-[1px] h-2">
              <span className="w-[1.5px] h-1 bg-slate-900 rounded-xs"></span>
              <span className="w-[1.5px] h-1.5 bg-slate-900 rounded-xs"></span>
              <span className="w-[1.5px] h-2 bg-slate-900 rounded-xs"></span>
            </div>
            <Wifi className="w-3 h-3 stroke-[2.5]" />
            <Battery className="w-3.5 h-3.5 stroke-[2.5] fill-slate-900" />
          </div>
        </div>

        {/* 
          Inner screen container:
        */}
        <div className="flex-1 min-h-0 sm:pt-8 overflow-hidden flex flex-col bg-white">
          {children}
        </div>
      </div>
    </main>
  );
};
