import Image from 'next/image';
import { Shield, HeartPulse, Leaf } from 'lucide-react';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { RevealOnScroll } from '@/components/shared/RevealOnScroll';
import { Timeline } from '@/components/shared/Timeline';
import CardSwap, { Card } from '@/components/ui/CardSwap';

const milestones = [
  {
    year: '1967',
    title: 'Penandatanganan Kontrak Karya',
    description: 'PT Freeport Indonesia menandatangani Kontrak Karya pertama dengan Pemerintah Indonesia untuk mengembangkan endapan tembaga Ertsberg.',
  },
  {
    year: '1973',
    title: 'Pengiriman Konsentrat Pertama',
    description: 'Pengiriman konsentrat tembaga pertama dilakukan, menandai dimulainya operasi produksi secara komersial.',
  },
  {
    year: '1988',
    title: 'Penemuan Grasberg',
    description: 'Penemuan cadangan Grasberg yang merupakan salah satu cadangan tembaga dan emas terbesar di dunia.',
  },
  {
    year: '2018',
    title: 'IUPK dan Operasi Tambang Bawah Tanah',
    description: 'Peralihan ke IUPK dan transisi menuju operasi tambang bawah tanah skala besar yang sepenuhnya mengutamakan keselamatan.',
  },
];

const commitments = [
  {
    icon: Shield,
    title: 'Keselamatan Kerja',
    description: 'Kami berkomitmen untuk menyediakan lingkungan kerja yang bebas dari insiden dan cedera melalui program keselamatan yang proaktif dan keterlibatan seluruh karyawan.',
  },
  {
    icon: HeartPulse,
    title: 'Kesehatan Kerja',
    description: 'Kami menjaga kesehatan fisik dan mental karyawan melalui layanan kesehatan yang komprehensif, program kebugaran, dan pemantauan paparan bahaya.',
  },
  {
    icon: Leaf,
    title: 'Lingkungan Kerja',
    description: 'Kami menjalankan operasi yang bertanggung jawab dengan meminimalkan dampak lingkungan dan berinvestasi dalam teknologi yang ramah lingkungan dan berkelanjutan.',
  },
];

export function TentangSection() {
  return (
    <div className="bg-neutral-900 overflow-hidden" id="tentang">
      {/* Profil Perusahaan */}
      <section className="py-20 md:py-28 relative">
        <div className="container-k3 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <RevealOnScroll delay={0.1} className="w-full flex items-center justify-center relative min-h-[280px] md:min-h-[460px] overflow-visible mt-8 md:mt-0">
              <div className="relative w-[85%] md:w-[30rem] aspect-[4/3] md:aspect-auto md:h-[20rem] max-w-full overflow-visible mx-auto">
                <CardSwap
                  width="100%"
                  height="100%"
                  cardDistance={30}
                  verticalDistance={35}
                  delay={3500}
                  pauseOnHover={true}
                  skewAmount={4}
                >
                  <Card className="overflow-hidden border border-neutral-700 bg-neutral-800 shadow-2xl relative rounded-2xl">
                    <Image src="/images/hero-mine.png" alt="Area Tambang PTFI" fill className="object-cover" />
                  </Card>
                  <Card className="overflow-hidden border border-neutral-700 bg-neutral-800 shadow-2xl relative rounded-2xl">
                    <Image src="/images/commitment-1.png" alt="Budaya Keselamatan PTFI" fill className="object-cover" />
                  </Card>
                  <Card className="overflow-hidden border border-neutral-700 bg-neutral-800 shadow-2xl relative rounded-2xl">
                    <Image src="/images/commitment-2.png" alt="Teknologi K3 PTFI" fill className="object-cover" />
                  </Card>
                </CardSwap>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <SectionHeader 
                eyebrow="Profil" 
                title="Sejarah & Operasi Kami" 
                align="left" 
              />
              <div className="mt-8 space-y-6 text-neutral-300 text-lg leading-relaxed text-justify">
                <p>
                  PT Freeport Indonesia (PTFI) adalah salah satu perusahaan pertambangan terkemuka di dunia yang mengelola dan mengeksplorasi cadangan tembaga, emas, dan perak di Kabupaten Mimika, Provinsi Papua Tengah, Indonesia.
                </p>
                <p>
                  Sebagai perusahaan yang beroperasi di lingkungan yang kompleks dan menantang, kami menyadari bahwa keselamatan adalah kunci utama keberhasilan operasional. Sistem manajemen Keselamatan dan Kesehatan Kerja (K3) kami dirancang untuk melindungi setiap individu, memastikan bahwa seluruh karyawan dan kontraktor dapat bekerja dengan aman dan kembali ke keluarga mereka setiap hari.
                </p>
                <p>
                  Kami berkomitmen terhadap nilai-nilai inti keselamatan, rasa hormat, integritas, keunggulan, dan komitmen dalam setiap aspek operasional kami.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Sejarah Singkat (Timeline) */}
      <section className="py-20 md:py-28 bg-neutral-50">
        <div className="container-k3">
          <RevealOnScroll>
            <SectionHeader 
              eyebrow="Jejak Langkah" 
              title="Sejarah Singkat PTFI" 
              align="center" 
              subtitle="Perjalanan panjang operasional kami dengan komitmen tanpa kompromi terhadap keselamatan." 
              subTextColor='text-gray-500'
              textColor='text-primary-900'
            />
          </RevealOnScroll>
          <div className="mt-16">
            <Timeline items={milestones} />
          </div>
        </div>
      </section>

      {/* Komitmen K3 & Lingkungan */}
      <section className="py-20 md:py-28">
        <div className="container-k3">
          <RevealOnScroll>
            <SectionHeader 
              eyebrow="Prioritas Utama" 
              title="Komitmen Kami" 
              align="center" 
              subtitle="Tiga pilar utama dalam menciptakan lingkungan operasional yang berkelanjutan." 
            />
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {commitments.map((item, idx) => {
              const Icon = item.icon;
              return (
                <RevealOnScroll key={idx} delay={idx * 0.1}>
                  <div className="p-8 rounded-2xl bg-neutral-800 border -neutral-700 shadow-lg hover:shadow-xl transition-shadow h-full">
                    <div className="w-14 h-14 rounded-full bg-primary-900/50 text-safety-gold flex items-center justify-center mb-6">
                      <Icon size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                    <p className="text-neutral-300 leading-relaxed text-justify">
                      {item.description}
                    </p>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
