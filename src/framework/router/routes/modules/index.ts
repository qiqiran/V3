import { RouteRecordRaw } from 'vue-router';

export const IndexRoute: RouteRecordRaw = {
  path: '/index',
  name: 'Index',
  meta: {
    title: "首页",
    affix: true
  },
  component: () => import('src/views/index/index.vue')
};
const redirectRoute: RouteRecordRaw = {
  path: '/',
  redirect: '/index'
};
const routrs = [IndexRoute, redirectRoute]
export default routrs;