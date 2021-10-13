import { computed, unref } from 'vue';

import type { ProjectConfig } from '@/types/config';

import { appStore } from '#/store/modules/app';

const getProjectConfig = computed(() => appStore.getProjectConfig);

const getOpenKeepAlive = computed(() => unref(getProjectConfig).openKeepAlive);

const getShowFooter = computed(() => unref(getProjectConfig).showFooter);

const getLang = computed(() => unref(getProjectConfig).lang);

function setRootSetting(setting: DeepPartial<ProjectConfig>) {
  appStore.commitProjectConfigState(setting);
}

export function useRootSetting() {
  return {
    setRootSetting,

    getOpenKeepAlive,
    getShowFooter,
    getLang,
  };
}
