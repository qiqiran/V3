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

/**
 * 根据最大值、最小值和刻度数返回echarts图的最小值，最大值和刻度值
 * @param {*} min
 * @param {*} max 
 */
export function getEchartsOfScaleDecimal(min: number, max: number) {
  if (!isFinite(min)) min = 0;
  if (!isFinite(max)) max = 1;
  let minValue = min;
  let maxValue = max;
  //计算差异尾数
  let cz = Number((maxValue - minValue).toFixed(5));

  if (cz < 0) {
    console.error("Y轴数据非法！", "max:" + max, "min:" + min);
    return {
      max: max,
      min: min
    };
  }

  //根据差值大小计算最大最小值截取位置并截取，例如81.2/80.1，截取后 80、1.2/0.1
  let len = 1;
  len = cz.toString().split(".")[0].length;

  let FMax0 = maxValue.toString().split(".")[0];
  let FMin0 = minValue.toString().split(".")[0];
  let FMax1 = '', FMin1 = '';

  FMax1 = maxValue.toString().split(".")[1] ? maxValue.toString().split(".")[1] : '';
  FMin1 = minValue.toString().split(".")[1] ? minValue.toString().split(".")[1] : '';

  FMax0 = FMax0.substring(FMax0.length - (len), FMax0.length);
  FMin0 = FMin0.substring(FMin0.length - (len), FMin0.length);

  let FMax = Number(FMax1 ? FMax0 + '.' + FMax1 : FMax0);
  let FMin = Number(FMin1 ? FMin0 + '.' + FMin1 : FMin0);

  let IMax = Number((maxValue - FMax).toFixed(0));
  let IMin = Number((minValue - FMin).toFixed(0));

  //根据差值大小计算折算倍数
  let bs = 1;
  let flag = true;
  while (flag) {
    if (cz < 1) {
      cz = cz * 10;
      bs = bs * 10;
    } else if (cz > 10) {
      cz = cz / 10;
      bs = bs / 10;
    }
    if (cz <= 10 && cz >= 1) flag = false;
    if (cz == 0) cz = 1;
  }
  // 基数归整并重置差值
  FMax = Math.ceil(FMax * bs);
  FMin = Math.floor(FMin * bs);
  cz = (FMax - FMin);
  cz = Math.ceil(cz);
  // 使最大最小值能被2整除
  if (FMax % 2 != 0) FMax++;
  if (FMin % 2 != 0) FMin--;
  // 尾数据复原回原本倍数
  FMax = FMax / bs;
  FMin = FMin / bs;
  return {
    max: IMax + FMax,
    min: IMin + FMin
  };
}