import type { RouteLocationNormalized, Router } from 'vue-router';

import { useRouter } from 'vue-router';
import { unref } from 'vue';

import { tabStore } from '#/store/modules/tab';
import { useMultiTabSetting } from "src/hooks/setting";

enum TableActionEnum {
  REFRESH,
  CLOSE_ALL,
  CLOSE_LEFT,
  CLOSE_RIGHT,
  CLOSE_OTHER,
  CLOSE_CURRENT,
  CLOSE,
}

export function useTabs(_router?: Router) {
  const { getShowMultipleTab } = useMultiTabSetting()

  function canUseTabs(): boolean {
    const show = getShowMultipleTab;
    if (!show) {
      throw new Error('多标签页目前未打开，请在设置中打开！');
    }
    return !!show;
  }

  const router = _router || useRouter();

  const { currentRoute } = router;

  function getCurrentTab() {
    const route = unref(currentRoute);
    return tabStore.getTabList.find((item) => item.path === route.path)!;
  }

  async function handleTabAction(action: TableActionEnum, tab?: RouteLocationNormalized) {
    const canUse = canUseTabs;
    if (!canUse) {
      return;
    }
    const currentTab = getCurrentTab();
    switch (action) {
      case TableActionEnum.REFRESH:
        await tabStore.refreshPage(router);
        break;

      case TableActionEnum.CLOSE_ALL:
        await tabStore.closeAllTab(router);
        break;

      case TableActionEnum.CLOSE_LEFT:
        await tabStore.closeLeftTabs(currentTab);
        break;

      case TableActionEnum.CLOSE_RIGHT:
        await tabStore.closeRightTabs(currentTab);
        break;

      case TableActionEnum.CLOSE_OTHER:
        await tabStore.closeOtherTabs(currentTab);
        break;

      case TableActionEnum.CLOSE_CURRENT:
      case TableActionEnum.CLOSE:
        await tabStore.closeTabAction(tab || currentTab);
        break;
    }
  }

  return {
    refreshPage: () => handleTabAction(TableActionEnum.REFRESH),
    closeAll: () => handleTabAction(TableActionEnum.CLOSE_ALL),
    closeLeft: () => handleTabAction(TableActionEnum.CLOSE_LEFT),
    closeRight: () => handleTabAction(TableActionEnum.CLOSE_RIGHT),
    closeOther: () => handleTabAction(TableActionEnum.CLOSE_OTHER),
    closeCurrent: () => handleTabAction(TableActionEnum.CLOSE_CURRENT),
    close: (tab?: RouteLocationNormalized) => {
      handleTabAction(TableActionEnum.CLOSE, tab);
    },
  };
}
