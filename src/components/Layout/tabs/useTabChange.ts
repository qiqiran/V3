/**
 * Used to monitor routing changes to change the status of menus and tabs. There is no need to monitor the route, because the route status change is affected by the page rendering time, which will be slow
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

export function listenerLastChangeTab(
  callback: (route: RouteLocationNormalized) => void,
  immediate = true
) {
  mitt.on(key, callback);
  immediate && callback(lastChangeTab);
}
