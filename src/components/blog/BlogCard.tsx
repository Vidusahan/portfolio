import Link from 'next/link';
import { BLOG_CATEGORY_COLOR, BLOG_CATEGORY_LABEL, type BlogPostSummary } from '@/lib/blog';

export function BlogCard({ post }: { post: BlogPostSummary }) {
  const color = BLOG_CATEGORY_COLOR[post.category];
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-colors duration-300 hover:border-cyan/40"
    >
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
        <span className="font-mono text-[11px] tracking-[0.1em] text-text-dim uppercase">
          {BLOG_CATEGORY_LABEL[post.category]}
        </span>
        <span className="ml-auto font-mono text-[11px] text-text-dim">{post.readingMinutes} min read</span>
      </div>

      <div className="mt-4 font-display text-lg font-semibold text-text">{post.title}</div>
      <p className="mt-2 flex-1 text-[13px] leading-[1.65] text-text-dim">{post.excerpt}</p>

      <div className="mt-5 flex items-center justify-between">
        <span className="font-mono text-[11px] text-text-dim">{formattedDate}</span>
        <span className="font-mono text-[11px] tracking-[0.08em] text-cyan opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Read →
        </span>
      </div>
    </Link>
  );
}
