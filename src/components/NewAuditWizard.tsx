import React, { useState } from 'react';
import { CounterfactualVariant, ExtractedFeatures, JobTarget } from '../types';
import {
  DEFAULT_EXTRACTED_FEATURES,
  DEFAULT_JOB_TARGET,
  DEFAULT_VARIANTS
} from '../data/mockData';

interface NewAuditWizardProps {
  onRunAudit: (config: {
    features: ExtractedFeatures;
    jobTarget: JobTarget;
    variants: CounterfactualVariant[];
  }) => void;
}

export const NewAuditWizard: React.FC<NewAuditWizardProps> = ({ onRunAudit }) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [fileFormat, setFileFormat] = useState<'PDF' | 'DOCX' | 'TXT'>('PDF');
  const [resumeFileName, setResumeFileName] = useState('Amara_Okoye_Senior_SWE_Resume.pdf');
  const [features, setFeatures] = useState<ExtractedFeatures>(DEFAULT_EXTRACTED_FEATURES);
  const [jobTarget, setJobTarget] = useState<JobTarget>(DEFAULT_JOB_TARGET);
  const [variants, setVariants] = useState<CounterfactualVariant[]>(DEFAULT_VARIANTS);
  const [ethicsAccepted, setEthicsAccepted] = useState(false);
  const [isExtractionExpanded, setIsExtractionExpanded] = useState(true);
  const [isCustomUploadModalOpen, setIsCustomUploadModalOpen] = useState(false);
  const [customNameInput, setCustomNameInput] = useState('');
  const [customSignalInput, setCustomSignalInput] = useState('');

  const toggleVariant = (id: string) => {
    setVariants((prev) =>
      prev.map((v) => (v.id === id && !v.isBaseline ? { ...v, active: !v.active } : v))
    );
  };

  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFileName(file.name);
      // derive name or keep features
      const baseName = file.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' ');
      setFeatures((prev) => ({
        ...prev,
        name: baseName.includes(' ') ? baseName : 'Candidate Profile'
      }));
    }
  };

  const activeVariantsCount = variants.filter((v) => v.active && !v.isBaseline).length;

  return (
    <div className="flex flex-col w-full pb-24 max-w-xl mx-auto">
      {/* Protocol Pipeline Step Ribbon */}
      <div className="px-4 py-3 bg-[#f2f3ff] border-b border-[#eaedff] flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <span className="font-['JetBrains_Mono'] text-[11px] text-[#444651] uppercase tracking-wider font-semibold">
            Protocol Pipeline
          </span>
          <span className="font-['JetBrains_Mono'] text-xs text-[#00236f] font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#fe932c]"></span>
            <span>Step {currentStep} of 3</span>
          </span>
        </div>

        {/* 3 Step Progress Bars */}
        <div className="grid grid-cols-3 gap-1.5">
          <div
            className={`h-1.5 rounded-full transition-all duration-300 ${
              currentStep >= 1 ? 'bg-[#00236f]' : 'bg-[#dae2fd]'
            }`}
          ></div>
          <div
            className={`h-1.5 rounded-full transition-all duration-300 ${
              currentStep >= 2 ? 'bg-[#00236f]' : 'bg-[#dae2fd]'
            }`}
          ></div>
          <div
            className={`h-1.5 rounded-full transition-all duration-300 ${
              currentStep >= 3 ? 'bg-[#00236f]' : 'bg-[#dae2fd]'
            }`}
          ></div>
        </div>

        {/* Step Buttons */}
        <div className="flex justify-between items-center text-center pt-0.5">
          <button
            onClick={() => setCurrentStep(1)}
            className="flex items-center gap-1.5 focus:outline-none"
          >
            <span
              className={`w-5 h-5 rounded-full font-['JetBrains_Mono'] text-[11px] flex items-center justify-center font-bold transition-all ${
                currentStep === 1
                  ? 'bg-[#00236f] text-white shadow-xs'
                  : currentStep > 1
                  ? 'bg-[#004942] text-white'
                  : 'bg-[#dae2fd] text-[#444651]'
              }`}
            >
              1
            </span>
            <span
              className={`font-['JetBrains_Mono'] text-xs ${
                currentStep === 1 ? 'text-[#00236f] font-bold' : 'text-[#444651]'
              }`}
            >
              Resume
            </span>
          </button>

          <button
            onClick={() => setCurrentStep(2)}
            className="flex items-center gap-1.5 focus:outline-none"
          >
            <span
              className={`w-5 h-5 rounded-full font-['JetBrains_Mono'] text-[11px] flex items-center justify-center font-bold transition-all ${
                currentStep === 2
                  ? 'bg-[#00236f] text-white shadow-xs'
                  : currentStep > 2
                  ? 'bg-[#004942] text-white'
                  : 'bg-[#dae2fd] text-[#444651]'
              }`}
            >
              2
            </span>
            <span
              className={`font-['JetBrains_Mono'] text-xs ${
                currentStep === 2 ? 'text-[#00236f] font-bold' : 'text-[#444651]'
              }`}
            >
              Job Match
            </span>
          </button>

          <button
            onClick={() => setCurrentStep(3)}
            className="flex items-center gap-1.5 focus:outline-none"
          >
            <span
              className={`w-5 h-5 rounded-full font-['JetBrains_Mono'] text-[11px] flex items-center justify-center font-bold transition-all ${
                currentStep === 3
                  ? 'bg-[#00236f] text-white shadow-xs'
                  : 'bg-[#dae2fd] text-[#444651]'
              }`}
            >
              3
            </span>
            <span
              className={`font-['JetBrains_Mono'] text-xs ${
                currentStep === 3 ? 'text-[#00236f] font-bold' : 'text-[#444651]'
              }`}
            >
              Variants
            </span>
          </button>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-4">
        {/* STEP 1: SOURCE INGESTION */}
        {currentStep === 1 && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-['Hanken_Grotesk'] text-xl text-[#131b2e] font-bold tracking-tight">
                  Source Ingestion
                </h2>
                <p className="text-xs text-[#444651]">
                  Validate canonical resume tokenization & semantic structures
                </p>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 rounded bg-[#eaedff] text-[#00312c] font-['JetBrains_Mono'] text-[11px] font-medium shrink-0">
                <span className="material-symbols-outlined text-[15px] text-[#004942]">
                  verified_user
                </span>
                <span>ISO/IEC 29115</span>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-xs border border-[#eaedff] flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex gap-1 p-0.5 bg-[#eaedff] rounded-lg">
                  {(['PDF', 'DOCX', 'TXT'] as const).map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => setFileFormat(fmt)}
                      className={`px-3 py-1 rounded font-['JetBrains_Mono'] text-xs font-semibold transition-all ${
                        fileFormat === fmt
                          ? 'bg-white text-[#00236f] shadow-xs'
                          : 'text-[#444651] hover:text-[#131b2e]'
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
                <span className="font-['JetBrains_Mono'] text-xs text-[#444651]">Max 10MB</span>
              </div>

              {/* Uploaded Card */}
              <div className="p-4 rounded-xl bg-[#f2f3ff] border border-[#eaedff] flex flex-col sm:flex-row items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#1e3a8a] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <span className="material-symbols-outlined text-[26px]">description</span>
                </div>
                <div className="flex-1 min-w-0 text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                    <span className="font-['Hanken_Grotesk'] text-base text-[#131b2e] font-bold truncate">
                      {resumeFileName}
                    </span>
                    <span className="font-['JetBrains_Mono'] text-xs text-[#444651]">142 KB</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-[#004942]"></span>
                    <span className="font-['JetBrains_Mono'] text-xs text-[#004942] font-semibold">
                      ✓ Resume parsed (9 Sections detected)
                    </span>
                  </div>
                </div>

                <label className="px-3 py-1.5 rounded-lg bg-white text-[#444651] hover:text-[#00236f] border border-[#eaedff] transition font-['JetBrains_Mono'] text-xs flex items-center gap-1.5 shadow-xs shrink-0 cursor-pointer">
                  <span className="material-symbols-outlined text-[16px]">swap_horiz</span>
                  <span>Replace</span>
                  <input
                    type="file"
                    accept=".pdf,.docx,.txt"
                    onChange={handleCustomUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Extracted Semantic Features Accordion */}
              <div className="bg-[#eaedff]/60 rounded-xl p-3.5 border border-[#dae2fd] flex flex-col gap-3">
                <button
                  type="button"
                  className="flex items-center justify-between cursor-pointer w-full text-left"
                  onClick={() => setIsExtractionExpanded(!isExtractionExpanded)}
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#00236f] text-[20px]">
                      fact_check
                    </span>
                    <span className="font-['JetBrains_Mono'] text-xs text-[#00236f] font-bold">
                      Extracted Semantic Features
                    </span>
                  </div>
                  <span
                    className={`material-symbols-outlined text-[#444651] text-[20px] transition-transform duration-200 ${
                      isExtractionExpanded ? '' : '-rotate-90'
                    }`}
                  >
                    expand_more
                  </span>
                </button>

                {isExtractionExpanded && (
                  <div className="flex flex-col gap-3 pt-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div className="bg-white p-3 rounded-lg border border-[#eaedff] flex flex-col">
                        <span className="font-['JetBrains_Mono'] text-[10px] text-[#444651] uppercase">
                          Target Identity Anchor
                        </span>
                        <span className="font-['Hanken_Grotesk'] text-sm font-bold text-[#131b2e]">
                          {features.name}
                        </span>
                        <span className="font-['JetBrains_Mono'] text-xs text-[#904d00] font-medium">
                          Demographic marker: {features.demographicMarker}
                        </span>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-[#eaedff] flex flex-col">
                        <span className="font-['JetBrains_Mono'] text-[10px] text-[#444651] uppercase">
                          Extracted Track
                        </span>
                        <span className="font-['Hanken_Grotesk'] text-sm font-bold text-[#131b2e]">
                          {features.track}
                        </span>
                        <span className="font-['JetBrains_Mono'] text-xs text-[#444651]">
                          {features.experienceLevel}
                        </span>
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-lg border border-[#eaedff] flex flex-col gap-1">
                      <span className="font-['JetBrains_Mono'] text-[10px] text-[#444651] uppercase">
                        Executive Summary Chunk
                      </span>
                      <p className="text-xs text-[#131b2e] italic bg-[#faf8ff] p-2 rounded border border-[#eaedff]">
                        "{features.summary}"
                      </p>
                    </div>

                    <div className="bg-white p-3 rounded-lg border border-[#eaedff] flex flex-col gap-1.5">
                      <span className="font-['JetBrains_Mono'] text-[10px] text-[#444651] uppercase">
                        Core Skill Taxonomy Tokens
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {features.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 rounded bg-[#eaedff] text-[#00236f] font-['JetBrains_Mono'] text-[11px] font-semibold"
                          >
                            {skill}
                          </span>
                        ))}
                        <span className="px-2 py-0.5 rounded bg-[#dae2fd] text-[#004942] font-['JetBrains_Mono'] text-[11px] font-medium">
                          +{features.matchedSkillsCount} matched
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="bg-white p-3 rounded-lg border border-[#eaedff]">
                        <span className="font-['JetBrains_Mono'] text-[10px] text-[#444651] uppercase block">
                          Positions Parsed
                        </span>
                        <div className="font-['Hanken_Grotesk'] text-base font-bold text-[#131b2e]">
                          {features.positionsCount} Roles
                        </div>
                        <span className="font-['JetBrains_Mono'] text-xs text-[#444651]">
                          {features.positionYears}
                        </span>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-[#eaedff]">
                        <span className="font-['JetBrains_Mono'] text-[10px] text-[#444651] uppercase block">
                          Academic Credential
                        </span>
                        <div className="font-['Hanken_Grotesk'] text-sm font-bold text-[#131b2e] truncate">
                          {features.education}
                        </div>
                        <span className="font-['JetBrains_Mono'] text-xs text-[#004942] font-semibold">
                          {features.educationTier}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action */}
              <div className="flex justify-end pt-1">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="w-full sm:w-auto px-6 py-3 bg-[#00236f] text-white rounded-lg font-['JetBrains_Mono'] text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-sm hover:bg-[#1e3a8a] active:scale-[0.98] transition"
                >
                  <span>Proceed to Job Matching</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: BENCHMARK TARGET */}
        {currentStep === 2 && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-['Hanken_Grotesk'] text-xl text-[#131b2e] font-bold tracking-tight">
                  Benchmark Target
                </h2>
                <p className="text-xs text-[#444651]">
                  Align model evaluation parameters to explicit employer screening criteria
                </p>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 rounded bg-[#eaedff] text-[#444651] font-['JetBrains_Mono'] text-[11px] font-medium shrink-0">
                <span>Preset: Lever/Workday</span>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-xs border border-[#eaedff] flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-['JetBrains_Mono'] text-xs text-[#131b2e] font-semibold">
                  Target Position Title
                </label>
                <div className="flex items-center bg-[#f2f3ff] rounded-lg px-3 py-2 border border-[#eaedff]">
                  <span className="material-symbols-outlined text-[#00236f] text-[20px] mr-2 shrink-0">
                    badge
                  </span>
                  <input
                    className="bg-transparent text-sm text-[#131b2e] focus:outline-none w-full font-medium"
                    type="text"
                    value={jobTarget.title}
                    onChange={(e) =>
                      setJobTarget((prev) => ({ ...prev, title: e.target.value }))
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-['JetBrains_Mono'] text-xs text-[#131b2e] font-semibold">
                  Hiring Organization / Context
                </label>
                <div className="flex items-center bg-[#f2f3ff] rounded-lg px-3 py-2 border border-[#eaedff]">
                  <span className="material-symbols-outlined text-[#00236f] text-[20px] mr-2 shrink-0">
                    apartment
                  </span>
                  <input
                    className="bg-transparent text-sm text-[#131b2e] focus:outline-none w-full font-medium"
                    type="text"
                    value={jobTarget.company}
                    onChange={(e) =>
                      setJobTarget((prev) => ({ ...prev, company: e.target.value }))
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-['JetBrains_Mono'] text-xs text-[#131b2e] font-semibold">
                    Job Specification Corpus
                  </label>
                  <span className="font-['JetBrains_Mono'] text-[11px] text-[#444651]">
                    {jobTarget.description.length} chars • {jobTarget.requiredTokenCount} Required Tokens
                  </span>
                </div>
                <div className="relative bg-[#f2f3ff] rounded-lg p-3 border border-[#eaedff]">
                  <textarea
                    className="bg-transparent font-['JetBrains_Mono'] text-xs text-[#131b2e] w-full focus:outline-none resize-none leading-relaxed"
                    rows={5}
                    value={jobTarget.description}
                    onChange={(e) =>
                      setJobTarget((prev) => ({ ...prev, description: e.target.value }))
                    }
                  />
                </div>
              </div>

              {/* Keyword Saturation */}
              <div className="p-3 bg-[#eaedff] rounded-lg flex flex-col gap-2 border border-[#dae2fd]">
                <div className="flex items-center justify-between font-['JetBrains_Mono'] text-xs">
                  <span className="text-[#444651] uppercase font-medium">
                    ATS Baseline Keyword Saturation
                  </span>
                  <span className="text-[#004942] font-bold">{jobTarget.matchScore}% Correlation</span>
                </div>
                <div className="w-full bg-[#dae2fd] rounded-full h-2">
                  <div
                    className="bg-[#004942] h-2 rounded-full transition-all duration-500"
                    style={{ width: `${jobTarget.matchScore}%` }}
                  ></div>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {jobTarget.matchedKeywords.map((item) => (
                    <span
                      key={item.keyword}
                      className={`px-2 py-0.5 rounded font-['JetBrains_Mono'] text-[11px] font-semibold border ${
                        item.status === 'matched'
                          ? 'bg-white text-[#004942] border-[#89f5e7]'
                          : 'bg-white text-[#904d00] border-[#ffdcc3]'
                      }`}
                    >
                      {item.status === 'matched' ? '✓ ' : '⚠ '}
                      {item.keyword} ({item.percentage}%)
                    </span>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2.5 text-[#444651] hover:text-[#131b2e] font-['JetBrains_Mono'] text-xs font-semibold transition"
                >
                  Back
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="px-6 py-3 bg-[#00236f] text-white rounded-lg font-['JetBrains_Mono'] text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-sm hover:bg-[#1e3a8a] active:scale-[0.98] transition"
                >
                  <span>Configure Counterfactuals</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: CONTROLLED VARIANT SUITE */}
        {currentStep === 3 && (
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#904d00] text-[24px]">balance</span>
                <h2 className="font-['Hanken_Grotesk'] text-xl text-[#131b2e] font-bold tracking-tight">
                  Controlled Variant Suite
                </h2>
              </div>
              <p className="text-xs text-[#444651] mt-0.5">
                Isolate algorithmic sensitivity vectors via randomized demographic counterfactuals
              </p>
            </div>

            {/* Causal Pairwise Perturbation Method Banner */}
            <div className="p-4 rounded-xl bg-[#e2e7ff] border border-[#dae2fd] flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00236f] text-[20px]">science</span>
                <span className="font-['JetBrains_Mono'] text-xs text-[#00236f] font-bold">
                  Audit Methodology: Causal Pairwise Perturbation
                </span>
              </div>
              <p className="text-xs text-[#131b2e] leading-relaxed">
                To isolate the singular effect of identity proxies, BiasCheck keeps the resume substantive metrics <strong>100% identical</strong> while perturbing only canonical name tokens across recognized demographic axes.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                <div className="p-2 rounded bg-white border border-[#dae2fd] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#004942] text-[18px] shrink-0">
                    lock
                  </span>
                  <span className="font-['JetBrains_Mono'] text-[11px] text-[#131b2e] font-medium">
                    Invariant: Experience, skills, tenure, dates
                  </span>
                </div>
                <div className="p-2 rounded bg-white border border-[#dae2fd] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#904d00] text-[18px] shrink-0">
                    tune
                  </span>
                  <span className="font-['JetBrains_Mono'] text-[11px] text-[#131b2e] font-medium">
                    Manipulated: First/last name demographic signal
                  </span>
                </div>
              </div>
            </div>

            {/* Counterfactual Cohort List */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="font-['JetBrains_Mono'] text-xs text-[#444651] uppercase tracking-wider font-semibold">
                  Configured Counterfactual Cohort ({variants.length})
                </span>
                <span className="font-['JetBrains_Mono'] text-xs text-[#00236f] font-medium">
                  {activeVariantsCount} Active Variants + 1 Baseline
                </span>
              </div>

              {variants.map((v) => (
                <div
                  key={v.id}
                  className="bg-white rounded-xl p-3.5 shadow-xs border border-[#eaedff] flex flex-col gap-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          v.isBaseline ? 'bg-[#00236f]' : 'bg-[#fe932c]'
                        }`}
                      ></span>
                      <span className="font-['Hanken_Grotesk'] text-base font-bold text-[#131b2e]">
                        {v.name}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded font-['JetBrains_Mono'] text-[10px] font-bold ${
                          v.isBaseline
                            ? 'bg-[#eaedff] text-[#00236f]'
                            : 'bg-[#dae2fd] text-[#444651]'
                        }`}
                      >
                        {v.label}
                      </span>
                    </div>

                    {v.isBaseline ? (
                      <span className="font-['JetBrains_Mono'] text-xs text-[#444651]">
                        Original Candidate
                      </span>
                    ) : (
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={v.active}
                          onChange={() => toggleVariant(v.id)}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-[#dae2fd] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#00236f]"></div>
                      </label>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center py-1.5 bg-[#f2f3ff] rounded-lg border border-[#eaedff]">
                    <div>
                      <span className="font-['JetBrains_Mono'] text-[10px] text-[#444651] block">
                        Signal
                      </span>
                      <span className="font-['JetBrains_Mono'] text-xs text-[#131b2e] font-semibold truncate block">
                        {v.signal}
                      </span>
                    </div>
                    <div>
                      <span className="font-['JetBrains_Mono'] text-[10px] text-[#444651] block">
                        Substantive Text
                      </span>
                      <span className="font-['JetBrains_Mono'] text-xs text-[#004942] font-semibold block">
                        {v.substantiveText}
                      </span>
                    </div>
                    <div>
                      <span className="font-['JetBrains_Mono'] text-[10px] text-[#444651] block">
                        Delta Test
                      </span>
                      <span
                        className={`font-['JetBrains_Mono'] text-xs font-semibold block ${
                          v.isBaseline ? 'text-[#00236f]' : v.active ? 'text-[#004942]' : 'text-[#757682]'
                        }`}
                      >
                        {v.isBaseline ? 'Anchor Ref' : v.active ? 'Active' : 'Disabled'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Ethics Agreement */}
            <div className="p-3 bg-[#f2f3ff] rounded-xl flex items-start gap-2.5 border border-[#eaedff]">
              <input
                id="ethicsAgreement"
                type="checkbox"
                checked={ethicsAccepted}
                onChange={(e) => setEthicsAccepted(e.target.checked)}
                className="mt-1 w-4 h-4 rounded text-[#00236f] focus:ring-[#00236f] bg-white cursor-pointer"
              />
              <label
                htmlFor="ethicsAgreement"
                className="text-xs text-[#131b2e] select-none cursor-pointer leading-relaxed"
              >
                <strong className="font-semibold text-[#00236f]">Ethical Research Disclosure:</strong> I
                affirm these counterfactual variants will be executed solely for audit differential
                measurements against simulated scoring endpoints and will not be utilized as deceptive
                applicant submissions.
              </label>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-1">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-4 py-2.5 text-[#444651] hover:text-[#131b2e] font-['JetBrains_Mono'] text-xs font-semibold transition"
              >
                Back
              </button>

              <button
                disabled={!ethicsAccepted}
                onClick={() => onRunAudit({ features, jobTarget, variants })}
                className={`px-6 py-3 rounded-lg font-['JetBrains_Mono'] text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all shadow-sm ${
                  ethicsAccepted
                    ? 'bg-[#00236f] text-white hover:bg-[#1e3a8a] active:scale-[0.98] cursor-pointer'
                    : 'bg-[#dae2fd] text-[#444651] cursor-not-allowed opacity-75'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">biotech</span>
                <span>Run Bias Audit ({activeVariantsCount} Variants × 2 Models)</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
