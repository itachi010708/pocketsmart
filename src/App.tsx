import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { DashboardView } from './components/DashboardView';
import { HomePlannerView } from './components/HomePlannerView';
import { PartyPlannerView } from './components/PartyPlannerView';
import { JewelryPlannerView } from './components/JewelryPlannerView';
import { HistoryView } from './components/HistoryView';
import { AuthModal } from './components/AuthModal';
import { User, Currency, HistoryRecord } from './types';
import { fetchUserHistory, LOCAL_STORAGE_USER_KEY } from './services/apiService';

// Default initial demo user "Sai" as documented in the specification
const DEFAULT_USER: User = {
  id: 'usr-sai-101',
  username: 'sai',
  email: 'sai@example.com',
  fullName: 'Sai',
  createdAt: '2025-05-22T08:00:00.000Z',
};

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    // Default to Sai for immediate rich experience
    return DEFAULT_USER;
  });

  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [currency, setCurrency] = useState<Currency>('INR');
  const [history, setHistory] = useState<HistoryRecord[]>([]);

  // Auth modal state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const loadHistory = async () => {
    const records = await fetchUserHistory(currentUser?.username || 'sai');
    setHistory(records);
  };

  useEffect(() => {
    loadHistory();
  }, [currentUser]);

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    if (currentUser) {
      fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: currentUser.username }),
      }).catch(() => {});
    }
    setCurrentUser(null);
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    setCurrentView('landing');
  };

  const handleOpenAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const toggleCurrency = () => {
    setCurrency((prev) => (prev === 'INR' ? 'USD' : 'INR'));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-blue-600 selection:text-white">
      {/* Navbar with brand, links, currency, auth */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view)}
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenAuth={handleOpenAuth}
        currency={currency}
        onToggleCurrency={toggleCurrency}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentView === 'landing' && (
          <LandingPage
            onNavigate={(view) => setCurrentView(view)}
            onOpenAuth={handleOpenAuth}
            currentUser={currentUser}
          />
        )}

        {currentView === 'dashboard' && currentUser && (
          <DashboardView
            user={currentUser}
            history={history}
            onNavigate={(view) => setCurrentView(view)}
            onSelectHistoryItem={() => setCurrentView('history')}
            currency={currency}
          />
        )}

        {currentView === 'home-planner' && (
          <HomePlannerView
            currentUser={currentUser}
            currency={currency}
            onNavigate={(view) => setCurrentView(view)}
            onPlanSaved={loadHistory}
          />
        )}

        {currentView === 'party-planner' && (
          <PartyPlannerView
            currentUser={currentUser}
            currency={currency}
            onNavigate={(view) => setCurrentView(view)}
            onPlanSaved={loadHistory}
          />
        )}

        {currentView === 'jewelry-planner' && (
          <JewelryPlannerView
            currentUser={currentUser}
            currency={currency}
            onNavigate={(view) => setCurrentView(view)}
            onPlanSaved={loadHistory}
          />
        )}

        {currentView === 'history' && (
          <HistoryView
            currentUser={currentUser}
            history={history}
            onRefreshHistory={loadHistory}
            currency={currency}
            onNavigate={(view) => setCurrentView(view)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={(view) => setCurrentView(view)} />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        initialMode={authMode}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
