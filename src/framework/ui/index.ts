import type { App } from 'vue';
import Antdv from 'ant-design-vue';
import 'src/assets/css/main.less';
import * as Icons from "@ant-design/icons-vue";

const icons: any = Icons;

function setupAntdvCompontents(app: App<Element>) {
  app.use(Antdv);
}
function setupAntdvIcons(app: App<Element>) {
  // 全量引入antd图标
  for (const i in icons) {
    app.component(i, icons[i]);
  }
}
export { setupAntdvCompontents, setupAntdvIcons }