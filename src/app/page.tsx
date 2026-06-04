import type { Metadata } from 'next';
import { HeroSection } from '@/components/sections/home/HeroSection';
import { StatCounter } from '@/components/sections/home/StatCounter';
import { TentangSection } from '@/components/sections/home/TentangSection';
import { CommitmentSection } from '@/components/sections/home/CommitmentSection';
import { VideoPreviewSection } from '@/components/sections/home/VideoPreviewSection';
import { CTABanner } from '@/components/sections/home/CTABanner';

export const metadata: Metadata = {
  title: 'Beranda | K3 PT Freeport Indonesia',
  description:
    'Portal resmi K3 PT Freeport Indonesia. Temukan informasi keselamatan kerja, regulasi K3, video orientasi, dan peta keselamatan area operasional.',
};

/**
 * Beranda — Home Page
 * Menampilkan:
 *  - HeroSection
 *  - StatCounter
 *  - CommitmentSection
 *  - CTA Banner
 */
export default function BerandaPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-neutral-900 transition-colors duration-300">
      <HeroSection />
      <StatCounter />
      <TentangSection />
      <CommitmentSection />
      <VideoPreviewSection />
      <CTABanner />
    </div>
  );
}
