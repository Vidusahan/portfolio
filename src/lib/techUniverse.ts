export type TechCategory = 'ai' | 'web' | 'infra';

export interface TechItem {
  name: string;
  category: TechCategory;
  /** Self-assessed proficiency, 1-5 — drives node size and the detail-panel bar. */
  level: number;
  blurb: string;
}

export interface TechRing {
  id: string;
  label: string;
  radius: number;
  /** Full orbit period in seconds — smaller rings orbit faster, like real orbital mechanics. */
  periodSeconds: number;
  tiltDeg: number;
  items: TechItem[];
}

export const CATEGORY_COLOR: Record<TechCategory, string> = {
  ai: '#4eeaff',
  web: '#9b6bff',
  infra: '#35f1ae',
};

export const CATEGORY_LABEL: Record<TechCategory, string> = {
  ai: 'AI / ML',
  web: 'Full-Stack & Web',
  infra: 'Infra & Tooling',
};

export const TECH_RINGS: TechRing[] = [
  {
    id: 'ai',
    label: 'AI / ML',
    radius: 2.1,
    periodSeconds: 26,
    tiltDeg: 8,
    items: [
      { name: 'Python', category: 'ai', level: 5, blurb: 'Primary language for ML pipelines, automation scripts, and backend services.' },
      { name: 'TensorFlow', category: 'ai', level: 3, blurb: 'Training and evaluating deep learning models, including for my voice deepfake detection research.' },
      { name: 'PyTorch', category: 'ai', level: 4, blurb: 'Preferred framework for experimentation — dynamic graphs make research iteration faster.' },
      { name: 'LangChain', category: 'ai', level: 3, blurb: 'Building retrieval-augmented pipelines, including this site\u2019s planned AI assistant.' },
      { name: 'FastAPI', category: 'ai', level: 4, blurb: 'Serving ML models and automation endpoints with async Python.' },
    ],
  },
  {
    id: 'web',
    label: 'Full-Stack & Web',
    radius: 3.1,
    periodSeconds: 38,
    tiltDeg: -6,
    items: [
      { name: 'React', category: 'web', level: 5, blurb: 'Default choice for interactive UI — this portfolio included.' },
      { name: 'Next.js', category: 'web', level: 5, blurb: 'App Router, server components, and this exact codebase.' },
      { name: 'Node.js', category: 'web', level: 4, blurb: 'API services, tooling scripts, and server-side logic.' },
      { name: 'Spring Boot', category: 'web', level: 3, blurb: 'Coursework and side projects needing a typed, structured backend.' },
      { name: 'MongoDB', category: 'web', level: 4, blurb: 'Document storage for projects with flexible, evolving schemas.' },
      { name: 'PostgreSQL', category: 'web', level: 4, blurb: 'Relational storage where data integrity and joins actually matter.' },
    ],
  },
  {
    id: 'infra',
    label: 'Infra & Tooling',
    radius: 4.1,
    periodSeconds: 52,
    tiltDeg: 4,
    items: [
      { name: 'Docker', category: 'infra', level: 4, blurb: 'Containerizing services for consistent local dev and deployment.' },
      { name: 'AWS', category: 'infra', level: 3, blurb: 'Deploying and hosting models, APIs, and static sites.' },
      { name: 'Git', category: 'infra', level: 5, blurb: 'Daily driver — branching, PRs, and exactly how this site is versioned.' },
      { name: 'Linux', category: 'infra', level: 4, blurb: 'Primary dev and deployment environment.' },
      { name: 'n8n', category: 'infra', level: 3, blurb: 'Wiring up automation workflows without reinventing the plumbing.' },
    ],
  },
];

export const ALL_TECH_ITEMS: TechItem[] = TECH_RINGS.flatMap((ring) => ring.items);
