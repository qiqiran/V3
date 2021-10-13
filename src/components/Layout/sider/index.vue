<template>
  <a-drawer v-if="getIsMobile" :class="[prefixCls]" placement="left" :width="getSiderWidth" :closable="false" :visible="!getCollapsed" @close="closeDrawer()">
    <Sider />
  </a-drawer>
  <Sider v-else />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import { useDesign } from 'src/hooks/web/useDesign';
  import { useAppAdapter } from 'src/hooks/web/useAppAdapter';
  import { useSiderSetting, useMenuSetting } from 'src/hooks/setting';

  import Sider from './Sider.vue';

  export default defineComponent({
    name: 'LayoutSiderWrapper',
    components: {
      Sider,
    },
    setup() {
      const { prefixCls } = useDesign('layout-sider-wrapper');
      const { getIsMobile } = useAppAdapter();
      const { getCollapsed, setMenuSetting } = useMenuSetting();
      const { getSiderWidth } = useSiderSetting();

      function closeDrawer() {
        setMenuSetting({
          collapsed: true,
        });
      }

      return { prefixCls, getIsMobile, getCollapsed, getSiderWidth, closeDrawer };
    },
  });
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}layout-sider-wrapper';

  .@{prefix-cls}.ant-drawer {
    .ant-drawer-wrapper-body {
      background: @sider-dark-bg-color;
      .ant-drawer-body {
        padding: 0;
      }
    }
  }
</style>
