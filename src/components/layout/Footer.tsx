import Link from 'next/link';
import { Shield, Phone, Mail, MapPin, ExternalLink, Heart } from 'lucide-react';

const footerLinks = {
  tentang: {
    title: 'Tentang PTFI',
    links: [
      { label: 'Profil Perusahaan', href: '/tentang/profil' },
      { label: 'Sejarah Perusahaan', href: '/tentang/sejarah' },
      { label: 'Komitmen Keselamatan', href: '/tentang/komitmen' },
      { label: 'Visi & Misi K3', href: '/visi-misi' },
    ],
  },
  k3: {
    title: 'Program K3',
    links: [
      { label: 'Safety Map', href: '/safety-map' },
      { label: 'Landasan Hukum', href: '/landasan-hukum' },
      { label: 'Struktur Organisasi', href: '/struktur-organisasi' },
      { label: 'Video Keselamatan', href: '/video' },
    ],
  },
  media: {
    title: 'Media & Informasi',
    links: [
      { label: 'Galeri Kegiatan', href: '/galeri' },
      { label: 'Video K3', href: '/video' },
      { label: 'Kontak & FAQ', href: '/kontak' },
    ],
  },
};

const contacts = [
  { icon: Phone, label: 'Darurat K3', value: '(0901) 123-4567', href: 'tel:+62901123456' },
  { icon: Mail, label: 'Email K3', value: 'k3@ptfi.co.id', href: 'mailto:k3@ptfi.co.id' },
  {
    icon: MapPin,
    label: 'Lokasi',
    value: 'Tembagapura, Mimika, Papua Tengah',
    href: 'https://maps.google.com/?q=Tembagapura+Papua',
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 text-white" role="contentinfo" id="kontak">
      {/* Emergency Banner */}
      <div className="bg-danger-600 py-3">
        <div className="container-k3 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse" />
            Darurat K3: Hubungi Hotline 24 Jam
          </div>
          <a
            href="tel:+62901123456"
            className="inline-flex items-center gap-1.5 text-sm font-bold bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-colors"
            aria-label="Telepon hotline darurat K3"
          >
            <Phone size={14} strokeWidth={2} />
            (0901) 123-4567
          </a>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-k3 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-safety-gold rounded-lg"
              aria-label="K3 PT Freeport Indonesia — Beranda"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary-700 border border-primary-600">
                <Shield size={22} className="text-white" strokeWidth={2} />
              </div>
              <div className="leading-tight">
                <div className="font-bold text-white text-base">K3 PTFI</div>
                <div className="text-primary-300 text-xs">PT Freeport Indonesia</div>
              </div>
            </Link>

            <p className="text-primary-300 text-sm leading-relaxed mb-5 max-w-xs text-justify">
              Portal resmi Keselamatan dan Kesehatan Kerja PT Freeport Indonesia.
              Membangun budaya keselamatan yang berkelanjutan demi lingkungan kerja
              yang aman dan sehat.
            </p>

            {/* Contact Info */}
            <div className="space-y-2.5">
              {contacts.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={href}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-start gap-2.5 text-sm text-primary-300 hover:text-white transition-colors group"
                  aria-label={`${label}: ${value}`}
                >
                  <Icon
                    size={15}
                    strokeWidth={1.75}
                    className="mt-0.5 shrink-0 text-safety-gold group-hover:text-safety-gold-light transition-colors"
                  />
                  <span>{value}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2.5" role="list">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-primary-300 hover:text-white transition-colors duration-150 inline-flex items-center gap-1 group"
                    >
                      <span className="group-hover:translate-x-0.5 transition-transform duration-150">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Certifications / Badges */}
        <div className="mt-10 pt-8 border-t border-primary-800">
          <div className="flex flex-wrap gap-3 mb-6">
            {['ISO 45001:2018', 'OHSAS 18001', 'SMK3 Gold', 'Zero Accident Award'].map((cert) => (
              <span
                key={cert}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary-800 text-safety-gold border border-primary-700"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-800 py-4">
        <div className="container-k3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-primary-400">
          <p>
            &copy; {currentYear} PT Freeport Indonesia. Hak Cipta Dilindungi Undang-Undang.
          </p>
          <p className="flex items-center gap-1">
            Dibuat dengan
            <Heart size={11} className="text-danger-600 fill-danger-600 mx-0.5" aria-hidden="true" />
            untuk keselamatan kerja Indonesia
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.ptfi.co.id"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors inline-flex items-center gap-1"
            >
              PTFI.co.id <ExternalLink size={10} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
