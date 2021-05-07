import { RouteRecordRaw } from 'vue-router';

export default <RouteRecordRaw[]>[
  {
    path: '/test',
    name: 'Test',
    meta: {
      title: "测试"
    },
    component: () => import('src/views/test/index.vue')
  }, {
    path: '/baidu',
    name: 'Baidu',
    meta: {
      title: "百度"
    },
    component: () => import('src/views/test/Baidu.vue')
  }
];