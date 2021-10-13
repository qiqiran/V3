/**
 * 用于监控路由变化，以更改菜单和选项卡的状态。无需监控路由，因为路由状态的变化受页面呈现时间的影响，会比较慢
 */

import Mitt from 'src/hooks/core/useMitt';
import type { RouteLocationNormalized } from 'vue-router';

const mitt = new Mitt();

const key = Symbol();

let lastChangeTab: RouteLocationNormalized;

export function setLastChangeTab(lastChangeRoute: RouteLocationNormalized) {
  // const r = getRoute(lastChangeRoute);
  mitt.emit(key, lastChangeRoute);
  lastChangeTab = lastChangeRoute;
}

export function listenerLastChangeTab(callback: (route: RouteLocationNormalized) => void, immediate = true) {
  mitt.on(key, callback);
  immediate && callback(lastChangeTab);
}
