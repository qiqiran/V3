import { RouteRecordRaw } from 'vue-router';

export default <RouteRecordRaw>{
  path: '/login',
  name: 'Login',
  component: () => import('src/views/system/login/Login.vue')
};