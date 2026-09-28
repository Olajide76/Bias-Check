import React, { useState } from 'react';
import { LOGO_IMG_URL } from '../data/mockData';

export const AboutScreen: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Does BiasCheck hack or access internal ATS systems?',
      a: 'No. BiasCheck is a client-side and open proxy evaluation lab. It does not tamper with or connect to employer databases. Instead, it tests resumes against open-source neural screening models that mirror modern production ATS matchers.'
    },
    {
      q: 'Why do automated screening models show name-origin sensitivity?',
      a: 'Pretrained neural language models often reflect statistical correlations in historical hiring data. When an LLM evaluates a resume, demographic markers like names or affinity organizations can trigger subtle associative shifts in latent attention weights, leading to divergent screening scores.'
    },
    {
      q: 'Is my uploaded resume stored or used to train models?',
      a: 'Never. BiasCheck runs with zero persistent telemetry and strict ephemeral in-memory processing. Resumes are parsed locally in your session and discarded when you close the tab or clear your session.'
    },
    {
      q: 'What should I do if a large variance is detected?',
      a: 'Use the "Strengthen Credential Signals" module. Rather than altering your name or identity, front-load hard metrics, quantify impact with exact numbers, and standardize skill taxonomy. Dense objective signals reduce algorithmic reliance on ambiguous latent tokens.'
    }
  ];

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-4 py-4 gap-4 pb-24">
      {/* Brand Hero */}
      <div className="bg-white rounded-xl p-5 shadow-xs border border-[#eaedff] flex flex-col items-center text-center gap-3">
        <img src={LOGO_IMG_URL} alt="BiasCheck Logo" className="h-12 w-auto object-contain" />
        <h1 className="font-['Hanken_Grotesk'] text-2xl font-bold text-[#00236f]">
          BiasCheck Research Initiative
        </h1>
        <p className="text-xs sm:text-sm text-[#444651] max-w-md leading-relaxed">
          Leveling the playing field by granting candidates pre-submission insight into automated resume screening sensitivity.
        </p>
        <div className="flex gap-2 flex-wrap justify-center pt-1 font-['JetBrains_Mono'] text-xs">
          <span className="px-2.5 py-1 rounded bg-[#f2f3ff] text-[#00236f] font-semibold border border-[#eaedff]">
            Engine v2.4 (Calibrated)
          </span>
          <span className="px-2.5 py-1 rounded bg-[#00312c] text-[#89f5e7] font-semibold">
            ISO/IEC 29115
          </span>
        </div>
      </div>

      {/* Core Principles */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="bg-white p-3.5 rounded-xl border border-[#eaedff] flex flex-col gap-1">
          <div className="w-8 h-8 rounded-lg bg-[#eaedff] text-[#00236f] flex items-center justify-center mb-1">
            <span className="material-symbols-outlined text-[18px]">lock</span>
          </div>
          <span className="font-['Hanken_Grotesk'] text-sm font-bold text-[#131b2e]">
            100% Confidential
          </span>
          <p className="text-[11px] text-[#444651] leading-snug">
            Ephemeral processing. No resume corpus ingestion or telemetry tracking.
          </p>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-[#eaedff] flex flex-col gap-1">
          <div className="w-8 h-8 rounded-lg bg-[#ffdcc3] text-[#904d00] flex items-center justify-center mb-1">
            <span className="material-symbols-outlined text-[18px]">balance</span>
          </div>
          <span className="font-['Hanken_Grotesk'] text-sm font-bold text-[#131b2e]">
            Audit, Don't Fake
          </span>
          <p className="text-[11px] text-[#444651] leading-snug">
            Counterfactual testing strictly for diagnostic calibration, not deceptive submissions.
          </p>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="bg-white rounded-xl p-4 shadow-xs border border-[#eaedff] flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#00236f] text-[20px]">help</span>
          <h2 className="font-['Hanken_Grotesk'] text-base font-bold text-[#131b2e]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="flex flex-col gap-2">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-[#eaedff] rounded-lg overflow-hidden bg-[#faf8ff]"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full p-3 text-left flex items-center justify-between font-['JetBrains_Mono'] text-xs font-semibold text-[#131b2e] hover:bg-[#f2f3ff] transition-colors"
              >
                <span>{faq.q}</span>
                <span
                  className={`material-symbols-outlined text-[18px] text-[#757682] transition-transform ${
                    openFaq === index ? 'rotate-180' : ''
                  }`}
                >
                  expand_more
                </span>
              </button>
              {openFaq === index && (
                <div className="px-3 pb-3 text-xs text-[#444651] leading-relaxed border-t border-[#eaedff] pt-2">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
