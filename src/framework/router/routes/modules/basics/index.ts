import type { AppRouteRecordRaw } from '#/router/types';
import { PAGE_NOT_FOUND_NAME } from '#/router/constant';

export const IndexRoute: AppRouteRecordRaw = {
  path: '/index',
  name: 'Index',
  meta: {
    title: '首页',
    affix: true,
  },
  component: () => import('src/views/index/index.vue'),
};

const redirectRoute: AppRouteRecordRaw = {
  path: '/',
  name: '',
  redirect: '/index',
};

// 404 on a page
const PAGE_NOT_FOUND_ROUTE: AppRouteRecordRaw = {
  path: '/:path(.*)*',
  name: PAGE_NOT_FOUND_NAME,
  component: () => import('@/views/basics/exception/404.vue'),
  meta: {
    title: 'ErrorPage',
    hideTab: true,
    // hideBreadcrumb: true,
    // hideMenu: true,
  },
  // children: [
  //   {
  //     path: '/:path(.*)*',
  //     name: PAGE_NOT_FOUND_NAME,
  //     component: () => import('@/views/basics/exception/404.vue'),
  //     meta: {
  //       title: 'ErrorPage',
  //       // hideBreadcrumb: true,
  //       // hideMenu: true,
  //     },
  //   },
  // ],
};

const routrs = [IndexRoute, redirectRoute, PAGE_NOT_FOUND_ROUTE];

export default routrs;
