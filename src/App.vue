<template>
  <Layout style="height: 100%;">
    <RouterView>
      <template #default="{ Component, route }">
        <keep-alive :include="getCaches">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </template>
    </RouterView>
  </Layout>
</template>

<script lang="ts">
import { defineComponent, computed, unref } from "vue";
import { ConfigProvider } from "ant-design-vue";

import { createBreakpointListen } from "src/hooks/event/useBreakpoint";
import { useAppAdapter } from "src/hooks/web/useAppAdapter";
import { tabStore } from "src/framework/store/modules/tab";

import Layout from "src/components/Layout/index.vue";

export default defineComponent({
  name: "App",
  components: {
    ConfigProvider,
    Layout,
  },
  provide: {
    prefixCls: "wiot-",
  },
  setup() {
    createBreakpointListen(({ screenMap, sizeEnum, width }) => {
      const lgWidth = screenMap.get(sizeEnum.LG);
      if (lgWidth) {
        useAppAdapter().setIsMobile(width.value - 1 < lgWidth);
      }
    });

    const getCaches = computed((): string[] => {
      console.log(tabStore.getCachedTabList);

      return tabStore.getCachedTabList;
    });
    return { getCaches };
  },
});
</script>
<style lang='less'>
#app {
  height: 100%;
  width: 100%;
}
</style>
