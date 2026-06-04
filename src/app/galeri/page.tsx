import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { RevealOnScroll } from '@/components/shared/RevealOnScroll';
import GalleryClient from '@/components/sections/gallery/GalleryClient';
import { CTABanner } from '@/components/sections/home/CTABanner';

export const metadata: Metadata = {
  title: 'Galeri Kegiatan K3 | K3 PT Freeport Indonesia',
  description: 'Dokumentasi kegiatan keselamatan kerja, simulasi darurat, pelatihan K3, dan program budaya keselamatan PT Freeport Indonesia.',
  openGraph: {
    title: 'Galeri Kegiatan K3 | K3 PT Freeport Indonesia',
    description: 'Dokumentasi kegiatan keselamatan kerja, simulasi darurat, pelatihan K3, dan program budaya keselamatan PT Freeport Indonesia.',
    images: ['/og-images/galeri.jpg'],
  },
};

export default function GaleriPage() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-900">
      {/* Hero Mini + Breadcrumb */}
      <section className="pt-32 pb-12 bg-primary-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero-mine.png')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent"></div>
        
        <div className="container-k3 relative z-10">
          <div className="flex items-center gap-2 text-sm text-neutral-400 mb-6 font-medium">
            <Link href="/" className="hover:text-safety-gold transition-colors">Beranda</Link>
            <ChevronRight size={14} />
            <span className="text-white">Galeri</span>
          </div>
          <RevealOnScroll>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Galeri Kegiatan K3</h1>
            <p className="text-lg text-neutral-300 max-w-2xl leading-relaxed text-justify">
              Dokumentasi kegiatan keselamatan dan kesehatan kerja PT Freeport Indonesia. Melihat lebih dekat bagaimana kami membangun dan menjaga budaya keselamatan setiap hari.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 relative z-20">
        <div className="container-k3">
          <RevealOnScroll className="mb-10">
            <SectionHeader 
              title="Dokumentasi Visual" 
              subtitle="Jelajahi momen-momen penting dalam penerapan keselamatan kerja di seluruh area operasional kami."
              eyebrow="Budaya K3"
              align="left"
            />
          </RevealOnScroll>

          <GalleryClient />
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
