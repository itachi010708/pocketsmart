import React from 'react';
import {
  Home,
  PartyPopper,
  Gem,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShoppingBag,
  TrendingDown,
  Quote,
  Star,
} from 'lucide-react';
import { User } from '../types';

interface LandingPageProps {
  onNavigate: (view: string) => void;
  onOpenAuth: (mode: 'login' | 'register') => void;
  currentUser: User | null;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  onOpenAuth,
  currentUser,
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
      {/* Hero Section (Matching Page 27) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0f2b48] via-[#163659] to-[#1a4069] text-white py-20 lg:py-24 px-4 sm:px-6 lg:px-8 text-center">
        {/* Subtle decorative background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-400/30 text-xs font-semibold text-blue-200 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> PocketSmart
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            AI-Powered Budget Planning <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-sky-300">
              for Everyday Needs
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto font-normal leading-relaxed">
            Make smarter financial decisions with personalized budget recommendations for home interiors,
            parties, and jewelry purchases. Our AI helps you get the most value for your money.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => {
                if (currentUser) {
                  onNavigate('dashboard');
                } else {
                  onOpenAuth('register');
                }
              }}
              className="px-6 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm sm:text-base shadow-lg shadow-blue-900/50 hover:shadow-blue-700/60 transition flex items-center gap-2"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#planners"
              className="px-6 py-3.5 rounded-lg bg-white/10 hover:bg-white/15 text-white font-medium text-sm sm:text-base border border-white/20 transition backdrop-blur-sm"
            >
              Learn More
            </a>
          </div>

          {/* Quick value props */}
          <div className="pt-10 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl mx-auto text-left text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Multi-platform real search</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% budget adherence</span>
            </div>
            <div className="flex items-center gap-2 col-span-2 sm:col-span-1 justify-center sm:justify-start">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Multimodal outfit vision</span>
            </div>
          </div>
        </div>
      </section>

      {/* Our Smart Budget Planners Section (Page 27) */}
      <section id="planners" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Our Smart Budget Planners
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Discover how PocketSmart helps you make better financial decisions across different areas of your life
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Home Interior Budget Planner */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group">
            <div className="h-44 bg-gradient-to-br from-sky-600 to-[#1e3a5f] p-6 flex flex-col justify-end text-white relative">
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                <Home className="w-5 h-5" />
              </div>
              <span className="text-xs uppercase font-bold tracking-wider text-sky-200">
                Interior Planning
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                Home Interior Budget Planner
              </h3>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <p className="text-sm text-slate-600 leading-relaxed">
                Get personalized recommendations for furniture, lighting, and decor that fit your style preferences and budget constraints. Our AI helps you create a beautiful space without overspending.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <ShoppingBag className="w-3.5 h-3.5 text-sky-600" />
                  IKEA, Amazon, Flipkart
                </span>
                <button
                  onClick={() => onNavigate('home-planner')}
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-md transition shadow-sm"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Party Budget Planner */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group">
            <div className="h-44 bg-gradient-to-br from-pink-600 to-[#4a154b] p-6 flex flex-col justify-end text-white relative">
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                <PartyPopper className="w-5 h-5" />
              </div>
              <span className="text-xs uppercase font-bold tracking-wider text-pink-200">
                Event Organization
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                Party Budget Planner
              </h3>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <p className="text-sm text-slate-600 leading-relaxed">
                Plan your perfect event with smart budget allocations for venue, catering, decorations, and entertainment. Our AI suggests the best ways to create memorable events while staying within your budget.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <ShoppingBag className="w-3.5 h-3.5 text-pink-600" />
                  Swiggy, Zomato, OYO
                </span>
                <button
                  onClick={() => onNavigate('party-planner')}
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-md transition shadow-sm"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: Jewelry Budget Planner */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group">
            <div className="h-44 bg-gradient-to-br from-emerald-600 to-[#103b2b] p-6 flex flex-col justify-end text-white relative">
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                <Gem className="w-5 h-5" />
              </div>
              <span className="text-xs uppercase font-bold tracking-wider text-emerald-200">
                Multimodal Vision
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                Jewelry Budget Planner
              </h3>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <p className="text-sm text-slate-600 leading-relaxed">
                Find the ideal jewelry pieces for any occasion that match your outfit and budget. Our AI recommends options based on your style preferences, occasion, and available budget.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" />
                  Tanishq, BlueStone, CaratLane
                </span>
                <button
                  onClick={() => onNavigate('jewelry-planner')}
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-md transition shadow-sm"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section (Matching Page 28) */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              What Our Users Say
            </h2>
            <p className="text-sm text-slate-600">
              Real experiences from people who have transformed their financial planning with PocketSmart
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Review 1: Sarah K. */}
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 flex flex-col justify-between shadow-xs">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 italic leading-relaxed">
                  "PocketSmart helped me furnish my new apartment without breaking the bank. The recommendations were spot on and I saved nearly 30% of my original budget!"
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-200/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm">
                  SK
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Sarah K.</h4>
                  <p className="text-xs text-slate-500">Home Owner</p>
                </div>
              </div>
            </div>

            {/* Review 2: Michael R. */}
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 flex flex-col justify-between shadow-xs">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 italic leading-relaxed">
                  "Planning my daughter's birthday party was so much easier with PocketSmart's budget breakdown. The AI suggestions for affordable decorations and catering options were fantastic."
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-200/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-pink-100 text-pink-700 font-bold flex items-center justify-center text-sm">
                  MR
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Michael R.</h4>
                  <p className="text-xs text-slate-500">Parent</p>
                </div>
              </div>
            </div>

            {/* Review 3: Priya M. */}
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 flex flex-col justify-between shadow-xs">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 italic leading-relaxed">
                  "The jewelry recommendations perfectly matched my outfit for the wedding. Saved me hours of searching and I received so many compliments on my accessories!"
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-200/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-sm">
                  PM
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Priya M.</h4>
                  <p className="text-xs text-slate-500">Fashion Enthusiast</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section (Page 28) */}
      <section className="bg-gradient-to-r from-[#0f2b48] to-[#1e4672] text-white py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Ready to Optimize Your Budget?
          </h2>
          <p className="text-sm sm:text-base text-slate-200">
            Join PocketSmart today and start making smarter financial decisions across all areas of your life.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            {currentUser ? (
              <button
                onClick={() => onNavigate('dashboard')}
                className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition shadow-md"
              >
                Go to Dashboard
              </button>
            ) : (
              <>
                <button
                  onClick={() => onOpenAuth('login')}
                  className="px-6 py-2.5 rounded-lg bg-white text-slate-900 font-semibold text-sm hover:bg-slate-100 transition shadow-md"
                >
                  Sign In
                </button>
                <button
                  onClick={() => onOpenAuth('register')}
                  className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition shadow-md"
                >
                  Create Account
                </button>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
