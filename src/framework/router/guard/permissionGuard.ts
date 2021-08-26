import { Router } from 'vue-router';
import { userStore } from '#/store/modules/system/user';

import { isString } from "src/utils/is"

const {
  recordRoute,
  routesWhiteList
} = require('config');

export function createPermissionGuard(router: Router) {
  // login check
  router.beforeEach((to, from, next) => {
    const token = userStore.getToken;
    console.log("userStore", userStore.getToken);

    let hasToken = isString(token) && token.length;
    if (hasToken) {
      if (to.path === '/login') {
        next({ path: '/' })
      } else {
        next()
      }
    } else {
      if (routesWhiteList.indexOf(to.path) !== -1) {
        next()
      } else {
        if (recordRoute)
          next({ path: '/login', query: { redirect: to.path }, replace: true })
        else next({ path: '/login', replace: true })
      }
    }
  });
  router.afterEach((to) => {
    // console.log(to);
    const date = new Date();
    document.title = `vue-admin     ${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  });
}