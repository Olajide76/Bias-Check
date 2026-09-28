import React from 'react';
import { TabType } from '../types';
import { LOGO_IMG_URL } from '../data/mockData';

interface HeaderProps {
  currentTab: TabType;
  onNavigate: (tab: TabType) => void;
  onOpenProfile: () => void;
  calibrationMode: string;
  onToggleCalibration: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  onOpenProfile,
  calibrationMode,
  onToggleCalibration
}) => {
  const getSubheaderTitle = () => {
    switch (currentTab) {
      case 'overview':
        return 'Overview';
      case 'new-audit':
        return 'New Audit';
      case 'running':
        return 'Model Parameter Setup';
      case 'report':
        return 'Audit Diagnostic Report';
      case 'history':
        return 'Audit History';
      case 'methodology':
        return 'Methodology';
      case 'about':
        return 'About';
      default:
        return 'Overview';
    }
  };

  const showBackButton = currentTab === 'running' || currentTab === 'report';

  return (
    <header className="fixed top-0 w-full z-50 bg-[#faf8ff]/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#eaedff] pt-safe">
      <div className={`${showBackButton ? 'h-16' : 'h-20'} px-4 max-w-xl mx-auto flex flex-col justify-center transition-all duration-200`}>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            {showBackButton && (
              <button
                aria-label="Go back"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-[#00236f] hover:bg-[#eaedff] active:scale-95 transition-all shrink-0 -ml-1"
                onClick={() => onNavigate(currentTab === 'report' ? 'overview' : 'new-audit')}
              >
                <span className="material-symbols-outlined text-[22px]">arrow_back</span>
              </button>
            )}

            <button
              onClick={() => onNavigate('overview')}
              className="flex items-center gap-2 text-left focus:outline-none group"
            >
              <img
                alt="BiasCheck Logo"
                className="h-8 w-auto object-contain shrink-0 transition-transform group-hover:scale-105"
                src={LOGO_IMG_URL}
              />
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-['Hanken_Grotesk'] text-lg text-[#00236f] font-bold tracking-tight truncate">
                    BiasCheck
                  </span>
                  <span className="font-['JetBrains_Mono'] text-[11px] px-1.5 py-0.5 rounded bg-[#dae2fd] text-[#444651] font-medium shrink-0">
                    {getSubheaderTitle()}
                  </span>
                </div>
                {!showBackButton && (
                  <span className="text-xs text-[#444651] italic truncate font-normal">
                    Audit before the algorithm
                  </span>
                )}
              </div>
            </button>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden sm:flex items-center px-2 py-0.5 rounded bg-[#00312c] text-white font-['JetBrains_Mono'] text-xs gap-1.5 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#89f5e7] animate-pulse"></span>
              <span>Engine v2.4</span>
            </div>

            <button
              onClick={onOpenProfile}
              aria-label="Open researcher session"
              className="w-8 h-8 rounded-full bg-[#00236f] text-white flex items-center justify-center shadow-sm hover:bg-[#1e3a8a] active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
            </button>
          </div>
        </div>

        {!showBackButton && (
          <div className="flex items-center justify-between mt-1 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#fe932c]"></span>
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#444651] uppercase tracking-wider font-medium">
                Proxy Audit Engine v2.4 (Research)
              </span>
            </div>
            <button
              onClick={onToggleCalibration}
              className="font-['JetBrains_Mono'] text-[10px] text-[#00236f] font-bold hover:underline cursor-pointer flex items-center gap-1"
              title="Click to toggle calibration state"
            >
              <span>{calibrationMode}</span>
              <span className="material-symbols-outlined text-[12px]">tune</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
