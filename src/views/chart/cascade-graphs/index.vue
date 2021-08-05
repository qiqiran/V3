<template>
  <CascadeGraphs
    ref="cascadeGraphsRef"
    @dblclick="dblclickFn"
    @refresh-child-chart="refreshChildChart"
  />
</template>

<script lang="ts">
import type { Dam } from "@/components/Charts/src/cascade-graphs/types";

import { defineComponent, onMounted, ref, unref } from "vue";
import { CascadeGraphs } from "@/components/Charts";

import { data } from "./data/index";
import { data as RRData } from "./data/RR";

import { GetMEDataApi } from "@/api/chart";

import { formatToDateTime, lastDay } from "src/utils/dateUtil";

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

    const start = formatToDateTime(lastDay(7, new Date()));
    const end = formatToDateTime(new Date());

    const chartsData = {};
    function refreshChildChart(dam: Dam, { callback, clear }) {
      const { type, stations } = dam;
      if (stations && stations.length) {
        switch (type) {
          case "RR":
            const { stid } = stations[0];
            const key = `${stid}${start}${end}`;
            if (chartsData[key]) {
              callback(dam, chartsData[key]);
            } else {
              GetMEDataApi({ ID: stid, ME: "3B", ST: start.replace(":", "_"), ET: end.replace(":", "_"), INTV: 1 }).then((res) => {
                res.st = start;
                res.et = end;
                chartsData[key] = res;
                callback(dam, res);
              });
            }
            break;
          case "WT":
            clear();
            break;
        }
      } else {
        clear();
      }
    }

    return { cascadeGraphsRef, dblclickFn, refreshChildChart };
  },
});
</script>

<style>
</style>