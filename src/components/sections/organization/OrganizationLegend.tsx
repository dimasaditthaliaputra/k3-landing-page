'use client';

import { OrganizationLevel } from '@/types/organization';
import { cn } from '@/lib/utils';

const LEGEND_ITEMS: { level: OrganizationLevel; label: string; colorClass: string; textClass: string }[] = [
  { level: 'Pemegang Saham', label: 'Pemegang Saham', colorClass: 'bg-purple-300', textClass: 'text-purple-300' },
  { level: 'Komisaris', label: 'Komisaris', colorClass: 'bg-purple-400', textClass: 'text-purple-400' },
  { level: 'Direksi Utama', label: 'Direksi Utama', colorClass: 'bg-cyan-500', textClass: 'text-cyan-500' },
  { level: 'Direksi Fungsional', label: 'Direksi Fungsional', colorClass: 'bg-blue-400', textClass: 'text-blue-400' },
  { level: 'SVP Divisi', label: 'SVP Divisi', colorClass: 'bg-orange-400', textClass: 'text-orange-400' },
  { level: 'VP Departemen', label: 'VP Departemen', colorClass: 'bg-yellow-400', textClass: 'text-yellow-400' },
  { level: 'Manajerial', label: 'Manajerial', colorClass: 'bg-fuchsia-400', textClass: 'text-fuchsia-400' },
  { level: 'Operasional', label: 'Operasional', colorClass: 'bg-green-400', textClass: 'text-green-400' },
];

export function OrganizationLegend() {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-4 md:gap-8 justify-center shadow-sm">
      <h3 className="text-sm font-bold text-white uppercase tracking-wider md:border-r md:border-neutral-800 md:pr-8">
        Keterangan Level
      </h3>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {LEGEND_ITEMS.map((item) => (
          <div key={item.level} className="flex items-center gap-2">
            <div className={cn("w-3 h-3 rounded-sm", item.colorClass)}></div>
            <span className={cn("text-xs font-semibold uppercase tracking-wide", item.textClass)}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
