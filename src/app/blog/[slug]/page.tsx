import type { Metadata } from 'next';
import type { ComponentType } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { getBlogSlugs, BLOG_CATEGORY_COLOR, BLOG_CATEGORY_LABEL, type BlogPostMeta } from '@/lib/blog';
import { mdxComponents } from '@/lib/mdxComponents';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

async function loadPost(slug: string) {
  try {
    return (await import(`@/content/blog/${slug}.mdx`)) as {
      default: ComponentType<{ components?: typeof mdxComponents }>;
      meta: BlogPostMeta;
    };
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await loadPost(slug);
  if (!post) return {};
  return {
    title: `${post.meta.title} — Vidusahan Perera`,
    description: post.meta.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await loadPost(slug);
  if (!post) notFound();

  const { default: Post, meta } = post;
  const color = BLOG_CATEGORY_COLOR[meta.category];
  const formattedDate = new Date(meta.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main id="main" className="relative px-[6vw] py-[140px]">
      <div className="mx-auto max-w-[680px]">
        <Link
          href="/blog"
          className="mb-10 inline-flex items-center gap-1.5 font-mono text-[12px] tracking-[0.06em] text-text-dim transition-colors hover:text-cyan"
        >
          <ArrowLeft size={13} /> All posts
        </Link>

        <div className="mb-4 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
          <span className="font-mono text-[11px] tracking-[0.1em] text-text-dim uppercase">
            {BLOG_CATEGORY_LABEL[meta.category]}
          </span>
        </div>

        <h1 className="font-display text-[clamp(1.9rem,4.5vw,2.8rem)] leading-[1.15] font-semibold tracking-[-0.01em]">
          {meta.title}
        </h1>

        <div className="mt-5 font-mono text-[12px] text-text-dim">
          {formattedDate} · {meta.readingMinutes} min read
        </div>

        <article className="mt-12">
          <Post components={mdxComponents} />
        </article>
      </div>
    </main>
  );
}
