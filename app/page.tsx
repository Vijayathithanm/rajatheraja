import { Hero } from '@/components/home/Hero';
import { HeroSlider } from '@/components/home/HeroSlider';
import { Stats } from '@/components/home/Stats';
import { BiographyPreview } from '@/components/home/BiographyPreview';
import { LatestPosts } from '@/components/home/LatestPosts';
import { LatestNews } from '@/components/home/LatestNews';
import { Facts } from '@/components/home/Facts';
import { PianoDivider } from '@/components/ui/PianoDivider';

export default function HomePage() {
  return (
    <>
      <Hero />
      <HeroSlider />
      <Stats />
      <BiographyPreview />
      <PianoDivider />
      <LatestPosts />
      <LatestNews />
      <Facts />
    </>
  );
}
