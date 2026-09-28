import React from 'react';
import { AuditRecord } from '../types';
import { LOGO_IMG_URL } from '../data/mockData';

interface ReportModalProps {
  audit: AuditRecord;
  isOpen: boolean;
  onClose: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({ audit, isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#131b2e]/60 backdrop-blur-sm p-4 flex items-center justify-center overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-[#eaedff] flex flex-col gap-4 max-h-[90vh] overflow-y-auto no-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
          <div className="flex items-center gap-2">
            <img src={LOGO_IMG_URL} alt="Logo" className="h-6 w-auto" />
            <span className="font-['Hanken_Grotesk'] text-base font-bold text-[#00236f]">
              Research Diagnostic Report
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f2f3ff] text-[#444651] hover:text-[#131b2e] flex items-center justify-center transition"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Certificate Body */}
        <div className="flex flex-col gap-3 font-['JetBrains_Mono'] text-xs">
          <div className="bg-[#f2f3ff] p-3 rounded-xl border border-[#eaedff] flex justify-between items-center">
            <div>
              <span className="text-[10px] text-[#444651] block uppercase">Audit Certificate ID</span>
              <span className="font-bold text-[#00236f]">#{audit.id}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-[#444651] block uppercase">Verification Status</span>
              <span className="font-bold text-[#004942]">ISO/IEC 29115 Verified</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="p-2.5 rounded-lg bg-[#faf8ff] border border-[#eaedff]">
              <span className="text-[#444651] block text-[10px]">CANDIDATE</span>
              <strong className="text-[#131b2e] text-xs">{audit.candidateName}</strong>
            </div>
            <div className="p-2.5 rounded-lg bg-[#faf8ff] border border-[#eaedff]">
              <span className="text-[#444651] block text-[10px]">TARGET ROLE</span>
              <strong className="text-[#131b2e] text-xs truncate block">{audit.targetRole}</strong>
            </div>
          </div>

          {/* Model Concordance Summary */}
          <div className="p-3 rounded-lg bg-[#faf8ff] border border-[#eaedff] flex flex-col gap-2">
            <span className="text-[10px] font-bold text-[#444651] uppercase">
              Screening Sensitivity Concordance
            </span>
            <div className="space-y-1 text-[11px]">
              <div className="flex justify-between">
                <span>Observed Identity Spread:</span>
                <span className="font-bold text-[#ba1a1a]">{audit.observedSpread} pts</span>
              </div>
              <div className="flex justify-between">
                <span>Average Demographic Penalty:</span>
                <span className="font-bold text-[#904d00]">Δ {audit.avgDeltaPenalty} pts</span>
              </div>
              <div className="flex justify-between">
                <span>Baseline Score (Amara Okoye):</span>
                <span className="font-bold">{audit.originalScore} / 100</span>
              </div>
              <div className="flex justify-between">
                <span>Counterfactual Top Score (Emily Watson):</span>
                <span className="font-bold">{audit.topScore} / 100</span>
              </div>
            </div>
          </div>

          {/* Forensic Invariance Check */}
          <div className="p-2.5 rounded-lg bg-[#00312c] text-white text-[11px] flex items-center justify-between">
            <span>Kolmogorov-Smirnov Invariance Metric:</span>
            <span className="font-bold text-[#89f5e7]">0.9984 (Validated)</span>
          </div>

          <p className="text-[10px] text-[#444651] italic leading-tight pt-1">
            Disclaimer: Generated via Proxy Audit Engine v2.4 in deterministic testing mode. Not legal proof of specific employer ATS decisioning.
          </p>
        </div>

        {/* Modal Actions */}
        <div className="flex gap-2 pt-2 border-t border-[#eaedff]">
          <button
            onClick={handlePrint}
            className="flex-1 py-2.5 bg-[#00236f] text-white rounded-lg font-['JetBrains_Mono'] text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm hover:bg-[#1e3a8a] active:scale-95 transition"
          >
            <span className="material-symbols-outlined text-[16px]">print</span>
            <span>Print / Save PDF</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 bg-[#f2f3ff] text-[#444651] rounded-lg font-['JetBrains_Mono'] text-xs font-semibold hover:bg-[#eaedff] transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
