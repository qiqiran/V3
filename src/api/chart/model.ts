export interface GetMEParams {
  ID: string;
  ME: '3B' | 'WT';
  ST: string;
  ET: string;
  INTV: 1 | 3 | 6 | 12;
}

export interface GetMEResultModel {
  name: string;
  stcd: string;
  T: string[];
  V: number[];
  count: number;
  datatype: string;
  st: string;
  et: string;
}
