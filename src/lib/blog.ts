import fs from 'node:fs';
import path from 'node:path';

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

const CONTENT_DIR = path.join(process.cwd(), 'src', 'content', 'blog');

/** Slugs are derived from filenames — every `<slug>.mdx` under content/blog becomes /blog/<slug>. */
export function getBlogSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
}

/** Imports every post's `meta` export (without rendering the post body) and sorts newest-first. */
export async function getAllPosts(): Promise<BlogPostSummary[]> {
  const slugs = getBlogSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const mod = (await import(`@/content/blog/${slug}.mdx`)) as { meta: BlogPostMeta };
      return { slug, ...mod.meta };
    }),
  );
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}
