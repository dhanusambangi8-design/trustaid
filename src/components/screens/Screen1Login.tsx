import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Eye, EyeOff, Mail, ShieldCheck, UserCheck } from 'lucide-react';
import type { UserRole } from '../../types';

export const Screen1Login: React.FC = () => {
  const { navigateTo, userRole, setUserRole } = useApp();
  const [email, setEmail] = useState('ananya@trustaid.in');
  const [password, setPassword] = useState('••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleRoleToggle = (role: UserRole) => {
    setUserRole(role);
    if (role === 'helper') {
      setEmail('rahul.sharma@trustaid.in');
    } else {
      setEmail('ananya@trustaid.in');
    }
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email or phone number');
      return;
    }
    setError('');
    if (userRole === 'helper') {
      navigateTo('helper-dashboard');
    } else {
      navigateTo('2-home');
    }
  };

  const handleCreateAccount = () => {
    if (userRole === 'helper') {
      navigateTo('helper-dashboard');
    } else {
      navigateTo('2-home');
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-6 pt-5 pb-6 text-slate-900">
      <div className="w-full flex flex-col items-center text-center">
        {/* Brand Header matching wireframe */}
        <div className="mt-2 mb-4 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-[#0F2C84] mb-1">
            Trust Aid
          </h1>
          <p className="text-sm font-semibold text-blue-600">
            Verified Help Near Me
          </p>
        </div>

        {/* Multiple Login Types Toggle */}
        <div className="w-full bg-slate-100 p-1 rounded-2xl flex items-center mb-5 border border-slate-200/80 shadow-xs">
          <button
            type="button"
            onClick={() => handleRoleToggle('customer')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              userRole === 'customer'
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>Customer Login</span>
          </button>

          <button
            type="button"
            onClick={() => handleRoleToggle('helper')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              userRole === 'helper'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Helper Login</span>
          </button>
        </div>

        {/* Welcome Section */}
        <div className="w-full text-center mb-5">
          <h2 className="text-lg font-bold text-slate-800 mb-0.5">
            {userRole === 'helper' ? 'Helper Partner Portal' : 'Welcome!'}
          </h2>
          <p className="text-xs text-slate-500">
            {userRole === 'helper'
              ? 'Receive service bookings, review prices & accept jobs.'
              : 'Trusted help, right when you need it.'}
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSignIn} className="w-full space-y-3">
          {error && (
            <div className="text-xs text-red-600 bg-red-50 p-2 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          <div>
            <div className="relative">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={userRole === 'helper' ? 'Helper ID / Email' : 'Email or Phone number'}
                className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Quick Helper Credentials Tip */}
          {userRole === 'helper' && (
            <div className="text-left bg-emerald-50 border border-emerald-200/80 p-2.5 rounded-xl text-[11px] text-emerald-800">
              <span className="font-bold">Logged helper:</span> Rahul Sharma (Verified Partner, Hospital Visit specialist). Minimum rate: ₹300.
            </div>
          )}

          {/* Forgot password */}
          <div className="flex justify-end pt-0.5">
            <button
              type="button"
              onClick={() => alert('Password reset instructions sent!')}
              className="text-xs text-slate-500 hover:text-blue-600 transition font-medium"
            >
              Forget password?
            </button>
          </div>

          {/* Sign In Primary CTA */}
          <div className="pt-1">
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-[#1E56DE] hover:bg-[#1846b8] active:scale-[0.99] text-white text-sm font-semibold tracking-wide shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {userRole === 'helper' ? 'Sign in as Helper' : 'Sign in'}
            </button>
          </div>

          {/* Create Account Secondary CTA */}
          <div>
            <button
              type="button"
              onClick={handleCreateAccount}
              className="w-full py-3.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 active:scale-[0.99] text-slate-700 text-sm font-semibold tracking-wide transition-all flex items-center justify-center cursor-pointer"
            >
              {userRole === 'helper' ? 'Apply to Become a Helper' : 'Create account'}
            </button>
          </div>
        </form>
      </div>

      {/* Footer Legal */}
      <div className="w-full text-center mt-4">
        <p className="text-[11px] text-slate-400 leading-relaxed px-4">
          By continuing, you agree to our{' '}
          <span className="text-slate-600 underline cursor-pointer hover:text-blue-600">
            Terms of Use
          </span>{' '}
          and{' '}
          <span className="text-slate-600 underline cursor-pointer hover:text-blue-600">
            Privacy Policy
          </span>
          .
        </p>
      </div>
    </div>
  );
};
