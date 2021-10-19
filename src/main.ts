import { createApp } from 'vue';
import App from 'src/App.vue';
import { setupAntdvCompontents, setupAntdvIcons } from '#/ui';
import router, { setupRouter } from '#/router/index';
import { setupStore } from '#/store';
import { initAppConfigStore } from '#/logics/initAppConfig';
import { setupGlobDirectives } from '#/directives/index';

async function bootstrap() {
  const app = createApp(App);

  // ui挂载
  setupAntdvCompontents(app);
  setupAntdvIcons(app);
  // 路由挂载
  setupRouter(app);
  // vuex挂载
  setupStore(app);
  // 初始化系统配置
  initAppConfigStore();

  // 注册全局指令
  setupGlobDirectives(app);

  // app.mount('#app');
  router.isReady().then(() => app.mount('#app', true));
}

bootstrap();
