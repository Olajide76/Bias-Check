import React from 'react';
import { TabType } from '../types';
import { LOGO_IMG_URL } from '../data/mockData';

interface HeaderProps {
  currentTab: TabType;
  onNavigate: (tab: TabType) => void;
  onOpenProfile?: () => void;
  calibrationMode?: string;
  onToggleCalibration?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate
}) => {
  const showBackButton = currentTab === 'running' || currentTab === 'report';

  const navItems: { id: TabType; label: string; icon: string }[] = [
    { id: 'overview', label: 'Home', icon: 'home' },
    { id: 'new-audit', label: 'New Audit', icon: 'add_circle' },
    { id: 'report', label: 'Results', icon: 'insights' },
    { id: 'history', label: 'History', icon: 'history' },
    { id: 'methodology', label: 'How It Works', icon: 'menu_book' }
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-[#faf8ff]/95 backdrop-blur-xl border-b border-[#eaedff] shadow-[0_1px_8px_rgba(0,0,0,0.03)] pt-safe">
      <div className="h-16 px-4 sm:px-6 max-w-5xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Brand & Logo */}
        <div className="flex items-center gap-3 min-w-0">
          {showBackButton && (
            <button
              aria-label="Go back"
              className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center text-[#00236f] hover:bg-[#eaedff] active:scale-95 transition-all shrink-0 -ml-1 cursor-pointer"
              onClick={() => onNavigate(currentTab === 'report' ? 'overview' : 'new-audit')}
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
          )}

          <button
            onClick={() => onNavigate('overview')}
            className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer"
          >
            <img
              alt="BiasCheck Logo"
              className="h-8 w-auto object-contain shrink-0 transition-transform group-hover:scale-105"
              src={LOGO_IMG_URL}
            />
            <div className="flex flex-col min-w-0">
              <span className="font-['Hanken_Grotesk'] text-lg text-[#00236f] font-bold tracking-tight leading-none">
                BiasCheck
              </span>
              <span className="text-[11px] text-[#757682] font-medium tracking-tight hidden sm:inline">
                AI Resume Fairness Auditor
              </span>
            </div>
          </button>
        </div>

        {/* Center: Desktop Navigation Bar */}
        <nav className="hidden md:flex items-center gap-1 bg-[#f2f3ff] p-1 rounded-xl border border-[#eaedff]">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-['JetBrains_Mono'] font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white text-[#00236f] font-bold shadow-xs'
                    : 'text-[#444651] hover:text-[#131b2e] hover:bg-white/50'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Quick Action Button */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onNavigate('new-audit')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#00236f] text-white text-xs font-['JetBrains_Mono'] font-semibold hover:bg-[#1e3a8a] active:scale-95 transition-all shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">play_circle</span>
            <span className="hidden sm:inline">Start New Audit</span>
            <span className="sm:hidden">Audit</span>
          </button>
        </div>
      </div>
    </header>
  );
};
