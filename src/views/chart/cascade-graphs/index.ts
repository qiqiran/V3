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
    const { x, y, minx, miny, maxx, maxy, sections, stations }: { x: number[], y: number[], minx: number, miny: number, maxx: number, maxy: number, sections: any[], stations: any[] } = chartData;

    const intersectionPointList = getIntersectionPoint(
      stations.reduce((res, row) => {
        res.push([row.mileage, row.elevation, row.name]);
        return res;
      }, [] as any[][]),
      sections.reduce((res, row) => {
        res.push([row.mileage, row.elevation])
        return res
      }, [] as any[][])
    );

    const sectionsCopy = [...sections, ...intersectionPointList.reduce((res, row) => {
      res.push({ mileage: row[0], elevation: row[1] });
      return res;
    }, [] as any[])].sort((a, b) => b.mileage - a.mileage);

    const series: any[] = [...getRiverbedCrossSection(sectionsCopy, miny, maxy, x, y)];

    series.push(...getSectionProfile(stations, sections, intersectionPointList, maxx, miny))

    this.chart.setOption({
      dataZoom: [{
        type: 'slider',
        brushSelect: false
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
function getSectionProfile(stations: { name: string, elevation: number, mileage: number, waterLevel: number, state: string }[], sections: any[], intersectionPointList: any[], maxx: number, miny: number) {
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

  // 标注
  res.push(
    {
      name: `intersection-point`,
      type: 'line',
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

  return res;
}

/**
 * 河流横截面
 * @param minx 截面起点
 * @param maxx 截面重点
 * @param waterLevel 水位
 * @returns 
 */
function getRiverbedCrossSection(sections: any[], miny: number, maxy: number, x: number[], y: number[]) {
  const riverbed: number[][] = [];
  const crossSection: number[][] = [];
  const riverbedHeight = (maxy - miny) * 0.1;

  sections.forEach((row, i) => {
    const { mileage, elevation } = row;
    riverbed.push([mileage, elevation]);
    crossSection.push([mileage, elevation - riverbedHeight]);
  });
  console.log(sections);

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
          const ponit = segmentsIntr(row, [row[0], 0], before, after)

          if (ponit !== false) {
            res.push([...ponit as Point, row[2]]);
          } else {
            res.push([row[0], before[1] < after[1] ? before[1] : after[1], row[2]]);
          }
          break;
        }
      } else {
        const ponit = segmentsIntr(row, [row[0], 0], points2[len - 2], points2[len - 1])
        if (ponit !== false) {
          res.push([...ponit as Point, row[2]]);
        } else {
          res.push([row[0], points2[i][1], row[2]]);
        }
      }
    }
  })
  return res;
}

type Point = number[]
// 求两条线段交点，a,b 为第一条线段的始末点，c,d 为第二条线段的始末点。
function segmentsIntr(a: Point, b: Point, c: Point, d: Point): boolean | Point {

  // 三角形abc 面积的2倍
  const area_abc = (a[0] - c[0]) * (b[1] - c[1]) - (a[1] - c[1]) * (b[0] - c[0]);

  // 三角形abd 面积的2倍
  const area_abd = (a[0] - d[0]) * (b[1] - d[1]) - (a[1] - d[1]) * (b[0] - d[0]);

  // 面积符号相同则两点在线段同侧,不相交 (对点在线段上的情况,本例当作不相交处理);
  if (area_abc * area_abd >= 0) {
    return false;
  }

  // 三角形cda 面积的2倍
  const area_cda = (c[0] - a[0]) * (d[1] - a[1]) - (c[1] - a[1]) * (d[0] - a[0]);
  // 三角形cdb 面积的2倍
  // 注意: 这里有一个小优化.不需要再用公式计算面积,而是通过已知的三个面积加减得出.
  const area_cdb = area_cda + area_abc - area_abd;
  if (area_cda * area_cdb >= 0) {
    return false;
  }

  //计算交点坐标
  const t = area_cda / (area_abd - area_abc);
  const dx = t * (b[0] - a[0]),
    dy = t * (b[1] - a[1]);
  return [a[0] + dx, a[1] + dy];

}