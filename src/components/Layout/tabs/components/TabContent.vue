<template>
  <Dropdown :dropMenuList="getDropMenuList" :trigger="getTrigger" @menuEvent="handleMenuEvent">
    <div :class="`${prefixCls}__info`" @contextmenu="handleContext" v-if="getIsTabs">
      <span class="ml-1">{{ getTitle }}</span>
    </div>
    <span :class="`${prefixCls}-quick`" v-else @click="handleContext">
      <DownOutlined />
    </span>
  </Dropdown>
</template>

<script lang="ts">
import type { PropType } from "vue";
import type { RouteLocationNormalized } from "vue-router";
import type { TabContentProps } from "../types";

import { useDesign } from "src/hooks/web/useDesign";
import { defineComponent, computed, unref } from "vue";
import { useTabDropdown } from "../useTabDropdown";

import { Dropdown } from "src/components/Dropdown/index";

export default defineComponent({
  name: "TabContent",
  components: { Dropdown },
  props: {
    tabItem: {
      type: Object as PropType<RouteLocationNormalized>,
      default: null,
    },
    isExtra: Boolean,
  },
  setup(props) {
    const { prefixCls } = useDesign("multiple-tab-content");

    const getTitle = computed(() => {
      const { tabItem: { meta } = {} } = props;
      return meta && meta.title;
    });

    const getIsTabs = computed(() => !props.isExtra);

    const getTrigger = computed(() => (unref(getIsTabs) ? ["contextmenu"] : ["click"]));

    const { getDropMenuList, handleMenuEvent, handleContextMenu } = useTabDropdown(props as TabContentProps, getIsTabs);

    function handleContext(e: any) {
      props.tabItem && handleContextMenu(props.tabItem)(e);
    }
    return {
      prefixCls,
      getDropMenuList,
      handleMenuEvent,
      handleContext,
      getTrigger,
      getIsTabs,
      getTitle,
    };
  },
});
</script>

<style lang="less">
</style>