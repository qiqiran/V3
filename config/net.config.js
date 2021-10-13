/**
 * @description 导出默认网路配置
 **/
const network = {
  //配后端数据的接收方式application/json;charset=UTF-8或者application/x-www-form-urlencoded;charset=UTF-8
  requestHeaders: { 'Content-Type': 'application/json;charset=UTF-8;' },
  //最长请求时间 单位：毫秒
  requestTimeout: 5 * 1000,
  //消息框消失时间 单位：秒
  messageDuration: 1,
  //操作正常code，支持String、Array、int多种类型
  successCode: [200, 0],
  //登录失效code
  invalidCode: 402,
  //无权限code
  noPermissionCode: 401,
};
module.exports = network;
