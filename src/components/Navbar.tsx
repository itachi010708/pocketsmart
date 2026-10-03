import React from 'react';
import {
  Wallet,
  Home,
  PartyPopper,
  Gem,
  History,
  LayoutDashboard,
  LogOut,
  LogIn,
  User as UserIcon,
  Sparkles,
} from 'lucide-react';
import { User, Currency } from '../types';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  currentUser: User | null;
  onLogout: () => void;
  onOpenAuth: (mode: 'login' | 'register') => void;
  currency: Currency;
  onToggleCurrency: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  currentUser,
  onLogout,
  onOpenAuth,
  currency,
  onToggleCurrency,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#0f2b48] text-white shadow-md border-b border-[#1b3d63]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo matching specification */}
          <div
            className="flex items-center gap-2.5 cursor-pointer group"
            onClick={() => onNavigate(currentUser ? 'dashboard' : 'landing')}
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-amber-400 to-amber-500 flex items-center justify-center text-[#0f2b48] shadow-sm font-bold">
              <Wallet className="w-5 h-5 text-slate-900" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1">
                PocketSmart
                <span className="text-xs bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                  AI
                </span>
              </span>
              <span className="text-[10px] text-slate-300 font-medium tracking-wide">
                Smart Budget Assistant
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2">
            {currentUser && (
              <button
                onClick={() => onNavigate('dashboard')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === 'dashboard'
                    ? 'bg-[#1e4672] text-white font-semibold'
                    : 'text-slate-200 hover:text-white hover:bg-[#163659]'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 text-amber-400" />
                Dashboard
              </button>
            )}

            <button
              onClick={() => onNavigate('home-planner')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'home-planner'
                  ? 'bg-[#1e4672] text-white font-semibold'
                  : 'text-slate-200 hover:text-white hover:bg-[#163659]'
              }`}
            >
              <Home className="w-4 h-4 text-sky-400" />
              Home Planner
            </button>

            <button
              onClick={() => onNavigate('party-planner')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'party-planner'
                  ? 'bg-[#1e4672] text-white font-semibold'
                  : 'text-slate-200 hover:text-white hover:bg-[#163659]'
              }`}
            >
              <PartyPopper className="w-4 h-4 text-pink-400" />
              Party Planner
            </button>

            <button
              onClick={() => onNavigate('jewelry-planner')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'jewelry-planner'
                  ? 'bg-[#1e4672] text-white font-semibold'
                  : 'text-slate-200 hover:text-white hover:bg-[#163659]'
              }`}
            >
              <Gem className="w-4 h-4 text-emerald-400" />
              Jewelry Planner
            </button>

            {currentUser && (
              <button
                onClick={() => onNavigate('history')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === 'history'
                    ? 'bg-[#1e4672] text-white font-semibold'
                    : 'text-slate-200 hover:text-white hover:bg-[#163659]'
                }`}
              >
                <History className="w-4 h-4 text-indigo-400" />
                History
              </button>
            )}
          </nav>

          {/* Right Action Area */}
          <div className="flex items-center gap-3">
            {/* Currency Switcher */}
            <button
              onClick={onToggleCurrency}
              title="Click to toggle currency between INR (₹) and USD ($)"
              className="px-2.5 py-1 text-xs font-semibold rounded bg-[#163659] text-amber-300 border border-slate-700 hover:bg-[#1e4672] transition flex items-center gap-1"
            >
              <span className="opacity-80">Currency:</span>
              <span className="font-mono font-bold text-white bg-amber-500/20 px-1 rounded">
                {currency === 'INR' ? '₹ INR' : '$ USD'}
              </span>
            </button>

            {currentUser ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 pl-2 border-l border-slate-700">
                  <div className="w-7 h-7 rounded-full bg-amber-400 text-slate-900 font-bold flex items-center justify-center text-xs shadow">
                    {currentUser.username.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-slate-200 hidden sm:inline">
                    {currentUser.username}
                  </span>
                </div>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-1 text-xs text-slate-300 hover:text-red-300 py-1.5 px-2 rounded hover:bg-[#163659] transition"
                  title="Sign out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="px-3 py-1.5 text-sm text-slate-200 hover:text-white hover:bg-[#163659] rounded-md transition font-medium"
                >
                  Sign In
                </button>
                <button
                  onClick={() => onOpenAuth('register')}
                  className="px-3.5 py-1.5 text-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-md shadow hover:brightness-110 transition flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Get Started
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
