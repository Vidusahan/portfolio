import fs from 'node:fs';
import path from 'node:path';
import type { BlogPostMeta, BlogPostSummary } from './blog-shared';

export type { BlogCategory, BlogPostMeta, BlogPostSummary } from './blog-shared';
export { BLOG_CATEGORY_LABEL, BLOG_CATEGORY_COLOR } from './blog-shared';

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
