import { computed } from 'vue';
import { appStore } from '#/store/modules/app';

const getIsMobile = computed(() => {
  console.info(appStore.getIsMobile ? 'mobile' : 'pc');
  return appStore.getIsMobile;
});
function setIsMobile(isMobile: boolean) {
  appStore.commitIsMobile(isMobile);
  isMobile && appStore.commitProjectConfigState({ menuSetting: { collapsed: true } });
}
export function useAppAdapter() {
  return {
    getIsMobile,
    setIsMobile,
  };
}
