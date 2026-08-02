export type BlogCategory = 'ai' | 'engineering' | 'career';

export const BLOG_CATEGORY_LABEL: Record<BlogCategory, string> = {
  ai: 'AI',
  engineering: 'Engineering',
  career: 'Career',
};

export const BLOG_CATEGORY_COLOR: Record<BlogCategory, string> = {
  ai: '#4eeaff',
  engineering: '#9b6bff',
  career: '#35f1ae',
};

export interface BlogPostMeta {
  title: string;
  date: string;
  category: BlogCategory;
  excerpt: string;
  readingMinutes: number;
}

export interface BlogPostSummary extends BlogPostMeta {
  slug: string;
}
