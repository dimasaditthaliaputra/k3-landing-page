import { motion } from 'framer-motion';
import { GalleryItem } from '@/types/gallery';
import { GalleryCard } from './GalleryCard';
import { staggerContainer, fadeUp } from '@/lib/animations';

interface GalleryGridProps {
  items: GalleryItem[];
  onItemClick: (item: GalleryItem) => void;
}

export function GalleryGrid({ items, onItemClick }: GalleryGridProps) {
  return (
    <motion.div 
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="columns-2 md:columns-3 xl:columns-4 gap-3 md:gap-6 space-y-3 md:space-y-6"
    >
      {items.map((item) => (
        <motion.div key={item.id} variants={fadeUp} className="break-inside-avoid">
          <GalleryCard item={item} onClick={onItemClick} />
        </motion.div>
      ))}
    </motion.div>
  );
}
