import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function CTABanner() {
  return (
    <section className="relative py-20 bg-safety-gold overflow-hidden">
      <div className="container-k3 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-2xl text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            Mari Wujudkan Area Kerja yang Aman
          </h2>
          <p className="text-left md:text-justify text-md md:text-lg text-white/90 ">
            Hubungi tim K3 kami jika Anda membutuhkan panduan, pelaporan, atau informasi lebih lanjut terkait keselamatan.
          </p>
        </div>
        {/* <div className="shrink-0">
          <Link href="/kontak" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-safety-gold-dark font-bold text-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg">
            Hubungi Kami <ArrowRight size={20} />
          </Link>
        </div> */}
      </div>
    </section>
  );
}
