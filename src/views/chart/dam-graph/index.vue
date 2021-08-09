<template>
  <div class="container">
    <div class="chart-dom" ref="chartDom"></div>
    <div class="chart-child-dom" ref="childChartDom"></div>
  </div>
</template>

<script lang="ts">
import type { Ref } from "vue";
import { defineComponent, nextTick, ref, unref, onMounted } from "vue";

import { DamGraph } from "./indes";

import { useWindowSizeFn } from "src/hooks/event/useWindowSizeFn";

export default defineComponent({
  setup() {
    const chartDom = ref<ElRef>(null);
    const childChartDom: Ref<HTMLElement | null> = ref(null);

    let chart;
    onMounted(() => {
      setTimeout(() => {
        chart = new DamGraph([unref(chartDom as Ref<HTMLElement>), unref(childChartDom as Ref<HTMLElement>)], "light");

        chart.draw(require("./data").data);
        const [PI, CI] = chart.getInstance();
        useWindowSizeFn(() => {
          PI.resize();
          CI.resize();
        }, 0);
      }, 1);
    });
    return { chartDom, childChartDom };
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
  position: relative;
  min-width: 800px;
  min-height: 700px;
}
.chart-dom {
  width: 100%;
  height: 100%;
}
.chart-child-dom {
  position: absolute;
  top: 50px;
  right: 7%;
  width: 20%;
  height: 30%;
}
</style>