const IFrame = () => import('src/components/Layout/iframe/FrameBlank.vue');

export default [
  {
    path: '/x7',
    name: 'X7',
    component: IFrame,
    meta: {
      frameSrc: 'http://127.0.0.1:8888',
      title: '水文本地',
    },
  },
  {
    path: '/x77',
    name: 'X77',
    component: IFrame,
    meta: {
      frameSrc: 'http://113.240.224.29:8787/x7',
      title: '水文线上',
    },
  },
  {
    path: '/antv',
    name: 'Antv',
    component: IFrame,
    meta: {
      frameSrc: 'https://2x.antdv.com/docs/vue/introduce-cn/',
      title: 'Antv',
    },
  },
  {
    path: '/ym',
    name: '移民',
    component: IFrame,
    meta: {
      frameSrc: 'https://www.lanyuhuitong.cn:72',
      title: '移民',
    },
  },
];
