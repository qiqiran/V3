import { RouteRecordRaw } from 'vue-router'
import { AppRouteRecordRaw } from 'src/framework/router/types'

export const REDIRECT_NAME = 'Redirect';

export const REDIRECT_ROUTE: RouteRecordRaw = {
  path: '/redirect/:path(.*)',
  name: REDIRECT_NAME,
  component: () => import('src/views/system/redirect/index.vue'),
  meta: {
    title: REDIRECT_NAME,
    hideBreadcrumb: true,
  }
};

export const IFRAME_NAME = 'IFrame';

export const IFRAME_ROUTE: RouteRecordRaw = {
  path: '/iframe/:path(.*)',
  name: IFRAME_NAME,
  component: () => import('src/views/system/iframe/index.vue'),
  meta: {
    title: '未命名',
    hideBreadcrumb: true,
  }
};