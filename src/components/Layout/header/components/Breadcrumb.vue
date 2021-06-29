<template>
  <div :class="[prefixCls, `${prefixCls}--${theme}`]">
    <a-breadcrumb :routes="getMenus">
      <template #itemRender="{ route, routes, paths }">
        <span v-if="!hasRedirect(routes, route)">
          <Icon :icon="getIcon(route)" v-if="getShowBreadCrumbIcon && getIcon(route)" />
          <span>{{ (route.title || route.name) }}</span>
        </span>
        <span v-else @click="handleClick(route, paths, $event)">
          <Icon :icon="getIcon(route)" v-if="getShowBreadCrumbIcon && getIcon(route)" />
          <span class="active">{{ (route.title || route.name) }}</span>
        </span>
      </template>
    </a-breadcrumb>
  </div>
</template>
<script lang="ts">
import type { Menu } from "#/router/types";

import { defineComponent, ref, unref, watchEffect } from "vue";

import Icon from "src/components/Icon";

import { useDesign } from "src/hooks/web/useDesign";
import { useGo } from "src/hooks/web/usePage";
import { useRouter } from "vue-router";

import { isUrl } from "src/utils/is";
import { findPath } from "src/utils/helper/treeHelper";

import { REDIRECT_NAME } from "#/router/constant";

import { menus } from "src/settings/menuSetting";

export default defineComponent({
  name: "LayoutBreadcrumb",
  components: { Icon },
  props: {
    theme: { type: String },
  },
  setup() {
    const { prefixCls } = useDesign("layout-breadcrumb");
    const getMenus = ref<any[]>([]);
    const { currentRoute } = useRouter();

    const getShowBreadCrumbIcon = ref(true);
    const go = useGo();

    watchEffect(async () => {
      const { name, path } = unref(currentRoute);
      if (name === REDIRECT_NAME) return;

      getMenus.value = findPath(menus, (item) => {
        return item.path === path;
      });
    });

    function handleClick(menu: Menu, paths: string[], e: Event) {
      console.log("handled");

      let { path, name, children } = menu;
      if (children?.length) return;
      if (isUrl(path)) {
        path.indexOf("/") !== 0 && (path = `/${path}`);
        go({ path: `/redirect/iframe${path}`, query: { title: name } });
      } else {
        go({ path, query: { title: name } });
      }
    }

    function hasRedirect(menus: Menu[], menu: Menu) {
      if (menus.indexOf(menu) === menus.length - 1) {
        return false;
      }
      return true;
    }

    function getIcon(route) {
      return route.icon || route.meta?.icon;
    }

    return { getMenus, prefixCls, getIcon, getShowBreadCrumbIcon, handleClick, hasRedirect };
  },
});
</script>
<style lang="less">
@prefix-cls: ~"@{namespace}layout-breadcrumb";
.@{prefix-cls} {
  display: flex;
  padding: 0 8px;
  align-items: center;

  .ant-breadcrumb-link {
    .anticon {
      margin-right: 4px;
      margin-bottom: 2px;
    }
  }

  .ant-dropdown-menu-item-active {
    &:hover {
      color: @primary-color!important;
    }
  }

  &--light {
    .ant-breadcrumb-link {
      color: fade(@black, 80);

      .active {
        color: fade(@black, 90);

        &:hover {
          color: @primary-color;
        }
      }
    }

    .ant-breadcrumb-separator {
      color: @black;
    }
  }

  &--dark {
    .ant-breadcrumb-link {
      color: fade(@white, 80);

      .active {
        color: fade(@white, 90);

        &:hover {
          color: @white;
        }
      }
    }

    .ant-breadcrumb-separator,
    .anticon {
      color: fade(@white, 80);
    }
  }
}
</style>
