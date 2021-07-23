<template>
  <BasicMenuItem v-if="!menuHasChildren(menuItem)" :item="menuItem" />
  <a-sub-menu v-if="menuHasChildren(menuItem)" :key="menuItem.path">
    <template #title>
      <MenuItemContent :item="menuItem" />
    </template>
    <template v-for="childrenItem in menuItem.children" :key="childrenItem.path">
      <BasicSubMenuItem :item="childrenItem" />
    </template>
  </a-sub-menu>
</template>

<script lang="ts">
import type { Menu as MenuType } from "#/router/types";

import { defineComponent } from "vue";

import { itemProps } from "../prors";

import { isArray } from "src/utils/is";

import BasicMenuItem from "./BasicMenuItem.vue";
import MenuItemContent from "./MenuItemContent.vue";

export default defineComponent({
  name: "BasicSubMenuItem",
  components: { BasicMenuItem, MenuItemContent },
  props: itemProps,
  setup(props) {
    function menuHasChildren(menuItem: MenuType): boolean {
      return isArray(menuItem.children) && menuItem.children.length > 0;
    }

    return { menuItem: props.item, menuHasChildren };
  },
});
</script>

<style>
</style>