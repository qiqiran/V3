<template>
  <div :class="[prefixCls]">
    <a-tabs
      v-model:activeKey="activeKeyRef"
      hideAdd
      type="editable-card"
      size="small"
      @edit="onEdit"
      @tabClick="tabClick"
    >
      <a-tab-pane
        v-for="item in getTabList"
        :key="item.path"
        :tab="item.meta.title"
        :closable="!(item && item.meta && item.meta.affix)"
      ></a-tab-pane>
      <template #tabBarExtraContent>
        <TabRedo />
        <TabContent isExtra :tabItem="$route" />
        <FullContent />
      </template>
    </a-tabs>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, ref, unref } from "vue";
import type { RouteLocationNormalized } from "vue-router";

import router from "src/framework/router";
import { tabStore } from "src/framework/store/modules/tab";

import { useDesign } from "src/hooks/web/useDesign";
import { useGo } from "src/hooks/web/usePage";

import TabRedo from "./components/TabRedo.vue";
import TabContent from './components/TabContent.vue';
import FullContent from "./components/FullContent.vue";

import { listenerLastChangeTab } from "./useTabChange";

import { isString, isUrl } from "src/utils/is";

export default defineComponent({
  name: "MultipleTabs",
  components: {
    TabRedo,
    TabContent,
    FullContent,
  },
  setup() {
    const { prefixCls } = useDesign("multiple-tab");
    const go = useGo();

    const getTabList = computed(() => {
      return tabStore.getTabList.filter((item) => !item.meta?.hideTab);
    });
    const activeKeyRef = ref();

    const remove = (targetKey: string) => {};

    const onEdit = (targetKey: string | MouseEvent, action: string) => {
      switch (action) {
        case "add":
          break;
        case "remove":
          const tabs = unref(getTabList).filter((item) => item.path === targetKey);

          tabs && tabs.length && tabStore.closeTabAction(tabs[0]);
          // remove(targetKey as string);
          break;
      }
    };

    listenerLastChangeTab((route) => {
      const { path, meta = {} } = route;

      const { currentActiveMenu, hideTab } = meta;
      const isHide = !hideTab ? null : currentActiveMenu;
      const p = isHide || path;

      if (activeKeyRef.value !== p) {
        activeKeyRef.value = p;
      }

      if (isHide) {
        const findParentRoute = router.getRoutes().find((item) => item.path === currentActiveMenu);
        findParentRoute && tabStore.addTabAction((<unknown>findParentRoute) as RouteLocationNormalized);
      } else {
        tabStore.addTabAction(unref(route));
      }
    });

    const tabClick = (key: any) => {
      try {
        if (isUrl(key.indexOf("/iframe/") == 0 && key.replace("/iframe/", ""))) {
          const tabs = unref(getTabList).filter((item) => item.path === key);
          go({ path: `/redirect${key}`, query: { title: tabs[0].query.title } });
        } else {
          go(key);
        }
      } catch (error) {
        go(key);
      }
    };

    return {
      prefixCls,
      activeKeyRef,
      onEdit,
      tabClick,
      getTabList,
    };
  },
});
</script>

<style lang="less">
@import "./index.less";
</style>