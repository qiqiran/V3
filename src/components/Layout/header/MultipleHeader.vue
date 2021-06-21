<template>
  <LayoutHader v-if="getShowInsetHeaderRef" />
  <MultipleTabs v-if="getShowMultipleTab" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { useHeaderSetting, useMultiTabSetting } from "src/hooks/setting";

import LayoutHader from "./index.vue";
import MultipleTabs from "../tabs/index.vue";

export default defineComponent({
  name: "MultipleHeader",
  components: {
    LayoutHader,
    MultipleTabs,
  },
  setup() {
    const { getShowInsetHeaderRef } = useHeaderSetting();
    const { getShowMultipleTab } = useMultiTabSetting();
    return {
      getShowInsetHeaderRef,
      getShowMultipleTab,
    };
  },
});
</script>

<style>
</style>