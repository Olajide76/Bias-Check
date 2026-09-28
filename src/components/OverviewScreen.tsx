import React, { useState } from 'react';
import { AMARA_PHOTO_URL } from '../data/mockData';
import { TabType } from '../types';

interface OverviewScreenProps {
  onStartDemo: () => void;
  onStartCustom: () => void;
  onNavigate: (tab: TabType) => void;
}

export const OverviewScreen: React.FC<OverviewScreenProps> = ({
  onStartDemo,
  onStartCustom,
  onNavigate
}) => {
  const [activeVariantKey, setActiveVariantKey] = useState<'name' | 'grad' | 'org'>('name');

  const microSimData = {
    name: {
      marker: 'Original: Amara Okoye',
      delta: 'Δ -11.4% score shift',
      observed: '67/100',
      control: '78/100',
      width: '66.6%',
      barColor: 'bg-[#fe932c]',
      badgeColor: 'text-[#904d00] bg-[#ffdcc3]'
    },
    grad: {
      marker: 'Signal: B.S. CompSci (2012 vs Hidden)',
      delta: 'Δ -4.2% score shift',
      observed: '74/100',
      control: '78/100',
      width: '74%',
      barColor: 'bg-[#4059aa]',
      badgeColor: 'text-[#444651] bg-[#dae2fd]'
    },
    org: {
      marker: 'Signal: Lead @ Black Tech Network',
      delta: 'Δ -13.8% score shift',
      observed: '64/100',
      control: '78/100',
      width: '64%',
      barColor: 'bg-[#ba1a1a]',
      badgeColor: 'text-[#ba1a1a] bg-[#ffdad6]'
    }
  };

  const currentSim = microSimData[activeVariantKey];

  return (
    <div className="flex flex-col gap-4 px-4 py-3 max-w-xl mx-auto w-full pb-24">
      {/* Trust & Verification Shield Badge */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-[0_1px_4px_rgba(0,0,0,0.03)] border border-[#eaedff]">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-12 h-12 rounded-xl bg-[#e2e7ff] flex items-center justify-center shrink-0 text-[#00236f]">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="11.5" r="4.5" strokeDasharray="2 2" strokeWidth="1.2" />
              <path d="M10.5 11.5l1.2 1.2 2.5-2.5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.9" />
            </svg>
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-['JetBrains_Mono'] text-xs text-[#00236f] tracking-wider uppercase font-semibold">
                Algorithmic Shield
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-[#00312c] text-[#89f5e7] font-['JetBrains_Mono'] text-[10px] font-medium">
                ISO-Proxy
              </span>
            </div>
            <span className="text-xs text-[#131b2e] truncate font-medium">
              Controlled Variance Verification Lab
            </span>
          </div>
        </div>
        <div className="text-right shrink-0">
          <span className="font-['JetBrains_Mono'] text-xs text-[#904d00] font-bold block">
            v2.4 READY
          </span>
          <span className="font-['JetBrains_Mono'] text-[11px] text-[#444651]">
            0-Delta Target
          </span>
        </div>
      </div>

      {/* Editorial Hero Panel */}
      <div className="bg-white p-5 sm:p-6 rounded-xl shadow-[0_1px_4px_rgba(0,0,0,0.03)] border border-[#eaedff] flex flex-col gap-4 relative overflow-hidden">
        {/* Subtle blur accent */}
        <div className="absolute -right-8 -top-8 w-44 h-44 rounded-full bg-[#eaedff]/60 pointer-events-none blur-2xl"></div>

        <div className="flex flex-col gap-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#eaedff] text-[#00236f] font-['JetBrains_Mono'] text-xs w-fit font-medium">
            <span className="material-symbols-outlined text-[15px]">verified_user</span>
            <span>Pre-Submission Integrity Protocol</span>
          </div>
          <h1 className="font-['Hanken_Grotesk'] text-2xl sm:text-3xl text-[#00236f] font-bold tracking-tight leading-tight">
            Audit your resume before the algorithm does.
          </h1>
          <p className="text-sm sm:text-base text-[#444651] leading-relaxed">
            BiasCheck lets you test whether identity-signalling details in an otherwise identical resume produce different automated screening scores — using comparable screening models as a proxy.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2.5 pt-1 relative z-10">
          <button
            onClick={onStartDemo}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#1e3a8a] text-white font-['JetBrains_Mono'] text-xs sm:text-sm font-semibold hover:bg-[#00236f] active:scale-[0.98] transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-[20px]">play_circle</span>
            <span>Try Demo Audit (Amara Okoye)</span>
          </button>
          <button
            onClick={onStartCustom}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#eaedff] text-[#131b2e] font-['JetBrains_Mono'] text-xs sm:text-sm font-semibold hover:bg-[#dae2fd] active:scale-[0.98] transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">upload_file</span>
            <span>Start Custom Audit</span>
          </button>
        </div>
      </div>

      {/* Preloaded Demo Card (Quick Start) */}
      <div className="bg-[#f2f3ff] p-4 rounded-xl border border-[#eaedff] flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="font-['JetBrains_Mono'] text-[11px] text-[#444651] uppercase tracking-wider font-semibold">
            Quick Benchmark Subject
          </span>
          <span className="px-2 py-0.5 rounded bg-[#dae2fd] text-[#00236f] font-['JetBrains_Mono'] text-[11px] font-semibold">
            Pre-Loaded Baseline
          </span>
        </div>

        <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-[#eaedff] shadow-xs">
          <div className="relative w-12 h-12 rounded-lg bg-[#e2e7ff] overflow-hidden shrink-0 flex items-center justify-center">
            <img
              className="object-cover w-full h-full"
              alt="Portrait of Amara Okoye"
              src={AMARA_PHOTO_URL}
            />
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="font-['Hanken_Grotesk'] text-base font-bold text-[#131b2e] truncate">
                Amara Okoye
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#fe932c]"></span>
            </div>
            <span className="text-xs text-[#444651] truncate">
              Lead Full-Stack / Distributed Systems (8 yrs exp)
            </span>
          </div>
          <button
            onClick={onStartDemo}
            className="px-3 py-1.5 rounded bg-[#00236f] text-white font-['JetBrains_Mono'] text-xs font-semibold shrink-0 active:scale-95 transition-transform flex items-center gap-1 hover:bg-[#1e3a8a]"
          >
            <span>Run</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>

        {/* Quick stats ribbon */}
        <div className="grid grid-cols-3 gap-2 pt-0.5">
          <div className="bg-white p-2 rounded-lg text-center border border-[#eaedff]">
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#444651] block uppercase">
              Target Role
            </span>
            <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#131b2e] truncate block">
              Staff Eng
            </span>
          </div>
          <div className="bg-white p-2 rounded-lg text-center border border-[#eaedff]">
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#444651] block uppercase">
              Signals Isolated
            </span>
            <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#904d00] block">
              4 Vectors
            </span>
          </div>
          <div className="bg-white p-2 rounded-lg text-center border border-[#eaedff]">
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#444651] block uppercase">
              Audit Time
            </span>
            <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#131b2e] block">
              ~1.2s
            </span>
          </div>
        </div>
      </div>

      {/* Scientific Research Protocol Notice */}
      <div className="bg-[#e2e7ff] p-4 rounded-xl flex items-start gap-3 border border-[#dae2fd]">
        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0 text-[#00236f] shadow-xs">
          <span className="material-symbols-outlined text-[18px]">biotech</span>
        </div>
        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-['JetBrains_Mono'] text-xs uppercase font-bold text-[#00236f] tracking-wider">
              Research Protocol Notice
            </span>
            <span className="px-1.5 py-0.5 rounded bg-white text-[#131b2e] font-['JetBrains_Mono'] text-[10px] font-semibold">
              Proxy ≠ Proof
            </span>
          </div>
          <p className="text-xs text-[#444651] leading-relaxed">
            BiasCheck cannot access proprietary ATS weights. Audit results are directional proxy signals generated using comparable open benchmark architectures and should not be interpreted as proof of how a specific firm evaluates credentials.
          </p>
        </div>
      </div>

      {/* Ethical Principle Banner */}
      <div className="bg-[#00312c] text-white p-4 rounded-xl flex items-center gap-3 shadow-sm">
        <div className="w-9 h-9 rounded-lg bg-[#004942] flex items-center justify-center shrink-0 text-[#4ebdb0]">
          <span className="material-symbols-outlined text-[20px]">balance</span>
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-['JetBrains_Mono'] text-xs text-[#89f5e7] font-semibold uppercase tracking-wider">
            Ethical Audit Principle
          </span>
          <p className="text-xs text-white/90 font-medium leading-snug">
            Test identity signals. Never fake identity. Variants exist strictly for algorithmic sensitivity auditing.
          </p>
        </div>
      </div>

      {/* Live Proxy Model Engine Metric Ribbon */}
      <div className="bg-white p-4 rounded-xl shadow-xs border border-[#eaedff] flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="font-['JetBrains_Mono'] text-xs text-[#444651] uppercase tracking-wider font-semibold">
            Benchmarking Specification
          </span>
          <span className="font-['JetBrains_Mono'] text-xs text-[#00236f] font-semibold">
            2 Models • 12 Deterministic Runs
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#f2f3ff] p-3 rounded-lg flex flex-col gap-1 border border-[#eaedff]">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#131b2e] font-bold">ResumeMatch-Open</span>
              <span className="w-2 h-2 rounded-full bg-[#fe932c]"></span>
            </div>
            <span className="font-['JetBrains_Mono'] text-[11px] text-[#444651]">Dense Embeddings (BERT)</span>
            <div className="w-full bg-[#dae2fd] h-1.5 rounded-full overflow-hidden mt-1">
              <div className="bg-[#00236f] h-full w-[88%] rounded-full"></div>
            </div>
          </div>

          <div className="bg-[#f2f3ff] p-3 rounded-lg flex flex-col gap-1 border border-[#eaedff]">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#131b2e] font-bold">ScreenRank-Open</span>
              <span className="w-2 h-2 rounded-full bg-[#004942]"></span>
            </div>
            <span className="font-['JetBrains_Mono'] text-[11px] text-[#444651]">Cross-Encoder Transformer</span>
            <div className="w-full bg-[#dae2fd] h-1.5 rounded-full overflow-hidden mt-1">
              <div className="bg-[#00236f] h-full w-[94%] rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1 font-['JetBrains_Mono'] text-xs text-[#444651]">
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[15px] text-[#00236f]">verified</span>
            Statistical confidence analysis enabled
          </span>
          <span className="text-[#00236f] font-semibold">p &lt; 0.01</span>
        </div>
      </div>

      {/* 3-Step Flow Architecture */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="font-['Hanken_Grotesk'] text-lg font-bold text-[#00236f]">
            Forensic Testing Pipeline
          </h2>
          <span className="font-['JetBrains_Mono'] text-xs text-[#444651]">3 Phases</span>
        </div>

        {/* Step 01 */}
        <div className="bg-white p-4 rounded-xl shadow-xs border border-[#eaedff] flex gap-3.5 items-start">
          <div className="w-10 h-10 rounded-lg bg-[#e2e7ff] flex items-center justify-center shrink-0">
            <span className="font-['JetBrains_Mono'] text-sm text-[#00236f] font-bold">01</span>
          </div>
          <div className="flex flex-col gap-1 min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-['Hanken_Grotesk'] text-sm font-bold text-[#131b2e]">
                Target Extraction
              </h3>
              <span className="material-symbols-outlined text-[18px] text-[#444651]">file_present</span>
            </div>
            <p className="text-xs text-[#444651] leading-relaxed">
              Ingest candidate resume (PDF/DOCX/TXT) and target role description. Structural markers and experience blocks are tokenized into calibrated feature sets.
            </p>
            <div className="flex gap-1.5 mt-1.5 flex-wrap">
              <span className="px-2 py-0.5 rounded bg-[#eaedff] text-[#131b2e] font-['JetBrains_Mono'] text-[11px] font-medium">
                Tokens: 1,420
              </span>
              <span className="px-2 py-0.5 rounded bg-[#eaedff] text-[#131b2e] font-['JetBrains_Mono'] text-[11px] font-medium">
                Parser: AST v4
              </span>
            </div>
          </div>
        </div>

        {/* Step 02 */}
        <div className="bg-white p-4 rounded-xl shadow-xs border border-[#eaedff] flex gap-3.5 items-start">
          <div className="w-10 h-10 rounded-lg bg-[#e2e7ff] flex items-center justify-center shrink-0">
            <span className="font-['JetBrains_Mono'] text-sm text-[#00236f] font-bold">02</span>
          </div>
          <div className="flex flex-col gap-1 min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-['Hanken_Grotesk'] text-sm font-bold text-[#131b2e]">
                Controlled Variant Synthesis
              </h3>
              <span className="material-symbols-outlined text-[18px] text-[#904d00]">tune</span>
            </div>
            <p className="text-xs text-[#444651] leading-relaxed">
              Controlled variants isolate identity markers (names, alma mater pronouns, affinity organizations) while substantive qualifications stay 100% identical.
            </p>
            <div className="bg-[#f2f3ff] p-2 rounded font-['JetBrains_Mono'] text-[11px] text-[#444651] flex items-center justify-between mt-1 border border-[#eaedff]">
              <span>Invariance Constraint:</span>
              <span className="text-[#00236f] font-bold">K-S Metric: 0.998</span>
            </div>
          </div>
        </div>

        {/* Step 03 */}
        <div className="bg-white p-4 rounded-xl shadow-xs border border-[#eaedff] flex gap-3.5 items-start">
          <div className="w-10 h-10 rounded-lg bg-[#e2e7ff] flex items-center justify-center shrink-0">
            <span className="font-['JetBrains_Mono'] text-sm text-[#00236f] font-bold">03</span>
          </div>
          <div className="flex flex-col gap-1 min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-['Hanken_Grotesk'] text-sm font-bold text-[#131b2e]">
                Variance Diagnosis
              </h3>
              <span className="material-symbols-outlined text-[18px] text-[#004942]">insights</span>
            </div>
            <p className="text-xs text-[#444651] leading-relaxed">
              Inspect score spreads across models, sensitivity breakdowns, and review recommendations for identity-neutral clarity improvements without sacrificing truth.
            </p>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="px-2 py-0.5 rounded bg-[#eaedff] text-[#904d00] font-['JetBrains_Mono'] text-[11px] font-semibold">
                Δ Sensitivity Plot
              </span>
              <span className="px-2 py-0.5 rounded bg-[#eaedff] text-[#00236f] font-['JetBrains_Mono'] text-[11px] font-semibold">
                Token Attribution
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Live Micro-Preview Modal/Drawer Container */}
      <div className="bg-white p-4 rounded-xl shadow-xs border border-[#eaedff] flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#fe932c]"></span>
            <span className="font-['JetBrains_Mono'] text-xs text-[#00236f] font-bold uppercase tracking-wider">
              Interactive Micro-Sim
            </span>
          </div>
          <span className="font-['JetBrains_Mono'] text-xs text-[#444651]">Live Sensitivity Delta</span>
        </div>

        <div className="flex flex-col gap-1.5 bg-[#f2f3ff] p-3 rounded-lg border border-[#eaedff]">
          <span className="font-['JetBrains_Mono'] text-[11px] text-[#444651] font-medium">
            Tested Identity Dimension:
          </span>
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            <button
              onClick={() => setActiveVariantKey('name')}
              className={`px-3 py-1 rounded font-['JetBrains_Mono'] text-xs transition-colors whitespace-nowrap font-medium ${
                activeVariantKey === 'name'
                  ? 'bg-[#00236f] text-white shadow-xs'
                  : 'bg-[#eaedff] text-[#131b2e] hover:bg-[#dae2fd]'
              }`}
            >
              Given Name Signal
            </button>
            <button
              onClick={() => setActiveVariantKey('grad')}
              className={`px-3 py-1 rounded font-['JetBrains_Mono'] text-xs transition-colors whitespace-nowrap font-medium ${
                activeVariantKey === 'grad'
                  ? 'bg-[#00236f] text-white shadow-xs'
                  : 'bg-[#eaedff] text-[#131b2e] hover:bg-[#dae2fd]'
              }`}
            >
              Graduation Year
            </button>
            <button
              onClick={() => setActiveVariantKey('org')}
              className={`px-3 py-1 rounded font-['JetBrains_Mono'] text-xs transition-colors whitespace-nowrap font-medium ${
                activeVariantKey === 'org'
                  ? 'bg-[#00236f] text-white shadow-xs'
                  : 'bg-[#eaedff] text-[#131b2e] hover:bg-[#dae2fd]'
              }`}
            >
              Affinity Guild
            </button>
          </div>
        </div>

        {/* Sensitivity Delta Meter */}
        <div className="flex flex-col gap-2 p-3 bg-[#f2f3ff] rounded-lg border border-[#eaedff]">
          <div className="flex justify-between items-center font-['JetBrains_Mono'] text-xs">
            <span className="text-[#444651] truncate max-w-[200px]">{currentSim.marker}</span>
            <span className={`px-2 py-0.5 rounded font-semibold ${currentSim.badgeColor}`}>
              {currentSim.delta}
            </span>
          </div>

          <div className="h-3 w-full bg-[#dae2fd] rounded-full overflow-hidden flex relative">
            {/* Baseline control pin at 78% */}
            <div
              className="absolute left-[78%] top-0 bottom-0 w-0.5 bg-[#00236f] z-20"
              title="Neutral Reference Baseline (78/100)"
            ></div>
            {/* Model score variant bar */}
            <div
              className={`h-full transition-all duration-500 rounded-full ${currentSim.barColor}`}
              style={{ width: currentSim.width }}
            ></div>
          </div>

          <div className="flex justify-between font-['JetBrains_Mono'] text-xs text-[#444651] pt-0.5">
            <span>Observed: {currentSim.observed}</span>
            <span className="text-[#00236f] font-semibold">Anonymized Control: {currentSim.control}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-[#444651]">Simulating ScreenRank Transformer</span>
          <button
            onClick={() => onNavigate('new-audit')}
            className="font-['JetBrains_Mono'] text-xs text-[#00236f] font-semibold flex items-center gap-1 hover:underline"
          >
            <span>Open Full Audit Studio</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Final Call to Action */}
      <div className="bg-[#00236f] text-white p-6 rounded-xl flex flex-col items-center text-center gap-3 shadow-md mb-4">
        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
          <span className="material-symbols-outlined text-white text-[22px]">fingerprint</span>
        </div>
        <h3 className="font-['Hanken_Grotesk'] text-xl font-bold">Demand transparent evaluations.</h3>
        <p className="text-xs sm:text-sm text-[#b6c4ff] leading-relaxed max-w-sm">
          Review your credentials across automated screening models before submitting to production talent filters.
        </p>
        <button
          onClick={onStartCustom}
          className="w-full sm:w-auto px-6 py-3 rounded-lg bg-white text-[#00236f] font-['JetBrains_Mono'] text-xs sm:text-sm font-bold active:scale-95 transition-transform mt-1 shadow-sm hover:bg-[#faf8ff]"
        >
          Begin Resume Sensitivity Audit
        </button>
      </div>
    </div>
  );
};
