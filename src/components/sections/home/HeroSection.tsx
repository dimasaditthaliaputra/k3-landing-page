'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { heroItem } from '@/lib/animations';

export function HeroSection() {
  return (
    <section className='relative h-dvh flex items-center overflow-hidden'>
      {/* Background */}
      <Image src='/images/hero-mine.png' alt='Area operasional PTFI'
        fill priority className='object-cover object-center' />
      {/* Gradient overlay */}
      <div className='absolute inset-0 bg-gradient-to-r
        from-primary-900/90 via-primary-900/70 to-transparent' />
      
      {/* Content */}
      <div className='relative z-10 container-k3'>
        <motion.h1 custom={1} initial='hidden' animate='visible' variants={heroItem}
          className='text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4 max-w-4xl'>
          Keselamatan Adalah <br className="hidden md:block" />
          <span className='text-safety-gold'>Prioritas Utama</span>
        </motion.h1>
        <motion.p custom={2} initial='hidden' animate='visible' variants={heroItem}
          className='text-lg md:text-xl text-primary-200 max-w-2xl mb-10 leading-relaxed'>
          PT Freeport Indonesia berkomitmen menjaga keselamatan
          setiap karyawan dan kontraktor di lingkungan kerja
        </motion.p>
        <motion.div custom={3} initial='hidden' animate='visible' variants={heroItem}
          className='flex flex-wrap items-center gap-4'>
          <Link href='/safety-map'
            className='inline-flex items-center gap-2 px-8 py-4 rounded-full
            bg-safety-gold hover:bg-safety-gold-light text-primary-900 font-bold text-lg
            transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(201,135,10,0.4)] hover:shadow-[0_0_30px_rgba(201,135,10,0.6)]'>
            Lihat Safety Map <ArrowRight size={20} />
          </Link>
          <Link href='/video'
            className='inline-flex items-center gap-2 px-8 py-4 rounded-full
            border border-white/30 hover:border-white/60 text-white font-bold text-lg
            backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:scale-105'>
            <PlayCircle size={20} /> Video Keselamatan
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className='absolute bottom-8 left-1/2 -translate-x-1/2
        animate-[bounce-y_2s_infinite] text-white/50 flex flex-col items-center gap-2'>
        <span className="text-xs font-semibold tracking-widest uppercase">Scroll</span>
        <svg width='24' height='24' viewBox='0 0 24 24' fill='none'
          stroke='currentColor' strokeWidth='2' className="opacity-80">
          <path d='M12 5v14M5 12l7 7 7-7'/>
        </svg>
      </div>
    </section>
  );
}
