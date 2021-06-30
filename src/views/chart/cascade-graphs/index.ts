import type { ECharts } from "echarts";

import { init, graphic } from 'echarts';

import { isArray, isNullOrUnDef } from "@/utils/is"

export enum stateEnum {
  construct = '在建电站',
  design = '规划待建电站',
  finished = '已建电站'
}

export enum stateColorEnum {
  construct = '#ff00ff',
  design = '#00a529',
  finished = '#000'
}

export class CascadeGraphs {
  private chart: any;
  private dom: HTMLElement;

  constructor(dom: HTMLElement, theme?: string) {
    this.dom = dom;
    this.chart = init(dom, theme);
  }

  getInstance(): ECharts {
    return this.chart;
  }


  draw(chartData) {
    const { x, y, minx, miny, maxx, maxy, stations }: { x: number[], y: number[], minx: number, miny: number, maxx: number, maxy: number, stations: any[] } = chartData;

    const series: any[] = [...getRiverbedCrossSection(x, y, miny, maxy)];

    series.push(...getSectionProfile(stations, maxx, miny))

    const intersectionPointList = getIntersectionPoint(
      stations.reduce((res, row) => {
        res.push([row.mileage, row.elevation, row.name]);
        return res;
      }, [] as number[][]),
      x.reduce((res, row, index) => {
        res.push([row, y[index]])
        return res
      }, [] as number[][])
    );

    series.push(
      {
        name: `intersection-point`,
        type: 'line',
        show: false,
        label: {
          show: true,
          position: 'insideTop',
          fontSize: 16,
          color: '#fff',
          formatter: (param) => {
            return param?.data[2]?.split('')?.join()?.replaceAll(',', '\n')
          }
        },
        symbolSize: 0,
        itemStyle: {
          color: 'rgba(0,0,0,0)'
        },
        z: 21,
        data: intersectionPointList
      }
    )

    this.chart.setOption({
      dataZoom: [{
        type: 'slider',
      }, {
        type: 'inside',
      }],
      tooltip: {
        trigger: 'axis',
        formatter: (params) => {
          let res = '';
          if (isArray(params)) {
            params.forEach((row) => {
              const { seriesName, seriesType, marker, data: { station } } = row;
              if (seriesType === 'bar' && seriesName === 'dam-body') {

                const { name, mileage, elevation, waterLevel, state } = station;
                res = `
                <h3>${marker}${name}<span style="font-size:12px">(${stateEnum[state]})</span>
                </h3>
                &emsp;里程：${mileage}(m)
                <br/>
                &emsp;高程：${elevation}(m)
                <br/>
                &emsp;水位：${waterLevel}(m)
                `;
              }
            })
          }
          return res;
        },
      },
      grid: {
        top: 50,
        left: '5%',
        right: '5%',
        bottom: 70,
      },
      xAxis: [{
        type: 'value',
        splitLine: {
          show: false
        },
        inverse: true,
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
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLine: {
          onZero: false,
          lineStyle: {
            width: 5,
            cap: 'butt',
            type: 'dashed'
          }
        },
        z: 20,
        min: miny,
        max: maxy,
      }, {
        type: 'value',
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLine: {
          onZero: false,
          lineStyle: {
            width: 5,
            cap: 'butt',
            type: 'dashed'
          }
        },
        z: 20,
        min: miny,
        max: maxy,
      }, {
        position: 'left',
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLine: {
          onZero: false
        },
        offset: 2.5,
        z: 20,
        min: miny,
        max: maxy,
      }, {
        position: 'left',
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLine: {
          onZero: false
        },
        offset: -2.5,
        z: 20,
        min: miny,
        max: maxy,
      }, {
        position: 'right',
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLine: {
          onZero: false
        },
        offset: 2.5,
        z: 20,
        min: miny,
        max: maxy,
      }, {
        position: 'right',
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLine: {
          onZero: false
        },
        offset: -2.5,
        z: 20,
        min: miny,
        max: maxy,
      }],
      series
    }, true);
  }
}
/**
 * 测站水位剖面
 * @param stations 需要展示的站点
 * @param maxx 最远里程
 * @param miny 最小高程
 * @returns 
 */
