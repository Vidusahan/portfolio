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
const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeHighlight],
  },
});

export default withMDX(nextConfig);
