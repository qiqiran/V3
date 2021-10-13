import { computed, unref } from 'vue';

import { MultiTabSetting } from '@/types/config';

import { appStore } from '#/store/modules/app';

const getMultipleTabSetting = computed(() => appStore.getProjectConfig.multiTabSetting);

const getShowMultipleTab = computed(() => unref(getMultipleTabSetting).show);

// Set MultipleTab configuration
function setMultiTabSetting(multiTabSetting: Partial<MultiTabSetting>): void {
  appStore.commitProjectConfigState({ multiTabSetting });
}

export function useMultiTabSetting() {
  return {
    setMultiTabSetting,

    getMultipleTabSetting,
    getShowMultipleTab,
  };
}
