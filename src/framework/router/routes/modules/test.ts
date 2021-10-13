import { AppRouteRecordRaw } from '#/router/types';

export default <AppRouteRecordRaw[]>[
  {
    path: '/test1',
    component: () => import('src/views/test/demo1.vue'),
  },
];
