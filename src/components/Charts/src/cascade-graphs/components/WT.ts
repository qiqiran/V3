import type { Dam } from "../types";

export function getOption({ name }: Dam, { st, et, data }: any) {
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
    xAxis: [
      {
        type: 'value',
        axisLabel: {
          formatter: (val) => {
            return val + "℃";
          }
        },
        min: (value) => {
          value = value.min ? value.min : 0, value.max ? value.max : 1;
          return Math.floor(value.min);
        },
        max: (value) => {
          value = value.min ? value.min : 0, value.max ? value.max : 1;
          return Math.ceil(value.max);
        },
      }
    ],
    yAxis: [
      {
        name: '水深(m)',
        type: 'value',
        axisLabel: {
          formatter: (val) => {
            return -val + "m";
          }
        },
      }
    ],
    series: [
      {
        name: '深水水温',
        type: 'line',
        barWidth: '10%',
        barMaxWidth: '50',
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
        data: []
      }
    ]
  }
}