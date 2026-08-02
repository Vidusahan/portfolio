import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/blog';
import { BlogIndexClient } from '@/components/blog/BlogIndexClient';

export const metadata: Metadata = {
  title: 'Blog — Vidusahan Perera',
  description: 'Notes on AI, engineering, and building things — from Vidusahan Perera.',
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <main id="main" className="relative px-[6vw] py-[140px]">
      <div className="mx-auto mb-14 max-w-[760px] text-center">
        <div className="mb-4 font-mono text-xs tracking-[0.3em] text-text-dim uppercase">Blog</div>
        <h1 className="mx-auto max-w-[560px] font-display text-[clamp(2rem,5vw,3.2rem)] font-semibold tracking-[-0.01em]">
          Notes from the work.
        </h1>
        <p className="mx-auto mt-5 max-w-[480px] text-[15px] leading-[1.7] text-text-dim">
          Short write-ups on what actually happened while building — not polished
          retrospectives, just the parts worth remembering.
        </p>
      </div>

      <div className="mx-auto max-w-[1180px]">
        <BlogIndexClient posts={posts} />
      </div>
    </main>
  );
}
