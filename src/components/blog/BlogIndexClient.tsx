'use client';

import { useMemo, useState } from 'react';
import clsx from 'clsx';
import { Search } from 'lucide-react';
import { BLOG_CATEGORY_LABEL, type BlogCategory, type BlogPostSummary } from '@/lib/blog';
import { BlogCard } from '@/components/blog/BlogCard';

const CATEGORIES: Array<BlogCategory | 'all'> = ['all', 'ai', 'engineering', 'career'];

export function BlogIndexClient({ posts }: { posts: BlogPostSummary[] }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<BlogCategory | 'all'>('all');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory = category === 'all' || post.category === category;
      const matchesQuery =
        q.length === 0 ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [posts, query, category]);

  return (
    <div>
      <div className="mx-auto mb-8 flex max-w-[520px] items-center gap-3 rounded-full border border-border bg-card px-5 py-3">
        <Search size={15} className="shrink-0 text-text-dim" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts…"
          aria-label="Search blog posts"
          className="w-full bg-transparent text-[14px] text-text placeholder:text-text-dim focus:outline-none"
        />
      </div>

      <div className="mb-12 flex flex-wrap justify-center gap-2.5">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={clsx(
              'rounded-full border px-4 py-2 font-mono text-[11px] tracking-[0.06em] uppercase transition-colors duration-200',
              category === cat
                ? 'border-cyan bg-cyan/10 text-cyan'
                : 'border-border text-text-dim hover:border-text-dim hover:text-text',
            )}
          >
            {cat === 'all' ? 'All' : BLOG_CATEGORY_LABEL[cat]}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card py-16 text-center">
          <p className="text-sm text-text-dim">No posts match that search.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
