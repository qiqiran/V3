<template>
  <a-menu
    v-model:selectedKeys="current"
    :default-selected-keys="['1']"
    :default-open-keys="['2']"
    :theme="theme"
    :mode="mode"
    :inlineCollapsed="mode == 'inline' ? collapsed : undefined"
    @click="routerSwitch"
  >
    <a-menu-item key="/index" path="/">
      <home-outlined />
      <span>首页</span>
    </a-menu-item>
    <a-menu-item key="/X7" title="x7">
      <mail-outlined />
      <span>水文</span>
    </a-menu-item>
    <a-menu-item key="http://127.0.0.1:8888/" title="x7">
      <mail-outlined />
      <span>x7</span>
    </a-menu-item>
    <a-menu-item key="/todolist">
      <mail-outlined />
      <span>todilist</span>
    </a-menu-item>
    <a-menu-item key="/test">
      <appstore-outlined />
      <span>test</span>
    </a-menu-item>
    <a-sub-menu key="/item-1-1-1">
      <template #title>
        <span class="submenu-title-wrapper">
          <setting-outlined />
          <span>嵌套功能</span>
        </span>
      </template>
      <a-menu-item key="/index" keyPath="wqewqewq">首页</a-menu-item>
      <a-menu-item
        key="https://2x.antdv.com/docs/vue/introduce-cn"
        title="Ant Design Vue"
      >Ant Design Vue</a-menu-item>
      <a-menu-item key="https://element-plus.gitee.io/" title="Element UI PLUS">Element UI PLUS</a-menu-item>
      <a-menu-item key="https://www.weibo.com/" title="新浪">新浪</a-menu-item>
      <a-menu-item key="https://music.163.com/" title="网易云">网易云</a-menu-item>
      <a-menu-item key="https://www.baidu.com" title="百度">百度</a-menu-item>
    </a-sub-menu>
    <a-sub-menu>
      <template #title>
        <span class="submenu-title-wrapper">
          <setting-outlined />
          <span>折叠菜单二</span>
        </span>
      </template>
      <a-menu-item key="setting:5">Option 5</a-menu-item>
      <a-menu-item key="setting:6">Option 6</a-menu-item>
      <a-menu-item key="setting:7">Option 7</a-menu-item>
      <a-menu-item key="setting:8">Option 8</a-menu-item>
    </a-sub-menu>
    <a-sub-menu>
      <template #title>
        <span class="submenu-title-wrapper">
          <setting-outlined />
          <span>折叠菜单三</span>
        </span>
      </template>
      <a-menu-item key="setting:9">Option 9</a-menu-item>
      <a-menu-item key="setting:10">Option 10</a-menu-item>
      <a-menu-item key="setting:11">Option 11</a-menu-item>
      <a-menu-item key="setting:12">Option 12</a-menu-item>
    </a-sub-menu>
    <a-sub-menu>
      <template #title>
        <span class="submenu-title-wrapper">
          <setting-outlined />
          <span>折叠菜单四</span>
        </span>
      </template>
      <a-menu-item key="setting:13">Option 13</a-menu-item>
      <a-menu-item key="setting:14">Option 14</a-menu-item>
      <a-menu-item key="setting:15">Option 15</a-menu-item>
      <a-menu-item key="setting:16">Option 16</a-menu-item>
    </a-sub-menu>
    <a-sub-menu>
      <template #title>
        <span class="submenu-title-wrapper">
          <setting-outlined />
          <span>折叠菜单五</span>
        </span>
      </template>
      <a-menu-item key="setting:17">Option 17</a-menu-item>
      <a-menu-item key="setting:18">Option 18</a-menu-item>
      <a-menu-item key="setting:19">Option 19</a-menu-item>
      <a-menu-item key="setting:20">Option 20</a-menu-item>
    </a-sub-menu>
    <a-menu-item key="alipay">
      <!-- <a
        href="https://2x.antdv.com/components/overview-cn/"
        target="_blank"
        rel="noopener noreferrer"
      >-->
      <mail-outlined />
      <span>Navigation Four - Link</span>
      <!-- </a> -->
    </a-menu-item>
  </a-menu>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

import { useGo } from "src/hooks/web/usePage";

import { listenerLastChangeTab } from "src/components/Layout/tabs/useTabChange";

import { ThemeEnum } from "src/enums/appEnum";

import { isString, isUrl } from "src/utils/is";

export default defineComponent({
  name: "LayoutMenu",
  props: {
    theme: String,
    mode: String,
    collapsed: Boolean,
  },
  setup() {
    const go = useGo();
    const current = ref<string[]>(["mail"]);
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
        go(key);
      }
    };
    return {
      current,
      routerSwitch,
    };
  },
});
</script>