function getSectionProfile(stations: { name: string, elevation: number, mileage: number, waterLevel: number, state: string }[], maxx: number, miny: number) {
  const res: any[] = [];

  // 水位剖面
  const riverData: any[] = [];
  const len = stations.length;
  for (let i = 0; i < len; i++) {
    const { mileage, waterLevel } = stations[i];
    const lastStation = stations[i - 1];
    lastStation ? riverData.push([lastStation.mileage, waterLevel]) : riverData.push([maxx, waterLevel])
    riverData.push([mileage, waterLevel])
  }
  res.push({
    name: `section-profile`,
    type: 'line',
    symbolSize: 0,
    smooth: true,
    itemStyle: {
      color: 'rgba(0,0,0,0)'
    },
    areaStyle: {
      normal: {
        color: new graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: '#3299fd'//3299fd
        }, {
          offset: 1,
          color: '#3299fd'
        }])
      },
      opacity: 1
    },
    animationDelay: 1000,
    z: 8,
    data: riverData
  })

  // 坝体剖面
  const damData = stations.reduce((res, row) => {
    const { name, elevation, mileage, state } = row;
    res.push({
      name,
      value: [mileage, elevation],
      itemStyle: { color: stateColorEnum[state] },
      station: row
    });
    return res;
  }, [] as any[])

  res.push({
    name: `dam-body`,
    type: 'bar',
    barWidth: 5,
    itemStyle: {
      color: '#666'
    },
    barGap: '20%',
    z: 9,
    data: damData
  })
  return res;
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
function getRiverbedCrossSection(x: number[], y: number[], miny: number, maxy: number) {
  const riverbed: number[][] = [];
  const crossSection: number[][] = [];
  const riverbedHeight = (maxy - miny) * 0.1;
  x.forEach((v, i) => {
    riverbed.push([v, y[i]]);
    crossSection.push([v, y[i] - riverbedHeight]);
  });
  return [
    {
      name: '河床',
      type: 'line',
      symbolSize: 0,
      smooth: false,
      animation: false,
      lineStyle: {
        width: 0,
        color: '#000'
      },
      areaStyle: {
        color: "#437cf1",
        emphasis: {
          color: "#437cf1",//移入后的颜色
        },
        opacity: 1
      },
      z: 10,
      data: riverbed
    }, {
      name: '河流横截面',
      type: 'line',
      symbolSize: 0,
      smooth: false,
      animation: false,
      lineStyle: {
        width: 0
      },
      areaStyle: {
        color: "#FDEEC5",
        emphasis: {
          color: "#FDEEC5",//移入后的颜色
        },
        opacity: 1
      },
      z: 11,
      data: crossSection
    }
  ]
}

// 获取两线所有交点
function getIntersectionPoint(points1: number[][], points2: number[][]) {
  const res: number[][] = []
  points1.forEach((row, index) => {
    const len = points2.length;
    for (let i = 0; i < len; i++) {
      if (i < len - 1) {
        const before = points2[i];
        const after = points2[i + 1];

        if ((row[0] < before[0] && row[0] > after[0]) || (row[0] > before[0] && row[0] < after[0])) {
          // res.push(segmentsIntr([row, points1[index + 1] || points1[index - 1]], [before, after]));
          res.push([row[0], before[1] < after[1] ? before[1] : after[1], row[2]]);
          break;
        }
      } else {
        // res.push(segmentsIntr([row, points1[index - 1]], [points2[len - 2], points2[len - 1]]));
        res.push([row[0], points2[i][1], row[2]]);
      }
    }
  })
  return res;
}
// 是否执行后续的计算 ？ 不是最后一个点，且有交点时
function ifCalculatePoint(idx, lth, [a1, b1, a2, b2]: any[] = []) {
  return idx !== (lth - 1) && ifHaveIntersectionPoint(a1, b1, a2, b2)
}

// 判断两条线段是否有交点, a1、b1 为两条线在 x1 处的值；a2、b2 为两条线在 x2 处的值；
// 只要不是一条线段的两个点都高于另一个点就会有交点；
function ifHaveIntersectionPoint(a1, b1, a2, b2) {
  return (+a1 > +b1) != (+a2 > +b2)
}

// 求两条线段交点，a,b 为第一条线段的始末点，c,d 为第二条线段的始末点。[0]，[1] 为点的横纵坐标
function segmentsIntr([a, b], [c, d]) {
  var denominator = (b[1] - a[1]) * (d[0] - c[0]) - (a[0] - b[0]) * (c[1] - d[1])
  var x = ((b[0] - a[0]) * (d[0] - c[0]) * (c[1] - a[1]) +
    (b[1] - a[1]) * (d[0] - c[0]) * a[0] -
    (d[1] - c[1]) * (b[0] - a[0]) * c[0]) / denominator
  var y = -((b[1] - a[1]) * (d[1] - c[1]) * (c[0] - a[0]) +
    (b[0] - a[0]) * (d[1] - c[1]) * a[1] -
    (d[0] - c[0]) * (b[1] - a[1]) * c[1]) / denominator
  return [x, y]
}