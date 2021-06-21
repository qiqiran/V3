<template>
  <ScrollContainer>
    <a-button type="primary" @click="changeLayout(1)">左侧导航模式</a-button>
    <a-button type="primary" @click="changeLayout(2)">顶部导航模式</a-button>
    <!-- <a-button type="primary" @click="changeLayout(3)">模式3</a-button>&emsp;&emsp;&nbsp;
    <a-button type="primary" @click="changeLayout(4)">模式4</a-button>&emsp;&emsp;&nbsp;-->
    <br />
    <h2>系统主题</h2>
    <a-button
      v-for="color in APP_PRESET_COLOR_LIST"
      :key="`THEME-${color}`"
      :style="`background: ${color}`"
      @click="updateTheme(color)"
    ></a-button>
    <h2>顶栏主题</h2>
    <a-button
      v-for="color in HEADER_PRESET_BG_COLOR_LIST"
      :key="`HEADER-${color}`"
      :style="`background: ${color}`"
      @click="updateHeaderBgColor(color)"
    ></a-button>
    <h2>菜单</h2>
    <a-button
      v-for="color in SIDER_BAR_BG_COLOR_LIST"
      :key="`SIDER-${color}`"
      :style="`background: ${color}`"
      @click="updateSidebarBgColor(color)"
    ></a-button>
    <br />
    <br />
    <label>侧边栏：</label>
    <a-input-number v-model:value="siderWidth" :min="220" :max="600" />
    <label>收缩侧边栏：</label>
    <a-input-number v-model:value="siderCollapsedWidth" :min="48" />
    <br />
    <br />

    <label>顶栏：</label>
    <a-switch checked-children="开" un-checked-children="关" v-model:checked="showHeader" />
    <br />
    <br />

    <label>侧边栏：</label>
    <a-switch checked-children="开" un-checked-children="关" v-model:checked="showSider" />
    <br />
    <br />

    <label>全屏：</label>
    <a-switch checked-children="开" un-checked-children="关" v-model:checked="showFullScreen" />
    <br />
    <br />
    <label>标签页：</label>
    <a-switch checked-children="开" un-checked-children="关" v-model:checked="multiTabShow" />
    <br />
    <br />
    <label>页脚：</label>
    <a-switch checked-children="开" un-checked-children="关" v-model:checked="footerShow" />
    <br />
    <br />
    <label>菜单折叠按钮位置：</label>
    <a-select v-model:value="trigger">
      <a-select-option value="NONE">不显示</a-select-option>
      <a-select-option value="HEADER">顶部</a-select-option>
      <a-select-option value="FOOTER">底部</a-select-option>
    </a-select>
    <br />
    <br />
  </ScrollContainer>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, unref, Ref } from "vue";

import { generate } from "@ant-design/colors";

import { TriggerEnum } from "src/enums/menuEnum";

import { userStore } from "#/store/modules/system/user";
import { updateHeaderBgColor, updateSidebarBgColor } from "#/logics/theme/updateBackground";
import { changeThemeColor } from "#/ui/themePlugin/index.js";

import { useRootSetting, useHeaderSetting, useSiderSetting, useMenuSetting, useMultiTabSetting } from "src/hooks/setting";
import { useAppAdapter } from "src/hooks/web/useAppAdapter";

import { createLocalStorage, createSessionStorage } from "src/utils/cache";

import { APP_PRESET_COLOR_LIST, HEADER_PRESET_BG_COLOR_LIST, SIDER_BAR_BG_COLOR_LIST } from "src/settings/designSetting";

import { ScrollContainer } from "src/components/Container";
export default defineComponent({
  name: "BasicThemeSetting",
  components: { ScrollContainer },
  setup() {
    const { setRootSetting, getShowFooter } = useRootSetting();
    const { setHeaderSetting, getShowHeader, getShowFullScreen } = useHeaderSetting();
    const { setMenuSetting, getTrigger } = useMenuSetting();
    const { setMultiTabSetting, getShowMultipleTab } = useMultiTabSetting();
    const { setSiderSetting, getShowSider, getSiderWidth, getSiderCollapsedWidth } = useSiderSetting();

    const local = createLocalStorage();
    const session = createSessionStorage();

    const localName: string = "localName";

    let text = ref(local.get(localName));

    window.addEventListener("storage", function (e) {
      text.value = local.get(localName);
    });

    const showHeader = computed({
      get() {
        return unref(getShowHeader);
      },
      set(flag: boolean) {
        setHeaderSetting({ show: flag });
      },
    });

    const showSider = computed({
      get() {
        return unref(getShowSider);
      },
      set(flag: boolean) {
        setSiderSetting({ show: flag });
      },
    });
    const siderWidth = computed({
      get(): number {
        return unref(getSiderWidth);
      },
      set(val: number) {
        setSiderSetting({ siderWidth: val });
      },
    });
    const siderCollapsedWidth = computed({
      get(): number {
        return unref(getSiderCollapsedWidth);
      },
      set(val: number) {
        setSiderSetting({ siderCollapsedWidth: val });
      },
    });
    const trigger = computed({
      get() {
        return unref(getTrigger);
      },
      set(val: TriggerEnum) {
        setMenuSetting({ trigger: val });
      },
    });
    const showFullScreen = computed({
      get() {
        return unref(getShowFullScreen);
      },
      set(falg: boolean) {
        setHeaderSetting({ showFullScreen: falg });
      },
    });
    const multiTabShow = computed({
      get() {
        return unref(getShowMultipleTab);
      },
      set(val: boolean) {
        setMultiTabSetting({ show: val });
      },
    });
    const footerShow = computed({
      get() {
        return unref(getShowFooter);
      },
      set(val: boolean) {
        setRootSetting({ showFooter: val });
      },
    });

    function updateTheme(newPrimaryColor: string) {
      changeThemeColor(newPrimaryColor);
      setRootSetting({ themeColor: newPrimaryColor });
    }

    function changeLayout(mode: any) {
      switch (mode) {
        case 1:
          setMenuSetting({ showTopMenu: false });
          break;
        case 2:
          setMenuSetting({ showTopMenu: true });
          break;
        case 3:
          break;
        case 4:
          break;
      }
    }

    function calculatePPColor(color: string) {
      return generate(color);
    }

    return {
      showHeader,
      showSider,
      siderWidth,
      siderCollapsedWidth,
      trigger,
      showFullScreen,
      multiTabShow,
      footerShow,

      updateHeaderBgColor,
      updateSidebarBgColor,
      updateTheme,
      changeLayout,

      calculatePPColor,
      generate,

      APP_PRESET_COLOR_LIST,
      HEADER_PRESET_BG_COLOR_LIST,
      SIDER_BAR_BG_COLOR_LIST,
    };
  },
});
</script>

<style>
</style>