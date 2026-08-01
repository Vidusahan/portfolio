export type TimelineTrackId = 'experience' | 'education' | 'ieee';

export interface TimelineItem {
  period: string;
  title: string;
  org: string;
  detail: string;
  highlights: string[];
}

export const TIMELINE_TRACK_LABEL: Record<TimelineTrackId, string> = {
  experience: 'Experience',
  education: 'Education',
  ieee: 'IEEE Leadership',
};

export const TIMELINE_TRACK_COLOR: Record<TimelineTrackId, string> = {
  experience: '#4eeaff',
  education: '#9b6bff',
  ieee: '#35f1ae',
};

// Placeholder content — replace with real roles, dates, and achievements.
export const EXPERIENCE_TIMELINE: TimelineItem[] = [
  {
    period: '2025 — Present',
    title: 'ML/Automation Intern',
    org: 'Placeholder Company',
    detail: 'Built and maintained automated retraining pipelines for a production model, and shipped internal tooling used by the data team.',
    highlights: [
      'Cut manual retraining time from days to hours',
      'Wrote the evaluation gate that decides whether a new model ships',
    ],
  },
  {
    period: '2024',
    title: 'Software Engineering Intern',
    org: 'Placeholder Company',
    detail: 'Worked across the stack on a Next.js/FastAPI product, focused mainly on backend API design and test coverage.',
    highlights: [
      'Designed and documented REST endpoints used by three internal teams',
      'Raised backend test coverage on a legacy module from near-zero to meaningful',
    ],
  },
  {
    period: '2023',
    title: 'Freelance Automation Projects',
    org: 'Self-directed',
    detail: 'Built small automation workflows (n8n, Python scripts) for local businesses looking to cut repetitive manual work.',
    highlights: ['Delivered four small automation projects end-to-end, from requirements to deployment'],
  },
];

export const EDUCATION_TIMELINE: TimelineItem[] = [
  {
    period: '2022 — Present',
    title: 'BSc (Hons) Computer Science',
    org: 'Placeholder University',
    detail: 'Coursework spanning machine learning, distributed systems, and software engineering, alongside self-directed research in audio deepfake detection.',
    highlights: [
      'Relevant coursework: Machine Learning, Databases, Operating Systems, Software Engineering',
      'Independent research project on voice deepfake detection',
    ],
  },
  {
    period: '2021 — 2022',
    title: 'GCE Advanced Level — Physical Science',
    org: 'Placeholder School',
    detail: 'Mathematics, Physics, and Chemistry, laying the groundwork for an engineering-focused degree.',
    highlights: [],
  },
];

export const IEEE_TIMELINE: TimelineItem[] = [
  {
    period: '2025 — Present',
    title: 'Technical Lead',
    org: 'IEEE Student Branch',
    detail: 'Leading the technical committee for branch workshops and the annual hackathon, coordinating a team of volunteers.',
    highlights: [
      'Organized a 100+ participant hackathon end-to-end',
      'Ran a 4-part workshop series on practical machine learning',
    ],
  },
  {
    period: '2024 — 2025',
    title: 'Committee Member',
    org: 'IEEE Computer Society Student Chapter',
    detail: 'Helped plan and run technical events, and mentored newer members joining the society.',
    highlights: ['Co-organized 3 technical workshops', 'Mentored 6 incoming committee members'],
  },
];

export function timelineFor(track: TimelineTrackId): TimelineItem[] {
  if (track === 'education') return EDUCATION_TIMELINE;
  if (track === 'ieee') return IEEE_TIMELINE;
  return EXPERIENCE_TIMELINE;
}
