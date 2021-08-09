import type { Dam } from "../types";
import { getEchartsOfScaleDecimal } from "@/components/Charts/utils";

export function getOption({ name }: Dam, datas: any[]) {
  const series: any[] = [];
  const legends: string[] = [];

  datas.forEach(row => {
    legends.push(row.name)
    series.push({
      name: row.name,
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
      z: 10,
      data: row.data
    })
  })

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
    legend: {
      data: legends,
      type: "scroll",
      top: 20,
      left: "20%"
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
    series
  }
}