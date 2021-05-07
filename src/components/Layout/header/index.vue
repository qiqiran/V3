<template>
  <a-layout-header :class="[prefixCls, `${prefixCls}--${getHeaderTheme}`]" :theme="getHeaderTheme">
    <!-- left start -->
    <div :class="`${prefixCls}-left`">
      <AppLogo
        v-if="getShowTopMenu && !getIsMobile"
        :theme="getHeaderTheme"
        :style="{width: `${getSiderWidth}px`}"
      />
      <LayoutTrigger v-if="getShowHeaderTrigger || getIsMobile" />
      <Breadcrumb />
    </div>
    <!-- left end -->

    <!-- menu start -->
    <div :class="`${prefixCls}-menu`">
      <LayoutMenu
        v-if="getShowTopMenu && !getIsMobile"
        :mode="'horizontal'"
        :theme="getHeaderTheme"
      />
    </div>
    <!-- menu end -->

    <!-- action start -->
    <div :class="`${prefixCls}-action`">
      <AppSearch :class="`${prefixCls}-action-item`" />
      <Fullscreen v-if="getShowFullScreen" :class="`${prefixCls}-action-item`" />
      <ThemeSetting :class="`${prefixCls}-action-item`" />
    </div>
    <!-- action end -->
  </a-layout-header>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useDesign } from "src/hooks/web/useDesign";
import { useAppAdapter } from "src/hooks/web/useAppAdapter";
import { useMenuSetting } from "../useMenuSetting";
import { useHeaderSetting } from "../useHeaderSetting";
import { useSiderSetting } from "../useSiderSetting";

import LayoutTrigger from "./Trigger.vue";
import { AppLogo, Breadcrumb, AppSearch, Fullscreen, ThemeSetting } from "src/components/Application";
import LayoutMenu from "src/components/Menu/index.vue";

export default defineComponent({
  name: "LayoutHeader",
  components: {
    AppLogo,
    Breadcrumb,
    AppSearch,
    Fullscreen,
    ThemeSetting,
    LayoutTrigger,
    LayoutMenu,
  },
  props: {
    collapsed: Boolean,
  },
  setup() {
    const { prefixCls } = useDesign("layout-header");
    const { getIsMobile } = useAppAdapter();
    const { getCollapsed, getShowTopMenu, toggleCollapsed } = useMenuSetting();
    const { getHeaderTheme, getShowFullScreen, getShowHeaderTrigger } = useHeaderSetting();
    const { getSiderWidth } = useSiderSetting();

    return {
      prefixCls,
      getIsMobile,

      getCollapsed,
      getShowTopMenu,
      toggleCollapsed,

      getHeaderTheme,
      getShowFullScreen,
      getShowHeaderTrigger,

      getSiderWidth,
    };
  },
});
</script>
<style lang="less">
@import "./index.less";
</style>