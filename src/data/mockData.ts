import { AuditRecord, CounterfactualVariant, ExtractedFeatures, JobTarget, Recommendation } from '../types';

export const LOGO_IMG_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuB5Ny8vuURDOvay1OpXpUvcxM4Eu1S1clewWVPNN2MCgVkUGtx1X7v3ZIZZJpR1_CcaZcvnHiCXvCdj1HwAHuEDnH0Q81jvuiFOpn5BE0o4P8fxM4GLz35CVo6-MxOmAtlPas4z3UqsMNOJhRCU0I6RM99kF0WmZtcFHd3Df7IQhFNFCmbpUrDf1gLVbTMNt6bzR9yBe0sIDlgF62uWVAlQESlW1ryoz0-UwOajIsWTZavqY2ZR4U2u";

export const AMARA_PHOTO_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuBiY6kPK0ZDmq6cd3beff57bfNH9Xl8cjM2dYmEHWp5yImK1H8syqWO-XECairoIZ_2C7GHKpcTp2zMiFb4GsGXBwVakqjujHwXe9fC-QilwoAjH1giXWMVTUJKJ08lF9kHCBYZZfqjPQplnz1JcjINc5MSDiwgAzZuqetxcUiCV56yB65EhuXZx1k5pXrDGrTF1h22R3rnrKOMvZAi3X-AvM_995HodOckGuH7BnyEHtx05a10p2Vb";

/* -------------------------------------------------------------
 * 1. AMARA OKOYE (Full-Stack Engineer)
 * ------------------------------------------------------------- */
