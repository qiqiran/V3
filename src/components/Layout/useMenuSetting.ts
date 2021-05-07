import { computed, unref, ref } from 'vue';

import { appStore } from 'src/framework/store/modules/app';
import { MenuSetting } from './types';

// Get menu configuration
const getMenuSetting = computed(() => appStore.getProjectConfig.menuSetting);

const getCollapsed = computed(() => unref(getMenuSetting).collapsed);

const getShowTopMenu = computed(() => unref(getMenuSetting).showTopMenu);

const getMenuTheme = computed(() => unref(getMenuSetting).theme);

const getTrigger = computed(() => unref(getMenuSetting).trigger);

// Set menu configuration
function setMenuSetting(menuSetting: Partial<MenuSetting>): void {
  appStore.commitProjectConfigState({ menuSetting });
}

function toggleCollapsed() {
  setMenuSetting({
    collapsed: !unref(getCollapsed),
  });
}
export function useMenuSetting() {
  return {
    setMenuSetting,

    toggleCollapsed,

    getCollapsed,
    getShowTopMenu,
    getMenuTheme,
    getTrigger
  }
}