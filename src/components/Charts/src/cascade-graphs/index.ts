
import type { ECharts } from "echarts";
import type { ChartData, Section, Dam, CtorOptions, Station } from "./types";

import { stateEnum, stateColorEnum } from "./enum";

import { init, graphic } from 'echarts';
import { cloneDeep } from 'lodash-es';
import { segmentsIntr } from "@/utils/geometry"
import { isArray } from "@/utils/is";

const sectionProfileUniqueId = 8 + Math.random();

export class CascadeGraphs {
  private chart: any;
  private tableDom: any;
  private emit: any;

  constructor(dom: HTMLElement, {
    tableDom,
    theme,
    emit
  }: CtorOptions) {
    this.chart = init(dom, theme);
    this.emit = emit
    this.tableDom = tableDom;
  }

  getInstance(): ECharts {
    return this.chart;
  }

  draw(chartData: ChartData) {
    const { miny, maxy, minx, maxx, hideTable, sections, dams }: ChartData = chartData;

    // 截面与坝体交汇点
    const intersectionPointList = getIntersectionPoint(
      dams.reduce((res, row) => {
        res.push([row.mileage, row.elevation, row.name]);
        return res;
      }, [] as any[][]),
      sections.reduce((res, row) => {
        res.push([row.mileage, row.elevation])
        return res
      }, [] as any[][])
    );

    // 交汇点混入坝体关键点
    const sectionsCopy = [...sections, ...intersectionPointList.reduce((res, row) => {
      res.push({ mileage: row[0], elevation: row[1] });
      return res;
    }, [] as any[])].sort((a, b) => b.mileage - a.mileage);

    const series: any[] = [...getRiverbedCrossSection(sectionsCopy, miny, maxy)];

    series.push(...getSectionProfile(chartData, intersectionPointList))

    this.chart.setOption(getOptions(chartData, series), true);

    // 设置与table的联动
    this.chart.off("datazoom");
    if (!hideTable) {
      this.chart.on("datazoom", (params) => {
        let zoomAxis = params.batch ? params.batch[0] : params;
        const table = this.tableDom?.children[0]

        if (this.tableDom && table) {
          table?.setAttribute('style', 'width: ' + (100 / (zoomAxis.end - zoomAxis.start) as number * 100) + '%');
          this.tableDom?.scrollTo({ left: (100 - zoomAxis.end) * (this.tableDom.scrollWidth || 0) / 100 })
        } else {
          console.error("table dom error");
        }
      });
    }
    // 坝体点击
    this.chart.on("dblclick", { seriesName: "dam-body" }, (params) => {
      this.emit("dblclick", params.data.dam.stations)
    })

    // 水位面点击
    this.chart.getZr().on('dblclick', (params) => {
      const { target, offsetX, offsetY } = params;

      // 所点击面是水位面
      if (target && target.type === "ec-polygon" && target.z === sectionProfileUniqueId) {
        const clickPoint: [number, number] = this.chart.convertFromPixel({ seriesName: "section-profile" }, [offsetX, offsetY])
        console.log("pointInGrid", clickPoint);
        console.log(getDamsByMileage(dams, clickPoint[0], minx, maxx));
      }
    });
  }
}

/**
 * getOptions
 * @param chartData 
 * @param series 
 * @returns 
 */
