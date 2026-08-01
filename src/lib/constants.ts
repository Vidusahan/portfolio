export const SITE = {
  name: 'Vidusahan Perera',
  title: 'Vidusahan Perera — AI & Software Engineer',
  description:
    'Vidusahan Perera — AI Engineer, Automation Engineer, Machine Learning Engineer, Full Stack Developer.',
  url: 'https://vidusahanperera.dev',
};

export const ROLES = [
  'AI Engineer',
  'Software Engineer',
  'Automation Engineer',
  'Machine Learning Engineer',
  'Full Stack Developer',
] as const;

export const NAV_LINKS = [
  { label: 'Home', href: '#main' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Research', href: '#research' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#next' },
] as const;

export const PALETTE = ['#4eeaff', '#9b6bff', '#35f1ae'] as const;

export interface AboutPillar {
  label: string;
  title: string;
  body: string;
}

export const ABOUT_PILLARS: AboutPillar[] = [
  {
    label: 'Why AI',
    title: 'Systems that improve with data',
    body: 'What drew me in was the shift from writing every rule by hand to building systems that learn the rules themselves — and the discipline that requires: clean data, honest evaluation, and knowing when a model is the wrong tool.',
  },
  {
    label: 'Why Automation',
    title: 'Removing the repetitive by hand',
    body: 'Automation is where AI meets the real world — pipelines, infrastructure, and workflows that run without someone babysitting them. I like the engineering problem underneath: making something reliable enough to trust.',
  },
  {
    label: 'What\u2019s next',
    title: 'Research into production',
    body: 'My research on voice deepfake detection sits alongside full-stack and MLOps work for a reason — I want to keep closing the gap between a promising result in a notebook and a system people can actually rely on.',
  },
];

export interface AboutStat {
  label: string;
  value: number;
  suffix?: string;
}

export const ABOUT_STATS: AboutStat[] = [
  { label: 'Projects shipped', value: 12, suffix: '+' },
  { label: 'GitHub contributions', value: 640, suffix: '+' },
  { label: 'Technologies', value: 24 },
  { label: 'Leadership roles', value: 3 },
  { label: 'Certifications', value: 9 },
];


export const UPCOMING_SECTIONS = [
  'RESEARCH',
  'EXPERIENCE',
  'AI ASSISTANT',
  'CONTACT',
] as const;
