<template>
  <a-layout :class="[prefixCls]">
    <LayoutLockPage />
    <!-- 顶部占满title布局 -->
    <LayoutHeader v-if="getShowFullHeaderRef" />
    <a-layout>
      <LayoutSider v-if="getIsMobile || getShowSiderMenu" />
      <a-layout>
        <!-- 左右title布局 -->
        <MultipleHeader />
        <LayoutContent>
          <slot></slot>
        </LayoutContent>
        <LayoutFooter />
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { useDesign } from 'src/hooks/web/useDesign';
  import { useAppAdapter } from 'src/hooks/web/useAppAdapter';
  import { useHeaderSetting, useSiderSetting, useMenuSetting } from 'src/hooks/setting';

  import { createAsyncComponent } from 'src/utils/factory/createAsyncComponent';

  import LayoutHeader from './header/index.vue';
  import MultipleHeader from './header/MultipleHeader.vue';
  import LayoutSider from './sider/index.vue';
  import LayoutContent from './content/index.vue';
  import LayoutFooter from './footer/index.vue';

  export default defineComponent({
    name: 'Layout',
    components: {
      LayoutHeader,
      MultipleHeader,
      LayoutSider,
      LayoutContent,
      LayoutFooter,
      LayoutLockPage: createAsyncComponent(() => import('src/views/basics/lock/index.vue')),
    },
    setup() {
      const { prefixCls } = useDesign('layout');
      const { getIsMobile } = useAppAdapter();
      const { getShowFullHeaderRef } = useHeaderSetting();
      const { getShowSiderMenu } = useSiderSetting();
      const {} = useMenuSetting();

      return {
        prefixCls,
        getIsMobile,

        getShowFullHeaderRef,

        getShowSiderMenu,
      };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}layout';

  .@{prefix-cls} {
    .ant-layout-content {
      overflow: auto;
    }
  }
</style>
