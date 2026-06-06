'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Briefcase, MapPin, CheckCircle2 } from 'lucide-react';
import { OrganizationNode } from '@/types/organization';
import { cn } from '@/lib/utils';

interface ResponsibilityPanelProps {
  node: OrganizationNode | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ResponsibilityPanel({ node, isOpen, onClose }: ResponsibilityPanelProps) {
  return (
    <AnimatePresence>
      {isOpen && node && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />

          {/* Panel */}
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={cn(
              "fixed z-50 flex flex-col bg-neutral-900 border-neutral-800 shadow-2xl",
              // Mobile: Bottom sheet
              "bottom-0 left-0 right-0 h-[85vh] rounded-t-3xl border-t",
              // Desktop: Right Sidebar
              "lg:top-0 lg:bottom-0 lg:right-0 lg:left-auto lg:w-[400px] lg:h-screen lg:rounded-none lg:border-l lg:border-t-0"
            )}
          >
            {/* Handle bar for mobile */}
            <div className="w-full flex justify-center py-3 lg:hidden">
              <div className="w-12 h-1.5 bg-neutral-700 rounded-full"></div>
            </div>

            <div className="flex items-center justify-between p-6 pb-4 border-b border-neutral-800">
              <h2 className="text-xl font-bold text-white flex-1 pr-4 truncate">Detail Jabatan</h2>
              <button
                onClick={onClose}
                className="p-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white rounded-full transition-colors"
                aria-label="Tutup panel"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
              <div className="mb-8">
                <span className="inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-safety-gold/10 text-safety-gold mb-4">
                  {node.level}
                </span>
                <h3 className="text-2xl font-bold text-white mb-2">{node.position}</h3>
                <p className="text-neutral-400 font-medium flex items-center gap-2">
                  <Briefcase size={16} />
                  {node.department}
                </p>
              </div>

              <div className="space-y-6">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-neutral-800 pb-2">
                  Tanggung Jawab Utama
                </h4>
                
                {node.responsibilities.map((resp) => (
                  <div key={resp.id} className="bg-neutral-800/50 p-5 rounded-xl border border-neutral-800/80">
                    <h5 className="font-bold text-safety-gold mb-2 flex items-start gap-2">
                      <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
                      {resp.title}
                    </h5>
                    <p className="text-neutral-300 text-sm leading-relaxed mb-4">
                      {resp.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs font-medium text-neutral-400 bg-neutral-900/50 px-3 py-2 rounded-lg inline-flex">
                      <MapPin size={14} className="text-neutral-500" />
                      {resp.area}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
