<template>
  <div :class="[prefixCls]">
    面包屑
    <a-breadcrumb :routes="routes">
    </a-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";
import { useRouter, RouteLocationMatched } from "vue-router";

import { useDesign } from "src/hooks/web/useDesign";

import { REDIRECT_NAME } from "src/framework/router/constant";

export default defineComponent({
  name: "Breadcrumb",
  setup() {
    const { prefixCls } = useDesign("breadcrumb");
    const routes = ref<RouteLocationMatched[]>([]);

    const { currentRoute } = useRouter();
    watchEffect(async () => {
      if (currentRoute.value.name === REDIRECT_NAME) return;

      routes.value.push();
    });


    return {
      prefixCls,
      routes
    };
  },
});
</script>

<style lang="less" scoped>
@prefix-cls: ~"@{namespace}breadcrumb";

.@{prefix-cls} {
  display: flex;
  padding: 0 8px;
  align-items: center;
}
</style>