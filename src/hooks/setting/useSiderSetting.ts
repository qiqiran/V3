import { computed, unref } from 'vue';

import { SiderSetting } from '@/types/config';
import { TriggerEnum } from 'src/enums/menuEnum';

import { appStore } from '#/store/modules/app';

import { useMenuSetting } from './useMenuSetting';
const { getTrigger, getShowTopMenu } = useMenuSetting();

// Get sider configuration
const getSiderSetting = computed(() => appStore.getProjectConfig.siderSetting);

const getSiderTheme = computed(() => unref(getSiderSetting).theme);

const getShowSider = computed(() => unref(getSiderSetting).show);

const getShowSiderMenu = computed(() => {
  const need = unref(getShowSider);
  return need && !unref(getShowTopMenu);
});

const getSiderWidth = computed(() => unref(getSiderSetting).siderWidth);

const getSiderCollapsedWidth = computed(() => unref(getSiderSetting).siderCollapsedWidth);

const getShowSiderTrigger = computed(() => {
  return unref(getTrigger) === TriggerEnum.FOOTER;
});

// Set sider configuration
function setSiderSetting(siderSetting: Partial<SiderSetting>): void {
  appStore.commitProjectConfigState({ siderSetting });
}

export function useSiderSetting() {
  return {
    setSiderSetting,

    getSiderTheme,
    getShowSider,
    getShowSiderMenu,
    getSiderWidth,
    getSiderCollapsedWidth,
    getShowSiderTrigger,
  };
}
