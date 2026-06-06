'use client';

import { useState } from 'react';
import { OrganizationNode } from '@/types/organization';
import { OrgChart } from '@/components/shared/OrgChart';
import { ResponsibilityPanel } from './ResponsibilityPanel';

interface OrgChartClientProps {
  data: OrganizationNode[];
}

export function OrgChartClient({ data }: OrgChartClientProps) {
  const [activeNode, setActiveNode] = useState<OrganizationNode | null>(null);

  const handleNodeClick = (node: OrganizationNode) => {
    setActiveNode(node);
  };

  const closePanel = () => {
    setActiveNode(null);
  };

  return (
    <div className="relative">
      <OrgChart 
        data={data} 
        activeNodeId={activeNode?.id || null} 
        onNodeClick={handleNodeClick} 
      />
      
      <ResponsibilityPanel 
        node={activeNode} 
        isOpen={!!activeNode} 
        onClose={closePanel} 
      />
    </div>
  );
}
