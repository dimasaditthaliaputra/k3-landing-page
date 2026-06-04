import { Image as ImageIcon, Tags, Calendar, Camera } from 'lucide-react';
import { GalleryItem } from '@/types/gallery';

interface GalleryStatsProps {
  items: GalleryItem[];
}

export function GalleryStats({ items }: GalleryStatsProps) {
  const categoriesCount = new Set(items.map(item => item.category)).size;
  
  // Calculate this year's events
  const currentYear = new Date().getFullYear();
  const thisYearCount = items.filter(item => {
    return new Date(item.date).getFullYear() === currentYear;
  }).length;

  const statCards = [
    { label: 'Total Foto', value: items.length, icon: ImageIcon, color: 'text-primary-500', bg: 'bg-primary-500/10' },
    { label: 'Total Kategori', value: categoriesCount, icon: Tags, color: 'text-safety-gold', bg: 'bg-safety-gold/10' },
    { label: 'Kegiatan Tahun Ini', value: thisYearCount, icon: Calendar, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { label: 'Dokumentasi Terbaru', value: items.length > 0 ? new Date(items[0].date).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' }) : '-', icon: Camera, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {statCards.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div key={idx} className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color} flex-shrink-0`}>
              <Icon size={24} />
            </div>
            <div className="min-w-0">
              <p className="text-xl md:text-2xl font-bold text-white leading-none mb-1 truncate">{stat.value}</p>
              <p className="text-xs font-medium text-neutral-400 uppercase tracking-wide truncate">{stat.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
