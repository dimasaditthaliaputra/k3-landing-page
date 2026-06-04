import Image from 'next/image';
import { ZoomIn, MapPin, CalendarDays } from 'lucide-react';
import { GalleryItem } from '@/types/gallery';


interface GalleryCardProps {
  item: GalleryItem;
  onClick: (item: GalleryItem) => void;
}

export function GalleryCard({ item, onClick }: GalleryCardProps) {
  // Map category to a specific color badge if desired, here using generic style
  
  return (
    <button
      onClick={() => onClick(item)}
      className="group relative block w-full rounded-2xl overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-safety-gold focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 text-left"
      aria-label={`Lihat detail foto: ${item.title}`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-800">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
        
        {/* Hover zoom icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
            <ZoomIn size={24} />
          </div>
        </div>

        {/* Top Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-safety-gold text-primary-950 shadow-sm">
            {item.category}
          </span>
        </div>

        {/* Bottom Info */}
        <div className="absolute bottom-0 left-0 w-full p-5">
          <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
            {item.title}
          </h3>
          <div className="flex items-center gap-4 text-xs font-medium text-neutral-300">
            <div className="flex items-center gap-1.5">
              <CalendarDays size={14} />
              {new Date(item.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin size={14} />
              <span className="truncate max-w-[120px]">{item.location}</span>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
