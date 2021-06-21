export enum NetworkErrorEnum {
  code401 = '用户没有权限（令牌、用户名、密码错误）!',
  code403 = '用户得到授权，但是访问是被禁止的。!',
  code404 = '网络请求错误,未找到该资源!',
  code405 = '网络请求错误,请求方法未允许!',
  code408 = '网络请求超时!',
  code500 = '服务器错误,请联系管理员!',
  code501 = '网络未实现!',
  code502 = '网络错误!',
  code503 = '服务不可用，服务器暂时过载或维护!',
  code504 = '网络超时!',
  code505 = 'http版本不支持该请求!',
  unknow = '未知错误'
}

export enum ErrorCodeEnum {
  operationFailed = '操作失败',
  errorTip = '错误提示',
  errorMessage = '操作失败,系统异常!',
  timeoutMessage = '登录超时,请重新登录!',
  apiTimeoutMessage = '接口请求超时,请刷新页面重试!',
  apiRequestFailed = '请求出错，请稍候重试',
  networkException = '网络异常',
  networkExceptionMsg = '请检查您的网络连接是否正常!',
}