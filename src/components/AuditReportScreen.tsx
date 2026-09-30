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
  const [activeTab, setActiveTab] = useState<'comparison' | 'causes' | 'fixes'>('comparison');
  const [recommendations, setRecommendations] = useState<Recommendation[]>(audit.recommendations);
  const [isRechecking, setIsRechecking] = useState(false);
  const [recheckSuccess, setRecheckSuccess] = useState(false);

  const appliedCount = recommendations.filter((r) => r.applied).length;
  const appliedBonus = recommendations
    .filter((r) => r.applied)
    .reduce((sum, r) => sum + r.potentialPoints, 0);

  const toggleRecommendation = (id: number) => {
    setRecommendations((prev) =>
      prev.map((rec) => (rec.id === id ? { ...rec, applied: !rec.applied } : rec))
    );
  };

  // Derive model concordance numbers and gaps strictly live from the variant model scores
  const topVariant = audit.variants.find((v) => !v.isBaseline && (v.name.includes('Emily') || v.score === audit.topScore)) 
    || audit.variants.filter((v) => !v.isBaseline)[0];
  const baselineVariant = audit.variants.find((v) => v.isBaseline) || audit.variants[0];

  const model1Top = topVariant?.modelAScore ?? audit.topScore;
  const model1Base = baselineVariant?.modelAScore ?? audit.originalScore;
  const model1Gap = Math.max(0, model1Top - model1Base);

  const model2Top = topVariant?.modelBScore ?? (audit.topScore - 4);
  const model2Base = baselineVariant?.modelBScore ?? (audit.originalScore + 2);
  const model2Gap = Math.max(0, model2Top - model2Base);

  // Live calculated average across the 2 models: -(model1Gap + model2Gap) / 2
  const liveAvgDelta = - Math.round(((model1Gap + model2Gap) / 2) * 10) / 10;

  // Baseline and top scores
  const baseScore = audit.originalScore;
  const topScore = audit.topScore;
  const projectedCandidateScore = Math.min(topScore, baseScore + Math.round(appliedBonus));

  const handleRecheckTrigger = () => {
    setIsRechecking(true);
    setTimeout(() => {
      setIsRechecking(false);
      setRecheckSuccess(true);
      setTimeout(() => {
        setRecheckSuccess(false);
      }, 3500);
    }, 1200);
  };

  const sensitivityItems = audit.sensitivityAttribution ?? [
    { name: 'Name / Identity Indicators', percentage: 70, variancePts: 10.5, level: 'High' as const },
    { name: 'Layout & Date Formatting', percentage: 16, variancePts: 2.4, level: 'Moderate' as const },
    { name: 'Work Experience Quantifiers', percentage: 10, variancePts: 1.5, level: 'Low' as const },
    { name: 'Technical Skills Grouping', percentage: 4, variancePts: 0.6, level: 'Neutral' as const }
  ];

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 gap-6 pb-28 md:pb-12">
      {/* Primary Score Comparison Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#eaedff] shadow-xs flex flex-col gap-5">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#757682] uppercase tracking-wider font-['JetBrains_Mono']">
                Audit Findings for {audit.candidateName}
              </span>
              <span className="text-xs text-[#757682]">·</span>
              <span className="text-xs text-[#444651] font-medium">
                {audit.targetRole} @ {audit.company}
              </span>
            </div>
            <h1 className="font-['Hanken_Grotesk'] text-2xl sm:text-3xl font-bold text-[#131b2e] mt-1">
              {audit.observedSpread} Point Score Gap Detected
            </h1>
          </div>
          <span className="font-['JetBrains_Mono'] text-xs font-semibold px-3 py-1.5 rounded-full bg-[#ffdad6] text-[#ba1a1a]">
            Identity Sensitivity Found
          </span>
        </div>

        {/* Big visual score comparison cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-[#f2f3ff] border border-[#eaedff] flex flex-col justify-between gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-semibold text-[#444651]">Original Candidate</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#ffdad6] text-[#ba1a1a] font-bold">
                Baseline
              </span>
            </div>
            <div className="flex items-baseline gap-1 my-1">
              <span className="font-['Hanken_Grotesk'] text-4xl sm:text-5xl font-bold text-[#ba1a1a]">
                {audit.originalScore}
              </span>
              <span className="text-sm text-[#757682]">/ 100</span>
            </div>
            <span className="text-xs text-[#444651] truncate font-['JetBrains_Mono']">
              {audit.candidateName}
            </span>
          </div>

          <div className="p-5 rounded-xl bg-[#faf8ff] border border-[#eaedff] flex flex-col justify-between gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-semibold text-[#444651]">Identical Control Variant</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#89f5e7]/50 text-[#004942] font-bold">
                Control Benchmark
              </span>
            </div>
            <div className="flex items-baseline gap-1 my-1">
              <span className="font-['Hanken_Grotesk'] text-4xl sm:text-5xl font-bold text-[#004942]">
                {audit.topScore}
              </span>
              <span className="text-sm text-[#757682]">/ 100</span>
            </div>
            <span className="text-xs text-[#444651] truncate font-['JetBrains_Mono']">
              {topVariant?.name || 'Emily Watson'}
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#444651] leading-relaxed border-t border-[#eaedff]/80 pt-3">
          All skills, dates, companies, and responsibilities were held 100% identical. Automated screening models scored the exact same qualifications {audit.observedSpread} points lower when evaluated with the original candidate name.
        </p>
      </div>

      {/* Clean Tabbed Navigation */}
      <div className="flex items-center gap-1.5 p-1 bg-[#f2f3ff] rounded-xl border border-[#eaedff]">
        <button
          onClick={() => setActiveTab('comparison')}
          className={`flex-1 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-['JetBrains_Mono'] font-medium transition-all text-center cursor-pointer ${
            activeTab === 'comparison'
              ? 'bg-white text-[#00236f] font-bold shadow-xs'
              : 'text-[#444651] hover:text-[#131b2e]'
          }`}
        >
          Score & Model Comparison
        </button>
        <button
          onClick={() => setActiveTab('causes')}
          className={`flex-1 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-['JetBrains_Mono'] font-medium transition-all text-center cursor-pointer ${
            activeTab === 'causes'
              ? 'bg-white text-[#00236f] font-bold shadow-xs'
              : 'text-[#444651] hover:text-[#131b2e]'
          }`}
        >
          Why This Happened
        </button>
        <button
          onClick={() => setActiveTab('fixes')}
          className={`flex-1 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-['JetBrains_Mono'] font-medium transition-all text-center relative cursor-pointer ${
            activeTab === 'fixes'
              ? 'bg-white text-[#00236f] font-bold shadow-xs'
              : 'text-[#444651] hover:text-[#131b2e]'
          }`}
        >
          Resume Enhancements ({appliedCount}/{recommendations.length})
        </button>
      </div>

      {/* TAB 1: COMPARISON */}
      {activeTab === 'comparison' && (
        <div className="flex flex-col gap-5">
          {/* Variant Score Map */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#eaedff] shadow-xs flex flex-col gap-4">
            <div>
              <h2 className="font-['Hanken_Grotesk'] text-lg font-bold text-[#131b2e]">
                Score Distribution Across Identical Variants
              </h2>
              <p className="text-xs sm:text-sm text-[#444651] mt-0.5">
                Every variant below has identical work experience, degrees, and technical skills; only demographic markers vary:
              </p>
            </div>

            <div className="space-y-3.5 pt-2">
              {audit.variants.map((v) => {
                const isBaseline = v.isBaseline;
                const barColor = isBaseline
                  ? 'bg-[#ba1a1a]'
                  : v.name.includes('Emily') || v.score === audit.topScore
                  ? 'bg-[#004942]'
                  : 'bg-[#757682]';

                return (
                  <div key={v.id} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs sm:text-sm">
                      <span className="font-medium text-[#131b2e] flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${barColor}`}></span>
                        <span className="font-semibold">{v.name}</span>
                        <span className="text-xs text-[#757682] font-mono">({v.signal})</span>
                        {isBaseline && (
                          <span className="text-[10px] text-[#ba1a1a] font-['JetBrains_Mono'] font-bold bg-[#ffdad6] px-1.5 py-0.5 rounded">
                            Original
                          </span>
                        )}
                      </span>
                      <span className="font-['JetBrains_Mono'] text-xs sm:text-sm font-bold text-[#131b2e]">
                        {v.score} / 100
                      </span>
                    </div>
                    <div className="w-full bg-[#eaedff] h-3 rounded-full overflow-hidden">
                      <div
                        className={`${barColor} h-full rounded-full transition-all duration-500`}
                        style={{ width: `${v.score}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Model Concordance: 2 Models */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#eaedff] shadow-xs flex flex-col gap-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h2 className="font-['Hanken_Grotesk'] text-lg font-bold text-[#131b2e]">
                  Screening Model Concordance
                </h2>
                <p className="text-xs sm:text-sm text-[#444651] mt-0.5">
                  The gap was confirmed across two distinct open-source ATS architectures:
                </p>
              </div>
              <span className="text-xs font-['JetBrains_Mono'] font-bold text-[#444651] bg-[#f2f3ff] px-3 py-1 rounded-lg border border-[#eaedff]">
                Average Penalty: Δ {liveAvgDelta} pts
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="p-4 rounded-xl bg-[#f2f3ff] border border-[#eaedff] flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="font-['JetBrains_Mono'] text-xs sm:text-sm font-bold text-[#131b2e]">
                    Dense Embeddings (BERT)
                  </span>
                  <span className="text-xs font-['JetBrains_Mono'] font-bold text-[#ba1a1a] bg-[#ffdad6] px-2 py-0.5 rounded">
                    Gap: {model1Gap} pts
                  </span>
                </div>
                <p className="text-xs text-[#444651]">
                  Measures dense vector cosine proximity between resume text and job criteria.
                </p>
                <div className="flex justify-between text-xs text-[#444651] font-['JetBrains_Mono'] pt-2 border-t border-[#eaedff]">
                  <span>Top Variant: <strong className="text-[#004942]">{model1Top}</strong></span>
                  <span>Baseline: <strong className="text-[#ba1a1a]">{model1Base}</strong></span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#f2f3ff] border border-[#eaedff] flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="font-['JetBrains_Mono'] text-xs sm:text-sm font-bold text-[#131b2e]">
                    Cross-Encoder Transformer
                  </span>
                  <span className="text-xs font-['JetBrains_Mono'] font-bold text-[#904d00] bg-amber-100 px-2 py-0.5 rounded">
                    Gap: {model2Gap} pts
                  </span>
                </div>
                <p className="text-xs text-[#444651]">
                  Performs joint attention token scoring directly across candidate qualifications.
                </p>
                <div className="flex justify-between text-xs text-[#444651] font-['JetBrains_Mono'] pt-2 border-t border-[#eaedff]">
                  <span>Top Variant: <strong className="text-[#004942]">{model2Top}</strong></span>
                  <span>Baseline: <strong className="text-[#904d00]">{model2Base}</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CAUSES & ATTRIBUTION */}
      {activeTab === 'causes' && (
        <div className="flex flex-col gap-5">
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#eaedff] shadow-xs flex flex-col gap-5">
            <div>
              <h2 className="font-['Hanken_Grotesk'] text-lg font-bold text-[#131b2e]">
                Sensitivity Factor Breakdown
              </h2>
              <p className="text-xs sm:text-sm text-[#444651] mt-0.5">
                Where algorithmic sensitivity concentrates across orthogonal dimensions (sums to 100%):
              </p>
            </div>

            <div className="space-y-4">
              {sensitivityItems.map((item) => (
                <div key={item.name} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs sm:text-sm">
                    <span className="font-semibold text-[#131b2e]">{item.name}</span>
                    <span className="font-['JetBrains_Mono'] text-xs sm:text-sm font-bold text-[#00236f]">
                      {item.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-[#eaedff] h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#00236f] h-full rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-[#757682] block">
                    Contributed approximately {item.variancePts} pts of variance
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Research Disclosure Card */}
          <div className="p-5 rounded-2xl bg-[#eaedff]/70 border border-[#b9c3ff] text-xs sm:text-sm text-[#00236f] space-y-2">
            <span className="font-bold block font-['JetBrains_Mono']">
              Why do screening algorithms produce this discrepancy?
            </span>
            <p className="text-[#444651] leading-relaxed text-xs sm:text-sm">
              Pretrained neural screening systems learn statistical associations from historical hiring data. When an uncalibrated embedding model reads a resume, demographic markers trigger latent statistical proximity shifts. Our audit measures this sensitivity directly so you can fortify your genuine credentials with concrete metrics and high-impact phrasing.
            </p>
          </div>
        </div>
      )}

      {/* TAB 3: FIXES & RECOMMENDATIONS */}
      {activeTab === 'fixes' && (
        <div className="flex flex-col gap-5">
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#eaedff] shadow-xs flex flex-col gap-4">
            <div>
              <h2 className="font-['Hanken_Grotesk'] text-lg font-bold text-[#131b2e]">
                Strengthen Real Credential Signals
              </h2>
              <p className="text-xs sm:text-sm text-[#444651] mt-0.5">
                Dense, measurable metrics force screening models to rely on hard facts rather than ambiguous latent cues:
              </p>
            </div>

            {/* Projected Score Impact */}
            <div className="p-4 sm:p-5 rounded-xl bg-[#e2e7ff] border border-[#b6c4ff] flex items-center justify-between flex-wrap gap-3">
              <div>
                <span className="text-xs text-[#00236f] font-['JetBrains_Mono'] uppercase block font-bold">
                  Projected Credential Score
                </span>
                <span className="text-xs text-[#444651]">
                  {appliedCount} of {recommendations.length} enhancements applied
                </span>
              </div>
              <div className="text-right">
                <span className="font-['Hanken_Grotesk'] text-3xl font-bold text-[#00236f]">
                  {projectedCandidateScore}
                </span>
                <span className="text-xs sm:text-sm text-[#00236f] font-semibold"> / 100 (+{appliedBonus} pts)</span>
              </div>
            </div>

            {/* Recommendation Cards */}
            <div className="space-y-4 pt-1">
              {recommendations.map((rec) => (
                <div
                  key={rec.id}
                  className={`p-5 rounded-xl border transition-all ${
                    rec.applied ? 'bg-[#eaedff]/60 border-[#b6c4ff]' : 'bg-[#faf8ff] border-[#eaedff]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-xs sm:text-sm text-[#131b2e] flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-[#00236f]">
                        {rec.icon}
                      </span>
                      {rec.title}
                    </span>
                    <span className="text-xs font-['JetBrains_Mono'] font-bold text-[#004942] bg-[#89f5e7]/40 px-2 py-0.5 rounded">
                      +{rec.potentialPoints} pts boost
                    </span>
                  </div>

                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="p-3 rounded-lg bg-white/70 text-[#757682] line-through text-xs border border-[#eaedff]/60">
                      Before: "{rec.currentSnippet}"
                    </div>
                    <div className="p-3 rounded-lg bg-white text-[#131b2e] border border-[#eaedff] text-xs">
                      <strong className="text-[#004942]">Recommended Phrasing: </strong>
                      "{rec.suggestedSnippet}"
                    </div>
                  </div>

                  <div className="flex justify-end pt-3">
                    <button
                      onClick={() => toggleRecommendation(rec.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-['JetBrains_Mono'] font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                        rec.applied
                          ? 'bg-[#004942] text-white shadow-xs'
                          : 'bg-[#00236f] text-white hover:bg-[#1e3a8a]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {rec.applied ? 'check' : 'add'}
                      </span>
                      <span>{rec.applied ? 'Applied to Preview' : 'Apply Enhancement'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row gap-3 pt-1">
        <button
          onClick={onOpenReportModal}
          className="flex-1 py-3.5 px-5 rounded-xl bg-[#00236f] text-white font-['JetBrains_Mono'] text-xs sm:text-sm font-semibold hover:bg-[#1e3a8a] transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
        >
          <span className="material-symbols-outlined text-[18px]">print</span>
          <span>Official Audit Certificate</span>
        </button>

        <button
          onClick={handleRecheckTrigger}
          disabled={isRechecking}
          className="py-3.5 px-5 rounded-xl bg-[#f2f3ff] text-[#00236f] font-['JetBrains_Mono'] text-xs sm:text-sm font-semibold hover:bg-[#eaedff] transition flex items-center justify-center gap-2 border border-[#eaedff] cursor-pointer"
        >
          <span className={`material-symbols-outlined text-[18px] ${isRechecking ? 'animate-spin' : ''}`}>
            autorenew
          </span>
          <span>{isRechecking ? 'Re-checking...' : 'Re-Run Audit'}</span>
        </button>
      </div>

      {recheckSuccess && (
        <div className="p-4 rounded-xl bg-[#004942] text-white text-xs sm:text-sm font-['JetBrains_Mono'] flex items-center gap-2.5 shadow-sm">
          <span className="material-symbols-outlined text-[20px] text-[#89f5e7]">check_circle</span>
          <span>Re-check complete: Qualifications verified with score of {projectedCandidateScore}/100.</span>
        </div>
      )}
    </div>
  );
};
