import { Download, FileWarning, ExternalLink } from 'lucide-react';
import { Regulation } from '@/types/regulation';
import { RegulationCard } from './RegulationCard';

interface RegulationTableProps {
  regulations: Regulation[];
}

export function RegulationTable({ regulations }: RegulationTableProps) {
  if (regulations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 bg-neutral-900/50 border border-neutral-800 border-dashed rounded-2xl text-center">
        <FileWarning size={48} className="text-neutral-600 mb-4" />
        <h3 className="text-lg font-bold text-white mb-2">Regulasi Tidak Ditemukan</h3>
        <p className="text-neutral-400 max-w-md">
          Maaf, tidak ada regulasi yang cocok dengan pencarian atau filter Anda saat ini.
        </p>
      </div>
    );
  }

  const getBadgeClass = (kategori: string) => {
    switch (kategori) {
      case 'UU': return 'bg-safety-gold text-primary-950';
      case 'PP': return 'bg-orange-500 text-white';
      case 'Permen': return 'bg-blue-500 text-white';
      default: return 'bg-neutral-700 text-white';
    }
  };

  return (
    <>
      {/* Mobile view (Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
        {regulations.map((reg) => (
          <RegulationCard key={reg.id} regulation={reg} />
        ))}
      </div>

      {/* Desktop view (Table) */}
      <div className="hidden lg:block overflow-x-auto bg-neutral-900 border border-neutral-800 rounded-2xl shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-800/50 text-neutral-400 uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-4 rounded-tl-2xl">Nomor</th>
              <th className="px-6 py-4">Judul Regulasi</th>
              <th className="px-6 py-4">Kategori</th>
              <th className="px-6 py-4 text-center">Tahun</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Sumber</th>
              <th className="px-6 py-4 text-center rounded-tr-2xl">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {regulations.map((reg) => (
              <tr key={reg.id} className="hover:bg-neutral-800/30 transition-colors">
                <td className="px-6 py-4 font-semibold text-safety-gold whitespace-nowrap">
                  {reg.nomor}
                </td>
                <td className="px-6 py-4 text-white font-medium">
                  {reg.judul}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${getBadgeClass(reg.kategori)}`}>
                    {reg.kategori}
                  </span>
                </td>
                <td className="px-6 py-4 text-center text-neutral-400 font-medium">
                  {reg.tahun}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold ${
                    reg.status === 'Berlaku' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
                  }`}>
                    {reg.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-neutral-400 text-sm whitespace-nowrap">
                  {reg.sumber}
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center">
                    <a
                      href={reg.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white rounded-lg transition-colors font-medium text-xs border border-transparent hover:border-neutral-600"
                      aria-label={`Buka regulasi ${reg.nomor}`}
                    >
                      {reg.url.toLowerCase().endsWith('.pdf') ? (
                        <>
                          <Download size={14} />
                          PDF
                        </>
                      ) : (
                        <>
                          <ExternalLink size={14} />
                          Website
                        </>
                      )}
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
