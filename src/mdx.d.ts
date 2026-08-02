import type { ComponentType, ReactNode } from 'react';

declare module '*.mdx' {
  export const meta: {
    title: string;
    date: string;
    category: 'ai' | 'engineering' | 'career';
    excerpt: string;
    readingMinutes: number;
  };

  interface MDXProps {
    components?: Record<string, ComponentType<Record<string, unknown>>>;
    children?: ReactNode;
  }

  const MDXComponent: ComponentType<MDXProps>;
  export default MDXComponent;
}
