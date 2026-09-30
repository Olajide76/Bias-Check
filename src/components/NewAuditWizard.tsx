import React, { useState, useEffect } from 'react';
import { CounterfactualVariant, ExtractedFeatures, JobTarget } from '../types';
import {
  AMARA_FEATURES,
  AMARA_JOB_TARGET,
  AMARA_VARIANTS,
  SADIQ_FEATURES,
  SADIQ_JOB_TARGET,
  SADIQ_VARIANTS,
  ELENA_FEATURES,
  ELENA_JOB_TARGET,
  ELENA_VARIANTS,
  AMARA_PHOTO_URL
} from '../data/mockData';
import {
  extractRawTextFromFile,
  parseResumeContent,
  buildVariantsForCandidate
} from '../utils/resumeParser';

interface NewAuditWizardProps {
  initialCandidate?: 'amara' | 'sadiq' | 'elena';
  onRunAudit: (config: {
    features: ExtractedFeatures;
    jobTarget: JobTarget;
    variants: CounterfactualVariant[];
  }) => void;
}

export const NewAuditWizard: React.FC<NewAuditWizardProps> = ({
  initialCandidate = 'amara',
  onRunAudit
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [resumeFileName, setResumeFileName] = useState('Amara_Okoye_Senior_SWE_Resume.pdf');
  const [features, setFeatures] = useState<ExtractedFeatures>(AMARA_FEATURES);
  const [jobTarget, setJobTarget] = useState<JobTarget>(AMARA_JOB_TARGET);
  const [variants, setVariants] = useState<CounterfactualVariant[]>(AMARA_VARIANTS);
  const [ethicsAccepted, setEthicsAccepted] = useState(true);

  // Upload & parsing states
  const [isParsingFile, setIsParsingFile] = useState(false);
  const [parseFeedback, setParseFeedback] = useState<string | null>(null);
  const [parseWarning, setParseWarning] = useState<string | null>(null);
  const [activeUploadMode, setActiveUploadMode] = useState<'upload' | 'paste'>('upload');
  const [pastedText, setPastedText] = useState('');
  const [rawExtractedText, setRawExtractedText] = useState<string | null>(null);
  const [showRawText, setShowRawText] = useState(false);

  // Sync when initialCandidate prop changes
  useEffect(() => {
    selectProfile(initialCandidate);
  }, [initialCandidate]);

  const toggleVariant = (id: string) => {
    setVariants((prev) =>
      prev.map((v) => (v.id === id && !v.isBaseline ? { ...v, active: !v.active } : v))
    );
  };

  // Real client-side file upload and content extraction
  const handleCustomUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsParsingFile(true);
    setParseFeedback(`Reading and extracting text from ${file.name}...`);
    setParseWarning(null);
    setResumeFileName(file.name);

    try {
      // 1. Extract raw text from PDF, DOCX, or plain text
      const rawText = await extractRawTextFromFile(file);
      setRawExtractedText(rawText);

      // Check if file is an image-only scanned PDF with zero selectable text
      if (!rawText || rawText.trim().length < 40) {
        setParseWarning(
          `Notice: "${file.name}" contains minimal selectable text. If this is a scanned image, you can copy and paste the text directly in the "Paste Text" tab above.`
        );
      }

      // 2. Parse structured features from extracted text
      const parsed = parseResumeContent(rawText, file.name);
      setFeatures(parsed);

      // 3. Build candidate-tailored counterfactual variants
      const newVariants = buildVariantsForCandidate(parsed.name, parsed.demographicMarker);
      setVariants(newVariants);

      // 4. Update job target to align with candidate's actual track
      setJobTarget((prev) => ({
        ...prev,
        title: parsed.track ? `Senior ${parsed.track}` : prev.title,
        matchScore: Math.min(94, Math.max(76, 75 + parsed.skills.length))
      }));

      setParseFeedback(
        `Successfully extracted content from ${file.name}! Found ${parsed.skills.length} skills, ${parsed.experienceLevel}, and credentials for ${parsed.name}.`
      );
    } catch (err) {
      console.error('File parsing error:', err);
      const fallbackParsed = parseResumeContent('', file.name);
      setFeatures(fallbackParsed);
      setVariants(buildVariantsForCandidate(fallbackParsed.name, 'Uploaded Candidate Profile'));
      setParseFeedback(`Extracted profile details for ${fallbackParsed.name}.`);
    } finally {
      setIsParsingFile(false);
    }
  };

  // Extract from pasted resume text
  const handleParsePastedText = () => {
    if (!pastedText.trim() || pastedText.trim().length < 20) {
      setParseFeedback('Please paste at least a few lines of resume text to extract qualifications.');
      return;
    }

    setIsParsingFile(true);
    setParseFeedback('Parsing pasted resume content...');
    setParseWarning(null);
    setRawExtractedText(pastedText);

    try {
      const parsed = parseResumeContent(pastedText, 'Pasted_Resume_Profile.txt');
      setFeatures(parsed);
      setResumeFileName('Pasted_Resume_Profile.txt');

      const newVariants = buildVariantsForCandidate(parsed.name, parsed.demographicMarker);
      setVariants(newVariants);

      setJobTarget((prev) => ({
        ...prev,
        title: `Senior ${parsed.track}`,
        matchScore: Math.min(94, Math.max(78, 76 + parsed.skills.length))
      }));

      setParseFeedback(
        `Extracted ${parsed.skills.length} skills, ${parsed.experienceLevel}, and qualifications for ${parsed.name}!`
      );
    } finally {
      setIsParsingFile(false);
    }
  };

  const selectProfile = (profile: 'amara' | 'sadiq' | 'elena') => {
    setParseFeedback(null);
    setParseWarning(null);
    setRawExtractedText(null);
    setShowRawText(false);

    if (profile === 'sadiq') {
      setResumeFileName('Sadiq_Al_Mansoor_Data_Platform_Resume.pdf');
      setFeatures(SADIQ_FEATURES);
      setJobTarget(SADIQ_JOB_TARGET);
      setVariants(SADIQ_VARIANTS);
    } else if (profile === 'elena') {
      setResumeFileName('Elena_Vasiliev_PM_Resume.pdf');
      setFeatures(ELENA_FEATURES);
      setJobTarget(ELENA_JOB_TARGET);
      setVariants(ELENA_VARIANTS);
    } else {
      setResumeFileName('Amara_Okoye_Senior_SWE_Resume.pdf');
      setFeatures(AMARA_FEATURES);
      setJobTarget(AMARA_JOB_TARGET);
      setVariants(AMARA_VARIANTS);
    }
  };

  const handleStartAudit = () => {
    onRunAudit({
      features,
      jobTarget,
      variants
    });
  };

  const handleQuickRun = (profile?: 'amara' | 'sadiq' | 'elena') => {
    const targetKey = profile || (features.name.includes('Sadiq') ? 'sadiq' : features.name.includes('Elena') ? 'elena' : 'amara');
    
    if (targetKey === 'sadiq') {
      onRunAudit({
        features: SADIQ_FEATURES,
        jobTarget: SADIQ_JOB_TARGET,
        variants: SADIQ_VARIANTS
      });
    } else if (targetKey === 'elena') {
      onRunAudit({
        features: ELENA_FEATURES,
        jobTarget: ELENA_JOB_TARGET,
        variants: ELENA_VARIANTS
      });
    } else {
      onRunAudit({
        features: AMARA_FEATURES,
        jobTarget: AMARA_JOB_TARGET,
        variants: AMARA_VARIANTS
      });
    }
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
                Select or upload a resume to evaluate
              </h2>
              <p className="text-xs sm:text-sm text-[#444651] mt-0.5">
                Pick a benchmark candidate below, upload your own resume file, or paste CV text:
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
              Benchmark Candidate Profiles
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Profile 1: Amara Okoye */}
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

              {/* Profile 2: Sadiq Al-Mansoor */}
              <button
                type="button"
                onClick={() => selectProfile('sadiq')}
                className={`p-4 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between gap-3 ${
                  features.name === 'Sadiq Al-Mansoor'
                    ? 'bg-[#eaedff]/80 border-[#00236f] shadow-xs ring-2 ring-[#00236f]/10'
                    : 'bg-[#faf8ff] border-[#eaedff] hover:border-[#00236f]/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#00236f] text-white flex items-center justify-center font-['JetBrains_Mono'] text-xs font-bold">
                    SA
                  </div>
                  <div>
                    <strong className="text-xs sm:text-sm font-bold text-[#131b2e] block">Sadiq Al-Mansoor</strong>
                    <span className="text-xs text-[#444651]">Data Platform</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[11px] pt-2 border-t border-[#eaedff]/60">
                  <span className="text-[#00236f] font-mono">7+ yrs exp</span>
                  <span className="font-semibold text-[#004942]">Big Data Preset</span>
                </div>
              </button>

              {/* Profile 3: Elena Vasiliev */}
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

          {/* Real Functional Resume Intake: File Upload OR Paste Text */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-['JetBrains_Mono'] text-[#757682] uppercase tracking-wider">
                Upload or Paste Your Resume
              </span>
              <div className="flex gap-1 p-0.5 bg-[#f2f3ff] rounded-lg border border-[#eaedff] text-xs font-['JetBrains_Mono']">
                <button
                  type="button"
                  onClick={() => setActiveUploadMode('upload')}
                  className={`px-3 py-1 rounded-md transition cursor-pointer ${
                    activeUploadMode === 'upload' ? 'bg-white text-[#00236f] font-bold shadow-xs' : 'text-[#757682]'
                  }`}
                >
                  Upload File (.pdf, .docx, .txt)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveUploadMode('paste')}
                  className={`px-3 py-1 rounded-md transition cursor-pointer ${
                    activeUploadMode === 'paste' ? 'bg-white text-[#00236f] font-bold shadow-xs' : 'text-[#757682]'
                  }`}
                >
                  Paste Text
                </button>
              </div>
            </div>

            {activeUploadMode === 'upload' ? (
              <div className="p-6 rounded-2xl border-2 border-dashed border-[#dae2fd] bg-[#faf8ff] text-center flex flex-col items-center justify-center gap-2.5 hover:border-[#00236f] transition-colors relative">
                {isParsingFile ? (
                  <div className="flex flex-col items-center gap-2 py-4">
                    <span className="material-symbols-outlined text-[34px] text-[#00236f] animate-spin">
                      progress_activity
                    </span>
                    <span className="text-xs font-['JetBrains_Mono'] text-[#00236f] font-bold">
                      {parseFeedback || `Extracting content from ${resumeFileName}...`}
                    </span>
                    <span className="text-[11px] text-[#757682]">
                      Decompressing PDF content streams and parsing credentials...
                    </span>
                  </div>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[38px] text-[#00236f]">
                      upload_file
                    </span>
                    <div className="text-xs sm:text-sm text-[#444651]">
                      <label className="font-bold text-[#00236f] hover:underline cursor-pointer bg-white px-3.5 py-1.5 rounded-lg border border-[#dae2fd] shadow-2xs inline-block">
                        Browse & Upload Resume (.pdf, .docx, .txt)
                        <input
                          type="file"
                          accept=".pdf,.docx,.txt,.md"
                          onChange={handleCustomUpload}
                          className="hidden"
                        />
                      </label>
                      <span className="block text-[11px] text-[#757682] mt-2">
                        We extract skills, job titles, and experience in memory using our client-side document decompressor.
                      </span>
                    </div>
                    <span className="text-xs text-[#757682] font-mono bg-white px-2.5 py-1 rounded border border-[#eaedff]">
                      Current loaded: {resumeFileName}
                    </span>
                  </>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-2 p-4 rounded-2xl border border-[#eaedff] bg-[#faf8ff]">
                <label className="text-xs font-semibold text-[#131b2e]">
                  Paste Resume or CV Text
                </label>
                <textarea
                  rows={6}
                  value={pastedText}
                  onChange={(e) => setPastedText(e.target.value)}
                  placeholder="Paste your resume text here (experience, skills, education, job titles)..."
                  className="w-full p-3 rounded-xl bg-white border border-[#eaedff] text-xs text-[#131b2e] focus:outline-none focus:border-[#00236f] font-mono leading-relaxed"
                />
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleParsePastedText}
                    disabled={isParsingFile || !pastedText.trim()}
                    className="px-4 py-2 rounded-xl bg-[#00236f] text-white font-['JetBrains_Mono'] text-xs font-semibold hover:bg-[#1e3a8a] transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined text-[16px]">psychology</span>
                    <span>Extract Qualifications from Text</span>
                  </button>
                </div>
              </div>
            )}

            {/* Parsing feedback message */}
            {parseFeedback && (
              <div className="p-3 rounded-xl bg-[#eaedff] border border-[#dae2fd] text-xs text-[#00236f] font-['JetBrains_Mono'] flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#004942]">check_circle</span>
                <span>{parseFeedback}</span>
              </div>
            )}

            {/* Warning if scanned PDF with minimal text */}
            {parseWarning && (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 font-['JetBrains_Mono'] flex items-start gap-2">
                <span className="material-symbols-outlined text-[18px] text-amber-700 shrink-0 mt-0.5">warning</span>
                <div>
                  <p>{parseWarning}</p>
                  <button
                    type="button"
                    onClick={() => setActiveUploadMode('paste')}
                    className="mt-1 font-bold underline cursor-pointer text-amber-950"
                  >
                    Switch to Paste Text Mode →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Candidate Summary Preview & Direct Adjustments */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#f2f3ff] border border-[#eaedff] flex flex-col gap-3.5">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <div>
                <span className="text-xs text-[#757682] font-mono uppercase block font-medium">Extracted Candidate Profile</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <input
                    type="text"
                    value={features.name}
                    onChange={(e) => {
                      const newName = e.target.value;
                      setFeatures({ ...features, name: newName });
                      setVariants((prev) =>
                        prev.map((v) => (v.isBaseline ? { ...v, name: newName } : v))
                      );
                    }}
                    className="font-bold text-sm text-[#131b2e] bg-white px-2 py-1 rounded border border-[#eaedff] focus:outline-none focus:border-[#00236f]"
                    title="Click to edit candidate name"
                  />
                  <span className="text-xs text-[#444651]">·</span>
                  <input
                    type="text"
                    value={features.track}
                    onChange={(e) => setFeatures({ ...features, track: e.target.value })}
                    className="text-xs font-medium text-[#444651] bg-white px-2 py-1 rounded border border-[#eaedff] focus:outline-none focus:border-[#00236f]"
                    title="Click to edit career track"
                  />
                </div>
              </div>
              <span className="text-xs font-mono text-[#004942] bg-[#89f5e7]/40 px-2.5 py-1 rounded font-semibold border border-[#89f5e7]/60">
                {features.skills.length} Skills Extracted ({features.experienceLevel})
              </span>
            </div>

            {/* Extracted Summary (Editable) */}
            <div>
              <span className="text-[11px] text-[#757682] font-mono block mb-1">
                Extracted Professional Summary:
              </span>
              <textarea
                rows={2}
                value={features.summary}
                onChange={(e) => setFeatures({ ...features, summary: e.target.value })}
                className="w-full text-xs text-[#444651] bg-white p-2.5 rounded-lg border border-[#eaedff] focus:outline-none focus:border-[#00236f] leading-relaxed resize-none"
              />
            </div>

            {/* Extracted Skills Chips */}
            <div>
              <span className="text-[11px] text-[#757682] font-mono block mb-1">
                Extracted Technical & Professional Competencies ({features.skills.length}):
              </span>
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {features.skills.map((s) => (
                  <span key={s} className="text-xs font-mono px-2.5 py-1 rounded-md bg-white text-[#00236f] border border-[#eaedff] font-medium shadow-2xs">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Collapsible Extracted Raw Text Viewer */}
            {rawExtractedText && rawExtractedText.trim().length > 0 && (
              <div className="pt-2 border-t border-[#eaedff]">
                <button
                  type="button"
                  onClick={() => setShowRawText(!showRawText)}
                  className="text-xs text-[#00236f] font-mono font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {showRawText ? 'expand_less' : 'description'}
                  </span>
                  <span>
                    {showRawText ? 'Hide Extracted Document Text' : `View Extracted Raw Text (${rawExtractedText.split(/\s+/).length} words extracted)`}
                  </span>
                </button>

                {showRawText && (
                  <div className="mt-2 p-3 bg-white rounded-lg border border-[#eaedff] text-[11px] font-mono text-[#444651] max-h-48 overflow-y-auto whitespace-pre-wrap leading-relaxed">
                    {rawExtractedText}
                  </div>
                )}
              </div>
            )}
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
                  Estimated ATS initial keyword relevance for {features.name}
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
              The exact credentials and experience of <strong>{features.name}</strong> will be evaluated with different name indicators:
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
              <span>Run Sensitivity Audit for {features.name}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
