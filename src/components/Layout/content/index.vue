<template>
  <a-layout-content>
    <slot></slot>
  </a-layout-content>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'LayoutContent',
    setup() {
      return {};
    },
  });
</script>

<style></style>
