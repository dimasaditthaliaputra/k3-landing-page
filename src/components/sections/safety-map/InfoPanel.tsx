import { MapMarker } from '@/types/map';
import { CATEGORY_STYLES } from './MapLegend';
import { X, PhoneCall, AlertTriangle, ShieldCheck, Activity, Users, FileText, CheckCircle, Info, HardHat, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

interface InfoPanelProps {
  marker: MapMarker | null;
  onClose: () => void;
  isMobile: boolean;
}

const getRiskColor = (risk?: string) => {
  switch (risk) {
    case 'Rendah': return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'Sedang': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    case 'Tinggi': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
    case 'Sangat Tinggi': return 'bg-red-500/20 text-red-400 border-red-500/30';
    default: return 'bg-neutral-500/20 text-neutral-400 border-neutral-500/30';
  }
};

const Chip = ({ children, icon: Icon }: { children: React.ReactNode, icon?: any }) => (
  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-800 border border-neutral-700 text-xs text-neutral-300">
    {Icon && <Icon size={12} className="text-neutral-400" />}
    {children}
  </span>
);

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
              : 'top-4 right-4 w-[360px] rounded-2xl border max-h-[calc(100%-2rem)] overflow-y-auto'
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
              className="absolute top-4 right-4 p-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white rounded-full transition-colors z-10"
              aria-label="Tutup panel informasi"
            >
              <X size={20} />
            </button>

            <div className="mt-2">
              <div className="flex flex-wrap items-center gap-2 mb-4 pr-8">
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${CATEGORY_STYLES[marker.category].bg} ${CATEGORY_STYLES[marker.category].color}`}>
                  {(() => {
                    const Icon = CATEGORY_STYLES[marker.category].icon;
                    return <Icon size={13} strokeWidth={2.5} className="shrink-0" />;
                  })()}
                  <span>{CATEGORY_STYLES[marker.category].label}</span>
                </div>
                {marker.riskLevel && (
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider border ${getRiskColor(marker.riskLevel)}`}>
                    <AlertTriangle size={13} strokeWidth={2.5} />
                    <span>Risiko: {marker.riskLevel}</span>
                  </div>
                )}
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
                    <div className="p-2 bg-danger-900/50 rounded-lg text-danger-500 mt-0.5 shrink-0">
                      <PhoneCall size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-neutral-300 mb-1">Kontak Darurat</h4>
                      <p className="text-lg font-bold text-white">{marker.emergencyContact}</p>
                    </div>
                  </div>
                )}

                {marker.roomSpecs && (
                  <div className="p-4 rounded-xl bg-neutral-800/50 border border-neutral-700/50">
                    <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                      <Info size={16} className="text-primary-400" /> Spesifikasi Ruangan
                    </h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="block text-neutral-500 mb-0.5 text-xs">Fungsi</span>
                        <span className="text-neutral-300 font-medium">{marker.roomSpecs.function}</span>
                      </div>
                      <div>
                        <span className="block text-neutral-500 mb-0.5 text-xs">Kapasitas</span>
                        <span className="text-neutral-300 font-medium">{marker.roomSpecs.capacity}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="block text-neutral-500 mb-0.5 text-xs">Aktivitas Utama</span>
                        <span className="text-neutral-300">{marker.roomSpecs.activity}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="block text-neutral-500 mb-0.5 text-xs">Potensi Risiko Internal</span>
                        <span className="text-neutral-300">{marker.roomSpecs.risks}</span>
                      </div>
                    </div>
                  </div>
                )}

                {(marker.requiredPPE || marker.safetyFacilities || marker.potentialHazards) && (
                  <div className="space-y-3 p-4 rounded-xl bg-neutral-800/50 border border-neutral-700/50">
                    {marker.requiredPPE && marker.requiredPPE.length > 0 && (
                      <div>
                        <h4 className="text-xs font-semibold text-neutral-400 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                          <HardHat size={14} className="text-safety-gold" /> APD Wajib
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {marker.requiredPPE.map((ppe, i) => (
                            <Chip key={i}>{ppe}</Chip>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {marker.safetyFacilities && marker.safetyFacilities.length > 0 && (
                      <div className={marker.requiredPPE ? "pt-2" : ""}>
                        <h4 className="text-xs font-semibold text-neutral-400 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                          <ShieldCheck size={14} className="text-green-500" /> Fasilitas Keselamatan
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {marker.safetyFacilities.map((fac, i) => (
                            <Chip key={i}>{fac}</Chip>
                          ))}
                        </div>
                      </div>
                    )}

                    {marker.potentialHazards && marker.potentialHazards.length > 0 && (
                      <div className={marker.requiredPPE || marker.safetyFacilities ? "pt-2" : ""}>
                        <h4 className="text-xs font-semibold text-neutral-400 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                          <Flame size={14} className="text-orange-500" /> Potensi Bahaya
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {marker.potentialHazards.map((haz, i) => (
                            <Chip key={i}>{haz}</Chip>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {marker.auditCompliance && (
                  <div className="p-4 rounded-xl bg-primary-900/20 border border-primary-800/50">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                        <FileText size={16} className="text-primary-400" /> Audit K3 Terakhir
                      </h4>
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-neutral-800 text-xs font-bold text-white border border-neutral-700">
                        Skor: <span className={marker.auditCompliance.score >= 90 ? "text-green-400" : marker.auditCompliance.score >= 70 ? "text-yellow-400" : "text-red-400"}>{marker.auditCompliance.score}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <CheckCircle size={14} className={marker.auditCompliance.status === 'Memenuhi Standar' ? "text-green-500 mt-0.5 shrink-0" : "text-yellow-500 mt-0.5 shrink-0"} />
                        <span className="text-sm text-neutral-300"><span className="text-neutral-500">Status:</span> {marker.auditCompliance.status}</span>
                      </div>
                      {marker.auditFindings && (
                        <div className="text-sm text-neutral-300 bg-neutral-800/50 p-2.5 rounded-lg border border-neutral-700/50">
                          <span className="block text-xs text-neutral-500 mb-1 font-medium">Temuan Utama</span>
                          {marker.auditFindings}
                        </div>
                      )}
                      {marker.recommendations && (
                        <div className="text-sm text-neutral-300 bg-neutral-800/50 p-2.5 rounded-lg border border-neutral-700/50">
                          <span className="block text-xs text-neutral-500 mb-1 font-medium">Rekomendasi</span>
                          {marker.recommendations}
                        </div>
                      )}
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

