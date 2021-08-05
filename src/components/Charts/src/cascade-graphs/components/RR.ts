import type { GetMEResultModel } from "@/api/chart/model"
import { getEchartsOfScaleDecimal } from "@/components/Charts/utils"

export function getOption({ name, T, V, st, et }: GetMEResultModel) {
  const data = T.reduce((res, row, index) => {
    res.push([row, V[index]])
    return res
  }, [] as [string, number][]);

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
    xAxis: {
      type: 'time',
      min: st,
      max: et,
    },
    yAxis: [
      {
        name: '水位(m)',
        type: 'value',
        min: value => {
          value = getEchartsOfScaleDecimal(value.min, value.max);
          return value.min;
        },
        max: value => {
          value = getEchartsOfScaleDecimal(value.min, value.max);
          return value.max;
        },
      }
    ],
    series: [
      {
        name: '水位',
        type: "line",
        data: data,
        lineStyle: {
          normal: {
            width: 3,
            shadowColor: "rgba(0,0,0,0.4)",
            shadowBlur: 10,
            shadowOffsetY: 10
          }
        },
        barWidth: "10%",
        barMaxWidth: "50",
        showSymbol: false
      }
    ]
  }
}