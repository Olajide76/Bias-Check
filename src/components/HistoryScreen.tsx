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

  const filteredAudits = audits.filter(
    (a) =>
      a.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.targetRole.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-4 py-4 gap-4 pb-24">
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
          className="px-3 py-1.5 rounded-lg bg-[#00236f] text-white font-['JetBrains_Mono'] text-xs font-semibold flex items-center gap-1 hover:bg-[#1e3a8a] active:scale-95 transition"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          <span>New</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative">
        <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#757682] text-[18px]">
          search
        </span>
        <input
          type="text"
          placeholder="Filter audits by candidate or target role..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white border border-[#eaedff] rounded-xl pl-9 pr-4 py-2 text-xs text-[#131b2e] focus:outline-none focus:border-[#00236f] font-['JetBrains_Mono']"
        />
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
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#904d00]"></span>
                <span className="font-['Hanken_Grotesk'] text-base font-bold text-[#131b2e] group-hover:text-[#00236f] transition-colors">
                  {item.candidateName}
                </span>
                <span className="font-['JetBrains_Mono'] text-[10px] px-2 py-0.5 rounded bg-[#f2f3ff] text-[#444651] font-semibold border border-[#eaedff]">
                  #{item.id}
                </span>
              </div>
              <span className="font-['JetBrains_Mono'] text-[11px] text-[#444651]">
                {item.date}
              </span>
            </div>

            <div className="text-xs text-[#444651] flex items-center gap-1.5">
              <span className="font-medium text-[#131b2e]">{item.targetRole}</span>
              <span>·</span>
              <span>{item.company}</span>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-1 border-t border-[#eaedff]/60 font-['JetBrains_Mono'] text-xs">
              <div className="bg-[#f2f3ff] p-2 rounded-lg text-center">
                <span className="text-[10px] text-[#444651] block uppercase">Variance Spread</span>
                <span className="font-bold text-[#ba1a1a]">{item.observedSpread} pts</span>
              </div>
              <div className="bg-[#f2f3ff] p-2 rounded-lg text-center">
                <span className="text-[10px] text-[#444651] block uppercase">Delta Penalty</span>
                <span className="font-bold text-[#904d00]">Δ {item.avgDeltaPenalty}</span>
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
            No matching audits found. Start a new audit above.
          </div>
        )}
      </div>
    </div>
  );
};
