export type CertCategory = 'ai' | 'cloud' | 'software';

export const CERT_CATEGORY_COLOR: Record<CertCategory, string> = {
  ai: '#4eeaff',
  cloud: '#35f1ae',
  software: '#9b6bff',
};

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  category: CertCategory;
  description: string;
  credentialUrl?: string;
}

// Placeholder content — replace with real certifications and verification links.
export const CERTIFICATIONS: Certification[] = [
  {
    name: 'Machine Learning Specialization',
    issuer: 'DeepLearning.AI',
    date: '2024',
    category: 'ai',
    description: 'Supervised learning, neural networks, and practical ML engineering advice across a three-course sequence.',
  },
  {
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: '2024',
    category: 'cloud',
    description: 'Foundational AWS services, pricing, and architecture best practices.',
  },
  {
    name: 'Docker & Kubernetes: The Complete Guide',
    issuer: 'Independent course',
    date: '2023',
    category: 'cloud',
    description: 'Containerization fundamentals through to orchestration with Kubernetes.',
  },
  {
    name: 'Deep Learning Specialization',
    issuer: 'DeepLearning.AI',
    date: '2024',
    category: 'ai',
    description: 'CNNs, sequence models, and structuring ML projects — the direct foundation for the deepfake detection research.',
  },
  {
    name: 'Full-Stack Web Development',
    issuer: 'Independent course',
    date: '2023',
    category: 'software',
    description: 'End-to-end web development: React, Node.js, and relational databases.',
  },
];
