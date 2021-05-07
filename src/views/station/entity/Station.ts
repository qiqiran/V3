import IStation from 'src/views/station/interface/IStation';

class Station implements IStation {
  STNM: string;
  STCD: string;
  constructor(STNM: string, STCD: string) {
    this.STNM = STNM;
    this.STCD = STCD;
  }
}
export default Station;