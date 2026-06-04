import { Book, Scale, FileText, Globe } from 'lucide-react';

interface StatsProps {
  stats: {
    total: number;
    uu: number;
    pp: number;
    permen: number;
    internasional: number;
  };
}

export function RegulationStats({ stats }: StatsProps) {
  const statCards = [
    { label: 'Total Regulasi', value: stats.total, icon: Book, color: 'text-primary-500', bg: 'bg-primary-500/10' },
    { label: 'Undang-Undang', value: stats.uu, icon: Scale, color: 'text-safety-gold', bg: 'bg-safety-gold/10' },
    { label: 'Peraturan Pemerintah', value: stats.pp, icon: FileText, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { label: 'Standar Internasional', value: stats.internasional, icon: Globe, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {statCards.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div key={idx} className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
              <Icon size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white leading-none mb-1">{stat.value}</p>
              <p className="text-xs md:text-sm font-medium text-neutral-400 uppercase tracking-wide">{stat.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
