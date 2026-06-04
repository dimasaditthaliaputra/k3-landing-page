export type RegulationCategory = 'UU' | 'PP' | 'Permen' | 'Standar Internasional' | 'Semua';

export interface Regulation {
  id: string;
  nomor: string;
  judul: string;
  tahun: number;
  kategori: string;
  url: string;
}
