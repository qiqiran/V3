<template>
  <a-layout-content>
    <!-- <transition name="fade" mode="out-in" appear> -->
      <!-- <keep-alive v-if="openCache" :include="getCaches">
        <component :is="Component" :key="route.fullPath" />
      </keep-alive> -->
      <slot></slot>
    <!-- </transition> -->
  </a-layout-content>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import { useMultiTabSetting } from "../useMultiTabSetting";

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