import { computed, unref, ref } from 'vue';

import { HeaderSetting } from '@/types/config';
import { TriggerEnum } from 'src/enums/menuEnum'

import { appStore } from '#/store/modules/app';

import { useMenuSetting } from './useMenuSetting';
import { useSiderSetting } from './useSiderSetting';
const { getShowSiderMenu } = useSiderSetting();
const { getShowTopMenu, getTrigger } = useMenuSetting();

// Get header configuration
const getHeaderSetting = computed(() => appStore.getProjectConfig.headerSetting);

const getHeaderTheme = computed(() => unref(getHeaderSetting).theme);

const getShowHeader = computed(() => unref(getHeaderSetting).show);

const getShowFullHeaderRef = computed(() => {
  const need = unref(getShowHeader);
  return need && unref(getShowTopMenu);
});

const getShowInsetHeaderRef = computed(() => {
  const need = unref(getShowHeader);
  return need && !unref(getShowTopMenu);
});

const getShowFullScreen = computed(() => unref(getHeaderSetting).showFullScreen);

const getShowHeaderTrigger = computed(() => {
  if (unref(getShowTopMenu) || !unref(getShowSiderMenu)) {
    return false;
  }

  return unref(getTrigger) === TriggerEnum.HEADER;
});

// Set menu configuration
function setHeaderSetting(headerSetting: Partial<HeaderSetting>): void {
  appStore.commitProjectConfigState({ headerSetting });
}
export function useHeaderSetting() {
  return {
    setHeaderSetting,

    getHeaderTheme,
    getShowHeader,
    getShowFullHeaderRef,
    getShowInsetHeaderRef,
    getShowFullScreen,
    getShowHeaderTrigger
  }
}