import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  currentTab: TabType;
  onNavigate: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onNavigate }) => {
  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'overview', label: 'Home', icon: 'home' },
    { id: 'new-audit', label: 'New Audit', icon: 'add_circle' },
    { id: 'report', label: 'Results', icon: 'insights' },
    { id: 'history', label: 'History', icon: 'history' },
    { id: 'methodology', label: 'How It Works', icon: 'menu_book' }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 w-full z-40 pb-safe bg-[#faf8ff]/95 backdrop-blur-xl border-t border-[#eaedff] shadow-[0_-1px_8px_rgba(0,0,0,0.03)]">
      <div className="flex justify-around items-center h-16 max-w-xl mx-auto px-2">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 transition-all rounded-lg focus:outline-none cursor-pointer ${
                isActive
                  ? 'text-[#00236f] font-semibold scale-105'
                  : 'text-[#757682] hover:text-[#131b2e]'
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
