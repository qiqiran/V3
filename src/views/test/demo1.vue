<template>
  <div class="background">
    <a-input v-model:value="color" />
    <a-button>切换颜色</a-button>
  </div>
</template>

<script setup>
import { ref } from "vue";
const color = ref("#fefefe");
</script>

<style lang="less" scoped>
.background {
  background-color: v-bind(color);
  height: 100%;
}
</style>