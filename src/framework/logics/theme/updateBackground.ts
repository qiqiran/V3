import { ThemeEnum } from 'src/enums/appEnum';

import { setCssVar } from './util';
import { isHexColor, colorIsDark, lighten, darken } from 'src/utils/color';

import { useRootSetting } from 'src/hooks/setting';

const HEADER_BG = '--header-bg-color';
const HEADER_BG_HOVER = '--header-bg-hover-color';
const HEADER_MENU_ACTIVE_BG = '--header-active-menu-bg-color';

const SIDER_DARK_BG = '--sider-dark-bg-color';
const SIDER_DARK_DARKEN_BG = '--sider-dark-darken-bg-color';
const SIDER_LIGHTEN_BG = '--sider-dark-lighten-bg-color';

/**
 * 更改顶部标题的背景颜色
 * @param color
 */
export function updateHeaderBgColor(color: string): void {
  if (!isHexColor(color)) return;

  const { setRootSetting } = useRootSetting();
  // background
  setCssVar(HEADER_BG, color);
  // hover
  const hoverColor = lighten(color, 6);
  setCssVar(HEADER_BG_HOVER, hoverColor);
  setCssVar(HEADER_MENU_ACTIVE_BG, hoverColor);

  const isDark = colorIsDark(color);

  setRootSetting({
    headerSetting: {
      theme: isDark ? ThemeEnum.DARK : ThemeEnum.LIGHT,
      bgColor: color,
    },
  });
}

/**
 * 更改左边菜单的背景颜色
 * @param color  bg color
 */
export function updateSidebarBgColor(color: string): void {
  if (!isHexColor(color)) return;

  const { setRootSetting } = useRootSetting();

  setCssVar(SIDER_DARK_BG, color);
  setCssVar(SIDER_DARK_DARKEN_BG, darken(color, 6));
  setCssVar(SIDER_LIGHTEN_BG, lighten(color, 4));

  const isDark = colorIsDark(color);

  setRootSetting({
    siderSetting: {
      theme: isDark ? ThemeEnum.DARK : ThemeEnum.LIGHT,
      bgColor: color,
    },
  });
}
