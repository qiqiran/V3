<template>
  <div class="container">
    <!-- <h2 v-for="item in 10" :key="item">梯级图</h2> -->
    <div class="chart-dom" ref="chartDom"></div>
  </div>
</template>

<script lang="ts">
import type { Ref } from "vue";
import { defineComponent, ref, onMounted } from "vue";

import { CascadeGraphs } from "./index";
export default defineComponent({
  setup() {
    const chartDom: Ref<HTMLElement | null> = ref(null);
    onMounted(() => {
      setTimeout(() => {
        const chart = new CascadeGraphs((chartDom as Ref<HTMLElement>).value, "light");
        chart.draw({
          minx: 0.0,
          maxx: 861.39,
          miny: 0.0,
          maxy: 3500.0,
          x: [
            0, 15.373, 29.752, 42.739, 51.943, 65.006, 85.103, 93.166, 106.666, 121.887, 146.277, 159.79, 177.682, 194.5, 220.05, 241.65, 271.32, 283.62, 304.56, 331.42, 341.75, 358.2, 375.16, 398.75,
            412.41, 428.65, 448.25, 459.45, 476.9, 483.53, 498.5, 509.82, 520.42, 549.37, 570.37, 584.14, 603.04, 615.84, 642.69, 650.19, 667.59, 672.59, 686.39, 698.89, 710.29, 725.79, 744.79,
            761.09, 775.89, 796.89, 809.89, 828.39, 846.09, 861.39,
          ],
          y: [
            354.96, 378.55, 399.36, 416.45, 416.45, 426.69, 440.11, 466.92, 474.64, 516.56, 555.8, 585.94, 620.37, 682.97, 750.49, 785.17, 850.18, 884.32, 947.74, 1080.05, 1137.1, 1239.86, 1300,
            1380.6, 1442.11, 1497.69, 1630.14, 1686.48, 1751.04, 1763.16, 1821.78, 1842.13, 1943.32, 2038.65, 2069.51, 2091.14, 2132.37, 2150.33, 2217.67, 2267.54, 2370.66, 2400, 2440, 2480, 2520,
            2560, 2600, 2680, 2800, 2920, 2960, 3000, 3040, 3080,
          ],
          stations: [
            { name: "下尔呷",     mileage: 800,   elevation: 3120,  waterLevel: 3100, state: "construct" },
            { name: "巴拉",         mileage: 775, elevation: 2920,  waterLevel: 2900, state: "design" },
            { name: "达维",         mileage: 745, elevation: 2730,  waterLevel: 2700, state: "finished" },
            { name: "卜寺沟",     mileage: 715,   elevation: 2606,  waterLevel: 2600, state: "construct" },
            { name: "双江口",     mileage: 650,   elevation: 2500,  waterLevel: 2500, state: "design" },
            { name: "金川",         mileage: 625, elevation: 2253,  waterLevel: 2200, state: "finished" },
            { name: "安宁",         mileage: 590, elevation: 2133,  waterLevel: 2120, state: "construct" },
            { name: "巴底",         mileage: 555, elevation: 2075,  waterLevel: 2070, state: "design" },
            { name: "丹巴",         mileage: 535, elevation: 2056,  waterLevel: 2050, state: "finished" },
            { name: "猴子岩",     mileage: 465,   elevation: 1852,  waterLevel: 1800, state: "construct" },
            { name: "长河坝",     mileage: 435,   elevation: 1690,  waterLevel: 1600, state: "design" },
            { name: "黄金坪",     mileage: 410,   elevation: 1475,  waterLevel: 1405, state: "finished" },
            { name: "泸定",         mileage: 385, elevation: 1374,  waterLevel: 1304, state: "construct" },
            { name: "硬粮包",     mileage: 345,   elevation: 1250,  waterLevel: 1200, state: "design" },
            { name: "大岗山",     mileage: 320,   elevation: 1130,  waterLevel: 1100, state: "finished" },
            { name: "龙头石",     mileage: 295,   elevation: 955,   waterLevel: 905,  state: "construct" },
            { name: "老鹰岩",     mileage: 288,   elevation: 900,   waterLevel: 900,  state: "design" },
            { name: "瀑布沟",     mileage: 205,   elevation: 850,   waterLevel: 800,  state: "finished" },
            { name: "深溪沟",     mileage: 190,   elevation: 655,   waterLevel: 605,  state: "construct" },
            { name: "枕头坝一级", mileage: 178,   elevation: 624,   waterLevel: 604,  state: "design" },
            { name: "枕头坝二级", mileage: 160,   elevation: 590,   waterLevel: 550,  state: "finished" },
            { name: "沙坪一级",   mileage: 153,   elevation: 578,   waterLevel: 558,  state: "construct" },
            { name: "沙坪二级",   mileage: 150,   elevation: 554,   waterLevel: 504,  state: "design" },
            { name: "龚嘴",       mileage: 100,   elevation: 528,   waterLevel: 508,  state: "finished" },
            { name: "铜街子",     mileage: 72,    elevation: 474,   waterLevel: 454,  state: "construct" },
            { name: "沙湾",       mileage: 30,    elevation: 432,   waterLevel: 402,  state: "design" },
            { name: "安谷",       mileage: 15,    elevation: 398,   waterLevel: 358,  state: "finished" },
          ],
        });
      }, 1);
    });
    return { chartDom };
  },
});
</script>

<style lang="less" scoped>
.container {
  overflow: auto;
  width: 100%;
  height: 100%;
  background-color: @white;
  padding: 1rem;
}

.chart-dom {
  width: 100%;
  height: 100%;
}
</style>
