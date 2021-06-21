<template>
  <div :style="`width:100%; height:100%; overflow:hidden;`">
    <iframe :src="path" frameborder="0" :style="`width:100%; height:100%;`"></iframe>
  </div>
</template>

<script lang="ts">
import { defineComponent, unref } from "vue";

import { useRouter } from "vue-router";

export default defineComponent({
  name: "IFrame",
  setup() {
    const { currentRoute } = useRouter();

    const { params, query } = unref(currentRoute);
    const { path } = params;
    const _path = Array.isArray(path) ? path.join("/") : path;

    return {
      path: _path,
    };
  },
});
</script>

<style>
</style>