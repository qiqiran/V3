import { ECharts, number } from "echarts";
import type { ChartData, MarkData } from "./types";

import { init, graphic } from 'echarts';

import { isArray } from "@/utils/is";
import { getEchartsOfScaleDecimal } from "@/components/Charts/utils";

import { detector } from "./images"

let markids: string[] = [];

let childChart: ECharts;
export class DamGraph {
  private chart: ECharts;

  constructor([dom, childDom]: [HTMLElement, HTMLElement?], theme?: string) {
    this.chart = init(dom, theme);
    if (childDom) childChart = init(childDom, theme);
  }

  getInstance(): [ECharts, ECharts] {
    return [this.chart, childChart];
  }

  draw(chartData: ChartData) {
    const series: any[] = [...getRiverbedCrossSection(chartData)];

    series.push(...getSectionProfile(chartData));

    series.push(...getDamProfile(chartData));

    series.push(...getTMark(chartData));

    this.chart.setOption(getOption(chartData, series));

    const { datas } = chartData;
    console.log(datas);

    const markIndexs: number[] = series.reduce((res, row, index) => {
      if (markids.includes(row.id)) res.push(index);
      return res
    }, [] as number[]);

    // 坝体选中
    this.chart.off("highlight");
    this.chart.on("highlight", ({ batch }) => {

      if (batch && isArray(batch) && markIndexs.length > 0) {
        const dataIndex = batch.reduce((res, row) => {
          markIndexs.includes(row.seriesIndex) && (res = markIndexs.indexOf(row.seriesIndex));
          return res
        }, -1);
        if (dataIndex > -1) {
          try {
            const markData = datas[dataIndex];
            if (markData.data && markData.data.length > 1) {
              this.drawChildChart(markData);
            } else {
              this.clearChildChart();
            }
          } catch (error) {
            console.error("坝体数据异常！");
            console.error(error);
          }
        }
      } else {
        console.warn("数据异常");
      }
    });
  }

  drawChildChart(markData: MarkData) {
    const data = markData.data.reduce((res, row) => {
      res.push([row.T, row.H]);
      return res
    }, [] as [number, number][])
    childChart.setOption(getChildOption(markData.label, data), true);
  }

  clearChildChart() {
    childChart.setOption({}, true);
  }
}

/**
 * getOption
 * @param chartData 
 * @param series 
 * @returns 
 */
function getOption({ minx, miny, maxx, maxy }: ChartData, series: any[]) {
  return {
    tooltip: {
      trigger: 'axis',
      formatter: () => ""
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

function getChildOption(name: string, data: [number, number][]) {
  return {
    animation: false,
    title: {
      text: name,
      left: "center",
      textStyle: {
        color: "#606266",
        fontSize: 16,
        fontWeight: 500,
      }
    },
    grid: {
      left: 50,
      top: 50,
      right: 0,
      bottom: 50
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params) => {
        if (!params[0]) {
          return params.name;
        }
        let relVal = '';
        params.forEach(function (item, index) {
          relVal += "<font size='4' style='color:" + item.color + "'>●&nbsp;</font>" + item.data[1] + " m：" + (item.axisValueLabel * 1) + "℃ <br/>"
        })
        return relVal;
      }
    },
    xAxis: [
      {
        type: 'value',
        axisLabel: {
          formatter: (val) => {
            return val + "℃";
          }
        },
        min: (value) => {
          value = getEchartsOfScaleDecimal(value.min, value.max);
          return Math.floor(value.min);
        },
        max: (value) => {
          value = getEchartsOfScaleDecimal(value.min, value.max);
          return Math.ceil(value.max);
        },
      }
    ],
    yAxis: [
      {
        name: '水深(m)',
        nameLocation: "start",
        type: 'value',
        inverse: true,
        axisLabel: {
          formatter: (val) => {
            return val + "m";
          }
        },
      }
    ],
    series: [{
      type: 'line',
      lineStyle: {
        normal: {
          width: 3,
          shadowColor: 'rgba(0,0,0,0.4)',
          shadowBlur: 10,
          shadowOffsetY: 10
        }
      },
      showSymbol: false,
      data
    }]
  }
}

/**
 * 河流横截面
 * @param chartData 
 * @returns 
 */
function getRiverbedCrossSection({ sections, miny, maxy }: ChartData) {
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
 * 水位剖面
 * @param chartData 
 * @returns 
 */
/** */
function getSectionProfile({ dam, maxx, minx, lz, rz }: ChartData) {
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
 * 大坝剖面
 * @param chartData 
 */
function getDamProfile({ dam, pipeTop, pipeBottom }: ChartData) {
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

/**
 * 水温标注
 * @param chartData 
 * @returns 
 */
function getTMark({ datas, dam, lz, rz, miny }: ChartData) {
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
      symbolSize: 6,
      itemStyle: {
        color: '#999'
      },
      lineStyle: {
        width: 1,
      },
      label: {
        show: true,
        position: [10, 0],
        color: "#fff",
        offset: [120, 20],
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
      labelLayout: {
        hideOverlap: true
      },
      markPoint: {
        symbol: detector,
        symbolSize: 40,
        label: {
          position: 'top',
        },
        z: 100,
        data: [{ name: '水位', value: label, xAxis: mileage, yAxis: z }]
      },
      z: 9,
      data: lineData
    })
  })
  return res;
}