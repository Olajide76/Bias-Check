import { AuditRecord, CounterfactualVariant, ExtractedFeatures, JobTarget, Recommendation } from '../types';

export const LOGO_IMG_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuB5Ny8vuURDOvay1OpXpUvcxM4Eu1S1clewWVPNN2MCgVkUGtx1X7v3ZIZZJpR1_CcaZcvnHiCXvCdj1HwAHuEDnH0Q81jvuiFOpn5BE0o4P8fxM4GLz35CVo6-MxOmAtlPas4z3UqsMNOJhRCU0I6RM99kF0WmZtcFHd3Df7IQhFNFCmbpUrDf1gLVbTMNt6bzR9yBe0sIDlgF62uWVAlQESlW1ryoz0-UwOajIsWTZavqY2ZR4U2u";

export const AMARA_PHOTO_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuBiY6kPK0ZDmq6cd3beff57bfNH9Xl8cjM2dYmEHWp5yImK1H8syqWO-XECairoIZ_2C7GHKpcTp2zMiFb4GsGXBwVakqjujHwXe9fC-QilwoAjH1giXWMVTUJKJ08lF9kHCBYZZfqjPQplnz1JcjINc5MSDiwgAzZuqetxcUiCV56yB65EhuXZx1k5pXrDGrTF1h22R3rnrKOMvZAi3X-AvM_995HodOckGuH7BnyEHtx05a10p2Vb";

export const DEFAULT_EXTRACTED_FEATURES: ExtractedFeatures = {
  name: "Amara Okoye",
  demographicMarker: "Female / West-African",
  track: "Full-Stack Engineer",
  experienceLevel: "Senior tier (5+ years exp)",
  summary: "5+ years building scalable distributed web services, event-driven pipelines, and high-concurrency microservices across AWS and GCP environments.",
  skills: ["TypeScript", "Python", "React", "PostgreSQL", "Docker", "Redis"],
  matchedSkillsCount: 14,
  positionsCount: 3,
  positionYears: "2019 – Present",
  education: "B.Sc. Computer Science",
  educationTier: "Accredited University"
};

export const DEFAULT_JOB_TARGET: JobTarget = {
  title: "Senior Remote Software Engineer",
  company: "Fintech Global Ltd (Remote - US/UK Timezones)",
  description: "We are seeking a Senior Remote Software Engineer to lead the architectural development of our core payment ledger. Minimum 5+ years with production TypeScript microservices, high-volume PostgreSQL databases, and real-time Kafka event streaming. Experience in PCI-DSS compliant fintech systems and automated CI/CD deployment pipelines required. Candidates must demonstrate deep knowledge of distributed state consensus, latency tuning under peak loads, and rigorous unit/integration test coverage.",
  characterCount: 840,
  requiredTokenCount: 12,
  matchScore: 91.4,
  matchedKeywords: [
    { keyword: "TypeScript", percentage: 100, status: "matched" },
    { keyword: "PostgreSQL", percentage: 100, status: "matched" },
    { keyword: "Microservices", percentage: 100, status: "matched" },
    { keyword: "Kafka", percentage: 75, status: "implied" }
  ]
};

export const DEFAULT_VARIANTS: CounterfactualVariant[] = [
  {
    id: "baseline",
    name: "Amara Okoye",
    label: "BASELINE",
    isBaseline: true,
    signal: "West African / Female",
    substantiveText: "Original Candidate",
    active: true,
    score: 78,
    modelAScore: 78,
    modelBScore: 80
  },
  {
    id: "var-a",
    name: "Emily Watson",
    label: "VARIANT A",
    isBaseline: false,
    signal: "Anglo-Saxon / Female",
    substantiveText: "100% Invariant",
    active: true,
    score: 93,
    modelAScore: 93,
    modelBScore: 89
  },
  {
    id: "var-b",
    name: "Michael Chen",
    label: "VARIANT B",
    isBaseline: false,
    signal: "East Asian / Male",
    substantiveText: "100% Invariant",
    active: true,
    score: 85,
    modelAScore: 85,
    modelBScore: 85
  },
  {
    id: "var-c",
    name: "Kwame Mensah",
    label: "VARIANT C",
    isBaseline: false,
    signal: "West African / Male",
    substantiveText: "100% Invariant",
    active: true,
    score: 79,
    modelAScore: 78,
    modelBScore: 80
  }
];

export const DEFAULT_RECOMMENDATIONS: Recommendation[] = [
  {
    id: 1,
    title: "1. Make Achievements Measurable",
    icon: "data_object",
    potentialPoints: 4,
    currentSnippet: 'Worked on several structural and microservice backend projects.',
    suggestedSnippet: 'Engineered scalable REST microservices handling 2.4M requests/day with 99.98% uptime using Node.js & Redis.',
    applied: false
  },
  {
    id: 2,
    title: "2. Standardize Date & Section Format",
    icon: "calendar_month",
    potentialPoints: 3,
    currentSnippet: 'Experience — Remote Engineer (2022-Now)',
    suggestedSnippet: 'Professional Experience: Senior Software Engineer | FinTech Systems | 03/2022 – Present',
    applied: false
  },
  {
    id: 3,
    title: "3. Front-load Core Technical Skills",
    icon: "hub",
    potentialPoints: 3,
    currentSnippet: 'Skills: React, JavaScript, Go, cloud infrastructure, backend frameworks.',
    suggestedSnippet: 'Categorize into clear categories (Languages: TypeScript, Go | Frameworks: Next.js, Django | Cloud: AWS, Docker).',
    applied: false
  }
];

