import React, { useState } from 'react';
import { CounterfactualVariant, ExtractedFeatures, JobTarget } from '../types';
import {
  DEFAULT_EXTRACTED_FEATURES,
  DEFAULT_JOB_TARGET,
  DEFAULT_VARIANTS,
  AMARA_PHOTO_URL
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
  const [resumeFileName, setResumeFileName] = useState('Amara_Okoye_Senior_SWE_Resume.pdf');
  const [features, setFeatures] = useState<ExtractedFeatures>(DEFAULT_EXTRACTED_FEATURES);
  const [jobTarget, setJobTarget] = useState<JobTarget>(DEFAULT_JOB_TARGET);
  const [variants, setVariants] = useState<CounterfactualVariant[]>(DEFAULT_VARIANTS);
  const [ethicsAccepted, setEthicsAccepted] = useState(true);

  const toggleVariant = (id: string) => {
    setVariants((prev) =>
      prev.map((v) => (v.id === id && !v.isBaseline ? { ...v, active: !v.active } : v))
    );
  };

  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFileName(file.name);
      const baseName = file.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' ');
      setFeatures((prev) => ({
        ...prev,
        name: baseName.includes(' ') ? baseName : 'Candidate Profile',
        summary: `Custom uploaded resume: ${file.name}`
      }));
    }
  };

  const selectProfile = (profile: 'amara' | 'tariq' | 'elena') => {
    if (profile === 'amara') {
      setResumeFileName('Amara_Okoye_Senior_SWE_Resume.pdf');
      setFeatures({
        name: 'Amara Okoye',
        demographicMarker: 'Female / West-African',
        track: 'Full-Stack Engineer',
        experienceLevel: 'Senior (5+ years)',
        summary: '5+ years building scalable distributed web services and event-driven microservices.',
        skills: ['TypeScript', 'Python', 'React', 'PostgreSQL', 'Docker', 'Redis'],
        matchedSkillsCount: 14,
        positionsCount: 3,
        positionYears: '2019 – Present',
        education: 'B.Sc. Computer Science',
        educationTier: 'Accredited University'
      });
      setJobTarget({
        ...DEFAULT_JOB_TARGET,
        title: 'Staff Software Engineer / Distributed Systems',
        company: 'Fintech Global Ltd'
      });
    } else if (profile === 'tariq') {
      setResumeFileName('Tariq_Al_Mansoor_Data_Lead.pdf');
      setFeatures({
        name: 'Tariq Al-Mansoor',
        demographicMarker: 'Male / Middle-Eastern',
        track: 'Data Platform Architect',
        experienceLevel: 'Staff (7+ years)',
        summary: 'Specializing in real-time Apache Flink, Snowflake data lakes, and streaming systems.',
        skills: ['Python', 'SQL', 'Apache Spark', 'Kafka', 'Snowflake', 'Airflow'],
        matchedSkillsCount: 16,
        positionsCount: 4,
        positionYears: '2017 – Present',
        education: 'M.Sc. Information Systems',
        educationTier: 'Accredited University'
      });
      setJobTarget({
        ...DEFAULT_JOB_TARGET,
        title: 'Principal Data Platform Engineer',
        company: 'Fintech Global Ltd'
      });
    } else {
      setResumeFileName('Elena_Vasiliev_PM_Resume.pdf');
      setFeatures({
        name: 'Elena Vasiliev',
        demographicMarker: 'Female / Eastern-European',
        track: 'Technical Product Lead',
        experienceLevel: 'Lead (6+ years)',
        summary: 'Scaling fintech payment conversions, developer SDKs, and international compliance.',
        skills: ['Product Strategy', 'Fintech APIs', 'SQL', 'A/B Testing', 'System Architecture'],
        matchedSkillsCount: 12,
        positionsCount: 3,
        positionYears: '2018 – Present',
        education: 'B.Sc. Business & Computer Science',
        educationTier: 'Accredited University'
      });
      setJobTarget({
        ...DEFAULT_JOB_TARGET,
        title: 'Lead Technical Product Manager - Ledger',
        company: 'Fintech Global Ltd'
      });
    }
  };

  const handleStartAudit = () => {
    onRunAudit({
      features,
      jobTarget,
      variants
    });
  };

  const handleQuickRun = (profile?: 'amara' | 'tariq' | 'elena') => {
    if (profile) {
      selectProfile(profile);
    }
    // Give state tick if needed or run with resolved config
    setTimeout(() => {
      onRunAudit({
        features,
        jobTarget,
        variants
      });
    }, 50);
  };

  return (
    <div className="flex flex-col w-full pb-28 md:pb-12 max-w-4xl mx-auto px-4 sm:px-6 py-6 gap-6">
      {/* Friendly Step Indicator with Direct Clickability */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#eaedff] shadow-xs flex flex-col gap-3">
        <div className="flex justify-between items-center text-xs font-['JetBrains_Mono']">
          <span className="text-[#757682] uppercase tracking-wider">
            Step {currentStep} of 3
          </span>
          <span className="text-[#00236f] font-bold">
            {currentStep === 1 && '1. Choose Candidate & Resume'}
            {currentStep === 2 && '2. Set Target Job Criteria'}
            {currentStep === 3 && '3. Review Comparison Variants'}
          </span>
        </div>

        {/* Step Buttons for Easy Navigation */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setCurrentStep(1)}
            className={`py-2 px-3 rounded-xl text-xs font-['JetBrains_Mono'] font-medium transition-all text-left flex items-center gap-2 cursor-pointer ${
              currentStep === 1
                ? 'bg-[#00236f] text-white font-bold shadow-xs'
                : currentStep > 1
                ? 'bg-[#f2f3ff] text-[#00236f] hover:bg-[#eaedff]'
                : 'bg-[#faf8ff] text-[#757682]'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">1</span>
            <span className="truncate">Resume</span>
          </button>

          <button
            onClick={() => setCurrentStep(2)}
            className={`py-2 px-3 rounded-xl text-xs font-['JetBrains_Mono'] font-medium transition-all text-left flex items-center gap-2 cursor-pointer ${
              currentStep === 2
                ? 'bg-[#00236f] text-white font-bold shadow-xs'
                : currentStep > 2
                ? 'bg-[#f2f3ff] text-[#00236f] hover:bg-[#eaedff]'
                : 'bg-[#faf8ff] text-[#757682]'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">2</span>
            <span className="truncate">Target Job</span>
          </button>

          <button
            onClick={() => setCurrentStep(3)}
            className={`py-2 px-3 rounded-xl text-xs font-['JetBrains_Mono'] font-medium transition-all text-left flex items-center gap-2 cursor-pointer ${
              currentStep === 3
                ? 'bg-[#00236f] text-white font-bold shadow-xs'
                : 'bg-[#faf8ff] text-[#757682]'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">3</span>
            <span className="truncate">Comparison</span>
          </button>
        </div>
      </div>

      {/* STEP 1: CHOOSE OR UPLOAD RESUME */}
      {currentStep === 1 && (
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#eaedff] shadow-xs flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="font-['Hanken_Grotesk'] text-xl sm:text-2xl font-bold text-[#131b2e]">
                Select a resume to evaluate
              </h2>
              <p className="text-xs sm:text-sm text-[#444651] mt-0.5">
                Pick a benchmark profile for instant testing, or upload your own resume:
              </p>
            </div>
            <button
              onClick={() => handleQuickRun()}
              className="px-4 py-2 rounded-xl bg-[#004942] text-white font-['JetBrains_Mono'] text-xs font-bold hover:bg-[#003833] transition flex items-center gap-1.5 self-start sm:self-auto cursor-pointer shadow-xs"
            >
              <span className="material-symbols-outlined text-[16px]">bolt</span>
              <span>1-Click Quick Audit</span>
            </button>
          </div>

          {/* Quick 1-Click Profile Selection */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-['JetBrains_Mono'] text-[#757682] uppercase tracking-wider">
              Quick Test Benchmark Profiles
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => selectProfile('amara')}
                className={`p-4 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between gap-3 ${
                  features.name === 'Amara Okoye'
                    ? 'bg-[#eaedff]/80 border-[#00236f] shadow-xs ring-2 ring-[#00236f]/10'
                    : 'bg-[#faf8ff] border-[#eaedff] hover:border-[#00236f]/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={AMARA_PHOTO_URL}
                    alt="Amara"
                    className="w-10 h-10 rounded-full object-cover border border-[#eaedff]"
                  />
                  <div>
                    <strong className="text-xs sm:text-sm font-bold text-[#131b2e] block">Amara Okoye</strong>
                    <span className="text-xs text-[#444651]">Full-Stack Eng</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[11px] pt-2 border-t border-[#eaedff]/60">
                  <span className="text-[#00236f] font-mono">5+ yrs exp</span>
                  <span className="font-semibold text-[#004942]">Fintech Preset</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => selectProfile('tariq')}
                className={`p-4 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between gap-3 ${
                  features.name === 'Tariq Al-Mansoor'
                    ? 'bg-[#eaedff]/80 border-[#00236f] shadow-xs ring-2 ring-[#00236f]/10'
                    : 'bg-[#faf8ff] border-[#eaedff] hover:border-[#00236f]/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#00236f] text-white flex items-center justify-center font-['JetBrains_Mono'] text-xs font-bold">
                    TM
                  </div>
                  <div>
                    <strong className="text-xs sm:text-sm font-bold text-[#131b2e] block">Tariq Al-Mansoor</strong>
                    <span className="text-xs text-[#444651]">Data Platform</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[11px] pt-2 border-t border-[#eaedff]/60">
                  <span className="text-[#00236f] font-mono">7+ yrs exp</span>
                  <span className="font-semibold text-[#004942]">Big Data Preset</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => selectProfile('elena')}
                className={`p-4 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between gap-3 ${
                  features.name === 'Elena Vasiliev'
                    ? 'bg-[#eaedff]/80 border-[#00236f] shadow-xs ring-2 ring-[#00236f]/10'
                    : 'bg-[#faf8ff] border-[#eaedff] hover:border-[#00236f]/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#004942] text-white flex items-center justify-center font-['JetBrains_Mono'] text-xs font-bold">
                    EV
                  </div>
                  <div>
                    <strong className="text-xs sm:text-sm font-bold text-[#131b2e] block">Elena Vasiliev</strong>
                    <span className="text-xs text-[#444651]">Technical PM</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[11px] pt-2 border-t border-[#eaedff]/60">
                  <span className="text-[#00236f] font-mono">6+ yrs exp</span>
                  <span className="font-semibold text-[#004942]">Product Preset</span>
                </div>
              </button>
            </div>
          </div>

          {/* Upload Dropzone */}
          <div className="p-6 rounded-2xl border-2 border-dashed border-[#dae2fd] bg-[#faf8ff] text-center flex flex-col items-center justify-center gap-2 hover:border-[#00236f] transition-colors">
            <span className="material-symbols-outlined text-[32px] text-[#00236f]">upload_file</span>
            <div className="text-xs sm:text-sm text-[#444651]">
              <label className="font-bold text-[#00236f] hover:underline cursor-pointer">
                Upload your resume
                <input
                  type="file"
                  accept=".pdf,.docx,.txt"
                  onChange={handleCustomUpload}
                  className="hidden"
                />
              </label>{' '}
              <span>(PDF, DOCX, or plain text)</span>
            </div>
            <span className="text-xs text-[#757682] font-mono">
              Current loaded: {resumeFileName}
            </span>
          </div>

          {/* Candidate Summary Preview */}
          <div className="p-4 rounded-xl bg-[#f2f3ff] border border-[#eaedff] flex flex-col gap-2.5">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-[#131b2e]">
                Selected Candidate: {features.name} ({features.track})
              </span>
              <span className="text-xs font-mono text-[#004942] bg-[#89f5e7]/40 px-2.5 py-0.5 rounded font-semibold">
                {features.skills.length} Skills Extracted
              </span>
            </div>
            <p className="text-xs text-[#444651] leading-relaxed">
              {features.summary}
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {features.skills.map((s) => (
                <span key={s} className="text-xs font-mono px-2.5 py-1 rounded-md bg-white text-[#00236f] border border-[#eaedff]">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <div className="flex justify-between items-center pt-2">
            <span className="text-xs text-[#757682]">
              Files are processed in ephemeral memory and discarded immediately.
            </span>
            <button
              onClick={() => setCurrentStep(2)}
              className="px-6 py-3 bg-[#00236f] text-white rounded-xl font-['JetBrains_Mono'] text-xs sm:text-sm font-semibold hover:bg-[#1e3a8a] transition flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Next: Target Job Criteria</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: TARGET JOB */}
      {currentStep === 2 && (
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#eaedff] shadow-xs flex flex-col gap-6">
          <div>
            <h2 className="font-['Hanken_Grotesk'] text-xl sm:text-2xl font-bold text-[#131b2e]">
              Target Job & Employer Context
            </h2>
            <p className="text-xs sm:text-sm text-[#444651] mt-0.5">
              Screening algorithms evaluate candidate relevance against target role criteria and keyword requirements:
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#131b2e] block mb-1.5">
                  Target Position Title
                </label>
                <input
                  type="text"
                  value={jobTarget.title}
                  onChange={(e) => setJobTarget({ ...jobTarget, title: e.target.value })}
                  className="w-full p-3 rounded-xl bg-[#f2f3ff] border border-[#eaedff] text-xs sm:text-sm font-medium text-[#131b2e] focus:outline-none focus:border-[#00236f]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#131b2e] block mb-1.5">
                  Hiring Organization / Employer
                </label>
                <input
                  type="text"
                  value={jobTarget.company}
                  onChange={(e) => setJobTarget({ ...jobTarget, company: e.target.value })}
                  className="w-full p-3 rounded-xl bg-[#f2f3ff] border border-[#eaedff] text-xs sm:text-sm font-medium text-[#131b2e] focus:outline-none focus:border-[#00236f]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#131b2e] block mb-1.5">
                Job Description Summary / Required Keywords
              </label>
              <textarea
                rows={4}
                value={jobTarget.description}
                onChange={(e) => setJobTarget({ ...jobTarget, description: e.target.value })}
                className="w-full p-3 rounded-xl bg-[#f2f3ff] border border-[#eaedff] text-xs sm:text-sm text-[#131b2e] focus:outline-none focus:border-[#00236f] resize-none leading-relaxed"
              />
            </div>

            <div className="p-4 rounded-xl bg-[#eaedff]/60 border border-[#dae2fd] flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#00236f] block">
                  Keyword Correlation Match
                </span>
                <span className="text-[11px] text-[#444651]">
                  Estimated ATS initial keyword relevance
                </span>
              </div>
              <span className="font-['JetBrains_Mono'] text-base font-bold text-[#004942] bg-white px-3 py-1 rounded-lg border border-[#dae2fd]">
                {jobTarget.matchScore}% Match
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <button
              onClick={() => setCurrentStep(1)}
              className="text-xs text-[#757682] hover:text-[#131b2e] font-['JetBrains_Mono'] font-medium flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              <span>Back to Resume</span>
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              className="px-6 py-3 bg-[#00236f] text-white rounded-xl font-['JetBrains_Mono'] text-xs sm:text-sm font-semibold hover:bg-[#1e3a8a] transition flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Next: Comparison Variants</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: CONTROLLED COMPARISONS & RUN */}
      {currentStep === 3 && (
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#eaedff] shadow-xs flex flex-col gap-6">
          <div>
            <h2 className="font-['Hanken_Grotesk'] text-xl sm:text-2xl font-bold text-[#131b2e]">
              Controlled Comparison Suite
            </h2>
            <p className="text-xs sm:text-sm text-[#444651] mt-0.5">
              The exact same credentials and skills will be scored with different name indicators to isolate screening model sensitivity:
            </p>
          </div>

          {/* Variants List */}
          <div className="space-y-3">
            {variants.map((v) => (
              <div
                key={v.id}
                className={`p-4 rounded-xl border flex items-center justify-between transition ${
                  v.isBaseline
                    ? 'bg-[#ffdad6]/20 border-[#ffdad6]'
                    : v.active
                    ? 'bg-[#f2f3ff] border-[#eaedff]'
                    : 'bg-[#faf8ff] border-[#eaedff] opacity-60'
                }`}
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <strong className="text-xs sm:text-sm font-bold text-[#131b2e]">{v.name}</strong>
                    {v.isBaseline ? (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#ba1a1a] text-white font-bold">
                        Baseline (Original)
                      </span>
                    ) : (
                      <span className="text-[11px] font-mono text-[#757682]">
                        {v.signal}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-[#444651] mt-0.5">
                    Credentials, Skills & Experience: 100% Invariant
                  </span>
                </div>

                {!v.isBaseline && (
                  <button
                    type="button"
                    onClick={() => toggleVariant(v.id)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition cursor-pointer ${
                      v.active
                        ? 'bg-[#00236f] text-white'
                        : 'bg-white text-[#757682] border border-[#eaedff]'
                    }`}
                  >
                    {v.active ? 'Included' : 'Excluded'}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Ethical agreement checkbox */}
          <label className="flex items-start gap-3 p-4 rounded-xl bg-[#faf8ff] border border-[#eaedff] text-xs text-[#444651] cursor-pointer">
            <input
              type="checkbox"
              checked={ethicsAccepted}
              onChange={(e) => setEthicsAccepted(e.target.checked)}
              className="mt-0.5 rounded text-[#00236f] w-4 h-4 cursor-pointer"
            />
            <span>
              I understand this audit runs in an ephemeral local session for diagnostic testing and pre-submission clarity, not deceptive submissions.
            </span>
          </label>

          {/* Action buttons */}
          <div className="flex justify-between items-center pt-2">
            <button
              onClick={() => setCurrentStep(2)}
              className="text-xs text-[#757682] hover:text-[#131b2e] font-['JetBrains_Mono'] font-medium flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              <span>Back to Job Target</span>
            </button>
            <button
              onClick={handleStartAudit}
              disabled={!ethicsAccepted}
              className="px-6 sm:px-8 py-3.5 bg-[#004942] text-white rounded-xl font-['JetBrains_Mono'] text-xs sm:text-sm font-bold hover:bg-[#003833] transition flex items-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[20px]">play_arrow</span>
              <span>Run Sensitivity Audit Now</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
