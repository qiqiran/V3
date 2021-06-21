import { LeiDaBo, CeLiuYi, LanDao, ChartData } from "./types";

import { ECharts } from "echarts";
import { init, graphic } from 'echarts';

import { jiQiRen, tanZhao, huaLun, qianYu, steelBridge } from "./src/images";


class HydrometerChart {
  private chart: any;
  private dom: HTMLElement;
  constructor(dom: HTMLElement, theme?: string) {
    this.dom = dom;
    this.chart = init(dom, theme);
  }

  getInstance(): ECharts {
    return this.chart;
  }

  draw(chartData: LeiDaBo | CeLiuYi | LanDao) {
    const { tp, minx, maxx, miny, maxy, hh, z, x, y, zx } = chartData;
    const series: any[] = [...getCrossSection(x, y, minx, maxx, z, zx)];

    if ([2, 3, 4, 6].includes(tp)) {// 牵引式测流
      const { h0, qdj, mf } = chartData as LeiDaBo;

      series.push(getCable(minx, maxx, hh, h0, qdj))
      series.push(getRadarTruck(h0, qdj, hh, mf));
    } else if ([1, 5].includes(tp)) {// 固定式测流
      const { ll, lh, lm, mf } = chartData as LanDao;

      series.push(getSteelBridge(minx, maxx, hh, this.dom.clientWidth));
      series.push(getRadarFixed([...new Set([...ll, ...lh, ...lm])], hh, mf));
      series.push(...getVerticalLine([...new Set([...ll, ...lh, ...lm])], miny, maxy));
    } else if ([7].includes(tp)) {// 测流仪测流
      const { tz, h0, qdj } = chartData as CeLiuYi;

      series.push(getCable(minx, maxx, hh, h0, qdj))
      series.push(...getTachymeter(maxy, z, h0 + qdj, tz))
    }

    this.chart.setOption(getOptions(chartData, series), true)
  }
}
/**
 * 生成Options
 * @param chartData 
 * @param series 
 * @returns 
 */
function getOptions(chartData: ChartData, series: any[]) {
  const { minx, maxx, miny, maxy } = chartData;
  return {
    grid: {
      top: 50,
      left: '5%',
      right: '5%',
      bottom: '5%',
    },
    xAxis: [{
      type: 'value',
      splitLine: {
        show: false
      },
      min: minx,
      max: maxx,
    }, {
      type: 'value',
      show: false,
      min: minx,
      max: maxx,
    }],
    yAxis: [{
      type: 'value',
      name: "左岸",
      nameLocation: "start",
      nameTextStyle: {
        padding: [-30, -30, 0, 0]
      },
      axisTick: {
        inside: true
      },
      splitLine: {
        show: false
      },
      axisLine: {
        onZero: false
      },
      z: 11,
      min: miny,
      max: maxy,
    }, {
      type: 'value',
      name: "右岸",
      nameLocation: "start",
      nameTextStyle: {
        padding: [-30, 30, 0, 0]
      },
      axisTick: {
        inside: true
      },
      splitLine: {
        show: false
      },
      axisLine: {
        onZero: false
      },
      z: 11,
      min: miny,
      max: maxy,
    }],
    series
  }
}
/**
 * 河流横截面
 * @param x 
 * @param y 
 * @param minx 截面起点
 * @param maxx 截面重点
 * @param waterLevel 水位
 * @returns 
 */
function getCrossSection(x: number[], y: number[], minx: number, maxx: number, waterLevel: number, zx: number) {
  const xLine: number[][] = [];
  x.forEach((v, i) => xLine.push([v, y[i]]))
  return [
    {
      name: '河流横截面',
      type: 'line',
      symbolSize: 0,
      smooth: true,
      itemStyle: {
        color: '#F6BD16'
      },
      areaStyle: {
        color: "#FDEEC5",
        emphasis: {
          color: "#FDEEC5",//移入后的颜色
        },
        opacity: 1
      },
      z: 10,
      data: xLine
    }, {
      name: '水面',
      type: 'line',
      symbolSize: 0,
      smooth: true,
      itemStyle: {
        color: 'rgba(0,0,0,0)'
      },
      areaStyle: {//将line线以下区域设置背景色
        normal: {
          color: new graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#3299fd'//3299fd
          }, {
            offset: 1,
            color: '#ffe'
          }])
        }
      },
      z: 9,
      data: [[minx, waterLevel], [maxx, waterLevel]],
      markPoint: {//定义水面上的浮点
        animation: false,
        itemStyle: {
          color: "red"
        },
        symbolSize: [20, 20],
        label: {
          color: "red",
          offset: [0, -20]
        },
        data: [
          { name: '水位', value: "水位：" + waterLevel + "m", xAxis: zx, yAxis: waterLevel }
        ]
      }
    },
  ]
}
/**
 * 雷达波机器人
 * @param qdj 起点距
 * @param h0 水平计数器零点位置
 * @param hh 缆道高程
 * @param mf 是否雷达波测流
 * @returns 
 */
