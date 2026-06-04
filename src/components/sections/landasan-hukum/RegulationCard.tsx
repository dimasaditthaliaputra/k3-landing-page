import { Download } from 'lucide-react';
import { Regulation } from '@/types/regulation';

interface RegulationCardProps {
  regulation: Regulation;
}

const getCategoryColor = (kategori: string) => {
  switch (kategori) {
    case 'UU': return 'bg-safety-gold text-primary-950';
    case 'PP': return 'bg-orange-500 text-white';
    case 'Permen': return 'bg-blue-500 text-white';
    default: return 'bg-neutral-700 text-white';
  }
};

export function RegulationCard({ regulation }: RegulationCardProps) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 shadow-sm hover:border-neutral-700 transition-colors flex flex-col h-full">
      <div className="flex justify-between items-start gap-4 mb-4">
        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${getCategoryColor(regulation.kategori)}`}>
          {regulation.kategori}
        </span>
        <span className="text-sm font-medium text-neutral-500 bg-neutral-800/50 px-2 py-1 rounded">
          {regulation.tahun}
        </span>
      </div>
      
      <div className="mb-6 flex-grow">
        <h3 className="text-sm font-semibold text-safety-gold mb-1">{regulation.nomor}</h3>
        <p className="text-white font-bold leading-tight">{regulation.judul}</p>
      </div>

      <a
        href={regulation.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto flex items-center justify-center gap-2 w-full py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white rounded-lg transition-colors font-medium text-sm"
        aria-label={`Download PDF ${regulation.nomor}`}
      >
        <Download size={16} />
        Download PDF
      </a>
    </div>
  );
}
