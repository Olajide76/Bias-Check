import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  currentTab: TabType;
  onNavigate: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onNavigate }) => {
  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'overview', label: 'Overview', icon: 'analytics' },
    { id: 'new-audit', label: 'New Audit', icon: 'biotech' },
    { id: 'history', label: 'History', icon: 'history_edu' },
    { id: 'methodology', label: 'Methodology', icon: 'science' },
    { id: 'about', label: 'About', icon: 'info' }
  ];

  return (
    <nav className="fixed bottom-0 w-full z-40 pb-safe bg-[#faf8ff]/95 backdrop-blur-xl border-t border-[#eaedff] shadow-[0_-1px_8px_rgba(0,0,0,0.03)]">
      <div className="flex justify-around items-center h-16 max-w-xl mx-auto px-2">
        {tabs.map((tab) => {
          const isActive =
            currentTab === tab.id ||
            (tab.id === 'new-audit' && (currentTab === 'running' || currentTab === 'report'));

          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`flex flex-col items-center justify-center min-w-[54px] min-h-[44px] py-1 transition-all rounded-lg focus:outline-none ${
                isActive
                  ? 'text-[#00236f] font-semibold scale-105'
                  : 'text-[#444651] hover:text-[#131b2e]'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[22px] transition-transform ${
                  isActive ? 'fill-1' : ''
                }`}
              >
                {tab.icon}
              </span>
              <span className="font-['JetBrains_Mono'] text-[11px] mt-0.5 tracking-tight">
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-[#00236f] mt-0.5"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
