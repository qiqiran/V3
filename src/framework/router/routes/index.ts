import { parseRoutes } from 'src/utils/directoryParse';
import { REDIRECT_ROUTE, IFRAME_ROUTE } from '../constant';

// 解析并引入指定目录下全部.ts后缀文件（参数2定义为false，当前项目路由设计为不解析全部子目录使可以成为一个自定义的路由树）
const routes = parseRoutes(require.context('./modules', false, /\.ts$/));

export default [...routes, REDIRECT_ROUTE, IFRAME_ROUTE];
