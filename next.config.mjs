import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

// Registers the MDX loader so `.mdx` files can be imported as React components
// (used for blog content under src/content/blog/). We don't add 'mdx' to
// pageExtensions since no .mdx file is used directly as an app/**/page route —
// content is imported programmatically by src/app/blog/[slug]/page.tsx instead.
//
// Turbopack cannot accept live plugin function references as loader options —
// it needs to serialize them across a Rust boundary, and imported functions
// aren't serializable (see https://github.com/vercel/next.js/issues/71819).
// In Next.js 16, Turbopack is the default for `next dev` (no flag needed),
// so we detect by checking for `build` in argv instead of `--turbopack`.
// Webpack is still used for `next build`, so production gets full plugins.
const isTurbopack = !process.argv.includes('build');

const withMDX = createMDX({
  options: isTurbopack
    ? {}
    : {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeHighlight],
      },
});

export default withMDX(nextConfig);
