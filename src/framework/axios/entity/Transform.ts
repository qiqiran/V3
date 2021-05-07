import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { IResult } from 'src/framework/axios/interface/IResult';
import { ITransform } from "src/framework/axios/interface/ITransform";

export class Transform implements ITransform {
  /**
   * @description: 请求成功处理
   */
  requestInterceptor(config: AxiosRequestConfig) {
    config.headers = Object.assign({},config.headers,{
      // 'token':'1234'
    })
    return config;
  }
  /**
   * @description: 请求之前的拦截器错误处理
   */
  requestInterceptorCatch(error: any){
    console.error('请求前拦截器错误捕获');
    throw new Error(error);
  }
  /**
   * @description: 响应处理
   */
  // responseInterceptor(response: AxiosResponse<any>): AxiosResponse<any> {
  //   const { data } = response;
  //   console.log(response);
  //   return response;
  // }
  /**
   * @description: 响应异常处理
   */
  responseInterceptorCatch(error: any) {
    console.error('响应拦截器错误捕获');
    throw new Error(error);
  }
}