import type { AxiosRequestConfig } from 'axios';

import { ITransform } from '#/axios/interface/ITransform';

import { checkErrorCode } from '../checkStatus';

export class Transform implements ITransform {
  /**
   * @description: 请求成功处理
   */
  requestInterceptor(config: AxiosRequestConfig) {
    config.headers = Object.assign({}, config.headers, {
      // 'token':'1234'
    });
    return config;
  }
  /**
   * @description: 请求之前的拦截器错误处理
   */
  requestInterceptorCatch(error: any) {
    console.error('请求前拦截器错误捕获');
    throw new Error(error);
  }
  /**
   * @description: 请求之后的拦截器
   */
  // responseInterceptor(response: AxiosResponse<IResult>): AxiosResponse<IResult> {

  //   return response;
  // }
  /**
   * @description: 请求错误拦截处理
   */
  responseInterceptorCatch(error: any) {
    const { response } = error || {};
    const msg: string = response?.data?.error?.message ?? '';
    checkErrorCode(response?.status, msg);
    return Promise.reject(error);
  }
}
