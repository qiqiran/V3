import { Router } from 'vue-router';

const {
  recordRoute,
  routesWhiteList
} = require('config');

export function createPermissionGuard(router: Router) {
  // login check
  router.beforeEach((to, from, next) => {
    let hasToken = true;
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
    document.title = `water iot     ${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  });
}