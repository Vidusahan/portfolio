import type { ComponentType, HTMLAttributes, AnchorHTMLAttributes } from 'react';
import clsx from 'clsx';

type Props<T> = HTMLAttributes<T> & { className?: string };

/**
 * Every override below explicitly destructures `className` and merges it with
 * `clsx` rather than relying on `{...props}` spread order. MDX/rehype sometimes
 * passes `className: undefined` on elements with no language — spreading that
 * *after* a hardcoded className would silently blank it out, which would break
 * our syntax-highlighting classes on fenced code blocks specifically.
 */

function CodeBlock({ className, children, ...rest }: Props<HTMLElement>) {
  const isFencedBlock = typeof className === 'string' && className.includes('hljs');
  if (isFencedBlock) {
    // Preserve rehype-highlight's classes untouched — they drive the .hljs-* colors.
    return (
      <code className={className} {...rest}>
        {children}
      </code>
    );
  }
  return (
    <code className={clsx('rounded bg-bg-2 px-1.5 py-0.5 font-mono text-[13px] text-cyan', className)} {...rest}>
      {children}
    </code>
  );
}

export const mdxComponents: Record<string, ComponentType<Record<string, unknown>>> = {
  h1: ({ className, ...props }: Props<HTMLHeadingElement>) => (
    <h2 className={clsx('mt-12 mb-4 font-display text-2xl font-semibold text-text first:mt-0', className)} {...props} />
  ),
  h2: ({ className, ...props }: Props<HTMLHeadingElement>) => (
    <h2 className={clsx('mt-10 mb-4 font-display text-xl font-semibold text-text', className)} {...props} />
  ),
  h3: ({ className, ...props }: Props<HTMLHeadingElement>) => (
    <h3 className={clsx('mt-8 mb-3 font-display text-[17px] font-medium text-text', className)} {...props} />
  ),
  p: ({ className, ...props }: Props<HTMLParagraphElement>) => (
    <p className={clsx('mb-5 text-[15px] leading-[1.85] text-text-dim', className)} {...props} />
  ),
  a: ({ className, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className={clsx('text-cyan underline underline-offset-4 transition-opacity hover:opacity-80', className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }: Props<HTMLUListElement>) => (
    <ul className={clsx('mb-5 flex flex-col gap-2 pl-5 text-[15px] text-text-dim [&>li]:list-disc', className)} {...props} />
  ),
  ol: ({ className, ...props }: Props<HTMLOListElement>) => (
    <ol
      className={clsx('mb-5 flex flex-col gap-2 pl-5 text-[15px] text-text-dim [&>li]:list-decimal', className)}
      {...props}
    />
  ),
  li: ({ className, ...props }: Props<HTMLLIElement>) => (
    <li className={clsx('leading-[1.75]', className)} {...props} />
  ),
  blockquote: ({ className, ...props }: Props<HTMLQuoteElement>) => (
    <blockquote
      className={clsx('my-6 border-l-2 border-cyan/50 pl-5 text-[15px] leading-[1.8] text-text-dim italic', className)}
      {...props}
    />
  ),
  pre: ({ className, ...props }: Props<HTMLPreElement>) => (
    <pre
      className={clsx('mb-6 overflow-x-auto rounded-xl border border-border bg-bg-2 p-5 text-[13px] leading-[1.7]', className)}
      {...props}
    />
  ),
  code: CodeBlock,
  hr: ({ className, ...props }: Props<HTMLHRElement>) => (
    <hr className={clsx('my-10 border-border', className)} {...props} />
  ),
};
