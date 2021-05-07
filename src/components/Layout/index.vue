<template>
  <a-layout :class="[prefixCls]">
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
import { defineComponent } from "vue";

import { useAppAdapter } from "src/hooks/web/useAppAdapter";
import { useHeaderSetting } from "./useHeaderSetting";
import { useMenuSetting } from "./useMenuSetting";
import { useSiderSetting } from "./useSiderSetting";

import LayoutHeader from "./header/index.vue";
import MultipleHeader from "./header/MultipleHeader.vue";
import LayoutSider from "./sider/index.vue";
import LayoutContent from "./content/index.vue";
import LayoutFooter from "./footer/index.vue";
import { useDesign } from "src/hooks/web/useDesign";
export default defineComponent({
  name: "Layout",
  components: {
    LayoutHeader,
    MultipleHeader,
    LayoutSider,
    LayoutContent,
    LayoutFooter,
  },
  setup() {
    const { prefixCls } = useDesign("layout");
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
@prefix-cls: ~"@{namespace}layout";

.@{prefix-cls} {
  .ant-layout-content {
    overflow: auto;
  }
}
</style>