<template>
  <a-tooltip placement="bottom" :title="'搜索'">
    <span>
      <SearchOutlined />
    </span>
  </a-tooltip>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppSearch",
});
</script>

<style>
</style>