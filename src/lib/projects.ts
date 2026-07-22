export type ProjectCategory = 'ai' | 'ml' | 'automation' | 'software' | 'data' | 'research';

export const PROJECT_CATEGORY_LABEL: Record<ProjectCategory, string> = {
  ai: 'AI',
  ml: 'Machine Learning',
  automation: 'Automation',
  software: 'Software Engineering',
  data: 'Data Analytics',
  research: 'Research',
};

export const PROJECT_CATEGORY_COLOR: Record<ProjectCategory, string> = {
  ai: '#4eeaff',
  ml: '#9b6bff',
  automation: '#35f1ae',
  software: '#4eeaff',
  data: '#9b6bff',
  research: '#35f1ae',
};

export interface TimelineStep {
  label: string;
  detail: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  techStack: string[];
  problem: string;
  solution: string;
  architecture: string[];
  timeline: TimelineStep[];
  challenges: string;
  lessonsLearned: string;
  futureImprovements: string;
  githubUrl?: string;
  liveUrl?: string;
}

// Placeholder content — swap in real projects, links, and screenshots before shipping.
export const PROJECTS: Project[] = [
  {
    slug: 'voice-deepfake-detector',
    title: 'Voice Deepfake Detector',
    tagline: 'Classifying synthetic speech in real time from spectral features.',
    category: 'research',
    techStack: ['Python', 'PyTorch', 'TensorFlow'],
    problem:
      'Synthetic voice generation has gotten good enough to fool casual listeners, and most public detection datasets don\u2019t generalize well across different TTS/voice-cloning systems.',
    solution:
      'A spectrogram-based classifier trained across multiple synthesis methods, with data augmentation to reduce overfitting to any single generator\u2019s artifacts.',
    architecture: [
      'Audio ingestion & resampling to a fixed sample rate',
      'Mel-spectrogram feature extraction',
      'CNN feature encoder',
      'Binary classifier head (real vs. synthetic)',
      'Confidence calibration on held-out generators',
    ],
    timeline: [
      { label: 'Literature review', detail: 'Surveyed existing detection approaches and their generalization gaps.' },
      { label: 'Dataset assembly', detail: 'Combined multiple public real/synthetic speech datasets.' },
      { label: 'Model training', detail: 'Iterated on architecture and augmentation strategy.' },
      { label: 'Cross-generator evaluation', detail: 'Tested against synthesis methods excluded from training.' },
    ],
    challenges:
      'The biggest failure mode was overfitting to artifacts of the specific voice-cloning tools in the training set — the model looked strong in-distribution and much weaker on held-out generators.',
    lessonsLearned:
      'Generalization has to be evaluated explicitly, not assumed. A model that\u2019s 98% accurate on familiar synthesis methods can fail badly on ones it hasn\u2019t seen.',
    futureImprovements:
      'Expand the training distribution further and explore self-supervised pretraining on raw audio instead of hand-engineered spectrogram features.',
  },
  {
    slug: 'pipeline-orchestrator',
    title: 'ML Pipeline Orchestrator',
    tagline: 'Automating retraining, evaluation, and deployment for a production model.',
    category: 'automation',
    techStack: ['Python', 'Docker', 'AWS', 'n8n'],
    problem:
      'A model in production was being retrained manually whenever performance drifted — slow, error-prone, and dependent on one person remembering to do it.',
    solution:
      'An automated pipeline that retrains on a schedule, evaluates against a held-out set, and only promotes a new model version if it beats the current one on the metrics that matter.',
    architecture: [
      'Scheduled trigger (n8n workflow)',
      'Data validation & retraining job (containerized)',
      'Automated evaluation against a fixed benchmark set',
      'Gated promotion — new model ships only if it wins',
      'Rollback path if production metrics regress',
    ],
    timeline: [
      { label: 'Manual process audit', detail: 'Mapped every manual step in the existing retraining workflow.' },
      { label: 'Containerize training', detail: 'Made the training job reproducible and environment-independent.' },
      { label: 'Build the gate', detail: 'Added automated evaluation so bad models can\u2019t ship silently.' },
      { label: 'Wire up scheduling', detail: 'Connected the whole flow to run unattended.' },
    ],
    challenges:
      'Defining "better" precisely enough for an automated gate to trust was harder than the automation itself — a naive accuracy check would have promoted models that regressed on a critical edge case.',
    lessonsLearned:
      'Automation is only as trustworthy as its evaluation criteria. The infrastructure work was the easy part; deciding what "good enough to ship" means was the real engineering problem.',
    futureImprovements: 'Add canary deployment so a promoted model serves a small traffic slice before full rollout.',
  },
  {
    slug: 'realtime-analytics-service',
    title: 'Realtime Analytics Service',
    tagline: 'A FastAPI service turning raw event streams into queryable metrics.',
    category: 'data',
    techStack: ['Python', 'FastAPI', 'PostgreSQL', 'Docker'],
    problem:
      'Product event data was landing in raw form with no easy way to answer basic questions like "how many active users this week" without writing ad-hoc SQL each time.',
    solution:
      'A service that ingests events, pre-aggregates common metrics on a schedule, and exposes them through a small, typed API — so the answer to "how many active users" is a single request.',
    architecture: [
      'Event ingestion endpoint',
      'Scheduled aggregation jobs',
      'PostgreSQL for aggregated metric storage',
      'FastAPI read layer with response caching',
    ],
    timeline: [
      { label: 'Requirements gathering', detail: 'Identified the handful of metrics people actually asked for repeatedly.' },
      { label: 'Schema design', detail: 'Designed aggregation tables around query patterns, not raw event shape.' },
      { label: 'API layer', detail: 'Built and documented the read endpoints.' },
    ],
    challenges:
      'Balancing aggregation freshness against cost — recomputing everything on every request was too slow, but caching too aggressively made the numbers visibly stale.',
    lessonsLearned:
      'Most "real-time" analytics requirements are actually "fresh enough" requirements once you ask precisely how fresh people need the data to be.',
    futureImprovements: 'Move from scheduled batch aggregation to incremental updates as events arrive.',
  },
  {
    slug: 'this-portfolio',
    title: 'This Portfolio',
    tagline: 'An AI-operating-system-styled personal site, built and shipped in phases.',
    category: 'software',
    techStack: ['React', 'Next.js', 'Docker'],
    problem:
      'Most portfolio sites either look like a generic template or take on so much scope at once that nothing in them gets finished properly.',
    solution:
      'Ship it phase by phase — loader and hero first, then About, then the Tech Universe, then Projects — each one reviewed and versioned on its own, reusing one shared design system throughout.',
    architecture: [
      'Next.js App Router + Tailwind v4 design tokens',
      'Canvas 2D particle systems (loader, hero)',
      'Three.js / React Three Fiber (Tech Universe)',
      'Global virtual cursor + section-scoped background interactions',
    ],
    timeline: [
      { label: 'Phase 01', detail: 'Loading sequence + hero/landing.' },
      { label: 'Phase 02', detail: 'About section with animated stats.' },
      { label: 'Phase 03', detail: 'Tech Universe (Three.js orbital scene).' },
      { label: 'Phase 04', detail: 'Projects — this section.' },
    ],
    challenges:
      'Keeping every phase visually consistent with the ones before it without a full design system locked in from day one.',
    lessonsLearned:
      'Design tokens defined once (colors, fonts, easing curves) made every later phase faster to build and automatically consistent, without needing to reference earlier code.',
    futureImprovements: 'Research, Experience, and the AI portfolio assistant are next.',
  },
];
