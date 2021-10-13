export default [
  {
    path: '/theme-setting',
    name: 'ThemeSetting',
    meta: {
      title: 'ThemeSetting',
    },
    component: () => import('src/views/comps/theme-setting/index.vue'),
  },
  {
    path: '/modal',
    name: 'Modal',
    meta: {
      title: 'Modal',
    },
    component: () => import('src/views/comps/modal/index.vue'),
  },
  {
    path: '/icon',
    name: 'Icon',
    meta: {
      title: 'Icon',
    },
    component: () => import('src/views/comps/icon/index.vue'),
  },
  {
    path: '/click-outside',
    name: 'ClickOutside',
    meta: {
      title: 'ClickOutside',
    },
    component: () => import('src/views/comps/click-outside/index.vue'),
  },
  {
    path: '/loading',
    name: 'Loading',
    meta: {
      title: 'Loading',
    },
    component: () => import('src/views/comps/loading/index.vue'),
  },
  {
    path: '/message',
    name: 'Message',
    meta: {
      title: 'Message',
    },
    component: () => import('src/views/comps/message/index.vue'),
  },
  {
    path: '/scroll-container',
    name: 'ScrollContainer',
    meta: {
      title: 'ScrollContainer',
    },
    component: () => import('src/views/comps/scroll-container/index.vue'),
  },
  {
    path: '/fullscreen',
    name: 'fullscreen',
    meta: {
      title: 'fullscreen',
    },
    component: () => import('src/views/comps/fullscreen/index.vue'),
  },
  {
    path: '/excel',
    name: 'excel',
    meta: {
      title: 'excel',
    },
    component: () => import('src/views/comps/excel/index.vue'),
  },
  {
    path: '/count-to',
    name: 'CountTo',
    meta: {
      title: 'CountTo',
    },
    component: () => import('src/views/comps/count-to/index.vue'),
  },
  {
    path: '/count-to',
    name: 'CountTo',
    meta: {
      title: 'CountTo',
    },
    component: () => import('src/views/comps/count-to/index.vue'),
  },
  {
    path: '/cropper',
    name: 'Cropper',
    meta: {
      title: 'Cropper',
    },
    component: () => import('src/views/comps/cropper/index.vue'),
  },
];
