import type { ECharts } from "echarts";

import { init, graphic } from 'echarts';

import { uniqueId } from "lodash-es";
import { isArray } from "@/utils/is";

let markids: string[] = [];

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

    series.push(...getDamProfile(chartData));

    series.push(...getTMark(chartData));
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
  const { minx, miny, maxx, maxy } = chartData;
  return {
    tooltip: {
      trigger: 'axis',
      formatter: (params) => {
        let res = '';
        if (isArray(params) && params.length && markids.includes(params[0].seriesId)) {
          const { marker, seriesName } = params[0]
          res += `${marker}${seriesName}<br/>`;

          params.forEach((row) => {
            const [M, Z, H, T] = row.data;
            if (H || T) res += `&emsp;水下${H}(m)：${T}(℃)<br/>`;
          })
        }
        return res;
      }
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
 * 测站水位剖面
 * @param dams 需要展示的站点
 * @param maxx 最大里程
 * @param miny 最小高程
 * @returns 
 */
function getSectionProfile({ dam, maxx, minx, lz, rz, style }) {
  const res: any[] = [];

  const mileage = (dam && dam.length) ? (dam[0].mileage + dam[dam.length - 1].mileage) / 2 : 0;
  // 水位剖面
  const riverData: any[] = [[minx, lz], [mileage, lz], [mileage, rz], [maxx, rz]];

  res.push({
    name: `section-profile`,
    type: 'line',
    symbolSize: 0,
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
    z: 8,
    data: riverData
  })

  return res;
}

/**
 * 
 */
function getDamProfile({ dam, pipeTop, pipeBottom }) {
  const res: any[] = [];

  const damProfileTop = dam.reduce((res, row) => {
    res.push([row.mileage, row.elevation]);
    return res;
  }, [] as number[][]);
  if (damProfileTop.length) {
    damProfileTop.unshift([damProfileTop[0][0], 0]);
    damProfileTop.push([damProfileTop[damProfileTop.length - 1][0], 0]);
  }

  const pipeTopArr = pipeTop.reduce((res, row) => {
    res.push([row.mileage, row.elevation]);
    return res;
  }, [] as number[][]);

  const pipeBottomArr = pipeBottom.reduce((res, row) => {
    res.push([row.mileage, row.elevation]);
    return res;
  }, [] as number[][]);

  res.push({
    name: `dam-profile-bottom`,
    type: 'line',
    symbolSize: 0,
    itemStyle: {
      color: '#b7b8b9'
    },
    lineStyle: {
      width: 0.5,
    },
    areaStyle: {
      color: '#e8e8e8',
      emphasis: {
        color: "#e8e8e8",//移入后的颜色
      },
      opacity: 1
    },
    z: 9.9,
    data: pipeBottomArr
  })

  res.push({
    name: `dam-profile-pipeline`,
    type: 'line',
    symbolSize: 0,
    itemStyle: {
      color: '#6cb4fb'
    },
    lineStyle: {
      width: 2,
    },
    areaStyle: {
      color: '#6cb4fb',
      emphasis: {
        color: "#6cb4fb",//移入后的颜色
      },
      opacity: 1
    },
    z: 9.5,
    data: pipeTopArr
  })

  res.push({
    name: `dam-profile-top`,
    type: 'line',
    symbolSize: 0,
    itemStyle: {
      color: '#b7b8b9'
    },
    lineStyle: {
      width: 0.5,
    },
    areaStyle: {
      color: '#e8e8e8',
      emphasis: {
        color: "#e8e8e8",//移入后的颜色
      },
      opacity: 1
    },
    z: 9,
    data: damProfileTop
  })
  return res;
}

function getTMark({ datas, dam, lz, rz, miny }) {
  markids = [];
  const damCenterMileage = (dam && dam.length) ? (dam[0].mileage + dam[dam.length - 1].mileage) / 2 : 0;
  const res: any = [];
  datas.forEach((row, index) => {
    const markid = `markid-${index}`;
    const { label, mileage, data } = row;
    const z = mileage < damCenterMileage ? lz : rz;

    const lineData = [[mileage, z]]
    lineData.push(...data.reduce((_res, _row) => {
      _res.push([mileage, z - _row.H, _row.H, _row.T]);
      return _res;
    }, [] as number[][]));
    lineData.push([mileage, miny]);


    markids.push(markid)
    res.push({
      id: markid,
      name: label,
      type: 'line',
      symbol: 'diamond',
      itemStyle: {
        color: '#999'
      },
      lineStyle: {
        width: 1,
      },
      label: {
        show: true,
        position: 'right',
        color: "#fff",
        textShadowColor: 'rgba(0,0,0,0.6)',
        textShadowBlur: 1,
        textBorderColor: 'rgba(0,0,0,0)',
        formatter: (params) => {
          let res = '';
          const [M, Z, H, T] = params.data;
          if (H || T) res = `水下${H}m：${T}℃`;
          return res;
        }
      },
      markPoint: {
        symbol: 'path://M-244.396,44.399c0,0,0.47-2.931-2.427-6.512c2.819-8.221,3.21-15.709,3.21-15.709s5.795,1.383,5.795,7.325C-237.818,39.679-244.396,44.399-244.396,44.399z M-260.371,40.827c0,0-3.881-12.946-3.881-18.319c0-2.416,0.262-4.566,0.669-6.517h17.684c0.411,1.952,0.675,4.104,0.675,6.519c0,5.291-3.87,18.317-3.87,18.317H-260.371z M-254.745,18.951c-1.99,0-3.603,1.676-3.603,3.744c0,2.068,1.612,3.744,3.603,3.744c1.988,0,3.602-1.676,3.602-3.744S-252.757,18.951-254.745,18.951z M-255.521,2.228v-5.098h1.402v4.969c1.603,1.213,5.941,5.069,7.901,12.5h-17.05C-261.373,7.373-257.245,3.558-255.521,2.228zM-265.07,44.399c0,0-6.577-4.721-6.577-14.896c0-5.942,5.794-7.325,5.794-7.325s0.393,7.488,3.211,15.708C-265.539,41.469-265.07,44.399-265.07,44.399z M-252.36,45.15l-1.176-1.22L-254.789,48l-1.487-4.069l-1.019,2.116l-1.488-3.826h8.067L-252.36,45.15z',
        symbolSize: 30,
        label: {
          position: 'top',
          textBorderColor: 'rgba(0,0,0,0)',
        },
        data: [{ name: '水位', value: label, xAxis: mileage, yAxis: z }]
      },
      z: 9,
      data: lineData
    })
  })
  return res;
}