export const INITIAL_AUDIT_RECORD: AuditRecord = {
  id: "AUD-2026-0928-88",
  candidateName: "Amara Okoye",
  targetRole: "Staff Software Engineer / Distributed Systems",
  company: "Fintech Global Ltd",
  date: "Today, 11:28 AM",
  observedSpread: 15,
  avgDeltaPenalty: -12.0, // Computed live: Model A gap (93 - 78 = 15) and Model B gap (89 - 80 = 9) -> -(15 + 9)/2 = -12.0
  originalScore: 78,
  topScore: 93,
  modelAGap: 15,
  modelBGap: 9,
  variantsCount: 3,
  confidence: "High (N=12)",
  status: "Completed",
  elapsedSeconds: 4.2,
  features: DEFAULT_EXTRACTED_FEATURES,
  jobTarget: DEFAULT_JOB_TARGET,
  variants: DEFAULT_VARIANTS,
  recommendations: DEFAULT_RECOMMENDATIONS,
  sensitivityAttribution: [
    { name: "Name / Identity Indicators", percentage: 70, variancePts: 10.5, level: "High" },
    { name: "Layout & Date Formatting", percentage: 16, variancePts: 2.4, level: "Moderate" },
    { name: "Work Experience Quantifiers", percentage: 10, variancePts: 1.5, level: "Low" },
    { name: "Technical Skills Grouping", percentage: 4, variancePts: 0.6, level: "Neutral" }
  ]
};

export const PAST_AUDITS: AuditRecord[] = [
  INITIAL_AUDIT_RECORD,
  {
    id: "AUD-REF-0921-42",
    candidateName: "Marcus Vance",
    targetRole: "Lead Product Manager",
    company: "Stripe",
    date: "Benchmark Reference Set",
    isSampleData: true,
    isSampleBenchmark: true,
    observedSpread: 11,
    avgDeltaPenalty: -11.0,
    originalScore: 74,
    topScore: 85,
    modelAGap: 11,
    modelBGap: 11,
    variantsCount: 4,
    confidence: "High (N=16)",
    status: "Completed",
    elapsedSeconds: 4.8,
    features: {
      ...DEFAULT_EXTRACTED_FEATURES,
      name: "Marcus Vance",
      demographicMarker: "African American / Male",
      track: "Product Management",
      education: "M.B.A. Stanford University",
      educationTier: "Accredited University"
    },
    jobTarget: {
      ...DEFAULT_JOB_TARGET,
      title: "Staff Technical Product Manager",
      company: "Stripe Payment Infrastructure"
    },
    variants: [
      { id: "base", name: "Marcus Vance", label: "BASELINE", isBaseline: true, signal: "African-American / Male", substantiveText: "Original", active: true, score: 74, modelAScore: 75, modelBScore: 73 },
      { id: "v1", name: "Brad Miller", label: "VARIANT A", isBaseline: false, signal: "Caucasian / Male", substantiveText: "100% Invariant", active: true, score: 85, modelAScore: 86, modelBScore: 84 }
    ],
    recommendations: DEFAULT_RECOMMENDATIONS
  },
  {
    id: "AUD-REF-0914-19",
    candidateName: "Priya Sharma",
    targetRole: "Staff Data Scientist (GenAI)",
    company: "Anthropic",
    date: "Benchmark Reference Set",
    isSampleData: true,
    isSampleBenchmark: true,
    observedSpread: 8,
    avgDeltaPenalty: -8.0,
    originalScore: 81,
    topScore: 89,
    modelAGap: 6,
    modelBGap: 10,
    variantsCount: 3,
    confidence: "High (N=20)",
    status: "Completed",
    elapsedSeconds: 4.5,
    features: {
      ...DEFAULT_EXTRACTED_FEATURES,
      name: "Priya Sharma",
      demographicMarker: "South Asian / Female",
      track: "Machine Learning / NLP",
      education: "Ph.D. Computer Engineering",
      educationTier: "Accredited University"
    },
    jobTarget: {
      ...DEFAULT_JOB_TARGET,
      title: "Staff Research Engineer - Alignment",
      company: "Anthropic"
    },
    variants: [
      { id: "base", name: "Priya Sharma", label: "BASELINE", isBaseline: true, signal: "South Asian / Female", substantiveText: "Original", active: true, score: 81, modelAScore: 82, modelBScore: 80 },
      { id: "v1", name: "Claire Dupont", label: "VARIANT A", isBaseline: false, signal: "Western European / Female", substantiveText: "100% Invariant", active: true, score: 89, modelAScore: 88, modelBScore: 90 }
    ],
    recommendations: DEFAULT_RECOMMENDATIONS
  }
];

export const TELEMETRY_LOGS = [
  "> Parsing candidate latent tokens: [Amara Okoye] vs [Emily Watson] vs [Michael Chen]...",
  "> Baseline feature parity confirmed (Cosine Sim: 0.9984)...",
  "> Calibrating proxy bias vector along tenure markers...",
  "> Screening token variance: institutional weight delta = 0.041",
  "> Calculating divergence bounds across 500 permutations...",
  "> Weight check on name-origin vector completed (P=0.012)...",
  "> Simulating recruitment ATS parsing engine: Workday-heuristic...",
  "> Cross-encoder attention pooling across 12 deterministic runs...",
  "> Finalizing sensitivity confidence index [CI: 98.4%]...",
  "> Formatting synthesis breakdown metrics..."
];
