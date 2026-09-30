import React from 'react';

export const MethodologyScreen: React.FC = () => {
  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 gap-6 pb-28 md:pb-12">
      <div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#00236f] text-[24px]">science</span>
          <h1 className="font-['Hanken_Grotesk'] text-2xl font-bold text-[#131b2e] tracking-tight">
            Scientific Protocol & Methodology
          </h1>
        </div>
        <p className="text-xs text-[#444651] mt-0.5">
          Empirical specification of the BiasCheck Perturbation-Based Sensitivity Testing Protocol
        </p>
      </div>

      {/* Scope & Honesty Notice */}
      <div className="p-3.5 bg-[#eaedff]/80 border border-[#b9c3ff] rounded-xl flex items-start gap-2.5 text-xs text-[#00236f]">
        <span className="material-symbols-outlined text-[18px] text-[#00236f] shrink-0 mt-0.5">
          policy
        </span>
        <div className="space-y-1">
          <p className="font-semibold font-['JetBrains_Mono'] text-[11px] uppercase tracking-wider">
            Proxy ≠ Proof & Sample Size Disclosure
          </p>
          <p className="text-[#444651] leading-relaxed text-[11px]">
            This tool performs <strong>Perturbation-Based Sensitivity Testing</strong> using <span className="font-mono font-medium">N=12</span> comparison evaluations across 2 open-source screening architectures (dense bi-encoder and cross-encoder). It is designed as an accessible pre-submission diagnostic, not a universal proof of an employer’s private weights.
          </p>
        </div>
      </div>

      {/* Principle 1 */}
      <div className="bg-white rounded-xl p-4 shadow-xs border border-[#eaedff] flex flex-col gap-2.5">
        <div className="flex items-center gap-2">
          <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#00236f] bg-[#eaedff] px-2 py-0.5 rounded">
            SECTION 01
          </span>
          <h2 className="font-['Hanken_Grotesk'] text-base font-bold text-[#131b2e]">
            Perturbation-Based Sensitivity Testing
          </h2>
        </div>
        <p className="text-xs text-[#444651] leading-relaxed">
          BiasCheck evaluates candidate resilience using controlled input perturbations. Given a canonical resume document <span className="font-mono">R</span> containing substantive qualifications <span className="font-mono">Q</span> and candidate name token <span className="font-mono">I</span>, we generate synthetic controlled tuples:
        </p>
        <div className="p-3 bg-[#f2f3ff] rounded-lg font-['JetBrains_Mono'] text-xs text-[#131b2e] border border-[#eaedff]">
          R* = f_perturb(R, I → I*) &nbsp;such that&nbsp; Q(R*) ≡ Q(R)
        </div>
        <p className="text-xs text-[#444651] leading-relaxed">
          By holding all educational institutions, graduation years, employment dates, responsibilities, quantitative metrics, and technical skills 100% constant, any scoring variance across iterations isolates the screening model's latent demographic sensitivity.
        </p>
      </div>

      {/* Principle 2 */}
      <div className="bg-white rounded-xl p-4 shadow-xs border border-[#eaedff] flex flex-col gap-2.5">
        <div className="flex items-center gap-2">
          <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#00236f] bg-[#eaedff] px-2 py-0.5 rounded">
            SECTION 02
          </span>
          <h2 className="font-['Hanken_Grotesk'] text-base font-bold text-[#131b2e]">
            Structural Invariance Verification
          </h2>
        </div>
        <p className="text-xs text-[#444651] leading-relaxed">
          Before scoring, synthetic variants undergo distribution testing to verify that semantic tokenizers and structured resume parsers do not distort layout tree depth or token counts. We track an <strong>Invariance Similarity Score (1 - D)</strong> where values near 1 confirm structural equivalence:
        </p>
        <div className="grid grid-cols-2 gap-2 text-center font-['JetBrains_Mono'] text-xs">
          <div className="p-2.5 bg-[#f2f3ff] rounded-lg border border-[#eaedff]">
            <span className="text-[10px] text-[#444651] block uppercase">Semantic Parity</span>
            <span className="font-bold text-[#004942]">High (&gt; 0.99)</span>
          </div>
          <div className="p-2.5 bg-[#f2f3ff] rounded-lg border border-[#eaedff]">
            <span className="text-[10px] text-[#444651] block uppercase">Content Parity</span>
            <span className="font-bold text-[#004942]">0 Token Shift</span>
          </div>
        </div>
        <p className="text-[11px] text-[#757682]">
          Note: In statistical hypothesis testing, a raw Kolmogorov-Smirnov D-statistic near 0 indicates identical distributions. To prevent user confusion, we display the inverted Similarity metric (1 - D).
        </p>
      </div>

      {/* Principle 3 */}
      <div className="bg-white rounded-xl p-4 shadow-xs border border-[#eaedff] flex flex-col gap-2.5">
        <div className="flex items-center gap-2">
          <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#00236f] bg-[#eaedff] px-2 py-0.5 rounded">
            SECTION 03
          </span>
          <h2 className="font-['Hanken_Grotesk'] text-base font-bold text-[#131b2e]">
            Proxy Architectures & Latent Embedding Drift
          </h2>
        </div>
        <p className="text-xs text-[#444651] leading-relaxed">
          Because commercial enterprise ATS algorithms rarely publish internal weights, BiasCheck benchmarks against the two dominant open architectures used in applicant screening:
        </p>
        <div className="space-y-2 text-xs">
          <div className="p-2.5 rounded-lg bg-[#f2f3ff] border border-[#eaedff]">
            <strong className="text-[#131b2e] block font-['JetBrains_Mono'] text-xs mb-0.5">
              1. ResumeMatch-Open (Dense Embedding Bi-Encoder)
            </strong>
            <p className="text-[#444651]">
              Encodes candidates and job descriptions into high-dimensional vector space. Our methodology explicitly acknowledges that public bi-encoders are prone to latent demographic proximity biases inherited from web training corpora. This disclosure connects directly to our &quot;Proxy ≠ Proof&quot; framing.
            </p>
          </div>
          <div className="p-2.5 rounded-lg bg-[#f2f3ff] border border-[#eaedff]">
            <strong className="text-[#131b2e] block font-['JetBrains_Mono'] text-xs mb-0.5">
              2. ScreenRank-Open (Cross-Encoder Transformer)
            </strong>
            <p className="text-[#444651]">
              Reads candidate and job tokens simultaneously through full self-attention layers. Simulates enterprise ranking filters with higher sensitivity to token ordering and credential positioning.
            </p>
          </div>
        </div>
      </div>

      {/* Principle 4 - FAQ & Defense Q&A */}
      <div className="bg-white rounded-xl p-4 shadow-xs border border-[#eaedff] flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#00236f] bg-[#eaedff] px-2 py-0.5 rounded">
            SECTION 04
          </span>
          <h2 className="font-['Hanken_Grotesk'] text-base font-bold text-[#131b2e]">
            Methodological Defense & FAQ
          </h2>
        </div>

        <div className="space-y-2 text-xs">
          <div className="p-3 rounded-lg bg-[#f2f3ff] border border-[#eaedff]">
            <p className="font-semibold text-[#00236f] mb-1 font-['JetBrains_Mono'] text-[11px]">
              Q: Isn&apos;t demographic-marker tagging the same inference you accuse ATS models of doing?
            </p>
            <p className="text-[#444651] leading-relaxed">
              <strong>A:</strong> Yes, deliberately — the critical difference is ours is completely transparent, displayed directly to the candidate as a controlled test input, rather than hidden inside proprietary scoring weights used to filter them out unfavorably.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-[#f2f3ff] border border-[#eaedff]">
            <p className="font-semibold text-[#00236f] mb-1 font-['JetBrains_Mono'] text-[11px]">
              Q: How do you know the gap is from ethnicity and not gender?
            </p>
            <p className="text-[#444651] leading-relaxed">
              <strong>A:</strong> Because variants like Emily and Michael alter both regional and gender associations simultaneously, we do not claim to cleanly isolate every sub-variable across all three names. Clean gender isolation is specifically evaluated via intra-cohort pairs (e.g., Amara vs. Kwame: same regional background, contrasting gender).
            </p>
          </div>

          <div className="p-3 rounded-lg bg-[#f2f3ff] border border-[#eaedff]">
            <p className="font-semibold text-[#00236f] mb-1 font-['JetBrains_Mono'] text-[11px]">
              Q: Why do keyword suggestions improve ATS score without shrinking the name gap?
            </p>
            <p className="text-[#444651] leading-relaxed">
              <strong>A:</strong> Resume suggestions densify qualifications and improve general ATS keyword saturation. Because identity tokens remain invariant by design, the post-check correctly shows an elevated baseline score while preserving realistic diagnostic disclosure of systemic model gap.
            </p>
          </div>
        </div>
      </div>

      {/* Ethical Non-Deception Charter */}
      <div className="p-3.5 bg-[#00312c] text-white rounded-xl flex items-start gap-3">
        <span className="material-symbols-outlined text-[#89f5e7] text-[20px] shrink-0 mt-0.5">
          gavel
        </span>
        <div className="text-xs space-y-1">
          <p className="font-semibold text-[#89f5e7] font-['JetBrains_Mono'] text-[11px] uppercase tracking-wider">
            Ethical Audit Principle
          </p>
          <p className="leading-relaxed text-slate-200">
            <strong>Never fake identity on a real submission</strong> — identity variants exist strictly within controlled, clearly marked test audits. We empower candidates by diagnosing automated screening vulnerabilities and optimizing legitimate qualifications, never through deceptive application practices.
          </p>
        </div>
      </div>
    </div>
  );
};
