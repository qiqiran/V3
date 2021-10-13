<template>
  <a-tooltip placement="bottom" :titile="'刷新'">
    <span :class="[prefixCls]" @click="handleRedo()" :disabled="loading">
      <RedoOutlined :spin="loading" />
    </span>
  </a-tooltip>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';

  import { useDesign } from 'src/hooks/web/useDesign';
  import { useTabs } from '../useTabs';

  export default defineComponent({
    name: 'TabRedo',
    setup() {
      const { prefixCls } = useDesign('multiple-tab-tab-redo');
      const { refreshPage } = useTabs();
      const loading = ref(false);
      async function handleRedo() {
        loading.value = true;
        setTimeout(() => (loading.value = false), 1000);
        await refreshPage();
      }
      return { prefixCls, loading, handleRedo };
    },
  });
</script>

<style></style>
