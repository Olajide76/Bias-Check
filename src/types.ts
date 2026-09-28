export type TabType = 'overview' | 'new-audit' | 'running' | 'report' | 'history' | 'methodology' | 'about';

export interface ExtractedFeatures {
  name: string;
  demographicMarker: string;
  track: string;
  experienceLevel: string;
  summary: string;
  skills: string[];
  matchedSkillsCount: number;
  positionsCount: number;
  positionYears: string;
  education: string;
  educationTier: string;
}

export interface JobTarget {
  title: string;
  company: string;
  description: string;
  characterCount: number;
  requiredTokenCount: number;
  matchScore: number;
  matchedKeywords: { keyword: string; percentage: number; status: 'matched' | 'implied' }[];
}

export interface CounterfactualVariant {
  id: string;
  name: string;
  label: string;
  isBaseline: boolean;
  signal: string;
  substantiveText: string;
  active: boolean;
  score: number;
  modelAScore: number; // ResumeMatch-Open
  modelBScore: number; // ScreenRank-Open
}

export interface Recommendation {
  id: number;
  title: string;
  icon: string;
  potentialPoints: number;
  currentSnippet: string;
  suggestedSnippet: string;
  applied: boolean;
}

export interface AuditRecord {
  id: string;
  candidateName: string;
  targetRole: string;
  company: string;
  date: string;
  observedSpread: number;
  avgDeltaPenalty: number;
  originalScore: number;
  topScore: number;
  variantsCount: number;
  confidence: string;
  status: 'Completed' | 'Optimized';
  features: ExtractedFeatures;
  jobTarget: JobTarget;
  variants: CounterfactualVariant[];
  recommendations: Recommendation[];
}
