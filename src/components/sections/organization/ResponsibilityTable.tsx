'use client';

import { OrganizationNode } from '@/types/organization';

interface ResponsibilityTableProps {
  data: OrganizationNode[];
}

export function ResponsibilityTable({ data }: ResponsibilityTableProps) {
  // Flatten all responsibilities
  const allResponsibilities = data.flatMap(node => 
    node.responsibilities.map(resp => ({
      ...resp,
      position: node.position,
      department: node.department,
      level: node.level
    }))
  );

  return (
    <div className="w-full">
      {/* Mobile view (Cards) */}
      <div className="flex flex-col gap-4 lg:hidden w-full">
        {allResponsibilities.map((item, idx) => (
          <div key={`${item.id}-${idx}`} className="bg-neutral-900 border border-neutral-800 p-5 rounded-xl">
            <div className="mb-3">
              <span className="text-safety-gold text-xs font-bold uppercase tracking-wider">{item.position}</span>
              <h4 className="text-white font-bold mt-1 leading-snug">{item.title}</h4>
            </div>
            <p className="text-neutral-400 text-sm mb-4 leading-relaxed">{item.description}</p>
            <div className="bg-neutral-800/50 rounded p-2 text-xs text-neutral-300 font-medium">
              <span className="text-neutral-500 mr-2">Area:</span>
              {item.area}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop view (Table) */}
      <div className="hidden lg:block overflow-x-auto bg-neutral-900 border border-neutral-800 rounded-2xl shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-800/50 text-neutral-400 uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-4 w-1/4 rounded-tl-2xl">Jabatan / Divisi</th>
              <th className="px-6 py-4 w-1/4">Tanggung Jawab</th>
              <th className="px-6 py-4 w-1/3">Deskripsi</th>
              <th className="px-6 py-4 rounded-tr-2xl">Area Pengawasan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {allResponsibilities.map((item, idx) => (
              <tr key={`${item.id}-${idx}`} className="hover:bg-neutral-800/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold text-safety-gold mb-1">{item.position}</div>
                  <div className="text-xs text-neutral-500 font-medium">{item.department}</div>
                </td>
                <td className="px-6 py-4 text-white font-bold leading-snug">
                  {item.title}
                </td>
                <td className="px-6 py-4 text-neutral-400 leading-relaxed">
                  {item.description}
                </td>
                <td className="px-6 py-4">
                  <span className="inline-block bg-neutral-800 px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-300">
                    {item.area}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
