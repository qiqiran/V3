import { Menu as MenuType } from '#/router/types';
export const menus: MenuType[] = [
  {
    name: '首页',
    path: '/index',
    icon: 'home',
  },
  {
    name: '用户管理',
    path: '/user-manage',
    icon: 'user',
  },
  {
    name: '账户管理',
    path: '/account-manage',
    icon: 'switch-user',
  },
  {
    name: 'role',
    path: '/role-manage',
    icon: 'team',
  },
  {
    name: 'department',
    path: '/department-manage',
    icon: 'department',
  },
  {
    name: 'privilege',
    path: '/privilege-manage',
    icon: 'detail',
  },
  {
    name: 'dict',
    path: '/dict-manage',
    icon: 'read',
  },
  {
    name: '内嵌文档',
    path: 'https://vue3js.cn/docs/zh/',
    icon: 'setting',
  },
  {
    name: '组件',
    path: '/components',
    icon: 'comps',
    children: [
      {
        name: '项目配置',
        path: '/theme-setting',
      },
      {
        name: '消息',
        path: '/message',
      },
      {
        name: '弹出窗体',
        path: '/modal',
      },
      {
        name: '图标',
        path: '/icon',
      },
      {
        name: 'ClickOutside',
        path: '/click-outside',
      },
      {
        name: 'Loading状态',
        path: '/loading',
      },
      {
        name: 'Fullscreen',
        path: '/fullscreen',
      },
      {
        name: 'Excel',
        path: '/excel',
      },
      {
        name: 'ScrollContainer',
        path: '/scroll-container',
      },
      {
        name: '数字动画',
        path: '/count-to',
      },
      {
        name: '图片剪切',
        path: '/cropper',
      },
      {
        name: '数据表格',
        path: '/table',
      },
    ],
  },
];
