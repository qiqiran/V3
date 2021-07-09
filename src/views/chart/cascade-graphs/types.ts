export interface ChartData {
  // 最小里程
  minx: number
  // 最大里程
  maxx: number
  // 最小高程
  miny: number
  // 最大高程
  maxy: number
  // 是否隐藏底部表格
  hideTable?: boolean
  style?: any
  sections: Section[]
  stations: Station[]
}

export interface Station {
  name: string
  mileage: number
  elevation: number
  waterLevel: number
  // 设计|建设中|建设完成
  state: 'design' | 'construct' | 'finished'
}

export interface Section {
  name: string
  mileage: number
  elevation: number
}
