import React from 'react';

export const MethodologyScreen: React.FC = () => {
  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-4 py-4 gap-4 pb-24">
      <div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#00236f] text-[24px]">science</span>
          <h1 className="font-['Hanken_Grotesk'] text-2xl font-bold text-[#131b2e] tracking-tight">
            Scientific Protocol & Methodology
          </h1>
        </div>
        <p className="text-xs text-[#444651] mt-0.5">
          Empirical specification of the BiasCheck Counterfactual Perturbation Engine v2.4
        </p>
      </div>

      {/* Principle 1 */}
      <div className="bg-white rounded-xl p-4 shadow-xs border border-[#eaedff] flex flex-col gap-2.5">
        <div className="flex items-center gap-2">
          <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#00236f] bg-[#eaedff] px-2 py-0.5 rounded">
            SECTION 01
          </span>
          <h2 className="font-['Hanken_Grotesk'] text-base font-bold text-[#131b2e]">
            Causal Pairwise Perturbation
          </h2>
        </div>
        <p className="text-xs text-[#444651] leading-relaxed">
          BiasCheck operates under the formal definition of <em>Counterfactual Fairness</em>. Given a canonical resume document $R$ containing substantive qualifications $Q$ and identity tokens $I$, we generate synthetic counterfactual tuples:
        </p>
        <div className="p-3 bg-[#f2f3ff] rounded-lg font-['JetBrains_Mono'] text-xs text-[#131b2e] border border-[#eaedff]">
          R* = f_perturb(R, I → I*) such that Q(R*) ≡ Q(R)
        </div>
        <p className="text-xs text-[#444651] leading-relaxed">
          By holding all educational institutions, GPA, employment dates, responsibilities, quantitative achievements, and technical keywords 100% constant, any statistically significant variance in scoring output across iterations is mathematically attributable strictly to the isolated identity vector.
        </p>
      </div>

      {/* Principle 2 */}
      <div className="bg-white rounded-xl p-4 shadow-xs border border-[#eaedff] flex flex-col gap-2.5">
        <div className="flex items-center gap-2">
          <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#00236f] bg-[#eaedff] px-2 py-0.5 rounded">
            SECTION 02
          </span>
          <h2 className="font-['Hanken_Grotesk'] text-base font-bold text-[#131b2e]">
            Invariance Verification (K-S Metric: 0.998)
          </h2>
        </div>
        <p className="text-xs text-[#444651] leading-relaxed">
          Before scoring, synthetic variants undergo two-sample Kolmogorov-Smirnov distribution testing to ensure that semantic parsers (AST and structural tokenizers) do not distort layout tree depth or token frequency. Our threshold requires:
        </p>
        <div className="grid grid-cols-2 gap-2 text-center font-['JetBrains_Mono'] text-xs">
          <div className="p-2 bg-[#f2f3ff] rounded-lg border border-[#eaedff]">
            <span className="text-[10px] text-[#444651] block uppercase">Cosine Sim parity</span>
            <span className="font-bold text-[#004942]">&gt; 0.9980</span>
          </div>
          <div className="p-2 bg-[#f2f3ff] rounded-lg border border-[#eaedff]">
            <span className="text-[10px] text-[#444651] block uppercase">Length Invariance</span>
            <span className="font-bold text-[#004942]">Δ Tokens = 0</span>
          </div>
        </div>
      </div>

      {/* Principle 3 */}
      <div className="bg-white rounded-xl p-4 shadow-xs border border-[#eaedff] flex flex-col gap-2.5">
        <div className="flex items-center gap-2">
          <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#00236f] bg-[#eaedff] px-2 py-0.5 rounded">
            SECTION 03
          </span>
          <h2 className="font-['Hanken_Grotesk'] text-base font-bold text-[#131b2e]">
            Screening Proxy Architectures
          </h2>
        </div>
        <p className="text-xs text-[#444651] leading-relaxed">
          Because enterprise ATS algorithms (Workday, Taleo, Greenhouse, Eightfold) do not publish internal weights, BiasCheck benchmarks against the two dominant open architectures utilized in automated applicant matching:
        </p>
        <div className="space-y-2 text-xs">
          <div className="p-2.5 rounded-lg bg-[#f2f3ff] border border-[#eaedff]">
            <strong className="text-[#131b2e] block font-['JetBrains_Mono'] text-xs mb-0.5">
              1. ResumeMatch-Open (BERT / SBERT Dense Embedding)
            </strong>
            <p className="text-[#444651]">
              Encodes candidates and job descriptions into high-dimensional vector space and calculates cosine similarity. Prone to associative latent demographic proximity biases.
            </p>
          </div>
          <div className="p-2.5 rounded-lg bg-[#f2f3ff] border border-[#eaedff]">
            <strong className="text-[#131b2e] block font-['JetBrains_Mono'] text-xs mb-0.5">
              2. ScreenRank-Open (Cross-Encoder Transformer)
            </strong>
            <p className="text-[#444651]">
              Simultaneously reads candidate and job tokens through full self-attention layers. Provides realistic ranking simulation but exhibits higher sensitivity to token positioning.
            </p>
          </div>
        </div>
      </div>

      {/* Principle 4 */}
      <div className="bg-white rounded-xl p-4 shadow-xs border border-[#eaedff] flex flex-col gap-2.5">
        <div className="flex items-center gap-2">
          <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#00236f] bg-[#eaedff] px-2 py-0.5 rounded">
            SECTION 04
          </span>
          <h2 className="font-['Hanken_Grotesk'] text-base font-bold text-[#131b2e]">
            Ethical Non-Deception Charter
          </h2>
        </div>
        <div className="p-3 bg-[#00312c] text-white rounded-lg flex items-start gap-3">
          <span className="material-symbols-outlined text-[#89f5e7] text-[20px] shrink-0 mt-0.5">
            gavel
          </span>
          <p className="text-xs leading-relaxed">
            <strong>Candidate Sovereignty:</strong> BiasCheck exists strictly to provide candidates with pre-submission visibility. We unequivocally condemn using synthetic names on real job submissions. Our recommendations focus exclusively on credential densification, objective metric quantification, and taxonomy standardization.
          </p>
        </div>
      </div>
    </div>
  );
};
