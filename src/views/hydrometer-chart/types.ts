export interface ChartData {
  // 日期
  date: string;
  // 测流类别
  tp: number;
  // 断面起点
  minx: number;
  // 断面终点
  maxx: number;
  // 最小高程
  miny: number;
  // 最大高程
  maxy: number;
  // 缆道高程
  hh: number;
  // 断面信息
  x: number[];
  y: number[];
  // 水面浮点位置
  zx: number;
  // 水位
  z: number;

  r: number;
}

export interface LeiDaBo extends ChartData {
  // 水平计数器零点位置
  h0: number;
  // 水平计数器起点距
  qdj: number;
  // 是否雷达波测流
  mf: number;
}

export interface CeLiuYi extends ChartData {
  // 水平计数器零点位置
  h0: number;
  // 水平计数器起点距
  qdj: number;
  // 测速仪入水深度
  tz: number;
}

export interface LanDao extends ChartData {
  // 是否雷达波测流
  mf: number;
  ll: number[];
  lm: number[];
  lh: number[];
  mh: number[];
}