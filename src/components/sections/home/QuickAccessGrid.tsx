'use client';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { Map, Video, Scale, Building2, Images, Phone } from 'lucide-react';
import { SectionHeader } from '@/components/shared/SectionHeader';

const items = [
  { icon: Map,       label: 'Safety Map',       href: '/safety-map',   color: 'bg-emerald-500/10 text-emerald-600', hover: 'group-hover:bg-emerald-500 group-hover:text-white' },
  { icon: Video,     label: 'Video K3',          href: '/video',        color: 'bg-blue-500/10 text-blue-600', hover: 'group-hover:bg-blue-500 group-hover:text-white'    },
  { icon: Scale,     label: 'Regulasi K3',       href: '/landasan-hukum', color: 'bg-safety-gold/10 text-safety-gold', hover: 'group-hover:bg-safety-gold group-hover:text-white' },
  { icon: Building2, label: 'Struktur Org',      href: '/struktur-organisasi', color: 'bg-violet-500/10 text-violet-600', hover: 'group-hover:bg-violet-500 group-hover:text-white' },
  { icon: Images,    label: 'Galeri Kegiatan',   href: '/galeri',       color: 'bg-pink-500/10 text-pink-600', hover: 'group-hover:bg-pink-500 group-hover:text-white'   },
  { icon: Phone,     label: 'Kontak Darurat',    href: '/kontak',       color: 'bg-danger-600/10 text-danger-600', hover: 'group-hover:bg-danger-600 group-hover:text-white'     },
];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export function QuickAccessGrid() {
  return (
    <section className='py-20 bg-white dark:bg-slate-900'>
      <div className='container-k3'>
        <SectionHeader 
          title="Akses Cepat" 
          subtitle="Temukan informasi dan sumber daya K3 dengan cepat dan mudah."
          eyebrow="Navigasi"
        />
        <motion.div
          variants={container} initial='hidden'
          whileInView='visible' viewport={{ once: true, amount: 0.2 }}
          className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6'>
          {items.map(({ icon: Icon, label, href, color, hover }) => (
            <motion.div key={href} variants={itemVariants}>
              <Link href={href}
                className='group flex flex-col items-center gap-4 p-6 rounded-2xl
                bg-white dark:bg-slate-800 border border-neutral-100
                dark:border-slate-700 shadow-sm
                hover:shadow-lg hover:-translate-y-2 hover:border-primary-200
                transition-all duration-300 focus-visible:ring-2
                focus-visible:ring-primary-500 focus-visible:ring-offset-2'
                aria-label={label}>
                <div className={`p-4 rounded-xl ${color} ${hover}
                  transition-colors duration-300 shadow-sm`}>
                  <Icon size={32} strokeWidth={1.5} className="transition-transform duration-300 group-hover:scale-110" />
                </div>
                <span className='text-sm font-bold text-primary-900
                  dark:text-slate-300 text-center leading-tight group-hover:text-safety-gold transition-colors'>{label}</span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
