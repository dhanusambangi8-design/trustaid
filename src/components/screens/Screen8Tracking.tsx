import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  CheckCircle2,
  Car,
  Clock,
  Circle,
  Phone,
  MessageSquare,
  MapPin,
  Navigation,
} from 'lucide-react';

export const Screen8Tracking: React.FC = () => {
  const { goBack, navigateTo, booking } = useApp();
  const [etaMins, setEtaMins] = useState(8);
  const [currentStep, setCurrentStep] = useState<number>(2); // 1 = accepted, 2 = on the way, 3 = in progress, 4 = completed

  // Countdown timer simulation for realistic pitch prototype
  useEffect(() => {
    const timer = setInterval(() => {
      setEtaMins((prev) => (prev > 1 ? prev - 1 : 1));
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  const handleAdvanceStep = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    } else {
      navigateTo('9-feedback');
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-5 pt-3 pb-6 text-slate-900 bg-white">
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
          <h2 className="text-base font-bold text-slate-900">Service Tracking</h2>
          <div className="w-5"></div>
        </div>

        {/* Booking ID & Price Header */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-blue-600">
            Booking ID: <span className="font-mono font-bold">{booking.id || 'TA125678'}</span>
          </span>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            Price: ₹{booking.offeredPrice || 350}
          </span>
        </div>

        {/* Acceptance Status Notice if Pending */}
        {booking.status === 'pending' ? (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-800 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
                Waiting for Helper to Accept
              </span>
              <span className="text-[10px] text-amber-600 font-semibold">Price: ₹{booking.offeredPrice}</span>
            </div>
            <p className="text-[11px] text-amber-700">
              {booking.helper.name} is reviewing your order price. You can view this order directly in the Helper Portal!
            </p>
            <button
              onClick={() => navigateTo('helper-dashboard')}
              className="w-full py-1.5 px-3 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg transition"
            >
              Open Helper Portal to Accept Order →
            </button>
          </div>
        ) : (
          <div className="mb-3 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-800">
            <span className="font-bold">✓ Order accepted by {booking.helper.name}</span>
            <span className="text-[11px] text-emerald-600">Agreed Price: ₹{booking.offeredPrice}</span>
          </div>
        )}

        {/* Status Timeline Stepper matching Screen 8 wireframe */}
        <div className="relative pl-6 space-y-4 mb-5 border-l-2 border-slate-100 ml-3">
          {/* Step 1: Request Accepted */}
          <div className="relative">
            <div className="absolute -left-[31px] top-0.5 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center ring-4 ring-white">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">
                Request accepted
              </span>
              <span className="text-[11px] text-slate-400">
                {booking.acceptedTime || '9:42 AM'}
              </span>
            </div>
          </div>

          {/* Step 2: Helper on the way */}
          <div className="relative">
            <div
              className={`absolute -left-[31px] top-0.5 w-5 h-5 rounded-full flex items-center justify-center ring-4 ring-white ${
                currentStep >= 2
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-200 text-slate-500'
              }`}
            >
              <Car className="w-3 h-3" />
            </div>
            <div className="flex items-center justify-between">
              <span
                className={`text-xs font-bold ${
                  currentStep >= 2 ? 'text-blue-600' : 'text-slate-400'
                }`}
              >
                Helper on the way
              </span>
              <span className="text-[11px] text-slate-400">
                {booking.onTheWayTime || '9:55 AM'}
              </span>
            </div>
          </div>

          {/* Step 3: Service in progress */}
          <div className="relative">
            <div
              className={`absolute -left-[31px] top-0.5 w-5 h-5 rounded-full flex items-center justify-center ring-4 ring-white ${
                currentStep >= 3
                  ? 'bg-amber-500 text-white animate-pulse'
                  : 'bg-slate-100 text-slate-400 border border-slate-300'
              }`}
            >
              <Clock className="w-3 h-3" />
            </div>
            <div className="flex items-center justify-between">
              <span
                className={`text-xs font-semibold ${
                  currentStep >= 3 ? 'text-amber-600 font-bold' : 'text-slate-400'
                }`}
              >
                Service in progress
              </span>
              <span className="text-[11px] text-slate-400 italic">
                {currentStep >= 3 ? 'active now' : 'in progress'}
              </span>
            </div>
          </div>

          {/* Step 4: Completed */}
          <div className="relative">
            <div className="absolute -left-[31px] top-0.5 w-5 h-5 rounded-full bg-slate-100 text-slate-400 border border-slate-300 flex items-center justify-center ring-4 ring-white">
              <Circle className="w-2.5 h-2.5" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">
                Completed
              </span>
              <span className="text-[11px] text-slate-400">
                Pending
              </span>
            </div>
          </div>
        </div>

        {/* Live Simulation Map Area */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-inner h-48 mb-3">
          {/* Stylized Map Grid Graphics */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          {/* Simulated Roads */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {/* Main roads */}
            <path
              d="M 20 150 Q 120 130 180 90 T 320 40"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="24"
              strokeLinecap="round"
            />
            {/* Active Navigation Path (Dotted blue line matching wireframe) */}
            <path
              d="M 50 140 Q 140 120 190 85 T 310 45"
              fill="none"
              stroke="#2563EB"
              strokeWidth="4"
              strokeDasharray="6 6"
              className="animate-pulse"
            />
          </svg>

          {/* User Location Pin (Blue marker) */}
          <div className="absolute left-10 bottom-8 flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-blue-600 ring-4 ring-blue-300/60 shadow-lg flex items-center justify-center text-white">
              <MapPin className="w-3.5 h-3.5 fill-white" />
            </div>
            <span className="text-[9px] font-bold bg-white/90 px-1.5 py-0.5 rounded shadow-xs mt-1 text-slate-800">
              You
            </span>
          </div>

          {/* Helper on the way Pin with Photo */}
          <div className="absolute right-12 top-6 flex flex-col items-center">
            <div className="relative">
              <img
                src={booking.helper.avatar}
                alt={booking.helper.name}
                className="w-10 h-10 rounded-full object-cover ring-3 ring-emerald-500 shadow-xl"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                <Car className="w-2.5 h-2.5" />
              </div>
            </div>
            <span className="text-[9px] font-bold bg-white/95 px-1.5 py-0.5 rounded shadow-xs mt-1 text-slate-800">
              {booking.helper.name.split(' ')[0]}
            </span>
          </div>

          {/* Quick contact buttons on map */}
          <div className="absolute bottom-2.5 right-2.5 flex items-center space-x-1.5">
            <button
              onClick={() => alert(`Calling ${booking.helper.name}...`)}
              className="w-8 h-8 rounded-full bg-white shadow-md text-slate-700 hover:text-blue-600 flex items-center justify-center border border-slate-200"
              title="Call helper"
            >
              <Phone className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => alert(`Opening chat with ${booking.helper.name}...`)}
              className="w-8 h-8 rounded-full bg-white shadow-md text-slate-700 hover:text-blue-600 flex items-center justify-center border border-slate-200"
              title="Message helper"
            >
              <MessageSquare className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Estimated Arrival Banner matching wireframe */}
        <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200/80 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <Navigation className="w-4 h-4 text-blue-600 animate-spin" />
            <span className="font-semibold text-slate-700">
              Estimated arrival: <strong className="text-blue-600">{etaMins} mins</strong>
            </span>
          </div>
          <span className="text-[11px] text-slate-400">1.2 km away</span>
        </div>
      </div>

      {/* Advance Step / Complete CTA */}
      <div className="pt-4 space-y-2">
        <button
          onClick={handleAdvanceStep}
          className="w-full py-3.5 px-4 rounded-xl bg-[#1E56DE] hover:bg-[#1846b8] active:scale-[0.99] text-white text-sm font-semibold tracking-wide shadow-md shadow-blue-500/20 transition-all flex items-center justify-center cursor-pointer"
        >
          {currentStep === 2
            ? 'Helper Arrived → Start Service'
            : currentStep === 3
            ? 'Complete Service & Leave Feedback'
            : 'Proceed to Feedback'}
        </button>
      </div>
    </div>
  );
};
