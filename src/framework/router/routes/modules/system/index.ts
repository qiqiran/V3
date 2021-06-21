import type { AppRouteRecordRaw } from '#/router/types';

export const IndexRoute: AppRouteRecordRaw = {
  path: '/index',
  name: 'Index',
  meta: {
    title: "首页",
    affix: true
  },
  component: () => import('src/views/index/index.vue')
};

const redirectRoute: AppRouteRecordRaw = {
  path: '/',
  name: "",
  redirect: '/index'
};

const routrs = [IndexRoute, redirectRoute];

export default routrs;