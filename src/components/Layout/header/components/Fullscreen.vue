<template>
  <a-tooltip placement="bottom" :title="getTitle">
    <span @click="toggle">
      <FullscreenExitOutlined v-if="isFullscreen" />
      <FullscreenOutlined v-else />
    </span>
  </a-tooltip>
</template>

<script lang="ts">
import { defineComponent, unref, computed } from "vue";
import { useFullscreen } from "@vueuse/core"

export default defineComponent({
  name: "Fullscreen",
  setup() {
    const { toggle, isFullscreen } = useFullscreen();

    const getTitle = computed(() =>
      unref(isFullscreen) ? "退出全屏" : "全屏"
    );

    return {
      toggle,
      isFullscreen,
      getTitle,
    };
  },
});
</script>

<style>
</style>