import type { App } from 'vue';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import { createGuard } from './guard/';

import routes from './routes/';

// app router
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes as unknown as RouteRecordRaw[],
  strict: true,
});

// config router
function setupRouter(app: App<Element>) {
  app.use(router);
  createGuard(router);
}
export default router;
export { setupRouter };
