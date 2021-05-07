import { createApp } from 'vue'
import App from 'src/App.vue'
import { setupAntdvCompontents, setupAntdvIcons } from 'src/framework/ui';
import router, { setupRouter } from 'src/framework/router/index';
import { setupStore } from 'src/framework/store';

const app = createApp(App);

// ui挂载
setupAntdvCompontents(app);
setupAntdvIcons(app);
// 路由挂载
setupRouter(app);
// vuex挂载
setupStore(app);

router.isReady().then(() => {
  app.mount('#app', true);
});