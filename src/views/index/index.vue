<template>
  <h2>welcome to WIOT</h2>
  <a-button type="primary">默认按钮</a-button>
  <a-button type="danger">危险按钮</a-button>
  <a-button>警告按钮</a-button>
  <br />
  <h2>导航模式</h2>

  <a-button type="primary" @click="changeLayout(1)">左侧导航模式</a-button>&emsp;&emsp;&nbsp;
  <a-button type="primary" @click="changeLayout(2)">顶部导航模式</a-button>&emsp;&emsp;&nbsp;
  <!-- <a-button type="primary" @click="changeLayout(3)">模式3</a-button>&emsp;&emsp;&nbsp;
  <a-button type="primary" @click="changeLayout(4)">模式4</a-button>&emsp;&emsp;&nbsp;-->
  <br />
  <h2>系统主题</h2>
  <a-button style="background: #1890ff" @click="updateTheme('#1890ff')"></a-button>
  <a-button style="background: #0960BD" @click="updateTheme('#0960BD')"></a-button>
  <a-button style="background: #0084F4" @click="updateTheme('#0084F4')"></a-button>
  <a-button style="background: #009688" @click="updateTheme('#009688')"></a-button>
  <a-button style="background: #536DFE" @click="updateTheme('#536DFE')"></a-button>
  <a-button style="background: #FF5C93" @click="updateTheme('#FF5C93')"></a-button>
  <a-button style="background: #EE4F12" @click="updateTheme('#EE4F12')"></a-button>
  <a-button style="background: #0096C7" @click="updateTheme('#0096C7')"></a-button>
  <a-button style="background: #9C27B0" @click="updateTheme('#9C27B0')"></a-button>
  <a-button style="background: #FF9800" @click="updateTheme('#FF9800')"></a-button>
  <h2>顶栏主题</h2>
  <a-button style="background: #FFFFFF" @click="updateHeaderBgColor('#FFFFFF')"></a-button>
  <a-button style="background: #009688" @click="updateHeaderBgColor('#009688')"></a-button>
  <a-button style="background: #5172DC" @click="updateHeaderBgColor('#5172DC')"></a-button>
  <a-button style="background: #018FFB" @click="updateHeaderBgColor('#018FFB')"></a-button>
  <a-button style="background: #409EFF" @click="updateHeaderBgColor('#409EFF')"></a-button>
  <a-button style="background: #E74C3C" @click="updateHeaderBgColor('#E74C3C')"></a-button>
  <a-button style="background: #24292e" @click="updateHeaderBgColor('#24292e')"></a-button>
  <a-button style="background: #394664" @click="updateHeaderBgColor('#394664')"></a-button>
  <a-button style="background: #001529" @click="updateHeaderBgColor('#001529')"></a-button>
  <a-button style="background: #019688" @click="updateHeaderBgColor('#019688')"></a-button>
  <h2>菜单</h2>
  <a-button style="background: #001529" @click="updateSidebarBgColor('#001529')"></a-button>
  <a-button style="background: #273352" @click="updateSidebarBgColor('#273352')"></a-button>
  <a-button style="background: #ffffff" @click="updateSidebarBgColor('#ffffff')"></a-button>
  <a-button style="background: #191b24" @click="updateSidebarBgColor('#191b24')"></a-button>
  <a-button style="background: #191a23" @click="updateSidebarBgColor('#191a23')"></a-button>
  <a-button style="background: #304156" @click="updateSidebarBgColor('#304156')"></a-button>
  <a-button style="background: #001628" @click="updateSidebarBgColor('#001628')"></a-button>
  <a-button style="background: #28333e" @click="updateSidebarBgColor('#28333e')"></a-button>
  <a-button style="background: #344058" @click="updateSidebarBgColor('#344058')"></a-button>
  <a-button style="background: #383f45" @click="updateSidebarBgColor('#383f45')"></a-button>
  <br />
  <br />
  <label>侧边栏：</label>
  <a-input-number v-model:value="siderWidth" />
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
  <a-input/>
  <!-- <Map /> -->
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref, unref } from "vue";

