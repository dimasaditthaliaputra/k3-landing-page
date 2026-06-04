import { useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, CalendarDays, MapPin } from 'lucide-react';
import { GalleryItem } from '@/types/gallery';

interface LightboxProps {
  item: GalleryItem | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}

export function Lightbox({ item, onClose, onNext, onPrev, hasNext, hasPrev }: LightboxProps) {
  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!item) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowRight':
          if (hasNext) onNext();
          break;
        case 'ArrowLeft':
          if (hasPrev) onPrev();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    // Prevent scrolling behind lightbox
    if (item) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [item, onClose, onNext, onPrev, hasNext, hasPrev]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`Galeri: ${item.title}`}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50 focus:outline-none focus:ring-2 focus:ring-safety-gold"
            aria-label="Tutup lightbox"
          >
            <X size={24} />
          </button>

          {/* Previous Button */}
          {hasPrev && (
            <button
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 p-4 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full transition-colors z-50 focus:outline-none focus:ring-2 focus:ring-safety-gold hidden md:flex items-center justify-center"
              aria-label="Foto sebelumnya"
            >
              <ChevronLeft size={32} />
            </button>
          )}

          {/* Next Button */}
          {hasNext && (
            <button
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 p-4 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full transition-colors z-50 focus:outline-none focus:ring-2 focus:ring-safety-gold hidden md:flex items-center justify-center"
              aria-label="Foto selanjutnya"
            >
              <ChevronRight size={32} />
            </button>
          )}

          {/* Content Container */}
          <div 
            className="relative w-full h-full flex flex-col md:items-center md:justify-center outline-none"
            onClick={onClose} // Clicking outside closes
          >
            {/* Image Wrapper */}
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full h-[55vh] md:h-auto md:max-w-5xl md:max-h-[85vh] md:aspect-video md:rounded-xl overflow-hidden md:shadow-2xl flex-shrink-0"
              onClick={(e) => e.stopPropagation()} // Prevent close when clicking image
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-contain bg-neutral-900/50"
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority
              />
            </motion.div>

            {/* Info Panel (Below Image on Mobile, Overlay on Desktop) */}
            <div 
              className="w-full flex-1 md:flex-none overflow-y-auto md:overflow-visible bg-neutral-900 md:bg-transparent md:absolute md:bottom-0 md:left-0 md:p-8 md:bg-gradient-to-t md:from-black/90 md:via-black/60 md:to-transparent flex flex-col justify-start md:justify-end pb-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="max-w-5xl mx-auto w-full px-6 pt-6 md:p-0">
                <span className="inline-flex items-center md:mx-6 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-safety-gold text-primary-950 mb-3">
                  {item.category}
                </span>
                
                <h2 className="text-2xl md:text-3xl md:mx-6 font-bold text-white mb-2">
                  {item.title}
                </h2>
                
                <p className="text-neutral-300 text-sm md:mx-6 md:text-base max-w-3xl mb-4 line-clamp-none">
                  {item.description}
                </p>
                
                <div className="flex flex-wrap md:mx-6 items-center gap-4 text-xs md:text-sm font-medium text-neutral-400">
                  <div className="flex items-center gap-1.5">
                    <CalendarDays size={16} className="text-neutral-500" />
                    {new Date(item.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin size={16} className="text-neutral-500" />
                    {item.location}
                  </div>
                </div>

                {/* Mobile Navigation Controls */}
                <div className="flex justify-between items-center mt-8 md:hidden">
                  <button
                    onClick={onPrev}
                    disabled={!hasPrev}
                    className="p-3 bg-neutral-800 rounded-full disabled:opacity-30 text-white"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={onNext}
                    disabled={!hasNext}
                    className="p-3 bg-neutral-800 rounded-full disabled:opacity-30 text-white"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
