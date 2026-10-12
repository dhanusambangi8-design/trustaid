import React from 'react';
import { Wifi, Battery } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface PhoneFrameProps {
  children: React.ReactNode;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
  const { isDeviceFrameView } = useApp();

  if (!isDeviceFrameView) {
    // Desktop View mode: Full responsive layout with comfortable max-width
    return (
      <main className="flex-1 w-full overflow-hidden bg-slate-100/90 flex justify-center items-center p-2 sm:p-6">
        <div className="w-full max-w-4xl h-full max-h-[calc(100dvh-100px)] bg-white rounded-2xl shadow-xl border border-slate-200/80 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto overscroll-contain flex flex-col">
            {children}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 w-full overflow-hidden bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 flex justify-center items-center p-0 sm:py-3 sm:px-4">
      {/* 
        On small/mobile screens (<sm): Fits screen seamlessly 100% height without double bezel or outer scrolling.
        On desktop (sm+): Renders authentic phone frame strictly sized to fit the viewport without outer scroll!
      */}
      <div className="relative w-full h-full sm:h-[min(844px,calc(100dvh-95px))] sm:max-w-[390px] bg-white sm:rounded-[46px] shadow-none sm:shadow-[0_20px_50px_-10px_rgba(15,23,42,0.35)] border-0 sm:border-[8px] sm:border-slate-900 overflow-hidden flex flex-col select-none ring-0 sm:ring-1 sm:ring-slate-800/40">
        
        {/* Top Notch / Dynamic Island (Shown nicely on desktop mockup, streamlined on mobile) */}
        <div className="hidden sm:flex absolute top-0 inset-x-0 h-10 bg-white z-40 items-center justify-between px-6 pt-1 text-slate-800 border-b border-slate-50/50">
          <span className="text-[12px] font-bold tracking-tight">9:41</span>
          
          {/* Dynamic Island pill */}
          <div className="absolute left-1/2 -translate-x-1/2 top-2 w-22 h-4.5 bg-black rounded-full flex items-center justify-end pr-2">
            <div className="w-2 h-2 rounded-full bg-slate-950/80 border border-slate-700/50"></div>
          </div>

          {/* Right status indicators */}
          <div className="flex items-center space-x-1.5 text-slate-800">
            {/* Cellular */}
            <div className="flex items-end space-x-[1.5px] h-2.5">
              <span className="w-[2px] h-1 bg-slate-900 rounded-xs"></span>
              <span className="w-[2px] h-1.5 bg-slate-900 rounded-xs"></span>
              <span className="w-[2px] h-2 bg-slate-900 rounded-xs"></span>
              <span className="w-[2px] h-2.5 bg-slate-900 rounded-xs"></span>
            </div>
            {/* Wifi */}
            <Wifi className="w-3 h-3 stroke-[2.5]" />
            {/* Battery */}
            <Battery className="w-3.5 h-3.5 stroke-[2.5] fill-slate-900" />
          </div>
        </div>

        {/* 
          ONLY the inside interface scrolls!
          overscroll-contain prevents page-level bounce.
        */}
        <div className="flex-1 overflow-y-auto overscroll-contain sm:pt-10 pb-2 sm:pb-5 scrollbar-thin scrollbar-thumb-slate-300 flex flex-col bg-white">
          {children}
        </div>

        {/* Bottom Home Indicator on desktop frame */}
        <div className="hidden sm:flex absolute bottom-1 inset-x-0 h-3 items-center justify-center pointer-events-none z-40">
          <div className="w-28 h-1 bg-slate-900/50 rounded-full"></div>
        </div>
      </div>
    </main>
  );
};