import Map from "src/components/map/Map.vue";
import themeColor from "src/framework/ui/themePlugin/index.js";
import { isHexColor, colorIsDark, lighten, darken } from "src/utils/color";
import { appStore } from "src/framework/store/modules/app";
import { ThemeEnum } from "src/enums/appEnum";
import { TriggerEnum } from "src/enums/menuEnum";

import { generate } from "@ant-design/colors";

import { useApp } from "src/components/Layout/useApp";
import { useHeaderSetting } from "src/components/Layout/useHeaderSetting";
import { useMenuSetting } from "src/components/Layout/useMenuSetting";
import { useMultiTabSetting } from "src/components/Layout/useMultiTabSetting";
import { useSiderSetting } from "src/components/Layout/useSiderSetting";
import { useAppAdapter } from "src/hooks/web/useAppAdapter";

export default defineComponent({
  name: "Index",
  components: {
    // Layout,
    Map,
  },
  setup() {
    const { getIsMobile } = useAppAdapter();
    const { setApp, getShowFooter } = useApp();
    const { setHeaderSetting, getShowHeader, getShowFullScreen } = useHeaderSetting();
    const { setMenuSetting, getTrigger } = useMenuSetting();
    const { setMultiTabSetting, getShowMultipleTab } = useMultiTabSetting();
    const { setSiderSetting, getShowSider, getSiderWidth, getSiderCollapsedWidth } = useSiderSetting();

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
        setApp({ showFooter: val });
      },
    });

    const HEADER_BG = "--header-bg-color";
    const HEADER_BG_HOVER = "--header-bg-hover-color";
    const HEADER_MENU_ACTIVE_BG = "--header-active-menu-bg-color";

    const SIDER_DARK_BG = "--sider-dark-bg-color";
    const SIDER_DARK_DARKEN_BG = "--sider-dark-darken-bg-color";
    const SIDER_LIGHTEN_1_BG = "--sider-dark-lighten-1-bg-color";
    const SIDER_LIGHTEN_2_BG = "--sider-dark-lighten-2-bg-color";

    function setCssVar(prop: string, color: string, dom = document.documentElement) {
      dom.style.setProperty(prop, color);
      // updateTheme(color);
    }
    function updateHeaderBgColor(color: string) {
      if (!isHexColor(color)) return;

      setCssVar(HEADER_BG, color);
      setCssVar(HEADER_BG_HOVER, lighten(color, 6));
      setCssVar(HEADER_MENU_ACTIVE_BG, lighten(color, 6));

      const isDark = colorIsDark(color);

      appStore.commitProjectConfigState({
        headerSetting: {
          theme: isDark ? ThemeEnum.DARK : ThemeEnum.LIGHT,
        },
      });
    }
    function updateSidebarBgColor(color: string) {
      if (!isHexColor(color)) return;

      setCssVar(SIDER_DARK_BG, color);
      setCssVar(SIDER_DARK_DARKEN_BG, darken(color, 6));
      setCssVar(SIDER_LIGHTEN_1_BG, lighten(color, 4));
      setCssVar(SIDER_LIGHTEN_2_BG, lighten(color, 8));

      const isDark = colorIsDark(color);

      appStore.commitProjectConfigState({
        siderSetting: {
          theme: isDark ? ThemeEnum.DARK : ThemeEnum.LIGHT,
        },
      });
    }
    function updateTheme(newPrimaryColor: string) {
      themeColor.changeColor(newPrimaryColor);
    }
    // updateHeaderBgColor("#018FFB");
    // updateSidebarBgColor("#383f45");
    // updateTheme("#009688");

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
      getIsMobile,

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
    };
  },
});
</script>

<style lang="less">
</style>