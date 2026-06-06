import { MapMarker } from '@/types/map';
import { CATEGORY_STYLES } from './MapLegend';
import { X, PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

interface InfoPanelProps {
  marker: MapMarker | null;
  onClose: () => void;
  isMobile: boolean;
}

export function InfoPanel({ marker, onClose, isMobile }: InfoPanelProps) {
  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && marker) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [marker, onClose]);

  return (
    <AnimatePresence>
      {marker && (
        <motion.div
          initial={isMobile ? { y: '100%' } : { x: '100%' }}
          animate={isMobile ? { y: 0 } : { x: 0 }}
          exit={isMobile ? { y: '100%' } : { x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className={`
            absolute z-[1000] bg-neutral-900 shadow-2xl border-neutral-800
            ${isMobile 
              ? 'bottom-0 left-0 right-0 rounded-t-3xl border-t max-h-[85%] overflow-y-auto' 
              : 'top-4 right-4 w-[320px] rounded-2xl border max-h-[calc(100%-2rem)] overflow-y-auto'
            }
          `}
          role="dialog"
          aria-labelledby="info-panel-title"
          aria-modal="true"
        >
          {isMobile && (
            <div className="w-full flex justify-center pt-3 pb-1">
              <div className="w-12 h-1.5 bg-neutral-700 rounded-full" />
            </div>
          )}
          
          <div className="p-6">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white rounded-full transition-colors"
              aria-label="Tutup panel informasi"
            >
              <X size={20} />
            </button>

            <div className="mt-2">
              <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider mb-4 ${CATEGORY_STYLES[marker.category].bg} ${CATEGORY_STYLES[marker.category].color}`}>
                {(() => {
                  const Icon = CATEGORY_STYLES[marker.category].icon;
                  return <Icon size={13} strokeWidth={2.5} className="shrink-0" />;
                })()}
                <span>{CATEGORY_STYLES[marker.category].label}</span>
              </div>

              <h2 id="info-panel-title" className="text-2xl font-bold text-white mb-3">
                {marker.name}
              </h2>

              <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                {marker.description}
              </p>

              <div className="space-y-4">
                {marker.emergencyContact && (
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-danger-900/20 border border-danger-900/50">
                    <div className="p-2 bg-danger-900/50 rounded-lg text-danger-500 mt-0.5">
                      <PhoneCall size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-neutral-300 mb-1">Kontak Darurat</h4>
                      <p className="text-lg font-bold text-white">{marker.emergencyContact}</p>
                    </div>
                  </div>
                )}


              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
