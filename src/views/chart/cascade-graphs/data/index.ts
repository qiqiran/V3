import type { ChartData } from "@/components/Charts/src/cascade-graphs/types"

export const data: ChartData = {
  tp: "RR",
  minx: 0.0,
  maxx: 861.39,
  miny: 0.0,
  maxy: 3500.0,
  hideTable: false,
  style: {
    nameLable: {
      color: "black",
      fontSize: 16,
    },
  },
  sections: [
    { name: "加让目且", mileage: 861.39, elevation: 3080 },
    { name: "若尔格", mileage: 846.09, elevation: 3040 },
    { name: "柯河", mileage: 828.39, elevation: 3000 },
    { name: "安江木口", mileage: 809.89, elevation: 2960 },
    { name: "尔格", mileage: 796.89, elevation: 2920 },
    { name: "果尔巫", mileage: 775.89, elevation: 2800 },
    { name: "日部公社", mileage: 761.09, elevation: 2680 },
    { name: "温都寺", mileage: 744.79, elevation: 2600 },
    { name: "草登公社", mileage: 725.79, elevation: 2560 },
    { name: "三大坪", mileage: 710.29, elevation: 2520 },
    { name: "茶堡河口", mileage: 698.89, elevation: 2480 },
    { name: "蒲志", mileage: 686.39, elevation: 2440 },
    { name: "日瓦复", mileage: 672.59, elevation: 2400 },
    { name: "梭莫河口", mileage: 667.59, elevation: 2370.66 },
    { name: "双江口", mileage: 650.19, elevation: 2267.54 },
    { name: "双江口坝址", mileage: 642.69, elevation: 2217.67 },
    { name: "新扎沟口", mileage: 615.84, elevation: 2150.33 },
    { name: "大金", mileage: 603.04, elevation: 2132.37 },
    { name: "独松沟口", mileage: 584.14, elevation: 2091.14 },
    { name: "安宁公社", mileage: 570.37, elevation: 2069.51 },
    { name: "马奈", mileage: 549.37, elevation: 2038.65 },
    { name: "小巴旺", mileage: 520.42, elevation: 1943.32 },
    { name: "小金川沟口", mileage: 509.82, elevation: 1842.13 },
    { name: "成都河坝", mileage: 498.5, elevation: 1821.78 },
    { name: "溪水沟口", mileage: 483.53, elevation: 1763.16 },
    { name: "鸭包", mileage: 476.9, elevation: 1751.04 },
    { name: "巴身小河口", mileage: 459.45, elevation: 1686.48 },
    { name: "孔玉区", mileage: 448.25, elevation: 1630.14 },
    { name: "金汤河沟口", mileage: 428.65, elevation: 1497.69 },
    { name: "铜厂沟", mileage: 412.41, elevation: 1442.11 },
    { name: "瓦斯何沟口", mileage: 398.75, elevation: 1380.6 },
    { name: "泸定军桥", mileage: 375.16, elevation: 1300 },
    { name: "冷碛区", mileage: 358.2, elevation: 1239.86 },
    { name: "加那沟口", mileage: 341.75, elevation: 1137.1 },
    { name: "得妥", mileage: 331.42, elevation: 1080.05 },
    { name: "挖角坝沟口", mileage: 304.56, elevation: 947.74 },
    { name: "安顺场沟口", mileage: 283.62, elevation: 884.32 },
    { name: "石棉大桥", mileage: 271.32, elevation: 850.18 },
    { name: "安乐公社", mileage: 241.65, elevation: 785.17 },
    { name: "流沙河口", mileage: 220.05, elevation: 750.49 },
    { name: "尼日河口", mileage: 194.5, elevation: 682.97 },
    { name: "深溪沟口", mileage: 177.682, elevation: 620.37 },
    { name: "枕头坝", mileage: 159.79, elevation: 585.94 },
    { name: "金口河沟口", mileage: 146.277, elevation: 555.8 },
    { name: "丑渡溪", mileage: 121.887, elevation: 516.56 },
    { name: "象鼻子", mileage: 106.666, elevation: 474.64 },
    { name: "大河坝", mileage: 93.166, elevation: 466.92 },
    { name: "龚嘴", mileage: 85.103, elevation: 440.11 },
    { name: "铜街子", mileage: 65.006, elevation: 426.69 },
    { name: "福禄镇", mileage: 51.943, elevation: 416.45 },
    { name: "葫芦镇", mileage: 42.739, elevation: 416.45 },
    { name: "沙湾坝址", mileage: 29.752, elevation: 399.36 },
    { name: "安谷坝址", mileage: 15.373, elevation: 378.55 },
    { name: "乐山", mileage: 0, elevation: 354.96 },
  ],
  dams: [
    {
      name: "下尔呷", code: "", mileage: 800, elevation: 3120, designWaterLevel: 3100, actualWaterLevel: 3110, type: "RR", state: "construct",
      stations: [
        { stid: "207", stcd: "61108550", stnm: "白渔潭", },
        { stid: "208", stcd: "61122300", stnm: "码市", },
      ],
    },
    {
      name: "巴拉", code: "", mileage: 775, elevation: 2920, designWaterLevel: 2900, actualWaterLevel: 2880, type: "RR", state: "design",
      stations: [
        { stid: "208", stcd: "61122300", stnm: "码市", }
      ]
    },
    {
      name: "达维", code: "", mileage: 745, elevation: 2730, designWaterLevel: 2700, actualWaterLevel: 2680, type: "WT", state: "finished",
      stations: [
        { stid: "200", stcd: "611G0220", stnm: "开源水库", }
      ]
    },
    {
      name: "卜寺沟", code: "", mileage: 715, elevation: 2606, designWaterLevel: 2600, actualWaterLevel: 2580, type: "WT", state: "construct",
      stations: [
        { stid: "201", stcd: "611H0002", stnm: "建设水库", }
      ]
    },
    {
      name: "双江口", code: "", mileage: 650, elevation: 2500, designWaterLevel: 2500, actualWaterLevel: 2480, type: "RR", state: "design",
      stations: [
        { stid: "220", stcd: "611H0006", stnm: "岭口水库", }
      ]
    },
    {
      name: "金川", code: "", mileage: 625, elevation: 2253, designWaterLevel: 2250, actualWaterLevel: 2200, type: "RR", state: "finished",
      stations: [
        { stid: "204", stcd: "61314950", stnm: "竹园", }
      ]
    },
    {
      name: "安宁", code: "", mileage: 590, elevation: 2133, designWaterLevel: 2120, actualWaterLevel: 2100, type: "WT", state: "construct",
      stations: [
        { stid: "205", stcd: "61504200", stnm: "王家厂", }
      ]
    },
    {
      name: "巴底", code: "", mileage: 555, elevation: 2075, designWaterLevel: 2070, actualWaterLevel: 2050, type: "RR", state: "design",
      stations: [
        { stid: "206", stcd: "615H0704", stnm: "金陵水库", }
      ]
    },
    {
      name: "丹巴", code: "", mileage: 535, elevation: 2056, designWaterLevel: 2050, actualWaterLevel: 2030, type: "RR", state: "finished",
      stations: [
        { stid: "208", stcd: "61122300", stnm: "码市", }
      ]
    },
    {
      name: "猴子岩", code: "", mileage: 465, elevation: 1852, designWaterLevel: 1800, actualWaterLevel: 1780, type: "WT", state: "construct",
      stations: [
        { stid: "200", stcd: "611G0220", stnm: "开源水库", }
      ]
    },
    {
      name: "长河坝", code: "", mileage: 435, elevation: 1690, designWaterLevel: 1600, actualWaterLevel: 1580, type: "RR", state: "design",
      stations: [
        { stid: "201", stcd: "611H0002", stnm: "建设水库", }
      ]
    },
    {
      name: "黄金坪", code: "", mileage: 410, elevation: 1475, designWaterLevel: 1405, actualWaterLevel: 1380, type: "RR", state: "finished",
      stations: [
        { stid: "220", stcd: "611H0006", stnm: "岭口水库", }
      ]
    },
    {
      name: "泸定", code: "", mileage: 385, elevation: 1374, designWaterLevel: 1304, actualWaterLevel: 1280, type: "RR", state: "construct",
      stations: [
        { stid: "204", stcd: "61314950", stnm: "竹园", }
      ]
    },
    {
      name: "硬粮包", code: "", mileage: 345, elevation: 1250, designWaterLevel: 1200, actualWaterLevel: 1180, type: "RR", state: "design",
      stations: [
        { stid: "205", stcd: "61504200", stnm: "王家厂", }
      ]
    },
    {
      name: "大岗山", code: "", mileage: 320, elevation: 1130, designWaterLevel: 1100, actualWaterLevel: 1080, type: "RR", state: "finished",
      stations: [
        { stid: "206", stcd: "615H0704", stnm: "金陵水库", }
      ]
    },
    {
      name: "龙头石", code: "", mileage: 295, elevation: 955, designWaterLevel: 905, actualWaterLevel: 880, type: "WT", state: "construct",
      stations: [
        { stid: "208", stcd: "61122300", stnm: "码市", }
      ]
    },
    {
      name: "老鹰岩", code: "", mileage: 288, elevation: 900, designWaterLevel: 900, actualWaterLevel: 880, type: "RR", state: "design",
      stations: [
        { stid: "200", stcd: "611G0220", stnm: "开源水库", }
      ]
    },
    {
      name: "瀑布沟", code: "", mileage: 205, elevation: 850, designWaterLevel: 800, actualWaterLevel: 780, type: "RR", state: "finished",
      stations: [
        { stid: "201", stcd: "611H0002", stnm: "建设水库", }
      ]
    },
    {
      name: "深溪沟", code: "", mileage: 190, elevation: 655, designWaterLevel: 605, actualWaterLevel: 580, type: "RR", state: "construct",
      stations: [
        { stid: "220", stcd: "611H0006", stnm: "岭口水库", }
      ]
    },
    {
      name: "枕头坝一级", code: "", mileage: 178, elevation: 624, designWaterLevel: 604, actualWaterLevel: 580, type: "RR", state: "design",
      stations: [
        { stid: "204", stcd: "61314950", stnm: "竹园", }
      ]
    },
    {
      name: "枕头坝二级", code: "", mileage: 160, elevation: 590, designWaterLevel: 550, actualWaterLevel: 530, type: "RR", state: "finished",
      stations: [
        { stid: "205", stcd: "61504200", stnm: "王家厂", }
      ]
    },
    {
      name: "沙坪一级", code: "", mileage: 153, elevation: 578, designWaterLevel: 558, actualWaterLevel: 530, type: "RR", state: "construct",
      stations: [
        { stid: "206", stcd: "615H0704", stnm: "金陵水库", }
      ]
    },
    {
      name: "沙坪二级", code: "", mileage: 150, elevation: 554, designWaterLevel: 504, actualWaterLevel: 500, type: "RR", state: "design",
      stations: [
        { stid: "208", stcd: "61122300", stnm: "码市", }
      ]
    },
    {
      name: "龚嘴", code: "", mileage: 100, elevation: 528, designWaterLevel: 508, actualWaterLevel: 500, type: "RR", state: "finished",
      stations: [
        { stid: "200", stcd: "611G0220", stnm: "开源水库", }
      ]
    },
    {
      name: "铜街子", code: "", mileage: 72, elevation: 474, designWaterLevel: 454, actualWaterLevel: 450, type: "RR", state: "construct",
      stations: [
        { stid: "201", stcd: "611H0002", stnm: "建设水库", }
      ]
    },
    {
      name: "沙湾", code: "", mileage: 30, elevation: 432, designWaterLevel: 402, actualWaterLevel: 400, type: "RR", state: "design",
      stations: [
        { stid: "220", stcd: "611H0006", stnm: "岭口水库", }
      ]
    },
    {
      name: "安谷", code: "", mileage: 15, elevation: 398, designWaterLevel: 358, actualWaterLevel: 350, type: "RR", state: "finished",
      stations: [
        { stid: "204", stcd: "61314950", stnm: "竹园", }
      ]
    },
  ],
}