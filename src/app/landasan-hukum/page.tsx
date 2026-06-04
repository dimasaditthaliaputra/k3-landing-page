'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ChevronRight, FileCheck, Shield } from 'lucide-react';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { RevealOnScroll } from '@/components/shared/RevealOnScroll';
import { RegulationStats } from '@/components/sections/landasan-hukum/RegulationStats';
import { RegulationSearch } from '@/components/sections/landasan-hukum/RegulationSearch';
import { CategoryFilter } from '@/components/sections/landasan-hukum/CategoryFilter';
import { RegulationTable } from '@/components/sections/landasan-hukum/RegulationTable';

import regulationsData from '@/data/regulations.json';
import { Regulation, RegulationCategory } from '@/types/regulation';

const allRegulations = regulationsData as Regulation[];

export default function LandasanHukumPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<RegulationCategory>('Semua');

  const stats = useMemo(() => {
    return {
      total: allRegulations.length,
      uu: allRegulations.filter(r => r.kategori === 'UU').length,
      pp: allRegulations.filter(r => r.kategori === 'PP').length,
      permen: allRegulations.filter(r => r.kategori === 'Permen').length,
      internasional: allRegulations.filter(r => r.kategori === 'Standar Internasional').length,
    };
  }, []);

  const filteredRegulations = useMemo(() => {
    return allRegulations.filter(reg => {
      const matchCategory = activeCategory === 'Semua' || reg.kategori === activeCategory;
      const query = searchQuery.toLowerCase();
      const matchSearch = 
        reg.judul.toLowerCase().includes(query) || 
        reg.nomor.toLowerCase().includes(query) ||
        reg.kategori.toLowerCase().includes(query);
      
      return matchCategory && matchSearch;
    });
  }, [searchQuery, activeCategory]);

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
            <span className="text-white">Regulasi & Landasan Hukum</span>
          </div>
          <RevealOnScroll>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Landasan Hukum K3</h1>
            <p className="text-lg text-neutral-300 max-w-2xl leading-relaxed">
              Kumpulan peraturan perundang-undangan dan standar internasional yang menjadi dasar kebijakan Keselamatan dan Kesehatan Kerja di PT Freeport Indonesia.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 relative z-20">
        <div className="container-k3 space-y-12">
          
          {/* Stats Section */}
          <RevealOnScroll delay={0.1}>
            <RegulationStats stats={stats} />
          </RevealOnScroll>

          {/* Controls & Table Section */}
          <div className="space-y-6">
            <RevealOnScroll delay={0.2} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <RegulationSearch onSearch={setSearchQuery} />
              <CategoryFilter activeCategory={activeCategory} onChange={setActiveCategory} />
            </RevealOnScroll>

            <RevealOnScroll delay={0.3}>
              <RegulationTable regulations={filteredRegulations} />
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Informasi Kepatuhan K3 Section */}
      <section className="py-20 bg-neutral-950 border-t border-neutral-800">
        <div className="container-k3">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <RevealOnScroll>
              <SectionHeader 
                title="Kepatuhan Terhadap Regulasi" 
                subtitle="PT Freeport Indonesia berkomitmen penuh untuk memenuhi dan melampaui semua persyaratan hukum K3 yang berlaku di Indonesia maupun standar internasional."
                eyebrow="Komitmen Kepatuhan"
                align="left"
              />
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-4 bg-neutral-900 p-5 rounded-xl border border-neutral-800">
                  <div className="p-2 bg-safety-gold/10 text-safety-gold rounded-lg mt-0.5">
                    <FileCheck size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Audit Berkala</h4>
                    <p className="text-sm text-neutral-400">Pelaksanaan audit internal dan eksternal secara rutin untuk memastikan sistem manajemen K3 berjalan efektif.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-neutral-900 p-5 rounded-xl border border-neutral-800">
                  <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg mt-0.5">
                    <Shield size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Sertifikasi ISO 45001</h4>
                    <p className="text-sm text-neutral-400">Penerapan standar sistem manajemen K3 internasional terkemuka di seluruh area operasional perusahaan.</p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll delay={0.2}>
              <div className="bg-primary-900 rounded-3xl p-8 lg:p-12 text-center border border-primary-800 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-safety-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 relative z-10">Buku Panduan K3 PTFI</h3>
                <p className="text-primary-200 mb-8 max-w-md mx-auto relative z-10">
                  Unduh buku panduan lengkap Keselamatan dan Kesehatan Kerja untuk karyawan dan kontraktor PT Freeport Indonesia.
                </p>
                <a 
                  href="#" 
                  className="inline-flex items-center gap-2 px-8 py-4 bg-safety-gold hover:bg-amber-500 text-primary-950 font-bold rounded-xl transition-all shadow-lg hover:shadow-xl relative z-10"
                >
                  <DownloadIcon className="w-5 h-5" />
                  Download Panduan (PDF)
                </a>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </div>
  );
}

// Inline SVG helper component for the Download button to avoid duplicate imports
function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
  );
}
