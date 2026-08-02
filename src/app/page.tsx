import { HomePageClient } from '@/components/home/HomePageClient';
import { BlogPreview } from '@/components/blog/BlogPreview';
import { NextTeaser } from '@/components/sections/NextTeaser';

export default function HomePage() {
  return (
    <HomePageClient>
      <BlogPreview />
      <NextTeaser />
    </HomePageClient>
  );
}
