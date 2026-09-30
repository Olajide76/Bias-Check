import React, { useState } from 'react';
import { AuditRecord } from '../types';

interface HistoryScreenProps {
  audits: AuditRecord[];
  onSelectAudit: (audit: AuditRecord) => void;
  onNewAudit: () => void;
}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({
  audits,
  onSelectAudit,
  onNewAudit
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'user' | 'sample'>('all');

  const filteredAudits = audits.filter((a) => {
    const matchesSearch =
      a.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.targetRole.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.company.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;
    if (activeFilter === 'user') return !a.isSampleBenchmark;
    if (activeFilter === 'sample') return a.isSampleBenchmark;
    return true;
  });

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 gap-5 pb-28 md:pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-['Hanken_Grotesk'] text-2xl font-bold text-[#131b2e] tracking-tight">
            Audit Archive
          </h1>
          <p className="text-xs text-[#444651]">
            Deterministic sensitivity evaluations across benchmark cohorts
          </p>
        </div>
        <button
          onClick={onNewAudit}
          className="px-3 py-1.5 rounded-lg bg-[#00236f] text-white font-['JetBrains_Mono'] text-xs font-semibold flex items-center gap-1 hover:bg-[#1e3a8a] active:scale-95 transition shadow-xs"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          <span>New Audit</span>
        </button>
      </div>

      {/* Demo / Sample Data Notice (Tier 2 Checklist requirement) */}
      <div className="p-3 bg-[#eaedff]/70 border border-[#b9c3ff] rounded-xl flex items-start gap-2.5 text-xs text-[#00236f]">
        <span className="material-symbols-outlined text-[16px] text-[#00236f] shrink-0 mt-0.5">
          info
        </span>
        <div className="space-y-0.5">
          <p className="font-semibold text-[11px] font-['JetBrains_Mono'] uppercase tracking-wider">
            Evaluation Data Transparency
          </p>
          <p className="text-[11px] text-[#444651] leading-relaxed">
            Standard reference profiles are explicitly labeled as <span className="font-semibold text-amber-900 bg-amber-100 px-1 py-0.5 rounded font-mono text-[10px]">SAMPLE DATA</span> for baseline calibration. Live candidate tests run in this session are labeled <span className="font-semibold text-emerald-900 bg-emerald-100 px-1 py-0.5 rounded font-mono text-[10px]">LIVE RUN</span>.
          </p>
        </div>
      </div>

      {/* Search Input & Filter Tabs */}
      <div className="flex flex-col gap-2">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#757682] text-[18px]">
            search
          </span>
          <input
            type="text"
            placeholder="Filter audits by candidate, role, or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-[#eaedff] rounded-xl pl-9 pr-4 py-2 text-xs text-[#131b2e] focus:outline-none focus:border-[#00236f] font-['JetBrains_Mono']"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-[#f2f3ff] rounded-lg border border-[#eaedff] text-[11px] font-['JetBrains_Mono']">
          <button
            onClick={() => setActiveFilter('all')}
            className={`flex-1 py-1 rounded-md text-center transition-all ${
              activeFilter === 'all'
                ? 'bg-white text-[#00236f] font-bold shadow-xs'
                : 'text-[#444651] hover:text-[#131b2e]'
            }`}
          >
            All Audits ({audits.length})
          </button>
          <button
            onClick={() => setActiveFilter('user')}
            className={`flex-1 py-1 rounded-md text-center transition-all ${
              activeFilter === 'user'
                ? 'bg-white text-emerald-900 font-bold shadow-xs'
                : 'text-[#444651] hover:text-[#131b2e]'
            }`}
          >
            Live Runs ({audits.filter(a => !a.isSampleBenchmark).length})
          </button>
          <button
            onClick={() => setActiveFilter('sample')}
            className={`flex-1 py-1 rounded-md text-center transition-all ${
              activeFilter === 'sample'
                ? 'bg-white text-amber-900 font-bold shadow-xs'
                : 'text-[#444651] hover:text-[#131b2e]'
            }`}
          >
            Sample Data ({audits.filter(a => a.isSampleBenchmark).length})
          </button>
        </div>
      </div>

      {/* Audits List */}
      <div className="flex flex-col gap-3">
        {filteredAudits.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectAudit(item)}
            className="bg-white rounded-xl p-4 shadow-xs border border-[#eaedff] hover:border-[#00236f] transition-all cursor-pointer flex flex-col gap-2.5 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="w-2.5 h-2.5 rounded-full bg-[#904d00]"></span>
                <span className="font-['Hanken_Grotesk'] text-base font-bold text-[#131b2e] group-hover:text-[#00236f] transition-colors">
                  {item.candidateName}
                </span>
                <span className="font-['JetBrains_Mono'] text-[10px] px-2 py-0.5 rounded bg-[#f2f3ff] text-[#444651] font-semibold border border-[#eaedff]">
                  #{item.id}
                </span>
                {item.isSampleBenchmark ? (
                  <span className="font-['JetBrains_Mono'] text-[9px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200">
                    SAMPLE DATA
                  </span>
                ) : (
                  <span className="font-['JetBrains_Mono'] text-[9px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                    LIVE RUN
                  </span>
                )}
              </div>
              <span className="font-['JetBrains_Mono'] text-[11px] text-[#444651]">
                {item.date}
              </span>
            </div>

            <div className="text-xs text-[#444651] flex items-center gap-1.5 flex-wrap">
              <span className="font-medium text-[#131b2e]">{item.targetRole}</span>
              <span>·</span>
              <span className="font-medium text-[#00236f]">{item.company}</span>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-1 border-t border-[#eaedff]/60 font-['JetBrains_Mono'] text-xs">
              <div className="bg-[#f2f3ff] p-2 rounded-lg text-center">
                <span className="text-[10px] text-[#444651] block uppercase">Variance Spread</span>
                <span className="font-bold text-[#ba1a1a]">{item.observedSpread} pts</span>
              </div>
              <div className="bg-[#f2f3ff] p-2 rounded-lg text-center">
                <span className="text-[10px] text-[#444651] block uppercase">Avg Penalty</span>
                <span className="font-bold text-[#904d00]">
                  {item.avgDeltaPenalty > 0 ? `-${item.avgDeltaPenalty}` : item.avgDeltaPenalty} pts
                </span>
              </div>
              <div className="bg-[#f2f3ff] p-2 rounded-lg text-center">
                <span className="text-[10px] text-[#444651] block uppercase">Score Range</span>
                <span className="font-bold text-[#131b2e]">
                  {item.originalScore}–{item.topScore}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-[#004942] font-['JetBrains_Mono'] font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">verified</span>
                <span>{item.confidence}</span>
              </span>
              <span className="font-['JetBrains_Mono'] text-xs text-[#00236f] font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>View Full Diagnostic</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </span>
            </div>
          </div>
        ))}

        {filteredAudits.length === 0 && (
          <div className="p-8 text-center bg-white rounded-xl border border-[#eaedff] text-xs text-[#444651]">
            No matching audits found. Start a new audit above or switch filter.
          </div>
        )}
      </div>
    </div>
  );
};
