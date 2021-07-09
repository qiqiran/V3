<template>
  <div class="container">
    <div class="chart-dom" ref="chartDom" :style="`height: calc(100% - ${hideTable ? 0 : 221}px)`"></div>
    <div class="table-dom" ref="tableDom" v-if="!hideTable">
      <table border="1" style="width: 100%;">
        <thead>
          <th
            v-for="(section,index) in sections"
            :key="`section-name-${index}`"
            :style="`width: ${section?.tableWidth}%`"
          >{{section?.name}}</th>
        </thead>
        <tbody>
          <tr>
            <td
              v-for="(section,index) in sections"
              :key="`section-elevation-${index}`"
            >{{section?.elevation}}</td>
          </tr>
          <tr>
            <td
              v-for="(section,index) in sections"
              :key="`section-mileage-${index}`"
            >{{section?.mileage}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import type { Ref } from "vue";
import { defineComponent, ref, onBeforeMount, onMounted } from "vue";

import { CascadeGraphs } from "./index";

import { useWindowSizeFn } from "src/hooks/event/useWindowSizeFn";

export default defineComponent({
  setup() {
    const chartDom: Ref<HTMLElement | null> = ref(null);
    const tableDom: Ref<HTMLElement | null> = ref(null);
    const { data } = require("./data.ts");

    onBeforeMount(() => {
      data.sections.sort((a, b) => {
        return b.mileage - a.mileage;
      });
      calculativeWidth();
    });

    onMounted(() => {
      setTimeout(() => {
        const chart = new CascadeGraphs((chartDom as Ref<HTMLElement>).value, (tableDom as Ref<HTMLElement>).value, "light");
        chart.draw(data);
        useWindowSizeFn(() => {
          chart.getInstance().resize();
        }, 100);
      }, 1);
    });

    function calculativeWidth() {
      const { sections, minx, maxx } = data;
      const len = sections.length;
      for (let i = 0; i < len; i++) {
        const width = Math.abs(sections[i].mileage - (sections[i + 1] ? sections[i + 1].mileage : minx)) / maxx;
        sections[i]["tableWidth"] = width;
      }
    }

    return { chartDom, tableDom, ...data };
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
  height: calc(100% - 221px);
}
.table-dom {
  margin-left: 5%;
  margin-right: 5%;
  width: 90%;
  height: 221px;
  overflow: hidden;
  border: 1px solid #000;
  th {
    height: 80px;
    writing-mode: vertical-lr; /*从左向右 从右向左是 writing-mode: vertical-rl;*/
    writing-mode: tb-lr; /*IE浏览器的从左向右 从右向左是 writing-mode: tb-rl；*/
  }
  tr {
    height: 70px;
  }
  td {
    writing-mode: vertical-lr; /*从左向右 从右向左是 writing-mode: vertical-rl;*/
    writing-mode: tb-lr; /*IE浏览器的从左向右 从右向左是 writing-mode: tb-rl；*/
  }
}
</style>