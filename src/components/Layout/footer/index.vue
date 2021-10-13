<template>
  <a-layout-footer :class="[prefixCls]" v-if="getShowFooter">
    <div :class="[`${prefixCls}-content`]">Copyright &copy;2021 vue-admin</div>
  </a-layout-footer>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useDesign } from 'src/hooks/web/useDesign';

  import { useRootSetting } from 'src/hooks/setting/useRootSetting';

  export default defineComponent({
    name: 'LayoutFooter',
    setup() {
      const { prefixCls } = useDesign('layout-footer');

      const { getShowFooter } = useRootSetting();
      return { prefixCls, getShowFooter };
    },
  });
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}layout-footer';

  .@{prefix-cls} {
    &-content {
      text-align: center;
      color: rgba(@black, 0.6);
    }
  }
</style>
