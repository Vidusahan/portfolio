import type { MDXComponents } from 'mdx/types';
import { mdxComponents as baseComponents } from '@/lib/mdxComponents';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...baseComponents, ...components };
}
