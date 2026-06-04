'use client';

import { useState, useMemo } from 'react';
import { GalleryItem, GalleryCategory } from '@/types/gallery';
import { GalleryStats } from './GalleryStats';
import { GallerySearch } from './GallerySearch';
import { GalleryFilter } from './GalleryFilter';
import { GalleryGrid } from './GalleryGrid';
import { GalleryEmptyState } from './GalleryEmptyState';
import { Lightbox } from '@/components/ui/Lightbox';
import { RevealOnScroll } from '@/components/shared/RevealOnScroll';
import galleryData from '@/data/gallery.json';

const allGalleryItems = galleryData as GalleryItem[];

export default function GalleryClient() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Lightbox state
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredItems = useMemo(() => {
    return allGalleryItems.filter((item) => {
      const matchCategory = activeCategory === 'Semua' || item.category === activeCategory;
      const query = searchQuery.toLowerCase();
      const matchSearch = 
        item.title.toLowerCase().includes(query) || 
        item.category.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query);
      
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleItemClick = (item: GalleryItem) => {
    const index = filteredItems.findIndex(i => i.id === item.id);
    if (index !== -1) {
      setSelectedIndex(index);
    }
  };

  const closeLightbox = () => setSelectedIndex(null);
  
  const handleNext = () => {
    if (selectedIndex !== null && selectedIndex < filteredItems.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const handlePrev = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  return (
    <>
      <div className="space-y-12">
        {/* Stats */}
        <RevealOnScroll delay={0.1}>
          <GalleryStats items={allGalleryItems} />
        </RevealOnScroll>

        {/* Controls */}
        <div className="space-y-6">
          <RevealOnScroll delay={0.2} className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
            <GallerySearch onSearch={setSearchQuery} />
            <GalleryFilter activeCategory={activeCategory} onChange={setActiveCategory} />
          </RevealOnScroll>

          {/* Grid / Empty State */}
          <RevealOnScroll delay={0.3}>
            {filteredItems.length > 0 ? (
              <GalleryGrid items={filteredItems} onItemClick={handleItemClick} />
            ) : (
              <GalleryEmptyState searchQuery={searchQuery} category={activeCategory} />
            )}
          </RevealOnScroll>
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox 
        item={selectedIndex !== null ? filteredItems[selectedIndex] : null}
        onClose={closeLightbox}
        onNext={handleNext}
        onPrev={handlePrev}
        hasNext={selectedIndex !== null && selectedIndex < filteredItems.length - 1}
        hasPrev={selectedIndex !== null && selectedIndex > 0}
      />
    </>
  );
}
