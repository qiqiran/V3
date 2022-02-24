import type { AppRouteRecordRaw } from '#/router/types';

const routes: AppRouteRecordRaw[] = [
  // {
  //   path: '/user-manage',
  //   name: 'UserManage',
  //   component: () => import('src/views/system/user/index.vue'),
  // },
  // {
  //   path: '/account-manage',
  //   name: 'AccountManage',
  //   component: () => import('src/views/system/account/index.vue'),
  // },
  // {
  //   path: '/role-manage',
  //   name: 'RoleManage',
  //   component: () => import('src/views/system/role/index.vue'),
  // },
  // {
  //   path: '/department-manage',
  //   name: 'DepartmentManage',
  //   component: () => import('src/views/system/department/index.vue'),
  // },
  // {
  //   path: '/privilege-manage',
  //   name: 'PrivilegeManage',
  //   component: () => import('src/views/system/privilege/index.vue'),
  // },
  {
    path: '/dict-manage',
    name: 'DictManage',
    component: () => import('src/views/system/dict/index.vue'),
  },
];

export default routes;
