import { RouteRecordRaw } from 'vue-router';

/**
 * @param modulesFiles: RequireContext
 * 参数1：目录位置
 * 参数2：是否解析目录下全部子目录
 * 参数3：正则表达式文件格式校验
 */
function parseRoutes(modulesFiles: __WebpackModuleApi.RequireContext): RouteRecordRaw[] {
  const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    const value = modulesFiles(modulePath);
    const routes = value.default || value;
    if (Array.isArray(routes)) {
      routes.forEach(route => modules.push(route));
    } else if (typeof routes === "object") {
      modules.push(routes)
    }
    return modules;
  }, <RouteRecordRaw[]>[]);

  return modules;
}
export { parseRoutes }