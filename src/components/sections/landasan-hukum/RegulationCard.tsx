import { Download, ExternalLink } from 'lucide-react';
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
      
      <div className="mb-4 flex-grow">
        <h3 className="text-sm font-semibold text-safety-gold mb-1">{regulation.nomor}</h3>
        <p className="text-white font-bold leading-tight mb-3">{regulation.judul}</p>
        <div className="flex flex-col gap-1 text-xs">
          <div className="flex justify-between items-center bg-neutral-800/30 p-2 rounded">
            <span className="text-neutral-500">Status</span>
            <span className={`font-semibold ${
              regulation.status === 'Berlaku' ? 'text-emerald-500' : 'text-red-500'
            }`}>
              {regulation.status}
            </span>
          </div>
          <div className="flex justify-between items-center bg-neutral-800/30 p-2 rounded">
            <span className="text-neutral-500">Sumber</span>
            <span className="text-neutral-300 font-medium">{regulation.sumber}</span>
          </div>
        </div>
      </div>

      <a
        href={regulation.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto flex items-center justify-center gap-2 w-full py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white rounded-lg transition-colors font-medium text-sm"
        aria-label={`Buka regulasi ${regulation.nomor}`}
      >
        {regulation.url.toLowerCase().endsWith('.pdf') ? (
          <>
            <Download size={16} />
            Download PDF
          </>
        ) : (
          <>
            <ExternalLink size={16} />
            Buka Website
          </>
        )}
      </a>
    </div>
  );
}
