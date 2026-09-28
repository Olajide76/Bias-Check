import React, { useState } from 'react';
import { AuditRecord, Recommendation } from '../types';

interface AuditReportScreenProps {
  audit: AuditRecord;
  onOpenReportModal: () => void;
  onRecheck: () => void;
}

export const AuditReportScreen: React.FC<AuditReportScreenProps> = ({
  audit,
  onOpenReportModal,
  onRecheck
}) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>(audit.recommendations);
  const [isRechecking, setIsRechecking] = useState(false);
  const [recheckSuccess, setRecheckSuccess] = useState(false);

  const appliedCount = recommendations.filter((r) => r.applied).length;

  const toggleRecommendation = (id: number) => {
    setRecommendations((prev) =>
      prev.map((rec) => (rec.id === id ? { ...rec, applied: !rec.applied } : rec))
    );
  };

  const getProjectedStats = () => {
    if (appliedCount === 0) {
      return { gap: '15 pts', scoreText: 'Original 71 vs 86', original: 71, target: 86 };
    } else if (appliedCount === 1) {
      return { gap: '11 pts', scoreText: 'Projected 75 vs 86', original: 75, target: 86 };
    } else if (appliedCount === 2) {
      return { gap: '8 pts', scoreText: 'Projected 79 vs 87', original: 79, target: 87 };
    } else {
      return { gap: '6 pts', scoreText: 'Projected 82 vs 88', original: 82, target: 88 };
    }
  };

  const projected = getProjectedStats();

  const handleRecheckTrigger = () => {
    setIsRechecking(true);
    setTimeout(() => {
      setIsRechecking(false);
      setRecheckSuccess(true);
      setTimeout(() => {
        setRecheckSuccess(false);
      }, 3500);
    }, 1400);
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-4 py-4 gap-4 pb-24">
      {/* Primary Alert / Result Card */}
      <div className="bg-white rounded-xl shadow-xs border border-[#eaedff] p-4 flex flex-col gap-3 relative overflow-hidden">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffdcc3] text-[#2f1500] border border-[#ffb77d]/50">
            <span className="material-symbols-outlined text-[16px] text-[#904d00]">warning</span>
            <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider font-bold">
              Identity-Signal Sensitivity Detected
            </span>
          </div>
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-[#e2e7ff] text-[#444651]">
            <span className="material-symbols-outlined text-[14px]">science</span>
            <span className="font-['JetBrains_Mono'] text-[11px] font-medium">
              Confidence: {audit.confidence}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5 mt-1">
          <div className="bg-[#f2f3ff] p-3 rounded-lg flex flex-col border border-[#eaedff]">
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#444651] uppercase font-medium">
              Observed Spread
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-['Hanken_Grotesk'] text-2xl font-bold text-[#131b2e]">
                {audit.observedSpread}
              </span>
              <span className="font-['JetBrains_Mono'] text-xs text-[#ba1a1a] font-semibold">
                pts variance
              </span>
            </div>
            <span className="text-xs text-[#444651] mt-0.5">
              Range: {audit.originalScore} — {audit.topScore} / 100
            </span>
          </div>

          <div className="bg-[#f2f3ff] p-3 rounded-lg flex flex-col border border-[#eaedff]">
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#444651] uppercase font-medium">
              Avg Delta Penalty
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-['Hanken_Grotesk'] text-2xl font-bold text-[#904d00]">
                Δ {audit.avgDeltaPenalty}
              </span>
              <span className="font-['JetBrains_Mono'] text-xs text-[#444651]">pts</span>
            </div>
            <span className="text-xs text-[#444651] mt-0.5">Across 2 Screening LLMs</span>
          </div>
        </div>

        <div className="bg-[#eaedff] p-3 rounded-lg flex items-start gap-2 border border-[#dae2fd]">
          <span className="material-symbols-outlined text-[#757682] text-[18px] shrink-0 mt-0.5">
            verified_user
          </span>
          <p className="text-xs text-[#444651] leading-relaxed">
            <strong className="text-[#131b2e] font-semibold">Research Scope:</strong> The observed
            gap persisted over 12 iterations across 2 open screening models. This diagnostic audits
            proxy algorithmic sensitivity and does not constitute formal legal proof of employer
            bias.
          </p>
        </div>
      </div>

      {/* Variance Breakdown Bar Chart */}
      <div className="bg-white rounded-xl shadow-xs border border-[#eaedff] p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00236f] text-[20px]">equalizer</span>
            <span className="font-['Hanken_Grotesk'] text-base font-bold text-[#131b2e]">
              Score Variance Map
            </span>
          </div>
          <span className="font-['JetBrains_Mono'] text-[11px] px-2 py-0.5 rounded bg-[#eaedff] text-[#444651] font-semibold">
            Benchmark Target: 85+
          </span>
        </div>

        <p className="text-xs text-[#444651] leading-relaxed">
          Synthetic perturbation holding credentials, metrics, and dates strictly identical, modulating only candidate token indicators.
        </p>

        <div className="space-y-3 pt-1">
          {/* Variant A */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-[#131b2e] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#004942]"></span>
                Variant A{' '}
                <span className="text-[#444651] font-['JetBrains_Mono'] text-[11px] font-normal">
                  (Emily Watson)
                </span>
              </span>
              <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#131b2e]">
                86 / 100
              </span>
            </div>
            <div className="w-full bg-[#eaedff] h-3 rounded-full overflow-hidden flex">
              <div
                className="bg-[#004942] h-full rounded-full transition-all duration-700"
                style={{ width: '86%' }}
              ></div>
            </div>
          </div>

          {/* Variant B */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-[#131b2e] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#757682]"></span>
                Variant B{' '}
                <span className="text-[#444651] font-['JetBrains_Mono'] text-[11px] font-normal">
                  (Michael Chen)
                </span>
              </span>
              <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#131b2e]">
                79 / 100
              </span>
            </div>
            <div className="w-full bg-[#eaedff] h-3 rounded-full overflow-hidden flex">
              <div
                className="bg-[#757682] h-full rounded-full transition-all duration-700"
                style={{ width: '79%' }}
              ></div>
            </div>
          </div>

          {/* Original Baseline */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-[#ba1a1a] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#ba1a1a]"></span>
                Original Baseline{' '}
                <span className="text-[#444651] font-['JetBrains_Mono'] text-[11px] font-normal">
                  (Amara Okoye)
                </span>
              </span>
              <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#ba1a1a]">
                71 / 100
              </span>
            </div>
            <div className="w-full bg-[#eaedff] h-3 rounded-full overflow-hidden flex">
              <div
                className="bg-[#ba1a1a] h-full rounded-full transition-all duration-700"
                style={{ width: '71%' }}
              ></div>
            </div>
          </div>
        </div>

        {/* Spread note */}
        <div className="flex items-center justify-between font-['JetBrains_Mono'] text-xs px-3 py-2 bg-[#f2f3ff] rounded-lg mt-1 border border-[#eaedff]">
          <span className="text-[#444651]">Inter-variant Spread:</span>
          <span className="font-bold text-[#904d00]">Δ -15 Pts (Highest vs Original)</span>
        </div>
      </div>

      {/* Model Concordance */}
      <div className="bg-white rounded-xl shadow-xs border border-[#eaedff] p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00236f] text-[20px]">dataset</span>
            <span className="font-['Hanken_Grotesk'] text-base font-bold text-[#131b2e]">
              Model Concordance
            </span>
          </div>
          <span className="font-['JetBrains_Mono'] text-[11px] text-[#00312c] font-semibold bg-[#89f5e7] px-2 py-0.5 rounded">
            Replicated
          </span>
        </div>

        <div className="space-y-2">
          {/* Model 1 */}
          <div className="bg-[#f2f3ff] p-3 rounded-lg flex flex-col gap-1 border border-[#eaedff]">
            <div className="flex justify-between items-center">
              <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#131b2e]">
                ResumeMatch-Open v3.1
              </span>
              <span className="font-['JetBrains_Mono'] text-[10px] px-2 py-0.5 rounded bg-[#ffdad6] text-[#ba1a1a] font-bold">
                Gap: 15 pts
              </span>
            </div>
            <div className="flex items-center justify-between font-['JetBrains_Mono'] text-xs text-[#444651] mt-0.5">
              <span>
                Emily: <strong className="text-[#131b2e]">86</strong>
              </span>
              <span>
                Michael: <strong className="text-[#131b2e]">79</strong>
              </span>
              <span>
                Amara: <strong className="text-[#ba1a1a]">71</strong>
              </span>
            </div>
          </div>

          {/* Model 2 */}
          <div className="bg-[#f2f3ff] p-3 rounded-lg flex flex-col gap-1 border border-[#eaedff]">
            <div className="flex justify-between items-center">
              <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#131b2e]">
                ScreenRank-Open v1.8
              </span>
              <span className="font-['JetBrains_Mono'] text-[10px] px-2 py-0.5 rounded bg-[#ffdcc3] text-[#904d00] font-bold">
                Gap: 9 pts
              </span>
            </div>
            <div className="flex items-center justify-between font-['JetBrains_Mono'] text-xs text-[#444651] mt-0.5">
              <span>
                Emily: <strong className="text-[#131b2e]">82</strong>
              </span>
              <span>
                Michael: <strong className="text-[#131b2e]">78</strong>
              </span>
              <span>
                Amara: <strong className="text-[#ba1a1a]">73</strong>
              </span>
            </div>
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-[#eaedff] flex items-center gap-2 border border-[#dae2fd]">
          <span className="material-symbols-outlined text-[#00236f] text-[18px] shrink-0">schema</span>
          <span className="text-xs text-[#131b2e] leading-tight font-medium">
            Consistent directional penalty detected across distinct screening architectures.
          </span>
        </div>
      </div>

      {/* Feature Sensitivity Attribution */}
      <div className="bg-white rounded-xl shadow-xs border border-[#eaedff] p-4 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#00236f] text-[20px]">tune</span>
          <span className="font-['Hanken_Grotesk'] text-base font-bold text-[#131b2e]">
            Feature Sensitivity Attribution
          </span>
        </div>
        <p className="text-xs text-[#444651]">
          Relative impact score derived from token-level perturbation analysis.
        </p>

        <div className="space-y-3 pt-1">
          {/* Feature 1 */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-[#131b2e]">Name / Identity Token Markers</span>
              <span className="font-['JetBrains_Mono'] text-[11px] font-bold text-[#ba1a1a] bg-[#ffdad6] px-2 py-0.5 rounded">
                High (82%)
              </span>
            </div>
            <div className="w-full bg-[#eaedff] h-2 rounded-full overflow-hidden">
              <div className="bg-[#ba1a1a] h-full rounded-full" style={{ width: '82%' }}></div>
            </div>
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#444651]">
              Weight attribution: +11.2 score variance
            </span>
          </div>

          {/* Feature 2 */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-[#131b2e]">Layout Parsing & Date Formatting</span>
              <span className="font-['JetBrains_Mono'] text-[11px] font-semibold text-[#904d00] bg-[#ffdcc3] px-2 py-0.5 rounded">
                Low (18%)
              </span>
            </div>
            <div className="w-full bg-[#eaedff] h-2 rounded-full overflow-hidden">
              <div className="bg-[#904d00] h-full rounded-full" style={{ width: '18%' }}></div>
            </div>
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#444651]">
              Weight attribution: +2.8 score variance
            </span>
          </div>

          {/* Feature 3 */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-[#131b2e]">Work Experience Quantifiers</span>
              <span className="font-['JetBrains_Mono'] text-[11px] font-medium text-[#757682] bg-[#eaedff] px-2 py-0.5 rounded">
                Marginal (12%)
              </span>
            </div>
            <div className="w-full bg-[#eaedff] h-2 rounded-full overflow-hidden">
              <div className="bg-[#757682] h-full rounded-full" style={{ width: '12%' }}></div>
            </div>
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#444651]">
              Weight attribution: +1.6 score variance
            </span>
          </div>

          {/* Feature 4 */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-[#131b2e]">Technical Skills Taxonomy</span>
              <span className="font-['JetBrains_Mono'] text-[11px] font-medium text-[#004942] bg-[#89f5e7] px-2 py-0.5 rounded">
                Neutral (4%)
              </span>
            </div>
            <div className="w-full bg-[#eaedff] h-2 rounded-full overflow-hidden">
              <div className="bg-[#004942] h-full rounded-full" style={{ width: '4%' }}></div>
            </div>
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#444651]">
              Weight attribution: 0.4 score variance
            </span>
          </div>
        </div>
      </div>

      {/* Actionable Recommendations */}
      <div className="bg-white rounded-xl shadow-xs border border-[#eaedff] p-4 flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00236f] text-[20px]">auto_fix_high</span>
            <span className="font-['Hanken_Grotesk'] text-base font-bold text-[#131b2e]">
              Strengthen Credential Signals
            </span>
          </div>
          <p className="text-xs text-[#444651]">
            Improve resume machine readability and metric density without altering personal identifiers.
          </p>
        </div>

        <div className="space-y-3">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className={`p-3 rounded-xl border transition-all ${
                rec.applied
                  ? 'bg-[#eaedff]/60 border-[#b6c4ff]'
                  : 'bg-[#f2f3ff] border-[#eaedff]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#131b2e] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#00236f]">
                    {rec.icon}
                  </span>
                  {rec.title}
                </span>
                <span className="font-['JetBrains_Mono'] text-[11px] text-[#004942] font-semibold bg-[#89f5e7] px-1.5 py-0.5 rounded">
                  +{rec.potentialPoints} Pts Potential
                </span>
              </div>

              <div className="space-y-1.5 text-xs mt-2">
                <div className="p-2 rounded bg-[#eaedff] text-[#444651] line-through opacity-80 font-['JetBrains_Mono'] text-[11px]">
                  Current: "{rec.currentSnippet}"
                </div>
                <div className="p-2 rounded bg-white text-[#131b2e] border border-[#eaedff]">
                  <span className="text-[#004942] font-bold">Suggested: </span>
                  "{rec.suggestedSnippet}"
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => toggleRecommendation(rec.id)}
                  className={`px-3 py-1.5 rounded-lg font-['JetBrains_Mono'] text-xs font-semibold active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer ${
                    rec.applied
                      ? 'bg-[#004942] text-white shadow-xs'
                      : 'bg-[#00236f] text-white hover:bg-[#1e3a8a]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {rec.applied ? 'done_all' : 'check_circle'}
                  </span>
                  <span>{rec.applied ? 'Applied' : 'Apply Suggestion'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Simulate Post-Optimization Module */}
      <div className="bg-white rounded-xl shadow-xs border border-[#eaedff] p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="font-['Hanken_Grotesk'] text-base font-bold text-[#131b2e]">
            Simulate Post-Optimization
          </span>
          <span className="font-['JetBrains_Mono'] text-xs text-[#444651] font-semibold">
            {appliedCount} of {recommendations.length} Applied
          </span>
        </div>

        {/* Before vs Projected After */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="p-3 rounded-lg bg-[#f2f3ff] border border-[#eaedff] flex flex-col">
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#444651] uppercase font-medium">
              Initial Baseline Gap
            </span>
            <div className="font-['Hanken_Grotesk'] text-2xl font-bold text-[#ba1a1a] mt-0.5">
              15 pts
            </div>
            <span className="text-xs text-[#444651] mt-0.5">Original 71 vs 86</span>
          </div>

          <div className="p-3 rounded-lg bg-[#89f5e7]/30 border border-[#89f5e7] flex flex-col">
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#005049] uppercase font-bold">
              Projected Post-Check
            </span>
            <div className="font-['Hanken_Grotesk'] text-2xl font-bold text-[#00312c] mt-0.5">
              {projected.gap}
            </div>
            <span className="text-xs text-[#005049] mt-0.5 font-medium">
              {projected.scoreText}
            </span>
          </div>
        </div>

        {/* Re-Check Banner if simulated */}
        {recheckSuccess && (
          <div className="p-3 rounded-lg bg-[#004942] text-white flex items-center gap-2 text-xs font-['JetBrains_Mono'] animate-fadeIn">
            <span className="material-symbols-outlined text-[18px] text-[#89f5e7]">check_circle</span>
            <span>Audit Re-Check Complete! Projected gap reduced to {projected.gap}.</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-2 pt-1">
          <button
            onClick={handleRecheckTrigger}
            disabled={isRechecking}
            className="w-full h-11 bg-[#00236f] text-white rounded-lg font-['JetBrains_Mono'] text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 active:bg-[#1e3a8a] transition-all shadow-sm hover:bg-[#1e3a8a] cursor-pointer disabled:opacity-75"
          >
            <span
              className={`material-symbols-outlined text-[20px] ${
                isRechecking ? 'animate-spin' : ''
              }`}
            >
              autorenew
            </span>
            <span>
              {isRechecking ? 'Simulating Reseeded Run...' : 'Run Audit Again (Re-Check)'}
            </span>
          </button>

          <button
            onClick={onOpenReportModal}
            className="w-full h-10 bg-[#eaedff] text-[#131b2e] rounded-lg font-['JetBrains_Mono'] text-xs font-semibold flex items-center justify-center gap-2 hover:bg-[#dae2fd] transition cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Download Research PDF Report</span>
          </button>
        </div>

        <div className="p-3 bg-[#f2f3ff] rounded-lg text-center border border-[#eaedff]">
          <p className="text-xs text-[#131b2e] font-medium italic">
            "You can't audit the employer's black box. But you can audit the signals before you enter it."
          </p>
        </div>
      </div>
    </div>
  );
};
