import type { ECharts } from "echarts";

import { init, graphic } from 'echarts';


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
    const { x, y, minx, miny, maxx, maxy, stations } = chartData;

    const series: any[] = [...getRiverbedCrossSection(x, y)];

    series.push(...getSectionProfile(stations, maxx, miny))

    this.chart.setOption({
      tooltip: {
        trigger: 'axis'
      },
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
function getSectionProfile(stations: { name: string, elevation: number, mileage: number }[], maxx: number, miny: number) {
  const res: any[] = [];
  // 水位剖面
  stations.forEach((station, index) => {
    const { name, elevation, mileage } = station;
    res.push({
      name: `${name}-section-profile`,
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
            color: '#ffe'
          }])
        },
        opacity: 1
      },
      animationDelay: (stations.length * 50 - (stations.length - index) * 50),
      z: 8,
      data: [[maxx, elevation], [mileage, elevation], [mileage, miny]]
    })
  });
  // 坝体剖面
  const damData = stations.reduce((res, row) => {
    const { elevation, mileage } = row;
    res.push([mileage, elevation + 30]);
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
function getRiverbedCrossSection(x: number[], y: number[]) {
  const xLine: number[][] = [];
  x.forEach((v, i) => xLine.push([v, y[i]]))
  return [
    {
      name: '河流横截面',
      type: 'line',
      symbolSize: 0,
      smooth: true,
      animation: false,
      itemStyle: {
        lineWidth: 1,
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
    }
  ]
}