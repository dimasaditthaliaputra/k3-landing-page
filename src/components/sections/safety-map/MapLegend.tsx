import { Map, MapPin, ShieldPlus, Flame, Shield, Activity } from 'lucide-react';
import { MarkerCategory } from '@/types/map';

interface MapLegendProps {
  className?: string;
}

export const CATEGORY_STYLES: Record<MarkerCategory, { icon: React.ElementType; color: string; bg: string; label: string }> = {
  'assembly-point': { icon: MapPin, color: 'text-green-600', bg: 'bg-green-100', label: 'Assembly Point' },
  'medical': { icon: Activity, color: 'text-red-600', bg: 'bg-red-100', label: 'Pos Medis' },
  'fire-safety': { icon: Flame, color: 'text-orange-500', bg: 'bg-orange-100', label: 'APAR / Fire Safety' },
  'evacuation-route': { icon: Map, color: 'text-blue-500', bg: 'bg-blue-100', label: 'Jalur Evakuasi' },
  'security-post': { icon: Shield, color: 'text-neutral-700', bg: 'bg-neutral-200', label: 'Pos Keamanan' },
};

export function MapLegend({ className = '' }: MapLegendProps) {
  return (
    <div className={`bg-neutral-900 border border-neutral-800 rounded-xl p-4 shadow-lg ${className}`}>
      <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
        <ShieldPlus size={16} className="text-safety-gold" />
        Legenda Peta
      </h3>
      <div className="flex flex-col lg:flex-row gap-3 lg:gap-6 flex-wrap">
        {Object.entries(CATEGORY_STYLES).map(([key, style]) => {
          const Icon = style.icon;
          return (
            <div key={key} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${style.bg} ${style.color}`}>
                <Icon size={16} strokeWidth={2.5} />
              </div>
              <span className="text-sm text-neutral-300 font-medium">{style.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
