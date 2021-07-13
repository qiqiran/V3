<template>
  <CascadeGraphs ref="cascadeGraphsRef" @dblclick="dblclickFn" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, unref } from "vue";
import { CascadeGraphs } from "@/components/Charts";

export default defineComponent({
  components: { CascadeGraphs },
  setup() {
    const { data } = require("./data");
    const cascadeGraphsRef = ref<typeof CascadeGraphs>(CascadeGraphs);

    onMounted(() => {
      const cascadeGraphs = unref(cascadeGraphsRef);
      cascadeGraphs.draw(data);
    });

    function dblclickFn(data) {
      console.log("data", data);
    }
    return { cascadeGraphsRef, dblclickFn };
  },
});
</script>

<style>
</style>