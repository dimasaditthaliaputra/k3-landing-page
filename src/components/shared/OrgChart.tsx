'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { OrganizationNode } from '@/types/organization';
import { OrgNode } from './OrgNode';
import { fadeUp } from '@/lib/animations';

interface OrgChartProps {
  data: OrganizationNode[];
  activeNodeId: string | null;
  onNodeClick: (node: OrganizationNode) => void;
}

export function OrgChart({ data, activeNodeId, onNodeClick }: OrgChartProps) {
  const tree = useMemo(() => {
    const rootNodes = data.filter(n => !n.parentId);
    const getChildren = (parentId: string): OrganizationNode[] => {
      return data.filter(n => n.parentId === parentId);
    };
    return { rootNodes, getChildren };
  }, [data]);

  return (
    <div className="w-full overflow-x-auto pb-12 pt-4 px-2 custom-scrollbar">
      <div className="min-w-fit mx-auto flex flex-col items-center">
        <TreeNode 
          nodes={tree.rootNodes} 
          getChildren={tree.getChildren} 
          activeNodeId={activeNodeId} 
          onNodeClick={onNodeClick} 
          level={0} 
        />
      </div>
    </div>
  );
}

interface TreeNodeProps {
  nodes: OrganizationNode[];
  getChildren: (id: string) => OrganizationNode[];
  activeNodeId: string | null;
  onNodeClick: (node: OrganizationNode) => void;
  level: number;
}

function TreeNode({ nodes, getChildren, activeNodeId, onNodeClick, level }: TreeNodeProps) {
  if (!nodes || nodes.length === 0) return null;

  return (
    <div className={`flex ${level === 0 ? 'flex-col' : 'flex-col lg:flex-row'} gap-6 lg:gap-8 relative justify-center`}>
      {/* Horizontal connector line for siblings on desktop */}
      {level > 0 && nodes.length > 1 && (
        <div className="hidden lg:block absolute top-0 left-[15%] right-[15%] h-px bg-neutral-700 -translate-y-4"></div>
      )}

      {nodes.map((node) => {
        const children = getChildren(node.id);
        const hasChildren = children.length > 0;

        return (
          <div key={node.id} className="flex flex-col items-center relative">
            {/* Vertical line connecting to parent */}
            {level > 0 && (
              <div className="hidden lg:block absolute -top-4 left-1/2 w-px h-4 bg-neutral-700 -translate-x-1/2"></div>
            )}
            
            {/* Mobile/Tablet connector */}
            {level > 0 && (
              <div className="lg:hidden absolute -top-6 left-8 w-px h-6 bg-neutral-700"></div>
            )}

            <motion.div 
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="z-10 relative w-full lg:w-auto px-4 lg:px-0"
            >
              <OrgNode 
                node={node} 
                isActive={node.id === activeNodeId} 
                onClick={onNodeClick} 
              />
            </motion.div>

            {hasChildren && (
              <div className="flex flex-col items-center w-full lg:w-auto relative mt-6 lg:mt-8">
                {/* Vertical line connecting to children */}
                <div className="hidden lg:block absolute -top-8 left-1/2 w-px h-8 bg-neutral-700 -translate-x-1/2"></div>
                
                {/* Mobile/Tablet Left Border container for children */}
                <div className="flex flex-col gap-6 lg:gap-0 lg:block w-full lg:w-auto pl-8 lg:pl-0 relative">
                  {/* Mobile indent line */}
                  <div className="lg:hidden absolute top-0 bottom-0 left-[2.5rem] w-px bg-neutral-800 -translate-x-1/2"></div>
                  
                  <TreeNode 
                    nodes={children} 
                    getChildren={getChildren} 
                    activeNodeId={activeNodeId} 
                    onNodeClick={onNodeClick} 
                    level={level + 1} 
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
