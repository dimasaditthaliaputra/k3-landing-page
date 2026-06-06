export type RegulationCategory = 'UU' | 'PP' | 'Permen' | 'Standar dan Pedoman' | 'Semua';

export interface Regulation {
  id: string;
  nomor: string;
  judul: string;
  tahun: number;
  kategori: string;
  status: string;
  sumber: string;
  url: string;
}