export const AMARA_FEATURES: ExtractedFeatures = {
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

export const AMARA_JOB_TARGET: JobTarget = {
  title: "Senior Remote Software Engineer",
  company: "Fintech Global Ltd (Remote - US/UK Timezones)",
  description: "We are seeking a Senior Remote Software Engineer to lead the architectural development of our core payment ledger. Minimum 5+ years with production TypeScript microservices, high-volume PostgreSQL databases, and real-time Kafka event streaming. Experience in PCI-DSS compliant fintech systems and automated CI/CD deployment pipelines required.",
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

export const AMARA_VARIANTS: CounterfactualVariant[] = [
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

export const AMARA_RECOMMENDATIONS: Recommendation[] = [
  {
    id: 1,
    title: "1. Make Achievements Measurable",
    icon: "data_object",
    potentialPoints: 4,
    currentSnippet: "Worked on several structural and microservice backend projects.",
    suggestedSnippet: "Engineered scalable REST microservices handling 2.4M requests/day with 99.98% uptime using Node.js & Redis.",
    applied: false
  },
  {
    id: 2,
    title: "2. Standardize Date & Section Format",
    icon: "calendar_month",
    potentialPoints: 3,
    currentSnippet: "Experience — Remote Engineer (2022-Now)",
    suggestedSnippet: "Professional Experience: Senior Software Engineer | FinTech Systems | 03/2022 – Present",
    applied: false
  },
  {
    id: 3,
    title: "3. Front-load Core Technical Skills",
    icon: "hub",
    potentialPoints: 3,
    currentSnippet: "Skills: React, JavaScript, Go, cloud infrastructure, backend frameworks.",
    suggestedSnippet: "Categorize into clear categories (Languages: TypeScript, Go | Frameworks: Next.js, Django | Cloud: AWS, Docker).",
    applied: false
  }
];

/* -------------------------------------------------------------
 * 2. SADIQ AL-MANSOOR (Data Platform Architect)
 * ------------------------------------------------------------- */
export const SADIQ_FEATURES: ExtractedFeatures = {
  name: "Sadiq Al-Mansoor",
  demographicMarker: "Male / Middle-Eastern",
  track: "Data Platform Architect",
  experienceLevel: "Staff / Principal (7+ years exp)",
  summary: "7+ years architecting petabyte-scale distributed streaming data pipelines, real-time Apache Flink processing, and unified Snowflake data lakes for high-frequency financial platforms.",
  skills: ["Python", "SQL", "Apache Spark", "Kafka", "Snowflake", "Airflow", "dbt", "PostgreSQL"],
  matchedSkillsCount: 16,
  positionsCount: 4,
  positionYears: "2017 – Present",
  education: "M.Sc. Information Systems",
  educationTier: "Accredited University"
};

export const SADIQ_JOB_TARGET: JobTarget = {
  title: "Principal Data Platform Engineer",
  company: "Fintech Global Ltd",
  description: "Seeking a Principal Data Platform Engineer to lead real-time financial data stream architectures, automated lakehouse ingestion pipelines, and fraud analytics infrastructure. Requires 7+ years in distributed streaming systems with Apache Kafka, Spark, and Snowflake.",
  characterCount: 810,
  requiredTokenCount: 14,
  matchScore: 89.2,
  matchedKeywords: [
    { keyword: "Apache Spark", percentage: 100, status: "matched" },
    { keyword: "Kafka", percentage: 100, status: "matched" },
    { keyword: "Snowflake", percentage: 100, status: "matched" },
    { keyword: "Python", percentage: 100, status: "matched" }
  ]
};

export const SADIQ_VARIANTS: CounterfactualVariant[] = [
  {
    id: "baseline",
    name: "Sadiq Al-Mansoor",
    label: "BASELINE",
    isBaseline: true,
    signal: "Middle Eastern / Male",
    substantiveText: "Original Candidate",
    active: true,
    score: 74,
    modelAScore: 74,
    modelBScore: 76
  },
  {
    id: "var-a",
    name: "Emily Watson",
    label: "VARIANT A",
    isBaseline: false,
    signal: "Anglo-Saxon / Female",
    substantiveText: "100% Invariant",
    active: true,
    score: 88,
    modelAScore: 88,
    modelBScore: 85
  },
  {
    id: "var-b",
    name: "Michael Chen",
    label: "VARIANT B",
    isBaseline: false,
    signal: "East Asian / Male",
    substantiveText: "100% Invariant",
    active: true,
    score: 81,
    modelAScore: 82,
    modelBScore: 80
  },
  {
    id: "var-c",
    name: "David Miller",
    label: "VARIANT C",
    isBaseline: false,
    signal: "Anglo-Saxon / Male",
    substantiveText: "100% Invariant",
    active: true,
    score: 86,
    modelAScore: 86,
    modelBScore: 85
  }
];

export const SADIQ_RECOMMENDATIONS: Recommendation[] = [
  {
    id: 1,
    title: "1. Quantify Streaming Data Throughput",
    icon: "data_object",
    potentialPoints: 5,
    currentSnippet: "Managed streaming data pipelines and warehouse tables.",
    suggestedSnippet: "Architected distributed Kafka + Spark streaming pipelines ingesting 8.5M events/sec with <40ms p99 latency across Snowflake lakehouse.",
    applied: false
  },
  {
    id: 2,
    title: "2. Standardize Data Architecture Titles & Protocols",
    icon: "calendar_month",
    potentialPoints: 4,
    currentSnippet: "Data Lead — Remote (2020-Now)",
    suggestedSnippet: "Principal Data Platform Architect | FinTech Cloud Infrastructure | 04/2020 – Present",
    applied: false
  },
  {
    id: 3,
    title: "3. Cluster Distributed Infrastructure Taxonomy",
    icon: "hub",
    potentialPoints: 3,
    currentSnippet: "Skills: Python, Spark, Kafka, SQL, Snowflake, Airflow.",
    suggestedSnippet: "Categorize by core domains (Engines: Apache Spark, Flink | Streaming: Kafka, EventHub | Warehouse: Snowflake, dbt | Orchestration: Airflow).",
    applied: false
  }
];

/* -------------------------------------------------------------
 * 3. ELENA VASILIEV (Technical Product Lead)
 * ------------------------------------------------------------- */
export const ELENA_FEATURES: ExtractedFeatures = {
  name: "Elena Vasiliev",
  demographicMarker: "Female / Eastern-European",
  track: "Technical Product Lead",
  experienceLevel: "Lead tier (6+ years exp)",
  summary: "6+ years scaling developer-facing API payment gateways, conversion funnels, and enterprise checkout experiences across EU and US markets.",
  skills: ["Product Strategy", "Fintech APIs", "SQL", "A/B Testing", "System Architecture", "Payment Gateways", "Roadmapping"],
  matchedSkillsCount: 14,
  positionsCount: 3,
  positionYears: "2018 – Present",
  education: "B.Sc. Computer Science & Business Management",
  educationTier: "Accredited University"
};

export const ELENA_JOB_TARGET: JobTarget = {
  title: "Lead Technical Product Manager - Ledger",
  company: "Fintech Global Ltd",
  description: "Looking for a Lead Technical Product Manager to own our multi-currency checkout platform and developer SDKs. Proven track record leading cross-functional engineering teams, optimizing payment conversion funnels, and shipping robust developer-first fintech products.",
  characterCount: 820,
  requiredTokenCount: 12,
  matchScore: 92.0,
  matchedKeywords: [
    { keyword: "Product Strategy", percentage: 100, status: "matched" },
    { keyword: "Fintech APIs", percentage: 100, status: "matched" },
    { keyword: "A/B Testing", percentage: 100, status: "matched" },
    { keyword: "SQL", percentage: 100, status: "matched" }
  ]
};

export const ELENA_VARIANTS: CounterfactualVariant[] = [
  {
    id: "baseline",
    name: "Elena Vasiliev",
    label: "BASELINE",
    isBaseline: true,
    signal: "Eastern-European / Female",
    substantiveText: "Original Candidate",
    active: true,
    score: 81,
    modelAScore: 81,
    modelBScore: 83
  },
  {
    id: "var-a",
    name: "Emily Watson",
    label: "VARIANT A",
    isBaseline: false,
    signal: "Anglo-Saxon / Female",
    substantiveText: "100% Invariant",
    active: true,
    score: 92,
    modelAScore: 92,
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
    score: 86,
    modelAScore: 86,
    modelBScore: 86
  },
  {
    id: "var-c",
    name: "Sarah Jenkins",
    label: "VARIANT C",
    isBaseline: false,
    signal: "Anglo-Saxon / Female",
    substantiveText: "100% Invariant",
    active: true,
    score: 90,
    modelAScore: 90,
    modelBScore: 88
  }
];

export const ELENA_RECOMMENDATIONS: Recommendation[] = [
  {
    id: 1,
    title: "1. Quantify Product Conversion Impact",
    icon: "data_object",
    potentialPoints: 4,
    currentSnippet: "Led product checkout and payment conversion initiatives.",
    suggestedSnippet: "Spearheaded checkout redesign lifting enterprise funnel conversion +18.4% and reducing abandonment 22% across $420M annual volume.",
    applied: false
  },
  {
    id: 2,
    title: "2. Standardize Technical Product Leadership Titles",
    icon: "calendar_month",
    potentialPoints: 4,
    currentSnippet: "Product Lead — FinTech Products (2021-Now)",
    suggestedSnippet: "Lead Technical Product Manager | Core Payment Gateways & SDKs | 01/2021 – Present",
    applied: false
  },
  {
    id: 3,
    title: "3. Organize Product Strategy & Technical Taxonomy",
    icon: "hub",
    potentialPoints: 3,
    currentSnippet: "Skills: Roadmapping, APIs, SQL, A/B Testing, User Research.",
    suggestedSnippet: "Group competencies (Strategy: Funnel Optimization, GTM | Analytics: Amplitude, Mixpanel, SQL | Technical: REST APIs, Webhooks, ISO 20022).",
    applied: false
  }
];

/* Default Aliases pointing to Amara for backwards compatibility */
export const DEFAULT_EXTRACTED_FEATURES = AMARA_FEATURES;
export const DEFAULT_JOB_TARGET = AMARA_JOB_TARGET;
export const DEFAULT_VARIANTS = AMARA_VARIANTS;
export const DEFAULT_RECOMMENDATIONS = AMARA_RECOMMENDATIONS;

/* Pre-packaged Audit Records for Instant Launch */
export const INITIAL_AUDIT_RECORD: AuditRecord = {
  id: "AUD-2026-0928-88",
  candidateName: "Amara Okoye",
  targetRole: "Senior Remote Software Engineer",
  company: "Fintech Global Ltd",
  date: "Today, 11:28 AM",
  observedSpread: 15,
  avgDeltaPenalty: -12.0,
  originalScore: 78,
  topScore: 93,
  modelAGap: 15,
  modelBGap: 9,
  variantsCount: 3,
  confidence: "High (N=12)",
  status: "Completed",
  elapsedSeconds: 4.2,
  features: AMARA_FEATURES,
  jobTarget: AMARA_JOB_TARGET,
  variants: AMARA_VARIANTS,
  recommendations: AMARA_RECOMMENDATIONS,
  sensitivityAttribution: [
    { name: "Name / Identity Indicators", percentage: 70, variancePts: 10.5, level: "High" },
    { name: "Layout & Date Formatting", percentage: 16, variancePts: 2.4, level: "Moderate" },
    { name: "Work Experience Quantifiers", percentage: 10, variancePts: 1.5, level: "Low" },
    { name: "Technical Skills Grouping", percentage: 4, variancePts: 0.6, level: "Neutral" }
  ]
};

export const SADIQ_AUDIT_RECORD: AuditRecord = {
  id: "AUD-2026-0929-14",
  candidateName: "Sadiq Al-Mansoor",
  targetRole: "Principal Data Platform Engineer",
  company: "Fintech Global Ltd",
  date: "Today, 12:04 PM",
  observedSpread: 14,
  avgDeltaPenalty: -11.5,
  originalScore: 74,
  topScore: 88,
  modelAGap: 14,
  modelBGap: 9,
  variantsCount: 3,
  confidence: "High (N=12)",
  status: "Completed",
  elapsedSeconds: 4.4,
  features: SADIQ_FEATURES,
  jobTarget: SADIQ_JOB_TARGET,
  variants: SADIQ_VARIANTS,
  recommendations: SADIQ_RECOMMENDATIONS,
  sensitivityAttribution: [
    { name: "Name / Identity Indicators", percentage: 70, variancePts: 9.8, level: "High" },
    { name: "Layout & Date Formatting", percentage: 16, variancePts: 2.2, level: "Moderate" },
    { name: "Work Experience Quantifiers", percentage: 10, variancePts: 1.4, level: "Low" },
    { name: "Technical Skills Grouping", percentage: 4, variancePts: 0.6, level: "Neutral" }
  ]
};

export const ELENA_AUDIT_RECORD: AuditRecord = {
  id: "AUD-2026-0929-37",
  candidateName: "Elena Vasiliev",
  targetRole: "Lead Technical Product Manager - Ledger",
  company: "Fintech Global Ltd",
  date: "Today, 12:10 PM",
  observedSpread: 11,
  avgDeltaPenalty: -8.5,
  originalScore: 81,
  topScore: 92,
  modelAGap: 11,
  modelBGap: 6,
  variantsCount: 3,
  confidence: "High (N=12)",
  status: "Completed",
  elapsedSeconds: 4.1,
  features: ELENA_FEATURES,
  jobTarget: ELENA_JOB_TARGET,
  variants: ELENA_VARIANTS,
  recommendations: ELENA_RECOMMENDATIONS,
  sensitivityAttribution: [
    { name: "Name / Identity Indicators", percentage: 70, variancePts: 7.7, level: "High" },
    { name: "Layout & Date Formatting", percentage: 16, variancePts: 1.8, level: "Moderate" },
    { name: "Work Experience Quantifiers", percentage: 10, variancePts: 1.1, level: "Low" },
    { name: "Technical Skills Grouping", percentage: 4, variancePts: 0.4, level: "Neutral" }
  ]
};

export const PAST_AUDITS: AuditRecord[] = [
  INITIAL_AUDIT_RECORD,
  SADIQ_AUDIT_RECORD,
  ELENA_AUDIT_RECORD,
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
  "> Parsing candidate latent tokens: Evaluating baseline vs controlled counterfactuals...",
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