function getRadarTruck(h0: number, qdj: number, hh: number, mf: number) {
  const radarTruckX = h0 + qdj;
  const res = {
    name: 'RadarTruck',
    type: 'pictorialBar',
    symbolPosition: 'end',
    z: 12,
    data: [{
      value: [radarTruckX, hh],
      symbol: jiQiRen,
      symbolSize: [58.9, 50],
      symbolOffset: [0, -15],
      z: 12
    }] as any[]
  };
  if (mf) {
    res.data.push({
      value: [radarTruckX, hh],
      symbol: tanZhao,
      symbolSize: [100, '50%'],
      symbolOffset: [0, 30],
      z: 5
    })
  }
  return res;
}
/**
 * 测流仪
 * @param maxY 最大高程
 * @param waterLevel 水位
 * @param tachymeterX 测速仪位置(横向)
 * @param tachymeterY 测速仪位置(基于水位的高程)
 * @returns 
 */
function getTachymeter(maxy: number, waterLevel: number, tachymeterX: number, tachymeterY: number) {
  tachymeterY = waterLevel - tachymeterY;
  return [{
    type: 'line',
    symbolSize: 0,
    lineStyle: {
      width: 2.5,

    },
    itemStyle: {
      color: '#979797',
    },
    z: 7,
    data: [[tachymeterX, maxy], [tachymeterX, tachymeterY]]
  }, {
    type: 'pictorialBar',
    barGap: '100%',
    symbolPosition: 'end',
    z: 8,
    data: [{
      value: [tachymeterX, maxy],
      symbol: huaLun,
      symbolSize: [76.5, 50],
      symbolOffset: [0, -12]
    }, {
      value: [tachymeterX, tachymeterY],
      symbol: qianYu,
      symbolSize: [100, 70],
      symbolOffset: [-11.5, -65],
    }]
  }]
}
/**
 * 测流垂线
 * @param list 
 * @param miny 
 * @param maxy 
 * @returns 
 */
function getVerticalLine(list: number[], miny: number, maxy: number) {
  const res: any[] = [];
  list.forEach(item => {
    res.push({
      type: 'line',
      symbolSize: 0,
      lineStyle: {
        color: '#14c8d4',
        width: 1,
        type: 'dashed'
      },
      data: [[item, maxy], [item, miny]],
      markPoint: {
        symbolSize: 0,
        label: {
          color: "black",
          offset: [0, -10]
        },
        data: [
          { value: item, xAxis: item, yAxis: maxy }
        ]
      }
    })
  })
  return res;
}
function getRadarFixed(list: number[], hh: number, mf: number) {
  const res = {
    name: 'RadarFixed',
    type: 'pictorialBar',
    symbolPosition: 'end',
    z: 9,
    xAxisIndex: 1,
    data: [] as any[]
  }
  list.forEach(item => {
    res.data.push({
      value: [item, hh],
      symbol: jiQiRen,
      symbolSize: [58.9, 50],
      symbolOffset: [0, -1],
      z: 12
    });
    if (mf) {
      res.data.push({
        value: [item, hh],
        symbol: tanZhao,
        symbolSize: [100, '0.1%'],
        symbolOffset: [0, 44],
        z: 5
      })
    }
  })
  return res;
}
function getSteelBridge(minx: number, maxx: number, hh: number, domWidth: number) {
  const spaceBetween = maxx - minx;
  // 钢架桥栅格密度
  const density = 60;
  const len = Math.ceil(domWidth / density);

  const res = {
    name: 'SteelBridge',
    type: 'pictorialBar',
    symbolPosition: 'end',
    barWidth: '100%',
    z: 8,
    data: [] as any[]
  };
  for (let i = 0; i < len; i++) {
    res.data.push({
      value: [minx + (spaceBetween / len * i), hh],
      symbol: steelBridge,
      symbolSize: ['100%', 25],
      symbolOffset: ['50%', -2]
    })
  }
  return res
}
/**
 * 缆线
 * @param minx 截面起点
 * @param maxx 截面终点
 * @param hh 缆道高程
 * @returns 
 */
function getCable(minx: number, maxx: number, hh: number, h0: number, qdj: number) {
  return {
    type: 'line',
    symbolSize: 0,
    itemStyle: {
      color: '#000'
    },
    z: -1,
    data: [[minx, hh], [maxx, hh]],
    markPoint: {
      animation: false,
      itemStyle: {
        color: "red"
      },
      symbolSize: [20, 20],
      label: {
        color: "red",
        offset: [0, -20]
      },
      data: [
        { value: `水平计数器零点（${h0}m） 计数器值（${qdj}m）`, xAxis: h0, yAxis: hh }
      ]
    }
  }
}

export { HydrometerChart }