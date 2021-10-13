import { AppRouteRecordRaw } from '#/router/types';

/**
 * @param modulesFiles: RequireContext
 * 参数1：目录位置
 * 参数2：是否解析目录下全部子目录
 * 参数3：正则表达式文件格式校验
 */
function parseRoutes(modulesFiles: __WebpackModuleApi.RequireContext): AppRouteRecordRaw[] {
  const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    const value = modulesFiles(modulePath);
    const routes = value.default || value;
    if (Array.isArray(routes)) {
      routes.forEach((route) => modules.push(route));
    } else if (typeof routes === 'object') {
      modules.push(routes);
    }
    return modules;
  }, <AppRouteRecordRaw[]>[]);

  return modules;
}
export { parseRoutes };
