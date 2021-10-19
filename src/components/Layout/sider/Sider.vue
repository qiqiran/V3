<template>
  <a-layout-sider
    :class="[prefixCls]"
    :theme="getSiderTheme"
    :collapsed="getCollapsed"
    @collapse="toggleCollapsed()"
    :width="getSiderWidth"
    :collapsible="getShowSiderTrigger"
    :collapsedWidth="getSiderCollapsedWidth"
  >
    <!-- top start -->
    <div :class="[`${prefixCls}-top`]">
      <AppLogo :theme="getSiderTheme" />
    </div>
    <!-- top end -->

    <!-- content start -->
    <div :class="[`${prefixCls}-content`]">
      <LayoutMenu :class="[`${prefixCls}-menu`]" :mode="'inline'" :theme="getSiderTheme" />
    </div>
    <!-- content start -->
  </a-layout-sider>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useDesign } from 'src/hooks/web/useDesign';
  import { useSiderSetting, useMenuSetting } from 'src/hooks/setting';

  import { AppLogo } from 'src/components/Application';
  import LayoutMenu from 'src/components/Menu/index.vue';

  export default defineComponent({
    name: 'LayoutSider',
    components: {
      AppLogo,
      LayoutMenu,
    },
    setup() {
      const { prefixCls } = useDesign('layout-sider');
      const { getCollapsed, toggleCollapsed } = useMenuSetting();
      const { getSiderTheme, getSiderWidth, getSiderCollapsedWidth, getShowSiderTrigger } = useSiderSetting();

      return {
        prefixCls,
        getSiderTheme,
        getSiderWidth,
        getSiderCollapsedWidth,
        getShowSiderTrigger,
        getCollapsed,
        toggleCollapsed,
      };
    },
  });
</script>

<style lang="less">
  @prefix-cls: ~"@{namespace}layout-sider";

  .@{prefix-cls} {
    background: @sider-dark-bg-color!important;
    overflow-x: hidden;

    &-top{
      height: @header-height;
    }
    &-content{
      height: calc(100% - @header-height);
      overflow-y: auto;
      overflow-x: hidden;
    }

    .ant-menu-inline-collapsed {
      height: 100%;

      .ant-menu-item,
      .ant-menu-submenu .ant-menu-submenu-title {
        text-align: center;
        padding: 0 16px !important;
      }
    }

    .ant-menu {
      width: 100%;
      border-right: unset;

      .ant-menu-item,
      .ant-menu-submenu .ant-menu-submenu-title {
        margin: 0;
        height: 46px;
        display: flex;
        align-items: center;
      }
    }

    .ant-menu-dark {
      background: @sider-dark-bg-color !important;

      .ant-menu-inline.ant-menu-sub {
        background-color: @sider-dark-darken-bg-color;
        box-shadow: unset !important;
      }

      .ant-menu-item:active {
        background: rgba(@sider-dark-bg-color, 0.7);
      }
    }
  }

  .@{prefix-cls}.ant-layout-sider .ant-layout-sider-trigger {
    background-color: transparent;
  }

  .@{prefix-cls}.ant-layout-sider-light{
    border-right: @lightGreyBorder;
  }
</style>
