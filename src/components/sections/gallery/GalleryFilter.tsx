import { GalleryCategory } from '@/types/gallery';
import { motion, LayoutGroup } from 'framer-motion';

interface GalleryFilterProps {
  activeCategory: GalleryCategory;
  onChange: (category: GalleryCategory) => void;
}

const CATEGORIES: GalleryCategory[] = [
  'Semua',
  'Pelatihan K3',
  'Simulasi Darurat',
  'Kampanye K3',
  'Inspeksi',
  'Penghargaan'
];

export function GalleryFilter({ activeCategory, onChange }: GalleryFilterProps) {
  return (
    <LayoutGroup>
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              onClick={() => onChange(category)}
              className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200
                ${isActive 
                  ? 'text-primary-950' 
                  : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600'
                }
              `}
              aria-pressed={isActive}
            >
              {isActive && (
                <motion.div
                  layoutId="active-gallery-filter"
                  className="absolute inset-0 bg-safety-gold rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {category}
            </button>
          );
        })}
      </div>
    </LayoutGroup>
  );
}
