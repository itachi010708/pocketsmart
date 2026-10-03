import React from 'react';
import {
  Home,
  PartyPopper,
  Gem,
  History,
  Clock,
  ArrowRight,
  TrendingUp,
  Sparkles,
  ChevronRight,
  Calendar,
} from 'lucide-react';
import { User, HistoryRecord, Currency } from '../types';
import { formatPrice } from '../utils/linkGenerators';

interface DashboardViewProps {
  user: User;
  history: HistoryRecord[];
  onNavigate: (view: string) => void;
  onSelectHistoryItem: (item: HistoryRecord) => void;
  currency: Currency;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  history,
  onNavigate,
  onSelectHistoryItem,
  currency,
}) => {
  const recentHistory = history.slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-16">
      {/* Top Banner Matching Page 31 */}
      <div className="bg-[#0f2b48] text-white py-12 px-4 sm:px-6 lg:px-8 text-center border-b border-[#1b3d63]">
        <div className="max-w-4xl mx-auto space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Welcome, <span className="text-amber-400 capitalize">{user.username}</span>!
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-xl mx-auto">
            Choose a budget planner to get started with your personalized financial planning experience
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        {/* Planner Cards Grid matching Page 31 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Card 1: Home Budget Planner */}
          <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden flex flex-col hover:shadow-lg transition-all">
            {/* Visual Thumbnail */}
            <div className="h-44 bg-gradient-to-tr from-sky-800 via-sky-700 to-indigo-900 relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="relative text-center p-4">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center mx-auto mb-2 shadow-inner">
                  <Home className="w-8 h-8 text-sky-200" />
                </div>
                <span className="text-xs uppercase tracking-wider font-bold text-sky-200 bg-sky-950/60 px-2.5 py-1 rounded-full">
                  Interior & Living
                </span>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Home className="w-5 h-5 text-sky-600" />
                  <h3 className="text-lg font-bold text-slate-900">
                    Home Budget Planner
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Plan your interior design budget efficiently with AI-powered recommendations for furniture, lighting, and more.
                </p>
              </div>

              <button
                onClick={() => onNavigate('home-planner')}
                className="w-full py-2.5 px-4 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 2: Party Budget Planner */}
          <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden flex flex-col hover:shadow-lg transition-all">
            {/* Visual Thumbnail */}
            <div className="h-44 bg-gradient-to-tr from-rose-800 via-pink-700 to-amber-800 relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="relative text-center p-4">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center mx-auto mb-2 shadow-inner">
                  <PartyPopper className="w-8 h-8 text-pink-200" />
                </div>
                <span className="text-xs uppercase tracking-wider font-bold text-pink-200 bg-pink-950/60 px-2.5 py-1 rounded-full">
                  Event & Catering
                </span>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <PartyPopper className="w-5 h-5 text-pink-600" />
                  <h3 className="text-lg font-bold text-slate-900">
                    Party Budget Planner
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Plan your perfect event with budget allocations for venue, catering, decorations, and entertainment.
                </p>
              </div>

              <button
                onClick={() => onNavigate('party-planner')}
                className="w-full py-2.5 px-4 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 3: Jewelry Budget Planner */}
          <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden flex flex-col hover:shadow-lg transition-all">
            {/* Visual Thumbnail */}
            <div className="h-44 bg-gradient-to-tr from-emerald-900 via-teal-800 to-slate-900 relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="relative text-center p-4">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center mx-auto mb-2 shadow-inner">
                  <Gem className="w-8 h-8 text-emerald-200" />
                </div>
                <span className="text-xs uppercase tracking-wider font-bold text-emerald-200 bg-emerald-950/60 px-2.5 py-1 rounded-full">
                  Multimodal Matching
                </span>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Gem className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-lg font-bold text-slate-900">
                    Jewelry Budget Planner
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Find the ideal jewelry pieces for any occasion that match your outfit and stay within your budget.
                </p>
              </div>

              <button
                onClick={() => onNavigate('jewelry-planner')}
                className="w-full py-2.5 px-4 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* View All Recommendation History Central Button (Page 31) */}
        <div className="text-center mb-10">
          <button
            onClick={() => onNavigate('history')}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-md transition"
          >
            <History className="w-4 h-4 text-slate-900" />
            <span>View All Recommendation History</span>
          </button>
        </div>

        {/* Recent Activity Card matching Page 31 */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div className="flex items-center gap-2 text-slate-800 font-bold text-base">
              <Clock className="w-5 h-5 text-blue-600" />
              <span>Recent Activity</span>
            </div>
            <button
              onClick={() => onNavigate('history')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              See all ({history.length})
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {recentHistory.length === 0 ? (
            <div className="py-8 text-center text-slate-500 text-sm">
              No recent budget plans found. Choose a planner above to create your first intelligent budget!
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {recentHistory.map((item) => {
                const dateStr = new Date(item.timestamp).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                });

                return (
                  <div
                    key={item.id}
                    onClick={() => onSelectHistoryItem(item)}
                    className="py-3.5 flex items-center justify-between group hover:bg-slate-50/80 -mx-3 px-3 rounded-lg transition cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                          item.type === 'home'
                            ? 'bg-sky-100 text-sky-700'
                            : item.type === 'party'
                            ? 'bg-pink-100 text-pink-700'
                            : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        {item.type === 'home' && <Home className="w-4 h-4" />}
                        {item.type === 'party' && <PartyPopper className="w-4 h-4" />}
                        {item.type === 'jewelry' && <Gem className="w-4 h-4" />}
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition">
                          {item.title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                          <span>Budget: {formatPrice(item.total_budget, currency)}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Created on {dateStr}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right hidden sm:block">
                        <span className="text-xs text-slate-500 block">Remaining</span>
                        <span className="text-xs font-bold text-emerald-600">
                          {formatPrice(item.remaining_budget, currency)}
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
