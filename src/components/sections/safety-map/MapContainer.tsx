'use client';

import { useEffect, useState } from 'react';
import { MapContainer as LeafletMap, ImageOverlay, Marker, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapMarker } from '@/types/map';
import { CATEGORY_STYLES } from './MapLegend';
import mapMarkersData from '@/data/map-markers.json';

// Define bounds for the static image map (e.g. 1000 width x 800 height)
const bounds: L.LatLngBoundsExpression = [[0, 0], [800, 1000]];

interface MapContainerProps {
  activeCategories: string[];
  onMarkerClick: (marker: MapMarker) => void;
}

// Generate custom divIcon based on category style
const createCustomIcon = (category: string) => {
  const style = CATEGORY_STYLES[category as keyof typeof CATEGORY_STYLES];
  
  // A raw SVG string resembling a map pin to keep it simple and avoid ReactDOMServer overhead
  const getIconSvg = (colorClass: string) => {
    // Map tailwind text colors to hex for SVG stroke/fill
    const colorMap: Record<string, string> = {
      'text-green-600': '#16a34a',
      'text-red-600': '#dc2626',
      'text-orange-500': '#f97316',
      'text-blue-500': '#3b82f6',
      'text-neutral-700': '#404040',
    };
    const color = colorMap[colorClass] || '#000000';
    
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${color}" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3" fill="#ffffff"></circle></svg>`;
  };

  return L.divIcon({
    className: 'custom-leaflet-icon',
    html: `
      <div class="relative group" style="width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;">
        <div class="absolute -inset-2 bg-white/20 rounded-full animate-pulse"></div>
        ${getIconSvg(style.color)}
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });
};

export default function MapContainer({ activeCategories, onMarkerClick }: MapContainerProps) {
  const [mounted, setMounted] = useState(false);
  
  const markers = (mapMarkersData as MapMarker[]).filter(marker => 
    activeCategories.includes(marker.category)
  );

  useEffect(() => {
    // Fix for Leaflet default icon issues in some bundlers, though we use custom icons anyway
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full h-[450px] lg:h-[650px] rounded-3xl overflow-hidden shadow-2xl border border-neutral-800 z-10 relative">
      <LeafletMap 
        crs={L.CRS.Simple}
        bounds={bounds}
        maxZoom={2}
        minZoom={-2}
        zoomControl={false} // We will add it manually for positioning
        className="w-full h-full bg-[#f8f9fa]"
        aria-label="Peta Keselamatan Interaktif"
      >
        {/* Using the floor plan image as the map base */}
        <ImageOverlay
          url="/images/floor-plan.png"
          bounds={bounds}
        />
        
        <ZoomControl position="topleft" />

        {markers.map((marker) => (
          <Marker 
            key={marker.id}
            position={[marker.coordinates.lat, marker.coordinates.lng]}
            icon={createCustomIcon(marker.category)}
            eventHandlers={{
              click: () => onMarkerClick(marker),
            }}
          />
        ))}
      </LeafletMap>
      
      {/* Global styles for leaflet overrides to fit dark theme */}
      <style dangerouslySetInnerHTML={{__html: `
        .leaflet-container {
          background: #f8f9fa !important;
          font-family: inherit;
        }
        .leaflet-bar a {
          background-color: #262626 !important;
          color: #a3a3a3 !important;
          border-color: #404040 !important;
        }
        .leaflet-bar a:hover {
          background-color: #404040 !important;
          color: #ffffff !important;
        }
        .leaflet-control-attribution {
          background-color: rgba(23, 23, 23, 0.8) !important;
          color: #a3a3a3 !important;
        }
        .leaflet-control-attribution a {
          color: #d4d4d4 !important;
        }
      `}} />
    </div>
  );
}
