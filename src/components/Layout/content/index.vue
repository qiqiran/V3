<template>
  <a-layout-content>
    <slot></slot>
  </a-layout-content>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import { useMultiTabSetting } from "src/hooks/setting";

export default defineComponent({
  name: "LayoutContent",
  setup() {
    const { getShowMultipleTab } = useMultiTabSetting();
    return {};
  },
});
</script>

<style>
</style>