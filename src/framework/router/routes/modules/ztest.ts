import { AppRouteRecordRaw } from '#/router/types';

export default <AppRouteRecordRaw[]>[
  {
    path: '/hydrometer-chart',
    name: 'HydrometerChart',
    meta: {
      title: "测流图"
    },
    component: () => import('src/views/hydrometer-chart/index.vue')
  }
];