export type GalleryCategory = 
  | 'Semua'
  | 'Pelatihan K3'
  | 'Simulasi Darurat'
  | 'Kampanye K3'
  | 'Inspeksi'
  | 'Penghargaan';

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  category: GalleryCategory;
  image: string;
  date: string;
  location: string;
}
