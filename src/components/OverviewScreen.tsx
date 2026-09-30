import React, { useState } from 'react';
import { AMARA_PHOTO_URL } from '../data/mockData';
import { TabType } from '../types';

interface OverviewScreenProps {
  onStartDemo: () => void;
  onStartCandidate: (candidateKey: 'amara' | 'sadiq' | 'elena') => void;
  onConfigureCandidate: (candidateKey: 'amara' | 'sadiq' | 'elena') => void;
  onStartCustom: () => void;
  onNavigate: (tab: TabType) => void;
}

export const OverviewScreen: React.FC<OverviewScreenProps> = ({
  onStartDemo,
  onStartCandidate,
  onConfigureCandidate,
  onStartCustom,
  onNavigate
}) => {
  const [activeVariantKey, setActiveVariantKey] = useState<'name' | 'grad' | 'org'>('name');

  const comparisonData = {
    name: {
      title: 'Candidate Name Marker',
      subtitle: 'Amara Okoye vs Anonymized Reference Control',
      observedScore: 78,
      controlScore: 93,
      gapPts: 15,
      explanation: 'When candidate credentials, companies, and skills are 100% identical, changing only the candidate name creates an observed 15-point gap in automated screening scores.'
    },
    grad: {
      title: 'Graduation Year Marker',
      subtitle: 'Graduation Year Visible vs Year Hidden',
      observedScore: 89,
      controlScore: 93,
      gapPts: 4,
      explanation: 'Exposing older graduation dates can introduce subtle age-proxy penalties in automated resume parsers.'
    },
    org: {
      title: 'Affinity Organization Marker',
      subtitle: 'Affinity Tech Network vs Generic Industry Org',
      observedScore: 85,
      controlScore: 93,
      gapPts: 8,
      explanation: 'Affinity groups or identity-affiliated organizations can trigger unexpected latent proximity shifts in screening models.'
    }
  };

  const activeComp = comparisonData[activeVariantKey];

  return (
    <div className="flex flex-col gap-8 px-4 sm:px-6 py-6 max-w-5xl mx-auto w-full pb-28 md:pb-12">
      {/* Hero Section: 2 Columns on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Clear Value Proposition */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-[#eaedff] shadow-xs flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold text-[#00236f] tracking-wide uppercase font-['JetBrains_Mono']">
              AI Resume Sensitivity Auditor
            </span>
            <h1 className="font-['Hanken_Grotesk'] text-2xl sm:text-3xl lg:text-4xl text-[#00236f] font-bold tracking-tight leading-tight">
              See how AI screening scores your resume before you apply.
            </h1>
            <p className="text-sm sm:text-base text-[#444651] leading-relaxed">
              Automated Applicant Tracking Systems (ATS) and screening algorithms can score identical qualifications differently based on name and demographic cues. BiasCheck runs controlled comparison audits so you can uncover hidden score drops and fortify your legitimate credentials.
            </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={onStartDemo}
              className="flex-1 flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl bg-[#00236f] text-white font-['JetBrains_Mono'] text-xs sm:text-sm font-semibold hover:bg-[#1e3a8a] active:scale-[0.98] transition-all shadow-sm cursor-pointer"
            >
              <img
                src={AMARA_PHOTO_URL}
                alt="Amara thumbnail"
                className="w-5 h-5 rounded-full object-cover border border-white/40"
              />
              <span>Try Sample Audit (Amara)</span>
            </button>
            <button
              onClick={onStartCustom}
              className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#f2f3ff] text-[#00236f] font-['JetBrains_Mono'] text-xs sm:text-sm font-semibold hover:bg-[#eaedff] border border-[#eaedff] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">upload_file</span>
              <span>Upload Your Resume</span>
            </button>
          </div>

          {/* Quiet Trust Footnote */}
          <div className="flex items-center justify-between pt-3 border-t border-[#f2f3ff] text-xs text-[#757682] flex-wrap gap-2">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px] text-[#004942]">check_circle</span>
              100% Confidential · Ephemeral In-Memory
            </span>
            <span>Aligned with IEEE 7003 Guidelines</span>
          </div>
        </div>

        {/* Right Column: Interactive Demonstration */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-[#eaedff] shadow-xs flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#00236f] tracking-wide uppercase font-['JetBrains_Mono']">
                Live Interactive Demo
              </span>
              <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#ba1a1a]">
                -{activeComp.gapPts} pts gap
              </span>
            </div>
            <h2 className="font-['Hanken_Grotesk'] text-lg font-bold text-[#131b2e] mt-1">
              {activeComp.title}
            </h2>
            <p className="text-xs text-[#444651] mt-0.5">
              {activeComp.subtitle}
            </p>
          </div>

          {/* Selector Tabs */}
          <div className="grid grid-cols-3 gap-1 p-1 bg-[#f2f3ff] rounded-xl border border-[#eaedff]">
            <button
              onClick={() => setActiveVariantKey('name')}
              className={`py-1.5 px-2 rounded-lg text-xs font-['JetBrains_Mono'] font-medium transition-all text-center cursor-pointer ${
                activeVariantKey === 'name'
                  ? 'bg-white text-[#00236f] font-bold shadow-xs'
                  : 'text-[#444651] hover:text-[#131b2e]'
              }`}
            >
              Name
            </button>
            <button
              onClick={() => setActiveVariantKey('grad')}
              className={`py-1.5 px-2 rounded-lg text-xs font-['JetBrains_Mono'] font-medium transition-all text-center cursor-pointer ${
                activeVariantKey === 'grad'
                  ? 'bg-white text-[#00236f] font-bold shadow-xs'
                  : 'text-[#444651] hover:text-[#131b2e]'
              }`}
            >
              Grad Date
            </button>
            <button
              onClick={() => setActiveVariantKey('org')}
              className={`py-1.5 px-2 rounded-lg text-xs font-['JetBrains_Mono'] font-medium transition-all text-center cursor-pointer ${
                activeVariantKey === 'org'
                  ? 'bg-white text-[#00236f] font-bold shadow-xs'
                  : 'text-[#444651] hover:text-[#131b2e]'
              }`}
            >
              Affinity Org
            </button>
          </div>

          {/* Side by side score bars */}
          <div className="bg-[#faf8ff] p-4 rounded-xl border border-[#eaedff] space-y-3">
            <div>
              <div className="flex justify-between text-xs text-[#131b2e] mb-1">
                <span className="font-medium">Original Resume</span>
                <span className="font-['JetBrains_Mono'] font-bold text-[#ba1a1a]">
                  {activeComp.observedScore} / 100
                </span>
              </div>
              <div className="w-full bg-[#eaedff] h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#ba1a1a] h-full rounded-full transition-all duration-500"
                  style={{ width: `${activeComp.observedScore}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-[#131b2e] mb-1">
                <span className="font-medium">Identical Control Variant</span>
                <span className="font-['JetBrains_Mono'] font-bold text-[#004942]">
                  {activeComp.controlScore} / 100
                </span>
              </div>
              <div className="w-full bg-[#eaedff] h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#004942] h-full rounded-full transition-all duration-500"
                  style={{ width: `${activeComp.controlScore}%` }}
                ></div>
              </div>
            </div>

            <p className="text-[11px] text-[#444651] leading-relaxed pt-2 border-t border-[#eaedff]/70">
              {activeComp.explanation}
            </p>
          </div>

          <button
            onClick={onStartDemo}
            className="w-full py-2.5 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] text-[#00236f] text-xs font-['JetBrains_Mono'] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <span>View Full Diagnostic Report</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* How it Works: 3 Simple Steps */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#eaedff] shadow-xs flex flex-col gap-5">
        <div>
          <span className="text-xs font-semibold text-[#00236f] tracking-wide uppercase font-['JetBrains_Mono']">
            Auditing Methodology
          </span>
          <h2 className="font-['Hanken_Grotesk'] text-xl font-bold text-[#131b2e] mt-1">
            How a BiasCheck audit works
          </h2>
          <p className="text-xs text-[#444651] mt-0.5">
            Three simple steps to test and optimize your resume before submitting to automated ATS:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-[#f2f3ff] border border-[#eaedff] flex flex-col gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#00236f] text-white flex items-center justify-center font-['JetBrains_Mono'] text-xs font-bold">
              1
            </div>
            <strong className="text-sm font-bold text-[#131b2e]">Upload Your Resume</strong>
            <p className="text-xs text-[#444651] leading-relaxed">
              We extract authentic skills, experience, and education in temporary memory. Your files are never stored or sold.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#f2f3ff] border border-[#eaedff] flex flex-col gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#00236f] text-white flex items-center justify-center font-['JetBrains_Mono'] text-xs font-bold">
              2
            </div>
            <strong className="text-sm font-bold text-[#131b2e]">Run Controlled Variants</strong>
            <p className="text-xs text-[#444651] leading-relaxed">
              We benchmark your exact resume alongside identical synthetic variants across open screening models to isolate bias.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#f2f3ff] border border-[#eaedff] flex flex-col gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#004942] text-white flex items-center justify-center font-['JetBrains_Mono'] text-xs font-bold">
              3
            </div>
            <strong className="text-sm font-bold text-[#131b2e]">Get Clear Improvements</strong>
            <p className="text-xs text-[#444651] leading-relaxed">
              Discover keyword enhancements and formatting tips that maximize ATS scores with zero misrepresentation.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Test Profiles for New Users */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#eaedff] shadow-xs flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-semibold text-[#00236f] tracking-wide uppercase font-['JetBrains_Mono']">
              Try It Immediately
            </span>
            <h2 className="font-['Hanken_Grotesk'] text-xl font-bold text-[#131b2e] mt-1">
              Select a benchmark profile to inspect
            </h2>
            <p className="text-xs text-[#444651] mt-0.5">
              Click any candidate below to run their specific audit and view their tailored results:
            </p>
          </div>
          <button
            onClick={() => onNavigate('history')}
            className="text-xs text-[#00236f] font-['JetBrains_Mono'] font-bold hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>View All Benchmarks</span>
            <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Candidate 1: Amara Okoye */}
          <div className="p-5 rounded-xl bg-[#faf8ff] border border-[#eaedff] flex flex-col justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={AMARA_PHOTO_URL}
                alt="Amara"
                className="w-11 h-11 rounded-full object-cover border border-[#eaedff]"
              />
              <div>
                <strong className="text-sm font-bold text-[#131b2e] block">
                  Amara Okoye
                </strong>
                <span className="text-xs text-[#444651]">Senior Full-Stack Eng</span>
                <span className="text-[10px] text-[#757682] block">Fintech Core Systems</span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-white border border-[#eaedff] flex justify-between items-center text-xs">
              <span className="text-[#444651]">Score: <strong className="text-[#ba1a1a]">78</strong> vs 93</span>
              <span className="font-['JetBrains_Mono'] font-bold text-[#ba1a1a] bg-[#ffdad6] px-1.5 py-0.5 rounded text-[11px]">
                -15 pts gap
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => onStartCandidate('amara')}
                className="w-full py-2.5 px-3 rounded-lg bg-[#00236f] text-white text-xs font-['JetBrains_Mono'] font-semibold hover:bg-[#1e3a8a] transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Run Audit for Amara</span>
                <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
              </button>
              <button
                type="button"
                onClick={() => onConfigureCandidate('amara')}
                className="w-full py-1.5 px-2 rounded-lg bg-white text-[#444651] hover:text-[#00236f] text-[11px] font-['JetBrains_Mono'] transition text-center cursor-pointer border border-[#eaedff]"
              >
                Customize Criteria
              </button>
            </div>
          </div>

          {/* Candidate 2: Sadiq Al-Mansoor */}
          <div className="p-5 rounded-xl bg-[#faf8ff] border border-[#eaedff] flex flex-col justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#00236f] text-white flex items-center justify-center font-['JetBrains_Mono'] text-sm font-bold shadow-xs">
                SA
              </div>
              <div>
                <strong className="text-sm font-bold text-[#131b2e] block">
                  Sadiq Al-Mansoor
                </strong>
                <span className="text-xs text-[#444651]">Data Platform Architect</span>
                <span className="text-[10px] text-[#757682] block">Streaming & Lakehouse</span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-white border border-[#eaedff] flex justify-between items-center text-xs">
              <span className="text-[#444651]">Score: <strong className="text-[#ba1a1a]">74</strong> vs 88</span>
              <span className="font-['JetBrains_Mono'] font-bold text-[#ba1a1a] bg-[#ffdad6] px-1.5 py-0.5 rounded text-[11px]">
                -14 pts gap
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => onStartCandidate('sadiq')}
                className="w-full py-2.5 px-3 rounded-lg bg-[#00236f] text-white text-xs font-['JetBrains_Mono'] font-semibold hover:bg-[#1e3a8a] transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Run Audit for Sadiq</span>
                <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
              </button>
              <button
                type="button"
                onClick={() => onConfigureCandidate('sadiq')}
                className="w-full py-1.5 px-2 rounded-lg bg-white text-[#444651] hover:text-[#00236f] text-[11px] font-['JetBrains_Mono'] transition text-center cursor-pointer border border-[#eaedff]"
              >
                Customize Criteria
              </button>
            </div>
          </div>

          {/* Candidate 3: Elena Vasiliev */}
          <div className="p-5 rounded-xl bg-[#faf8ff] border border-[#eaedff] flex flex-col justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#004942] text-white flex items-center justify-center font-['JetBrains_Mono'] text-sm font-bold shadow-xs">
                EV
              </div>
              <div>
                <strong className="text-sm font-bold text-[#131b2e] block">
                  Elena Vasiliev
                </strong>
                <span className="text-xs text-[#444651]">Technical Product Lead</span>
                <span className="text-[10px] text-[#757682] block">Payments & Funnels</span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-white border border-[#eaedff] flex justify-between items-center text-xs">
              <span className="text-[#444651]">Score: <strong className="text-[#ba1a1a]">81</strong> vs 92</span>
              <span className="font-['JetBrains_Mono'] font-bold text-[#ba1a1a] bg-[#ffdad6] px-1.5 py-0.5 rounded text-[11px]">
                -11 pts gap
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => onStartCandidate('elena')}
                className="w-full py-2.5 px-3 rounded-lg bg-[#00236f] text-white text-xs font-['JetBrains_Mono'] font-semibold hover:bg-[#1e3a8a] transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Run Audit for Elena</span>
                <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
              </button>
              <button
                type="button"
                onClick={() => onConfigureCandidate('elena')}
                className="w-full py-1.5 px-2 rounded-lg bg-white text-[#444651] hover:text-[#00236f] text-[11px] font-['JetBrains_Mono'] transition text-center cursor-pointer border border-[#eaedff]"
              >
                Customize Criteria
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pre-submission Disclaimer & Ethical Anchor */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#eaedff]/60 border border-[#b9c3ff] flex items-start gap-3.5 text-xs text-[#00236f]">
        <span className="material-symbols-outlined text-[22px] text-[#00236f] shrink-0 mt-0.5">
          policy
        </span>
        <div className="space-y-1">
          <p className="font-bold text-xs sm:text-sm">
            Ethical Testing Principle
          </p>
          <p className="text-[#444651] leading-relaxed text-xs">
            Never alter your real identity on actual job applications. Identity variants exist exclusively inside controlled test audits to evaluate automated screening sensitivity and help you fortify your legitimate credentials.
          </p>
        </div>
      </div>
    </div>
  );
};
