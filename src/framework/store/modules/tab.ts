import { toRaw, unref } from 'vue';
import { VuexModule, getModule, Module, Mutation, Action } from 'vuex-module-decorators';
import { RouteLocationNormalized, RouteLocationRaw, RouteRecordNormalized, Router } from 'vue-router'

import store from '#/store';
import router from '#/router';
import { IndexRoute } from '#/router/routes/modules/system/index';
import { REDIRECT_ROUTE } from '#/router/constant';

import { useGo, useRedo } from 'src/hooks/web/usePage';

import { PageEnum } from 'src/enums/pageEnum';

import { cloneDeep } from 'lodash-es';

const NAME = 'tab';

if ((store.state as any)[NAME]) {
  store.unregisterModule(NAME);
}
export function getRawRoute(route: RouteLocationNormalized): RouteLocationNormalized {
  if (!route) return route;
  const { matched, ...opt } = route;
  return {
    ...opt,
    matched: (matched
      ? matched.map((item) => ({
        meta: item.meta,
        name: item.name,
        path: item.path,
      }))
      : undefined) as RouteRecordNormalized[],
  };
}

@Module({ dynamic: true, namespaced: true, store, name: NAME })
class Tab extends VuexModule {
  // tab list
  tabList: RouteLocationNormalized[] = [(<any>IndexRoute)];
  cacheTabList: Set<string> = new Set();
  lastDragEndIndex: number = 0;

  get getTabList() {
    return this.tabList;
  }

  get getCachedTabList(): string[] {
    return Array.from(this.cacheTabList);
  }

  get getLastDragEndIndex(): number {
    return this.lastDragEndIndex;
  }

  @Mutation
  commitTabRoutesState(route: RouteLocationNormalized) {
    const { path, fullPath, params, query } = route;

    let updateIndex = -1;
    // 已经存在的页面，不重复添加tab
    const hasTab = this.tabList.some((tab, index) => {
      updateIndex = index;
      return (tab.path || tab.fullPath) === (path || fullPath);
    });
    if (hasTab) {
      const curTab = toRaw(this.tabList)[updateIndex];
      if (!curTab) return;
      curTab.params = params || curTab.params;
      curTab.query = query || curTab.query;
      curTab.fullPath = curTab.fullPath || fullPath;
      this.tabList.splice(updateIndex, 1, curTab);
      return;
    }
    this.tabList = cloneDeep([...this.tabList, route]);
  }

  /**
   * @description: 关闭页签
   */
  @Mutation
  commitCloseTab(route: RouteLocationNormalized): void {
    const { fullPath, meta: { affix } = {} } = route;
    if (affix) return;
    const index = this.tabList.findIndex((item) => item.fullPath === fullPath);
    index !== -1 && this.tabList.splice(index, 1);
  }

  /**
     * 根据当前打开的选项卡更新缓存
     */
  @Mutation
  commitUpdateCacheTab() {
    const cacheMap: Set<string> = new Set();

    for (const tab of this.tabList) {
      const item = getRawRoute(tab);
      const needCache = !item.meta?.ignoreKeepAlive;
      if (!needCache) {// 该标签不缓存
        continue;
      }
      const name = item.name as string;

      cacheMap.add(name);
    }
    this.cacheTabList = cacheMap;
  }

  @Mutation
  commitBulkCloseTabs(pathList: string[]) {
    this.tabList = this.tabList.filter((item) => !pathList.includes(item.fullPath));
  }

  @Mutation
  clearCacheTabs(): void {
    this.cacheTabList = new Set();
  }

  @Action
  async refreshPage(router: Router) {
    const { currentRoute } = router;
    const route = unref(currentRoute);
    const name = route.name;

    const findTab = this.getCachedTabList.find((item) => item === name);

    if (findTab) {
      this.cacheTabList.delete(findTab);
    }
    const redo = useRedo();
    await redo();
  }

