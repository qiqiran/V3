import { computed, unref } from 'vue';

import { ProjectConfig } from './types'

import { appStore } from 'src/framework/store/modules/app';

const getProjectConfig = computed(() => appStore.getProjectConfig);

const getShowFooter = computed(() => unref(getProjectConfig).showFooter);

function setApp(setting: Partial<ProjectConfig>) {
  appStore.commitProjectConfigState(setting);
}

export function useApp() {
  return {
    setApp,

    getShowFooter
  }
}