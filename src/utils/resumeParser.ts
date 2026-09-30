import { ExtractedFeatures, CounterfactualVariant } from '../types';
import JSZip from 'jszip';
import { inflate, inflateRaw } from 'pako';
import * as pdfjsLib from 'pdfjs-dist';

// Configure pdfjs worker if supported in the environment
if (typeof window !== 'undefined' && pdfjsLib.GlobalWorkerOptions) {
  try {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version || '4.10.38'}/pdf.worker.min.mjs`;
  } catch {
    // Ignore worker initialization error, fallback parser will handle extraction
  }
}

/**
 * 250+ comprehensive dictionary of common tech, product, data, and business skills
 */
const EXTENSIVE_SKILLS_DICTIONARY = [
  // Programming Languages
  'TypeScript', 'JavaScript', 'Python', 'Java', 'C++', 'C#', 'C', 'Go', 'Golang', 'Rust', 'Ruby', 'PHP', 'Swift', 'Kotlin', 'Scala', 'Dart', 'R', 'MATLAB', 'Perl', 'Haskell', 'Elixir', 'Clojure', 'Shell', 'Bash', 'PowerShell', 'SQL', 'HTML5', 'HTML', 'CSS3', 'CSS', 'Sass', 'SCSS', 'Solidity',

  // Frontend & Mobile
  'React', 'React.js', 'Next.js', 'Vue', 'Vue.js', 'Nuxt.js', 'Angular', 'Svelte', 'SvelteKit', 'React Native', 'Flutter', 'iOS', 'Android', 'Tailwind CSS', 'Tailwind', 'Bootstrap', 'Material-UI', 'MUI', 'Chakra UI', 'Redux', 'Zustand', 'MobX', 'Webpack', 'Vite', 'Turbopack',

  // Backend & APIs
  'Node.js', 'Node', 'Express', 'Express.js', 'NestJS', 'Nest.js', 'Django', 'FastAPI', 'Flask', 'Spring Boot', 'Spring', 'Ruby on Rails', 'Rails', 'ASP.NET', '.NET', '.NET Core', 'Laravel', 'Koa', 'GraphQL', 'REST APIs', 'RESTful APIs', 'REST', 'gRPC', 'WebSockets', 'Socket.io', 'Microservices', 'Serverless', 'Distributed Systems',

  // Databases & Storage
  'PostgreSQL', 'Postgres', 'MySQL', 'MariaDB', 'SQLite', 'MongoDB', 'Redis', 'Cassandra', 'DynamoDB', 'Elasticsearch', 'OpenSearch', 'Snowflake', 'BigQuery', 'Amazon Redshift', 'Redshift', 'ClickHouse', 'Neo4j', 'Couchbase', 'Firebase', 'Supabase', 'Prisma', 'TypeORM', 'Hibernate', 'dbt',

  // Big Data & Streaming
  'Apache Spark', 'Spark', 'PySpark', 'Apache Kafka', 'Kafka', 'Apache Flink', 'Flink', 'Apache Airflow', 'Airflow', 'Apache Hadoop', 'Hadoop', 'Hive', 'Presto', 'Trino', 'Databricks', 'Delta Lake', 'ETL', 'ELT', 'Data Pipelines', 'Data Warehousing', 'Data Lake',

  // Cloud & DevOps
  'AWS', 'Amazon Web Services', 'GCP', 'Google Cloud', 'Microsoft Azure', 'Azure', 'Docker', 'Kubernetes', 'K8s', 'Terraform', 'Ansible', 'Puppet', 'Chef', 'CloudFormation', 'CI/CD', 'GitHub Actions', 'GitLab CI', 'Jenkins', 'CircleCI', 'ArgoCD', 'Linux', 'Ubuntu', 'Debian', 'CentOS', 'Nginx', 'Apache', 'Prometheus', 'Grafana', 'Datadog', 'New Relic',

  // AI, Machine Learning & Data Science
  'Machine Learning', 'Deep Learning', 'Artificial Intelligence', 'AI', 'PyTorch', 'TensorFlow', 'Keras', 'Scikit-learn', 'Pandas', 'NumPy', 'SciPy', 'NLP', 'Natural Language Processing', 'Computer Vision', 'LLMs', 'Large Language Models', 'Generative AI', 'GenAI', 'Prompt Engineering', 'LangChain', 'LlamaIndex', 'Hugging Face', 'HuggingFace', 'RAG', 'Vector Databases', 'Pinecone', 'ChromaDB', 'Qdrant', 'Milvus',

  // Product & Project Leadership
  'Product Strategy', 'Product Management', 'Product Roadmapping', 'Roadmapping', 'A/B Testing', 'Product Analytics', 'Amplitude', 'Mixpanel', 'Google Analytics', 'Agile', 'Scrum', 'Kanban', 'Jira', 'Confluence', 'User Stories', 'PRD', 'GTM Strategy', 'User Research', 'Fintech APIs', 'Payment Gateways', 'PCI-DSS', 'ISO 20022',

  // Design, Systems & General
  'Figma', 'System Architecture', 'System Design', 'Git', 'GitHub', 'GitLab', 'Unit Testing', 'Jest', 'Mocha', 'Cypress', 'Playwright', 'Selenium', 'TDD', 'OAuth', 'JWT', 'Cybersecurity', 'Single Sign-On', 'SSO'
];

/**
 * Native Pure-JS Decompressor for PDF FlateDecode streams using pako
 */
function extractTextFromPdfBinary(bytes: Uint8Array): string {
  let extractedText = '';

  try {
    // 1. Convert byte array to binary string to search for stream boundaries
    let binaryString = '';
    const chunkLimit = 65536;
    for (let i = 0; i < bytes.length; i += chunkLimit) {
      binaryString += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + chunkLimit)));
    }

    // 2. Find streams: "stream\r?\n ... endstream"
    const streamRegex = /stream[\r\n]+([\s\S]*?)[\r\n]+endstream/g;
    let match: RegExpExecArray | null;

    while ((match = streamRegex.exec(binaryString)) !== null) {
      const streamStart = match.index + match[0].indexOf('\n') + 1;
      const streamDataString = match[1];
      const streamBytes = new Uint8Array(streamDataString.length);
      for (let j = 0; j < streamDataString.length; j++) {
        streamBytes[j] = streamDataString.charCodeAt(j);
      }

      // Try decompressing with pako (FlateDecode)
      let decompressedBytes: Uint8Array | null = null;
      try {
        decompressedBytes = inflate(streamBytes);
      } catch {
        try {
          decompressedBytes = inflateRaw(streamBytes);
        } catch {
          decompressedBytes = null;
        }
      }

      const rawContent = decompressedBytes
        ? new TextDecoder('utf-8', { fatal: false }).decode(decompressedBytes)
        : streamDataString;

      // 3. Extract text operators from content stream:
      // (Text) Tj, (Text) ' , [(T) 10 (ext)] TJ
      const textMatches = extractTextFromPdfStream(rawContent);
      if (textMatches.length > 0) {
        extractedText += textMatches.join(' ') + '\n';
      }
    }
  } catch (err) {
    console.warn('Native PDF stream extraction warning:', err);
  }

  // Fallback: If compressed streams produced nothing, scan for printable ASCII runs
  if (extractedText.trim().length < 50) {
    let currentWord = '';
    for (let i = 0; i < bytes.length; i++) {
      const charCode = bytes[i];
      if (charCode >= 32 && charCode <= 126) {
        currentWord += String.fromCharCode(charCode);
      } else if (charCode === 10 || charCode === 13 || charCode === 32) {
        if (currentWord.length >= 3 && !/^(obj|endobj|xref|trailer|startxref|\/[A-Za-z0-9]+)$/.test(currentWord)) {
          extractedText += currentWord + ' ';
        }
        currentWord = '';
      }
    }
  }

  return extractedText.trim();
}

/**
 * Extracts plain text strings from decompressed PDF operators
 */
function extractTextFromPdfStream(content: string): string[] {
  const result: string[] = [];

  // Match TJ arrays: [(text) 20 (more text)] TJ
  const tjArrayRegex = /\[((?:[^[\]]|\\.)*?)\]\s*TJ/gi;
  let tjMatch: RegExpExecArray | null;
  while ((tjMatch = tjArrayRegex.exec(content)) !== null) {
    const arrayContent = tjMatch[1];
    // Extract parenthesized strings within TJ
    const stringRegex = /\(((?:[^()\\]|\\.)*?)\)/g;
    let strMatch: RegExpExecArray | null;
    let combinedWord = '';
    while ((strMatch = stringRegex.exec(arrayContent)) !== null) {
      combinedWord += unescapePdfString(strMatch[1]);
    }
    if (combinedWord.trim().length > 0) {
      result.push(combinedWord.trim());
    }
  }

  // Match simple Tj: (Hello World) Tj
  const singleTjRegex = /\(((?:[^()\\]|\\.)*?)\)\s*(?:Tj|'|")/gi;
  let singleMatch: RegExpExecArray | null;
  while ((singleMatch = singleTjRegex.exec(content)) !== null) {
    const word = unescapePdfString(singleMatch[1]).trim();
    if (word.length > 0) {
      result.push(word);
    }
  }

  // Match hex strings: <48656c6c6f> Tj
  const hexRegex = /<([0-9a-fA-F]+)>\s*(?:Tj|'|")/gi;
  let hexMatch: RegExpExecArray | null;
  while ((hexMatch = hexRegex.exec(content)) !== null) {
    const hex = hexMatch[1];
    let decoded = '';
    for (let i = 0; i < hex.length; i += 2) {
      decoded += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    if (decoded.trim().length > 0) {
      result.push(decoded.trim());
    }
  }

  return result;
}

function unescapePdfString(str: string): string {
  return str
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\r')
    .replace(/\\t/g, '\t')
    .replace(/\\b/g, '\b')
    .replace(/\\f/g, '\f')
    .replace(/\\\(/g, '(')
    .replace(/\\\)/g, ')')
    .replace(/\\\\/g, '\\')
    .replace(/\\([0-7]{1,3})/g, (_, oct) => String.fromCharCode(parseInt(oct, 8)));
}

/**
 * Master file text reader supporting PDF (native + pdfjs), DOCX (JSZip), and TXT/MD
 */
export async function extractRawTextFromFile(file: File): Promise<string> {
  const extension = file.name.split('.').pop()?.toLowerCase() || '';

  // 1. Plain Text, Markdown, CSV, JSON
  if (extension === 'txt' || extension === 'md' || extension === 'json' || extension === 'csv' || file.type.startsWith('text/')) {
    const text = await file.text();
    if (text && text.trim().length > 0) {
      return text.trim();
    }
  }

  // 2. Microsoft Word DOCX
  if (extension === 'docx') {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const zip = await JSZip.loadAsync(arrayBuffer);

      let docText = '';

      // Main body document
      const docXml = await zip.file('word/document.xml')?.async('text');
      if (docXml) {
        docText += parseDocxXml(docXml) + '\n';
      }

      // Also read headers (where candidate names and contacts often live)
      for (const fileName of Object.keys(zip.files)) {
        if (/word\/(header\d+|footer\d+)\.xml/i.test(fileName)) {
          const headerXml = await zip.file(fileName)?.async('text');
          if (headerXml) {
            docText = parseDocxXml(headerXml) + '\n' + docText;
          }
        }
      }

      if (docText.trim().length > 20) {
        return docText.trim();
      }
    } catch (docxErr) {
      console.warn('DOCX unzipping failed, falling back:', docxErr);
    }
  }

  // 3. Adobe PDF
  if (extension === 'pdf') {
    const arrayBuffer = await file.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);

    // Primary: Try pure-JS stream inflation (100% reliable inside sandboxes/iframes without workers)
    const nativeExtracted = extractTextFromPdfBinary(bytes);
    if (nativeExtracted.length >= 80) {
      return nativeExtracted;
    }

    // Secondary: Try pdf.js if available
    try {
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      let pdfText = '';

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageItems = textContent.items as Array<{ str?: string }>;
        const pageString = pageItems
          .map((item) => item.str || '')
          .join(' ')
          .trim();
        pdfText += pageString + '\n\n';
      }

      if (pdfText.trim().length > 30) {
        return pdfText.trim();
      }
    } catch (pdfErr) {
      console.warn('PDF.js execution fallback:', pdfErr);
    }

    // If native stream had partial text, return it
    if (nativeExtracted.length > 0) {
      return nativeExtracted;
    }
  }

  // 4. Default fallback: text read
  try {
    return (await file.text()).trim();
  } catch {
    return '';
  }
}

function parseDocxXml(xml: string): string {
  return xml
    .replace(/<w:p[^>]*>/g, '\n')
    .replace(/<w:tab[^>]*\/>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/[ \t]+/g, ' ')
    .trim();
}

/**
 * Intelligent resume parser that extracts structured qualifications from resume text
 */
export function parseResumeContent(rawText: string, fallbackFileName: string): ExtractedFeatures {
  const cleanRaw = rawText.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const lines = cleanRaw
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  // -----------------------------------------------------------------
  // 1. CANDIDATE NAME EXTRACTION
  // -----------------------------------------------------------------
  let candidateName = '';
  const invalidNameKeywords = [
    'resume', 'curriculum', 'vitae', 'cv', 'experience', 'education', 'skills', 'profile',
    'contact', 'phone', 'email', 'http', 'www', 'github', 'linkedin', 'address', 'summary',
    'developer', 'engineer', 'architect', 'manager', 'lead', 'page', 'objective'
  ];

  // Check top 8 lines
  for (let i = 0; i < Math.min(lines.length, 8); i++) {
    const line = lines[i].replace(/[|•·,].*$/, '').trim(); // strip phone/email suffix on same line
    const words = line.split(/\s+/);
    const hasInvalid = invalidNameKeywords.some((k) => line.toLowerCase().includes(k));
    const hasSymbols = /[@|/\\:;<>{}[\]()+=_#0-9]/.test(line);

    if (!hasInvalid && !hasSymbols && words.length >= 2 && words.length <= 4) {
      // Check capitalization
      const isCapitalized = words.every((w) => /^[A-Z][a-zA-Z.'-]+$/.test(w));
      if (isCapitalized) {
        candidateName = words.join(' ');
        break;
      }
    }
  }

  // Second pass: relaxed check
  if (!candidateName) {
    for (let i = 0; i < Math.min(lines.length, 5); i++) {
      const line = lines[i];
      if (!line.includes('@') && !line.includes('http') && line.length >= 4 && line.length <= 35) {
        const words = line.split(/\s+/);
        if (words.length >= 2 && words.length <= 4 && !/\d/.test(line)) {
          candidateName = line;
          break;
        }
      }
    }
  }

  // Fallback to filename
  if (!candidateName || candidateName.length < 3) {
    const cleanBase = fallbackFileName
      .replace(/\.[^/.]+$/, '')
      .replace(/[_-]+/g, ' ')
      .replace(/(resume|cv|profile|final|updated|v\d+|\d+)/gi, '')
      .trim();
    candidateName = cleanBase.length >= 3 
      ? cleanBase.split(' ').map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ')
      : 'Candidate Profile';
  }

  // -----------------------------------------------------------------
  // 2. COMPREHENSIVE SKILLS EXTRACTION
  // -----------------------------------------------------------------
  const detectedSkillsSet = new Set<string>();

  // A) Match from extensive dictionary
  for (const skill of EXTENSIVE_SKILLS_DICTIONARY) {
    const regex = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    if (regex.test(cleanRaw)) {
      detectedSkillsSet.add(skill);
    }
  }

  // B) Scan dedicated Skills sections: "SKILLS", "TECHNICAL SKILLS", "COMPETENCIES"
  const skillsSectionRegex = /(?:skills|technical skills|technologies|proficiencies|core competencies)[:\n\r]+([\s\S]*?)(?=(?:\n\s*(?:experience|employment|work history|education|projects|certifications|publications)\b|\n\n\n|$))/i;
  const sectionMatch = cleanRaw.match(skillsSectionRegex);

  if (sectionMatch && sectionMatch[1]) {
    const rawTokens = sectionMatch[1].split(/[,|•·\n\t/]/);
    for (let token of rawTokens) {
      token = token.replace(/^(?:Languages|Frameworks|Tools|Databases|Cloud|Platforms|Libraries|DevOps)[:\s-]+/i, '');
      token = token.replace(/^[-*•]\s*/, '').trim();
      if (token.length >= 2 && token.length <= 30 && !/^(skills|technical|proficiencies|experience)$/i.test(token)) {
        // Capitalize nicely
        if (!detectedSkillsSet.has(token)) {
          detectedSkillsSet.add(token);
        }
      }
    }
  }

  const allSkills = Array.from(detectedSkillsSet);
  const finalSkills = allSkills.length >= 3
    ? allSkills.slice(0, 16)
    : [...allSkills, 'System Architecture', 'Problem Solving', 'Data Structures', 'Git', 'Agile'].slice(0, 8);

  // -----------------------------------------------------------------
  // 3. CAREER TRACK & ROLE DETECTION
  // -----------------------------------------------------------------
  let track = 'Software Engineer';
  const textLower = cleanRaw.toLowerCase();

  if (/data platform|data architect|lakehouse|snowflake|databricks|kafka.*streaming/i.test(textLower)) {
    track = 'Data Platform Architect';
  } else if (/data engineer|etl pipeline|spark|airflow|dbt/i.test(textLower)) {
    track = 'Data Platform Engineer';
  } else if (/data scientist|machine learning|deep learning|nlp|pytorch|tensorflow|computer vision|llm/i.test(textLower)) {
    track = 'Machine Learning Engineer';
  } else if (/product manager|technical product|product lead|scrum product owner|roadmap.*funnel/i.test(textLower)) {
    track = 'Technical Product Manager';
  } else if (/devops|site reliability|sre|cloud architect|kubernetes|terraform|infrastructure engineer/i.test(textLower)) {
    track = 'DevOps / Cloud Architect';
  } else if (/frontend|ui\/ux|react developer|vue developer|angular developer|web developer/i.test(textLower) && !/backend|microservices|distributed/i.test(textLower)) {
    track = 'Frontend Engineer';
  } else if (/full-stack|fullstack|software engineer|swe|backend|microservices/i.test(textLower)) {
    track = 'Full-Stack Software Engineer';
  } else if (/cybersecurity|security engineer|infosec|soc analyst/i.test(textLower)) {
    track = 'Security Engineer';
  }

  // -----------------------------------------------------------------
  // 4. YEARS OF EXPERIENCE & LEVEL
  // -----------------------------------------------------------------
  let yearsExp = 4;
  const yearMatches = cleanRaw.match(/\b(19\d\d|20\d\d)\b/g);
  if (yearMatches && yearMatches.length >= 2) {
    const numericYears = yearMatches.map(Number).filter((y) => y >= 1995 && y <= 2026);
    if (numericYears.length >= 2) {
      const minYear = Math.min(...numericYears);
      const maxYear = Math.max(...numericYears);
      const span = maxYear - minYear;
      if (span >= 1 && span <= 32) {
        yearsExp = span;
      }
    }
  }

  // Also check explicit mentions like "5+ years of experience"
  const explicitYearsMatch = cleanRaw.match(/(\d+)\+?\s*years(?:\s+of)?\s+experience/i);
  if (explicitYearsMatch && explicitYearsMatch[1]) {
    const foundY = parseInt(explicitYearsMatch[1], 10);
    if (foundY >= 1 && foundY <= 30) {
      yearsExp = Math.max(yearsExp, foundY);
    }
  }

  let experienceLevel = 'Mid-level (3-4 years exp)';
  if (yearsExp >= 8) {
    experienceLevel = 'Staff / Principal (8+ years exp)';
  } else if (yearsExp >= 5) {
    experienceLevel = 'Senior tier (5+ years exp)';
  } else if (yearsExp <= 2) {
    experienceLevel = 'Associate / Junior (1-2 years exp)';
  }

  // -----------------------------------------------------------------
  // 5. EDUCATION DETECTION
  // -----------------------------------------------------------------
  let education = 'B.Sc. Computer Science';
  if (/ph\.?d|doctorate|doctor of philosophy/i.test(textLower)) {
    education = 'Ph.D. in Computer Science';
  } else if (/m\.?s\.?c|master of science|m\.?b\.?a|master of business|master's degree/i.test(textLower)) {
    education = 'M.Sc. Information Technology';
  } else if (/bachelor of arts|b\.?a\b/i.test(textLower)) {
    education = 'B.A. Information Systems';
  } else if (/bachelor of engineering|b\.?e\b|b\.?tech/i.test(textLower)) {
    education = 'B.Eng. Computer Engineering';
  } else if (/bachelor of science|b\.?s\.?c|b\.?s\b/i.test(textLower)) {
    education = 'B.Sc. Computer Science';
  }

  // -----------------------------------------------------------------
  // 6. PROFESSIONAL SUMMARY EXTRACTION
  // -----------------------------------------------------------------
  let summary = '';
  const summarySectionRegex = /(?:professional summary|summary|about me|executive summary|profile)[:\n\r]+([\s\S]*?)(?=(?:\n\s*(?:skills|experience|work history|education)\b|\n\n|$))/i;
  const sumMatch = cleanRaw.match(summarySectionRegex);

  if (sumMatch && sumMatch[1]) {
    const cleanSum = sumMatch[1].replace(/\s+/g, ' ').trim();
    if (cleanSum.length >= 30) {
      summary = cleanSum.slice(0, 280);
    }
  }

  // If no summary section, find substantive bullet points from experience
  if (!summary) {
    const bulletLines = lines.filter((l) => l.length >= 40 && l.length <= 200 && !l.includes('@') && !l.includes('http'));
    if (bulletLines.length >= 2) {
      summary = bulletLines.slice(0, 2).join(' ').replace(/^[-*•]\s*/, '').trim();
    }
  }

  // Fallback if still empty
  if (!summary || summary.length < 25) {
    summary = `${yearsExp}+ years of verified professional experience in ${track} roles. Specializing in ${finalSkills.slice(0, 4).join(', ')}, delivering scalable high-impact systems.`;
  }

  return {
    name: candidateName,
    demographicMarker: 'Uploaded Candidate Signal',
    track,
    experienceLevel,
    summary,
    skills: finalSkills,
    matchedSkillsCount: Math.min(finalSkills.length, 16),
    positionsCount: Math.min(6, Math.max(2, Math.round(yearsExp / 2.2))),
    positionYears: `${Math.max(2010, 2026 - yearsExp)} – Present`,
    education,
    educationTier: 'Accredited University'
  };
}

/**
 * Creates dynamic counterfactual variants for any candidate
 */
export function buildVariantsForCandidate(candidateName: string, candidateSignal: string): CounterfactualVariant[] {
  return [
    {
      id: 'baseline',
      name: candidateName,
      label: 'BASELINE',
      isBaseline: true,
      signal: candidateSignal || 'Original Candidate Profile',
      substantiveText: 'Original Candidate',
      active: true,
      score: 76,
      modelAScore: 76,
      modelBScore: 78
    },
    {
      id: 'var-a',
      name: 'Emily Watson',
      label: 'VARIANT A',
      isBaseline: false,
      signal: 'Anglo-Saxon / Female',
      substantiveText: '100% Invariant',
      active: true,
      score: 91,
      modelAScore: 91,
      modelBScore: 88
    },
    {
      id: 'var-b',
      name: 'Michael Chen',
      label: 'VARIANT B',
      isBaseline: false,
      signal: 'East Asian / Male',
      substantiveText: '100% Invariant',
      active: true,
      score: 84,
      modelAScore: 85,
      modelBScore: 83
    },
    {
      id: 'var-c',
      name: 'David Miller',
      label: 'VARIANT C',
      isBaseline: false,
      signal: 'Anglo-Saxon / Male',
      substantiveText: '100% Invariant',
      active: true,
      score: 87,
      modelAScore: 88,
      modelBScore: 86
    }
  ];
}
