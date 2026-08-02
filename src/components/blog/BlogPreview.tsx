import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import { BlogCard } from '@/components/blog/BlogCard';

export async function BlogPreview() {
  const posts = (await getAllPosts()).slice(0, 3);

  return (
    <section id="blog" className="relative border-t border-border bg-bg-2 px-[6vw] py-[110px]">
      <div className="mx-auto mb-12 max-w-[1180px] text-center">
        <div className="mb-4 font-mono text-xs tracking-[0.3em] text-text-dim uppercase">Blog</div>
        <h2 className="mx-auto max-w-[560px] font-display text-[clamp(1.8rem,4vw,2.8rem)] font-semibold tracking-[-0.01em]">
          Notes from the work.
        </h2>
        <p className="mx-auto mt-5 max-w-[480px] text-[15px] leading-[1.7] text-text-dim">
          Short write-ups on what actually happened while building — not polished
          retrospectives, just the parts worth remembering.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="mx-auto max-w-[1180px] rounded-2xl border border-border bg-card py-16 text-center">
          <p className="text-sm text-text-dim">No posts published yet.</p>
        </div>
      ) : (
        <div className="mx-auto grid max-w-[1180px] gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}

      <div className="mt-12 text-center">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-[13px] font-medium transition-colors hover:border-cyan hover:text-cyan"
        >
          View all posts →
        </Link>
      </div>
    </section>
  );
}
