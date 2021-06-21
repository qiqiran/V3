import type { ProjectConfig } from '@/types/config';
import { MenuTypeEnum, MenuModeEnum, TriggerEnum } from 'src/enums/menuEnum';
import {
  ThemeEnum,
  LangEnum
} from 'src/enums/appEnum';
import { APP_PRESET_COLOR_LIST, HEADER_PRESET_BG_COLOR_LIST, SIDER_BAR_BG_COLOR_LIST } from './designSetting';

// 修改完成后，需要清空浏览器缓存
const setting: ProjectConfig = {
  headerSetting: {
    // 色系主题：亮色系/暗色系
    theme: ThemeEnum.LIGHT,
    bgColor: HEADER_PRESET_BG_COLOR_LIST[0],
    // 顶栏显示控制
    show: true,
    // 是否展示全屏按钮
    showFullScreen: true
  },
  siderSetting: {
    // 色系主题：亮色系/暗色系
    theme: ThemeEnum.LIGHT,
    bgColor: SIDER_BAR_BG_COLOR_LIST[0],
    // 左侧菜单栏显示控制
    show: true,
    // 左侧菜单栏宽度
    siderWidth: 220,
    // 收缩后左侧菜单栏宽度
    siderCollapsedWidth: 48
  },
  menuSetting: {
    // 色系主题：亮色系/暗色系
    theme: ThemeEnum.LIGHT,
    // 左侧菜单缩放控制
    collapsed: false,
    // 缩放按钮位置控制：顶栏/左下/不显示
    trigger: TriggerEnum.HEADER,
    // 菜单是否在header显示
    showTopMenu: false
  },
  multiTabSetting: {
    // 标签页显示控制
    show: true
  },
  // 主题色
  themeColor: APP_PRESET_COLOR_LIST[0],
  // 页脚栏栏显示控制
  showFooter: false,
  // 标签页缓存开关，multiTabSetting.show === true 时生效
  openKeepAlive: true,

  lang: LangEnum.CN
};

export default setting;
