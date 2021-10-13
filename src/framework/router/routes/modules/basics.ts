import type { AppRouteRecordRaw } from '#/router/types';

const routes: AppRouteRecordRaw[] = [
  {
    path: '/user-manage',
    name: 'UserManage',
    component: () => import('src/views/basics/user/index.vue'),
  },
  {
    path: '/account-manage',
    name: 'AccountManage',
    component: () => import('src/views/basics/account/index.vue'),
  },
  {
    path: '/role-manage',
    name: 'RoleManage',
    component: () => import('src/views/basics/role/index.vue'),
  },
  {
    path: '/department-manage',
    name: 'DepartmentManage',
    component: () => import('src/views/basics/department/index.vue'),
  },
  {
    path: '/privilege-manage',
    name: 'PrivilegeManage',
    component: () => import('src/views/basics/privilege/index.vue'),
  },
  {
    path: '/dict-manage',
    name: 'DictManage',
    component: () => import('src/views/basics/dict/index.vue'),
  },
];

export default routes;
