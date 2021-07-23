export interface ChartData {
  // 断面起点
  minx: number;
  // 断面终点
  maxx: number;
  // 最小高程
  miny: number;
  // 最大高程
  maxy: number;
  // 坝前水位
  lz: number;
  // 坝下水位
  rz: number;
  // 断面信息
  sections: Section[];
  // 大坝形状
  dam: Point[];
  // 管道（上）
  pipeTop: Point[];
  // 管道（下）
  pipeBottom: Point[];
  // 水温标注信息
  datas: MarkData[];
}

export interface Point {
  // 里程
  mileage: number
  // 高程
  elevation: number
}

export interface Section extends Point {
  // 关键点名词
  name?: string
}

export interface MarkData {
  // 标注说明
  label: string
  // 标注位置里程
  mileage: number
  data: {
    // 水下H（m）
    H: number
    // 水温T（℃）
    T: number
  }[]
}

