import { ImageOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/animations';

interface GalleryEmptyStateProps {
  searchQuery?: string;
  category?: string;
}

export function GalleryEmptyState({ searchQuery, category }: GalleryEmptyStateProps) {
  return (
    <motion.div 
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center py-20 px-4 text-center border border-neutral-800 border-dashed rounded-3xl bg-neutral-900/30"
    >
      <div className="w-20 h-20 bg-neutral-800 rounded-full flex items-center justify-center text-neutral-500 mb-6">
        <ImageOff size={40} />
      </div>
      <h3 className="text-2xl font-bold text-white mb-3">Tidak Ada Foto Ditemukan</h3>
      <p className="text-neutral-400 max-w-md mx-auto">
        Maaf, kami tidak dapat menemukan foto kegiatan untuk 
        {category && category !== 'Semua' ? ` kategori "${category}"` : ''}
        {searchQuery ? ` dengan kata kunci "${searchQuery}"` : ''}.
        Silakan coba kombinasi pencarian atau kategori lain.
      </p>
    </motion.div>
  );
}
