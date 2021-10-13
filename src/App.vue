<template>
  <Layout style="height: 100%">
    <router-view>
      <template #default="{ Component, route }">
        <!-- <transition name="fade-slide"> -->
        <keep-alive v-if="openCache" :include="getCaches">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
        <component v-else :is="Component" :key="route.fullPath" />
        <!-- </transition> -->
      </template>
    </router-view>
    <FrameLayout />
  </Layout>
</template>

<script lang="ts">
  import { defineComponent, computed, unref } from 'vue';
  import { ConfigProvider } from 'ant-design-vue';

  import { createBreakpointListen } from 'src/hooks/event/useBreakpoint';
  import { useAppAdapter } from 'src/hooks/web/useAppAdapter';
  import { tabStore } from '#/store/modules/tab';
  import { useRootSetting, useMultiTabSetting } from 'src/hooks/setting';

  import Layout from 'src/components/Layout/index.vue';
  import FrameLayout from 'src/components/Layout/iframe/index.vue';

  export default defineComponent({
    name: 'App',
    components: {
      ConfigProvider,
      Layout,
      FrameLayout,
    },
    setup() {
      createBreakpointListen(({ screenMap, sizeEnum, width }) => {
        const lgWidth = screenMap.get(sizeEnum.LG);
        if (lgWidth) {
          useAppAdapter().setIsMobile(width.value - 1 < lgWidth);
        }
      });

      const { getOpenKeepAlive } = useRootSetting();
      const { getShowMultipleTab } = useMultiTabSetting();

      const openCache = computed(() => unref(getOpenKeepAlive) && unref(getShowMultipleTab));
      const getCaches = computed((): string[] => {
        if (!unref(getOpenKeepAlive)) return [];

        return tabStore.getCachedTabList;
      });
      return { openCache, getCaches };
    },
  });
</script>
<style lang="less">
  #app {
    height: 100%;
    width: 100%;
  }
</style>
