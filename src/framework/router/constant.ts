import type { AppRouteRecordRaw } from '#/router/types';

export const REDIRECT_NAME = 'Redirect';

export const PAGE_NOT_FOUND_NAME = 'PageNotFound';

export const REDIRECT_ROUTE: AppRouteRecordRaw = {
  path: '/redirect/:path(.*)',
  name: REDIRECT_NAME,
  component: () => import('src/views/basics/redirect/index.vue'),
  meta: {
    title: REDIRECT_NAME,
  },
};

export const IFRAME_NAME = 'IFrame';

export const IFRAME_ROUTE: AppRouteRecordRaw = {
  path: '/iframe/:path(.*)',
  name: IFRAME_NAME,
  component: () => import('src/views/basics/iframe/index.vue'),
  meta: {
    title: '未命名',
  },
};
