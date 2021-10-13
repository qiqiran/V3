import type { ComputedRef } from 'vue';
import type { TabContentProps, DropMenu } from './types';

import { computed, unref, reactive } from 'vue';
import { RouteLocationNormalized, useRouter } from 'vue-router';

import { MenuEventEnum } from './types';

import { tabStore } from '#/store/modules/tab';
import { useTabs } from './useTabs';

export function useTabDropdown(tabContentProps: TabContentProps, getIsTabs: ComputedRef<boolean>) {
  const state = reactive({
    current: null as Nullable<RouteLocationNormalized>,
    currentIndex: 0,
  });

  const { currentRoute } = useRouter();
  const { refreshPage, closeAll, close, closeLeft, closeOther, closeRight } = useTabs();

  const getTargetTab = computed((): RouteLocationNormalized => {
    return unref(getIsTabs) ? tabContentProps.tabItem : unref(currentRoute);
  });

  const getDropMenuList = computed(() => {
    const { meta } = unref(getTargetTab);
    const { path } = unref(currentRoute);

    // Refresh button
    const curItem = state.current;
    const index = state.currentIndex;

    const refreshDisabled = curItem ? curItem.path !== path : true;
    // Close left
    const closeLeftDisabled = index === 0;

    const disabled = tabStore.getTabList.length === 1;

    // Close right
    const closeRightDisabled = index === tabStore.getTabList.length - 1 && tabStore.getLastDragEndIndex >= 0;

    const dropMenuList: DropMenu[] = [
      {
        icon: 'refresh',
        event: MenuEventEnum.REFRESH_PAGE,
        text: '重新加载',
        disabled: refreshDisabled,
      },
      {
        icon: 'close',
        event: MenuEventEnum.CLOSE_CURRENT,
        text: '关闭标签页',
        disabled: !!meta?.affix || disabled,
        divider: true,
      },
      {
        icon: 'align-left',
        event: MenuEventEnum.CLOSE_LEFT,
        text: '关闭左侧标签页',
        disabled: closeLeftDisabled,
        divider: false,
      },
      {
        icon: 'align-right',
        event: MenuEventEnum.CLOSE_RIGHT,
        text: '关闭右侧标签页',
        disabled: closeRightDisabled,
        divider: true,
      },
      {
        icon: 'align-middle',
        event: MenuEventEnum.CLOSE_OTHER,
        text: '关闭其他标签页',
        disabled: disabled,
      },
      {
        icon: 'minus',
        event: MenuEventEnum.CLOSE_ALL,
        text: '关闭全部标签页',
        disabled: disabled,
      },
    ];

    return dropMenuList;
  });
  function handleContextMenu(tabItem: RouteLocationNormalized) {
    return (e: Event) => {
      if (!tabItem) {
        return;
      }
      e?.preventDefault();
      const index = tabStore.getTabList.findIndex((tab) => tab.path === tabItem.path);
      state.current = tabItem;
      state.currentIndex = index;
    };
  }

  // Handle right click event
  function handleMenuEvent(menu: DropMenu): void {
    const { event } = menu;
    switch (event) {
      // refresh page
      case MenuEventEnum.REFRESH_PAGE:
        refreshPage();
        break;
      // Close current
      case MenuEventEnum.CLOSE_CURRENT:
        close(tabContentProps.tabItem);
        break;
      // Close left
      case MenuEventEnum.CLOSE_LEFT:
        closeLeft();
        break;
      // Close right
      case MenuEventEnum.CLOSE_RIGHT:
        closeRight();
        break;
      // Close other
      case MenuEventEnum.CLOSE_OTHER:
        closeOther();
        break;
      // Close all
      case MenuEventEnum.CLOSE_ALL:
        closeAll();
        break;
    }
  }

  return { getDropMenuList, handleMenuEvent, handleContextMenu };
}