function getOptions(chartData: ChartData, series: any[]) {
  const { minx, miny, maxx, maxy }: ChartData = chartData;
  return {
    dataZoom: [
      {
        type: 'inside',
      }
    ],
    tooltip: {
      trigger: 'axis',
      formatter: (params) => {
        let res = '';
        if (isArray(params)) {
          params.forEach((row) => {
            const { seriesName, seriesType, marker, data: { dam } } = row;
            if (seriesType === 'bar' && seriesName === 'dam-body') {

              const { name, mileage, elevation, waterLevel, state } = dam;
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
      bottom: 1,
    },
    xAxis: [{
      type: 'value',
      splitLine: {
        show: false
      },
      axisLabel: {
        inside: true
      },
      axisTick: {
        inside: true
      },
      inverse: true,
      min: minx,
      max: maxx,
      z: 30
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
          type: 'dashed',
          dashOffset: 10
        }
      },
      axisLabel: {
        showMinLabel: false
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
          type: 'dashed',
          dashOffset: 10
        }
      },
      axisLabel: {
        showMinLabel: false
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
  }
}

/**
 * 测站水位剖面
 * @param dams 需要展示的站点
 * @param maxx 最大里程
 * @param miny 最小高程
 * @returns 
 */
function getSectionProfile({ dams, maxx, style }: ChartData, intersectionPointList) {
  const res: any[] = [];

  // 水位剖面
  const riverData: any[] = [];
  const len = dams.length;
  for (let i = 0; i < len; i++) {
    const { mileage, waterLevel } = dams[i];
    const lastDam = dams[i - 1];
    lastDam ? riverData.push([lastDam.mileage, waterLevel]) : riverData.push([maxx, waterLevel])
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
      color: '#3299fd',
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
    z: sectionProfileUniqueId,
    data: riverData
  })

  // 坝体剖面
  const damData = dams.reduce((res, row) => {
    const { name, elevation, mileage, state } = row;
    res.push({
      name,
      value: [mileage, elevation],
      itemStyle: { color: stateColorEnum[state] },
      dam: row
    });
    return res;
  }, [] as any[])

  res.push({
    name: `dam-body`,
    type: 'bar',
    label: {
      show: true,
      position: 'top',
      fontSize: 14,
      color: '#000',
      formatter: (param) => `▽ ${param?.data?.dam?.waterLevel}`
    },
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
        fontSize: style?.nameLable?.fontSize || 16,
        color: style?.nameLable?.color || '#fff',
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
 * @param sections Section[] // 截面关键点
 * @param miny number // 最小高程
 * @param maxy number // 最大高程
 * @returns 
 */
function getRiverbedCrossSection(sections: Section[], miny: number, maxy: number) {
  const riverbed: number[][] = [];
  const crossSection: number[][] = [];
  const riverbedHeight = (maxy - miny) * 0.02;

  sections.forEach((row, i) => {
    const { mileage, elevation } = row;
    riverbed.push([mileage, elevation]);
    crossSection.push([mileage, elevation - riverbedHeight]);
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
        color: "#cfc541",
        emphasis: {
          color: "#cfc541",//移入后的颜色
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

/**
 * 获取两线所有交点
 * @param points1 number[][]
 * @param points2 number[][]
 * @returns 
 */
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
            res.push([...ponit as number[], row[2]]);
          } else {
            res.push([row[0], before[1] < after[1] ? before[1] : after[1], row[2]]);
          }
          break;
        }
      } else {
        const ponit = segmentsIntr(row, [row[0], 0], points2[len - 2], points2[len - 1])
        if (ponit !== false) {
          res.push([...ponit as number[], row[2]]);
        } else {
          res.push([row[0], points2[i][1], row[2]]);
        }
      }
    }
  })
  return res;
}

/**
 * 根据当前里程获取与之相邻两个大坝所配置的测站
 */
function getDamsByMileage(dams: Dam[], mileage: number, minx: number, maxx: number) {
  dams = cloneDeep(dams);
  dams.unshift({ mileage: maxx, name: "起始点", code: "", elevation: 0, waterLevel: 0, state: "finished" });
  dams.push({ mileage: minx, name: "结束点", code: "", elevation: 0, waterLevel: 0, state: "finished" });

  const len = dams.length;
  const res: Station[] = [];
  for (let i = 0; i < len; i++) {
    const before = dams[i];
    const after = dams[i + 1];

    if (i < len - 1) {
      if ((mileage < before.mileage && mileage > after.mileage) || (mileage > before.mileage && mileage < after.mileage)) {
        if (after.stations) res.push(...after.stations)
      }
    }
  }
  return res;
}