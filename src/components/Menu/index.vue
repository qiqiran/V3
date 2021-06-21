<template>
  <a-menu
    v-model:selectedKeys="current"
    :default-selected-keys="['x7']"
    :default-open-keys="['2']"
    :theme="theme"
    :mode="mode"
    :inlineCollapsed="mode == 'inline' ? collapsed : undefined"
    @click="routerSwitch"
  >
    <template v-for="menu in menus" :key="`${menu.path}`">
      <BasicSubMenuItem :item="menu" />
    </template>
  </a-menu>
</template>
<script lang="ts">
import type { PropType } from "vue";
import { defineComponent, ref } from "vue";

import { ThemeEnum } from "src/enums/appEnum";

import { useGo } from "src/hooks/web/usePage";

import { listenerLastChangeTab } from "src/components/Layout/tabs/useTabChange";

import { isUrl } from "src/utils/is";

import BasicSubMenuItem from "./src/BasicSubMenuItem.vue";

import { menus } from "src/settings/menuSetting";

export default defineComponent({
  name: "LayoutMenu",
  components: { BasicSubMenuItem },
  props: {
    theme: String as PropType<ThemeEnum>,
    mode: String,
    collapsed: Boolean,
  },
  setup() {
    const go = useGo();
    const current = ref<string[]>([]);
    interface menuItem {
      item: any;
      key: string;
      keyPath: string[];
    }

    listenerLastChangeTab((route) => {
      const { path } = route;

      const currentValue = path.replace("/iframe/", "");

      current.value = [currentValue];
    });

    const routerSwitch = ({ key, item, keyPath }: menuItem) => {
      if (isUrl(key)) {
        key.indexOf("/") !== 0 && (key = `/${key}`);
        go({ path: `/redirect/iframe${key}`, query: { title: item.title } });
      } else {
        go({ path: key, query: { title: item.title } });
      }
    };
    return {
      current,
      routerSwitch,
      menus,
    };
  },
});
</script>