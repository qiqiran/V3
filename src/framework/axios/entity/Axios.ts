import type { IResult } from '../type';
import { ErrorCodeEnum } from '../enum';

import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';
import { IAxiosConfig } from '#/axios/interface/IAxiosConfig';
import { isFunction } from 'src/utils/is';

import { error, warning } from 'src/hooks/web/useMessage';
import { isNullOrUnDef } from 'src/utils/is';

class Axios {
  private axiosInstance: AxiosInstance;
  private axiosConfig: IAxiosConfig;

  constructor(config: IAxiosConfig) {
    this.axiosConfig = config;
    this.axiosInstance = axios.create(config);
    this.setupInterceptors();
  }

  /**
   * @description:  创建axios实例
   */
  private createAxios(config: IAxiosConfig): void {
    this.axiosConfig = config;
    this.axiosInstance = axios.create(config);
    this.setupInterceptors();
  }

  /**
   * @description: 重新配置axios
   */
  configAxios(config: IAxiosConfig) {
    if (!this.axiosInstance) {
      return;
    }
    this.createAxios(config);
  }

  /**
   * @description: 获取axios实例
   */
  getAxios(): AxiosInstance {
    return this.axiosInstance;
  }

  /**
   * @description:
   */
  private getTransform() {
    const { transform } = this.axiosConfig;
    return transform;
  }

  /**
   * @description: 设置通用header
   */
  setHeader(headers: any): void {
    if (!this.axiosInstance) {
      return;
    }
    Object.assign(this.axiosInstance.defaults.headers, headers);
  }

  /**
   * @description: 拦截器配置
   */
  private setupInterceptors() {
    const transform = this.getTransform();
    if (!transform) return;

    const { requestInterceptor, requestInterceptorCatch, responseInterceptor, responseInterceptorCatch } = transform;

    // 请求拦截器配置处理
    this.axiosInstance.interceptors.request.use((config) => {
      if (requestInterceptor && isFunction(requestInterceptor)) {
        config = requestInterceptor(config);
      }
      return config;
    });

    // 请求拦截器错误捕获
    requestInterceptorCatch && isFunction(requestInterceptorCatch) && this.axiosInstance.interceptors.request.use(undefined, requestInterceptorCatch);

    // 响应拦截器配置处理
    this.axiosInstance.interceptors.response.use((response: AxiosResponse<IResult<any>>) => {
      if (responseInterceptor && isFunction(responseInterceptor)) {
        response = responseInterceptor(response);
      }
      return response;
    });

    // 响应拦截器错误捕获
    responseInterceptorCatch && isFunction(responseInterceptorCatch) && this.axiosInstance.interceptors.response.use(undefined, responseInterceptorCatch);
  }

  private request<T = any, R = T>(config: AxiosRequestConfig): Promise<R> {
    return new Promise((resolve, reject) => {
      this.axiosInstance.request<any, AxiosResponse<IResult<R>>>(config).then((response: AxiosResponse<IResult>) => {
        console.log('responseInterceptor', response);
        const { data } = response;
        const { tp, msg, re } = data;
        switch (tp) {
          case -1:
            warning('aaa' + ErrorCodeEnum.errorMessage);
            reject(ErrorCodeEnum.errorMessage);
            break;
          case 1:
            !isNullOrUnDef(msg + re) && warning(isNullOrUnDef(msg) ? re : msg);
            reject(isNullOrUnDef(msg) ? re : msg);
            break;
          case 1000:
            error(ErrorCodeEnum.timeoutMessage);
            reject(ErrorCodeEnum.timeoutMessage);
            break;
          case 1001:
            error(ErrorCodeEnum.timeoutMessage);
            reject(ErrorCodeEnum.timeoutMessage);
            break;
        }
        resolve(response?.data?.re);
      });
    });
  }

  // axios会将params的参数拼接到url
  get<T = AnimationPlaybackEvent>(url: string, params: any): Promise<T> {
    return this.request({
      url,
      params,
      method: 'GET',
    });
  }

  post<T = any>(url: string, data: any): Promise<T> {
    return this.request({
      url,
      data,
      method: 'POST',
    });
  }
}

export default Axios;
