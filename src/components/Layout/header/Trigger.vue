<template>
  <div :class="[prefixCls]" @click="toggleCollapsed()" v-if="getIsMobile || !getShowTopMenu">
    <menu-unfold-outlined v-if="getCollapsed" class="trigger" />
    <menu-fold-outlined v-else class="trigger" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useDesign } from 'src/hooks/web/useDesign';
  import { useAppAdapter } from 'src/hooks/web/useAppAdapter';
  import { useMenuSetting } from 'src/hooks/setting';

  export default defineComponent({
    name: 'LayoutHeaderTrigger',
    setup() {
      const { prefixCls } = useDesign('layout-header-trigger');
      const { getIsMobile } = useAppAdapter();
      const { getCollapsed, getShowTopMenu, toggleCollapsed } = useMenuSetting();
      return {
        prefixCls,
        getIsMobile,
        getCollapsed,
        getShowTopMenu,
        toggleCollapsed,
      };
    },
  });
</script>
