import { Map } from 'lucide-react';

export function MapSkeleton() {
  return (
    <div className="w-full h-[450px] lg:h-[650px] rounded-3xl overflow-hidden relative bg-neutral-900 border border-neutral-800 flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-neutral-800 animate-pulse opacity-20"></div>
      
      {/* Grid pattern overlay to simulate map tiles */}
      <div 
        className="absolute inset-0 opacity-10" 
        style={{
          backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      ></div>

      <div className="relative z-10 flex flex-col items-center gap-4 text-neutral-500">
        <Map size={48} className="animate-bounce" />
        <p className="text-lg font-semibold animate-pulse">Memuat Peta Keselamatan...</p>
      </div>

      {/* Floating skeleton controls */}
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        <div className="w-8 h-16 bg-neutral-800 rounded shadow-sm"></div>
      </div>
    </div>
  );
}
