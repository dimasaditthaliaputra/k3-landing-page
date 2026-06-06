export type OrganizationLevel = 'Pemegang Saham' | 'Komisaris' | 'Direksi Utama' | 'Direksi Fungsional' | 'SVP Divisi' | 'VP Departemen' | 'Manajerial' | 'Operasional';

export interface Responsibility {
  id: string;
  title: string;
  area: string;
  description: string;
}

export interface OrganizationNode {
  id: string;
  name: string;
  position: string;
  department: string;
  parentId: string | null;
  level: OrganizationLevel;
  responsibilities: Responsibility[];
}
