/**
 * 配置注册全局指令
 */
import type { App } from 'vue';
import { setupLoadingDirective } from './loading';

export function setupGlobDirectives(app: App) {
  setupLoadingDirective(app);
}
