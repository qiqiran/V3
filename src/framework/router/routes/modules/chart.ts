import { AppRouteRecordRaw } from '#/router/types';

export default <AppRouteRecordRaw[]>[
  {
    path: '/hydrometer-chart',
    name: 'HydrometerChart',
    meta: {
      title: "测流图"
    },
    component: () => import('src/views/chart/hydrometer-chart/index.vue')
  }, {
    path: '/cascade-graphs',
    name: 'CascadeGraphs',
    meta: {
      title: "梯级图"
    },
    component: () => import('src/views/chart/cascade-graphs/index.vue')
  }, {
    path: '/dam-graph',
    name: 'DamGraph',
    meta: {
      title: "梯级图"
    },
    component: () => import('src/views/chart/dam-graph/index.vue')
  }
];