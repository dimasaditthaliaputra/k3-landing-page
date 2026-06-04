export type MarkerCategory = 
  | 'assembly-point'
  | 'medical'
  | 'fire-safety'
  | 'evacuation-route'
  | 'security-post';

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
}
