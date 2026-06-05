"use client";

import { useState } from 'react';
import Image from 'next/image';
import { PlayCircle } from 'lucide-react';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { RevealOnScroll } from '@/components/shared/RevealOnScroll';
import { Modal } from '@/components/ui/Modal';
import videos from '@/data/videos.json';

// Helper function to extract YouTube video ID from URL
function getYouTubeId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export function VideoPreviewSection() {
  const [activeVideo, setActiveVideo] = useState<typeof videos[0] | null>(null);

  return (
    <section className="py-24 bg-white dark:bg-primary-900" id='video'>
      <div className="container-k3">
        <SectionHeader 
          eyebrow="K3 PTFI" 
          title="Video Keselamatan Terbaru" 
          subtitle="Tingkatkan pemahaman prosedur kerja aman melalui pustaka video K3 kami."
          align="center"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {videos.slice(0, 3).map((video, idx) => (
            <RevealOnScroll key={video.id} delay={idx * 0.1}>
              <div 
                onClick={() => setActiveVideo(video)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveVideo(video);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`Putar video: ${video.title}`}
                className="group cursor-pointer rounded-2xl overflow-hidden border border-neutral-200 dark:border-primary-800 bg-white dark:bg-primary-950 hover:shadow-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-safety-gold"
              >
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image src={video.thumbnail} alt={video.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 rounded-full bg-safety-gold/90 flex items-center justify-center text-primary-900 shadow-lg transform scale-50 group-hover:scale-100 transition-transform duration-300">
                      <PlayCircle size={32} />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 rounded text-xs text-white font-medium">
                    {video.duration}
                  </div>
                </div>
                <div className="p-5">
                  <div className="inline-flex px-2 py-1 rounded bg-primary-900/50 text-white text-xs font-bold mb-3">
                    {video.category}
                  </div>
                  <h3 className="text-lg font-bold text-primary-900 mb-2 line-clamp-2">
                    {video.title}
                  </h3>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
        {/* <div className="mt-12 text-center">
          <Link href="/video" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-primary-200 dark:border-primary-700 hover:bg-primary-50 dark:hover:bg-primary-800 text-primary-700 dark:text-white font-semibold transition-colors">
            Lihat Semua Video
          </Link>
        </div> */}
      </div>

      {/* Video Lightbox Modal */}
      <Modal 
        open={activeVideo !== null} 
        onClose={() => setActiveVideo(null)} 
        title={activeVideo?.title}
      >
        {activeVideo && (
          <div className="aspect-video w-full">
            <iframe
              src={`https://www.youtube.com/embed/${getYouTubeId(activeVideo.url)}?autoplay=1`}
              title={activeVideo.title}
              className="w-full h-full border-none"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        )}
      </Modal>
    </section>
  );
}
