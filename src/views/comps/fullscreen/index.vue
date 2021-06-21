<template>
  <a-button @click="toggle()">全屏</a-button>
  <div ref="backgroundRef" class="background">
    <span v-if="isFullscreen" @click="toggle()">点我退出全屏</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import { useFullscreen } from "@vueuse/core";

export default defineComponent({
  setup() {
    const backgroundRef = ref();

    const { toggle, isFullscreen } = useFullscreen(backgroundRef);
    return { backgroundRef, toggle, isFullscreen };
  },
});
</script>

<style lang="less" scoped>
.container {
  padding: 1rem;
}
.background {
  position: relative;
  background-color: @primary-color;
  border-radius: 100px;
  margin: 1rem;
  height: 300px;
  width: calc(100% - 2rem);
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    font-size: 50px;
    color: #fff;
  }
}
</style>