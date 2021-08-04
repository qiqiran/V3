<template>
  <CascadeGraphs
    ref="cascadeGraphsRef"
    @dblclick="dblclickFn"
    @refresh-child-chart="refreshChildChart"
  />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, unref } from "vue";
import { CascadeGraphs } from "@/components/Charts";

import { data } from "./data/index";
import { data as RRData } from "./data/RR";

export default defineComponent({
  components: { CascadeGraphs },
  setup() {
    const cascadeGraphsRef = ref<typeof CascadeGraphs>(CascadeGraphs);

    onMounted(() => {
      const cascadeGraphs = unref(cascadeGraphsRef);
      cascadeGraphs.draw(data);
    });

    function dblclickFn(stations) {
      console.log(stations);
    }

    function refreshChildChart(dam, fn) {
      fn(dam, RRData);
    }

    return { cascadeGraphsRef, dblclickFn, refreshChildChart };
  },
});
</script>

<style>
</style>