  @Action
  goToPage(router: Router) {
    const go = useGo();
    const len = this.tabList.length;
    const { path } = unref(router.currentRoute);

    let toPath: PageEnum | string = PageEnum.BASE_HOME;

    if (len > 0) {
      const page = this.tabList[len - 1];
      const p = page.fullPath || page.path;
      if (p) {
        toPath = p;
      }
    }
    // Jump to the current page and report an error
    path !== toPath && go(toPath as PageEnum, true);
  }

  @Action
  addTabAction(route: RouteLocationNormalized) {
    const { name } = route;
    // 过滤掉不需要生成页签的路由
    if (!name || [REDIRECT_ROUTE.name].includes(name as string)) {
      return;
    }
    this.commitTabRoutesState(route);
    this.commitUpdateCacheTab();
  }

  @Action
  closeTabAction(tab: RouteLocationNormalized) {
    function getObj(tabItem: RouteLocationNormalized) {
      const { params, path, query } = tabItem;
      return {
        params: params || {},
        path,
        query: query || {},
      };
    }
    const { currentRoute, replace } = router;

    const { path } = unref(currentRoute);
    if (path !== tab.path) {
      // 关闭非当前页签并跳出
      this.commitCloseTab(tab);
      return;
    }

    let toObj: RouteLocationRaw = {};

    const index = this.getTabList.findIndex((item) => item.path === path);

    // 如果当前选项卡位于最左边
    if (index === 0) {
      // 如果只有一个页签，定位到主页，否则定位到右边的页签
      if (this.getTabList.length === 1) {
        toObj = PageEnum.BASE_HOME;
      } else {
        //  定位到右边的页签
        const page = this.getTabList[index + 1];
        toObj = getObj(page);
      }
    } else {
      // 定位到左边的页签
      const page = this.getTabList[index - 1];
      toObj = getObj(page);
    }
    // 关闭当前页签并无痕跳转
    this.commitCloseTab(currentRoute.value);
    replace(toObj);
  }

  // 关闭左侧标签
  @Action
  async closeLeftTabs(route: RouteLocationNormalized) {
    const index = this.tabList.findIndex((item) => item.path === route.path);

    if (index > 0) {
      const leftTabs = this.tabList.slice(0, index);

      const pathList: string[] = [];
      for (const item of leftTabs) {
        const affix = item?.meta?.affix ?? false;
        if (!affix) pathList.push(item.fullPath);
      }
      this.commitBulkCloseTabs(pathList);
    }
    this.commitUpdateCacheTab();
  }

  // 关闭右侧标签
  @Action
  async closeRightTabs(route: RouteLocationNormalized) {
    const index = this.tabList.findIndex((item) => item.fullPath === route.fullPath);

    if (index >= 0 && index < this.tabList.length - 1) {
      const rightTabs = this.tabList.slice(index + 1, this.tabList.length);

      const pathList: string[] = [];
      for (const item of rightTabs) {
        const affix = item?.meta?.affix ?? false;
        if (!affix) pathList.push(item.fullPath);
      }
      this.commitBulkCloseTabs(pathList);
    }
    this.commitUpdateCacheTab();
  }

  // 关闭其他标签
  @Action
  async closeOtherTabs(route: RouteLocationNormalized) {
    const closePathList = this.tabList.map((item) => item.fullPath);
    const pathList: string[] = [];

    for (const path of closePathList) {
      if (path !== route.fullPath) {
        const closeItem = this.tabList.find((item) => item.fullPath === path);
        if (!closeItem) continue;
        const affix = closeItem?.meta?.affix ?? false;
        if (!affix) pathList.push(closeItem.fullPath);
      }
    }
    this.commitBulkCloseTabs(pathList);
    this.commitUpdateCacheTab();
  }

  // 关闭全部标签
  @Action
  async closeAllTab(router: Router) {
    const closeTabList = this.tabList.filter((item) => !item?.meta?.affix);
    const pathList: string[] = [];

    for (const tab of closeTabList) {
      pathList.push(tab.fullPath);
    }

    this.commitBulkCloseTabs(pathList);
    this.clearCacheTabs();
    this.goToPage(router);
  }
}

export const tabStore = getModule<Tab>(Tab);