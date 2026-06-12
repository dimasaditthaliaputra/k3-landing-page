export type MarkerCategory = 
  | 'assembly-point'
  | 'medical'
  | 'fire-safety'
  | 'evacuation-route'
  | 'security-post';

export interface RoomSpecs {
  function: string;
  activity: string;
  capacity: string;
  risks: string;
}

export interface AuditCompliance {
  status: string;
  score: number;
}

export interface MapMarker {
  id: string;
  name: string;
  category: MarkerCategory;
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  emergencyContact?: string;
  riskLevel?: 'Rendah' | 'Sedang' | 'Tinggi' | 'Sangat Tinggi';
  requiredPPE?: string[];
  roomSpecs?: RoomSpecs;
  safetyFacilities?: string[];
  potentialHazards?: string[];
  auditCompliance?: AuditCompliance;
  auditFindings?: string;
  recommendations?: string;
}
