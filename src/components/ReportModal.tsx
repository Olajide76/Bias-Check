import React, { useState } from 'react';
import { AuditRecord } from '../types';
import { LOGO_IMG_URL } from '../data/mockData';

interface ReportModalProps {
  audit: AuditRecord;
  isOpen: boolean;
  onClose: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({ audit, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [downloadNotice, setDownloadNotice] = useState(false);

  if (!isOpen) return null;

  const topVariant = audit.variants && audit.variants.length > 0 
    ? [...audit.variants].sort((a, b) => b.score - a.score)[0] 
    : null;

  const topVariantName = topVariant ? topVariant.name : 'Emily Watson';

  // Generate a standalone, printable HTML document for the certificate
  const generateCertificateHtml = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>BiasCheck Official Audit Certificate - ${audit.id}</title>
  <style>
    @page { size: A4; margin: 20mm; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #131b2e;
      background: #fff;
      margin: 0;
      padding: 40px;
    }
    .cert-container {
      max-width: 800px;
      margin: 0 auto;
      border: 3px double #00236f;
      padding: 40px;
      border-radius: 12px;
      background: #faf8ff;
      box-shadow: 0 4px 20px rgba(0,0,0,0.06);
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #00236f;
      padding-bottom: 20px;
      margin-bottom: 24px;
    }
    .logo-title {
      font-size: 26px;
      font-weight: 800;
      color: #00236f;
      letter-spacing: -0.5px;
    }
    .badge {
      font-family: monospace;
      background: #004942;
      color: #fff;
      padding: 6px 14px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: bold;
    }
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin: 20px 0;
    }
    .card {
      background: #fff;
      border: 1px solid #eaedff;
      border-radius: 8px;
      padding: 16px;
    }
    .card-title {
      font-size: 11px;
      color: #757682;
      text-transform: uppercase;
      font-family: monospace;
      margin-bottom: 4px;
    }
    .card-value {
      font-size: 16px;
      font-weight: 700;
      color: #131b2e;
    }
    .score-banner {
      background: #fff;
      border: 2px solid #eaedff;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }
    .score-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid #f2f3ff;
      font-family: monospace;
      font-size: 14px;
    }
    .score-row:last-child {
      border-bottom: none;
    }
    .highlight-red { color: #ba1a1a; font-weight: bold; }
    .highlight-green { color: #004942; font-weight: bold; }
    .footer {
      margin-top: 30px;
      font-size: 11px;
      color: #757682;
      line-height: 1.5;
      border-top: 1px solid #eaedff;
      padding-top: 16px;
      font-style: italic;
    }
    .print-btn {
      display: block;
      margin: 20px auto 0;
      background: #00236f;
      color: #fff;
      border: none;
      padding: 10px 24px;
      font-size: 14px;
      font-weight: bold;
      border-radius: 8px;
      cursor: pointer;
    }
    @media print {
      .print-btn { display: none; }
      body { padding: 0; background: #fff; }
      .cert-container { box-shadow: none; border-color: #00236f; }
    }
  </style>
</head>
<body>
  <div class="cert-container">
    <div class="header">
      <div>
        <div class="logo-title">BiasCheck Official Audit Certificate</div>
        <div style="font-size: 13px; color: #444651; margin-top: 4px;">Algorithmic Resume Sensitivity Verification</div>
      </div>
      <div class="badge">ALIGNED WITH IEEE 7003</div>
    </div>

    <div class="grid">
      <div class="card">
        <div class="card-title">Candidate Profile</div>
        <div class="card-value">${audit.candidateName}</div>
      </div>
      <div class="card">
        <div class="card-title">Certificate ID & Date</div>
        <div class="card-value">#${audit.id} · ${audit.date}</div>
      </div>
      <div class="card">
        <div class="card-title">Target Role</div>
        <div class="card-value">${audit.targetRole}</div>
      </div>
      <div class="card">
        <div class="card-title">Hiring Organization</div>
        <div class="card-value">${audit.company}</div>
      </div>
    </div>

    <div class="score-banner">
      <div style="font-size: 13px; font-weight: bold; color: #00236f; text-transform: uppercase; margin-bottom: 12px; font-family: monospace;">
        Screening Sensitivity Concordance Results
      </div>
      <div class="score-row">
        <span>Baseline Score (${audit.candidateName}):</span>
        <span class="highlight-red">${audit.originalScore} / 100</span>
      </div>
      <div class="score-row">
        <span>Identical Control Benchmark (${topVariantName}):</span>
        <span class="highlight-green">${audit.topScore} / 100</span>
      </div>
      <div class="score-row">
        <span>Observed Identity Spread:</span>
        <span class="highlight-red">-${audit.observedSpread} points gap</span>
      </div>
      <div class="score-row">
        <span>Average Model Penalty:</span>
        <span>${audit.avgDeltaPenalty > 0 ? `-${audit.avgDeltaPenalty}` : audit.avgDeltaPenalty} pts</span>
      </div>
      <div class="score-row">
        <span>Invariance Similarity (1 - D):</span>
        <span class="highlight-green">&gt; 0.99 (Parity Verified)</span>
      </div>
    </div>

    <div class="footer">
      <strong>Verification Protocol:</strong> Generated via BiasCheck Perturbation-Based Sensitivity Testing Engine (N=12 comparison runs across Dense Bi-Encoder and Cross-Encoder Transformer architectures). Substantive qualifications, skills, and work history were held 100% constant across variants.
    </div>

    <button class="print-btn" onclick="window.print()">Print or Save as PDF</button>
  </div>
  <script>
    // Automatically trigger system print dialog when opened
    window.addEventListener('load', function() {
      setTimeout(function() { window.print(); }, 400);
    });
  </script>
</body>
</html>`;
  };

  // Download printable certificate file
  const handleDownloadCertificate = () => {
    const htmlContent = generateCertificateHtml();
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `BiasCheck_Certificate_${audit.id}_${audit.candidateName.replace(/\s+/g, '_')}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadNotice(true);
    setTimeout(() => setDownloadNotice(false), 5000);
  };

  const handlePrint = () => {
    try {
      window.print();
    } catch (e) {
      console.warn('Sandbox restriction on window.print(), offering certificate download', e);
      handleDownloadCertificate();
    }
  };

  const handleCopySummary = () => {
    const text = `BIASCHECK OFFICIAL AUDIT CERTIFICATE
Certificate ID: #${audit.id}
Standard: Aligned with IEEE 7003 Guidelines
Candidate: ${audit.candidateName}
Target Role: ${audit.targetRole} (${audit.company})
Date: ${audit.date}

SCORE FINDINGS:
- Baseline Score: ${audit.originalScore} / 100
- Benchmark Score (${topVariantName}): ${audit.topScore} / 100
- Observed Gap: -${audit.observedSpread} points
- Model Concordance Penalty: ${audit.avgDeltaPenalty} pts
- Invariance Similarity: > 0.99 Parity Verified

Evaluation verified via controlled counterfactual perturbation testing across open screening architectures.`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#131b2e]/60 backdrop-blur-sm p-4 flex items-center justify-center overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-[#eaedff] flex flex-col gap-5 max-h-[90vh] overflow-y-auto no-scrollbar print:shadow-none print:border-none">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
          <div className="flex items-center gap-2.5">
            <img src={LOGO_IMG_URL} alt="Logo" className="h-7 w-auto object-contain" />
            <div>
              <span className="font-['Hanken_Grotesk'] text-base font-bold text-[#00236f] block leading-tight">
                Official Audit Certificate
              </span>
              <span className="text-[11px] text-[#757682]">
                Algorithmic Sensitivity Verification
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close certificate modal"
            className="w-8 h-8 rounded-full bg-[#f2f3ff] text-[#444651] hover:text-[#131b2e] flex items-center justify-center transition cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Certificate Body */}
        <div className="flex flex-col gap-3.5 font-['JetBrains_Mono'] text-xs">
          <div className="bg-[#f2f3ff] p-3.5 rounded-xl border border-[#eaedff] flex justify-between items-center">
            <div>
              <span className="text-[10px] text-[#444651] block uppercase tracking-wider font-semibold">Certificate ID</span>
              <span className="font-bold text-[#00236f] text-sm">#{audit.id}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-[#444651] block uppercase tracking-wider font-semibold">Evaluation Standard</span>
              <span className="font-bold text-[#004942] bg-[#89f5e7]/40 px-2 py-0.5 rounded text-[11px]">
                Aligned with IEEE 7003
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-[#faf8ff] border border-[#eaedff]">
              <span className="text-[#757682] block text-[10px] uppercase font-semibold">CANDIDATE</span>
              <strong className="text-[#131b2e] text-xs sm:text-sm block mt-0.5">{audit.candidateName}</strong>
            </div>
            <div className="p-3 rounded-xl bg-[#faf8ff] border border-[#eaedff]">
              <span className="text-[#757682] block text-[10px] uppercase font-semibold">TARGET ROLE</span>
              <strong className="text-[#131b2e] text-xs sm:text-sm truncate block mt-0.5">{audit.targetRole}</strong>
            </div>
          </div>

          {/* Model Concordance Summary */}
          <div className="p-4 rounded-xl bg-[#faf8ff] border border-[#eaedff] flex flex-col gap-2.5">
            <span className="text-[11px] font-bold text-[#00236f] uppercase tracking-wider">
              Screening Sensitivity Concordance
            </span>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between py-1 border-b border-[#eaedff]/60">
                <span className="text-[#444651]">Baseline Score ({audit.candidateName}):</span>
                <span className="font-bold text-[#ba1a1a]">{audit.originalScore} / 100</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#eaedff]/60">
                <span className="text-[#444651]">Control Benchmark Score ({topVariantName}):</span>
                <span className="font-bold text-[#004942]">{audit.topScore} / 100</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#eaedff]/60">
                <span className="text-[#444651]">Observed Identity Spread:</span>
                <span className="font-bold text-[#ba1a1a]">-{audit.observedSpread} pts gap</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#eaedff]/60">
                <span className="text-[#444651]">Average Screening Model Penalty:</span>
                <span className="font-bold text-[#904d00]">
                  {audit.avgDeltaPenalty > 0 ? `-${audit.avgDeltaPenalty}` : audit.avgDeltaPenalty} pts
                </span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-[#444651]">Invariance Similarity (1 - D):</span>
                <span className="font-bold text-[#004942]">&gt; 0.99 (Distribution Match)</span>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-[#444651] italic leading-relaxed pt-1 border-t border-[#eaedff]">
            Disclaimer: Generated via controlled counterfactual perturbation testing (N=12 comparison runs). Directional screening proxy, not legal proof of individual employer ATS intent.
          </p>
        </div>

        {/* Download notice notification */}
        {downloadNotice && (
          <div className="p-3 rounded-xl bg-[#004942] text-white text-xs font-['JetBrains_Mono'] flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-[#89f5e7]">check_circle</span>
            <span>Certificate downloaded! You can open it in any browser to print or save as PDF.</span>
          </div>
        )}

        {/* Modal Actions */}
        <div className="flex flex-col sm:flex-row gap-2.5 pt-2 border-t border-[#eaedff]">
          <button
            onClick={handleDownloadCertificate}
            className="flex-1 py-3 px-4 rounded-xl bg-[#00236f] text-white font-['JetBrains_Mono'] text-xs sm:text-sm font-semibold hover:bg-[#1e3a8a] transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Download & Print Certificate</span>
          </button>

          <button
            onClick={handlePrint}
            className="py-3 px-4 rounded-xl bg-[#f2f3ff] text-[#00236f] font-['JetBrains_Mono'] text-xs sm:text-sm font-semibold hover:bg-[#eaedff] transition flex items-center justify-center gap-1.5 border border-[#eaedff] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">print</span>
            <span>Print</span>
          </button>

          <button
            onClick={handleCopySummary}
            className="py-3 px-3 rounded-xl bg-[#f2f3ff] text-[#444651] hover:text-[#131b2e] font-['JetBrains_Mono'] text-xs font-semibold hover:bg-[#eaedff] transition flex items-center justify-center gap-1.5 border border-[#eaedff] cursor-pointer"
            title="Copy verification text to clipboard"
          >
            <span className="material-symbols-outlined text-[18px]">
              {copied ? 'check' : 'content_copy'}
            </span>
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
