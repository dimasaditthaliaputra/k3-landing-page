import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Phone, Stethoscope, ShieldAlert } from 'lucide-react';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { RevealOnScroll } from '@/components/shared/RevealOnScroll';
import SafetyMapClient from '@/components/sections/safety-map/SafetyMapClient';

export const metadata: Metadata = {
  title: 'Safety Map | K3 PT Freeport Indonesia',
  description: 'Peta keselamatan interaktif area operasional PT Freeport Indonesia. Temukan titik kumpul darurat, pos medis, jalur evakuasi, dan fasilitas keselamatan lainnya.',
  openGraph: {
    title: 'Safety Map | K3 PT Freeport Indonesia',
    description: 'Peta keselamatan interaktif area operasional PT Freeport Indonesia.',
    images: ['/og-images/safety-map.jpg'],
  },
};

export default function SafetyMapPage() {
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
            <span className="text-white">Safety Map</span>
          </div>
          <RevealOnScroll>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Peta Keselamatan Area</h1>
            <p className="text-lg text-neutral-300 max-w-2xl leading-relaxed text-justify">
              Pemetaan interaktif fasilitas keselamatan dan rute darurat di seluruh area operasional PT Freeport Indonesia untuk memastikan kesiapsiagaan setiap saat.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Main Map Section */}
      <section className="py-12 relative z-20">
        <div className="container-k3">
          <SafetyMapClient />
        </div>
      </section>

      {/* Emergency Contacts Section */}
      <section className="py-20 bg-neutral-950 border-t border-neutral-800">
        <div className="container-k3">
          <RevealOnScroll>
            <SectionHeader 
              title="Kontak Darurat Tersentralisasi" 
              subtitle="Hubungi nomor di bawah ini segera jika Anda melihat atau mengalami keadaan darurat di area operasional manapun."
              eyebrow="Tindak Cepat"
            />
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {[
              { icon: Phone, title: 'Hotline Darurat K3', number: 'Ext. 1111 / 0901-1111', color: 'text-safety-gold', bg: 'bg-safety-gold/10', border: 'border-safety-gold/20' },
              { icon: Stethoscope, title: 'Medical Center', number: 'Ext. 9999 / 118', color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20' },
              { icon: ShieldAlert, title: 'Tim Penyelamat (ERT)', number: 'Ext. 5555 / 113', color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
            ].map((contact, idx) => (
              <RevealOnScroll key={idx} delay={idx * 0.1}>
                <a href="tel:#" className={`flex items-center gap-5 p-6 rounded-2xl bg-neutral-900 border hover:bg-neutral-800 transition-colors ${contact.border} group`}>
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center ${contact.bg} ${contact.color} group-hover:scale-110 transition-transform`}>
                    <contact.icon size={28} />
                  </div>
                  <div>
                    <h3 className="text-neutral-400 text-sm font-semibold mb-1">{contact.title}</h3>
                    <p className={`text-xl font-bold ${contact.color}`}>{contact.number}</p>
                  </div>
                </a>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
