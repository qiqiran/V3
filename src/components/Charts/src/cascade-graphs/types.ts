import type { SetupContext } from "vue"

export type EmitFn = SetupContext["emit"];

export interface CtorOptions {
  emit: any
  tableDom?: HTMLElement
  theme?: string
}

export interface ChartData {
  tp: "RR" | "WT"
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
  // 样式
  style?: Style
  // 关键点
  sections: Section[]
  // 水坝
  dams: Dam[]
}

export interface Section {
  name: string
  mileage: number
  elevation: number
}

export interface Dam extends Section {
  code: string
  // 设计蓄水位
  designWaterLevel: number
  // 实际蓄水位
  actualWaterLevel: number
  // 设计|建设中|建设完成
  state: 'design' | 'construct' | 'finished',
  type: 'RR' | 'WT'
  stations?: Station[]
}

export interface Station {
  stid: string
  stnm: string
  stcd: string
}

export interface Style {
  nameLable: NameLable
}

export interface NameLable {
  color: string
  fontSize: number
}

