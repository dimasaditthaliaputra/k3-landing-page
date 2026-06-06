'use client';

import { useEffect } from 'react';
import { Users, ShieldCheck, Flame, Briefcase } from 'lucide-react';

import orgChart from '@/data/org-chart.json';
import { useCountUp } from '@/lib/hooks/useCountUp';
import { useInView } from '@/lib/hooks/useInView';

interface StatProps {
  icon: React.ElementType;
  value: number;
  label: string;
  delay?: number;
}

function StatCard({
  icon: Icon,
  value,
  label,
  delay = 0,
}: StatProps) {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const { count, start } = useCountUp({
    target: value,
    duration: 2000,
  });

  useEffect(() => {
    if (inView) {
      start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <div
      ref={ref}
      className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl flex items-center gap-5 hover:border-neutral-700 transition-all duration-300 group"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-14 h-14 rounded-full bg-safety-gold/10 text-safety-gold flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
        <Icon size={28} />
      </div>

      <div>
        <div className="text-3xl font-bold text-white mb-1">
          {count.toLocaleString('id-ID')}
        </div>

        <div className="text-sm font-medium text-neutral-400">
          {label}
        </div>
      </div>
    </div>
  );
}

export function OrganizationStats() {
  const totalPositions = orgChart.length;

  const totalDivisions = orgChart.filter(
    (item) => item.level === 'SVP Divisi'
  ).length;

  const totalDepartments = orgChart.filter(
    (item) => item.level === 'VP Departemen'
  ).length;

  const operationalEmployees = 20000;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        icon={Briefcase}
        value={totalDivisions}
        label="Divisi Utama"
        delay={0}
      />

      <StatCard
        icon={Users}
        value={totalPositions}
        label="Total Jabatan"
        delay={100}
      />

      <StatCard
        icon={ShieldCheck}
        value={totalDepartments}
        label="Departemen Operasional"
        delay={200}
      />

      <StatCard
        icon={Flame}
        value={operationalEmployees}
        label="Karyawan Operasional"
        delay={300}
      />
    </div>
  );
}