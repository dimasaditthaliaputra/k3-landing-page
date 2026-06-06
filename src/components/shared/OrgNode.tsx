'use client';

import { OrganizationNode, OrganizationLevel } from '@/types/organization';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';

interface OrgNodeProps {
  node: OrganizationNode;
  isActive?: boolean;
  onClick?: (node: OrganizationNode) => void;
}

const getLevelColor = (level: OrganizationLevel) => {
  switch (level) {
    case 'Pemegang Saham': return 'bg-purple-950/30 border-purple-300/50 text-purple-300';
    case 'Komisaris': return 'bg-purple-950/30 border-purple-400/50 text-purple-300';
    case 'Direksi Utama': return 'bg-cyan-950/30 border-cyan-500/50 text-cyan-300';
    case 'Direksi Fungsional': return 'bg-blue-950/30 border-blue-400/50 text-blue-300';
    case 'SVP Divisi': return 'bg-orange-950/30 border-orange-400/50 text-orange-300';
    case 'VP Departemen': return 'bg-yellow-950/30 border-yellow-400/50 text-yellow-300';
    case 'Manajerial': return 'bg-fuchsia-950/30 border-fuchsia-400/50 text-fuchsia-300';
    case 'Operasional': return 'bg-green-950/30 border-green-400/50 text-green-300';
    default: return 'bg-neutral-900 border-neutral-700 text-neutral-400';
  }
};

const getLevelBadgeColor = (level: OrganizationLevel) => {
  switch (level) {
    case 'Pemegang Saham': return 'bg-purple-300 text-purple-950';
    case 'Komisaris': return 'bg-purple-400 text-purple-950';
    case 'Direksi Utama': return 'bg-cyan-500 text-cyan-950';
    case 'Direksi Fungsional': return 'bg-blue-400 text-blue-950';
    case 'SVP Divisi': return 'bg-orange-400 text-orange-950';
    case 'VP Departemen': return 'bg-yellow-400 text-yellow-950';
    case 'Manajerial': return 'bg-fuchsia-400 text-fuchsia-950';
    case 'Operasional': return 'bg-green-400 text-green-950';
    default: return 'bg-neutral-600 text-white';
  }
};

export function OrgNode({ node, isActive, onClick }: OrgNodeProps) {
  return (
    <button
      onClick={() => onClick?.(node)}
      className={cn(
        'relative group w-full min-w-[220px] text-left border p-5 rounded-2xl transition-all duration-300 z-10',
        'hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-safety-gold focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950',
        getLevelColor(node.level),
        isActive ? 'ring-2 ring-safety-gold shadow-glow-blue border-safety-gold' : 'hover:border-neutral-400'
      )}
      aria-label={`Lihat detail jabatan ${node.position}`}
    >
      <div className="flex items-start justify-between mb-3 gap-2">
        <span className={cn(
          'inline-block px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider',
          getLevelBadgeColor(node.level)
        )}>
          {node.level}
        </span>
      </div>
      
      <h3 className="font-bold text-white text-base leading-tight mb-2 group-hover:text-safety-gold transition-colors">
        {node.position}
      </h3>
      
      <div className="flex items-center gap-2 mt-4 text-sm text-neutral-300">
        <div className="w-7 h-7 rounded-full bg-neutral-800 flex items-center justify-center shrink-0 border border-neutral-700">
          <User size={14} />
        </div>
        <span className="font-medium truncate">{node.name}</span>
      </div>
      
      <div className="mt-2 text-xs text-neutral-400 truncate font-medium">
        {node.department}
      </div>
    </button>
  );
}
