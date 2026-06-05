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
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
    >
      {items.map((item) => (
        <motion.div key={item.id} variants={fadeUp}>
          <GalleryCard item={item} onClick={onItemClick} />
        </motion.div>
      ))}
    </motion.div>
  );
}
