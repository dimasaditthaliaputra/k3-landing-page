'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { RevealOnScroll } from '@/components/shared/RevealOnScroll';

const commitments = [
  {
    id: 1,
    title: 'Budaya Keselamatan Proaktif',
    description: 'Kami tidak hanya mematuhi regulasi, kami menjadikannya gaya hidup. Pendekatan proaktif kami mencegah insiden sebelum terjadi melalui identifikasi bahaya dan evaluasi risiko berkelanjutan.',
    image: '/images/commitment-1.png',
    link: '/tentang/komitmen',
    badge: 'Pencegahan'
  },
  {
    id: 2,
    title: 'Teknologi & Inovasi K3',
    description: 'Memanfaatkan teknologi terkini untuk memonitor, menganalisis, dan meningkatkan standar keselamatan operasional di setiap area kerja PT Freeport Indonesia.',
    image: '/images/commitment-2.png',
    link: '/tentang/komitmen',
    badge: 'Inovasi'
  }
];

export function CommitmentSection() {
  return (
    <section className="py-24 bg-neutral-50 overflow-hidden">
      <div className="container-k3">
        <SectionHeader 
          title="Komitmen Keselamatan" 
          subtitle="Nilai-nilai yang mendasari setiap keputusan dan tindakan operasional kami."
          eyebrow="Nilai Inti"
          subTextColor='text-gray-600'
          textColor='text-primary-900'
        />

        <div className="space-y-24 mt-16">
          {commitments.map((item, index) => {
            const isEven = index % 2 === 1;
            return (
              <div key={item.id} className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                <RevealOnScroll className="w-full lg:w-1/2" delay={0.1}>
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl group">
                    <Image 
                      src={item.image} 
                      alt={item.title} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 via-transparent to-transparent opacity-60"></div>
                  </div>
                </RevealOnScroll>
                
                <RevealOnScroll className="w-full lg:w-1/2 flex flex-col justify-center" delay={0.2}>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-safety-gold/10 border border-safety-gold/20 text-safety-gold text-xs font-bold uppercase tracking-wider mb-6 w-fit">
                    {item.badge}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                    {item.description}
                  </p>
                  <Link href={item.link} className="inline-flex items-center gap-2 font-semibold text-primary-700 dark:text-safety-gold hover:text-safety-gold transition-colors group w-fit">
                    Baca selengkapnya 
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </RevealOnScroll>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
