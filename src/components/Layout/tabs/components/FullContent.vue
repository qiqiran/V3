<template>
  <span :class="[prefixCls]" @click="handle()">
    <Icon v-if="getIsFullContent" icon="fullscreen-exit" />
    <Icon v-else icon="fullscreen" />
  </span>
</template>

<script lang="ts">
import { useDesign } from "src/hooks/web/useDesign";
import { defineComponent, computed, unref } from "vue";

import { useHeaderSetting } from "src/components/Layout/useHeaderSetting";
import { useSiderSetting } from "src/components/Layout/useSiderSetting";

import Icon from "src/components/Icon/index";

export default defineComponent({
  name: "FullContent",
  components: { Icon },
  setup() {
    const { prefixCls } = useDesign("multiple-tab-full-content");
    const { setHeaderSetting, getShowHeader } = useHeaderSetting();
    const { setSiderSetting, getShowSider } = useSiderSetting();

    const getIsFullContent = computed(() => {
      return !unref(getShowSider) && !unref(getShowHeader);
    });

    const getIcon = computed(() => {
      return unref(getIsFullContent) ? "fullscreen-exit" : "fullscreen";
    });

    const handle = () => {
      const state = unref(getIsFullContent);
      setHeaderSetting({
        show: state,
      });
      setSiderSetting({
        show: state,
      });
    };

    return {
      prefixCls,

      handle,
      getIcon,
      getIsFullContent,
    };
  },
});
</script>

<style>
</style>