import type { ECharts } from "echarts";

import { init, graphic } from 'echarts';


export class DamGraph {
  private chart: ECharts;
  private dom: HTMLElement;
  constructor(dom: HTMLElement, theme?: string) {
    this.dom = dom;
    this.chart = init(dom, theme);
  }

  getInstance(): ECharts {
    return this.chart;
  }

  draw(chartData: any) {
    const { miny, maxx, maxy, hideTable, sections, dams } = chartData;
    const series: any[] = [...getRiverbedCrossSection(sections, miny, maxy)];

    series.push(...getSectionProfile(chartData));

    this.chart.setOption(getOptions(chartData, series))
  }
}

/**
 * getOptions
 * @param chartData 
 * @param series 
 * @returns 
 */
function getOptions(chartData, series: any[]) {
  console.log(chartData);
  
  const { minx, miny, maxx, maxy } = chartData;
  return {
    dataZoom: [
      {
        type: 'inside',
      }
    ],
    tooltip: {
      trigger: 'axis',
      // formatter: (params) => {
      //   let res = '';
      //   if (isArray(params)) {
      //     params.forEach((row) => {
      //       const { seriesName, seriesType, marker, data: { dam } } = row;
      //       if (seriesType === 'bar' && seriesName === 'dam-body') {

      //         const { name, mileage, elevation, waterLevel, state } = dam;
      //         res = `
      //         <h3>${marker}${name}<span style="font-size:12px">(${stateEnum[state]})</span>
      //         </h3>
      //         &emsp;里程：${mileage}(m)
      //         <br/>
      //         &emsp;高程：${elevation}(m)
      //         <br/>
      //         &emsp;水位：${waterLevel}(m)
      //         `;
      //       }
      //     })
      //   }
      //   return res;
      // },
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
 * 河流横截面
 * @param sections Section[] // 截面关键点
 * @param miny number // 最小高程
 * @param maxy number // 最大高程
 * @returns 
 */
function getRiverbedCrossSection(sections: any[], miny: number, maxy: number) {
  const riverbed: number[][] = [];
  const crossSection: number[][] = [];
  const riverbedHeight = (maxy - miny) * 0.1;

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

/**
 * 测站水位剖面
 * @param dams 需要展示的站点
 * @param maxx 最大里程
 * @param miny 最小高程
 * @returns 
 */
function getSectionProfile({ dams, maxx, style }) {
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
    z: 8,
    data: riverData
  })

  return res;
}