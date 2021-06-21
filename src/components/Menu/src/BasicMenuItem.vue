<template>
  <a-menu-item :title="menuItem?.name">
    <MenuItemContent :item="menuItem"/>
  </a-menu-item>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { itemProps } from "../prors";

import MenuItemContent from "./MenuItemContent.vue";

export default defineComponent({
  name: "MenuItem",
  components: { MenuItemContent },
  props: itemProps,
  setup(props) {
    return { menuItem: props.item };
  },
});
</script>

<style>
</style>