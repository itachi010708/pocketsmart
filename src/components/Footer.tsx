import React from 'react';
import { Wallet, Sparkles, Shield, Heart } from 'lucide-react';

export const Footer: React.FC<{ onNavigate?: (view: string) => void }> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#0b1e33] text-slate-400 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center text-slate-900 font-bold shadow-sm">
                <Wallet className="w-4 h-4 text-slate-900" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                PocketSmart <span className="text-amber-400">AI</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              AI-powered budget planning tool to help you make smarter financial decisions across home interiors, party planning, and jewelry shopping.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1 text-emerald-400">
                <Sparkles className="w-3.5 h-3.5" /> Powered by Gemini AI
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 text-slate-400">
                <Shield className="w-3.5 h-3.5" /> Zero Overspending Guarantee
              </span>
            </div>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Company
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="hover:text-white transition">About Us</a>
              </li>
              <li>
                <a href="#team" className="hover:text-white transition">Our Team</a>
              </li>
              <li>
                <a href="#careers" className="hover:text-white transition">Careers</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Product Column */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Product
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('home-planner')}
                  className="hover:text-white transition text-left"
                >
                  Home Planner
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('party-planner')}
                  className="hover:text-white transition text-left"
                >
                  Party Planner
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('jewelry-planner')}
                  className="hover:text-white transition text-left"
                >
                  Jewelry Planner
                </button>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition">Pricing</a>
              </li>
            </ul>
          </div>

          {/* Resources & Legal Column */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Legal & Support
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#faq" className="hover:text-white transition">FAQ & Help</a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-white transition">Privacy Policy</a>
              </li>
              <li>
                <a href="#terms" className="hover:text-white transition">Terms of Service</a>
              </li>
              <li>
                <a href="#cookies" className="hover:text-white transition">Cookies Policy</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 mt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2025-2026 PocketSmart AI. All rights reserved. SmartBridge & SmartInternz Project Edition.</p>
          <div className="flex items-center gap-2">
            <span>Built with precision for smart financial budgeting</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
