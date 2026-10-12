import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SERVICE_CATEGORIES } from '../../data/mockData';
import {
  Bell,
  CheckCircle2,
  XCircle,
  MapPin,
  Clock,
  IndianRupee,
  Navigation,
  ShieldCheck,
  Star,
  User,
  ArrowRight,
} from 'lucide-react';

export const ScreenHelperDashboard: React.FC = () => {
  const {
    navigateTo,
    bookingsList,
    acceptOrder,
    declineOrder,
    updateOrderStatus,
    selectedHelper,
    setUserRole,
  } = useApp();

  const [isAvailableOnline, setIsAvailableOnline] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const pendingBookings = bookingsList.filter((b) => b.status === 'pending');
  const activeBookings = bookingsList.filter(
    (b) => b.status === 'accepted' || b.status === 'on_the_way' || b.status === 'in_progress'
  );

  const handleAccept = (bookingId: string, price: number) => {
    acceptOrder(bookingId);
    setToastMessage(`Accepted order! You agreed to provide service for ₹${price}.`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDecline = (bookingId: string) => {
    declineOrder(bookingId);
    setToastMessage('Order declined.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-5 pt-3 pb-6 text-slate-900 bg-white relative overflow-y-auto overscroll-contain">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="absolute top-14 left-4 right-4 z-50 bg-slate-900 text-white text-xs p-3 rounded-xl shadow-xl flex items-center justify-between border border-slate-700 animate-fade-in">
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white ml-2">
            ✕
          </button>
        </div>
      )}

      <div>
        {/* Helper Top Bar */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2.5">
            <div className="relative">
              <img
                src={selectedHelper.avatar}
                alt={selectedHelper.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500"
              />
              <span
                className={`w-3 h-3 rounded-full absolute -bottom-0.5 -right-0.5 ring-2 ring-white ${
                  isAvailableOnline ? 'bg-emerald-500' : 'bg-slate-400'
                }`}
              ></span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-sm font-bold text-slate-900">{selectedHelper.name}</h2>
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Verified Partner · Helper Mode</p>
            </div>
          </div>

          {/* Online status toggle */}
          <button
            onClick={() => setIsAvailableOnline(!isAvailableOnline)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 border ${
              isAvailableOnline
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                : 'bg-slate-100 text-slate-600 border-slate-200'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isAvailableOnline ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'
              }`}
            ></span>
            <span>{isAvailableOnline ? 'Online' : 'Offline'}</span>
          </button>
        </div>

        {/* Helper Stats / Rate Card */}
        <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-200/80 mb-5">
          <div className="text-center">
            <span className="text-[10px] text-slate-500 font-semibold block uppercase">Rating</span>
            <span className="text-sm font-extrabold text-slate-800 flex items-center justify-center gap-0.5">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              {selectedHelper.rating}
            </span>
          </div>
          <div className="text-center border-x border-slate-200">
            <span className="text-[10px] text-slate-500 font-semibold block uppercase">Base Rate</span>
            <span className="text-sm font-extrabold text-blue-600">
              ₹{selectedHelper.priceRate}
            </span>
          </div>
          <div className="text-center">
            <span className="text-[10px] text-slate-500 font-semibold block uppercase">Completed</span>
            <span className="text-sm font-extrabold text-slate-800">
              {selectedHelper.helpsCompleted}
            </span>
          </div>
        </div>

        {/* Section: Incoming Order Requests (Price Decision Flow) */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-bold text-slate-900">Incoming Requests</h3>
              {pendingBookings.length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-extrabold animate-pulse">
                  {pendingBookings.length} New
                </span>
              )}
            </div>
            <span className="text-[11px] text-slate-500">Decide by Price</span>
          </div>

          {pendingBookings.length === 0 ? (
            <div className="p-4 rounded-2xl border border-dashed border-slate-200 text-center bg-slate-50/50">
              <Bell className="w-6 h-6 text-slate-300 mx-auto mb-1" />
              <p className="text-xs text-slate-500 font-medium">No pending requests right now.</p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Switch to Customer mode to create a booking request!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingBookings.map((order) => {
                const meetsMinPrice = order.offeredPrice >= selectedHelper.minAcceptedPrice;
                return (
                  <div
                    key={order.id}
                    className="p-4 rounded-2xl border-2 border-blue-500 bg-white shadow-md transition-all space-y-3"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-mono font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                          {order.id}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 mt-1">
                          {order.serviceName}
                        </h4>
                        <div className="flex items-center gap-1 text-xs text-slate-600 mt-0.5">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          <span className="font-semibold">{order.customerName}</span>
                          <span className="text-slate-400">({order.customerPhone})</span>
                        </div>
                      </div>

                      {/* Offered Price Tag */}
                      <div className="text-right">
                        <span className="text-[10px] text-slate-500 font-bold uppercase block">
                          Offered Price
                        </span>
                        <div className="inline-flex items-center text-base font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
                          <IndianRupee className="w-4 h-4" />
                          <span>{order.offeredPrice}</span>
                        </div>
                      </div>
                    </div>

                    {/* Booking Details */}
                    <div className="p-2.5 rounded-xl bg-slate-50 text-xs space-y-1.5 border border-slate-100">
                      <div className="flex items-center gap-1.5 text-slate-700">
                        <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span className="truncate">{order.location}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{order.dateTime}</span>
                        </span>
                        <span className="font-semibold text-blue-600">
                          Urgency: {order.urgency}
                        </span>
                      </div>
                      {order.notes && (
                        <p className="text-[11px] text-slate-500 italic pt-1 border-t border-slate-200">
                          "{order.notes}"
                        </p>
                      )}
                    </div>

                    {/* Price Evaluation Status */}
                    <div className="text-[11px] font-medium flex items-center justify-between px-1">
                      <span className="text-slate-500">Your min rate: ₹{selectedHelper.minAcceptedPrice}</span>
                      <span
                        className={`font-semibold ${
                          meetsMinPrice ? 'text-emerald-600' : 'text-amber-600'
                        }`}
                      >
                        {meetsMinPrice
                          ? '✓ Meets your required rate'
                          : '⚠️ Below your standard rate'}
                      </span>
                    </div>

                    {/* Helper Decision Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={() => handleDecline(order.id)}
                        className="py-2.5 px-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <XCircle className="w-4 h-4 text-red-500" />
                        <span>Decline</span>
                      </button>

                      <button
                        onClick={() => handleAccept(order.id, order.offeredPrice)}
                        className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Accept (₹{order.offeredPrice})</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Active Jobs in Progress (If accepted) */}
        {activeBookings.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-bold text-slate-900 mb-2.5">
              Active Accepted Orders
            </h3>
            <div className="space-y-2.5">
              {activeBookings.map((order) => (
                <div
                  key={order.id}
                  className="p-3.5 rounded-2xl border border-emerald-200 bg-emerald-50/40 space-y-2.5"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-xs font-bold text-slate-800">
                        {order.serviceName} • {order.customerName}
                      </span>
                      <span className="text-[11px] text-slate-500 block">
                        Price: ₹{order.offeredPrice} • Status: {order.status}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white">
                      Accepted
                    </span>
                  </div>

                  {/* Helper execution controls */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => {
                        updateOrderStatus(order.id, 'on_the_way');
                        navigateTo('8-track');
                      }}
                      className="py-2 px-3 rounded-xl bg-blue-600 text-white text-xs font-semibold flex items-center justify-center gap-1"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Start Navigation</span>
                    </button>
                    <button
                      onClick={() => {
                        updateOrderStatus(order.id, 'completed');
                        setToastMessage(`Job completed! ₹${order.offeredPrice} added to earnings.`);
                      }}
                      className="py-2 px-3 rounded-xl bg-slate-900 text-white text-xs font-semibold flex items-center justify-center gap-1"
                    >
                      <span>Mark Done</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section: Standard Service Rates Directory */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Standard Service Prices
            </h3>
            <span className="text-[11px] text-slate-500">Platform Guide</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {SERVICE_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 text-left"
              >
                <div className="text-xs font-bold text-slate-800 truncate">{cat.name}</div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[11px] font-extrabold text-blue-600">
                    ₹{cat.basePrice}
                  </span>
                  <span className="text-[10px] text-slate-400">{cat.priceUnit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Switch to Customer Portal CTA */}
      <div className="pt-2">
        <button
          onClick={() => {
            setUserRole('customer');
            navigateTo('2-home');
          }}
          className="w-full py-3 px-4 rounded-xl border border-blue-200 bg-blue-50/60 hover:bg-blue-100/60 text-blue-800 text-xs font-semibold tracking-wide transition flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span>Switch to Customer View (Ananya)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
