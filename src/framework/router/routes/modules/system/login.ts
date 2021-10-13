import { AppRouteRecordRaw } from '#/router/types';

export default <AppRouteRecordRaw>{
  path: '/login',
  name: 'Login',
  meta: { hideTab: true },
  component: () => import('src/views/basics/login/Login.vue'),
};
