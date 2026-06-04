import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// ─── Font ─────────────────────────────────────────────────────────────────────
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: 'K3 PT Freeport Indonesia | Portal Keselamatan Kerja',
    template: '%s | K3 PT Freeport Indonesia',
  },
  description:
    'Portal resmi K3 PT Freeport Indonesia. Temukan informasi keselamatan kerja, regulasi K3, video orientasi, dan peta keselamatan area operasional.',
  keywords: [
    'K3', 'keselamatan kerja', 'PT Freeport Indonesia', 'PTFI',
    'safety', 'kesehatan kerja', 'safety map', 'regulasi K3',
  ],
  authors: [{ name: 'Tim Divisi K3 PT Freeport Indonesia' }],
  creator: 'PT Freeport Indonesia',
  publisher: 'PT Freeport Indonesia',
  metadataBase: new URL('https://k3.ptfi.co.id'),
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    siteName: 'Portal K3 PT Freeport Indonesia',
    title: 'K3 PT Freeport Indonesia | Portal Keselamatan Kerja',
    description:
      'Portal resmi K3 PT Freeport Indonesia. Temukan informasi keselamatan kerja, regulasi K3, video orientasi, dan peta keselamatan.',
    images: [
      {
        url: '/og-images/default.jpg',
        width: 1200,
        height: 630,
        alt: 'Portal K3 PT Freeport Indonesia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'K3 PT Freeport Indonesia | Portal Keselamatan Kerja',
    description: 'Portal resmi K3 PT Freeport Indonesia.',
    images: ['/og-images/default.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#1B3A6B' },
    { media: '(prefers-color-scheme: dark)', color: '#0D2040' },
  ],
  width: 'device-width',
  initialScale: 1,
};

// ─── Root Layout ──────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${inter.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white transition-colors duration-300">
        {/* Skip Navigation — WCAG 2.1 AA */}
        <a href="#main-content" className="skip-nav">
          Lewati ke konten utama
        </a>

        <Navbar />

        <main id="main-content" className="flex-1 flex flex-col">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
