import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ShieldCheck, HeartHandshake, Award, FileCheck2, Quote } from 'lucide-react';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { RevealOnScroll } from '@/components/shared/RevealOnScroll';
import { Accordion } from '@/components/ui/Accordion';

export const metadata: Metadata = {
  title: 'Visi & Misi K3 | K3 PT Freeport Indonesia',
  description: 'Visi, misi, nilai-nilai, dan kebijakan Keselamatan dan Kesehatan Kerja (K3) PT Freeport Indonesia.',
};

const missions = [
  "Mengimplementasikan Sistem Manajemen K3 yang memenuhi standar nasional dan internasional.",
  "Membangun budaya keselamatan yang kuat di mana setiap pekerja bertanggung jawab atas keselamatan diri sendiri dan rekan kerjanya.",
  "Mengurangi insiden dan penyakit akibat kerja menuju Nihil Insiden (Zero Harm).",
  "Menyediakan pelatihan berkelanjutan dan sumber daya yang diperlukan agar seluruh pekerja dapat bekerja dengan aman.",
  "Melakukan evaluasi dan perbaikan berkelanjutan terhadap kinerja K3 di seluruh area operasional."
];

const values = [
  {
    icon: ShieldCheck,
    title: 'Integritas',
    description: 'Bertindak secara jujur, etis, dan transparan dalam setiap pelaporan dan tindakan keselamatan.'
  },
  {
    icon: HeartHandshake,
    title: 'Kepedulian',
    description: 'Menunjukkan empati dan tanggung jawab penuh terhadap kesehatan serta keselamatan rekan kerja.'
  },
  {
    icon: Award,
    title: 'Profesionalisme',
    description: 'Melaksanakan pekerjaan sesuai standar operasional yang aman dengan keahlian yang kompeten.'
  },
  {
    icon: FileCheck2,
    title: 'Kepatuhan',
    description: 'Mentaati setiap aturan, regulasi, dan prosedur K3 tanpa pengecualian.'
  }
];

const policies = [
  {
    title: 'Komitmen terhadap Kepatuhan Hukum',
    content: 'PT Freeport Indonesia memastikan seluruh aktivitas operasionalnya mematuhi undang-undang, peraturan pemerintah, dan standar K3 baik tingkat nasional maupun internasional. Kepatuhan adalah dasar dari seluruh izin operasi kami.'
  },
  {
    title: 'Tanggung Jawab Manajemen',
    content: 'Manajemen puncak bertanggung jawab langsung atas implementasi kebijakan K3, menyediakan sumber daya yang memadai, dan memimpin dengan memberikan contoh nyata (lead by example) di lapangan.'
  },
  {
    title: 'Partisipasi dan Konsultasi Pekerja',
    content: 'Kami mendorong keterlibatan seluruh karyawan dan kontraktor melalui komite K3, pelaporan insiden tanpa takut akan sanksi (no blame culture), dan konsultasi rutin dalam penyusunan prosedur keselamatan.'
  }
];

export default function VisiMisiPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-neutral-900">
      {/* Hero Mini */}
      <section className="relative pt-32 pb-20 bg-primary-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero-mine.png')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900 to-transparent"></div>
        <div className="container-k3 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Visi & Misi K3</h1>
          <nav className="flex items-center justify-center text-primary-200 text-sm font-medium">
            <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
            <ChevronRight className="w-4 h-4 mx-2 opacity-50" />
            <span className="text-safety-gold">Visi & Misi</span>
          </nav>
        </div>
      </section>

      {/* Visi */}
      <section className="py-20 md:py-28">
        <div className="container-k3">
          <RevealOnScroll>
            <SectionHeader eyebrow="Visi K3 PTFI" title="Tujuan Utama Kami" align="center" />
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <div className="mt-12 relative max-w-4xl mx-auto rounded-3xl bg-primary-900 p-10 md:p-16 overflow-hidden shadow-2xl text-center">
              <Quote className="absolute top-6 left-6 w-24 h-24 text-white/5" />
              <Quote className="absolute bottom-6 right-6 w-24 h-24 text-white/5 rotate-180" />
              
              <h2 className="relative z-10 text-2xl md:text-4xl lg:text-5xl font-bold text-safety-gold leading-tight">
                "Menjadi perusahaan tambang kelas dunia yang bebas dari insiden dan penyakit akibat kerja."
              </h2>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Misi */}
      <section className="py-20 md:py-28 bg-neutral-50 dark:bg-primary-950">
        <div className="container-k3">
          <RevealOnScroll>
            <SectionHeader eyebrow="Misi K3 PTFI" title="Langkah Mewujudkan Visi" align="center" subtitle="Lima pilar tindakan utama yang memandu setiap operasional harian kami." />
          </RevealOnScroll>
          <div className="mt-16 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {missions.map((misi, idx) => (
              <RevealOnScroll key={idx} delay={idx * 0.1}>
                <div className="relative p-8 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 shadow-lg h-full flex flex-col justify-center overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                  <div className="absolute -right-4 -bottom-8 text-9xl font-black text-neutral-100 dark:text-neutral-900/50 group-hover:text-primary-50 dark:group-hover:text-primary-900 transition-colors duration-300 select-none">
                    {idx + 1}
                  </div>
                  <p className="relative z-10 text-lg font-medium text-neutral-700 dark:text-neutral-200">
                    {misi}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Nilai-Nilai K3 */}
      <section className="py-20 md:py-28">
        <div className="container-k3">
          <RevealOnScroll>
            <SectionHeader eyebrow="Budaya K3" title="Nilai-Nilai Keselamatan" align="center" subtitle="Prinsip dasar yang harus dimiliki setiap pekerja di lingkungan PTFI." />
          </RevealOnScroll>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <RevealOnScroll key={idx} delay={idx * 0.1}>
                  <div className="text-center group">
                    <div className="mx-auto w-20 h-20 rounded-2xl bg-primary-50 dark:bg-primary-900 flex items-center justify-center text-primary-700 dark:text-safety-gold mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-md">
                      <Icon size={36} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-bold text-primary-900 dark:text-white mb-3">{val.title}</h3>
                    <p className="text-neutral-600 dark:text-neutral-300">{val.description}</p>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* Kebijakan K3 Accordion */}
      <section className="py-20 md:py-28 bg-neutral-50 dark:bg-primary-950">
        <div className="container-k3">
          <div className="max-w-3xl mx-auto">
            <RevealOnScroll>
              <SectionHeader eyebrow="Regulasi Internal" title="Kebijakan K3 Perusahaan" align="center" subtitle="Prinsip tata kelola yang mengikat seluruh kegiatan perusahaan." />
            </RevealOnScroll>
            <div className="mt-12">
              <RevealOnScroll delay={0.2}>
                <Accordion items={policies} />
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
