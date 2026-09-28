import React, { useEffect, useState } from 'react';
import { TELEMETRY_LOGS } from '../data/mockData';

interface RunningAuditScreenProps {
  onComplete: () => void;
  auditId?: string;
  candidateName?: string;
}

export const RunningAuditScreen: React.FC<RunningAuditScreenProps> = ({
  onComplete,
  auditId = 'AUD-2026-0928-88',
  candidateName = 'Amara Okoye'
}) => {
  const [percent, setPercent] = useState(76);
  const [stage, setStage] = useState(5);
  const [liveLogIndex, setLiveLogIndex] = useState(3);
  const [isFinishing, setIsFinishing] = useState(false);

  // SVG ring circumference for r=44 is ~276.46
  const circumference = 276.46;
  const strokeDashoffset = circumference - (circumference * percent) / 100;

  useEffect(() => {
    const timer = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        const next = prev + 3;
        if (next >= 85 && stage < 6) setStage(6);
        if (next >= 94 && stage < 7) setStage(7);
        return next > 100 ? 100 : next;
      });
    }, 400);

    const logTimer = setInterval(() => {
      setLiveLogIndex((prev) => (prev + 1) % TELEMETRY_LOGS.length);
    }, 1800);

    return () => {
      clearInterval(timer);
      clearInterval(logTimer);
    };
  }, [stage]);

  // Auto transition when reaching 100%
  useEffect(() => {
    if (percent >= 100 && !isFinishing) {
      setIsFinishing(true);
      const finishTimeout = setTimeout(() => {
        onComplete();
      }, 700);
      return () => clearTimeout(finishTimeout);
    }
  }, [percent, isFinishing, onComplete]);

  const handleSkip = () => {
    setPercent(100);
    setStage(7);
    setIsFinishing(true);
    setTimeout(() => {
      onComplete();
    }, 400);
  };

  return (
    <div className="flex flex-col w-full px-4 py-4 max-w-xl mx-auto gap-4 pb-24">
      {/* Audit Trace Pill */}
      <div className="flex items-center justify-between bg-[#f2f3ff] px-4 py-2.5 rounded-xl border border-[#eaedff] shadow-xs">
        <div className="flex items-center gap-2 text-[#444651]">
          <span className="material-symbols-outlined text-[18px] text-[#00236f]">verified_user</span>
          <span className="font-['JetBrains_Mono'] text-xs font-semibold">AUDIT TRACE</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#904d00] animate-ping"></span>
          <span className="font-['JetBrains_Mono'] text-xs text-[#00236f] font-bold">
            #{auditId}
          </span>
        </div>
      </div>

      {/* Headline */}
      <div className="flex flex-col gap-1 px-1">
        <h1 className="font-['Hanken_Grotesk'] text-2xl font-bold text-[#131b2e] tracking-tight">
          Running your bias audit
        </h1>
        <p className="text-xs sm:text-sm text-[#444651]">
          Evaluating 3 controlled variants across 2 screening architectures in deterministic mode...
        </p>
      </div>

      {/* Central Progress Ring Card */}
      <div className="relative bg-white rounded-xl p-6 shadow-xs border border-[#eaedff] flex flex-col items-center justify-center overflow-hidden">
        {/* Soft background glows */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#00236f]/5 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-[#fe932c]/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative w-44 h-44 flex items-center justify-center my-2">
          {/* Animated ping wave */}
          <div
            className="absolute inset-0 rounded-full bg-[#00236f]/5 animate-ping opacity-75"
            style={{ animationDuration: '3s' }}
          ></div>
          <div className="absolute inset-3 rounded-full bg-[#eaedff]/60 animate-pulse"></div>

          {/* SVG Progress Circle */}
          <svg className="absolute inset-0 w-full h-full transform -rotate-90 pointer-events-none" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="#eaedff"
              strokeWidth="4"
            />
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="#00236f"
              strokeWidth="4"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-500 ease-out"
            />
          </svg>

          {/* Center Hub */}
          <div className="relative z-10 w-28 h-28 rounded-full bg-white shadow-sm border border-[#eaedff] flex flex-col items-center justify-center p-2 text-center">
            <div className="w-10 h-10 rounded-full bg-[#dce1ff] flex items-center justify-center mb-1 text-[#00236f]">
              <span className="material-symbols-outlined text-[22px]">policy</span>
            </div>
            <div className="flex items-baseline">
              <span className="font-['JetBrains_Mono'] text-lg font-bold text-[#00236f]">
                {percent}
              </span>
              <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#00236f]">%</span>
            </div>
            <span className="font-['JetBrains_Mono'] text-[9px] text-[#444651] uppercase tracking-wider font-semibold">
              {percent >= 100 ? 'COMPLETE' : 'SYNCHRONIZING'}
            </span>
          </div>
        </div>

        {/* Layer badge */}
        <div className="flex items-center gap-2 bg-[#eaedff] px-3.5 py-1.5 rounded-full mt-2 border border-[#dae2fd]">
          <span className="material-symbols-outlined text-[15px] text-[#00236f] animate-spin">
            cyclone
          </span>
          <span className="font-['JetBrains_Mono'] text-xs text-[#131b2e] font-medium">
            Layer 14 Tensor Decomposition
          </span>
        </div>
      </div>

      {/* Execution Pipeline */}
      <div className="bg-white rounded-xl p-4 shadow-xs border border-[#eaedff] flex flex-col gap-2.5">
        <div className="flex items-center justify-between pb-1 border-b border-[#eaedff]">
          <span className="font-['JetBrains_Mono'] text-xs text-[#131b2e] font-bold uppercase tracking-wider">
            Execution Pipeline
          </span>
          <span className="font-['JetBrains_Mono'] text-xs text-[#904d00] font-semibold">
            Stage {stage} of 7
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {/* Stage 1 */}
          <div className="flex items-center justify-between p-2 bg-[#f2f3ff] rounded-lg border border-[#eaedff]">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-5 h-5 rounded-full bg-[#004942] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-white text-[13px]">check</span>
              </div>
              <span className="text-xs text-[#131b2e] truncate font-medium">
                Resume parsed and normalized
              </span>
            </div>
            <span className="font-['JetBrains_Mono'] text-xs text-[#004942] font-semibold">100%</span>
          </div>

          {/* Stage 2 */}
          <div className="flex items-center justify-between p-2 bg-[#f2f3ff] rounded-lg border border-[#eaedff]">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-5 h-5 rounded-full bg-[#004942] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-white text-[13px]">check</span>
              </div>
              <span className="text-xs text-[#131b2e] truncate font-medium">
                Job description vectorized and weighted
              </span>
            </div>
            <span className="font-['JetBrains_Mono'] text-xs text-[#004942] font-semibold">100%</span>
          </div>

          {/* Stage 3 */}
          <div className="flex items-center justify-between p-2 bg-[#f2f3ff] rounded-lg border border-[#eaedff]">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-5 h-5 rounded-full bg-[#004942] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-white text-[13px]">check</span>
              </div>
              <span className="text-xs text-[#131b2e] truncate font-medium">
                Variants generated (Identical Embeddings)
              </span>
            </div>
            <span className="font-['JetBrains_Mono'] text-xs text-[#004942] font-semibold">3/3</span>
          </div>

          {/* Stage 4 */}
          <div className="flex items-center justify-between p-2 bg-[#f2f3ff] rounded-lg border border-[#eaedff]">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-5 h-5 rounded-full bg-[#004942] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-white text-[13px]">check</span>
              </div>
              <span className="text-xs text-[#131b2e] truncate font-medium">
                Model 1: ResumeMatch-Open (Monte-Carlo)
              </span>
            </div>
            <span className="font-['JetBrains_Mono'] text-xs text-[#004942] font-semibold">12 runs</span>
          </div>

          {/* Stage 5 */}
          <div
            className={`flex items-center justify-between p-2 rounded-lg border transition-all ${
              percent >= 85
                ? 'bg-[#f2f3ff] border-[#eaedff]'
                : 'bg-[#dce1ff]/50 border-[#b6c4ff]'
            }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                  percent >= 85 ? 'bg-[#004942] text-white' : 'bg-[#00236f] text-white animate-spin'
                }`}
              >
                <span className="material-symbols-outlined text-[13px]">
                  {percent >= 85 ? 'check' : 'progress_activity'}
                </span>
              </div>
              <span className="text-xs text-[#00236f] font-semibold truncate">
                Model 2: ScreenRank-Open cross-weights
              </span>
            </div>
            <span className="font-['JetBrains_Mono'] text-xs text-[#00236f] font-bold">
              {percent >= 85 ? '100%' : `${percent}%...`}
            </span>
          </div>

          {/* Stage 6 */}
          <div
            className={`flex items-center justify-between p-2 rounded-lg border transition-all ${
              percent >= 94
                ? 'bg-[#f2f3ff] border-[#eaedff]'
                : percent >= 85
                ? 'bg-[#dce1ff]/50 border-[#b6c4ff]'
                : 'bg-[#f2f3ff]/40 border-transparent opacity-60'
            }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-5 h-5 rounded-full bg-[#eaedff] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[#757682] text-[13px]">
                  {percent >= 94 ? 'check' : 'radio_button_unchecked'}
                </span>
              </div>
              <span className="text-xs text-[#444651] truncate">
                Cross-model gap & sensitivity distribution
              </span>
            </div>
            <span className="font-['JetBrains_Mono'] text-xs text-[#757682]">
              {percent >= 94 ? 'Calculated' : percent >= 85 ? 'Active' : 'Queued'}
            </span>
          </div>

          {/* Stage 7 */}
          <div
            className={`flex items-center justify-between p-2 rounded-lg border transition-all ${
              percent >= 100
                ? 'bg-[#f2f3ff] border-[#eaedff]'
                : 'bg-[#f2f3ff]/40 border-transparent opacity-60'
            }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-5 h-5 rounded-full bg-[#eaedff] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[#757682] text-[13px]">
                  {percent >= 100 ? 'check' : 'radio_button_unchecked'}
                </span>
              </div>
              <span className="text-xs text-[#444651] truncate">
                Identity-neutral structural suggestions
              </span>
            </div>
            <span className="font-['JetBrains_Mono'] text-xs text-[#757682]">
              {percent >= 100 ? 'Generated' : 'Queued'}
            </span>
          </div>
        </div>
      </div>

      {/* Telemetry Stream */}
      <div className="bg-[#283044] text-[#eef0ff] rounded-xl p-4 shadow-md flex flex-col gap-2 font-['JetBrains_Mono']">
        <div className="flex items-center justify-between pb-1 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#fe932c] text-[16px]">terminal</span>
            <span className="text-xs tracking-widest uppercase text-[#fe932c] font-semibold">
              Telemetry Stream
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#ba1a1a]"></span>
            <span className="w-2 h-2 rounded-full bg-[#fe932c]"></span>
            <span className="w-2 h-2 rounded-full bg-[#89f5e7]"></span>
          </div>
        </div>

        <div className="flex flex-col gap-1 text-[11px] leading-tight text-[#dae2fd]">
          <p className="truncate opacity-80">
            &gt; Parsing candidate latent tokens: [{candidateName}] vs [Emily Watson] vs [Michael Chen]...
          </p>
          <p className="truncate opacity-80">&gt; Baseline feature parity confirmed (Cosine Sim: 0.9984)...</p>
          <p className="truncate text-[#fe932c] font-semibold">
            &gt; Calibrating proxy bias vector along tenure markers...
          </p>
          <p className="text-[#90a8ff] truncate font-medium">
            {TELEMETRY_LOGS[liveLogIndex]}
          </p>
        </div>
      </div>

      {/* Info footer */}
      <div className="flex items-center gap-3 bg-[#f2f3ff] p-3 rounded-xl border border-[#eaedff]">
        <span className="material-symbols-outlined text-[#00236f] text-[20px] shrink-0">info</span>
        <p className="text-xs text-[#444651] leading-snug">
          Deterministic proxy audit in progress. Results will appear automatically in seconds.
        </p>
      </div>

      {/* Skip Button */}
      <div className="pt-1">
        <button
          onClick={handleSkip}
          className="w-full h-11 bg-[#00236f] text-white font-['JetBrains_Mono'] text-xs sm:text-sm font-semibold rounded-lg flex items-center justify-center gap-2 shadow-sm active:bg-[#1e3a8a] active:scale-[0.99] transition-all cursor-pointer hover:bg-[#1e3a8a]"
        >
          <span>Skip to Results (Demo Mode)</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};
