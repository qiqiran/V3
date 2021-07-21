<template>
  <div class="chart-dom" ref="chartDom"></div>
</template>

<script lang="ts">
import type { Ref } from "vue";
import { defineComponent, nextTick, ref, unref, onMounted } from "vue";

import { DamGraph } from "./indes";

export default defineComponent({
  setup() {
    const chartDom = ref<ElRef>(null);
    onMounted(() => {
      nextTick(() => {
        const chart = new DamGraph(unref(chartDom as Ref<HTMLElement>), "light");
        chart.draw(require("./data").data);
      });
    });
    return { chartDom };
  },
});
</script>

<style lang="less" scoped>
.chart-dom {
  width: 100%;
  height: 100%;
}
</style>