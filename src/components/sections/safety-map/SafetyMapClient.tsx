'use client';

import { useState, useEffect } from 'react';
import { MarkerCategory, MapMarker } from '@/types/map';
import { CATEGORY_STYLES, MapLegend } from '@/components/sections/safety-map/MapLegend';
import { LayerControls } from '@/components/sections/safety-map/LayerControls';
import { InfoPanel } from '@/components/sections/safety-map/InfoPanel';
import { NoSSRMap } from '@/components/sections/safety-map/NoSSRMap';
import { RevealOnScroll } from '@/components/shared/RevealOnScroll';

export default function SafetyMapClient() {
  const allCategories = Object.keys(CATEGORY_STYLES) as MarkerCategory[];
  const [activeCategories, setActiveCategories] = useState<MarkerCategory[]>(allCategories);
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleCategoryChange = (categories: MarkerCategory[]) => {
    setActiveCategories(categories);
    // Auto-close panel if selected marker's category is hidden
    if (selectedMarker && !categories.includes(selectedMarker.category)) {
      setSelectedMarker(null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <RevealOnScroll delay={0.1}>
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-2">
          <LayerControls 
            activeCategories={activeCategories} 
            onChange={handleCategoryChange} 
          />
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={0.2} className="relative w-full">
        <NoSSRMap 
          activeCategories={activeCategories}
          onMarkerClick={setSelectedMarker}
        />
        
        {/* Floating Legend (Desktop) */}
        <div className="hidden lg:block absolute bottom-6 left-6 z-[1000]">
          <MapLegend />
        </div>
        
        <InfoPanel 
          marker={selectedMarker} 
          onClose={() => setSelectedMarker(null)} 
          isMobile={isMobile}
        />
      </RevealOnScroll>

      {/* Mobile Legend */}
      <RevealOnScroll delay={0.3} className="block lg:hidden mt-4">
        <MapLegend />
      </RevealOnScroll>
    </div>
  );
}
