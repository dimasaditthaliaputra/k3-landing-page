import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { RevealOnScroll } from '@/components/shared/RevealOnScroll';

import { OrgChartClient } from '@/components/sections/organization/OrgChartClient';
import { OrganizationStats } from '@/components/sections/organization/OrganizationStats';
import { OrganizationLegend } from '@/components/sections/organization/OrganizationLegend';
import { ResponsibilityTable } from '@/components/sections/organization/ResponsibilityTable';

import orgData from '@/data/org-chart.json';
import { OrganizationNode } from '@/types/organization';

export const metadata: Metadata = {
  title: 'Struktur Organisasi K3 | PT Freeport Indonesia',
  description: 'Hierarki organisasi keselamatan dan kesehatan kerja PT Freeport Indonesia beserta tanggung jawab setiap jabatan.',
  openGraph: {
    title: 'Struktur Organisasi K3 | PT Freeport Indonesia',
    description: 'Hierarki organisasi keselamatan dan kesehatan kerja PT Freeport Indonesia beserta tanggung jawab setiap jabatan.',
    images: ['/og-images/org-chart.jpg'],
  },
};

const typedOrgData = orgData as OrganizationNode[];

export default function StrukturOrganisasiPage() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-950">
      {/* Hero Mini + Breadcrumb */}
      <section className="pt-32 pb-12 bg-primary-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero-mine.png')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 to-transparent"></div>
        
        <div className="container-k3 relative z-10">
          <div className="flex items-center gap-2 text-sm text-neutral-400 mb-6 font-medium">
            <Link href="/" className="hover:text-safety-gold transition-colors">Beranda</Link>
            <ChevronRight size={14} />
            <span className="text-white">Struktur Organisasi</span>
          </div>
          <RevealOnScroll>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Struktur Organisasi K3</h1>
            <p className="text-lg text-neutral-300 max-w-2xl leading-relaxed">
              Hierarki dan tanggung jawab keselamatan kerja PT Freeport Indonesia
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 relative z-20">
        <div className="container-k3 space-y-16">
          
          <RevealOnScroll>
            <SectionHeader 
              title="Sistem Manajemen Organisasi K3" 
              subtitle="Untuk mencapai target nihil kecelakaan (zero accident), PT Freeport Indonesia menempatkan struktur organisasi K3 yang kuat dan terintegrasi di seluruh lini operasional. Setiap personel dari tingkat eksekutif hingga operator di lapangan memiliki tanggung jawab keselamatan yang melekat."
              eyebrow="Tinjauan Organisasi"
              align="center"
            />
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <OrganizationStats />
          </RevealOnScroll>

          <div className="space-y-8">
            <RevealOnScroll delay={0.2}>
              <OrganizationLegend />
            </RevealOnScroll>
            
            <RevealOnScroll delay={0.3}>
              <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-4 lg:p-12 shadow-sm">
                <OrgChartClient data={typedOrgData} />
              </div>
            </RevealOnScroll>
          </div>

          {/* Tabel Tanggung Jawab K3 */}
          <div className="pt-8 border-t border-neutral-800">
            <SectionHeader 
              title="Tabel Tanggung Jawab K3" 
              subtitle="Rincian spesifik peran dan tanggung jawab keselamatan per jabatan."
              eyebrow="Deskripsi Kerja"
              align="left"
            />
            <div className="mt-8">
              <ResponsibilityTable data={typedOrgData} />
            </div>
          </div>

        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-primary-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-safety-gold/40 via-primary-950 to-primary-950"></div>
        <div className="container-k3 relative z-10 text-center">
          <RevealOnScroll>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Butuh Informasi Lebih Lanjut Mengenai Struktur K3?
            </h2>
            <p className="text-neutral-300 mb-10 max-w-2xl mx-auto">
              Tim Keselamatan Kerja PTFI selalu siap membantu menjelaskan protokol, standar prosedur, dan pelaporan insiden.
            </p>
            <Link 
              href="/kontak" 
              className="inline-block px-8 py-4 bg-safety-gold hover:bg-amber-500 text-primary-950 font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Hubungi Tim K3
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
