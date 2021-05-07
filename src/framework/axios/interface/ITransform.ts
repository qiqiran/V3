/**
 * 数据处理类，可以根据项目自行配置
 */
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { IRequestOptions } from './IRequestOptions';

//  abstract class
export interface ITransform {

  /**
   * @description: 请求之前处理配置
   * @description: Process configuration before request
   */
  beforeRequestHook?: (config: AxiosRequestConfig, options: IRequestOptions) => AxiosRequestConfig;

  /**
   * @description: 请求成功处理
   */
  // transformRequestData?: (res: AxiosResponse<IRequest>, options: IRequestOptions) => any;

  /**
   * @description: 请求失败处理
   */
  requestCatch?: (e: Error) => Promise<any>;

  /**
   * @description: 请求之前的拦截器
   */
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;

  /**
   * @description: 请求之后的拦截器
   */
  responseInterceptor?: (response: AxiosResponse<any>) => AxiosResponse<any>;

  /**
   * @description: 请求之前的拦截器错误处理
   */
  requestInterceptorCatch?: (error: Error) => void;
  /**
   * @description: 请求之后的拦截器错误处理
   */
  responseInterceptorCatch?: (error: Error) => void;
}
